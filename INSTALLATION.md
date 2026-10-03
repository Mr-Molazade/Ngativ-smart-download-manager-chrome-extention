# Smart Downloads Manager by ngativ — Installation Guide

این راهنما برای نصب نسخه توسعه‌ای (Unpacked) افزونه در Google Chrome نوشته شده است.

> این روش برای تست و استفاده داخلی مناسب است. برای اینکه کاربران معمولی افزونه را مثل افزونه‌های دیگر از Chrome Web Store نصب کنند، پروژه باید در Chrome Web Store منتشر و تأیید شود.

---

## 1. فایل پروژه را دریافت کنید

فایل پروژه را دانلود و از حالت ZIP خارج کنید.

مثلاً بعد از Extract باید یک پوشه شبیه این داشته باشید:

```text
Smart-Downloads-Manager-ngativ/
├── manifest.json
├── popup/
├── options/
├── src/
├── assets/
├── README.md
└── ARCHITECTURE.md
```

### نکته مهم

فایلی که در مرحله Load unpacked انتخاب می‌کنید باید **همان پوشه‌ای باشد که فایل `manifest.json` مستقیماً داخل آن قرار دارد**.

اشتباه:

```text
Smart-Downloads-Manager-ngativ/
└── Smart-Downloads-Manager-ngativ/
    ├── manifest.json
    └── ...
```

در این حالت باید پوشه داخلی را انتخاب کنید.

---

## 2. باز کردن صفحه Extensions در Chrome

در نوار آدرس Chrome عبارت زیر را وارد کنید:

```text
chrome://extensions
```

و Enter بزنید.

---

## 3. فعال کردن Developer Mode

در صفحه Extensions، در بالای صفحه گزینه:

**Developer mode**

را فعال کنید.

بعد از فعال شدن، چند گزینه جدید نمایش داده می‌شود.

---

## 4. انتخاب Load unpacked

روی:

**Load unpacked**

کلیک کنید.

پنجره انتخاب پوشه باز می‌شود.

حالا پوشه اصلی پروژه را انتخاب کنید؛ همان پوشه‌ای که فایل زیر داخل آن است:

```text
manifest.json
```

سپس روی **Select Folder** کلیک کنید.

---

## 5. بررسی نصب

اگر نصب موفق باشد، کارت افزونه **Smart Downloads Manager by ngativ** را در صفحه Extensions می‌بینید.

اگر کنار افزونه خطایی نمایش داده شد:

1. روی **Errors** کلیک کنید.
2. متن خطا را بررسی کنید.
3. مطمئن شوید فایل `manifest.json` در ریشه پوشه انتخاب‌شده قرار دارد.

---

## 6. باز کردن Popup

برای دسترسی سریع به افزونه:

1. روی آیکون Puzzle در Chrome کلیک کنید.
2. Smart Downloads Manager را پیدا کنید.
3. روی Pin کلیک کنید تا آیکون افزونه کنار نوار آدرس قرار بگیرد.
4. روی آیکون افزونه کلیک کنید.

Popup افزونه باید باز شود و وضعیت Routing و Rule مربوط به سایت فعلی را نمایش دهد.

---

## 7. ساخت اولین Rule

برای مدیریت کامل Ruleها، از Popup وارد Dashboard شوید یا روی افزونه در صفحه Extensions گزینه‌های مربوط به Extension details را بررسی کنید.

در Dashboard می‌توانید:

- Rule جدید ایجاد کنید.
- Domain اضافه کنید.
- Folder مقصد تعیین کنید.
- Rule را فعال یا غیرفعال کنید.
- Rule را ویرایش یا حذف کنید.
- Ruleها را جستجو کنید.
- Fallback Folder را تغییر دهید.

مثال:

```text
Service Name: Example
Domain: example.com
Destination Folder: Example
Enabled: On
```

در نتیجه Downloadهایی که Source آن‌ها با Rule مطابقت داشته باشد، به این مسیر هدایت می‌شوند:

```text
Downloads/Example/
```

---

## 8. تست Routing

بعد از ساخت Rule، یک فایل از سایت مربوطه دانلود کنید.

برای مثال:

```text
example.com
    ↓
Example Rule
    ↓
Downloads/Example/
```

بعد Downloads را بررسی کنید.

برای تست کامل، این سناریوها را نیز بررسی کنید:

```text
Known Website      → Rule Folder
Disabled Rule      → Fallback Folder
Unknown Website    → Fallback Folder
Multiple Domains   → Same Rule Folder
Same Filename      → Chrome uniquify behavior
```

---

## 9. به‌روزرسانی نسخه توسعه‌ای

وقتی کد پروژه را تغییر می‌دهید، معمولاً لازم است افزونه را دوباره بارگذاری کنید.

در صفحه:

```text
chrome://extensions
```

کارت افزونه را پیدا کنید و روی دکمه:

**Reload**

کلیک کنید.

اگر Service Worker یا فایل‌های اصلی تغییر کرده باشند، Reload کردن افزونه برای اعمال تغییرات لازم است.

---

## 10. اگر افزونه کار نکرد چه کنیم؟

ابتدا این موارد را بررسی کنید:

### A. Manifest خطا دارد

مطمئن شوید فایل زیر وجود دارد:

```text
manifest.json
```

و در ریشه پروژه قرار گرفته است.

### B. خطای JavaScript

در صفحه `chrome://extensions` روی **Errors** کلیک کنید.

### C. مشکل Service Worker

در کارت افزونه روی **service worker** کلیک کنید تا Console مربوط به Service Worker باز شود.

### D. Routing انجام نمی‌شود

ممکن است Chrome نتواند Source واقعی Download را به‌صورت قابل اعتماد تشخیص دهد.

در این حالت Download به Fallback Folder هدایت می‌شود.

---

## 11. حذف افزونه

برای حذف نسخه توسعه‌ای:

1. به `chrome://extensions` بروید.
2. Smart Downloads Manager by ngativ را پیدا کنید.
3. روی **Remove** کلیک کنید.

---

# نصب برای کاربران عادی

روش **Load unpacked** بیشتر برای توسعه و تست است و برای توزیع عمومی مناسب نیست.

برای انتشار عمومی، مسیر معمول این است:

```text
Development
    ↓
Build / QA
    ↓
Package Extension
    ↓
Chrome Web Store Developer Dashboard
    ↓
Upload
    ↓
Store Review
    ↓
Publish
    ↓
Users install from Chrome Web Store
```

در نسخه منتشرشده، کاربر نهایی معمولاً فقط صفحه افزونه را در Chrome Web Store باز می‌کند و روی **Add to Chrome** می‌زند.

> انتشار در Chrome Web Store نیازمند حساب توسعه‌دهنده، آماده‌سازی اطلاعات فروشگاه، بررسی Permissionها و عبور از فرآیند Review است.

---

# نکات مهم امنیتی

قبل از توزیع عمومی:

- فقط Permissionهای لازم را نگه دارید.
- منبع دانلود را همیشه قابل اعتماد فرض نکنید.
- مسیر Folder را محدود به Downloads نگه دارید.
- از وارد کردن مستقیم User Input به `innerHTML` خودداری کنید.
- خطاهای Routing نباید باعث خراب شدن خود Download شوند.

---

# Quick Start

برای کسی که فقط می‌خواهد سریع افزونه را اجرا کند:

```text
1. ZIP را Extract کن.
2. برو به chrome://extensions
3. Developer mode را روشن کن.
4. Load unpacked را بزن.
5. پوشه‌ای را انتخاب کن که manifest.json داخل آن است.
6. افزونه نصب می‌شود.
7. آیکون افزونه را Pin کن.
8. Popup را باز کن و Ruleها را تنظیم کن.
9. یک Download تستی انجام بده.
```
