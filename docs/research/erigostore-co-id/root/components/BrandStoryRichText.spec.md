# BrandStoryRichText Specification

## Overview
- **Target file:** `src/components/sites/erigostore-co-id/root/BrandStoryRichText.tsx`
- **Interaction model:** Static text banner with patterned repeating background

## DOM Structure
- `section.brand-story`
  - `div.pattern-container` (bg-[url(/sites/erigostore-co-id/root/images/brand-pattern.png)] repeat-x bg-center py-10 md:py-14)
    - `div.page-width text-center max-w-4xl mx-auto`
      - `h2.title` ("Hai, kami ERIGO", font-bold text-3xl md:text-5xl mb-4 text-[#121212])
      - `p.description` ("ERIGO adalah brand fashion Indonesia yang menyediakan pakaian kasual berkualitas tinggi dan trendy dengan style fashion yang modern. Fokus pada anak muda dengan gaya hidup urban, ERIGO selalu mengikuti tren terkini dan berkomitmen memberdayakan industri fashion lokal serta menciptakan produk yang mendunia.")
