"""
Django settings — PostgreSQL (Docker) vars; SQLite used automatically for `manage.py test`.
"""

import os
import sys
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent


def _env_int(name, default):
    value = os.environ.get(name)
    if value is None or value == "":
        return default
    return int(value)


def _env_str(name, default):
    value = os.environ.get(name)
    if value is None or value == "":
        return default
    return value


def _env_jwt_signing_key():
    """
    Keep JWT HMAC key >=32 chars to avoid weak-key warnings.
    """
    fallback = "bkm9Gq2Xv7Lr3Tn5Wp8Ys1Df6Hj4Kz0Q"
    value = os.environ.get("JWT_SIGNING_KEY")
    if value is None or value == "":
        return fallback
    if len(value) < 32:
        return fallback
    return value


SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY",
    "django-insecure-dev-key-min-50-chars-please-change-in-production-7f3a9c2b1e",
)
DEBUG = os.environ.get("DJANGO_DEBUG", "true").lower() in ("1", "true", "yes")

ALLOWED_HOSTS = [
    h.strip()
    for h in os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1,insucomsigorta.site,www.insucomsigorta.site").split(",")
    if h.strip()
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "website",
    "services",
    "blog",
    "projects",
    "contact",
    "faq",
    "portal",
    "accounts",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# --- Database: PostgreSQL (Azure-compatible) when host set; SQLite for tests ---
if "test" in sys.argv:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": ":memory:",
        }
    }
elif os.environ.get("POSTGRES_HOST") or os.environ.get("AZURE_POSTGRES_HOST"):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": _env_str("POSTGRES_DB", "postgres"),
            "USER": _env_str(
                "POSTGRES_USER",
                _env_str("AZURE_POSTGRES_USER", "db_manager"),
            ),
            "PASSWORD": _env_str("POSTGRES_PASSWORD", ""),
            "HOST": _env_str(
                "POSTGRES_HOST",
                _env_str(
                    "AZURE_POSTGRES_HOST",
                    "dicle-backend-db.postgres.database.azure.com",
                ),
            ),
            "PORT": _env_str("POSTGRES_PORT", _env_str("AZURE_POSTGRES_PORT", "5432")),
            "CONN_MAX_AGE": _env_int("POSTGRES_CONN_MAX_AGE", 60),
            "OPTIONS": {
                "sslmode": _env_str("POSTGRES_SSLMODE", "require"),
            },
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "tr-tr"
TIME_ZONE = "Europe/Istanbul"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AZURE_BLOB_BASE_URL = _env_str(
    "AZURE_BLOB_BASE_URL",
    "https://insucomstorage.blob.core.windows.net/medya",
)

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=_env_int("JWT_ACCESS_MINUTES", 60)),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=_env_int("JWT_REFRESH_DAYS", 7)),
    "ROTATE_REFRESH_TOKENS": False,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "SIGNING_KEY": _env_jwt_signing_key(),
}

CORS_ALLOWED_ORIGINS = [
    o.strip()
    for o in os.environ.get(
        "CORS_ALLOWED_ORIGINS",
        "http://localhost:3000,https://insucomsigorta.site,https://www.insucomsigorta.site",
    ).split(",")
    if o.strip()
]
CORS_ALLOW_CREDENTIALS = True
