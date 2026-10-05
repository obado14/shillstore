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

  const isSalePage = handle === 'sale';
  const isMenPage = handle === 'men';
  const isWomenPage = handle === 'women';
  const isAccessoriesPage = handle === 'accessories' || handle === 'aksesoris';
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');

  const saleSubcategories = [
    { id: 'ALL', label: 'ALL SALE' },
    { id: 'CLOTHING', label: 'CLOTHING' },
    { id: 'ACCESSORIES', label: 'ACCESSORIES' },
  ];

  const menSubcategories = [
    { id: 'ALL', label: 'ALL' },
    { id: 'T-SHIRTS', label: 'T-SHIRTS' },
    { id: 'SHIRTS', label: 'SHIRTS' },
    { id: 'OUTERWEAR', label: 'OUTERWEAR' },
    { id: 'PANTS', label: 'PANTS' },
    { id: 'ACCESSORIES', label: 'ACCESSORIES' },
  ];

  const womenSubcategories = [
    { id: 'ALL', label: 'ALL' },
    { id: 'TOPS', label: 'TOPS' },
    { id: 'SHIRTS', label: 'SHIRTS' },
    { id: 'OUTERWEAR', label: 'OUTERWEAR' },
    { id: 'BOTTOMS', label: 'BOTTOMS' },
    { id: 'ACCESSORIES', label: 'ACCESSORIES' },
  ];

  // Collection metadata
  const collectionInfo = useMemo(() => {
    if (isAccessoriesPage) {
      return {
        title: 'ACCESSORIES',
        subtitle: 'Everyday essentials, made to complete your look.',
        description: '',
        breadcrumb: 'ACCESSORIES',
      };
    }

    if (isSalePage) {
      return {
        title: 'SALE',
        subtitle: 'Good pieces. Better prices.',
        description: 'Selected SHILL pieces, now available at special prices.',
        breadcrumb: 'SALE',
      };
    }

    if (isWomenPage) {
      return {
        title: 'WOMEN',
        subtitle: 'Everyday pieces, styled your way.',
        description: 'Explore shirts, outerwear, trousers, and everyday essentials from SHILL.',
        breadcrumb: 'WOMEN',
      };
    }

    if (isMenPage) {
      return {
        title: 'MEN',
        subtitle: 'Everyday pieces, made for your style.',
        description: 'Discover versatile essentials crafted for movement, durability, and daily street style.',
        breadcrumb: 'MEN',
      };
    }

    const found = collectionsList.find((c) => c.handle === handle);
    if (found) {
      return {
        title: found.title,
        subtitle: found.description,
        description: '',
        breadcrumb: found.title.toUpperCase(),
      };
    }

    const formattedTitle = handle
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      title: formattedTitle,
      subtitle: 'Exclusive apparel and essentials crafted by Shill.',
      description: '',
      breadcrumb: formattedTitle.toUpperCase(),
    };
  }, [handle, isAccessoriesPage, isSalePage, isMenPage, isWomenPage]);

  // Filter products based on handle and active subcategory
  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    if (isSalePage) {
      // Strictly ONLY products with a genuine sale price!
      list = list.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);

      if (activeCategory === 'CLOTHING') {
        list = list.filter(
          (p) =>
            p.category === 'Kaos' ||
            p.category === 'Kemeja' ||
            p.category === 'Jaket' ||
            p.category === 'Celana'
        );
      } else if (activeCategory === 'ACCESSORIES') {
        list = list.filter((p) => p.category === 'Aksesoris');
      }
    } else if (isWomenPage) {
      // Base WOMEN collection includes apparel, tops, shirts, outerwear, trousers, and accessories
      list = list.filter((p) => p.category !== 'Parfum');

      if (activeCategory === 'TOPS') {
        list = list.filter((p) => p.category === 'Kaos');
      } else if (activeCategory === 'SHIRTS') {
        list = list.filter((p) => p.category === 'Kemeja');
      } else if (activeCategory === 'OUTERWEAR') {
        list = list.filter((p) => p.category === 'Jaket');
      } else if (activeCategory === 'BOTTOMS') {
        list = list.filter((p) => p.category === 'Celana');
      } else if (activeCategory === 'ACCESSORIES') {
        list = list.filter((p) => p.category === 'Aksesoris');
      }
    } else if (isMenPage) {
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
        if (h.includes('chino') || h.includes('pants') || h.includes('celana') || h.includes('bawahan'))
          return c === 'celana';
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
    } else if (sortBy === 'biggest-discount') {
      list.sort((a, b) => {
        const discA = a.compareAtPrice ? (a.compareAtPrice - a.price) / a.compareAtPrice : 0;
        const discB = b.compareAtPrice ? (b.compareAtPrice - b.price) / b.compareAtPrice : 0;
        return discB - discA;
      });
    }

    return list;
  }, [handle, isSalePage, isMenPage, isWomenPage, activeCategory, sortBy]);

  const activeSubcategories = isSalePage
    ? saleSubcategories
    : isWomenPage
    ? womenSubcategories
    : isMenPage
    ? menSubcategories
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* Global Minimal Header */}
      <Header />

      {/* Main Editorial Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">
        {/* 1. Page Header (Clean, spacious, pure typography, no cards) */}
        <div className="pt-12 sm:pt-16 pb-6 sm:pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-black transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">{collectionInfo.breadcrumb}</span>
          </nav>

          {/* Heading & Subtitle */}
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-[1.08] mb-3">
              {collectionInfo.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-700 font-normal leading-relaxed">
              {collectionInfo.subtitle}
            </p>
            {collectionInfo.description && (
              <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed mt-1">
                {collectionInfo.description}
              </p>
            )}
          </div>
        </div>

        {/* 2. Category Navigation (Subtle text links with underline) */}
        {activeSubcategories && (
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none py-3 border-b border-neutral-100 text-xs uppercase tracking-[0.18em]">
            {activeSubcategories.map((sub) => (
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

        {/* 3. Product Toolbar (Minimal typography, product count on left, Sort on right - hidden when empty) */}
        {filteredProducts.length > 0 && (
          <div className="flex flex-row items-center justify-between py-4 mb-8 sm:mb-12 border-b border-neutral-150 text-[11px] uppercase tracking-[0.18em]">
            <span className="font-medium text-neutral-500">
              {filteredProducts.length} {isSalePage ? 'ITEMS ON SALE' : 'PRODUCTS'}
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
                {isSalePage && <option value="biggest-discount">Biggest Discount</option>}
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}

        {/* 4. Product Catalog Grid (Desktop 4 col, Tablet 3 col, Mobile 2 col) or Editorial Coming Soon */}
        {filteredProducts.length === 0 ? (
          isAccessoriesPage ? (
            /* Intentional Editorial Coming Soon for Accessories */
            <div className="py-20 sm:py-28 lg:py-36 text-center max-w-2xl mx-auto">
              {/* Subtle top hairline divider */}
              <div className="w-12 h-[1px] bg-neutral-300 mx-auto mb-10" />

              {/* Small editorial detail text */}
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium mb-4">
                SHILLSTORE / ACCESSORIES
              </span>

              {/* Eyebrow badge: COMING SOON */}
              <div className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-900 border border-neutral-200 px-4 py-1.5 mb-6">
                COMING SOON
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight leading-tight mb-4">
                Accessories are on the way.
              </h2>

              {/* Body description */}
              <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed max-w-lg mx-auto mb-10 sm:mb-12">
                Bag, caps, wallets, and everyday essentials are coming soon.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-3.5 bg-black text-white text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-colors text-center"
                >
                  BACK TO SHOP
                </Link>
                <Link
                  href="/collections"
                  className="w-full sm:w-auto px-8 py-3.5 border border-black text-black text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-black hover:text-white transition-colors text-center"
                >
                  EXPLORE NEW IN
                </Link>
              </div>

              {/* Subtle bottom hairline divider */}
              <div className="w-12 h-[1px] bg-neutral-200 mx-auto mt-14 sm:mt-16" />
            </div>
          ) : (
            <div className="py-24 text-center">
              <h2 className="text-base font-medium text-neutral-900 mb-2">
                {isSalePage ? 'No sale items found' : 'No products found'}
              </h2>
              <p className="text-xs text-neutral-500 mb-6">
                {isSalePage
                  ? 'There are currently no items on sale in this category.'
                  : 'There are currently no items available in this category.'}
              </p>
              {isSalePage ? (
                <button
                  type="button"
                  onClick={() => setActiveCategory('ALL')}
                  className="inline-block px-8 py-3.5 border border-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  View All Sale
                </button>
              ) : (
                <Link
                  href="/collections"
                  className="inline-block px-8 py-3.5 border border-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
                >
                  View All Products
                </Link>
              )}
            </div>
          )
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 mb-20 sm:mb-28">
            {filteredProducts.map((product, idx) => (
              <EditorialProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
                aspectRatio="square"
                showDiscount={isSalePage}
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
