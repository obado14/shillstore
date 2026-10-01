# BlogStories Specification

## Overview
- **Target file:** `src/components/sites/erigostore-co-id/root/BlogStories.tsx`
- **Interaction model:** Side-by-side or carousel story cards with tag badges and Instagram links

## DOM Structure
- `section.blog-stories` (bg-black text-white py-12)
  - `div.page-width`
    - `div.grid` (grid grid-cols-1 md:grid-cols-2 gap-8)
      - Card 1: Erigo x MPL Indonesia
        - Image: `/sites/erigostore-co-id/root/images/blog-mpl.png`
        - Tag: "Blogs"
        - Title: "Kolaborasi Erigo x MPL Indonesia"
        - Instagram link: `@erigostore`
        - Excerpt text
      - Card 2: Erigo x EVOS esports
        - Image: `/sites/erigostore-co-id/root/images/blog-evos.jpg`
        - Tag: "Blogs"
        - Title: "Kolaborasi Erigo x EVOS esports"
        - Instagram link: `@erigostore`
        - Excerpt text
