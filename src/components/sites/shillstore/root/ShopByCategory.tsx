'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function ShopByCategory() {
  const categories = [
    {
      title: 'CLOTHING',
      subtitle: 'Outerwear, relaxed shirting & everyday denim',
      image: '/sites/shillstore/root/images/hero-parka-desktop.jpg',
      link: '/collections/all-t-shirt',
    },
    {
      title: 'ACCESSORIES',
      subtitle: 'Tactical bags, headwear & utilitarian pieces',
      image: '/sites/shillstore/root/images/multi-accessories.png',
      link: '/collections/accessories',
    },
    {
      title: 'FRAGRANCE',
      subtitle: 'Extrait & Eau de Parfum crafted for presence',
      image: '/sites/shillstore/root/images/multi-perfume.png',
      link: '/collections/perfume',
    },
  ];

  return (
    <section className="py-10 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
      {/* Section Header */}
      <div className="mb-6 sm:mb-10">
        <h2 className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
          SHOP BY CATEGORY
        </h2>
      </div>

      {/* 3 Visual Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.link}
            className="group block relative"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-[1px]">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </div>

            {/* Typography Caption */}
            <div className="mt-2.5 sm:mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-neutral-900 group-hover:text-neutral-500 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 font-normal">
                  {cat.subtitle}
                </p>
              </div>
              <span className="text-xs sm:text-sm text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-200">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
