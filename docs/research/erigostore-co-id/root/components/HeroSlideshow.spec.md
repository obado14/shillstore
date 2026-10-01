# HeroSlideshow Specification

## Overview
- **Target file:** `src/components/sites/erigostore-co-id/root/HeroSlideshow.tsx`
- **Interaction model:** Auto-cycling swipeable carousel (5s interval), prev/next controls, dot pagination

## DOM Structure
- `section.hero-slideshow` (w-full relative overflow-hidden)
  - `div.slides-container` (flex transition-transform duration-700 ease-out)
    - `div.slide` (w-full shrink-0 relative aspect-[16/7] md:aspect-[21/9])
      - `picture`
        - `source` (media: max-width 768px -> mobile image)
        - `img` (desktop image, object-cover w-full h-full)
      - `div.slide-overlay` (optional gradient or text CTA)
  - `button.prev-btn` (absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center)
  - `button.next-btn` (absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center)
  - `div.pagination-dots` (absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2)

## Assets
- Slide images:
  - `hero-cargo-desktop.jpg` / `hero-cargo-mobile.jpg`
  - `hero-parka-desktop.jpg` / `hero-parka-mobile.jpg`
  - `hero-chino-desktop.jpg` / `hero-chino-short-desktop.jpg` / `hero-jogger-desktop.jpg`
  - `hero-oxford-desktop.jpg` / `hero-tshirt-contrast.jpg` / `hero-relax-chino.jpg` / `hero-movease.jpg`
