from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from blog.models import BlogPost
from contact.models import ContactCard, ContactSiteProfile
from faq.models import FAQEntry
from projects.models import Project
from services.models import Service
from config.media import get_media_base_url

from .models import SiteSetting, StaticPage
from .serializers import SiteSettingSerializer, StaticPageSerializer


class MediaConfigView(APIView):
    """Frontend'in Azure Blob taban URL'sini alması için."""

    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"base_url": get_media_base_url()})


class StaticPageDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = StaticPageSerializer
    lookup_field = "slug"
    queryset = StaticPage.objects.prefetch_related("sections", "statistics").all()


class SiteSettingView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = SiteSettingSerializer

    def get_object(self):
        obj, _ = SiteSetting.objects.get_or_create(pk=1)
        return obj


class ContentCoverageMapView(APIView):
    """
    11 ana HTML sayfasinin DB/API besleme haritasi.
    """

    permission_classes = [AllowAny]

    @staticmethod
    def _format_project_amount(project):
        if not hasattr(project, "meta") or project.meta.budget_amount is None:
            return ""
        amount = f"{project.meta.budget_amount:,.0f}"
        return f"{amount}$"

    def get(self, request, *args, **kwargs):
        home_page = StaticPage.objects.filter(slug="home").first()
        home2_page = StaticPage.objects.filter(slug="home-2").first()
        about_page = StaticPage.objects.filter(slug="about").first()
        site_setting = SiteSetting.objects.filter(pk=1).first()
        service = Service.objects.filter(is_published=True).first()
        project = Project.objects.filter(is_published=True).select_related("meta").first()
        blog_post = BlogPost.objects.filter(is_published=True).first()
        faq_entry = FAQEntry.objects.filter(is_active=True).first()
        contact_profile = ContactSiteProfile.objects.filter(pk=1).first()
        contact_card = ContactCard.objects.first()

        payload = {
            "pages": [
                {
                    "html": "index.html",
                    "model_source": ["StaticPage", "PageSection", "SiteSetting"],
                    "api": ["/api/pages/home/", "/api/pages/site-settings/"],
                    "contract": [
                        "page_slug",
                        "hero_headline",
                        "section_title",
                        "section_image_url",
                        "site_phone",
                    ],
                    "mock_data_check": {
                        "not_null": bool(home_page and home_page.hero_headline and site_setting and site_setting.support_phone),
                        "sample_values": {
                            "page_slug": home_page.slug if home_page else None,
                            "site_phone": site_setting.support_phone if site_setting else None,
                        },
                    },
                },
                {
                    "html": "index-2.html",
                    "model_source": ["StaticPage", "PageSection", "SiteSetting"],
                    "api": ["/api/pages/home-2/", "/api/pages/site-settings/"],
                    "contract": ["page_slug", "hero_headline", "section_title", "site_phone"],
                    "mock_data_check": {
                        "not_null": bool(home2_page and home2_page.hero_headline and site_setting and site_setting.support_phone),
                        "sample_values": {"page_slug": home2_page.slug if home2_page else None},
                    },
                },
                {
                    "html": "about.html",
                    "model_source": ["StaticPage", "PageStatistic", "SiteSetting"],
                    "api": ["/api/pages/about/", "/api/pages/site-settings/"],
                    "contract": ["about_title", "about_intro", "stat_label", "stat_value"],
                    "mock_data_check": {
                        "not_null": bool(about_page and about_page.hero_headline and about_page.statistics.exists()),
                        "sample_values": {
                            "about_title": about_page.hero_headline if about_page else None,
                            "stat_label": about_page.statistics.first().label if about_page and about_page.statistics.exists() else None,
                        },
                    },
                },
                {
                    "html": "services.html",
                    "model_source": ["Service", "ServiceCategory"],
                    "api": ["/api/services/"],
                    "contract": ["service_title", "service_short_description", "service_icon_url", "service_category"],
                    "mock_data_check": {
                        "not_null": bool(service and service.title and service.icon_path and service.category_id),
                        "sample_values": {"service_title": service.title if service else None},
                    },
                },
                {
                    "html": "service-details.html",
                    "model_source": ["Service", "ServiceFeature", "ServiceCategory"],
                    "api": ["/api/services/{slug}/"],
                    "contract": ["service_title", "service_body", "service_feature_item"],
                    "mock_data_check": {
                        "not_null": bool(service and service.body and service.features.exists()),
                        "sample_values": {"feature_example": service.features.first().text if service and service.features.exists() else None},
                    },
                },
                {
                    "html": "project.html",
                    "model_source": ["Project", "ProjectCategory"],
                    "api": ["/api/projects/"],
                    "contract": ["project_title", "project_summary", "project_cover_image_url", "project_category"],
                    "mock_data_check": {
                        "not_null": bool(project and project.title and project.summary is not None),
                        "sample_values": {"project_title": project.title if project else None},
                    },
                },
                {
                    "html": "project-details.html",
                    "model_source": ["Project", "ProjectMeta", "ProjectCategory"],
                    "api": ["/api/projects/{slug}/"],
                    "contract": ["project_title", "project_budget", "project_location", "project_client_company"],
                    "mock_data_check": {
                        "not_null": bool(project and hasattr(project, "meta") and project.meta.budget_amount and project.meta.location and project.meta.client_company),
                        "sample_values": {
                            "project_budget": self._format_project_amount(project) if project else None,
                            "project_location": project.meta.location if project and hasattr(project, "meta") else None,
                            "project_client_company": project.meta.client_company if project and hasattr(project, "meta") else None,
                        },
                        "html_static_match": {
                            "expected_project_budget": "45,000$",
                            "actual_project_budget": self._format_project_amount(project) if project else None,
                            "is_match": self._format_project_amount(project) == "45,000$" if project else False,
                        },
                    },
                },
                {
                    "html": "blogs.html",
                    "model_source": ["BlogPost", "BlogCategory"],
                    "api": ["/api/blog/"],
                    "contract": ["blog_title", "blog_excerpt", "blog_cover_image_url", "blog_comment_count"],
                    "mock_data_check": {
                        "not_null": bool(blog_post and blog_post.title and blog_post.excerpt is not None),
                        "sample_values": {"blog_title": blog_post.title if blog_post else None},
                    },
                },
                {
                    "html": "blog-details.html",
                    "model_source": ["BlogPost", "BlogComment", "BlogCategory"],
                    "api": ["/api/blog/{slug}/"],
                    "contract": ["blog_title", "blog_body", "blog_comment_message"],
                    "mock_data_check": {
                        "not_null": bool(blog_post and blog_post.body and blog_post.comments.exists()),
                        "sample_values": {"comment_example": blog_post.comments.first().message if blog_post and blog_post.comments.exists() else None},
                    },
                },
                {
                    "html": "faq.html",
                    "model_source": ["FAQEntry"],
                    "api": ["/api/faq/"],
                    "contract": ["faq_question", "faq_answer", "faq_sort_order"],
                    "mock_data_check": {
                        "not_null": bool(faq_entry and faq_entry.question and faq_entry.answer),
                        "sample_values": {
                            "faq_question": faq_entry.question if faq_entry else None,
                            "faq_answer": faq_entry.answer if faq_entry else None,
                        },
                    },
                },
                {
                    "html": "contact.html",
                    "model_source": ["ContactSiteProfile", "ContactCard", "ContactMessage"],
                    "api": ["/api/contact/", "/api/contact/messages/"],
                    "contract": ["site_phone", "site_email", "contact_message_name", "contact_message_email", "contact_message_phone", "contact_message_text"],
                    "mock_data_check": {
                        "not_null": bool(
                            contact_profile
                            and contact_profile.intro_headline
                            and contact_card
                            and site_setting
                            and site_setting.support_email
                        ),
                        "sample_values": {
                            "site_phone": site_setting.support_phone if site_setting else None,
                            "site_email": site_setting.support_email if site_setting else None,
                        },
                    },
                },
            ]
        }
        return Response(payload)
