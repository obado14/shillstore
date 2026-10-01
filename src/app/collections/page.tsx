'use client';

import React from 'react';
import Link from 'next/link';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import { collectionsList } from '@/data/shill-data';

export default function CollectionsIndexPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#121212]">
        <Header />

        <main className="flex-1 py-12 page-width">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase font-koulen tracking-wider mb-3">
              Semua Koleksi Shill
            </h1>
            <p className="text-sm text-gray-600">
              Temukan berbagai kategori pakaian kasual berkualitas untuk gaya harianmu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {collectionsList.map((col) => (
              <Link
                key={col.handle}
                href={`/collections/${col.handle}`}
                className="group relative rounded-2xl overflow-hidden border border-gray-100 p-8 bg-gray-50 hover:bg-black hover:text-white transition-all duration-300 flex flex-col justify-between min-h-[220px] shadow-2xs hover:shadow-xl"
              >
                <div>
                  <h2 className="text-2xl font-bold uppercase font-koulen tracking-wide mb-2 group-hover:text-white transition-colors">
                    {col.title}
                  </h2>
                  <p className="text-xs text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors">
                    {col.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-red-600 group-hover:text-white transition-colors">
                  <span>Lihat Produk</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <Footer />
        <CartDrawer />
        <SearchModal />
      </div>
    </CartProvider>
  );
}
