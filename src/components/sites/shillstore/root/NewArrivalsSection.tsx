'use client';

import React from 'react';
import Link from 'next/link';
import { productsData } from '@/data/shill-data';
import { EditorialProductCard } from '@/components/sites/shillstore/root/EditorialProductCard';

export function NewArrivalsSection() {
  const selectedIds = [
    'shill-shirt-oxford-long-blue',
    'shill-pants-chino-black',
    'shill-tshirt-washed-black',
    'shill-jacket-parka-army-green',
    'shill-perfume-noir',
    'shill-pants-cargo-olive',
    'shill-tshirt-oversized-essential-black',
    'shill-relax-chino-errol-black',
  ];

  // Pick exactly 8 curated products, falling back to top 8 if needed
  const curatedProducts = selectedIds
    .map((id) => productsData.find((p) => p.id === id))
    .filter(Boolean) as typeof productsData;

  const displayProducts = curatedProducts.length === 8 ? curatedProducts : productsData.slice(0, 8);

  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 border-t border-neutral-100">
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 block mb-2">
            NEW IN
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            New Arrivals
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 font-normal max-w-xs">
          Refined everyday garments tailored for versatility and movement.
        </p>
      </div>

      {/* 4-Column Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14">
        {displayProducts.map((product, idx) => (
          <EditorialProductCard
            key={product.id}
            product={product}
            priority={idx < 4}
          />
        ))}
      </div>

      {/* View All Products CTA */}
      <div className="mt-14 sm:mt-18 text-center">
        <Link
          href="/collections"
          className="inline-block px-10 py-4 border border-neutral-900 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300"
        >
          VIEW ALL PRODUCTS
        </Link>
      </div>
    </section>
  );
}
