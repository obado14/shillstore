'use client';

import React from 'react';

export function BrandStoryRichText() {
  return (
    <section className="my-6">
      <div
        className="w-full py-12 md:py-16 bg-repeat-x bg-center"
        style={{
          backgroundImage: 'url(/sites/erigostore-co-id/root/images/brand-pattern.png)',
        }}
      >
        <div className="page-width">
          <div className="max-w-3xl mx-auto text-center bg-white/95 backdrop-blur-xs p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#121212] mb-4 tracking-tight">
              Hai, kami <span className="font-koulen text-red-600 tracking-wider">ERIGO</span>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              ERIGO adalah brand fashion Indonesia yang menyediakan pakaian kasual berkualitas tinggi dan trendy dengan style fashion yang modern. Fokus pada anak muda dengan gaya hidup urban, ERIGO selalu mengikuti tren terkini dan berkomitmen memberdayakan industri fashion lokal serta menciptakan produk yang mendunia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
