from datetime import date, timedelta
from decimal import Decimal

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone

from accounts.models import CustomerProfile
from blog.models import BlogCategory, BlogComment, BlogPost
from contact.models import ContactCard, ContactSiteProfile
from faq.models import FAQEntry
from portal.models import ClaimTicket, CustomerAlert, InsurancePolicy, InsuranceQuote, PaymentNotice
from projects.models import Project, ProjectCategory, ProjectMeta
from services.models import Service, ServiceCategory, ServiceFeature
from website.models import PageSection, PageStatistic, SiteSetting, SocialLink, StaticPage

User = get_user_model()


class Command(BaseCommand):
    help = "Insucom temasına uygun örnek veri (HTML sayfalarına denk API içeriği + demo kullanıcı)."

    def handle(self, *args, **options):
        self.stdout.write("Seeding demo data…")

        site_setting, _ = SiteSetting.objects.get_or_create(pk=1)
        site_setting.site_name = "Insucom"
        site_setting.support_email = "info@example.com"
        site_setting.support_phone = "(629) 555-0129"
        site_setting.address_line = "6391 Elgin St. Celina, 10299"
        site_setting.copyright_text = "© Yoursitename 2023 | All Rights Reserved"
        site_setting.terms_url = "https://example.com/terms"
        site_setting.privacy_url = "https://example.com/privacy"
        site_setting.save()

        SocialLink.objects.update_or_create(
            platform=SocialLink.Platform.FACEBOOK,
            defaults={
                "label": "Facebook",
                "url": "https://www.facebook.com/",
                "sort_order": 1,
                "is_active": True,
            },
        )
        SocialLink.objects.update_or_create(
            platform=SocialLink.Platform.INSTAGRAM,
            defaults={
                "label": "Instagram",
                "url": "https://www.instagram.com/",
                "sort_order": 2,
                "is_active": True,
            },
        )
        SocialLink.objects.update_or_create(
            platform=SocialLink.Platform.LINKEDIN,
            defaults={
                "label": "LinkedIn",
                "url": "https://www.linkedin.com/",
                "sort_order": 3,
                "is_active": True,
            },
        )

        home, _ = StaticPage.objects.update_or_create(
            slug="home",
            defaults={
                "meta_title": "Insucom — Ana Sayfa",
                "hero_headline": "Güvenli Yarınlar İçin Sigorta Ortağınız",
                "hero_subheadline": "Araç, konut ve sağlık çözümlerinde yanınızdayız.",
                "intro": "Şeffaf fiyatlandırma ve hızlı poliçe süreçleri.",
            },
        )
        PageSection.objects.update_or_create(
            page=home,
            key="hero-cta",
            defaults={
                "title": "Hemen Teklif Alın",
                "body": "Uzman ekibimiz 7/24 destek sunar.",
                "image_path": "logo.svg",
                "sort_order": 1,
            },
        )

        home2, _ = StaticPage.objects.update_or_create(
            slug="home-2",
            defaults={
                "meta_title": "Insucom — Alternatif Ana Sayfa",
                "hero_headline": "Kurumsal Risk Yönetimi",
                "hero_subheadline": "İşletmeniz için özelleştirilmiş paketler.",
                "intro": "İkinci ana sayfa düzeni için içerik.",
            },
        )
        PageSection.objects.update_or_create(
            page=home2,
            key="highlight",
            defaults={
                "title": "Kurumsal Çözümler",
                "body": "Çok şubeli yapılar için toplu poliçe yönetimi.",
                "sort_order": 1,
            },
        )

        about, _ = StaticPage.objects.update_or_create(
            slug="about",
            defaults={
                "meta_title": "Hakkımızda",
                "hero_headline": "The Trusted Partner in Protecting Your Life",
                "hero_subheadline": "Yılların deneyimi ile sektörde öncüyüz.",
                "intro": "Müşteri memnuniyeti ve şeffaflık temel değerlerimizdir.",
            },
        )
        PageStatistic.objects.update_or_create(
            page=about,
            label="Mutlu Müşteri",
            defaults={"value": "12K+", "sort_order": 1},
        )
        PageStatistic.objects.update_or_create(
            page=about,
            label="Poliçe",
            defaults={"value": "45K+", "sort_order": 2},
        )

        sc_trafik, _ = ServiceCategory.objects.get_or_create(
            slug="arac",
            defaults={"name": "Araç Sigortaları", "description": "Kasko ve trafik", "sort_order": 1},
        )
        sc_konut, _ = ServiceCategory.objects.get_or_create(
            slug="konut",
            defaults={"name": "Konut", "description": "DASK ve konut paketleri", "sort_order": 2},
        )
        Service.objects.update_or_create(
            slug="trafik-sigortasi",
            defaults={
                "category": sc_trafik,
                "title": "Zorunlu Trafik Sigortası",
                "short_description": "Yasal güvence, hızlı yenileme.",
                "body": "Hasar anında yanınızdayız. Online poliçe.",
                "icon_path": "service-1.svg",
                "is_published": True,
                "sort_order": 1,
            },
        )
        service_trafik = Service.objects.get(slug="trafik-sigortasi")
        ServiceFeature.objects.update_or_create(
            service=service_trafik,
            text="Coverage Review",
            defaults={"sort_order": 1},
        )
        ServiceFeature.objects.update_or_create(
            service=service_trafik,
            text="Business Insurance",
            defaults={"sort_order": 2},
        )
        Service.objects.update_or_create(
            slug="kasko",
            defaults={
                "category": sc_trafik,
                "title": "Kasko",
                "short_description": "Aracınızı tam koruma.",
                "body": "Geniş anlaşmalı servis ağı.",
                "icon_path": "service-2.svg",
                "is_published": True,
                "sort_order": 2,
            },
        )
        service_kasko = Service.objects.get(slug="kasko")
        ServiceFeature.objects.update_or_create(
            service=service_kasko,
            text="Life Insurance",
            defaults={"sort_order": 1},
        )
        ServiceFeature.objects.update_or_create(
            service=service_kasko,
            text="Health Insurance",
            defaults={"sort_order": 2},
        )
        Service.objects.update_or_create(
            slug="dask",
            defaults={
                "category": sc_konut,
                "title": "DASK",
                "short_description": "Doğal afet güvencesi.",
                "body": "Zorunlu deprem sigortası bilgilendirmesi.",
                "icon_path": "service-3.svg",
                "is_published": True,
                "sort_order": 3,
            },
        )
        service_dask = Service.objects.get(slug="dask")
        ServiceFeature.objects.update_or_create(
            service=service_dask,
            text="Property Protection",
            defaults={"sort_order": 1},
        )
        ServiceFeature.objects.update_or_create(
            service=service_dask,
            text="Cyber Liability",
            defaults={"sort_order": 2},
        )
        Service.objects.update_or_create(
            slug="konut-sigortasi",
            defaults={
                "category": sc_konut,
                "title": "Konut Sigortası",
                "short_description": "Evinizi ve eşyalarınızı kapsamlı güvence altına alın.",
                "body": "Yangın, su baskını, hırsızlık ve ek teminatlarla konutunuzu koruyan paket.",
                "icon_path": "service-4.svg",
                "is_published": True,
                "sort_order": 4,
            },
        )
        service_konut = Service.objects.get(slug="konut-sigortasi")
        ServiceFeature.objects.update_or_create(
            service=service_konut,
            text="Yangın ve Sel Koruması",
            defaults={"sort_order": 1},
        )
        ServiceFeature.objects.update_or_create(
            service=service_konut,
            text="Hırsızlık Teminatı",
            defaults={"sort_order": 2},
        )

        bc, _ = BlogCategory.objects.get_or_create(
            slug="haberler",
            defaults={"name": "Haberler", "sort_order": 1},
        )
        BlogPost.objects.update_or_create(
            slug="sigorta-teknolojisi-2026",
            defaults={
                "category": bc,
                "title": "Sigortada Dijital Dönüşüm",
                "excerpt": "API tabanlı süreçler müşteri deneyimini nasıl değiştiriyor?",
                "body": "Detaylı içerik: dijital poliçe, anlık teklif ve self-servis portal.",
                "cover_image_path": "blog-b-1.png",
                "author_display_name": "Insucom Editör",
                "published_at": timezone.now(),
                "is_published": True,
            },
        )
        blog_1 = BlogPost.objects.get(slug="sigorta-teknolojisi-2026")
        BlogComment.objects.get_or_create(
            post=blog_1,
            email="reader1@example.com",
            defaults={
                "name": "Reader One",
                "message": "Cok faydali bir yazi.",
                "is_approved": True,
            },
        )
        BlogPost.objects.update_or_create(
            slug="arac-alirken-dikkat",
            defaults={
                "category": bc,
                "title": "Araç Alırken Sigorta İpuçları",
                "excerpt": "İkinci el alımlarda dikkat edilmesi gerekenler.",
                "body": "Tam içerik burada yer alır.",
                "cover_image_path": "blog-b-2.png",
                "author_display_name": "Uzman Yazar",
                "published_at": timezone.now() - timedelta(days=2),
                "is_published": True,
            },
        )
        blog_2 = BlogPost.objects.get(slug="arac-alirken-dikkat")
        BlogComment.objects.get_or_create(
            post=blog_2,
            email="reader2@example.com",
            defaults={
                "name": "Reader Two",
                "message": "Tesekkurler, guzel ozet.",
                "is_approved": True,
            },
        )

        pc, _ = ProjectCategory.objects.get_or_create(
            slug="kurumsal",
            defaults={"name": "Kurumsal Referanslar", "sort_order": 1},
        )
        Project.objects.update_or_create(
            slug="lojistik-filo-projesi",
            defaults={
                "category": pc,
                "title": "Lojistik Filo Poliçe Yönetimi",
                "summary": "500+ araç için konsolide poliçe.",
                "body": "Proje detayları ve kazanımlar.",
                "cover_image_path": "project.svg",
                "client_name": "Örnek Lojistik A.Ş.",
                "completed_on": date(2025, 6, 1),
                "is_published": True,
                "sort_order": 1,
            },
        )
        project_1 = Project.objects.get(slug="lojistik-filo-projesi")
        ProjectMeta.objects.update_or_create(
            project=project_1,
            defaults={
                "budget_amount": Decimal("45000.00"),
                "budget_currency": "USD",
                "client_company": "Sandi leo rakiul",
                "location": "USA",
                "status_label": "Monthly,Insecure",
            },
        )
        Project.objects.update_or_create(
            slug="perakende-zinciri",
            defaults={
                "category": pc,
                "title": "Perakende Zinciri Mağaza Paketi",
                "summary": "Yangın ve iş durması kapsamı.",
                "body": "Detaylı vaka çalışması.",
                "cover_image_path": "blog-5.png",
                "client_name": "Retail Co",
                "completed_on": date(2024, 11, 15),
                "is_published": True,
                "sort_order": 2,
            },
        )
        project_2 = Project.objects.get(slug="perakende-zinciri")
        ProjectMeta.objects.update_or_create(
            project=project_2,
            defaults={
                "budget_amount": Decimal("28500.00"),
                "budget_currency": "USD",
                "client_company": "Retail Co",
                "location": "Istanbul",
                "status_label": "Completed",
            },
        )

        FAQEntry.objects.update_or_create(
            question="Poliçemi nasıl yenilerim?",
            defaults={
                "answer": "Müşteri panelinden veya mobil uygulamadan tek tıkla yenileyebilirsiniz.",
                "sort_order": 1,
                "is_active": True,
            },
        )
        FAQEntry.objects.update_or_create(
            question="Hasar dosyası ne kadar sürer?",
            defaults={
                "answer": "Ekspertiz sonrası ortalama 5-10 iş günü içinde sonuçlanır.",
                "sort_order": 2,
                "is_active": True,
            },
        )

        profile, _ = ContactSiteProfile.objects.get_or_create(pk=1)
        profile.intro_kicker = "GET IN TOUCH"
        profile.intro_headline = "The Trusted Partner in Protecting Your"
        profile.intro_body = "İletişim formu ve ofis bilgileri veritabanından gelir."
        profile.map_embed_url = "https://www.google.com/maps/embed?pb=example"
        profile.save()

        ContactCard.objects.update_or_create(
            kind=ContactCard.Kind.ADDRESS,
            title_label="Address",
            defaults={
                "line_primary": "Dhaka 102, utl 1216, road 45",
                "line_secondary": "house of street",
                "sort_order": 1,
            },
        )
        ContactCard.objects.update_or_create(
            kind=ContactCard.Kind.EMAIL,
            title_label="E-mail",
            defaults={
                "line_primary": "an000@yourmail.com",
                "line_secondary": "Suppport@emailhub.net.com",
                "sort_order": 2,
            },
        )
        ContactCard.objects.update_or_create(
            kind=ContactCard.Kind.PHONE,
            title_label="Call us",
            defaults={
                "line_primary": "0000 - 000 - 000 00",
                "line_secondary": "+1234 - 000",
                "sort_order": 3,
            },
        )

        demo_user, created = User.objects.get_or_create(
            username="demo",
            defaults={
                "email": "demo@example.com",
                "first_name": "Demo",
                "last_name": "User",
            },
        )
        if created:
            demo_user.set_password("Demo12345!")
            demo_user.save()
        CustomerProfile.objects.get_or_create(user=demo_user, defaults={"phone": "+90 555 000 00 00"})

        InsurancePolicy.objects.update_or_create(
            policy_number="POL-2026-0001",
            defaults={
                "user": demo_user,
                "product_name": "Kasko — Premium Paket",
                "insurer_name": "Insucom Sigorta",
                "premium_amount": Decimal("12450.00"),
                "start_date": date.today() - timedelta(days=30),
                "end_date": date.today() + timedelta(days=335),
                "status": InsurancePolicy.Status.ACTIVE,
            },
        )
        InsuranceQuote.objects.update_or_create(
            reference_code="TEK-9981",
            defaults={
                "user": demo_user,
                "product_type": "Trafik",
                "offered_premium": Decimal("4200.00"),
                "status": InsuranceQuote.Status.SENT,
                "valid_until": date.today() + timedelta(days=14),
                "notes": "Plaka bilgisi doğrulandı.",
            },
        )
        ClaimTicket.objects.update_or_create(
            claim_number="HSR-221",
            defaults={
                "user": demo_user,
                "incident_date": date.today() - timedelta(days=5),
                "description": "Çizik hasarı — fotoğraflar yüklendi.",
                "status": ClaimTicket.Status.REVIEW,
            },
        )
        PaymentNotice.objects.filter(user=demo_user).delete()
        PaymentNotice.objects.create(
            user=demo_user,
            due_date=date(2026, 5, 1),
            amount=Decimal("3500.00"),
            description="Kasko taksit — 3/12",
            status=PaymentNotice.Status.PENDING,
        )
        CustomerAlert.objects.get_or_create(
            user=demo_user,
            title="Poliçe yenileme hatırlatması",
            defaults={"body": "Kasko poliçeniz 30 gün içinde sona erecek.", "is_read": False},
        )

        self.stdout.write(self.style.SUCCESS("Tamamlandı. Kullanıcı: demo / Demo12345!"))
