from rest_framework import serializers

from config.media import resolve_media_url

from .models import Project, ProjectCategory, ProjectMeta


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ("id", "name", "slug", "sort_order")


class ProjectListSerializer(serializers.ModelSerializer):
    category = ProjectCategorySerializer(read_only=True)
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = (
            "id",
            "title",
            "slug",
            "summary",
            "cover_image_path",
            "cover_image_url",
            "client_name",
            "completed_on",
            "category",
            "sort_order",
            "updated_at",
        )

    def get_cover_image_url(self, obj):
        return resolve_media_url(obj.cover_image_path)


class ProjectDetailSerializer(serializers.ModelSerializer):
    category = ProjectCategorySerializer(read_only=True)
    meta = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = (
            "id",
            "title",
            "slug",
            "summary",
            "body",
            "cover_image_path",
            "cover_image_url",
            "client_name",
            "completed_on",
            "category",
            "meta",
            "sort_order",
            "updated_at",
        )

    def get_meta(self, obj):
        if not hasattr(obj, "meta"):
            return None
        return {
            "budget_amount": obj.meta.budget_amount,
            "budget_currency": obj.meta.budget_currency,
            "client_company": obj.meta.client_company,
            "location": obj.meta.location,
            "status_label": obj.meta.status_label,
        }

    def get_cover_image_url(self, obj):
        return resolve_media_url(obj.cover_image_path)


class ProjectMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMeta
        fields = ("budget_amount", "budget_currency", "client_company", "location", "status_label")