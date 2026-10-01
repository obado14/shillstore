'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { SearchIcon, CloseIcon } from '@/components/sites/shillstore/shared/icons';
import { productsData } from '@/data/shill-data';

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const popularKeywords = ['Kaos Oversize', 'Chino Pants', 'Kemeja Rayon', 'Celana Cargo', 'Jaket Parka', 'Parfum'];

  const filteredProducts = query.trim()
    ? productsData.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center pt-16 px-4 pb-20">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          {/* Search Input */}
          <div className="relative mt-2">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk impianmu (misal: Chino, Kaos, Kemeja)..."
              autoFocus
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 focus:outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          {/* Popular Keywords */}
          {!query && (
            <div className="mt-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Kata kunci populer
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className="px-3.5 py-1.5 bg-gray-100 hover:bg-black hover:text-white text-xs font-medium text-gray-700 rounded-full transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="mt-6 max-h-96 overflow-y-auto divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">
                  Tidak ada produk yang cocok dengan &quot;{query}&quot;
                </p>
              ) : (
                filteredProducts.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between gap-4 group">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-md overflow-hidden bg-gray-50 shrink-0">
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">
                          {p.title}
                        </h5>
                        <span className="text-xs font-bold text-red-600">{p.formattedPrice}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(p);
                        setIsSearchOpen(false);
                      }}
                      className="px-3 py-1.5 bg-black hover:bg-red-600 text-white text-xs font-semibold rounded-md transition-colors"
                    >
                      Beli
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
