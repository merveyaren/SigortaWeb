import pytest
import time
import uuid
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

class TestGeneralPages:
    def setup_method(self):
        # Her testten önce tarayıcıyı başlatır
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        # Yerel localhost adresi yerine canlı site adresini tanımlıyoruz
        self.base_url = "https://insucomsigorta.site"

    def teardown_method(self):
        # Her testten sonra tarayıcıyı kapat
        self.driver.quit()
    # TEST 24: Başarılı Kullanıcı Girişi (Login Success) Testi
    def test_login_success(self):
        self.driver.get(f"{self.base_url}/login")

        # 1. HTML içerisindeki name='username' attribute'una sahip inputu buluyoruz.
        username_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.NAME, "username"))
        )
        password_input = self.driver.find_element(By.NAME, "password")

        # 2. Input alanlarına tıklayıp (click), eski değer varsa siliyoruz (clear) ve demo kullanıcı bilgilerini yazıyoruz.
        username_input.click()
        username_input.clear()
        username_input.send_keys("deneme_user")
        time.sleep(0.5)
        
        password_input.click()
        password_input.clear()
        password_input.send_keys("Demo12345!")
        time.sleep(0.5)
        
        # 3. id='login-submit' olan Giriş butonunu JS ile tetikliyoruz.
        submit_btn = self.driver.find_element(By.ID, "login-submit")
        self.driver.execute_script("arguments[0].click();", submit_btn)

        # 4. DOĞRULAMA: Backend isteği onaylarsa sistemin bizi kullanıcı paneline ('/account/policies') atması gerekir. Yönlendirmeyi bekliyoruz.
        try:
            WebDriverWait(self.driver, 10).until(EC.url_contains("/account/policies"))
            assert "/account/policies" in self.driver.current_url
            print("Başarılı giriş testi PASSED!")
        except Exception:
            pytest.fail("HATA: Doğru bilgiler girilmesine rağmen /account/policies sayfasına yönlendirme yapılamadı (Backend çalışmıyor olabilir).")

    # TEST 25: Hatalı Bilgilerle Giriş (Login Failure) Testi
    def test_login_failure(self):
        self.driver.get(f"{self.base_url}/login")

        username_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.NAME, "username"))
        )
        password_input = self.driver.find_element(By.NAME, "password")

        # 1. Bilerek YANLIŞ kullanıcı adı ve şifre giriyoruz.
        username_input.send_keys("hatali_kullanici")
        password_input.send_keys("YanlisSifre123!")

        submit_btn = self.driver.find_element(By.ID, "login-submit")
        self.driver.execute_script("arguments[0].click();", submit_btn)

        # 2. DOĞRULAMA: Yanlış bilgi girdiğimiz için yönlendirme olmamalı, sistem ekranda uyarı metni göstermelidir.
        try:
            # Frontend kodunda hata mesajının gösterildiği <span> etiketini arıyoruz.
            error_message = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//span[contains(text(), 'Kullanıcı adı veya şifre hatalı')]"))
            )
            # Mesajın görünür olduğunu (is_displayed) onaylıyoruz.
            assert error_message.is_displayed(), "Hata mesajı DOM'da var ama ekranda görünür (displayed) değil!"
        except Exception:
            pytest.fail("HATA: Yanlış bilgi girilmesine rağmen sistem 'Kullanıcı adı veya şifre hatalı' uyarısını çıkarmadı!")    

    # TEST 26: Başarılı Kayıt Ol (Register Success) Testi
    def test_register_success(self):
        self.driver.get(f"{self.base_url}/register")

        # Benzersiz (unique) bir kullanıcı oluşturmak için UUID kütüphanesiyle rastgele 6 haneli bir eklenti üretiyoruz.
        # Bu, her test çalıştığında backend'in "Bu e-posta/kullanıcı adı zaten var" demesini önler.
        unique_suffix = str(uuid.uuid4())[:6] 
        test_username = f"tester_{unique_suffix}"
        test_email = f"tester_{unique_suffix}@sigortaweb.com"

        # Form alanlarını sırayla bulup dolduruyoruz.
        first_name_input = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.NAME, "first_name")) 
        )
        first_name_input.click()
        first_name_input.clear()
        first_name_input.send_keys("Test")
        time.sleep(0.5) 

        last_name_input = self.driver.find_element(By.NAME, "last_name")
        last_name_input.click()
        last_name_input.clear()
        last_name_input.send_keys("Kullanicisi")
        time.sleep(0.5)

        username_input = self.driver.find_element(By.NAME, "username")
        username_input.click()
        username_input.clear()
        username_input.send_keys(test_username)
        time.sleep(0.5)

        email_input = self.driver.find_element(By.NAME, "email")
        email_input.click()
        email_input.clear()
        email_input.send_keys(test_email)
        time.sleep(0.5)

        password_input = self.driver.find_element(By.NAME, "password")
        password_input.click()
        password_input.clear()
        password_input.send_keys("MerveTest123!")
        time.sleep(1)

        # Kayıt Ol butonuna Javascript ile tıklıyoruz.
        submit_btn = self.driver.find_element(By.ID, "register-submit")
        self.driver.execute_script("arguments[0].click();", submit_btn)

        # DOĞRULAMA 1: Ekranda "Kayıt Başarılı!" başlığının <h3> etiketi içinde görünmesini bekliyoruz.
        try:
            success_msg = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//h3[text()='Kayıt Başarılı!']"))
            )
            assert success_msg.is_displayed(), "Kayıt başarılı mesajı ekranda görünmüyor!"
        except Exception:
            pytest.fail("HATA: Form gönderildi ancak API'den başarılı yanıt dönmedi (Backend'i kontrol edin).")

        # DOĞRULAMA 2: Frontend kodlarında kayıt sonrası setTimeout kullanılarak otomatik /login'e yönlendirme yapılmış. Bunu da kontrol ediyoruz.
        WebDriverWait(self.driver, 5).until(EC.url_contains("/login"))
        assert "/login" in self.driver.current_url

    # TEST 27: Giriş ve Kayıt Ol Sayfaları Arası Yönlendirme Linkleri (Navigation)
    def test_auth_pages_navigation(self):
        self.driver.get(f"{self.base_url}/login")

        # 1. Login sayfasının altındaki "Hesabınız yok mu? Kayıt Olun" linkine id'si üzerinden tıklıyoruz.
        register_link = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "register-link"))
        )
        self.driver.execute_script("arguments[0].click();", register_link)

        # Register sayfasına başarıyla geçtiğimizi teyit ediyoruz.
        WebDriverWait(self.driver, 5).until(EC.url_contains("/register"))
        assert "/register" in self.driver.current_url

        # 2. Şimdi Register sayfasındaki "Zaten hesabınız var mı? Giriş Yapın" linkine tıklıyoruz.
        login_link = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "login-link"))
        )
        self.driver.execute_script("arguments[0].click();", login_link)

        # Tekrar Login sayfasına döndüğümüzü teyit ediyoruz.
        WebDriverWait(self.driver, 5).until(EC.url_contains("/login"))
        assert "/login" in self.driver.current_url

    # TEST 28: Boş Alanlarla Kayıt Olma Denemesi ve Form Validasyonu
    def test_register_empty_fields_validation(self):
        self.driver.get(f"{self.base_url}/register")
        
        submit_btn = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "register-submit"))
        )
        
        # 1. Hiçbir input alanını doldurmadan direkt 'Kayıt Ol' butonuna tıklıyoruz.
        self.driver.execute_script("arguments[0].click();", submit_btn)
        time.sleep(1)
        
        # 2. Tarayıcı HTML5 required özelliğinden dolayı isteği kesmeli, bizi başka sayfaya yönlendirmemeli.
        assert "/register" in self.driver.current_url
        
        # 3. DOM (Document Object Model) üzerinden "first_name" inputunu çekip, tarayıcının yerleşik Constraint Validation API'sine soruyoruz:
        # "Bu element validasyonlardan geçti mi?" Eğer alan boşsa ve required ise validity.valid = False dönmelidir.
        first_name_input = self.driver.find_element(By.NAME, "first_name")
        is_input_valid = self.driver.execute_script("return arguments[0].validity.valid;", first_name_input)
        
        # is_input_valid False olmalı ki not (False) = True olsun ve Assert başarılı sayılsın.
        assert not is_input_valid, "Form boş olmasına rağmen 'required' alan tarayıcı tarafından geçerli sayıldı!"

    # TEST 29: Sisteme Giriş Sonrası Güvenli Çıkış (Logout) ve Route Guard (Güvenlik) İşlemi
    def test_login_and_logout(self):
        # 1. Adım: Önce sisteme demo hesabı ile giriş yapıyoruz.
        self.driver.get(f"{self.base_url}/login")
        username_input = WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.NAME, "username")))
        username_input.send_keys("deneme_user")
        self.driver.find_element(By.NAME, "password").send_keys("Demo12345!")
        
        # EKSİK OLAN GİRİŞ BUTONUNA TIKLAMA ADIMI EKLENDİ
        submit_btn = self.driver.find_element(By.ID, "login-submit")
        self.driver.execute_script("arguments[0].click();", submit_btn)

        # İçeri girdiğimizi (paneli gördüğümüzü) doğruluyoruz.
        WebDriverWait(self.driver, 10).until(EC.url_contains("/account/policies"))
        
        # 2. Adım: Sistemde 'Çıkış' veya 'Logout' metni barındıran butonu XPath ile arayıp tıklıyoruz.
        logout_btn = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Çıkış') or contains(text(), 'Logout')]"))
        )
        self.driver.execute_script("arguments[0].click();", logout_btn)
        
        # 3. Adım: Çıkış yaptıktan sonra sistemin bizi login sayfasına veya anasayfaya attığını bekliyoruz.
        WebDriverWait(self.driver, 10).until(lambda d: "/login" in d.current_url or d.current_url.rstrip("/") == self.base_url.rstrip("/"))
        
        # 4. Adım (Güvenlik / Middleware Testi): Oturum (Session/Token) kapandıktan sonra, korumalı alana URL üzerinden doğrudan gitmeyi deniyoruz.
        self.driver.get(f"{self.base_url}/account/policies")
        time.sleep(1)
        
        # Eğer Frontend Middleware veya Backend Token Guard düzgün çalışıyorsa içeri girememeliyiz.
        assert "/account/policies" not in self.driver.current_url, "Kritik Güvenlik Açığı: Çıkış yapılmasına rağmen korumalı sayfaya doğrudan erişim sağlanabiliyor!"

    # TEST 38: Home-2 Footer "Recent Work" Linkleri Testi
    def test_home2_footer_recent_work_links(self):
        self.driver.get(f"{self.base_url}/home-2")
        actions = ActionChains(self.driver)

        # 1. 'Recent Work' altındaki 'Risk Assessment' linkini bul
        risk_link = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//footer//a[contains(text(), 'Risk Assessment')]"))
        )
        
        # 2. Elementi ortala ve fareyi üzerine götür
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", risk_link)
        time.sleep(0.5)
        actions.move_to_element(risk_link).perform()
        time.sleep(0.5)

        # 3. Tıkla ve yönlendirmeyi doğrula
        actions.click().perform()
        
        # Risk Assessment linkine tıklayınca nereye gitmesi gerekiyorsa url_contains içine onu yazmalısın. 
        # (Aşağıdaki "/services" kısmını kendi projene göre değiştirebilirsin)
        WebDriverWait(self.driver, 10).until(EC.url_contains("/services"))
        assert "/services" in self.driver.current_url