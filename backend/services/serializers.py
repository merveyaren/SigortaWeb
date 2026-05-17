from rest_framework import serializers

from config.media import resolve_media_url

from .models import Service, ServiceCategory, ServiceFeature


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ("id", "name", "slug", "description", "sort_order")


class ServiceListSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    icon_url = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = (
            "id",
            "title",
            "slug",
            "short_description",
            "icon_path",
            "icon_url",
            "category",
            "sort_order",
            "updated_at",
        )

    def get_icon_url(self, obj):
        return resolve_media_url(obj.icon_path)


class ServiceDetailSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    features = serializers.SerializerMethodField()
    icon_url = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = (
            "id",
            "title",
            "slug",
            "short_description",
            "body",
            "icon_path",
            "icon_url",
            "category",
            "features",
            "sort_order",
            "updated_at",
        )

    def get_features(self, obj):
        return [f.text for f in obj.features.all()]

    def get_icon_url(self, obj):
        return resolve_media_url(obj.icon_path)


class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ("id", "text", "sort_order")