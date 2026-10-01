# Behaviors & Interactive Model: erigostore.co.id

## 1. Announcement Bar
- **Interaction Model:** Auto-cycling text slider or marquee
- **Interval:** 4000ms
- **Items:**
  - "Pasti Gratis Ongkir"
  - "First Checkout, get 30k"
  - "Always Purchase 250k, get Disc20k"
  - "Always Purchase 150k, get Disc10k"

## 2. Header & Sticky Navigation
- **Interaction Model:** Sticky on scroll (`sticky top-0`)
- **Scroll behavior:** Transparent on top hero, solid white with shadow on scroll (`box-shadow: 0 2px 10px rgba(0,0,0,0.08)`)
- **Dropdown menus:** Mega-menu on hover with category links & featured collection banners (JKT48, MS Glow, MPL)
- **Search:** Click expands search dialog / modal with popular keywords ("Kata kunci populer": T-Shirt, Chino, Hoodie, Kemeja)
- **Cart:** Drawer slide-in from right with cart item list, subtotal, and checkout button
- **Mobile Menu:** Hamburger toggle opens full-screen / slide-over mobile drawer with accordion menus

## 3. Hero Slideshow
- **Interaction Model:** Swiper / Carousel with autoplay (5000ms), previous/next arrows, and pagination indicators
- **Responsive:** Distinct desktop and mobile images for high aspect ratio fidelity

## 4. Collage Banners
- **Interaction Model:** Hover zoom on image (`transform: scale(1.05)`, transition 0.3s ease)
- **Click CTA:** Links to specific campaign and blog pages

## 5. Product Range Pills
- **Interaction Model:** Category chips with subtle hover border color change (`border-color: #ff1b2d` or black)

## 6. Featured Products Grid
- **Interaction Model:** Category tabs filter active products
- **Card Hover:** Subtle zoom and quick action bar ("Tambah ke Keranjang" / "Beli Sekarang")
- **Badges:** "Sale" red pill badge on discounted products
- **Price formatting:** Indonesian Rupiah formatting `Rp 183.000`

## 7. Multi-Banner (Perfume & Accessories)
- **Interaction Model:** Diagonal polygon clip path on desktop (`clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%)`)
- **Hover:** Darkening overlay and scale effect

## 8. Newsletter Signup
- **Interaction Model:** Checkbox agreement enables submit button. If unchecked, button is disabled with `opacity-50`.
- **Submit Feedback:** Toast / modal notification on submission: "Thank You for Successfully Submitting Your Newsletter"

## 9. Mobile Responsiveness
- Desktop breakpoint: 1024px+
- Tablet breakpoint: 768px - 1023px
- Mobile breakpoint: <768px (single column stack, horizontal swipe for cards)
