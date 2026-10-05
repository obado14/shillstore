import React from 'react';
import { Header } from '@/components/sites/shillstore/root/Header';
import { EditorialHero } from '@/components/sites/shillstore/root/EditorialHero';
import { ShopByCategory } from '@/components/sites/shillstore/root/ShopByCategory';
import { NewArrivalsSection } from '@/components/sites/shillstore/root/NewArrivalsSection';
import { EditorialCampaign } from '@/components/sites/shillstore/root/EditorialCampaign';
import { BestSellersSection } from '@/components/sites/shillstore/root/BestSellersSection';
import { EditorialStories } from '@/components/sites/shillstore/root/EditorialStories';
import { EditorialNewsletter } from '@/components/sites/shillstore/root/EditorialNewsletter';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 overflow-x-hidden font-sans selection:bg-black selection:text-white">
      {/* 1. Minimal Clean Navbar */}
      <Header />

      {/* Main Editorial Flow */}
      <main className="flex-1">
        {/* 2. Campaign Editorial Hero */}
        <EditorialHero />

        {/* 3. Shop by Category (Clothing / Accessories / Fragrance) */}
        <ShopByCategory />

        {/* 4. New Arrivals (8 Curated Products) */}
        <NewArrivalsSection />

        {/* 5. Editorial Magazine Campaign (The Shill Edit) */}
        <EditorialCampaign />

        {/* 6. Best Sellers (4 Iconic Products) */}
        <BestSellersSection />

        {/* 7. Shill Stories (3 Cultural & Design Dispatches) */}
        <EditorialStories />

        {/* 8. Minimalist Newsletter */}
        <EditorialNewsletter />
      </main>

      {/* 9. Minimal Consistent Footer */}
      <Footer />

      {/* Global Interactive Modals (Cart Drawer & Search Modal) */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
