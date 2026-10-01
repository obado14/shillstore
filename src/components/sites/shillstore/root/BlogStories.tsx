'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogStoriesData } from '@/data/shill-data';
import { InstagramIcon } from '@/components/sites/shillstore/shared/icons';

export function BlogStories() {
  return (
    <section className="py-12 md:py-16 bg-[#121212] text-white">
      <div className="page-width">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#ff1b2d] block mb-2">
            Cerita & Artikel Terbaru
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase font-koulen tracking-wide">
            Shill Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogStoriesData.map((story) => (
            <div
              key={story.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 flex flex-col sm:flex-row group"
            >
              {/* Image */}
              <div className="relative w-full sm:w-1/2 aspect-4/3 sm:aspect-auto min-h-[240px] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mb-2">
                    {story.tag}
                  </span>
                  <Link href={story.link}>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 mb-3">
                      {story.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
                    {story.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <a
                    href="https://instagram.com/shillstore"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>{story.instagramHandle}</span>
                  </a>
                  <Link
                    href={story.link}
                    className="text-xs font-semibold text-white hover:text-red-400 transition-colors"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
