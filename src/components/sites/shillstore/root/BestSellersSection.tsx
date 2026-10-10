'use client';

import React from 'react';
import Link from 'next/link';
import { productsData } from '@/data/shill-data';
import { EditorialProductCard } from '@/components/sites/shillstore/root/EditorialProductCard';

export function BestSellersSection() {
  const bestSellerIds = [
    'shill-pants-chino-beige',
    'shill-shirt-oxford-short-blue',
    'shill-jacket-coach-black',
    'shill-perfume-elysium',
  ];

  const bestSellerProducts = bestSellerIds
    .map((id) => productsData.find((p) => p.id === id))
    .filter(Boolean) as typeof productsData;

  const displayProducts =
    bestSellerProducts.length === 4 ? bestSellerProducts : productsData.slice(8, 12);

  return (
    <section className="py-10 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 border-t border-neutral-100">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-6 sm:mb-12">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 block mb-1 sm:mb-2">
            SIGNATURE PIECES
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Best Sellers
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 font-normal max-w-xs">
          Enduring staples defined by craft, comfort, and proven longevity.
        </p>
      </div>

      {/* 2-Column Mobile Grid, 4-Column Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
        {displayProducts.slice(0, 4).map((product) => (
          <EditorialProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-8 sm:mt-14 text-center">
        <Link
          href="/collections"
          className="inline-block px-7 sm:px-10 py-3 sm:py-3.5 border border-neutral-900 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300"
        >
          VIEW ALL BEST SELLERS
        </Link>
      </div>
    </section>
  );
}
