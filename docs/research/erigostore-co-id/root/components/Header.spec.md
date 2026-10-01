# Header Specification

## Overview
- **Target file:** `src/components/sites/erigostore-co-id/root/Header.tsx`
- **Interaction model:** Sticky on scroll with dynamic transparency, slide-down search dialog, mobile navigation drawer, and mini-cart drawer

## DOM Structure
- `div.announcement-bar` (40px height, background: #000000, color: #ffffff, text auto-cycles)
- `header.sticky-header` (height: 72px desktop / 60px mobile, sticky top-0, z-index: 40)
  - `div.header-container` (max-width: 1300px, flex items-center justify-between)
    - `div.mobile-menu-trigger` (hamburger button, visible < 1024px)
    - `div.logo-container` (Erigo Black logo `w-[110px] md:w-[130px]`)
    - `nav.desktop-nav` (hidden < 1024px, flex items-center gap-6)
      - Category links with hover underline and active indicator
      - Mega menu for 'Kolaborasi' and dropdown menus for categories
    - `div.header-actions` (flex items-center gap-4)
      - Country selector (Indonesia flag + 'IDR')
      - Search trigger icon
      - User / Login link
      - Wishlist link
      - Cart icon with badge counter (opens cart drawer)

## Computed Styles
- Announcement font-size: 12px, font-weight: 500, letter-spacing: 0.5px
- Header background: rgba(255, 255, 255, 0.95), backdrop-filter: blur(8px)
- Nav link font-size: 14px, font-weight: 600, text-transform: uppercase, letter-spacing: 0.5px
- Cart badge: background: #ff1b2d, color: #ffffff, font-size: 10px, border-radius: 9999px

## States & Behaviors
- **Scroll State:** At scroll position > 20px, add subtle border-b and shadow `0 2px 10px rgba(0,0,0,0.06)`
- **Search Modal:** Click search icon opens full-screen overlay with search input and trending searches ("T-Shirt", "Chino", "Kemeja", "MOVEASE")
- **Cart Drawer:** Click cart icon opens slide-over drawer from right showing added items, subtotal calculation, and checkout button
- **Mobile Drawer:** Hamburger opens left slide-over drawer with collapsible category accordions
