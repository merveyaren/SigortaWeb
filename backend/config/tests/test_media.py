from django.test import TestCase, override_settings

from config.media import resolve_media_url


class MediaUrlTests(TestCase):
    @override_settings(AZURE_BLOB_BASE_URL="https://insucomstorage.blob.core.windows.net/medya")
    def test_full_url_passthrough(self):
        url = "https://insucomstorage.blob.core.windows.net/medya/logo.svg"
        self.assertEqual(resolve_media_url(url), url)

    @override_settings(AZURE_BLOB_BASE_URL="https://insucomstorage.blob.core.windows.net/medya")
    def test_relative_assets_path(self):
        self.assertEqual(
            resolve_media_url("./assets/img/blog-b-1.png"),
            "https://insucomstorage.blob.core.windows.net/medya/blog-b-1.png",
        )

    @override_settings(AZURE_BLOB_BASE_URL="https://insucomstorage.blob.core.windows.net/medya")
    def test_filename_only(self):
        self.assertEqual(
            resolve_media_url("hero-img.png"),
            "https://insucomstorage.blob.core.windows.net/medya/hero-img.png",
        )

    def test_empty_path(self):
        self.assertEqual(resolve_media_url(""), "")
        self.assertEqual(resolve_media_url(None), "")
