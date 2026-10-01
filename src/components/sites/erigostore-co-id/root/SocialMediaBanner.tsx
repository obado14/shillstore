'use client';

import React from 'react';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from '@/components/sites/erigostore-co-id/shared/icons';

export function SocialMediaBanner() {
  const socials = [
    { name: 'Facebook', href: 'https://www.facebook.com/erigostoreapparel/', icon: FacebookIcon },
    { name: 'Instagram', href: 'https://www.instagram.com/erigostore/', icon: InstagramIcon },
    { name: 'TikTok', href: 'https://www.tiktok.com/@erigo.store', icon: TikTokIcon },
    { name: 'YouTube', href: 'https://www.youtube.com/c/ErigoOfficial', icon: YouTubeIcon },
  ];

  return (
    <section className="py-6 page-width">
      <div className="bg-[#121212] text-white p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <h3 className="text-xl md:text-2xl font-extrabold uppercase font-koulen tracking-wider">
          Visit Our Social
        </h3>

        <div className="flex items-center gap-4">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff1b2d] text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
