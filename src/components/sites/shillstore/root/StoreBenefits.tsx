'use client';

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, CreditCard } from 'lucide-react';

export function StoreBenefits() {
  const benefits = [
    {
      icon: Truck,
      title: 'COMPLIMENTARY SHIPPING',
      desc: 'Gratis ongkir untuk pesanan di atas Rp 250.000 ke seluruh Indonesia.',
    },
    {
      icon: RotateCcw,
      title: '7-DAY EASY EXCHANGES',
      desc: 'Garansi tukar ukuran & retur praktis dalam 7 hari kalender.',
    },
    {
      icon: ShieldCheck,
      title: 'AUTHENTIC & CRAFTED',
      desc: 'Material pilihan dengan standar jahitan presisi bernilai tinggi.',
    },
    {
      icon: CreditCard,
      title: 'SECURE PAYMENTS',
      desc: 'QRIS, Virtual Account, & COD dengan enkripsi transaksi aman.',
    },
  ];

  return (
    <section className="bg-[#FAFAF9] border-y border-neutral-150 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-start sm:items-center text-left sm:text-center"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 mb-3 sm:mb-4 shadow-2xs shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                </div>
                <h3 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-neutral-900 mb-1 sm:mb-1.5">
                  {item.title}
                </h3>
                <p className="text-[11px] text-neutral-500 leading-relaxed max-w-xs font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
