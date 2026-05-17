from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APIClient

from .models import BlogCategory, BlogComment, BlogPost


class BlogAPITests(TestCase):
    def setUp(self):
        """
        Her test çalışmadan önce hafızada (RAM) örnek bir veritabanı 
        mimarisi ve test verileri hazırlar.
        """
        self.client = APIClient()
        self.category = BlogCategory.objects.create(name="Genel", slug="genel")
        
        # 1. Yayınlanmış Örnek Makale
        BlogPost.objects.create(
            category=self.category,
            title="Yayinlanan",
            slug="yayinlanan",
            body="Body",
            is_published=True,
            published_at=timezone.now(),
        )
        published = BlogPost.objects.get(slug="yayinlanan")
        
        # 2. Makaleye Bağlı Onaylanmış Yorum
        BlogComment.objects.create(
            post=published,
            name="Ali",
            email="ali@test.com",
            message="Yorum",
            is_approved=True,
        )
        
        # 3. Yayınlanmamış (Taslak) Örnek Makale
        BlogPost.objects.create(
            category=self.category,
            title="Taslak",
            slug="taslak",
            body="Body",
            is_published=False,
            published_at=timezone.now(),
        )

    def test_blog_list_returns_only_published(self):
        """Blog listesinde sadece yayınlanmış makalelerin listelendiğini doğrular."""
        r = self.client.get(reverse("blog-list"))
        self.assertEqual(r.status_code, 200)
        slugs = [item["slug"] for item in r.data]
        self.assertIn("yayinlanan", slugs)
        self.assertNotIn("taslak", slugs)

    def test_blog_detail_404_for_unpublished(self):
        """Yayınlanmamış (taslak) bir makale detayına gidildiğinde 404 hatası alındığını doğrular."""
        r = self.client.get(reverse("blog-detail", kwargs={"slug": "taslak"}))
        self.assertEqual(r.status_code, 404)

    def test_blog_detail_includes_comments(self):
        """Makale detayında yorumların ve kapak resmi alanının geldiğini doğrular."""
        r = self.client.get(reverse("blog-detail", kwargs={"slug": "yayinlanan"}))
        self.assertEqual(r.status_code, 200)
        self.assertIn("comments", r.data)
        self.assertEqual(len(r.data["comments"]), 1)
        self.assertIn("cover_image_url", r.data)

    # --- YENİ EKLEDİĞİMİZ AZURE BLOB STORAGE TESTİ ---
    def test_blog_serializer_handles_azure_blob_url(self):
        """
        Veritabanına eklenen canlı Azure Blob Storage URL adresinin
        Serializer tarafından bozulmadan (localhost öneki eklenmeden)
        frontend'e saf HTTP/HTTPS linki olarak fırlatıldığını doğrular.
        """
        azure_url = "https://insucomstorage.blob.core.windows.net/medya/blog-1.png"
        
        # Veritabanına doğrudan canlı Azure linkini kaydetmiş gibi bir kayıt oluşturuyoruz
        azure_post = BlogPost.objects.create(
            category=self.category,
            title="Azure Test Post",
            slug="azure-test-post",
            body="Azure Blob Test Body",
            cover_image_path=azure_url,  # Canlı adres veritabanında yazıyor
            is_published=True,
            published_at=timezone.now(),
        )
        
        # API'den bu makalenin detaylarını talep ediyoruz
        r = self.client.get(reverse("blog-detail", kwargs={"slug": "azure-test-post"}))
        
        self.assertEqual(r.status_code, 200)
        # API'nin frontend'e döndüğü link ile bizim ham Azure linkimizin birebir aynı olduğunu doğrular
        self.assertEqual(r.data["cover_image_url"], azure_url)

    def test_blog_serializer_resolves_relative_path_to_azure(self):
        """./assets/img/... yolları Azure Blob tam URL'sine çevrilir."""
        BlogPost.objects.create(
            category=self.category,
            title="Relative Path Post",
            slug="relative-path-post",
            body="Body",
            cover_image_path="./assets/img/blog-b-1.png",
            is_published=True,
            published_at=timezone.now(),
        )
        r = self.client.get(reverse("blog-detail", kwargs={"slug": "relative-path-post"}))
        self.assertEqual(r.status_code, 200)
        self.assertEqual(
            r.data["cover_image_url"],
            "https://insucomstorage.blob.core.windows.net/medya/blog-b-1.png",
        )


class BlogModelTests(TestCase):
    def test_approved_comment_count_property(self):
        """Model üzerindeki approved_comment_count özelliğinin sadece onaylı yorumları saydığını doğrular."""
        category = BlogCategory.objects.create(name="Genel2", slug="genel2")
        post = BlogPost.objects.create(
            category=category,
            title="Model Post",
            slug="model-post",
            body="x",
            is_published=True,
            published_at=timezone.now(),
        )
        BlogComment.objects.create(post=post, name="A", email="a@a.com", message="1", is_approved=True)
        BlogComment.objects.create(post=post, name="B", email="b@a.com", message="2", is_approved=False)
        self.assertEqual(post.approved_comment_count, 1)