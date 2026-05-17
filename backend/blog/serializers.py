from rest_framework import serializers

from config.media import resolve_media_url

from .models import BlogCategory, BlogComment, BlogPost


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ("id", "name", "slug", "sort_order")


class BlogPostListSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    comment_count = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = (
            "id",
            "title",
            "slug",
            "excerpt",
            "cover_image_path",
            "cover_image_url",
            "author_display_name",
            "published_at",
            "category",
            "comment_count",
            "updated_at",
        )

    def get_comment_count(self, obj):
        return obj.comments.filter(is_approved=True).count()

    def get_cover_image_url(self, obj):
        return resolve_media_url(obj.cover_image_path)


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    comments = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = (
            "id",
            "title",
            "slug",
            "excerpt",
            "body",
            "cover_image_path",
            "cover_image_url",
            "author_display_name",
            "published_at",
            "category",
            "comments",
            "updated_at",
        )

    def get_comments(self, obj):
        approved = obj.comments.filter(is_approved=True)
        return BlogCommentSerializer(approved, many=True).data

    def get_cover_image_url(self, obj):
        return resolve_media_url(obj.cover_image_path)


class BlogCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogComment
        fields = ("id", "name", "email", "message", "created_at")