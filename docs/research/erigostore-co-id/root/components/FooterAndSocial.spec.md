# SocialMediaBanner & NewsletterSection & Footer Specifications

## 1. SocialMediaBanner (`SocialMediaBanner.tsx`)
- **Container:** `page-width my-8`
- **Inner:** `bg-black text-white p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4`
- **Heading:** "Visit Our Social" (text-2xl font-bold)
- **Icons:** Facebook, Instagram, TikTok, YouTube with hover scale & red accent

## 2. NewsletterSection (`NewsletterSection.tsx`)
- **Container:** `bg-cover bg-center min-h-[450px] flex items-center`
- **Background:** `/sites/erigostore-co-id/root/images/newsletter-bg.png`
- **Left Content:** "Tren Casual Fashion Terus Berkembang. Jangan mau ketinggalan!" (text-3xl md:text-5xl font-bold text-white max-w-xl)
- **Right Form:**
  - Subheading: "Jadi yang pertama tahu produk terbaru Erigo dan promo seru lainnya! Daftarkan emailmu di sini"
  - Email input with white background
  - Checkbox: "Saya bersedia menerima email newsletter Erigo dan telah membaca Kebijakan Privasi"
  - Button: "Kirim" (bg-red-600, disabled opacity-50 unless checkbox is checked)
  - Success feedback toast / alert on submission

## 3. Footer (`Footer.tsx`)
- **Container:** `bg-black text-gray-300 pt-16 pb-8 border-t border-gray-800`
- **Columns (5 columns on desktop):**
  - **ERIGO:** Lokasi Toko, Tentang Kami, Hubungi Kami, Corporate Order
  - **BANTUAN:** FAQ, Pembayaran, Penukaran & Pengembalian, Kebijakan Privasi
  - **CUSTOMER:** Voucher, Lacak Pesanan
  - **PRODUK:** Sale, Koleksi Baru, Kaos, Kemeja, Celana, Aksesoris
  - **BRAND INFO & CONTACT:**
    - Erigo white logo
    - Social links
    - Phone: `0811-9757-222`
    - Email: `partnership@erigostore.co.id`
    - Offline Store Addresses (Bekasi, Pamulang, Banjarbaru)
- **Bottom Bar:**
  - Copyright: "Hak Cipta © ERIGO Semua hak dilindungi undang-undang. ERIGO © 2026"
