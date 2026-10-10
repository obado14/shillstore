'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import { EditorialProductCard } from '@/components/sites/shillstore/root/EditorialProductCard';
import { productsData } from '@/data/shill-data';

export default function CollectionsIndexPage() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'CLOTHING' | 'PANTS' | 'OUTERWEAR' | 'FRAGRANCE'>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  // Curated 12 newest standout items across the brand
  const newestProductIds = [
    'shill-shirt-oxford-long-blue',
    'shill-pants-chino-black',
    'shill-tshirt-washed-black',
    'shill-jacket-parka-army-green',
    'shill-perfume-noir',
    'shill-pants-cargo-olive',
    'shill-tshirt-oversized-essential-black',
    'shill-relax-chino-errol-black',
    'shill-shirt-rayon-sage',
    'shill-jacket-coach-black',
    'shill-pants-chino-beige',
    'shill-perfume-elysium',
  ];

  const curatedNewest = useMemo(() => {
    const matched = newestProductIds
      .map((id) => productsData.find((p) => p.id === id))
      .filter(Boolean) as typeof productsData;
    return matched.length === 12 ? matched : productsData.slice(0, 12);
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...curatedNewest];

    if (activeFilter === 'CLOTHING') {
      list = productsData.filter((p) => p.category === 'Kaos' || p.category === 'Kemeja').slice(0, 12);
    } else if (activeFilter === 'PANTS') {
      list = productsData.filter((p) => p.category === 'Celana').slice(0, 12);
    } else if (activeFilter === 'OUTERWEAR') {
      list = productsData.filter((p) => p.category === 'Jaket').slice(0, 12);
    } else if (activeFilter === 'FRAGRANCE') {
      list = productsData.filter((p) => p.category === 'Parfum').slice(0, 12);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [curatedNewest, activeFilter, sortBy]);

  const filterOptions = [
    { id: 'ALL', label: 'All Items' },
    { id: 'CLOTHING', label: 'Tops & Shirts' },
    { id: 'PANTS', label: 'Pants & Chinos' },
    { id: 'OUTERWEAR', label: 'Outerwear' },
    { id: 'FRAGRANCE', label: 'Fragrance' },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* Header */}
      <Header />

      {/* Main Editorial Flow */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">
        {/* Page Intro (Pure Typography & Whitespace) */}
        <div className="pt-8 pb-5 sm:pt-20 sm:pb-12 max-w-3xl">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-neutral-400 block mb-2 sm:mb-3">
            NEW IN
          </span>
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-light text-neutral-900 tracking-tight leading-[1.08] mb-3 sm:mb-4">
            Latest arrivals from SHILL.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed max-w-lg">
            Discover the latest pieces added to our collection.
          </p>
        </div>

        {/* Filter & Sort Bar (Clean Minimal Border Bar) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 mb-6 sm:mb-14 border-y border-neutral-150 text-[10px] sm:text-[11px] uppercase tracking-[0.18em]">
          {/* Left: Filter Categories */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-1">
            <span className="font-semibold text-neutral-900 shrink-0">FILTER:</span>
            {filterOptions.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`shrink-0 transition-colors cursor-pointer ${
                  activeFilter === f.id
                    ? 'font-bold text-black border-b border-black pb-0.5'
                    : 'text-neutral-400 hover:text-black'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Right: Sort By Dropdown */}
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
            <span className="text-neutral-400">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-transparent text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-neutral-900 focus:outline-none cursor-pointer pr-1"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Catalog Grid (Desktop 4 col, Tablet 3 col, Mobile 2 col) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-14 mb-16 sm:mb-28">
          {filteredProducts.map((product, idx) => (
            <EditorialProductCard
              key={product.id}
              product={product}
              priority={idx < 4}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Drawers */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
