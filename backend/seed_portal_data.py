import os
import django

# Django ayarlarını yükle
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth import get_user_model
from portal.models import InsurancePolicy, InsuranceQuote, ClaimTicket, PaymentNotice, CustomerAlert
from datetime import date, timedelta

User = get_user_model()
users = User.objects.all()

print(f"Toplam kullanıcı sayısı: {users.count()}")

for user in users:
    print(f"\nKullanıcı için veri ekleniyor: {user.username}")
    
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
        print("  -> 2 adet Poliçe oluşturuldu.")
        
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
        print("  -> 2 adet Teklif oluşturuldu.")
        
    # 3. Hasar Kayıtları (ClaimTicket)
    if not ClaimTicket.objects.filter(user=user).exists():
        ClaimTicket.objects.create(
            user=user,
            claim_number="CLM-99824",
            incident_date=date.today() - timedelta(days=15),
            description="Park halindeki araca sol arka kapıdan sürtme hasarı.",
            status="review"
        )
        print("  -> 1 adet Hasar Kaydı oluşturuldu.")
        
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
        print("  -> 2 adet Ödeme Planı oluşturuldu.")
        
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
        print("  -> 2 adet Bildirim oluşturuldu.")

print("\nVeri tohumlama başarıyla tamamlandı!")
