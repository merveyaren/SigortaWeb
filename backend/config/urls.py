from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("config.api_urls")),
    # Nginx `location /api/ { proxy_pass http://backend:8000/; }` strips the prefix.
    path("", include("config.api_urls")),
]
