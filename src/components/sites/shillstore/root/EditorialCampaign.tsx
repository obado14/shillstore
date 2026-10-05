'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function EditorialCampaign() {
  return (
    <section className="relative w-full h-[600px] sm:h-[700px] md:h-[780px] bg-neutral-950 overflow-hidden flex items-center justify-center my-8 sm:my-16">
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
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[0.5px]" />
      </div>

      {/* Editorial Centerstage Copy */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium text-neutral-300 block mb-3 sm:mb-4">
          SEASONAL CAMPAIGN
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight uppercase mb-3">
          THE SHILL EDIT
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-light tracking-wide max-w-md mx-auto mb-8 sm:mb-10">
          Built for everyday movement.
        </p>

        <Link
          href="/collections"
          className="inline-block px-9 py-4 bg-white text-black hover:bg-neutral-200 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300"
        >
          EXPLORE THE EDIT
        </Link>
      </div>
    </section>
  );
}
