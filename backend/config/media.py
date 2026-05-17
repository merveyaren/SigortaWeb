"""
Azure Blob Storage medya URL çözümlemesi.
Veritabanında tam URL, dosya adı veya ./assets/img/... yolu olabilir.
"""

import os
from urllib.parse import quote

DEFAULT_BLOB_BASE = "https://insucomstorage.blob.core.windows.net/medya"


def get_media_base_url() -> str:
    base = os.environ.get("AZURE_BLOB_BASE_URL")
    if not base:
        try:
            from django.conf import settings

            base = getattr(settings, "AZURE_BLOB_BASE_URL", None)
        except Exception:
            base = None
    return (base or DEFAULT_BLOB_BASE).rstrip("/")


def _extract_filename(path: str) -> str:
    normalized = path.strip()
    if normalized.startswith("./"):
        normalized = normalized[2:]
    for prefix in ("assets/img/", "/assets/img/"):
        if normalized.startswith(prefix):
            normalized = normalized[len(prefix) :]
            break
    return normalized.lstrip("/")


def resolve_media_url(path: str | None) -> str:
    if not path:
        return ""

    stripped = path.strip()
    if stripped.startswith(("http://", "https://")):
        return stripped

    filename = _extract_filename(stripped)
    if not filename:
        return ""

    base = get_media_base_url()
    return f"{base}/{quote(filename, safe='/')}"
