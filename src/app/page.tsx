import React from 'react';
import { Header } from '@/components/sites/shillstore/root/Header';
import { HeroSlideshow } from '@/components/sites/shillstore/root/HeroSlideshow';
import { CollageBanner } from '@/components/sites/shillstore/root/CollageBanner';
import { ProductRangePills } from '@/components/sites/shillstore/root/ProductRangePills';
import { BrandStoryRichText } from '@/components/sites/shillstore/root/BrandStoryRichText';
import { FeaturedProducts } from '@/components/sites/shillstore/root/FeaturedProducts';
import { MultiBannerPromo } from '@/components/sites/shillstore/root/MultiBannerPromo';
import { BlogStories } from '@/components/sites/shillstore/root/BlogStories';
import { SocialMediaBanner } from '@/components/sites/shillstore/root/SocialMediaBanner';
import { NewsletterSection } from '@/components/sites/shillstore/root/NewsletterSection';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#121212] overflow-x-hidden">
      {/* Header & Sticky Nav */}
      <Header />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* Hero Slideshow Banner */}
        <HeroSlideshow />

        {/* Feature Collage Banners */}
        <CollageBanner />

        {/* Product Range / Category Filter Pills */}
        <ProductRangePills />

        {/* Brand Narrative Rich Text */}
        <BrandStoryRichText />

        {/* Featured Collections & Best Sellers */}
        <FeaturedProducts />

        {/* Multi Banner Split (Perfume & Accessories) */}
        <MultiBannerPromo />

        {/* Blog Stories (MPL & EVOS Collaborations) */}
        <BlogStories />

        {/* Social Media Links Bar */}
        <SocialMediaBanner />

        {/* Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
