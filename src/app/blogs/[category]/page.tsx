'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/sites/erigostore-co-id/root/Header';
import { Footer } from '@/components/sites/erigostore-co-id/root/Footer';
import { CartDrawer } from '@/components/sites/erigostore-co-id/root/CartDrawer';
import { SearchModal } from '@/components/sites/erigostore-co-id/root/SearchModal';
import { blogStoriesData } from '@/data/erigo-data';

export default function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);

  return (
    <CartProvider>
      <BlogCategoryContent category={category} />
    </CartProvider>
  );
}

function BlogCategoryContent({ category }: { category: string }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#121212]">
      <Header />

      <main className="flex-1 py-12 page-width">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#ff1b2d] block mb-1">
            Erigo Journal
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase font-koulen tracking-wide mb-3">
            {category === 'news' ? 'Kabar & Berita Erigo' : 'Erigo Stories & Blogs'}
          </h1>
          <p className="text-sm text-gray-600">
            Temukan kisah inspiratif di balik kolaborasi, rilis produk terbaru, dan gaya hidup urban anak muda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogStoriesData.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-16/9 w-full overflow-hidden bg-gray-100">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-2">
                    {blog.tag}
                  </span>
                  <Link href={blog.link}>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-3">
                      {blog.title}
                    </h2>
                  </Link>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Tim Redaksi Erigo</span>
                  <Link
                    href={blog.link}
                    className="text-xs font-bold text-black group-hover:text-red-600 transition-colors"
                  >
                    Baca Artikel →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
