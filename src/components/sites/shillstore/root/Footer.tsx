'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  const footerColumns = [
    {
      title: 'SHOP',
      links: [
        { label: 'New Arrivals', href: '/collections' },
        { label: 'Men', href: '/collections/all-t-shirt' },
        { label: 'Women', href: '/collections/all-shirt' },
        { label: 'Outerwear', href: '/collections/flight-jacket' },
        { label: 'Trousers & Chinos', href: '/collections/category-pants-chino-pants' },
        { label: 'Accessories', href: '/collections/accessories' },
        { label: 'Fragrance', href: '/collections/perfume' },
      ],
    },
    {
      title: 'HELP',
      links: [
        { label: 'Customer Care', href: '/pages/contact-us' },
        { label: 'Shipping & Delivery', href: '/pages/payment-information' },
        { label: 'Exchanges & Returns', href: '/pages/exchanges-returns' },
        { label: 'Track Your Order', href: '/tracking' },
        { label: 'Frequently Asked Questions', href: '/pages/faq' },
      ],
    },
    {
      title: 'ABOUT',
      links: [
        { label: 'Brand Narrative', href: '/pages/about' },
        { label: 'Store Locations', href: '/pages/our-store' },
        { label: 'Corporate Orders', href: '/pages/corporate-order-by-shill' },
        { label: 'Careers', href: '/pages/about' },
      ],
    },
    {
      title: 'FOLLOW',
      links: [
        { label: 'Instagram', href: 'https://instagram.com/shillstore' },
        { label: 'TikTok', href: 'https://tiktok.com/@shill.store' },
        { label: 'YouTube', href: 'https://youtube.com/c/ShillOfficial' },
        { label: 'Facebook', href: 'https://facebook.com/shillstoreapparel' },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-neutral-100 text-neutral-800 pt-10 sm:pt-20 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* 4 Distinct Columns: SHOP / HELP / ABOUT / FOLLOW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-8 lg:gap-12 pb-10 sm:pb-16 border-b border-neutral-100">
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h3 className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] font-semibold text-neutral-900 mb-3.5 sm:mb-5">
                {col.title}
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] sm:text-xs text-neutral-500 hover:text-black transition-colors font-normal"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[11px] sm:text-xs text-neutral-500 hover:text-black transition-colors font-normal"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-neutral-400 font-normal text-center sm:text-left">
          <div>
            <span>INDONESIA (IDR Rp)</span>
          </div>

          <div>
            <span>© 2026 SHILLSTORE. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6">
            <Link href="/pages/privacy-policy" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link href="/pages/faq" className="hover:text-black transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
