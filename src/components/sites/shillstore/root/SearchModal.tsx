'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { SearchIcon, CloseIcon } from '@/components/sites/shillstore/shared/icons';
import { productsData } from '@/data/shill-data';

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState('');

  // Close on Escape key press
  useEffect(() => {
    if (!isSearchOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={() => setIsSearchOpen(false)}
        aria-label="Tutup pencarian"
      />

      <div className="relative min-h-screen flex items-start justify-center pt-12 md:pt-16 px-4 pb-20">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden p-5 md:p-7 z-10 border border-gray-100">
          {/* Search Header: Input + Dedicated Unobstructed Close Button */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari produk impianmu (misal: Chino, Kaos, Kemeja)..."
                autoFocus
                className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm md:text-base text-gray-900 focus:outline-none focus:border-black focus:bg-white transition-all shadow-2xs"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-black rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Hapus kata kunci"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Prominent Close Modal Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-3 text-gray-600 hover:text-black hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors shrink-0 flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="Tutup jendela pencarian"
              title="Tutup (Esc)"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
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
                    className="px-3.5 py-1.5 bg-gray-100 hover:bg-black hover:text-white text-xs font-medium text-gray-700 rounded-full transition-colors cursor-pointer"
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
                      className="px-3 py-1.5 bg-black hover:bg-red-600 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
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
