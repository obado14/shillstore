'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/shill';

export function getProductAccentColor(product: Product): string {
  if (product.id.includes('noir')) return '#1a1a1a';
  if (product.id.includes('bloom')) return '#ff6b8b';
  if (product.id.includes('ocean')) return '#008bc9';
  if (product.id.includes('legacy')) return '#8c4b26';
  if (product.id.includes('velo')) return '#4e8397';
  if (product.id.includes('velvet')) return '#9b1d36';

  // Jacket Models
  if (product.id.includes('windbreaker')) return '#0284c7';
  if (product.id.includes('coach')) return '#d97706';
  if (product.id.includes('parka')) return '#15803d';
  if (product.id.includes('varsity')) return '#b91c1c';

  const cat = product.category.toLowerCase();
  if (cat.includes('parfum')) return '#c34a36';
  if (cat.includes('kaos')) return '#ff1b2d';
  if (cat.includes('kemeja')) return '#4e8397';
  if (cat.includes('celana')) return '#3a5a40';
  if (cat.includes('jaket')) return '#ff8066';
  if (cat.includes('aksesoris')) return '#008bc9';

  return '#ff1b2d';
}

export function getProductDescription(product: Product): string {
  if (product.category === 'Parfum') {
    if (product.id.includes('noir')) return 'Wewangian berkarakter bold, percaya diri, hangat woody & tahan 8-12 jam.';
    if (product.id.includes('bloom')) return 'Aroma floral segar memancarkan pesona keanggunan, kelembutan, dan nuansa ceria.';
    if (product.id.includes('ocean')) return 'Sensasi deburan angin laut dan citrus akuatik yang membangkitkan energi harian.';
    if (product.id.includes('legacy')) return 'Kehangatan rempah cardamom dan kayu cedarwood berkarakter karismatik.';
    if (product.id.includes('velo')) return 'Harmoni aroma segar modern yang minimalis, versatile, dan cocok segala suasana.';
    if (product.id.includes('velvet')) return 'Pesona keharuman sensual yang mewah, manis raspberry, dan tak terlupakan.';
    return 'Wewangian eksklusif dengan ketahanan tahan lama menemani aktivitas harianmu.';
  }
  if (product.category === 'Jaket') {
    if (product.id.includes('windbreaker')) return 'Jaket tahan angin & air (water-resistant) berbahan taslan mikro ringan dengan tudung ergonomis.';
    if (product.id.includes('coach')) return 'Coach jacket streetwear bergaya kasual dengan kancing snap button dan inner furing adem.';
    if (product.id.includes('parka')) return 'Parka jacket tangguh berdesain tactical dengan banyak saku fungsional dan material kanvas katun tebal.';
    if (product.id.includes('varsity')) return 'Varsity jacket gaya retro berkarakter kuat dengan bordir chenille eksklusif dan lengan kombinasi.';
    return 'Outerwear stylish berdaya tahan tinggi, menjaga tubuh tetap hangat dan trendi.';
  }
  if (product.category === 'Kaos') {
    return 'Material 100% katun combed premium dengan fitting relaxed unisex yang adem dan nyaman.';
  }
  if (product.category === 'Kemeja') {
    return 'Kemeja kasual berbahan breathable dengan potongan rapi cocok untuk hangout maupun kerja.';
  }
  if (product.category === 'Celana') {
    return 'Celana flexi-fit dengan material twill premium elastis untuk kenyamanan gerak maksimal.';
  }
  return 'Koleksi busana kasual eksklusif persembahan Shill Store dengan standar kualitas terbaik.';
}

export function getProductTags(product: Product): string[] {
  if (product.category === 'Parfum') {
    return ['100 ML', 'EDP', 'Best Seller'];
  }
  if (product.category === 'Jaket') {
    if (product.id.includes('windbreaker')) return ['Water Resistant', 'Windproof', 'Taslan'];
    if (product.id.includes('coach')) return ['Streetwear', 'Snap Button', 'Casual'];
    if (product.id.includes('parka')) return ['Heavyweight', 'Tactical Multi-Pocket', 'Warm'];
    if (product.id.includes('varsity')) return ['Collegiate Retro', 'Chenille Patch', 'Warm Fleece'];
    return ['Outerwear', 'Unisex', 'Streetwear'];
  }
  if (product.category === 'Kaos') {
    return ['Katun Combed', 'Unisex', 'Streetwear'];
  }
  if (product.category === 'Kemeja') {
    return ['Rayon Premium', 'Regular Fit', 'Casual'];
  }
  if (product.category === 'Celana') {
    return ['Flexi-Fit', 'Twill Stretch', 'Daily'];
  }
  return ['Shill Original', 'Unisex', 'Trending'];
}

export function ModernProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
}) {
  const accent = getProductAccentColor(product);
  const description = getProductDescription(product);
  const tags = getProductTags(product);
  const primaryImg = product.images[0];
  const secondaryImg = product.images[1] || product.images[0];

  return (
    <section
      className="_card"
      style={{ '--product-card--accent': accent } as React.CSSProperties}
    >
      {/* Category Notch Badge */}
      <p className="_category">{product.category}</p>

      {/* Thumbnail Stack (1:1 Aspect Ratio) with dual image reveal */}
      <Link href={product.link} className="_thumbnail-stack">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={primaryImg}
          alt={product.title}
          width={400}
          height={400}
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={secondaryImg}
          alt={product.title}
          width={400}
          height={400}
          loading="lazy"
        />
      </Link>

      {/* Product Title */}
      <h2 className="_heading">
        <Link href={product.link}>
          {product.title}
        </Link>
      </h2>

      {/* Price Pill */}
      <p className="_price">{product.formattedPrice}</p>

      {/* Description */}
      <p className="_description">{description}</p>

      {/* Tag List */}
      <ul className="_tag-list">
        {tags.map((tag) => (
          <li key={tag} className="_tag">
            {tag}
          </li>
        ))}
      </ul>

      {/* Add To Cart Button */}
      <div
        className="_button"
        style={{
          '--purchase-button--background': accent,
          '--purchase-button--foreground': '#ffffff',
        } as React.CSSProperties}
      >
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="scope purchase-button"
        >
          Add To Cart
        </button>
      </div>
    </section>
  );
}
