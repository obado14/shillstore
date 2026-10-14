'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import { productsData } from '@/data/shill-data';
import { EditorialProductCard } from '@/components/sites/shillstore/root/EditorialProductCard';

export default function ShoesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');

  const shoesSubcategories = [
    { id: 'ALL', label: 'ALL SHOES' },
    { id: 'CASUAL', label: 'MODEL 1 (CASUAL LOW)' },
    { id: 'RUNNER', label: 'MODEL 2 (RUNNER)' },
    { id: 'CANVAS', label: 'MODEL 3 (HIGH CANVAS)' },
  ];

  // Filter & sort shoe products
  const filteredProducts = useMemo(() => {
    let list = productsData.filter((p) => p.category === 'Sepatu');

    if (activeCategory === 'CASUAL') {
      list = list.filter((p) => p.subcategory === 'Casual Low');
    } else if (activeCategory === 'RUNNER') {
      list = list.filter((p) => p.subcategory === 'Runner');
    } else if (activeCategory === 'CANVAS') {
      list = list.filter((p) => p.subcategory === 'High Canvas');
    }

    // Sort products
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* Global Minimal Header */}
      <Header />

      {/* Main Editorial Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">
        {/* 1. Page Header (Editorial Typography & Whitespace) */}
        <div className="pt-10 sm:pt-16 pb-5 sm:pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-3 sm:mb-6">
            <Link href="/" className="hover:text-black transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">SHOES</span>
          </nav>

          {/* Heading & Subtitle */}
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-[1.08] mb-2 sm:mb-3">
              SHOES
            </h1>
            <p className="text-sm sm:text-base text-neutral-700 font-normal leading-relaxed">
              Everyday footwear, engineered for modern movement.
            </p>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed mt-1">
              Explore casual sneakers, retro classics, canvas essentials, and sporty trainers from SHILL.
            </p>
          </div>
        </div>

        {/* 2. Category Navigation Submenu (Text tabs with minimal underline) */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none py-3 border-b border-neutral-100 text-xs uppercase tracking-[0.18em]">
          {shoesSubcategories.map((sub) => (
            <button
              key={sub.id}
              type="button"
              onClick={() => setActiveCategory(sub.id)}
              className={`py-1 shrink-0 transition-colors cursor-pointer ${
                activeCategory === sub.id
                  ? 'font-bold text-black border-b-2 border-black -mb-[1px]'
                  : 'text-neutral-400 hover:text-black font-medium'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {/* 3. Product Toolbar */}
        <div className="flex flex-row items-center justify-between py-4 mb-6 sm:mb-12 border-b border-neutral-150 text-[11px] uppercase tracking-[0.18em]">
          <span className="font-medium text-neutral-500">
            {filteredProducts.length} PRODUCTS
          </span>

          <div className="flex items-center gap-3">
            <span className="text-neutral-400 hidden sm:inline">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[11px] uppercase tracking-[0.18em] font-semibold text-neutral-900 focus:outline-none cursor-pointer pr-1"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 4. Product Catalog Grid (Desktop 4 col, Tablet 3 col, Mobile 2 col) */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="text-base font-medium text-neutral-900 mb-2">
              No shoe products found
            </h2>
            <p className="text-xs text-neutral-500 mb-6">
              There are currently no items available in this subcategory.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('ALL')}
              className="inline-block px-8 py-3.5 border border-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              View All Shoes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-14 mb-16 sm:mb-28">
            {filteredProducts.map((product, idx) => (
              <EditorialProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
                aspectRatio="square"
                showBadge={product.isNew}
              />
            ))}
          </div>
        )}
      </main>

      {/* Global Minimal Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
