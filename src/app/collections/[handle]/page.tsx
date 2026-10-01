'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CartProvider, useCart } from '@/context/CartContext';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import { productsData, collectionsList } from '@/data/shill-data';
import { Product } from '@/types/shill';

export default function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);

  return (
    <CartProvider>
      <CollectionContent handle={handle} />
    </CartProvider>
  );
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <CollectionProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
}

function CollectionProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
}) {
  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className={`relative aspect-3/4 w-full overflow-hidden ${product.category === 'Parfum' ? 'bg-[#121212]' : 'bg-gray-50'}`}>
        {product.discountBadge && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#ff1b2d] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            {product.discountBadge}
          </span>
        )}

        <Link href={product.link} className="block relative w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className={product.category === 'Parfum' ? 'object-contain group-hover:scale-105 transition-transform duration-500' : 'object-cover group-hover:scale-105 transition-transform duration-500'}
          />
        </Link>

        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-2.5 inset-x-2.5 py-2.5 bg-black/90 hover:bg-[#ff1b2d] text-white text-xs font-bold tracking-wide uppercase rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Tambah</span>
        </button>
      </div>

      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
        <div>
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">
            {product.category}
          </span>
          <Link href={product.link}>
            <h3 className="text-xs font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-relaxed">
              {product.title}
            </h3>
          </Link>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-[#121212]">
              {product.formattedPrice}
            </span>
            {product.formattedCompareAtPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                {product.formattedCompareAtPrice}
              </span>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-500">
              <span className="text-amber-400">★</span>
              <span className="font-semibold text-gray-700">{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
