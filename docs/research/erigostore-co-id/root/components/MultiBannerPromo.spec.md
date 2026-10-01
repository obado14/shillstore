# MultiBannerPromo Specification

## Overview
- **Target file:** `src/components/sites/erigostore-co-id/root/MultiBannerPromo.tsx`
- **Interaction model:** Desktop polygon clip-path diagonal split banner with background images and hover zoom

## DOM Structure
- `section.multi-banner` (my-8 w-full relative overflow-hidden)
  - `div.split-container` (relative h-[550px] flex flex-col md:flex-row)
    - `div.item-left` (relative md:w-[55%] h-full p-8 md:p-16 flex flex-col justify-start md:[clip-path:polygon(0_0,100%_0,75%_100%,0_100%)] z-10 bg-cover bg-center)
      - Background: `/sites/erigostore-co-id/root/images/multi-perfume.png`
      - `h2` ("perfume series", text-4xl md:text-5xl font-koulen tracking-wider text-white uppercase)
      - `p` ("Menemani setiap kegiatanmu", text-lg text-white/90 mb-6)
      - `a.btn` (bg-white text-black font-semibold px-8 py-3 rounded-lg w-fit "Rasakan perbedaannya!")
    - `div.item-right` (relative md:w-full h-full p-8 md:p-16 flex flex-col justify-center items-end text-right bg-cover bg-right)
      - Background: `/sites/erigostore-co-id/root/images/multi-accessories.png`
      - `div.content-wrapper` (max-w-md flex flex-col items-end gap-4 text-white)
        - `h2` ("Explore more and more", text-4xl font-koulen text-white)
        - `p` ("Rasakan perjalanan yang nyaman saat bepergian dengan aksesories fungsional", text-sm text-white/80)
        - `a.btn` (bg-white text-black font-semibold px-8 py-3 rounded-lg w-fit "Lengkapi Koleksimu!")
