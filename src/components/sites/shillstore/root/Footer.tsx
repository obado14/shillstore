'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from '@/components/sites/shillstore/shared/icons';

export function Footer() {
  const footerSections = [
    {
      title: 'SHILL',
      links: [
        { label: 'Lokasi Toko', href: '/pages/our-store' },
        { label: 'Tentang Kami', href: '/pages/about' },
        { label: 'Hubungi Kami', href: '/pages/contact-us' },
        { label: 'Corporate Order by Shill', href: '/pages/corporate-order-by-shill' },
      ],
    },
    {
      title: 'BANTUAN',
      links: [
        { label: 'FAQ', href: '/pages/faq' },
        { label: 'Pembayaran', href: '/pages/payment-information' },
        { label: 'Penukaran & Pengembalian', href: '/pages/exchanges-returns' },
        { label: 'Kebijakan Privasi', href: '/pages/privacy-policy' },
      ],
    },
    {
      title: 'CUSTOMER',
      links: [
        { label: 'Voucher', href: '/pages/how-to-use-discount-code' },
        { label: 'Lacak Pesanan', href: '/pages/track-order' },
      ],
    },
    {
      title: 'PRODUK',
      links: [
        { label: 'Sale', href: '/collections/all-t-shirt' },
        { label: 'Koleksi Baru', href: '/collections' },
        { label: 'Kaos', href: '/collections/all-t-shirt' },
        { label: 'Kemeja', href: '/collections/all-shirt' },
        { label: 'Celana', href: '/collections/category-pants-chino-pants' },
        { label: 'Aksesoris', href: '/collections/accessories' },
      ],
    },
  ];

  return (
    <footer className="bg-[#121212] text-gray-400 text-xs border-t border-white/10 pt-10 sm:pt-16 pb-8 sm:pb-12">
      <div className="page-width">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 pb-8 sm:pb-12 border-b border-white/10">
          {/* Menu Columns */}
          {footerSections.map((sec) => (
            <div key={sec.title} className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                {sec.title}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Brand Info & Stores */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4 sm:gap-5">
            <div className="relative w-36 sm:w-44 md:w-56 h-8 sm:h-9 md:h-11">
              <Image
                src="/logo-white.png"
                alt="Shill"
                fill
                className="object-contain object-left"
              />
            </div>

            <div className="space-y-1">
              <span className="text-white font-semibold block mb-1">Follow kami</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com/shillstoreapparel"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/shillstore"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/c/ShillOfficial"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com/@shill.store"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-1 text-gray-400">
              <span className="text-white font-semibold block">Hubungi kami</span>
              <p>
                <a href="https://wa.me/+628119757222" className="hover:text-white">
                  0811-9757-222
                </a>
              </p>
              <p>
                <a href="mailto:partnership@shillstore.co.id" className="hover:text-white">
                  partnership@shillstore.co.id
                </a>
              </p>
            </div>

            <div className="space-y-1 text-[11px] leading-relaxed pt-2">
              <span className="text-white font-semibold block">Toko offline kami</span>
              <p>
                <strong>Shill Store Bekasi:</strong> Grand Galaxy City RGB No.96, Bekasi
              </p>
              <p>
                <strong>Shill Store Pamulang:</strong> Pamulang Permai Blok SH21, Tangerang Selatan
              </p>
              <p>
                <strong>Shill Store Banjarbaru:</strong> Jl. A. Yani Km 35, Kalimantan Selatan
              </p>
            </div>
          </div>
        </div>

        {/* Consumer Protection Notice */}
        <div className="py-6 border-b border-white/10 text-[11px] text-gray-500 leading-relaxed">
          <p className="font-semibold text-gray-400 mb-1">
            Layanan Pengaduan Konsumen:
          </p>
          <p>
            Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga, Kementerian Perdagangan Republik Indonesia, WhatsApp: 0853-1111-1010
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>Hak Cipta © SHILL Semua hak dilindungi undang-undang.</p>
          <p>SHILL © 2026</p>
        </div>
      </div>
    </footer>
  );
}
