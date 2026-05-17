from django.core.management import call_command
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class SeededApiContractTests(TestCase):
    """Seed sonrası API cevabının frontend sözleşmesini doğrular."""

    @classmethod
    def setUpTestData(cls):
        call_command("seed_demo_data")

    def setUp(self):
        self.client = APIClient()

    def test_static_page_has_sections_and_statistics(self):
        response = self.client.get(reverse("static-page-detail", kwargs={"slug": "about"}))
        self.assertEqual(response.status_code, 200)

        self.assertIn("slug", response.data)
        self.assertIn("meta_title", response.data)
        self.assertIn("hero_headline", response.data)
        self.assertIn("sections", response.data)
        self.assertIn("statistics", response.data)
        self.assertIsInstance(response.data["sections"], list)
        self.assertIsInstance(response.data["statistics"], list)

    def test_services_list_contains_expected_seed_item(self):
        response = self.client.get(reverse("service-list"))
        self.assertEqual(response.status_code, 200)

        slugs = [item["slug"] for item in response.data]
        self.assertIn("konut-sigortasi", slugs)

        first = response.data[0]
        self.assertIn("title", first)
        self.assertIn("short_description", first)
        self.assertIn("icon_path", first)
        self.assertIn("category", first)
        self.assertIn("updated_at", first)

    def test_contact_page_and_message_contract(self):
        page_response = self.client.get(reverse("contact-page"))
        self.assertEqual(page_response.status_code, 200)

        self.assertIn("profile", page_response.data)
        self.assertIn("cards", page_response.data)
        self.assertIsInstance(page_response.data["cards"], list)
        self.assertIn("intro_headline", page_response.data["profile"])
        self.assertIn("map_embed_url", page_response.data["profile"])

        create_response = self.client.post(
            reverse("contact-message-create"),
            {"name": "Test User", "email": "test@example.com", "message": "Merhaba"},
            format="json",
        )
        self.assertEqual(create_response.status_code, 201)
        self.assertEqual(create_response.data["name"], "Test User")
        self.assertEqual(create_response.data["email"], "test@example.com")

    def test_auth_contract_for_register_and_login(self):
        register_response = self.client.post(
            reverse("auth-register"),
            {
                "username": "nextjs_user",
                "email": "nextjs@example.com",
                "password": "Nextjs12345!",
                "first_name": "Next",
                "last_name": "User",
            },
            format="json",
        )
        self.assertEqual(register_response.status_code, 201)

        token_response = self.client.post(
            reverse("token_obtain_pair"),
            {"username": "nextjs_user", "password": "Nextjs12345!"},
            format="json",
        )
        self.assertEqual(token_response.status_code, 200)
        self.assertIn("access", token_response.data)
        self.assertIn("refresh", token_response.data)

    def test_auth_token_works_without_api_prefix(self):
        """Nginx /api/ prefix strip sonrası /auth/token/ yolu çalışmalı."""
        response = self.client.post(
            "/auth/token/",
            {"username": "demo", "password": "Demo12345!"},
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
