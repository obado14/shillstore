'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { productsData } from '@/data/shill-data';
import { ModernProductCard } from '@/components/sites/shillstore/root/ModernProductCard';

export function FeaturedProducts() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Parfum', 'Jaket', 'Kaos', 'Celana', 'Kemeja'];

  // Curated 15 products for homepage "Semua": exactly 3 Parfum, 3 Jaket, 3 Kaos, 3 Celana, 3 Kemeja
  const curatedHomeProducts = useMemo(() => {
    const perfumes = productsData.filter((p) => p.category === 'Parfum').slice(0, 3);
    const jackets = productsData.filter((p) => p.category === 'Jaket').slice(0, 3);
    const tshirts = productsData.filter((p) => p.category === 'Kaos').slice(0, 3);
    const pants = productsData.filter((p) => p.category === 'Celana').slice(0, 3);
    const shirts = productsData.filter((p) => p.category === 'Kemeja').slice(0, 3);

    return [...perfumes, ...jackets, ...tshirts, ...pants, ...shirts];
  }, []);

  const filteredProducts =
    activeCategory === 'Semua'
      ? curatedHomeProducts
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <section className="py-8 md:py-16 page-width">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#ff1b2d] block mb-1">
            Produk Pilihan
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 uppercase tracking-tight">
            Koleksi Terbaru & Terlaris
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
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

      {/* View Full Collection Button */}
      <div className="mt-8 sm:mt-12 text-center">
        <Link
          href={
            activeCategory === 'Kemeja'
              ? '/collections/all-shirt'
              : activeCategory === 'Kaos'
              ? '/collections/all-t-shirt'
              : activeCategory === 'Jaket'
              ? '/collections/flight-jacket'
              : activeCategory === 'Celana'
              ? '/collections/category-pants-chino-pants'
              : activeCategory === 'Parfum'
              ? '/collections/perfume'
              : '/collections'
          }
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-black hover:bg-[#ff1b2d] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer"
        >
          <span>Lihat Semua {activeCategory !== 'Semua' ? `Koleksi ${activeCategory}` : 'Produk'}</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
