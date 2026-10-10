import React from 'react';
import { Header } from '@/components/sites/shillstore/root/Header';
import { EditorialHero } from '@/components/sites/shillstore/root/EditorialHero';
import { ShopByCategory } from '@/components/sites/shillstore/root/ShopByCategory';
import { BestSellersSection } from '@/components/sites/shillstore/root/BestSellersSection';
import { EditorialCampaign } from '@/components/sites/shillstore/root/EditorialCampaign';
import { NewArrivalsSection } from '@/components/sites/shillstore/root/NewArrivalsSection';
import { StoreBenefits } from '@/components/sites/shillstore/root/StoreBenefits';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 overflow-x-hidden font-sans selection:bg-black selection:text-white">
      {/* 1. Header */}
      <Header />

      {/* Main Editorial Flow */}
      <main className="flex-1">
        {/* 2. Hero Banner */}
        <EditorialHero />

        {/* 3. Categories (Clothing / Accessories / Fragrance) */}
        <ShopByCategory />

        {/* 4. Best Sellers (4 Signature Products + View All CTA) */}
        <BestSellersSection />

        {/* 5. Campaign Banner (Single Focused Seasonal Editorial) */}
        <EditorialCampaign />

        {/* 6. New Arrivals (4 Curated Products + View All CTA) */}
        <NewArrivalsSection />

        {/* 7. Store Benefits (Shipping, Exchanges, Authenticity, Payments) */}
        <StoreBenefits />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
