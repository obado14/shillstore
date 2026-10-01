'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/sites/erigostore-co-id/root/Header';
import { Footer } from '@/components/sites/erigostore-co-id/root/Footer';
import { CartDrawer } from '@/components/sites/erigostore-co-id/root/CartDrawer';
import { SearchModal } from '@/components/sites/erigostore-co-id/root/SearchModal';
import { storeLocations, faqList } from '@/data/erigo-data';

export default function StaticInfoPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);

  return (
    <CartProvider>
      <StaticInfoContent handle={handle} />
    </CartProvider>
  );
}

function StaticInfoContent({ handle }: { handle: string }) {
  // Render specific content depending on handle
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#121212]">
      <Header />

      <main className="flex-1 py-12">
        <div className="page-width max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-black transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900 capitalize">
              {handle.replace(/-/g, ' ')}
            </span>
          </nav>

          {/* 1. OUR STORE PAGE */}
          {handle === 'our-store' && (
            <div>
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="text-xs uppercase font-bold tracking-widest text-[#ff1b2d] block mb-1">
                  Offline Outlets
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold uppercase font-koulen tracking-wide mb-3">
                  Lokasi Toko Erigo
                </h1>
                <p className="text-sm text-gray-600">
                  Kunjungi toko fisik kami untuk mencoba dan mendapatkan koleksi terbaru Erigo secara langsung.
                </p>
              </div>

              <div className="space-y-6">
                {storeLocations.map((store) => (
                  <div
                    key={store.name}
                    className="p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="max-w-xl space-y-2">
                      <h2 className="text-xl font-bold text-gray-900">{store.name}</h2>
                      <p className="text-xs text-gray-600 leading-relaxed">{store.address}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-2">
                        <span>🕒 {store.hours}</span>
                        <span>📞 {store.phone}</span>
                      </div>
                    </div>

                    <a
                      href={store.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 bg-black hover:bg-[#ff1b2d] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm shrink-0"
                    >
                      Buka Google Maps ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. ABOUT US PAGE */}
          {handle === 'about' && (
            <div className="prose prose-sm md:prose-base max-w-none">
              <h1 className="text-3xl md:text-5xl font-extrabold uppercase font-koulen tracking-wide mb-6">
                Tentang Kami (About Erigo)
              </h1>
              <p className="lead text-base md:text-lg text-gray-700">
                Erigo adalah salah satu brand fashion lokal asal Indonesia yang berfokus pada penyediaan pakaian kasual sehari-hari berkualitas premium untuk pria dan wanita yang aktif dan dinamis.
              </p>
              <h2 className="text-xl font-bold mt-6 mb-3">Filosofi & Identitas</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mengusung semangat &quot;Everywhere You Go&quot;, kami berkomitmen untuk menciptakan produk yang tidak hanya trendi dan nyaman, namun juga dapat menemani setiap momen hidup generasi muda. Mulai dari panggung New York Fashion Week hingga keseharian anak muda urban Indonesia, Erigo membuktikan kebanggaan karya anak bangsa di kancah global.
              </p>
            </div>
          )}

          {/* 3. FAQ PAGE */}
          {handle === 'faq' && (
            <div>
              <div className="text-center max-w-xl mx-auto mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold uppercase font-koulen tracking-wide mb-2">
                  Pertanyaan Sering Diajukan (FAQ)
                </h1>
                <p className="text-xs text-gray-600">
                  Temukan jawaban cepat atas pertanyaan seputar pembelian, pengiriman, dan layanan kami.
                </p>
              </div>

              <div className="space-y-4">
                {faqList.map((item, idx) => (
                  <details
                    key={idx}
                    className="group bg-gray-50 rounded-xl p-5 border border-gray-200 open:border-black transition-colors"
                  >
                    <summary className="font-bold text-sm text-gray-900 cursor-pointer list-none flex justify-between items-center select-none">
                      <span>{item.q}</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-4 text-xs text-gray-600 leading-relaxed border-t border-gray-200/60 pt-3">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* 4. CONTACT US PAGE */}
          {handle === 'contact-us' && (
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold uppercase font-koulen tracking-wide mb-6">
                Hubungi Kami (Contact Us)
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    Ada pertanyaan tentang pesanan, kerja sama, atau bantuan lainnya? Tim Customer Care Erigo siap membantumu.
                  </p>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                    <p className="font-bold">Customer Service WhatsApp:</p>
                    <p className="text-red-600 font-semibold">0811-9757-222</p>
                    <p className="font-bold pt-2">Email Partnership & Pertanyaan Umum:</p>
                    <p className="text-red-600 font-semibold">partnership@erigostore.co.id</p>
                    <p className="text-xs text-gray-500 pt-2">Jam Operasional: Senin - Minggu (09.00 - 21.00 WIB)</p>
                  </div>
                </div>

                <form className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                    <input type="text" required className="w-full px-3 py-2 text-xs border rounded-lg bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                    <input type="email" required className="w-full px-3 py-2 text-xs border rounded-lg bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Pesan</label>
                    <textarea rows={4} required className="w-full px-3 py-2 text-xs border rounded-lg bg-white" />
                  </div>
                  <button type="button" className="w-full py-3 bg-black hover:bg-red-600 text-white font-bold text-xs uppercase rounded-lg transition-colors">
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* 5. PAYMENT & POLICIES & OTHER PAGES */}
          {['payment-information', 'exchanges-returns', 'privacy-policy', 'how-to-use-discount-code', 'track-order', 'corporate-order-by-erigo', 'authenticate', 'bergerakbebas-movease-by-erigo'].includes(handle) && (
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-extrabold uppercase font-koulen tracking-wide mb-6">
                {handle.replace(/-/g, ' ')}
              </h1>
              <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200 text-sm text-gray-700 leading-relaxed space-y-4">
                <p>
                  Halaman resmi untuk layanan <strong>{handle.replace(/-/g, ' ')}</strong> Erigo Store Indonesia.
                </p>
                <p>
                  Semua transaksi, proses penukaran barang, dan perlindungan privasi data pelanggan dijamin keamanannya sesuai standar operasional PT Erigo Apparel Indonesia dan regulasi Kementerian Perdagangan RI.
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Untuk bantuan lebih lanjut, silakan hubungi Customer Service kami di WhatsApp: <strong>0811-9757-222</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
