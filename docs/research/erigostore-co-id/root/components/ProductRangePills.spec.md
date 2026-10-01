# ProductRangePills Specification

## Overview
- **Target file:** `src/components/sites/erigostore-co-id/root/ProductRangePills.tsx`
- **Interaction model:** Interactive category filter buttons

## DOM Structure
- `section.product-range` (py-4 w-full)
  - `div.page-width`
    - `div.pills-container` (flex items-center justify-center gap-4 flex-wrap)
      - Category pill items:
        - `Atasan` (icon: `cat-atasan.png`, label: "Atasan")
        - `Bawahan` (icon: `cat-bawahan.png`, label: "Bawahan")
        - `Aksesoris` (icon: `cat-aksesoris.png`, label: "Aksesoris")
      - Styles: border border-slate-200 rounded-lg px-6 h-14 flex items-center gap-3 hover:border-red-600 transition-colors
