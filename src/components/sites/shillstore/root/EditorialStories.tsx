'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogStoriesData } from '@/data/shill-data';

export function EditorialStories() {
  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 border-t border-neutral-100">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 block mb-2">
            EDITORIAL JOURNAL
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Shill Stories
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 font-normal max-w-xs">
          Cultural dialogues, design narratives, and collaborative capsules.
        </p>
      </div>

      {/* 3 Story Columns with Dominant Photography */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {blogStoriesData.slice(0, 3).map((story) => (
          <Link
            key={story.id}
            href={story.link}
            className="group block relative"
          >
            {/* Dominant Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Editorial Copy */}
            <div className="mt-4 flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-neutral-400 mb-1.5 block">
                {story.tag || 'EDITORIAL'}
              </span>

              <h3 className="text-base sm:text-lg font-medium text-neutral-900 tracking-tight leading-snug group-hover:text-neutral-500 transition-colors line-clamp-2">
                {story.title}
              </h3>

              <p className="text-xs text-neutral-500 mt-2 font-normal line-clamp-2 leading-relaxed">
                {story.excerpt}
              </p>

              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 mt-4 group-hover:underline">
                READ STORY →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
