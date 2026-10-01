'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import { productsData, collectionsList } from '@/data/shill-data';
import { ModernProductCard } from '@/components/sites/shillstore/root/ModernProductCard';

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

  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState('featured');

  const collectionInfo = collectionsList.find((c) => c.handle === handle) || {
    handle,
    title: handle
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    description: 'Koleksi pakaian kasual eksklusif persembahan Shill.',
  };

  // Filter products by collection handle keyword
  const filteredProducts = productsData.filter((p) => {
    if (handle === 'all') return true;
    const h = handle.toLowerCase();
    const t = p.title.toLowerCase();
    const c = p.category.toLowerCase();
    if (h.includes('t-shirt') || h.includes('kaos')) return c === 'kaos' || t.includes('t-shirt');
    if (h.includes('shirt') || h.includes('kemeja')) return c === 'kemeja' || t.includes('shirt');
    if (h.includes('chino') || h.includes('pants') || h.includes('celana') || h.includes('bawahan')) return c === 'celana';
    if (h.includes('jacket') || h.includes('jaket') || h.includes('parka')) return c === 'jaket';
    if (h.includes('accessories') || h.includes('aksesoris')) return c === 'aksesoris';
    if (h.includes('perfume') || h.includes('parfum')) return c === 'parfum';
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#121212]">
      <Header />

      <main className="flex-1 py-8">
        <div className="page-width">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-black transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-black transition-colors">
              Koleksi
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">{collectionInfo.title}</span>
          </nav>

          {/* Collection Title & Description */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase font-koulen tracking-wide mb-3">
              {collectionInfo.title}
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              {collectionInfo.description}
            </p>
          </div>

          {/* Filter & Sort Bar */}
          <div className="flex flex-row justify-between items-center pb-4 mb-8 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500">
              Menampilkan {sortedProducts.length} produk
            </span>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs font-medium text-gray-600 hidden sm:block">
                Urutkan:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="featured">Unggulan</option>
                <option value="price-low">Harga: Rendah ke Tinggi</option>
                <option value="price-high">Harga: Tinggi ke Rendah</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="scope product-cards">
            <div className="_card-list">
              {sortedProducts.map((product) => (
                <ModernProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
