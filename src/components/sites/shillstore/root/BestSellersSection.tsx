'use client';

import React from 'react';
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

  const displayProducts = bestSellerProducts.length === 4 ? bestSellerProducts : productsData.slice(8, 12);

  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 block mb-2">
            SIGNATURE PIECES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Best Sellers
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 font-normal max-w-xs">
          Enduring staples defined by craft, comfort, and proven longevity.
        </p>
      </div>

      {/* Spacious 4-Column Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-7 sm:gap-y-12 lg:gap-x-8">
        {displayProducts.map((product) => (
          <EditorialProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
