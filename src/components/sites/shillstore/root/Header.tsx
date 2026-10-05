'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'NEW IN', href: '/collections' },
    { label: 'MEN', href: '/collections/men' },
    { label: 'WOMEN', href: '/collections/all-shirt' },
    { label: 'ACCESSORIES', href: '/collections/accessories' },
    { label: 'SALE', href: '/collections/flight-jacket' },
  ];

  return (
    <>
      {/* Editorial Announcement Bar */}
      <div className="bg-neutral-900 text-neutral-300 py-2 text-center text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-medium">
        <span>Complimentary Domestic Shipping on Orders Over Rp 250.000</span>
      </div>

      {/* Main Clean Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-neutral-150 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
            : 'bg-white border-b border-neutral-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Trigger & Left Side on Mobile */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-neutral-900 hover:text-black focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              </button>
            </div>

            {/* Left: Brand Logo SHILLSTORE */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-lg sm:text-xl md:text-2xl font-black tracking-[0.22em] uppercase text-black hover:opacity-80 transition-opacity select-none font-sans"
              >
                SHILLSTORE
              </Link>
            </div>

            {/* Center: Desktop Minimal Menu */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[11px] tracking-[0.2em] font-medium uppercase text-neutral-700">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-2 hover:text-black transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right: Clean Minimal Actions SEARCH / ACCOUNT / BAG */}
            <div className="flex items-center gap-4 sm:gap-6 md:gap-7 text-[11px] tracking-[0.2em] font-medium uppercase text-neutral-800">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-black transition-colors py-2 cursor-pointer flex items-center gap-1.5"
                aria-label="Search Catalog"
              >
                <span className="hidden sm:inline">SEARCH</span>
                <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>

              <Link
                href="/pages/authenticate"
                className="hidden sm:inline-block hover:text-black transition-colors py-2"
              >
                ACCOUNT
              </Link>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="hover:text-black transition-colors py-2 cursor-pointer flex items-center gap-1"
                aria-label="View Shopping Bag"
              >
                <span>BAG</span>
                <span className="text-neutral-500 font-normal">
                  ({totalItems})
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Editorial Minimalist) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-sm bg-white shadow-xl flex flex-col justify-between p-6 sm:p-8">
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                  <span className="text-base font-black tracking-[0.2em] uppercase text-black">
                    SHILLSTORE
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-neutral-500 hover:text-black"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Primary Nav Links */}
                <div className="py-8 flex flex-col gap-6">
                  {navLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-medium uppercase tracking-[0.2em] text-neutral-900 hover:text-neutral-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Drawer Footer Links */}
              <div className="pt-6 border-t border-neutral-100 flex flex-col gap-4 text-xs uppercase tracking-[0.18em] text-neutral-600">
                <Link
                  href="/pages/authenticate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-black"
                >
                  Account
                </Link>
                <Link
                  href="/pages/our-store"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-black"
                >
                  Our Stores
                </Link>
                <div className="pt-2 text-[11px] text-neutral-400 normal-case tracking-normal">
                  Indonesia (IDR Rp)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
