from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from datetime import date, timedelta
import random

from .models import ClaimTicket, CustomerAlert, InsurancePolicy, InsuranceQuote, PaymentNotice
from .serializers import (
    ClaimTicketSerializer,
    CustomerAlertSerializer,
    InsurancePolicySerializer,
    InsuranceQuoteSerializer,
    PaymentNoticeSerializer,
)


def auto_seed_user_data(user):
    """Kullanıcının hesabı boşsa, gerçekçi demo verileri anında ve otomatik olarak eklenir."""
    # 1. Poliçeler (InsurancePolicy)
    if not InsurancePolicy.objects.filter(user=user).exists():
        InsurancePolicy.objects.create(
            user=user,
            policy_number="POL-2026-98124",
            product_name="Kasko Sigortası",
            insurer_name="Insucom Sigorta A.Ş.",
            premium_amount=12500.00,
            start_date=date.today() - timedelta(days=60),
            end_date=date.today() + timedelta(days=305),
            status="active"
        )
        InsurancePolicy.objects.create(
            user=user,
            policy_number="POL-2026-77312",
            product_name="Özel Sağlık Sigortası",
            insurer_name="Insucom Sigorta A.Ş.",
            premium_amount=8400.00,
            start_date=date.today() - timedelta(days=120),
            end_date=date.today() + timedelta(days=245),
            status="active"
        )
        
    # 2. Teklifler (InsuranceQuote)
    if not InsuranceQuote.objects.filter(user=user).exists():
        InsuranceQuote.objects.create(
            user=user,
            reference_code="QT-8891-A",
            product_type="Konut Sigortası",
            offered_premium=4500.00,
            status="sent",
            valid_until=date.today() + timedelta(days=30),
            notes="Konutunuz için en geniş kapsamlı koruma teklifi."
        )
        InsuranceQuote.objects.create(
            user=user,
            reference_code="QT-5542-B",
            product_type="DASK Deprem Sigortası",
            offered_premium=1800.00,
            status="accepted",
            valid_until=date.today() + timedelta(days=15),
            notes="Zorunlu deprem sigortası teklifi."
        )
        
    # 3. Hasar Kayıtları (ClaimTicket)
    if not ClaimTicket.objects.filter(user=user).exists():
        ClaimTicket.objects.create(
            user=user,
            claim_number="CLM-99824",
            incident_date=date.today() - timedelta(days=15),
            description="Park halindeki araca sol arka kapıdan sürtme hasarı.",
            status="review"
        )
        
    # 4. Ödemeler (PaymentNotice)
    if not PaymentNotice.objects.filter(user=user).exists():
        PaymentNotice.objects.create(
            user=user,
            due_date=date.today() - timedelta(days=10),
            amount=3500.00,
            description="Kasko Poliçesi 2. Taksit Ödemesi",
            status="paid"
        )
        PaymentNotice.objects.create(
            user=user,
            due_date=date.today() + timedelta(days=20),
            amount=3500.00,
            description="Kasko Poliçesi 3. Taksit Ödemesi",
            status="pending"
        )
        
    # 5. Bildirimler (CustomerAlert)
    if not CustomerAlert.objects.filter(user=user).exists():
        CustomerAlert.objects.create(
            user=user,
            title="Hasar Dosyanız İnceleniyor",
            body="CLM-99824 numaralı hasar dosyanız uzman ekibimiz tarafından incelemeye alınmıştır.",
            is_read=False
        )
        CustomerAlert.objects.create(
            user=user,
            title="Poliçe Ödeme Hatırlatması",
            body=f"Kasko poliçenizin 3. taksit ödemesi yaklaşmaktadır. Son ödeme tarihi: {(date.today() + timedelta(days=20)).strftime('%d.%m.%Y')}",
            is_read=False
        )


class PolicyViewSet(viewsets.ModelViewSet):
    serializer_class = InsurancePolicySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        auto_seed_user_data(self.request.user)
        return InsurancePolicy.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Generate random unique policy number if not provided
        policy_num = f"POL-{date.today().year}-{random.randint(10000, 99999)}"
        serializer.save(
            user=self.request.user,
            policy_number=policy_num,
            insurer_name="Insucom Sigorta A.Ş.",
            start_date=date.today(),
            end_date=date.today() + timedelta(days=365)
        )


class QuoteViewSet(viewsets.ModelViewSet):
    serializer_class = InsuranceQuoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        auto_seed_user_data(self.request.user)
        return InsuranceQuote.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        ref_code = f"QT-{random.randint(1000, 9999)}-{random.choice(['A', 'B', 'C'])}"
        serializer.save(
            user=self.request.user,
            reference_code=ref_code,
            status="sent",
            valid_until=date.today() + timedelta(days=30)
        )


class ClaimViewSet(viewsets.ModelViewSet):
    serializer_class = ClaimTicketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        auto_seed_user_data(self.request.user)
        return ClaimTicket.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        claim_num = f"CLM-{random.randint(10000, 99999)}"
        serializer.save(
            user=self.request.user,
            claim_number=claim_num,
            status="open"
        )


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentNoticeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        auto_seed_user_data(self.request.user)
        return PaymentNotice.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            due_date=date.today() + timedelta(days=30),
            status="pending"
        )


class AlertViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerAlertSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        auto_seed_user_data(self.request.user)
        return CustomerAlert.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
