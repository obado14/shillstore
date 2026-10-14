'use client';

import React, { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Search, X } from 'lucide-react';
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

  if (handle === 'shoes' || handle === 'sepatu') {
    redirect('/shoes');
  }

  const isSalePage = handle === 'sale';
  const isMenPage = handle === 'men';
  const isWomenPage = handle === 'women';
  const isAccessoriesPage = handle === 'accessories' || handle === 'aksesoris';
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(16);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setVisibleCount(16);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setVisibleCount(16);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(16);
  };

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

  // Dynamic counts for MEN categories
  const menCounts = useMemo(() => {
    if (!isMenPage) return {} as Record<string, number>;
    const base = productsData.filter((p) => p.category !== 'Parfum' && p.category !== 'Sepatu');
    return {
      ALL: base.length,
      'T-SHIRTS': base.filter((p) => p.category === 'Kaos').length,
      SHIRTS: base.filter((p) => p.category === 'Kemeja').length,
      OUTERWEAR: base.filter((p) => p.category === 'Jaket').length,
      PANTS: base.filter((p) => p.category === 'Celana').length,
      ACCESSORIES: base.filter((p) => p.category === 'Aksesoris').length,
    };
  }, [isMenPage]);

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
        subtitle: 'Essential silhouettes and contemporary street style, crafted for daily wear.',
        description: 'Explore heavy cotton t-shirts, structured shirts, technical outerwear, and tailored chinos from SHILL.',
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

  // Filter products based on handle, active subcategory, and optional search query
  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    if (isSalePage) {
      // Strictly ONLY products with a genuine sale price (excluding shoes so SALE page remains unchanged)!
      list = list.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price && p.category !== 'Sepatu');

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
      list = list.filter((p) => p.category !== 'Parfum' && p.category !== 'Sepatu');

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
      list = list.filter((p) => p.category !== 'Parfum' && p.category !== 'Sepatu');

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

    // In-catalog search filter if query exists
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q) ||
          p.colors?.some((c) => c.toLowerCase().includes(q))
      );
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
  }, [handle, isSalePage, isMenPage, isWomenPage, activeCategory, sortBy, searchQuery]);

  const activeSubcategories = isSalePage
    ? saleSubcategories
    : isWomenPage
    ? womenSubcategories
    : isMenPage
    ? menSubcategories
    : null;

  // Pagination / Load more slice
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length;
  const progressPercent = filteredProducts.length > 0
    ? Math.min(100, Math.round((Math.min(visibleCount, filteredProducts.length) / filteredProducts.length) * 100))
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* Global Minimal Header */}
      <Header />

      {/* Main Editorial Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">
        {/* 1. Page Header (Clean, spacious, pure typography, no cards) */}
        <div className="pt-10 sm:pt-16 pb-5 sm:pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-3 sm:mb-6">
            <Link href="/" className="hover:text-black transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">{collectionInfo.breadcrumb}</span>
          </nav>

          {/* Heading & Subtitle */}
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-[1.08] mb-2 sm:mb-3">
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

        {/* 2. Category Navigation (Subtle text links with underline & dynamic counts) */}
        {activeSubcategories && (
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none py-3 border-b border-neutral-100 text-xs uppercase tracking-[0.18em]">
            {activeSubcategories.map((sub) => {
              const count = isMenPage ? menCounts[sub.id] : undefined;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleCategoryChange(sub.id)}
                  className={`py-1 shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === sub.id
                      ? 'font-bold text-black border-b-2 border-black -mb-[1px]'
                      : 'text-neutral-400 hover:text-black font-medium'
                  }`}
                >
                  <span>{sub.label}</span>
                  {count !== undefined && count > 0 && (
                    <span
                      className={`text-[10px] font-normal ${
                        activeCategory === sub.id ? 'text-black' : 'text-neutral-400'
                      }`}
                    >
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 3. Product Toolbar (Product count, in-catalog search, and sort dropdown) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 mb-6 sm:mb-10 border-b border-neutral-150 gap-3 text-[11px] uppercase tracking-[0.18em]">
          {/* Left: Product count & search active indicator */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-900">
              {filteredProducts.length} {isSalePage ? 'ITEMS ON SALE' : 'PRODUCTS'}
            </span>
            {searchQuery && (
              <span className="text-neutral-400 normal-case tracking-normal">
                matching &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>

          {/* Right: In-Catalog Search & Sort dropdown */}
          <div className="flex items-center gap-3 sm:gap-5 justify-between sm:justify-end">
            {/* Quick in-catalog filter search */}
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Filter catalog..."
                className="pl-8 pr-7 py-1.5 text-xs bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200 rounded-none text-neutral-900 placeholder:text-neutral-400 placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:border-black focus:bg-white transition-all w-36 sm:w-48 tracking-normal"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-2 p-0.5 text-neutral-400 hover:text-black cursor-pointer"
                  aria-label="Clear filter"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-neutral-400 hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
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
        </div>

        {/* 4. Product Catalog Grid or Editorial States */}
        {filteredProducts.length === 0 ? (
          isMenPage && activeCategory === 'ACCESSORIES' ? (
            /* Men's Accessories Coming Soon */
            <div className="py-20 sm:py-28 text-center max-w-xl mx-auto px-4">
              <div className="w-10 h-[1px] bg-neutral-300 mx-auto mb-8" />
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium mb-3">
                MEN / ACCESSORIES
              </span>
              <div className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-900 border border-neutral-200 px-4 py-1.5 mb-5">
                COMING SOON
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight mb-3">
                Men&apos;s Accessories
              </h2>
              <p className="text-sm text-neutral-500 font-normal leading-relaxed mb-8">
                Everyday caps, cross-body bags, and leather accessories are currently being crafted for our upcoming drop.
              </p>
              <button
                type="button"
                onClick={() => handleCategoryChange('ALL')}
                className="px-8 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                View All Men&apos;s Products
              </button>
              <div className="w-10 h-[1px] bg-neutral-200 mx-auto mt-12" />
            </div>
          ) : isAccessoriesPage ? (
            /* Intentional Editorial Coming Soon for Accessories */
            <div className="py-20 sm:py-28 lg:py-36 text-center max-w-2xl mx-auto">
              <div className="w-12 h-[1px] bg-neutral-300 mx-auto mb-10" />
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium mb-4">
                SHILLSTORE / ACCESSORIES
              </span>
              <div className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-neutral-900 border border-neutral-200 px-4 py-1.5 mb-6">
                COMING SOON
              </div>
              <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight leading-tight mb-4">
                Accessories are on the way.
              </h2>
              <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed max-w-lg mx-auto mb-10 sm:mb-12">
                Bag, caps, wallets, and everyday essentials are coming soon.
              </p>
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
              <div className="w-12 h-[1px] bg-neutral-200 mx-auto mt-14 sm:mt-16" />
            </div>
          ) : searchQuery ? (
            /* In-catalog Search yielded no results */
            <div className="py-20 text-center max-w-md mx-auto">
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                No products matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Try searching for different keywords or clear your filter.
              </p>
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="px-6 py-3 border border-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                Clear Filter
              </button>
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
                  onClick={() => handleCategoryChange('ALL')}
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
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3.5 gap-y-7 sm:gap-x-6 sm:gap-y-12 lg:gap-x-7 lg:gap-y-14 mb-12 sm:mb-16">
              {visibleProducts.map((product, idx) => (
                <EditorialProductCard
                  key={product.id}
                  product={product}
                  priority={idx < 4}
                  aspectRatio="square"
                  showDiscount={isSalePage}
                />
              ))}
            </div>

            {/* Load More & Progress Indicator Section */}
            <div className="flex flex-col items-center justify-center pt-4 pb-20 sm:pb-28 text-center border-t border-neutral-100">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3">
                Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} {isSalePage ? 'items on sale' : 'products'}
              </p>

              {/* Progress Bar */}
              <div className="w-48 sm:w-64 h-[2px] bg-neutral-200 overflow-hidden mb-6">
                <div
                  className="h-full bg-black transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Load More Button or All Caught Up */}
              {hasMore ? (
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 16, filteredProducts.length))}
                  className="px-10 py-3.5 border border-black bg-white hover:bg-black hover:text-white text-black text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-200 cursor-pointer shadow-xs active:scale-98"
                >
                  Load More Products
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-neutral-400 tracking-wider">
                    You have viewed all {filteredProducts.length} products
                  </span>
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-900 hover:text-neutral-500 transition-colors mt-2 underline underline-offset-4 cursor-pointer"
                  >
                    Back to Top ↑
                  </button>
                </div>
              )}
            </div>
          </>
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
