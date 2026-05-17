import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from portal.models import InsurancePolicy

# @pytest.mark.django_db: Pytest-Django eklentisine bu testin veritabanı 
# işlemleri yapacağını bildirir. Arka planda gerçek veritabanını korumak için 
# izole ve geçici bir test veritabanı (in-memory) ayağa kaldırır.
@pytest.mark.django_db 
class TestPortalAPIIntegration:
    
    def setup_method(self):
        """
        [HAZIRLIK AŞAMASI - ARRANGE]
        Her test fonksiyonundan önce otomatik olarak çalışır.
        Sisteme sanal HTTP istekleri atabilmek için bir APIClient (istemci) oluşturur,
        veritabanına sahte bir test kullanıcısı kaydeder ve bu kullanıcıya bağlı
        örnek bir sigorta poliçesi (InsurancePolicy) nesnesi üretir.
        """
        self.client = APIClient()
        User = get_user_model()
        self.test_user = User.objects.create_user(username="test_kullanici", password="TestPassword123!")
        
        InsurancePolicy.objects.create(
            user=self.test_user,
            policy_number="POL12345",
            product_name="Kasko",
            premium_amount=5000.00,
            start_date="2025-01-01",
            end_date="2026-01-01"
        )

    def test_get_user_policies_success(self):
        """
        [TEST SENARYOSU: Giriş Yapmış Kullanıcının Poliçelerini Listeleme]
        
        1. EYLEM (ACT): 
           - 'force_authenticate' ile istemciye sahte kullanıcının login olduğu bilgisi verilir.
           - Giriş yapmış bu kullanıcı adına '/api/me/policies/' endpoint'ine GET isteği atılır.
           
        2. DOĞRULAMA (ASSERT):
           - API'den dönen HTTP yanıt kodunun 200 (OK/Başarılı) olduğu doğrulanır.
           - Dönen JSON verisi içindeki ilk poliçenin numarasının, hazırlık aşamasında 
             oluşturduğumuz 'POL12345' değeri ile birebir eşleştiği matematiksel olarak kanıtlanır.
             
        BAŞARILI OLMASI: URL yönlendirmesinin, yetkilendirme (Auth) mekanizmasının, 
        veri serileştirmenin (Serializer) ve veritabanı katmanının hatasız çalıştığını gösterir.
        """
        self.client.force_authenticate(user=self.test_user)
        response = self.client.get('/api/me/policies/') 
        
        assert response.status_code == 200
        assert response.data[0]["policy_number"] == "POL12345"
    def test_get_policies_unauthorized(self):
        """
        [NEGATİF TEST 1: Yetkisiz Erişim Testi - Unauthorized]
        Açıklama: Sisteme giriş yapMAMIŞ (anonim) bir kullanıcı poliçeleri çekmeye 
        çalıştığında, sistemin Route Guard / Middleware mekanizmasının devreye girerek
        HTTP 401 Unauthorized veya HTTP 403 Forbidden döndüğünü kanıtlar.
        """
        # Herhangi bir force_authenticate çağrısı yapmıyoruz (Giriş yapılmadı)
        response = self.client.get('/api/me/policies/')
        
        # Doğrulama: Sistem içeri sızılmasına izin vermemeli ve yetki hatası dönmelidir
        assert response.status_code in [401, 403], f"Kritik Güvenlik Açığı: Giriş yapmamış kullanıcı poliçe verilerini görebiliyor! Dönen Kod: {response.status_code}"

    def test_create_policy_bad_request_missing_fields(self):
        """
        [NEGATİF TEST 2: Geçersiz Veri Girişi Testi - Bad Request]
        Açıklama: Giriş yapmış bir kullanıcı yeni bir poliçe oluşturmak istediğinde,
        eğer zorunlu alanları (örneğin policy_number veya premium_amount) eksik gönderirse,
        veritabanının kirlenmesini önlemek için backend'deki Serializer validasyonunun 
        bunu yakalayıp HTTP 400 Bad Request döndüğünü doğrular.
        """
        self.client.force_authenticate(user=self.test_user)
        
        # policy_number ve premium_amount gibi zorunlu alanları bilerek göndermiyoruz
        incomplete_payload = {
            "product_name": "Eksik Poliçe",
            "start_date": "2026-01-01",
            "end_date": "2027-01-01"
        }
        
        response = self.client.post('/api/me/policies/', data=incomplete_payload, format='json')
        
        # Doğrulama: Sistem hata vermeli ve 400 Bad Request kodu üretmelidir
        assert response.status_code == 400, f"Hata Validasyonu Çalışmıyor: Eksik veriye rağmen sistem 400 dönmedi! Dönen Kod: {response.status_code}"