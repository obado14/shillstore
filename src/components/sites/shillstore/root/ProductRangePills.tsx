'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categoryPills } from '@/data/shill-data';

export function ProductRangePills() {
  return (
    <section className="py-4 sm:py-6 w-full">
      <div className="page-width">
        <div className="grid grid-cols-3 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4">
          {categoryPills.map((pill) => (
            <Link
              key={pill.id}
              href={pill.link}
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 h-16 sm:h-14 px-2 sm:px-6 py-2 border border-slate-200 hover:border-red-600 rounded-xl transition-colors bg-white shadow-2xs group text-center"
            >
              <div className="relative w-6 h-6 sm:w-8 sm:h-8 shrink-0 object-contain">
                <Image
                  src={pill.icon}
                  alt={pill.title}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="font-semibold text-[11px] sm:text-sm text-gray-800 group-hover:text-red-600 transition-colors truncate max-w-full">
                {pill.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
