'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { announcements, navCategories } from '@/data/shill-data';
import {
  SearchIcon,
  CartIcon,
  UserIcon,
  IndonesiaFlag,
  ChevronDownIcon,
  CloseIcon
} from '@/components/sites/shillstore/shared/icons';

export function Header() {
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();
  const [currentAnnouncementIdx, setCurrentAnnouncementIdx] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Auto-cycle announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#121212] text-white py-1.5 sm:py-2 text-center text-[11px] sm:text-[12px] font-medium tracking-wide overflow-hidden relative">
        <div className="page-width flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-gray-400 text-xs">
            <IndonesiaFlag className="w-4 h-3 inline-block rounded-xs" />
            <span>IDR (Rp)</span>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <span className="transition-all duration-500 ease-in-out">
              {announcements[currentAnnouncementIdx]}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-gray-300">
            <Link href="/pages/reward" className="hover:text-white transition-colors">
              Reward
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/pages/authenticate" className="hover:text-white transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="page-width">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Mobile Menu Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 text-gray-900 hover:text-black focus:outline-none"
                aria-label="Buka Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="relative block w-32 sm:w-44 md:w-52 lg:w-60 h-8 sm:h-9 md:h-10 lg:h-12">
                <Image
                  src="/logo.png"
                  alt="Shill Official Store"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-bold tracking-wider uppercase">
              {navCategories.map((item) => (
                <div
                  key={item.title}
                  className="relative group py-6"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-gray-800 hover:text-[#ff1b2d] transition-colors py-2"
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="bg-[#ff1b2d] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1">
                        {item.badge}
                      </span>
                    )}
                    {item.sublinks && (
                      <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Regular Dropdown Menu */}
                  {item.sublinks && activeDropdown === item.title && (
                    <div className="absolute top-full left-0 min-w-[200px] bg-white shadow-lg rounded-lg border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {item.sublinks.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#ff1b2d] transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3 md:gap-5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 sm:p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Cari"
              >
                <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <Link
                href="/pages/authenticate"
                className="hidden sm:block p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Akun"
              >
                <UserIcon className="w-5 h-5 md:w-6 md:h-6" />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 sm:p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Keranjang Belanja"
              >
                <CartIcon className="w-5 h-5 md:w-6 md:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#ff1b2d] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="relative w-48 h-10">
                  <Image
                    src="/logo.png"
                    alt="Shill"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-black rounded-full"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-6 space-y-3">
                {navCategories.map((item) => (
                  <div key={item.title} className="py-2 border-b border-gray-50">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between text-sm font-bold text-gray-900 uppercase tracking-wide hover:text-red-600 transition-colors"
                    >
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="bg-[#ff1b2d] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {item.sublinks && (
                      <div className="mt-2 pl-3 space-y-2 border-l-2 border-gray-100">
                        {item.sublinks.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-xs text-gray-600 hover:text-black"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-6 space-y-3 text-sm font-medium border-t border-gray-100">
                  <Link
                    href="/pages/authenticate"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Masuk ke Akun</span>
                  </Link>
                  <div className="flex items-center gap-2 text-gray-600 text-xs pt-2">
                    <IndonesiaFlag className="w-4 h-3 inline-block" />
                    <span>Indonesia (IDR Rp)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
