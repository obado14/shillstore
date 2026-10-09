'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import { getOrderById, getLatestOrderId } from '@/lib/orderStorage';
import { ShillOrder } from '@/types/order';
import { Check, Truck, ArrowRight, Home, Copy, CheckCheck } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-xs tracking-widest uppercase text-neutral-400">
          Memuat Konfirmasi Pesanan...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<ShillOrder | null>(null);
  const [copiedResi, setCopiedResi] = useState(false);
  const [copiedOrderNo, setCopiedOrderNo] = useState(false);

  const orderIdParam = searchParams.get('orderId');

  useEffect(() => {
    let targetId = orderIdParam;
    if (!targetId) {
      targetId = getLatestOrderId();
    }
    if (targetId) {
      const found = getOrderById(targetId);
      setOrder(found);
    }
  }, [orderIdParam]);

  const copyResi = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.trackingNumber);
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  const copyOrderNo = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.orderNumber);
    setCopiedOrderNo(true);
    setTimeout(() => setCopiedOrderNo(false), 2000);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-8 py-20 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-6">
            <Truck className="w-8 h-8 stroke-[1.5]" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-2">
            SHILLSTORE ORDERS
          </span>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#111111] mb-3">
            Pesanan Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mb-8 leading-relaxed">
            Data pesanan belum tersedia atau nomor pesanan yang Anda tuju tidak valid. Silakan kembali ke beranda atau periksa riwayat akun Anda.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors rounded-[2px]"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/account"
              className="px-6 py-3 border border-neutral-300 hover:border-black text-[#111111] text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors rounded-[2px]"
            >
              Buka Halaman Akun
            </Link>
          </div>
        </main>
        <Footer />
        <CartDrawer />
        <SearchModal />
      </div>
    );
  }

  const waText = encodeURIComponent(
    `Halo Admin SHILLSTORE, saya ingin konfirmasi pesanan saya:\n\n` +
    `*No. Pesanan:* #${order.orderNumber}\n` +
    `*Nama:* ${order.customer.fullName}\n` +
    `*Kurir:* ${order.courierName}\n` +
    `*No. Resi:* ${order.trackingNumber}\n` +
    `*Total:* Rp ${order.total.toLocaleString('id-ID')}\n\n` +
    `Terima kasih!`
  );

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-neutral-100 bg-[#FAFAF9]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
          <Link href="/" className="hover:text-black transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/checkout" className="hover:text-black transition-colors">
            CHECKOUT
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-semibold">ORDER CONFIRMATION</span>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-10 sm:py-14">
        {/* TOP STATUS HERO SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Circular Success Checkmark Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
            <Check className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
          </div>

          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-emerald-700 font-semibold block mb-2">
            PEMBAYARAN TERVERIFIKASI
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#111111] mb-3">
            Pesanan Berhasil Dibuat
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl mx-auto mb-5">
            Terima kasih telah berbelanja di SHILLSTORE. Pembayaran Anda telah kami terima dan pesanan Anda sedang disiapkan dengan teliti oleh tim logistik kami.
          </p>

          {/* Order ID Pill */}
          <div className="inline-flex items-center gap-2 border border-neutral-200 bg-neutral-50 px-4 py-2 rounded-[2px] text-xs">
            <span className="text-neutral-400 font-mono tracking-wider">ORDER ID:</span>
            <span className="font-mono font-bold tracking-widest text-[#111111]">
              #{order.orderNumber}
            </span>
            <button
              type="button"
              onClick={copyOrderNo}
              className="text-neutral-400 hover:text-black transition-colors cursor-pointer ml-1"
              title="Salin Nomor Pesanan"
            >
              {copiedOrderNo ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* STATUS BAR SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-5 bg-[#FAFAF9] border border-neutral-200 mb-8 rounded-[2px] text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
              Tanggal Pesanan
            </span>
            <span className="font-medium text-neutral-800 block">{order.date}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
              Status Pembayaran
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Lunas / Berhasil
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
              Status Pesanan
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-900 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
              {order.currentStep === 'created'
                ? 'Pesanan Dibuat'
                : order.currentStep === 'paid'
                ? 'Pembayaran Berhasil'
                : order.currentStep === 'processing'
                ? 'Pesanan Diproses'
                : order.currentStep === 'handed_over'
                ? 'Diserahkan ke Kurir'
                : order.currentStep === 'in_transit'
                ? 'Dalam Pengiriman'
                : 'Pesanan Sampai'}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
              Estimasi Tiba
            </span>
            <span className="font-medium text-neutral-800 block">{order.estimatedArrival}</span>
          </div>
        </div>

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Items and Delivery Address (~60%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Item Details Card */}
            <div className="border border-neutral-200 p-5 sm:p-6 bg-white rounded-[2px]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-150">
                <h2 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
                  Rincian Produk ({order.items.reduce((acc, it) => acc + it.quantity, 0)} Item)
                </h2>
                <span className="text-[11px] font-mono text-neutral-400">SHILLSTORE</span>
              </div>

              <div className="divide-y divide-neutral-100">
                {order.items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      {/* Product Image 1:1 Aspect Ratio with contain */}
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 bg-[#FAFAF9] border border-neutral-200 rounded-[2px] shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-medium text-[#111111] line-clamp-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                          {item.size && <span>Ukuran: {item.size}</span>}
                          {item.size && <span>•</span>}
                          <span>Jumlah: {item.quantity}</span>
                        </div>
                        <span className="text-[11px] text-neutral-400 block mt-0.5">
                          @ Rp {item.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-semibold text-[#111111]">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Delivery Address Card */}
            <div className="border border-neutral-200 p-5 sm:p-6 bg-white rounded-[2px]">
              <div className="pb-4 mb-4 border-b border-neutral-150">
                <h2 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
                  Alamat Pengiriman
                </h2>
              </div>

              <div className="space-y-2 text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
                <p className="font-semibold text-neutral-900 text-sm">
                  {order.customer.fullName}
                </p>
                <p className="text-neutral-500 font-mono text-xs">
                  {order.customer.phone} {order.customer.email ? `• ${order.customer.email}` : ''}
                </p>
                <p className="pt-1">
                  {order.customer.address}
                </p>
                <p className="text-neutral-500 text-xs">
                  {order.customer.city}, {order.customer.province} {order.customer.postalCode ? `(${order.customer.postalCode})` : ''}
                </p>
                {order.customer.notes && (
                  <p className="text-[11px] text-neutral-500 italic pt-1 border-t border-neutral-100 mt-2">
                    Catatan: &ldquo;{order.customer.notes}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Payment Breakdown & Couriers (~40%) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Payment Summary */}
            <div className="border border-neutral-200 p-5 sm:p-6 bg-[#FAFAF9] rounded-[2px]">
              <div className="pb-4 mb-4 border-b border-neutral-200">
                <h2 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
                  Ringkasan Pembayaran
                </h2>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal Produk</span>
                  <span className="font-medium text-neutral-900">
                    Rp {order.subtotal.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-600">
                  <span>Ongkos Kirim ({order.courierName})</span>
                  <span className={order.shippingCost === 0 ? 'font-semibold text-emerald-700' : 'font-medium text-neutral-900'}>
                    {order.shippingCost === 0 ? 'GRATIS' : `Rp ${order.shippingCost.toLocaleString('id-ID')}`}
                  </span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Potongan Diskon {order.voucherCode ? `(${order.voucherCode})` : ''}</span>
                    <span className="font-semibold">-Rp {order.discount.toLocaleString('id-ID')}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-[0.15em] font-bold text-[#111111]">
                    Total Pembayaran
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#111111]">
                    Rp {order.total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Payment & Courier Meta */}
              <div className="mt-5 pt-4 border-t border-neutral-200/80 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                    Metode Pembayaran
                  </span>
                  <span className="font-medium text-neutral-900">
                    {order.paymentMethodName}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                    Ekspedisi Kurir
                  </span>
                  <span className="font-medium text-neutral-900">
                    {order.courierName}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                    Nomor Resi (Simulasi)
                  </span>
                  <div className="flex items-center gap-1.5 font-mono font-semibold text-neutral-900">
                    <span>{order.trackingNumber}</span>
                    <button
                      type="button"
                      onClick={copyResi}
                      className="text-neutral-400 hover:text-black cursor-pointer"
                      title="Salin Resi"
                    >
                      {copiedResi ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-6 pt-5 border-t border-neutral-200 space-y-2.5">
                {/* 1. Lacak Pesanan CTA */}
                <Link
                  href={`/tracking?orderId=${order.orderNumber}`}
                  className="w-full h-12 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors rounded-[2px] flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>Lacak Pesanan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* 2. Kembali ke Beranda CTA */}
                <Link
                  href="/"
                  className="w-full h-12 border border-neutral-300 hover:border-black text-[#111111] text-xs font-semibold uppercase tracking-[0.2em] transition-colors rounded-[2px] flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Kembali ke Beranda</span>
                </Link>

                {/* Optional WhatsApp Confirmation */}
                <a
                  href={`https://wa.me/628119757222?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-center text-[11px] text-neutral-500 hover:text-black uppercase tracking-wider block transition-colors"
                >
                  Konfirmasi Otomatis via WhatsApp ↗
                </a>
              </div>
            </div>

            {/* SHILL Reassurance Box */}
            <div className="border border-neutral-200 p-4 bg-white rounded-[2px] text-[11px] text-neutral-500 leading-relaxed space-y-1.5">
              <p className="font-medium text-neutral-800 uppercase tracking-wider text-[10px]">
                Keamanan &amp; Jaminan SHILLSTORE
              </p>
              <p>
                Pesanan Anda dilindungi garansi pengiriman aman dan garansi retur/tukar ukuran hingga 7 hari kalender setelah paket diterima.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
