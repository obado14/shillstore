'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { productsData } from '@/data/shill-data';
import { ModernProductCard } from '@/components/sites/shillstore/root/ModernProductCard';

export function FeaturedProducts() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Kemeja', 'Kaos', 'Jaket', 'Celana', 'Parfum'];

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
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
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
      <div className="scope product-cards">
        <div className="_card-list">
          {filteredProducts.map((product) => (
            <ModernProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
