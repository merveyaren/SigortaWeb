from rest_framework import serializers

from config.media import resolve_media_url

from .models import PageSection, PageStatistic, SiteSetting, SocialLink, StaticPage


class PageSectionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = PageSection
        fields = ("key", "title", "body", "image_path", "image_url", "sort_order")

    def get_image_url(self, obj):
        return resolve_media_url(obj.image_path)


class PageStatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageStatistic
        fields = ("label", "value", "sort_order")


class StaticPageSerializer(serializers.ModelSerializer):
    sections = PageSectionSerializer(many=True, read_only=True)
    statistics = PageStatisticSerializer(many=True, read_only=True)

    class Meta:
        model = StaticPage
        fields = (
            "slug",
            "meta_title",
            "hero_headline",
            "hero_subheadline",
            "intro",
            "updated_at",
            "sections",
            "statistics",
        )


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ("platform", "label", "url", "sort_order")


class SiteSettingSerializer(serializers.ModelSerializer):
    social_links = serializers.SerializerMethodField()

    class Meta:
        model = SiteSetting
        fields = (
            "site_name",
            "support_email",
            "support_phone",
            "address_line",
            "copyright_text",
            "terms_url",
            "privacy_url",
            "updated_at",
            "social_links",
        )

    def get_social_links(self, obj):
        links = SocialLink.objects.filter(is_active=True)
        return SocialLinkSerializer(links, many=True).data