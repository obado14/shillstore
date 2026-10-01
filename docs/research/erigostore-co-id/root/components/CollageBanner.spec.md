# CollageBanner Specification

## Overview
- **Target file:** `src/components/sites/erigostore-co-id/root/CollageBanner.tsx`
- **Interaction model:** 3-card responsive grid with hover scale on images

## DOM Structure
- `div.collage-banner-wrapper` (page-width py-4 flex flex-col md:flex-row gap-4)
  - `div.card-1` (flex-1 rounded-[12px] overflow-hidden relative group)
    - `img` (`collage-why-buy.jpg`, object-cover w-full h-full group-hover:scale-105 transition-transform)
    - `div.card-content` (absolute inset-0 p-6 flex flex-col justify-between text-black)
      - `h3` ("Kenapa harus beli di Website Erigo")
      - `div.features` ("• Gratis Ongkir", "• Jaminan Return/Refund")
      - `a.btn` (bg-black text-white px-6 py-2 rounded-lg text-sm "Selengkapnya")
  - `div.card-2` (flex-1 rounded-[12px] overflow-hidden relative group)
    - `img` (`collage-oxford.jpg`, object-cover w-full h-full group-hover:scale-105 transition-transform)
    - `div.card-content` (absolute inset-0 p-6 flex flex-col justify-center items-center text-center text-white)
      - `span` ("New Arrival")
      - `h3` ("Oxford Shirt", font-size: 36px font-extrabold)
  - `div.card-3` (flex-1 rounded-[12px] overflow-hidden relative group)
    - `img` (`collage-pickup.jpg`, object-cover w-full h-full group-hover:scale-105 transition-transform)
    - `div.card-content` (absolute inset-0 p-6 flex flex-col justify-end items-center text-center)
      - `a.btn` (bg-[#ffbb00] text-[#0b1a32] font-bold px-6 py-2.5 rounded-lg text-sm "PICKUP IN STORE")
