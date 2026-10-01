'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categoryPills } from '@/data/erigo-data';

export function ProductRangePills() {
  return (
    <section className="py-6 w-full">
      <div className="page-width">
        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
          {categoryPills.map((pill) => (
            <Link
              key={pill.id}
              href={pill.link}
              className="flex items-center justify-center gap-4 h-14 px-6 border border-slate-200 hover:border-red-600 rounded-lg transition-colors bg-white shadow-2xs group"
            >
              <div className="relative w-8 h-8 object-contain">
                <Image
                  src={pill.icon}
                  alt={pill.title}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="font-semibold text-sm text-gray-800 group-hover:text-red-600 transition-colors">
                {pill.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
