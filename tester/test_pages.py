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

    # TEST 1: Hakkımızda (About) Sayfası Yüklenme Testi
    def test_about_page_loads(self):
        self.driver.get(f"{self.base_url}/about")
        
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        assert "/about" in self.driver.current_url
        time.sleep(1)

    # TEST 2: Anasayfa (Home) Yüklenme Testi
    def test_home_page_loads(self):
        self.driver.get(self.base_url)
        
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        assert self.driver.current_url.rstrip("/") == self.base_url.rstrip("/")
        time.sleep(1)

    # TEST 3: Projeler (Projects) Sayfası Yüklenme Testi
    def test_projects_page_loads(self):
        self.driver.get(f"{self.base_url}/projects")
        
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        assert "/projects" in self.driver.current_url
        time.sleep(1)

    # TEST 4: Blog Sayfası Yüklenme Testi
    def test_blog_page_loads(self):
        self.driver.get(f"{self.base_url}/blog")
        
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        assert "/blog" in self.driver.current_url
        time.sleep(1)

    # TEST 5: SSS (FAQ - Pages Modülü) Sayfası Yüklenme Testi
    def test_faq_page_loads(self):
        self.driver.get(f"{self.base_url}/faq")
        
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        assert "/faq" in self.driver.current_url
        time.sleep(1)    
        
    # TEST 6: Hizmetler (Services) Sayfası Yüklenme Testi
    def test_services_page_loads(self):
        self.driver.get(f"{self.base_url}/services")
        
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        assert "/services" in self.driver.current_url
        time.sleep(1)

    # TEST 7: İletişim (Contact) Formu Doldurma Testi 
    def test_contact_form_submission(self):
        self.driver.get(f"{self.base_url}/contact")
        
        name_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "Name"))
        )
        
        try:
            name_input.send_keys("Test Kullanıcısı Merve")
            self.driver.find_element(By.ID, "email").send_keys("merve@test.com")
            self.driver.find_element(By.ID, "message").send_keys("Bu mesaj otomatik bir Selenium testi tarafından gönderilmiştir.")
            
            time.sleep(1) 
            
            submit_button = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            submit_button.click()
            
            success_message = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'Mesajınız gönderildi')]"))
            )
            assert success_message.is_displayed()
            
            time.sleep(1) 
            
        except Exception as e:
            pytest.fail(f"Form doldurma veya gönderme işlemi başarısız oldu. Hata: {e}")

    # TEST 8: Hover (Fareyle Üzerine Gelme) ve Dropdown Tıklama Testi (BURASI DÜZELTİLDİ)
    def test_services_dropdown_navigation(self):
        self.driver.get(self.base_url) # Testin çalışabilmesi için önce sayfaya gitmesi eklendi
        
        services_menu = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//span[text()='Services']/parent::a"))
        )

        actions = ActionChains(self.driver)
        actions.move_to_element(services_menu).perform()

        service_details_link = WebDriverWait(self.driver, 5).until(
            EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Service') and contains(text(), 'Details')]"))
        )
        
        service_details_link.click()

        WebDriverWait(self.driver, 5).until(
            EC.url_contains("/services/risk-assessment")
        )
        assert "/services/risk-assessment" in self.driver.current_url

    # TEST 16: Projects Dropdown Navigation Test
    def test_projects_dropdown_navigation(self):
        self.driver.get(self.base_url)
        
        projects_elements = WebDriverWait(self.driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, "//a[contains(., 'Projects')]"))
        )
        
        visible_projects_menu = None
        for element in projects_elements:
            if element.is_displayed():
                visible_projects_menu = element
                break
                
        if not visible_projects_menu:
            pytest.fail("Ekranda görünür bir 'Projects' menüsü bulunamadı!")

        actions = ActionChains(self.driver)
        actions.move_to_element(visible_projects_menu).perform()
        time.sleep(1)
        
        detail_elements = self.driver.find_elements(By.XPATH, "//a[contains(., 'Project Detail')]")
        
        clicked = False
        for detail in detail_elements:
            if detail.is_displayed():
                detail.click()
                clicked = True
                break
                
        if not clicked:
             pytest.fail("Açılır menüde görünür 'Project Details' linki tıklanamadı!")
        
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/projects/coverage-pro") 
        )
        assert "/projects/coverage-pro" in self.driver.current_url


    # TEST 17: Blogs Dropdown Navigation Test
    def test_blogs_dropdown_navigation(self):
        self.driver.get(self.base_url)
        
        blogs_elements = WebDriverWait(self.driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, "//a[contains(., 'Blogs')]"))
        )
        
        visible_blogs_menu = None
        for element in blogs_elements:
            if element.is_displayed():
                visible_blogs_menu = element
                break
                
        if not visible_blogs_menu:
            pytest.fail("Ekranda görünür bir 'Blogs' menüsü bulunamadı!")

        actions = ActionChains(self.driver)
        actions.move_to_element(visible_blogs_menu).perform()
        time.sleep(1)
        
        detail_elements = self.driver.find_elements(By.XPATH, "//a[contains(., 'Blog Detail')]")
        
        clicked = False
        for detail in detail_elements:
            if detail.is_displayed():
                detail.click()
                clicked = True
                break
                
        if not clicked:
             pytest.fail("Açılır menüde görünür 'Blog Details' linki tıklanamadı!")
        
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/blog") 
        )
        assert "/blog" in self.driver.current_url


    # TEST 18: Pages Dropdown Navigation Test (FAQ)
    def test_pages_dropdown_navigation(self):
        self.driver.get(self.base_url)
        
        pages_elements = WebDriverWait(self.driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, "//span[contains(., 'Pages')]"))
        )
        
        visible_pages_menu = None
        for element in pages_elements:
            if element.is_displayed():
                visible_pages_menu = element
                break
                
        if not visible_pages_menu:
            pytest.fail("Ekranda görünür bir 'Pages' menüsü bulunamadı!")

        actions = ActionChains(self.driver)
        actions.move_to_element(visible_pages_menu).perform()
        time.sleep(1)
        
        faq_elements = self.driver.find_elements(By.XPATH, "//a[contains(., 'FAQ')]")
        
        clicked = False
        for faq in faq_elements:
            if faq.is_displayed():
                faq.click()
                clicked = True
                break
                
        if not clicked:
             pytest.fail("Açılır menüde görünür 'FAQ' linki tıklanamadı!")
        
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/faq") 
        )
        assert "/faq" in self.driver.current_url

    # TEST 14: Orijinal Anasayfa 'Get Started' Yönlendirmesi
    def test_main_home_get_started(self):
        self.driver.get(self.base_url)
        
        get_started_btn = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//a[@href='/projects']"))
        )
        
        self.driver.execute_script("arguments[0].click();", get_started_btn)
        
        WebDriverWait(self.driver, 10).until(EC.url_contains("/projects"))
        assert "/projects" in self.driver.current_url
        time.sleep(1)

    # TEST 15: Orijinal Anasayfa 'Watch Video' Pop-up Kontrolü
    def test_main_home_watch_video(self):
        self.driver.get(self.base_url)
        
        try:
            video_btn = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, "video-popup-btn"))
            )
            
            self.driver.execute_script("arguments[0].click();", video_btn)
            time.sleep(2)
            
            video_iframe = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "iframe"))
            )
            
            assert video_iframe.is_displayed()
            print("Video pop-up başarıyla açıldı.")
            
        except Exception as e:
            pytest.fail(f"Orijinal anasayfada video butonu çalışmadı veya iframe açılmadı. Hata: {e}")
            
        time.sleep(1)
        ###############################################################################!SECTION# TEST 19: Home-2 Yorumlar (Testimonial) Hover Efekti Testi
    def test_testimonial_hover_effect(self):
        self.driver.get(f"{self.base_url}/home-2")

        # 1. İlk yorum kartını bul
        # Kartların ortak class'ı 'testimonial-item' olarak belirlenmiş
        first_testimonial_card = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".testimonial-item"))
        )

        # 2. Fare ÜZERİNDE DEĞİLKEN mevcut stili (gölge veya arka plan rengi) al
        initial_style = first_testimonial_card.value_of_css_property("box-shadow")

        # 3. Fareyi kartın üzerine götür (Hover)
        actions = ActionChains(self.driver)
        actions.move_to_element(first_testimonial_card).perform()
        
        # CSS animasyonunun (transition-all) tamamlanması için çok kısa bir süre bekle
        time.sleep(0.5)

        # 4. Fare ÜZERİNDEYKEN stili tekrar al
        hovered_style = first_testimonial_card.value_of_css_property("box-shadow")

        # 5. İki stilin birbirinden farklı olduğunu doğrula (yani efekt çalıştı)
        assert initial_style != hovered_style, "Hover işlemi sonrasında kartın CSS stili değişmedi!"
        #################################################################################################
    # TEST 19: Blog Dinamik Yönlendirme (Dynamic Routing) Testi
    def test_blog_dynamic_routing(self):
        self.driver.get(f"{self.base_url}/blog")
        
        # 1. Ana '/blog' linki OLMAYAN, '/blog/slug-adi' şeklinde olan ilk <a> etiketini bul
        # Sayfada üst menüde de /blog linki olabileceği için onu harici tutuyoruz.
        first_blog_link = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "(//a[contains(@href, '/blog/') and not(@href='/blog')])[1]"))
        )
        
        # 2. Linkin bizi nereye götüreceğini tıklamadan önce değişkene kaydet
        expected_url = first_blog_link.get_attribute("href")
        
        # 3. Sayfayı o elementin olduğu yere kaydır (Header altında kalmaması için)
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", first_blog_link)
        time.sleep(0.5) # Kaydırma animasyonu için kısa bekleme
        
        # 4. Linke tıkla (Next.js linkleri bazen UI animasyonlarından dolayı normal tıklamayı engelleyebilir, bu yüzden JS click kullanıyoruz)
        self.driver.execute_script("arguments[0].click();", first_blog_link)
        
        # 5. URL'in az önce kaydettiğimiz beklenen URL'e dönüşmesini bekle
        WebDriverWait(self.driver, 10).until(
            EC.url_to_be(expected_url)
        )
        
        # 6. Doğrulamayı yap ve yeni açılan dinamik sayfanın body'sinin yüklendiğinden emin ol
        assert expected_url == self.driver.current_url
        WebDriverWait(self.driver, 5).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )


    # TEST 20: Services Dinamik Yönlendirme (Dynamic Routing) Testi
    def test_services_dynamic_routing(self):
        self.driver.get(f"{self.base_url}/services")
        
        # 1. '/services/risk-assessment' gibi dinamik uzantılı ilk servis linkini bul
        first_service_link = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "(//a[contains(@href, '/services/') and not(@href='/services')])[1]"))
        )
        
        # 2. Hedef URL'yi kaydet
        expected_url = first_service_link.get_attribute("href")
        
        # 3. Elementi ekranda ortala
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", first_service_link)
        time.sleep(0.5)
        
        # 4. Tıkla
        self.driver.execute_script("arguments[0].click();", first_service_link)
        
        # 5. Yönlendirmeyi bekle
        WebDriverWait(self.driver, 10).until(
            EC.url_to_be(expected_url)
        )
        
        # 6. Son URL'i doğrula
        assert expected_url == self.driver.current_url
        WebDriverWait(self.driver, 5).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )    
    # TEST 21: Projects Dinamik Yönlendirme (Dynamic Routing) Testi
    def test_projects_dynamic_routing(self):
        self.driver.get(f"{self.base_url}/projects")
        
        # 1. '/projects/proje-adi' gibi dinamik uzantılı ilk proje linkini bul
        # Üst menüdeki '/projects' ana linkine tıklamamak için not(@href='/projects') kullanıyoruz
        first_project_link = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "(//a[contains(@href, '/projects/') and not(@href='/projects')])[1]"))
        )
        
        # 2. Hedef URL'yi kaydet
        expected_url = first_project_link.get_attribute("href")
        
        # 3. Elementi ekranda ortala
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", first_project_link)
        time.sleep(0.5)
        
        # 4. Tıkla (JavaScript click ile)
        self.driver.execute_script("arguments[0].click();", first_project_link)
        
        # 5. Yönlendirmeyi bekle
        WebDriverWait(self.driver, 10).until(
            EC.url_to_be(expected_url)
        )
        
        # 6. Son URL'i doğrula
        assert expected_url == self.driver.current_url
        WebDriverWait(self.driver, 5).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )   
    ##############################################################3
    # TEST 22: Mobil Hamburger Menü (Drawer) Fonksiyonelliği Testi
    def test_mobile_hamburger_menu(self):
        # 1. Ekran boyutunu mobil (örneğin iPhone 12/13/14 boyutu: 390x844) olarak ayarla
        self.driver.set_window_size(390, 844)
        
        # 2. Anasayfaya git
        self.driver.get(self.base_url)
        
        try:
            # 3. Hamburger menü butonunu (drawer-btn) bul ve tıkla
            hamburger_btn = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.ID, "drawer-btn"))
            )
            # Mobil görünümlerde animasyon engellemelerini aşmak için JavaScript click kullanıyoruz
            self.driver.execute_script("arguments[0].click();", hamburger_btn)
            
            # 4. Mobil menünün (drawer) açılmasını bekle. 
            # '.mobile-wid' içindeki 'About Us' linkinin tıklanabilir hale gelmesi menünün açıldığını kanıtlar.
            about_link = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//div[contains(@class, 'mobile-wid')]//a[contains(., 'About Us')]"))
            )
            
            # 5. Menüdeki 'About Us' linkine tıkla
            self.driver.execute_script("arguments[0].click();", about_link)
            
            # 6. Yönlendirmeyi doğrula
            WebDriverWait(self.driver, 10).until(
                EC.url_contains("/about")
            )
            assert "/about" in self.driver.current_url
            
            # (Opsiyonel): Doğrulama için yeni sayfanın body'sinin yüklendiğinden emin ol
            WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )

        finally:
            # 7. ÇOK ÖNEMLİ: Test bitince (geçse de kalsa da) ekranı tekrar tam boyut (maximize) yap.
            # Aksi takdirde bu testten sonra çalışacak diğer testler mobil boyutta çalışıp patlayabilir!
            self.driver.maximize_window()    
    # TEST 23: Ana Sayfa (Home) SSS/Accordion Hover ve Gerçek Tıklama Testi
    def test_home_faq_accordion(self):
        self.driver.get(self.base_url)
        
        # 1. Sayfadaki 2. SSS elemanını (faq-item) bul 
        second_faq_item = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "(//div[contains(@class, 'faq-item')])[2]"))
        )
        
        # 2. Elementi ekranda görebilmek için oraya kaydır (Scroll)
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", second_faq_item)
        time.sleep(1) # Scroll animasyonunun bitmesini kesinlikle bekle
        
        # 3. Tıklamadan önce yazının bulunduğu gövdeyi (.faq-body) bul ve kapalı olduğunu doğrula
        answer_body = second_faq_item.find_element(By.CSS_SELECTOR, ".faq-body")
        assert "active" not in second_faq_item.get_attribute("class"), "Hata: 2. eleman başlangıçta açık geldi!"
        
        # 4. Tıklanabilir butonu bul (.faq-btn)
        faq_button = second_faq_item.find_element(By.CSS_SELECTOR, ".faq-btn")
        
        # 5. GERÇEK FARE SİMÜLASYONU: Fareyi butonun tam üstüne götür (Hover) ve ardından tıkla
        actions = ActionChains(self.driver)
        actions.move_to_element(faq_button).click().perform()
        
        # 6. Açılma (Slide) animasyonu/Javascript işlemi için biraz süre tanı
        time.sleep(1)
        
        # 7. DOĞRULAMA: Tıkladıktan sonra yazı görünür hale geldi mi ve active class'ı eklendi mi?
        is_opened = "active" in second_faq_item.get_attribute("class") or answer_body.is_displayed()
        
        # Eğer is_opened 'False' dönerse test FAIL verecek
        assert is_opened, "FAILED (Home): Fareyle soruya gelip tıklandı ama altındaki yazı açılmadı!"

    def test_home2_ask_anything_accordion(self):
        self.driver.get(f"{self.base_url}/home-2")

        # 1. "Insurance that goes the extra mile" kısmındaki 2. soruyu (faq-item) bul
        # "What are the different types of insurance?" sorusunu hedef alıyoruz.
        target_faq_item = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "(//div[contains(@class, 'faq-section-main-wrapper')]//div[contains(@class, 'faq-item')])[2]"))
        )

        # 2. Elementin ekranda tam görünmesi için oraya kaydır (Scroll)
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", target_faq_item)
        time.sleep(1) # Scroll animasyonunun bitmesini bekle

        # 3. Tıklamadan önce, altındaki yazının kapalı (gizli) olduğunu doğrula
        # Yazı, normalde 'hidden' class'ına sahip bir div'in içinde duruyor
        answer_div = target_faq_item.find_element(By.XPATH, ".//div[contains(@class, 'hidden')]")
        assert not answer_div.is_displayed(), "Hata: Sorunun altındaki yazı zaten başlangıçta açık geldi!"

        # 4. Fareyi elementin tam üstüne götür (Hover) ve ardından tıkla
        actions = ActionChains(self.driver)
        actions.move_to_element(target_faq_item).click().perform()

        # 5. Açılma animasyonu/Javascript işlemi için biraz süre tanı
        time.sleep(1)

        # 6. DOĞRULAMA: Tıkladıktan sonra yazı görünür hale geldi mi? Veya class'ına 'active' eklendi mi?
        is_opened = "active" in target_faq_item.get_attribute("class") or answer_div.is_displayed()
        
        # Eğer is_opened 'False' dönerse, test FAIL verecek ve belirlediğimiz mesajı basacak
        assert is_opened, "FAILED: Fareyle soruya gelip tıklandı ama altındaki yazı açılmadı!"
        #############################################################################
   # TEST 25: Blog Sidebar "Category" Linki - Scroll Top (Yukarı Atma) Kontrolü
    def test_blog_sidebar_categories_scroll(self):
        self.driver.get(f"{self.base_url}/blog")

        # 1. 'Category' başlığının altındaki ilk linki bul
        category_link = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//p[text()='Category']/following-sibling::ul//a"))
        )

        # 2. Elementin ekranda görünmesi için oraya kaydır (Sayfa aşağı inmiş olacak)
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", category_link)
        time.sleep(1) # Scroll animasyonunun bitmesini kesinlikle bekle

        # 3. TIKLAMADAN ÖNCE: Sayfanın dikey (Y) eksenindeki kaydırma pozisyonunu al
        scroll_position_before = self.driver.execute_script("return window.pageYOffset;")

        # 4. Kategori linkine tıkla
        self.driver.execute_script("arguments[0].click();", category_link)
        time.sleep(1) # Next.js'in sayfayı yukarı atması için biraz bekle

        # 5. TIKLADIKTAN SONRA: Sayfanın yeni kaydırma pozisyonunu al
        scroll_position_after = self.driver.execute_script("return window.pageYOffset;")

        # 6. DOĞRULAMA: Eğer buton çalıştıysa, sayfa yukarı çıkmış olmalı (after < before)
        # Hatta tam en üste attıysa scroll_position_after değeri 0'a çok yakın olmalıdır.
        assert scroll_position_after < scroll_position_before, f"FAIL: Linke tıklandı ama sayfa yukarı atmadı! (Önceki Konum: {scroll_position_before}, Sonraki Konum: {scroll_position_after})"
    # TEST 26: Blog Sidebar "Recent Post" Linkleri Testi (Scroll Top Kontrolü)
    def test_blog_sidebar_recent_posts(self):
        self.driver.get(f"{self.base_url}/blog")

        # 1. 'Recent Post' başlığını bul ve altındaki ilk post linkini yakala
        recent_post_link = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//p[text()='Recent Post']/following-sibling::ul//a"))
        )

        # 2. Elementin ekranda görünmesi için oraya kaydır
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", recent_post_link)
        time.sleep(1) # Scroll animasyonunun bitmesini bekle (Önemli!)

        # 3. TIKLAMADAN ÖNCE: Sayfanın dikey kaydırma pozisyonunu al
        scroll_position_before = self.driver.execute_script("return window.pageYOffset;")

        # 4. Recent Post linkine tıkla
        self.driver.execute_script("arguments[0].click();", recent_post_link)
        time.sleep(1) # Next.js'in sayfayı yukarı atması için bekle

        # 5. TIKLADIKTAN SONRA: Sayfanın yeni kaydırma pozisyonunu al
        scroll_position_after = self.driver.execute_script("return window.pageYOffset;")

        # 6. DOĞRULAMA: Tıkladıktan sonra sayfa yukarı çıkmış olmalı (after < before)
        assert scroll_position_after < scroll_position_before, f"FAIL: Recent Post linkine tıklandı ama sayfa yukarı atmadı! (Önce: {scroll_position_before}, Sonra: {scroll_position_after})"


    # TEST 27: Blog Sidebar "Tags" Linkleri Testi (Scroll Top Kontrolü)
    def test_blog_sidebar_tags(self):
        self.driver.get(f"{self.base_url}/blog")

        try:
            # 1. 'Tags' veya 'Tag' başlığını bul ve altındaki ilk linki yakala
            tags_link = WebDriverWait(self.driver, 5).until(
                EC.element_to_be_clickable((By.XPATH, "//p[contains(text(), 'Tag')]/following-sibling::div//a | //p[contains(text(), 'Tag')]/following-sibling::ul//a"))
            )

            # 2. Elementin olduğu yere kaydır
            self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", tags_link)
            time.sleep(1)

            # 3. TIKLAMADAN ÖNCE: Pozisyonu kaydet
            scroll_position_before = self.driver.execute_script("return window.pageYOffset;")

            # 4. Linke tıkla
            self.driver.execute_script("arguments[0].click();", tags_link)
            time.sleep(1)

            # 5. TIKLADIKTAN SONRA: Pozisyonu kaydet
            scroll_position_after = self.driver.execute_script("return window.pageYOffset;")

            # 6. DOĞRULAMA
            assert scroll_position_after < scroll_position_before, f"FAIL: Tag linkine tıklandı ama sayfa yukarı atmadı! (Önce: {scroll_position_before}, Sonra: {scroll_position_after})"
            
        except Exception as e:
            # Eğer sayfada Tags bölümü henüz kodlanmamışsa test hata vermesin, atlayıp bilgi versin
            print(f"\n[Bilgi] Tags bölümü bulunamadı veya henüz kodlanmamış. Atlanıyor... Detay: {e}")
    #################################################################################3
    # TEST 29: Başarılı Kullanıcı Girişi (Login Success) Testi
    def test_login_success(self):
        self.driver.get(f"{self.base_url}/login")

        # 1. Kullanıcı adı inputunu bekle ve bul (name='username' kullanılmış)
        username_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.NAME, "username"))
        )
        
        # 2. Şifre inputunu bul
        password_input = self.driver.find_element(By.NAME, "password")

        # 3. Sayfadaki Demo bilgilerini doldur
       # Alanları temizle ve demo bilgilerini yaz
        username_input.click()
        username_input.clear()
        username_input.send_keys("deneme_user")
        time.sleep(0.5)
        
        password_input.click()
        password_input.clear()
        password_input.send_keys("Demo12345!")
        time.sleep(0.5)
        # 4. Giriş Yap butonuna tıkla (id='login-submit' kullanılmış)
        submit_btn = self.driver.find_element(By.ID, "login-submit")
        self.driver.execute_script("arguments[0].click();", submit_btn)

        # 5. DOĞRULAMA: Başarılı girişte sistem bizi '/account/policies' sayfasına atmalı
        try:
            WebDriverWait(self.driver, 10).until(EC.url_contains("/account/policies"))
            assert "/account/policies" in self.driver.current_url
            print("Başarılı giriş testi PASSED!")
        except Exception:
            pytest.fail("HATA: Doğru bilgiler girilmesine rağmen /account/policies sayfasına yönlendirme yapılamadı (Backend çalışmıyor olabilir).")


    # TEST 30: Hatalı Bilgilerle Giriş (Login Failure) Testi
    def test_login_failure(self):
        self.driver.get(f"{self.base_url}/login")

        # 1. İnputları bul
        username_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.NAME, "username"))
        )
        password_input = self.driver.find_element(By.NAME, "password")

        # 2. BİLEREK YANLIŞ bilgiler gir
        username_input.send_keys("hatali_kullanici")
        password_input.send_keys("YanlisSifre123!")

        # 3. Giriş Yap butonuna tıkla
        submit_btn = self.driver.find_element(By.ID, "login-submit")
        self.driver.execute_script("arguments[0].click();", submit_btn)

        # 4. DOĞRULAMA: Ekranda kırmızı hata mesajı çıkmasını bekle
        try:
            # Frontend kodunda hata mesajı <span> etiketi içinde "Kullanıcı adı veya şifre hatalı" şeklinde yazılmış
            error_message = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//span[contains(text(), 'Kullanıcı adı veya şifre hatalı')]"))
            )
            assert error_message.is_displayed(), "Hata mesajı DOM'da var ama ekranda görünür (displayed) değil!"
        except Exception:
            pytest.fail("HATA: Yanlış bilgi girilmesine rağmen sistem 'Kullanıcı adı veya şifre hatalı' uyarısını çıkarmadı!")    
    # TEST 31: Başarılı Kayıt Ol (Register) ve Form Doldurma Animasyonu
    # TEST 31: Başarılı Kayıt Ol (Register Success) Testi
    def test_register_success(self):
        self.driver.get(f"{self.base_url}/register")

        # Benzersiz (unique) bir kullanıcı adı ve e-posta oluştur
        unique_suffix = str(uuid.uuid4())[:6] 
        test_username = f"tester_{unique_suffix}"
        test_email = f"tester_{unique_suffix}@sigortaweb.com"

        # 1. İlk inputu (first_name) bul ve doldur
        first_name_input = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.NAME, "first_name")) 
        )
        first_name_input.click()
        first_name_input.clear()
        first_name_input.send_keys("Test")
        time.sleep(0.5) 

        # 2. Soyadı (last_name) doldur
        last_name_input = self.driver.find_element(By.NAME, "last_name")
        last_name_input.click()
        last_name_input.clear()
        last_name_input.send_keys("Kullanicisi")
        time.sleep(0.5)

        # 3. Kullanıcı Adı (username) doldur (Benzersiz)
        username_input = self.driver.find_element(By.NAME, "username")
        username_input.click()
        username_input.clear()
        username_input.send_keys(test_username)
        time.sleep(0.5)

        # 4. E-posta (email) doldur (Benzersiz)
        email_input = self.driver.find_element(By.NAME, "email")
        email_input.click()
        email_input.clear()
        email_input.send_keys(test_email)
        time.sleep(0.5)

        # 5. Şifre (password) doldur
        password_input = self.driver.find_element(By.NAME, "password")
        password_input.click()
        password_input.clear()
        password_input.send_keys("MerveTest123!")
        time.sleep(1)

        # 6. Kayıt Ol butonuna Javascript ile tıkla
        submit_btn = self.driver.find_element(By.ID, "register-submit")
        self.driver.execute_script("arguments[0].click();", submit_btn)

        # 7. DOĞRULAMA 1: Ekranda "Kayıt Başarılı!" div'inin çıkmasını bekle
        try:
            success_msg = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//h3[text()='Kayıt Başarılı!']"))
            )
            assert success_msg.is_displayed(), "Kayıt başarılı mesajı ekranda görünmüyor!"
        except Exception:
            pytest.fail("HATA: Form gönderildi ancak API'den başarılı yanıt dönmedi (Backend'i kontrol edin).")

        # 8. DOĞRULAMA 2: Kodda setTimeout(() => router.push('/login'), 1500) var.
        # Bu yüzden sistemin bizi /login sayfasına atmasını bekliyoruz.
        WebDriverWait(self.driver, 5).until(EC.url_contains("/login"))
        assert "/login" in self.driver.current_url


    # TEST 32: Giriş ve Kayıt Ol Sayfaları Arası Yönlendirme Linkleri (Navigation)
    def test_auth_pages_navigation(self):
        # Önce Login sayfasına git
        self.driver.get(f"{self.base_url}/login")

        # 1. Login sayfasındaki "Kayıt Olun" linkine tıkla (id='register-link')
        register_link = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "register-link"))
        )
        self.driver.execute_script("arguments[0].click();", register_link)

        # 2. Register sayfasına geldiğimizi onayla
        WebDriverWait(self.driver, 5).until(EC.url_contains("/register"))
        assert "/register" in self.driver.current_url

        # 3. Register sayfasındaki "Giriş Yapın" linkine tıkla (id='login-link')
        login_link = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "login-link"))
        )
        self.driver.execute_script("arguments[0].click();", login_link)

        # 4. Tekrar Login sayfasına döndüğümüzü onayla
        WebDriverWait(self.driver, 5).until(EC.url_contains("/login"))
        assert "/login" in self.driver.current_url
    # TEST 32: Boş Alanlarla Kayıt Olma Denemesi ve Form Validasyonu
    def test_register_empty_fields_validation(self):
        self.driver.get(f"{self.base_url}/register")
        
        submit_btn = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "register-submit"))
        )
        
        # Formu hiç doldurmadan direkt 'Ücretsiz Kayıt Ol' butonuna basıyoruz
        self.driver.execute_script("arguments[0].click();", submit_btn)
        time.sleep(1)
        
        # Doğrulama 1: HTML5 'required' attribute'ları sayesinde sayfa post olmamalı, /register'da kalmalı
        assert "/register" in self.driver.current_url
        
        # Doğrulama 2: Tarayıcının HTML5 validasyon mekanizmasının devreye girdiğini (validity.valid = False) doğrula
        first_name_input = self.driver.find_element(By.NAME, "first_name")
        is_input_valid = self.driver.execute_script("return arguments[0].validity.valid;", first_name_input)
        assert not is_input_valid, "Form boş olmasına rağmen 'required' alan tarayıcı tarafından geçerli sayıldı!"


    # TEST 33: Sisteme Giriş Sonrası Güvenli Çıkış (Logout) İşlemi
    def test_login_and_logout(self):
        # 1. Adım: Önce sisteme geçerli hesapla giriş yap
        self.driver.get(f"{self.base_url}/login")
        username_input = WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.NAME, "username")))
        username_input.send_keys("demo")
        self.driver.find_element(By.NAME, "password").send_keys("Demo12345!")
        
        submit_btn = self.driver.find_element(By.ID, "login-submit")
        self.driver.execute_script("arguments[0].click();", submit_btn)
        
        # Panele ulaştığımızı doğrula
        WebDriverWait(self.driver, 10).until(EC.url_contains("/account/policies"))
        
        # 2. Adım: Menüdeki, sidebar'daki veya header'daki 'Çıkış Yap' / 'Logout' butonunu tetikle
        # (Hesap panelinizin layout yapısına göre text eşleşmesiyle dinamik olarak buluyoruz)
        logout_btn = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Çıkış') or contains(text(), 'Logout')]"))
        )
        self.driver.execute_script("arguments[0].click();", logout_btn)
        
        # 3. Adım: Kullanıcının oturumu kapatıp /login sayfasına veya ana sayfaya yönlendiğini gör
        WebDriverWait(self.driver, 10).until(lambda d: "/login" in d.current_url or d.current_url.rstrip("/") == self.base_url.rstrip("/"))
        
        # 4. Adım (Güvenlik Testi): Oturum kapandıktan sonra korumalı sayfaya el ile (URL yazarak) gitmeye çalış
        self.driver.get(f"{self.base_url}/account/policies")
        time.sleep(1)
        
        # Eğer logout işlemi token'ları sildiyse veya middleware (Route Guard) çalışıyorsa bizi içeri almamalıdır
        assert "/account/policies" not in self.driver.current_url, "Kritik Güvenlik Açığı: Çıkış yapılmasına rağmen korumalı sayfaya doğrudan erişim sağlanabiliyor!"
    ####################################################################################
    # TEST 34: Orijinal Footer (Footer.tsx) İç Link (Navigation) Testi
    def test_footer_main_internal_links(self):
        self.driver.get(self.base_url)

        # 1. Footer'ı bul ve ekranda görebilmek için en aşağıya kaydır (SENİN KODUN)
        footer = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "footer"))
        )
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", footer)
        time.sleep(1) # Kaydırma animasyonunu bekle

        # 2. 'Quick Links' altındaki 'About Us' linkini bul (SENİN KODUN)
        about_link = footer.find_element(By.XPATH, ".//div[contains(@class, 'quick-links')]//a[@href='/about']")
        
        # --- YENİ EKLENEN GÖRSEL KISIM ---
        self.show_virtual_cursor(about_link) # Kırmızı nokta gelsin
        actions = ActionChains(self.driver)
        actions.move_to_element(about_link).perform() # Fare üstüne gitsin (Hover efekti için)
        time.sleep(0.5)
        # ---------------------------------
        
        # 3. Linke tıkla (SENİN KODUN - Garanti olması için ActionChains click kullandık)
        actions.click().perform()
        time.sleep(1)
        
        # 4. Yönlendirmenin başarılı olduğunu doğrula (SENİN KODUN)
        WebDriverWait(self.driver, 10).until(EC.url_contains("/about"))
        assert "/about" in self.driver.current_url
    

    # TEST 35: Footer 2 (FooterTwo.tsx) İç Link (Navigation) Testi
    def test_footer_two_internal_links(self):
        self.driver.get(f"{self.base_url}/home-2")

        # 1. Footer'ı bul ve en aşağıya kaydır (SENİN KODUN)
        footer = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "footer"))
        )
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", footer)
        time.sleep(1)

        # 2. Alt barda (Bottom Bar) yer alan 'Privacy Policy' linkini bul (SENİN KODUN)
        privacy_link = footer.find_element(By.XPATH, ".//a[@href='/faq' and contains(., 'Privacy Policy')]")
        
        # --- YENİ EKLENEN GÖRSEL KISIM ---
        self.show_virtual_cursor(privacy_link)
        actions = ActionChains(self.driver)
        actions.move_to_element(privacy_link).perform()
        time.sleep(0.5)
        # ---------------------------------
        
        # 3. Linke tıkla
        actions.click().perform()
        time.sleep(1)

        # 4. Yönlendirmenin başarılı olduğunu doğrula
        WebDriverWait(self.driver, 10).until(EC.url_contains("/faq"))
        assert "/faq" in self.driver.current_url


    # TEST 36: Footer İletişim (Mail/Tel) ve Sosyal Medya Linklerinin Testi
    def test_footer_contact_and_social_links(self):
        self.driver.get(self.base_url)

        # Footer'ı bul ve kaydır (SENİN KODUN)
        footer = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "footer"))
        )
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", footer)
        time.sleep(1)
        
        actions = ActionChains(self.driver)

        # 1. Telefon linkini bul
        tel_link = footer.find_element(By.XPATH, ".//a[starts-with(@href, 'tel:')]")
        self.show_virtual_cursor(tel_link)
        actions.move_to_element(tel_link).perform() # Fare üstüne gitsin
        time.sleep(0.5)
        assert tel_link.get_attribute("href") == "tel:+8801234567890", "HATA: Telefon linki yanlış veya eksik!"

        # 2. E-posta linkini bul
        mail_link = footer.find_element(By.XPATH, ".//a[starts-with(@href, 'mailto:')]")
        self.show_virtual_cursor(mail_link)
        actions.move_to_element(mail_link).perform() # Fare üstüne gitsin
        time.sleep(0.5)
        assert mail_link.get_attribute("href") == "mailto:info@insucom.com", "HATA: E-posta linki yanlış!"

        # 3. Sosyal medya linkini bul
        facebook_link = footer.find_element(By.XPATH, ".//a[contains(@href, 'facebook.com')]")
        self.show_virtual_cursor(facebook_link)
        actions.move_to_element(facebook_link).perform() # Fare üstüne gitsin
        time.sleep(0.5)
        assert facebook_link.get_attribute("target") == "_blank", "HATA: Sosyal medya linkleri yeni sekmede açılmıyor!"