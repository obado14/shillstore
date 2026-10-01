# FeaturedProducts Specification

## Overview
- **Target file:** `src/components/sites/erigostore-co-id/root/FeaturedProducts.tsx`
- **Interaction model:** Category tabs switcher, card hover animations, Quick Add to Cart with live state update

## DOM Structure
- `section.featured-products` (py-12 page-width)
  - `div.header` (flex justify-between items-end mb-8)
    - `div.titles`
      - `span.subtitle` ("Koleksi Pilihan")
      - `h2.heading` ("Featured Collection", font-koulen text-4xl)
    - `div.category-tabs` (flex gap-2 overflow-x-auto)
      - Tab buttons: "Semua", "Chino Pants", "Short Shirt", "Relax Chino"
  - `div.products-grid` (grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6)
    - `article.product-card` (group relative flex flex-col)
      - `div.image-wrapper` (aspect-[3/4] relative overflow-hidden bg-gray-50 rounded-lg)
        - `span.badge` (Sale pill badge in top-left, red background)
        - `img` (object-cover w-full h-full group-hover:scale-105 transition-transform duration-300)
        - `button.quick-add-btn` (absolute bottom-2 inset-x-2 bg-black/90 text-white text-xs font-semibold py-2.5 rounded opacity-0 group-hover:opacity-100 transition-opacity)
      - `div.product-info` (mt-3 flex flex-col gap-1)
        - `h3.title` (text-sm font-medium line-clamp-2 hover:text-red-600 transition-colors)
        - `div.price-row` (flex items-center gap-2)
          - `span.sale-price` (text-sm md:text-base font-bold text-red-600)
          - `span.compare-price` (text-xs text-gray-400 line-through)
