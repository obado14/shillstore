# Output Plan: erigostore.co.id

- **Source URL:** `https://erigostore.co.id/`
- **Application Root (`<app-root>`):** `.`
- **Site Key (`<site-key>`):** `erigostore-co-id`
- **Page Key (`<page-key>`):** `root`
- **Destination Route:** `src/app/page.tsx`
- **Artifact Root:** `docs/research/erigostore-co-id/root/`
- **Component Specs:** `docs/research/erigostore-co-id/root/components/`
- **Screenshot Root:** `docs/design-references/erigostore-co-id/root/`
- **Component Root:** `src/components/sites/erigostore-co-id/root/`
- **Asset Root:** `public/sites/erigostore-co-id/root/images/`
- **Shared Assets:** `public/sites/erigostore-co-id/shared/`

## Planned Sections
1. **TopAnnouncementBar & Header** (`Header.tsx`):
   - Announcement ticker: "Pasti Gratis Ongkir", "First Checkout, get 30k", "Always Purchase 250k, get Disc20k", "Always Purchase 150k, get Disc10k"
   - Country & Currency selector: Indonesia / IDR (Rp)
   - Reward & Login links
   - Erigo main logo (white/black depending on scroll state or transparent header)
   - Search bar with predictive search popup / dialog
   - Wishlist / Account / Cart drawer trigger
   - Main navigation: Kaos, Kemeja, Jaket, Celana, Aksesoris, Parfum, Lokasi Toko, Promo, etc. with mega-menu dropdowns
2. **HeroSlideshow** (`HeroSlideshow.tsx`):
   - Auto-cycling & swipeable hero banners (Desktop & Mobile pairs)
   - Slide 1: Cargo Pants (`Desktop_Cargo.jpg`)
   - Slide 2: Parka Jacket (`Desktop_Parka.jpg`)
   - Slide 3: Chino Pants Flexi Fit (`Desktop_Chino_Pants_Flexi_Fit.jpg`)
   - Slide 4: Chino Short Flexi Fit (`Desktop_Chino_Short_Flexi_Fit.jpg`)
   - Slide 5: Jogger Pants (`Desktop_Jogger_Pants_Flexi_Fit.jpg`)
   - Slide 6: Oxford Shirt (`Desktop_-_Oxford.jpg`)
   - Slide 7: T-Shirt Contrast (`Desktop_-_Tshirt_Contrast.jpg`)
   - Slide 8: Relax Chino Pants (`Desktop_Relax_Chino_Pants_rev.jpg`)
   - Slide 9: Short Shirt Pocket (`Desktop_Short_Shirt_Pocket_1.jpg`)
   - Slide 10: Movease (`Desktop_Movease.jpg`)
3. **CollageBanner** (`CollageBanner.tsx`):
   - 3-column promo grid:
     1. "Kenapa harus beli di Website Erigo" (Gratis Ongkir, Jaminan Return/Refund)
     2. "New Arrival - Oxford Shirt"
     3. "PICKUP IN STORE" (yellow button CTA)
4. **ProductRangePills** (`ProductRangePills.tsx`):
   - Category shortcuts: Atasan, Bawahan, Aksesoris with icons
5. **BrandStoryRichText** (`BrandStoryRichText.tsx`):
   - "Hai, kami ERIGO" with textured background banner and brand narrative
6. **FeaturedProducts** (`FeaturedProducts.tsx`):
   - Section heading: "New Arrival - CARGO PANTS" / "New Arrival - Chino Pants" / "Best Sellers"
   - Filter tabs: All, Cargo Pants, Parka Jacket, Chino Pants, Short Shirt
   - Product cards with badges (Sale), hover image transitions, title, price (Rp), discount, and quick view / buy
7. **MultiBannerPromo** (`MultiBannerPromo.tsx`):
   - Diagonal split banner:
     - Left: "perfume series" - Menemani setiap kegiatanmu - "Rasakan perbedaannya!" (with polygon clip-path)
     - Right: "Explore more and more" - Aksesoris fungsional - "Lengkapi Koleksimu!"
8. **BlogStories** (`BlogStories.tsx`):
   - Collaboration showcase: "Kolaborasi Erigo x MPL Indonesia", "Kolaborasi Erigo x EVOS esports"
   - Featured article cards with images, tags, description, Instagram links
9. **SocialMediaBanner** (`SocialMediaBanner.tsx`):
   - "Visit Our Social": Facebook, Instagram, TikTok, YouTube channels with dark background and rounded container
10. **NewsletterSection** (`NewsletterSection.tsx`):
    - "Tren Casual Fashion Terus Berkembang. Jangan mau ketinggalan!"
    - Email signup form with checkbox privacy agreement and dynamic submit button state
11. **Footer** (`Footer.tsx`):
    - ERIGO links (Lokasi Toko, Tentang Kami, Hubungi Kami, Corporate Order)
    - Bantuan (FAQ, Pembayaran, Penukaran & Pengembalian, Kebijakan Privasi)
    - Customer (Voucher, Lacak Pesanan)
    - Produk categories
    - Erigo offline store addresses (Bekasi, Pamulang, Banjarbaru)
    - Consumer protection complaint service notice
    - Copyright & payment methods
