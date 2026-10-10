'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function EditorialHero() {
  return (
    <section className="relative w-full h-[55vh] min-h-[360px] max-h-[460px] sm:h-[75vh] sm:min-h-[520px] lg:h-[85vh] lg:min-h-[580px] lg:max-h-[900px] bg-neutral-950 overflow-hidden flex items-end">
      {/* High-Resolution Fashion Campaign Image */}
      <div className="absolute inset-0">
        <Image
          src="/sites/shillstore/root/images/hero-cargo-desktop.jpg"
          alt="Shillstore Campaign - Everyday pieces, made different"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100"
        />
        {/* Subtle Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      </div>

      {/* Editorial Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 pb-7 sm:pb-16 lg:pb-24">
        <div className="max-w-2xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium text-neutral-300 mb-2 sm:mb-4">
            NEW SEASON
          </p>

          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.12] sm:leading-[1.06] mb-4 sm:mb-8">
            Everyday pieces, made different.
          </h1>

          <Link
            href="/collections"
            className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-white text-black hover:bg-neutral-100 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-all duration-300"
          >
            SHOP NEW ARRIVALS
          </Link>
        </div>
      </div>
    </section>
  );
}
