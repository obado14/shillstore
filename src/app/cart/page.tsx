'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';

export default function CartPage() {
  return <CartPageContent />;
}

function CartPageContent() {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  const applyVoucher = () => {
    if (voucherCode.toUpperCase() === 'SHILL30' || voucherCode.toUpperCase() === 'DISC30K') {
      setDiscount(30000);
      setAppliedVoucher('SHILL30 (-Rp 30.000)');
    } else if (voucherCode.trim()) {
      setDiscount(15000);
      setAppliedVoucher(`${voucherCode.toUpperCase()} (-Rp 15.000)`);
    }
  };

  const finalTotal = Math.max(0, totalPrice - discount);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#121212]">
      <Header />

      <main className="flex-1 py-12 page-width">
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase font-koulen tracking-wide mb-8 text-center md:text-left">
          Keranjang Belanja ({totalItems})
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100 p-8 max-w-xl mx-auto">
            <p className="text-lg font-bold text-gray-800 mb-2">Keranjang Belanja Anda Kosong</p>
            <p className="text-sm text-gray-500 mb-6">
              Yuk jelajahi koleksi terbaru Shill dan temukan outfit favoritmu sekarang.
            </p>
            <Link
              href="/collections"
              className="px-8 py-3.5 bg-black hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md inline-block"
            >
              Belanja Sekarang
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-5 p-4 bg-gray-50 rounded-2xl border border-gray-100 items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                        {item.product.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.product.category}</p>
                      <p className="text-sm font-extrabold text-red-600 mt-1">
                        Rp {item.product.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-xs font-semibold text-gray-400 hover:text-red-600 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8 h-fit space-y-6">
              <h2 className="text-xl font-bold uppercase font-koulen tracking-wider text-black">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-3 text-sm border-b border-gray-200 pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal Produk</span>
                  <span className="font-bold text-black">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span className="font-bold text-green-600">GRATIS</span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between text-green-600 font-semibold text-xs">
                    <span>Voucher ({appliedVoucher})</span>
                    <span>-Rp {discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>

              {/* Voucher Code Box */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Punya Kode Voucher Diskon?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Contoh: SHILL30"
                    className="flex-1 px-3 py-2 text-xs border rounded-lg bg-white uppercase font-bold focus:outline-none focus:border-black"
                  />
                  <button
                    onClick={applyVoucher}
                    className="px-4 py-2 bg-black hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Gunakan
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 text-base font-extrabold text-black">
                <span>Total Tagihan</span>
                <span className="text-xl text-red-600">Rp {finalTotal.toLocaleString('id-ID')}</span>
              </div>

              <button className="w-full py-4 bg-black hover:bg-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer">
                Lanjut ke Pembayaran (Checkout)
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <SearchModal />
    </div>
  );
}
