# Postman Test Rehberi (Adim Adim)

Bu dokuman ile backend endpointlerini hatasiz sekilde test edebilirsin.

## 1) Hazirlik

1. Backend'i calistir:
   - `.\.venv\Scripts\python.exe manage.py runserver`
2. (Opsiyonel ama onerilir) Demo veri yukle:
   - `.\.venv\Scripts\python.exe manage.py seed_demo_data`
3. Postman'i ac.

## 2) Postman Environment Olustur

Environment degiskenleri:

- `base_url` = `http://127.0.0.1:8000/api`
- `access_token` = (ilk basta bos)
- `refresh_token` = (ilk basta bos)
- `service_slug` = `trafik-sigortasi`
- `blog_slug` = `sigorta-teknolojisi-2026`
- `project_slug` = `lojistik-filo-projesi`

## 3) Collection Olustur

Yeni collection: `Insucom Backend Tests`

Collection Authorization:
- Type: `Bearer Token`
- Token: `{{access_token}}`

Not: Public endpointlerde authorization gerekmiyor; private endpointlerde bu otomatik kullanilir.

## 4) Request Sirasiyla Test Et

Asagidaki sira ile gidersen en az hata ile ilerlersin.

### A) Public endpointler

1. `GET {{base_url}}/pages/home/` -> `200`
2. `GET {{base_url}}/pages/home-2/` -> `200`
3. `GET {{base_url}}/pages/about/` -> `200`
4. `GET {{base_url}}/services/` -> `200`
5. `GET {{base_url}}/services/{{service_slug}}/` -> `200`
6. `GET {{base_url}}/blog/` -> `200`
7. `GET {{base_url}}/blog/{{blog_slug}}/` -> `200`
8. `GET {{base_url}}/projects/` -> `200`
9. `GET {{base_url}}/projects/{{project_slug}}/` -> `200`
10. `GET {{base_url}}/faq/` -> `200`
11. `GET {{base_url}}/contact/` -> `200`

### B) Contact form test

12. `POST {{base_url}}/contact/messages/`

Body (raw/json):
```json
{
  "name": "Postman User",
  "email": "postman@example.com",
  "message": "Merhaba, bu bir test mesajidir."
}
```

Beklenen: `201`

### C) Register + Login + Refresh

13. `POST {{base_url}}/auth/register/`
```json
{
  "username": "postmanuser",
  "email": "postmanuser@example.com",
  "password": "StrongPass123!",
  "first_name": "Postman",
  "last_name": "User"
}
```
Beklenen: `201`

14. `POST {{base_url}}/auth/token/`
```json
{
  "username": "demo",
  "password": "Demo12345!"
}
```
Beklenen: `200` + `access`, `refresh`

Bu request'in Tests kismina sunu ekle:
```javascript
pm.test("Login 200", function () {
  pm.response.to.have.status(200);
});

const data = pm.response.json();
pm.environment.set("access_token", data.access);
pm.environment.set("refresh_token", data.refresh);
```

15. `POST {{base_url}}/auth/token/refresh/`
```json
{
  "refresh": "{{refresh_token}}"
}
```
Beklenen: `200` + yeni `access`

Tests:
```javascript
pm.test("Refresh 200", function () {
  pm.response.to.have.status(200);
});
pm.environment.set("access_token", pm.response.json().access);
```

### D) Private endpointler

16. `GET {{base_url}}/me/policies/` -> `200`
17. `GET {{base_url}}/me/quotes/` -> `200`
18. `GET {{base_url}}/me/claims/` -> `200`
19. `GET {{base_url}}/me/payments/` -> `200`
20. `GET {{base_url}}/me/alerts/` -> `200`

## Güvenlik ve Hata yakalama
21. `POST {{base_url}}/auth/register/` (Geçersiz E-posta: "bozuk-format") -> `400`

22. `POST {{base_url}}/auth/register/` (Zayıf Şifre: "123") -> `400`

23. `POST {{base_url}}/auth/register/` (Çakışan Kullanıcı Adı: "demo") -> `400`

## 5) Hata Tespiti (En Yaygin)

- `401 Unauthorized`
  - `access_token` bos olabilir
  - Bearer token yanlis olabilir
  - token suresi dolmus olabilir -> refresh yap

- `404 Not Found`
  - URL sonunda slash (`/`) eksik olabilir
  - slug environment degiskeni yanlis olabilir

- `400 Bad Request`
  - JSON body alan adlari hatali olabilir
  - email formati gecersiz olabilir

## 6) Tek Tikta Toplu Test (Collection Runner)

1. Collection Runner ac
2. `Insucom Backend Tests` sec
3. Environment sec
4. Tum requestleri sirayla calistir
5. Tum statusler `Expected` ise backend entegrasyonu dogru

## 7) Test Tamamlandi Checklist

- [ ] Tum public endpointler 200 dondu
- [ ] Contact form 201 dondu
- [ ] Login + Refresh calisti
- [ ] 5 private endpoint 200 dondu
- [ ] 401/404/400 durumlarini bilincli test ettim
