'use client';

import React from 'react';
import Link from 'next/link';

export function MultiBannerPromo() {
  return (
    <section className="my-6 sm:my-10 w-full overflow-hidden">
      <div className="relative min-h-[440px] md:h-[550px] flex flex-col md:flex-row bg-[#121212]">
        {/* Left Item: Perfume Series with Diagonal Clip-Path on Desktop */}
        <div
          className="relative md:absolute md:inset-y-0 md:left-0 md:w-[55%] w-full min-h-[220px] sm:min-h-[280px] p-5 sm:p-8 md:p-16 flex flex-col justify-start z-10 bg-cover bg-center md:[clip-path:polygon(0_0,100%_0,75%_100%,0_100%)] shadow-2xl"
          style={{
            backgroundImage:
              'url(/sites/shillstore/root/images/multi-perfume.png)',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-sm flex flex-col gap-2 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-koulen text-white tracking-wider uppercase">
              perfume series
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-200">
              Menemani setiap kegiatanmu
            </p>
            <Link
              href="/collections/perfume"
              className="mt-1 sm:mt-2 px-5 sm:px-8 py-2.5 sm:py-3 bg-white text-black hover:bg-red-600 hover:text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors w-fit shadow-md"
            >
              Rasakan perbedaannya!
            </Link>
          </div>
        </div>

        {/* Right Item: Explore More Accessories */}
        <div
          className="relative flex-1 w-full min-h-[220px] sm:min-h-[280px] p-5 sm:p-8 md:p-16 flex flex-col justify-center items-end text-right bg-cover bg-right"
          style={{
            backgroundImage:
              'url(/sites/shillstore/root/images/multi-accessories.png)',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          <div className="relative z-10 max-w-md flex flex-col items-end gap-2 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-koulen text-white tracking-wider uppercase">
              Explore more and more
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-200">
              Rasakan kenyamanan saat bepergian dengan aksesori fungsional
            </p>
            <Link
              href="/collections/accessories"
              className="mt-1 sm:mt-2 px-5 sm:px-8 py-2.5 sm:py-3 bg-white text-black hover:bg-red-600 hover:text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors w-fit shadow-md"
            >
              Lengkapi Koleksimu!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
