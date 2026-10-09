'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import {
  getOrderById,
  getOrders,
  getLatestOrderId,
  advanceOrderStep,
  updateOrderStep,
  resetOrderStep,
} from '@/lib/orderStorage';
import {
  ShillOrder,
  TrackingStepStatus,
  TRACKING_STEPS_ORDER,
} from '@/types/order';
import {
  Check,
  Truck,
  Package,
  CreditCard,
  MapPin,
  Clock,
  Copy,
  CheckCheck,
  Search,
  ArrowRight,
  RotateCcw,
  FastForward,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function DeliveryTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-xs tracking-widest uppercase text-neutral-400">
          Memuat Pelacakan Pengiriman...
        </div>
      }
    >
      <DeliveryTrackingContent />
    </Suspense>
  );
}

function DeliveryTrackingContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<ShillOrder | null>(null);
  const [allOrders, setAllOrders] = useState<ShillOrder[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedResi, setCopiedResi] = useState(false);
  const [copiedOrderNo, setCopiedOrderNo] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const orderIdParam = searchParams.get('orderId');

  const loadData = () => {
    const ordersList = getOrders();
    setAllOrders(ordersList);

    let targetId = orderIdParam;
    if (!targetId) {
      targetId = getLatestOrderId();
    }
    if (targetId) {
      const found = getOrderById(targetId);
      setOrder(found);
    }
  };

  useEffect(() => {
    loadData();

    const handleStorageUpdate = () => {
      loadData();
    };

    window.addEventListener('shill-orders-updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('shill-orders-updated', handleStorageUpdate);
    };
  }, [orderIdParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setHasSearched(true);
    const found = getOrderById(searchInput.trim());
    setOrder(found);
  };

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

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleAdvanceStep = () => {
    if (!order) return;
    const updated = advanceOrderStep(order.orderNumber);
    if (updated) {
      setOrder(updated);
      const stepName =
        TRACKING_STEPS_ORDER.find((s) => s.key === updated.currentStep)?.title || updated.currentStep;
      showNotice(`Status berhasil diperbarui ke: ${stepName}`);
    }
  };

  const handleSetSpecificStep = (stepKey: TrackingStepStatus) => {
    if (!order) return;
    const updated = updateOrderStep(order.orderNumber, stepKey);
    if (updated) {
      setOrder(updated);
      const stepName =
        TRACKING_STEPS_ORDER.find((s) => s.key === stepKey)?.title || stepKey;
      showNotice(`Status dialihkan ke: ${stepName}`);
    }
  };

  const handleResetSimulation = () => {
    if (!order) return;
    const updated = resetOrderStep(order.orderNumber);
    if (updated) {
      setOrder(updated);
      showNotice('Status simulasi di-reset ke: Pesanan Diproses');
    }
  };

  const currentStepIndex = order
    ? TRACKING_STEPS_ORDER.findIndex((s) => s.key === order.currentStep)
    : -1;

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-neutral-100 bg-[#FAFAF9]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-neutral-400">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-black transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/account" className="hover:text-black transition-colors">
              ACCOUNT
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">DELIVERY TRACKING</span>
          </div>

          {order && (
            <span className="hidden sm:inline-block font-mono text-neutral-500">
              #{order.orderNumber}
            </span>
          )}
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-10 sm:py-14">
        {/* HEADER SECTION */}
        <div className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-150">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">
              SHILLSTORE LOGISTICS
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#111111]">
              Lacak Pengiriman
            </h1>
            {order && (
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Order ID: <strong className="text-neutral-900 font-mono">#{order.orderNumber}</strong> • Dipesan pada {order.date}
              </p>
            )}
          </div>

          {/* Quick Order Search / Switcher Form */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-sm w-full">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Cari Order ID (contoh: 982310)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full h-10 pl-3 pr-8 text-xs bg-white border border-neutral-200 focus:border-black focus:outline-none rounded-[2px] placeholder:text-neutral-400 font-mono"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="h-10 px-4 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] font-semibold uppercase tracking-wider rounded-[2px] transition-colors shrink-0"
            >
              Cari
            </button>
          </form>
        </div>

        {/* FEEDBACK NOTICE POPUP */}
        {actionNotice && (
          <div className="mb-6 p-3.5 bg-neutral-900 text-white text-xs flex items-center justify-between rounded-[2px] shadow-sm animate-in fade-in duration-200">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {actionNotice}
            </span>
            <button
              type="button"
              onClick={() => setActionNotice(null)}
              className="text-neutral-400 hover:text-white text-xs px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* ORDER NOT FOUND STATE */}
        {!order ? (
          <div className="border border-neutral-200 p-8 sm:p-12 text-center bg-[#FAFAF9] rounded-[2px] my-6">
            <div className="w-16 h-16 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-5 text-neutral-400">
              <Search className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#111111] mb-2">
              Pesanan Tidak Ditemukan
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mb-6 leading-relaxed">
              {hasSearched
                ? `Nomor pesanan "${searchInput}" tidak ditemukan di sistem. Pastikan format nomor pesanan Anda benar.`
                : 'Silakan pilih atau masukkan nomor pesanan SHILLSTORE untuk mulai melacak.'}
            </p>

            {/* Quick Available Orders Picker */}
            {allOrders.length > 0 && (
              <div className="max-w-md mx-auto mb-8 text-left bg-white border border-neutral-200 p-4 rounded-[2px]">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                  Pesanan yang Tersedia untuk Dilacak:
                </span>
                <div className="space-y-2">
                  {allOrders.map((o) => (
                    <button
                      key={o.orderNumber}
                      type="button"
                      onClick={() => setOrder(o)}
                      className="w-full text-left p-2.5 hover:bg-neutral-50 border border-neutral-100 rounded-[2px] flex items-center justify-between transition-colors text-xs"
                    >
                      <div>
                        <span className="font-mono font-bold text-neutral-900 block">
                          #{o.orderNumber}
                        </span>
                        <span className="text-neutral-500 text-[11px]">
                          {o.items[0]?.title} • {o.courierName}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="px-6 py-2.5 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] uppercase tracking-wider font-semibold rounded-[2px] transition-colors"
              >
                Kembali ke Beranda
              </Link>
              <Link
                href="/account"
                className="px-6 py-2.5 border border-neutral-300 hover:border-black text-[#111111] text-[11px] uppercase tracking-wider font-semibold rounded-[2px] transition-colors"
              >
                Buka Halaman Akun
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* KEY INFORMATION GRID BAR */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#FAFAF9] border border-neutral-200 rounded-[2px] text-xs">
              {/* Resi */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Nomor Resi ({order.courierName})
                </span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-neutral-900">
                  <span>{order.trackingNumber}</span>
                  <button
                    type="button"
                    onClick={copyResi}
                    className="text-neutral-400 hover:text-black cursor-pointer"
                    title="Salin Resi"
                  >
                    {copiedResi ? (
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Estimasi Tiba */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Estimasi Tiba
                </span>
                <span className="font-semibold text-neutral-900 block">
                  {order.estimatedArrival}
                </span>
              </div>

              {/* Status Pembayaran */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Status Pembayaran
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {order.paymentStatus === 'paid' ? 'Lunas / Berhasil' : 'Menunggu Pembayaran'}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  via {order.paymentMethodName}
                </span>
              </div>

              {/* Status Terkini */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Status Terkini
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wide text-neutral-900">
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  {TRACKING_STEPS_ORDER.find((s) => s.key === order.currentStep)?.title ||
                    order.currentStep}
                </span>
              </div>
            </div>

            {/* MAIN 2-COLUMN: LEFT TIMELINE (~65%), RIGHT SUMMARY & SIMULATOR (~35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* LEFT: VERTICAL TIMELINE OF 6 STEPS */}
              <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-8 rounded-[2px]">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-neutral-150">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-neutral-800" />
                    <h2 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
                      Perjalanan Pengiriman Paket
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    TAHAP {currentStepIndex + 1} DARI 6
                  </span>
                </div>

                {/* Vertical Timeline Container */}
                <div className="relative pl-2 sm:pl-4 space-y-8 sm:space-y-10">
                  {TRACKING_STEPS_ORDER.map((stepDef, idx) => {
                    const isCompleted = idx < currentStepIndex;
                    const isActive = idx === currentStepIndex;
                    const isUpcoming = idx > currentStepIndex;

                    // Match history item if exists
                    const historyRecord = order.history.find((h) => h.step === stepDef.key);

                    return (
                      <div key={stepDef.key} className="relative flex items-start gap-4 sm:gap-6 group">
                        {/* Vertical connecting line */}
                        {idx < TRACKING_STEPS_ORDER.length - 1 && (
                          <div
                            className={`absolute left-[15px] sm:left-[17px] top-8 bottom-[-40px] w-[2px] transition-colors ${
                              isCompleted
                                ? 'bg-black'
                                : isActive
                                ? 'bg-gradient-to-b from-black to-neutral-200'
                                : 'bg-neutral-200'
                            }`}
                          />
                        )}

                        {/* Step Indicator Icon */}
                        <div className="relative z-10 shrink-0">
                          {isCompleted ? (
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center shadow-xs">
                              <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                            </div>
                          ) : isActive ? (
                            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center ring-4 ring-neutral-200">
                              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-neutral-200 bg-white text-neutral-300 flex items-center justify-center text-xs font-mono font-medium">
                              {idx + 1}
                            </div>
                          )}
                        </div>

                        {/* Step Details & Content */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <h3
                                className={`text-sm sm:text-base font-semibold ${
                                  isActive
                                    ? 'text-black'
                                    : isCompleted
                                    ? 'text-neutral-800'
                                    : 'text-neutral-400 font-normal'
                                }`}
                              >
                                {stepDef.title}
                              </h3>

                              {isActive && (
                                <span className="px-2 py-0.5 bg-neutral-900 text-white text-[9px] uppercase tracking-wider font-semibold rounded-[2px]">
                                  Status Terkini
                                </span>
                              )}
                              {isCompleted && (
                                <span className="text-[10px] text-emerald-700 font-medium">
                                  ✓ Selesai
                                </span>
                              )}
                            </div>

                            {/* Timestamp if available */}
                            {historyRecord && (
                              <span className="text-[11px] font-mono text-neutral-400 shrink-0">
                                {historyRecord.timestamp}
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          <p
                            className={`text-xs sm:text-[13px] mt-1.5 leading-relaxed ${
                              isActive
                                ? 'text-neutral-700 font-medium'
                                : isCompleted
                                ? 'text-neutral-600'
                                : 'text-neutral-400'
                            }`}
                          >
                            {historyRecord
                              ? historyRecord.description
                              : stepDef.defaultDescription}
                          </p>

                          {/* Location Note */}
                          <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                            <MapPin
                              className={`w-3.5 h-3.5 ${
                                isActive
                                  ? 'text-black'
                                  : isCompleted
                                  ? 'text-neutral-500'
                                  : 'text-neutral-300'
                              }`}
                            />
                            <span
                              className={`${
                                isActive
                                  ? 'text-neutral-800 font-medium'
                                  : isCompleted
                                  ? 'text-neutral-500'
                                  : 'text-neutral-400'
                              }`}
                            >
                              {historyRecord ? historyRecord.location : stepDef.defaultLocation}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT: INTERACTIVE SIMULATION CONTROL + ORDER SUMMARY (~35%) */}
              <div className="lg:col-span-5 space-y-6">
                {/* 1. SIMULASI CONTROLS CARD */}
                <div className="border border-neutral-300 bg-white p-5 sm:p-6 rounded-[2px] shadow-2xs">
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-neutral-150">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900 flex items-center gap-1.5">
                      <FastForward className="w-3.5 h-3.5" />
                      SIMULASI PERKEMBANGAN PENGIRIMAN
                    </span>
                    <span className="text-[9px] bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-500 font-mono">
                      DEMO MODE
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-500 leading-relaxed mb-4">
                    Gunakan kontrol ini untuk melihat simulasi pembaruan status logistik kurir secara bertahap atau langsung ke status tertentu.
                  </p>

                  <div className="space-y-2.5">
                    {/* Advance Step Button */}
                    <button
                      type="button"
                      onClick={handleAdvanceStep}
                      disabled={order.currentStep === 'delivered'}
                      className="w-full h-11 bg-[#111111] hover:bg-neutral-800 disabled:bg-neutral-300 text-white text-xs uppercase tracking-[0.16em] font-semibold transition-colors rounded-[2px] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      <span>
                        {order.currentStep === 'delivered'
                          ? 'Paket Telah Sampai'
                          : 'Lanjut ke Tahap Selanjutnya'}
                      </span>
                    </button>

                    {/* Step Quick Jump Stepper Buttons */}
                    <div className="pt-2">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1.5 font-medium">
                        Pilih Status Spesifik:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {TRACKING_STEPS_ORDER.map((step) => {
                          const isSelected = order.currentStep === step.key;
                          return (
                            <button
                              key={step.key}
                              type="button"
                              onClick={() => handleSetSpecificStep(step.key)}
                              className={`p-2 text-left text-[11px] rounded-[2px] border transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-neutral-900 text-white border-neutral-900 font-medium'
                                  : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200'
                              }`}
                            >
                              <span className="truncate block">{step.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Reset Button */}
                    <button
                      type="button"
                      onClick={handleResetSimulation}
                      className="w-full mt-2 py-2 text-neutral-500 hover:text-black text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset ke Awal (Pesanan Diproses)</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-neutral-400 italic text-center mt-3 border-t border-neutral-100 pt-2">
                    * Perubahan status tersimpan secara persisten di browser.
                  </p>
                </div>

                {/* 2. ORDER DESTINATION & CUSTOMER */}
                <div className="border border-neutral-200 bg-[#FAFAF9] p-5 sm:p-6 rounded-[2px] text-xs">
                  <div className="pb-3 mb-3 border-b border-neutral-200">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111111]">
                      Tujuan Pengiriman
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-neutral-700">
                    <p className="font-semibold text-neutral-900">
                      {order.customer.fullName}
                    </p>
                    <p className="font-mono text-[11px] text-neutral-500">
                      {order.customer.phone}
                    </p>
                    <p className="pt-1 leading-relaxed">
                      {order.customer.address}
                    </p>
                    <p className="text-neutral-500">
                      {order.customer.city}, {order.customer.province} {order.customer.postalCode ? `(${order.customer.postalCode})` : ''}
                    </p>
                  </div>
                </div>

                {/* 3. ORDER ITEMS SUMMARY */}
                <div className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-[2px]">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-150">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111111]">
                      Produk Dipesan
                    </h3>
                    <span className="text-[11px] text-neutral-500">
                      {order.items.length} Barang
                    </span>
                  </div>

                  <div className="divide-y divide-neutral-100 max-h-64 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="py-3 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* 1:1 Aspect ratio image */}
                          <div className="relative w-12 h-12 bg-[#FAFAF9] border border-neutral-200 rounded-[2px] shrink-0 overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-neutral-900 truncate">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-neutral-400 mt-0.5">
                              {item.size ? `Size: ${item.size} • ` : ''}Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-neutral-900 shrink-0">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 mt-3 border-t border-neutral-150 flex items-baseline justify-between text-xs">
                    <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                      Total Transaksi:
                    </span>
                    <span className="font-bold text-neutral-900 text-sm">
                      Rp {order.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* 4. NAVIGATION CTA LINKS */}
                <div className="space-y-2">
                  <Link
                    href={`/order-confirmation?orderId=${order.orderNumber}`}
                    className="w-full h-11 border border-neutral-300 hover:border-black text-[#111111] text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Lihat Konfirmasi Pesanan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/account"
                    className="w-full h-11 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Buka Riwayat di Akun</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
