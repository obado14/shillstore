'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import { blogStoriesData } from '@/data/shill-data';

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = use(params);

  return (
    <CartProvider>
      <BlogPostContent category={category} slug={slug} />
    </CartProvider>
  );
}

function BlogPostContent({ category, slug }: { category: string; slug: string }) {
  const blog = blogStoriesData.find((b) => b.link.includes(slug)) || {
    id: slug,
    title: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    excerpt: 'Kisah eksklusif mengenai tren gaya hidup, rilis produk baru, dan kultur anak muda dari Shill.',
    image: '/sites/shillstore/root/images/blog-mpl.png',
    link: `/blogs/${category}/${slug}`,
    tag: 'Blogs',
    instagramHandle: '@shillstore',
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#121212]">
      <Header />

      <main className="flex-1 py-12">
        <article className="page-width max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-black transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href={`/blogs/${category}`} className="hover:text-black transition-colors uppercase">
              {category}
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900 line-clamp-1">{blog.title}</span>
          </nav>

          {/* Article Header */}
          <div className="mb-8">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
              {blog.tag}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase font-koulen tracking-tight text-gray-900 leading-tight mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Ditulis oleh: Tim Editorial Shill</span>
              <span>•</span>
              <span>Diperbarui baru saja</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-gray-100 mb-10 shadow-md">
            <Image src={blog.image} alt={blog.title} fill priority className="object-cover" />
          </div>

          {/* Article Body */}
          <div className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gray-900 leading-normal">
              {blog.excerpt}
            </p>
            <p>
              Di tengah pesatnya perkembangan budaya streetwear dan gaya hidup urban, Shill terus berinovasi untuk menghadirkan karya yang relevan dengan generasi muda. Kerja sama ini menjadi representasi nyata dari semangat &quot;Everywhere You Go&quot; yang menggabungkan ekspresi seni, fashion, dan energi positif.
            </p>
            <p>
              Koleksi ini menggunakan bahan katun pilihan dengan sablon grafis tahan lama dan jahitan ganda yang kokoh, dirancang untuk memastikan kenyamanan sepanjang hari. Jangan lewatkan kesempatan untuk memiliki koleksi edisi terbatas ini melalui toko resmi dan website kami.
            </p>
          </div>

          {/* Share & Back */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <Link
              href={`/blogs/${category}`}
              className="text-xs font-bold uppercase tracking-wider text-black hover:text-red-600 transition-colors"
            >
              ← Kembali ke Daftar Artikel
            </Link>
            <Link
              href="/collections"
              className="px-6 py-2.5 bg-black hover:bg-red-600 text-white text-xs font-bold uppercase rounded-lg transition-colors"
            >
              Lihat Koleksi
            </Link>
          </div>
        </article>
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
