'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collageItems } from '@/data/shill-data';

export function CollageBanner() {
  return (
    <section className="py-4">
      <div className="page-width flex flex-col md:flex-row gap-4">
        {/* Card 1: Kenapa harus beli di Website Shill */}
        <div className="relative flex-1 rounded-[12px] overflow-hidden group min-h-[320px] md:min-h-[360px] bg-gray-100">
          <Image
            src={collageItems[0].image}
            alt={collageItems[0].title}
            fill
            className="object-cover object-left group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-black mb-2 leading-tight">
                {collageItems[0].title}
              </h3>
              <div className="space-y-1 text-sm font-medium text-gray-800">
                {collageItems[0].points?.map((pt, i) => (
                  <p key={i}>{pt}</p>
                ))}
              </div>
            </div>
            <Link
              href={collageItems[0].link}
              className="px-6 py-2 rounded-lg bg-black text-white text-xs font-semibold w-fit hover:bg-gray-800 transition-colors shadow-sm"
            >
              {collageItems[0].buttonText}
            </Link>
          </div>
        </div>

        {/* Card 2: New Arrival - Oxford Shirt */}
        <div className="relative flex-1 rounded-[12px] overflow-hidden group min-h-[320px] md:min-h-[360px] bg-black">
          <Image
            src={collageItems[1].image}
            alt={collageItems[1].title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center items-center text-center text-white z-10">
            <span className="text-xs uppercase tracking-widest text-gray-200 mb-1">
              {collageItems[1].subtitle}
            </span>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight font-koulen uppercase">
              {collageItems[1].title}
            </h3>
          </div>
        </div>

        {/* Card 3: PICKUP IN STORE */}
        <div className="relative flex-1 rounded-[12px] overflow-hidden group min-h-[320px] md:min-h-[360px] bg-gray-900">
          <Image
            src={collageItems[2].image}
            alt={collageItems[2].title}
            fill
            className="object-cover object-left group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-center text-center z-10">
            <Link
              href={collageItems[2].link}
              className="px-8 py-2.5 rounded-lg bg-[#ffbb00] hover:bg-[#e5a800] text-[#0b1a32] text-xs font-bold uppercase tracking-wider transition-colors shadow-md hover:scale-105"
            >
              {collageItems[2].buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
