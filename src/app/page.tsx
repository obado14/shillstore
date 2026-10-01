import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/sites/erigostore-co-id/root/Header';
import { HeroSlideshow } from '@/components/sites/erigostore-co-id/root/HeroSlideshow';
import { CollageBanner } from '@/components/sites/erigostore-co-id/root/CollageBanner';
import { ProductRangePills } from '@/components/sites/erigostore-co-id/root/ProductRangePills';
import { BrandStoryRichText } from '@/components/sites/erigostore-co-id/root/BrandStoryRichText';
import { FeaturedProducts } from '@/components/sites/erigostore-co-id/root/FeaturedProducts';
import { MultiBannerPromo } from '@/components/sites/erigostore-co-id/root/MultiBannerPromo';
import { BlogStories } from '@/components/sites/erigostore-co-id/root/BlogStories';
import { SocialMediaBanner } from '@/components/sites/erigostore-co-id/root/SocialMediaBanner';
import { NewsletterSection } from '@/components/sites/erigostore-co-id/root/NewsletterSection';
import { Footer } from '@/components/sites/erigostore-co-id/root/Footer';
import { CartDrawer } from '@/components/sites/erigostore-co-id/root/CartDrawer';
import { SearchModal } from '@/components/sites/erigostore-co-id/root/SearchModal';

export default function Home() {
  return (
    <CartProvider>
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
    </CartProvider>
  );
}
