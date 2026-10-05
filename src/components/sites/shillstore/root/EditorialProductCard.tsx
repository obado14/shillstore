'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/shill';
import { useCart } from '@/context/CartContext';

interface EditorialProductCardProps {
  product: Product;
  priority?: boolean;
}

export function EditorialProductCard({ product, priority = false }: EditorialProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const primaryImage = product.images[0] || '/sites/shillstore/root/images/prod-chino-sirius-black.jpg';
  const secondaryImage = product.images[1] || product.images[0] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => {
      setIsAdding(false);
    }, 900);
  };

  return (
    <div className="group relative flex flex-col">
      {/* Product Image Stage */}
      <Link
        href={product.link}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-[#f4f4f4]"
      >
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
            secondaryImage !== primaryImage ? 'group-hover:opacity-0' : ''
          }`}
        />

        {/* Secondary Image on Hover (if different) */}
        {secondaryImage !== primaryImage && (
          <Image
            src={secondaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center absolute inset-0 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Subtle New or Exclusive Marker */}
        {product.isNew && (
          <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.25em] font-semibold text-neutral-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 pointer-events-none">
            New
          </span>
        )}

        {/* Quick Add To Bag Overlay Button on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto hidden sm:block">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-3 bg-black/90 hover:bg-black text-white text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xs transition-colors cursor-pointer"
          >
            {isAdding ? 'Added to Bag' : 'Add to Bag'}
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="mt-3.5 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={product.link}
            className="text-xs md:text-sm font-medium text-neutral-900 tracking-tight hover:text-neutral-500 transition-colors line-clamp-1"
          >
            {product.title}
          </Link>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xs md:text-sm text-neutral-600 font-normal">
            {product.formattedPrice}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[11px] md:text-xs text-neutral-400 line-through font-normal">
              {product.formattedCompareAtPrice}
            </span>
          )}
        </div>

        {/* Mobile Quick Add */}
        <div className="mt-2 block sm:hidden">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2 border border-neutral-300 text-neutral-900 text-[10px] font-semibold uppercase tracking-[0.18em] hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            {isAdding ? 'Added' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </div>
  );
}
