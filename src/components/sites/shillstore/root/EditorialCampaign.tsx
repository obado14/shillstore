'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function EditorialCampaign() {
  return (
    <section className="relative w-full h-[300px] sm:h-[460px] md:h-[580px] lg:h-[640px] bg-neutral-950 overflow-hidden flex items-center justify-center my-4 sm:my-10">
      {/* Editorial Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/sites/shillstore/root/images/hero-relax-chino.jpg"
          alt="The Shill Edit Campaign"
          fill
          sizes="100vw"
          className="object-cover object-center scale-100"
        />
        {/* Soft Magazine Filter & Vignette */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Editorial Centerstage Copy */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-neutral-300 block mb-1.5 sm:mb-3">
          SEASONAL CAMPAIGN
        </span>

        <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight uppercase mb-2 sm:mb-3">
          THE SHILL EDIT
        </h2>

        <p className="text-xs sm:text-base text-neutral-200 font-light tracking-wide max-w-md mx-auto mb-4 sm:mb-7">
          Built for everyday movement.
        </p>

        <Link
          href="/collections"
          className="inline-block px-6 sm:px-9 py-3 sm:py-3.5 bg-white text-black hover:bg-neutral-200 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300"
        >
          EXPLORE THE EDIT
        </Link>
      </div>
    </section>
  );
}
