'use client';

import React, { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import { productsData, collectionsList } from '@/data/shill-data';
import { EditorialProductCard } from '@/components/sites/shillstore/root/EditorialProductCard';

export default function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);

  return <CollectionContent handle={handle} />;
}

function CollectionContent({ handle }: { handle: string }) {
  if (['all-product', 'shill-x-jkt48', 'shill-x-mpl', 'ms-glow'].includes(handle)) {
    notFound();
  }

  const isMenPage = handle === 'men';
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');

  const menSubcategories = [
    { id: 'ALL', label: 'ALL' },
    { id: 'T-SHIRTS', label: 'T-SHIRTS' },
    { id: 'SHIRTS', label: 'SHIRTS' },
    { id: 'OUTERWEAR', label: 'OUTERWEAR' },
    { id: 'PANTS', label: 'PANTS' },
    { id: 'ACCESSORIES', label: 'ACCESSORIES' },
  ];

  // Collection metadata
  const collectionInfo = useMemo(() => {
    if (isMenPage) {
      return {
        title: 'MEN',
        subtitle: 'Everyday pieces, made for your style.',
        breadcrumb: 'Men',
      };
    }

    const found = collectionsList.find((c) => c.handle === handle);
    if (found) {
      return {
        title: found.title,
        subtitle: found.description,
        breadcrumb: found.title,
      };
    }

    const formattedTitle = handle
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      title: formattedTitle,
      subtitle: 'Exclusive apparel and essentials crafted by Shill.',
      breadcrumb: formattedTitle,
    };
  }, [handle, isMenPage]);

  // Filter products based on handle and active subcategory
  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    if (isMenPage) {
      // Base MEN collection includes apparel, pants, jackets, and accessories
      list = list.filter((p) => p.category !== 'Parfum');

      if (activeCategory === 'T-SHIRTS') {
        list = list.filter((p) => p.category === 'Kaos');
      } else if (activeCategory === 'SHIRTS') {
        list = list.filter((p) => p.category === 'Kemeja');
      } else if (activeCategory === 'OUTERWEAR') {
        list = list.filter((p) => p.category === 'Jaket');
      } else if (activeCategory === 'PANTS') {
        list = list.filter((p) => p.category === 'Celana');
      } else if (activeCategory === 'ACCESSORIES') {
        list = list.filter((p) => p.category === 'Aksesoris');
      }
    } else {
      const h = handle.toLowerCase();
      list = list.filter((p) => {
        if (handle === 'all') return true;
        const c = p.category.toLowerCase();
        if (h.includes('t-shirt') || h.includes('kaos')) return c === 'kaos';
        if (h.includes('shirt') || h.includes('kemeja')) return c === 'kemeja';
        if (h.includes('chino') || h.includes('pants') || h.includes('celana') || h.includes('bawahan')) return c === 'celana';
        if (h.includes('jacket') || h.includes('jaket') || h.includes('parka')) return c === 'jaket';
        if (h.includes('atasan')) return c === 'kaos' || c === 'jaket' || c === 'kemeja';
        if (h.includes('accessories') || h.includes('aksesoris')) return c === 'aksesoris';
        if (h.includes('perfume') || h.includes('parfum')) return c === 'parfum';
        return true;
      });
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
  }, [handle, isMenPage, activeCategory, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* Global Minimal Header */}
      <Header />

      {/* Main Editorial Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">
        {/* 1. Page Header (Clean, spacious, pure typography, no cards) */}
        <div className="pt-12 sm:pt-16 pb-6 sm:pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">{collectionInfo.breadcrumb}</span>
          </nav>

          {/* Heading & Subtitle */}
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-[1.08] mb-3">
              {collectionInfo.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed">
              {collectionInfo.subtitle}
            </p>
          </div>
        </div>

        {/* 2. Category Navigation (Subtle text links with underline, only for MEN page) */}
        {isMenPage && (
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none py-3 border-b border-neutral-100 text-xs uppercase tracking-[0.18em]">
            {menSubcategories.map((sub) => (
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
        )}

        {/* 3. Product Toolbar (Minimal typography, product count on left, Sort on right) */}
        <div className="flex flex-row items-center justify-between py-4 mb-8 sm:mb-12 border-b border-neutral-150 text-[11px] uppercase tracking-[0.18em]">
          <span className="font-medium text-neutral-500">
            {filteredProducts.length} PRODUCTS
          </span>

          <div className="flex items-center gap-2.5">
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
            <h2 className="text-base font-medium text-neutral-900 mb-2">No products found</h2>
            <p className="text-xs text-neutral-500 mb-6">
              There are currently no items available in this category.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('ALL')}
              className="inline-block px-8 py-3.5 border border-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              View All Men
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 mb-20 sm:mb-28">
            {filteredProducts.map((product, idx) => (
              <EditorialProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
                aspectRatio="square"
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
