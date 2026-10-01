'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { productsData } from '@/data/shill-data';
import { Product } from '@/types/shill';

export function FeaturedProducts() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Parfum', 'Chino Pants', 'Short Shirt', 'Relax Chino'];

  const filteredProducts =
    activeCategory === 'Semua'
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <section className="py-10 md:py-16 page-width">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#ff1b2d] block mb-1">
            Produk Pilihan
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase tracking-tight">
            Koleksi Terbaru & Terlaris
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
}) {
  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div
        className={`relative aspect-square w-full overflow-hidden ${
          product.id === 'shill-perfume-bloom'
            ? 'bg-[#fcf5f3]'
            : product.id === 'shill-perfume-ocean'
            ? 'bg-[#eef7fc]'
            : product.id === 'shill-perfume-legacy'
            ? 'bg-[#26130b]'
            : product.id === 'shill-perfume-velo'
            ? 'bg-[#383a3d]'
            : product.id === 'shill-perfume-velvet'
            ? 'bg-[#2d0a12]'
            : product.category === 'Parfum'
            ? 'bg-[#121212]'
            : 'bg-gray-50'
        }`}
      >
        {/* Sale Badge */}
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
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Quick Add Button */}
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

      {/* Product Details */}
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

          {/* Rating */}
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
