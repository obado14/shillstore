'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { bannerSlides } from '@/data/shill-data';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/sites/shillstore/shared/icons';

export function HeroSlideshow() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % bannerSlides.length);
  }, []);

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full overflow-hidden bg-black select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out w-full"
        style={{ transform: `translateX(-${currentIdx * 100}%)` }}
      >
        {bannerSlides.map((slide, idx) => (
          <div key={slide.id} className="w-full shrink-0 relative">
            <Link href={slide.link} className="block relative w-full aspect-16/9 md:aspect-21/9 lg:aspect-3/1">
              {/* Desktop banner */}
              <div className="hidden md:block absolute inset-0">
                <Image
                  src={slide.desktopImage}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center"
                />
              </div>

              {/* Mobile banner */}
              <div className="block md:hidden absolute inset-0">
                <Image
                  src={slide.mobileImage}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Prev / Next Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/70 hover:bg-white text-black shadow-md flex items-center justify-center transition-all z-10 hover:scale-105"
        aria-label="Slide Sebelumnya"
      >
        <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/70 hover:bg-white text-black shadow-md flex items-center justify-center transition-all z-10 hover:scale-105"
        aria-label="Slide Berikutnya"
      >
        <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {bannerSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIdx(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIdx === index
                ? 'w-7 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ke slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
