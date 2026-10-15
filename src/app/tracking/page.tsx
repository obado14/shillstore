'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import { LiveCourierMap } from '@/components/sites/shillstore/tracking/LiveCourierMap';
import {
  getOrderByTrackingOrId,
  getOrders,
  getLatestOrderId,
  advanceOrderStep,
  updateOrderStep,
  resetOrderStep,
} from '@/lib/orderStorage';
import {
  ShillOrder,
  TrackingStepStatus,
  MAIN_TRACKING_STAGES,
  mapStepToMainStage,
} from '@/types/order';
import {
  Check,
  Truck,
  Package,
  MapPin,
  Clock,
  Copy,
  CheckCheck,
  Search,
  ArrowRight,
  RotateCcw,
  FastForward,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  FileText,
} from 'lucide-react';

export default function DeliveryTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-xs tracking-widest uppercase text-neutral-400 font-mono">
          Memuat Pelacakan Pengiriman SHILLSTORE...
        </div>
      }
    >
      <DeliveryTrackingContent />
    </Suspense>
  );
}

function DeliveryTrackingContent() {
  const searchParams = useSearchParams();

  // Search form state
  const [orderIdInput, setOrderIdInput] = useState('');
  const [resiInput, setResiInput] = useState('');
  const [isSearchingAPI, setIsSearchingAPI] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Active tracked order
  const [order, setOrder] = useState<ShillOrder | null>(null);
  const [allOrders, setAllOrders] = useState<ShillOrder[]>([]);
  const [copiedResi, setCopiedResi] = useState(false);
  const [copiedOrderNo, setCopiedOrderNo] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const orderIdParam = searchParams.get('orderId');
  const resiParam = searchParams.get('resi');

  // Load orders from storage or search query
  const loadInitialData = () => {
    const ordersList = getOrders();
    setAllOrders(ordersList);

    const targetQuery = resiParam || orderIdParam || getLatestOrderId();
    if (targetQuery) {
      const found = getOrderByTrackingOrId(targetQuery);
      if (found) {
        setOrder(found);
        setOrderIdInput(found.orderNumber);
        setResiInput(found.trackingNumber);
      }
    }
  };

  useEffect(() => {
    loadInitialData();

    const handleStorageUpdate = () => {
      loadInitialData();
    };

    window.addEventListener('shill-orders-updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('shill-orders-updated', handleStorageUpdate);
    };
  }, [orderIdParam, resiParam]);

  // Handle Search Submission (Order ID or Nomor Resi)
  const handleTrackingSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchError(null);

    const queryToSearch = (orderIdInput || resiInput || '').trim();
    if (!queryToSearch) {
      setSearchError('Silakan masukkan Nomor Pesanan atau Nomor Resi pengiriman.');
      return;
    }

    setIsSearchingAPI(true);

    try {
      // 1. First check local client-side order storage
      const localFound = getOrderByTrackingOrId(queryToSearch);
      if (localFound) {
        setOrder(localFound);
        setOrderIdInput(localFound.orderNumber);
        setResiInput(localFound.trackingNumber);
        setIsSearchingAPI(false);
        return;
      }

      // 2. Query backend tracking API route (which integrates Binderbyte / Biteship if configured)
      const res = await fetch(`/api/tracking?query=${encodeURIComponent(queryToSearch)}`);
      const json = await res.json();

      if (res.ok && json.data) {
        setOrder(json.data as ShillOrder);
        setOrderIdInput(json.data.orderNumber || '');
        setResiInput(json.data.trackingNumber || '');
      } else {
        setOrder(null);
        setSearchError(
          json.message ||
            `Nomor pesanan atau nomor resi "${queryToSearch}" tidak ditemukan di sistem logistik kami.`
        );
      }
    } catch {
      // Network or connection error handling
      setOrder(null);
      setSearchError(
        'Terjadi kendala saat menghubungkan ke server pelacakan. Periksa koneksi internet Anda atau coba sesaat lagi.'
      );
    } finally {
      setIsSearchingAPI(false);
    }
  };

  // Quick select a demo order chip
  const handleSelectDemoOrder = (demoOrder: ShillOrder) => {
    setSearchError(null);
    setOrder(demoOrder);
    setOrderIdInput(demoOrder.orderNumber);
    setResiInput(demoOrder.trackingNumber);
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
      const mainStageKey = mapStepToMainStage(updated.currentStep);
      const stageName = MAIN_TRACKING_STAGES.find((s) => s.key === mainStageKey)?.title || updated.currentStep;
      showNotice(`Status berhasil diperbarui ke: ${stageName}`);
    }
  };

  const handleSetSpecificStep = (stepKey: TrackingStepStatus) => {
    if (!order) return;
    const updated = updateOrderStep(order.orderNumber, stepKey);
    if (updated) {
      setOrder(updated);
      const mainStageKey = mapStepToMainStage(stepKey);
      const stageName = MAIN_TRACKING_STAGES.find((s) => s.key === mainStageKey)?.title || stepKey;
      showNotice(`Status dialihkan ke: ${stageName}`);
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

  // Calculate current main stage index (0 to 4) for the 5 requested stages:
  // Pesanan Diproses, Dikemas, Dalam Pengiriman, Sedang Diantar, Terkirim
  const currentMainStageKey = order ? mapStepToMainStage(order.currentStep) : 'processing';
  const currentMainStageIndex = MAIN_TRACKING_STAGES.findIndex((s) => s.key === currentMainStageKey);

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

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        {/* PAGE HEADER */}
        <div className="mb-6 sm:mb-8 pb-4 border-b border-neutral-150">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
            SHILLSTORE LOGISTICS &amp; TELEMETRY
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#111111]">
            Lacak Pesanan Anda
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Pantau status pengiriman paket, rincian kurir ekspedisi, serta estimasi kedatangan pesanan Anda secara transparan.
          </p>
        </div>

        {/* 1. SECTION: SEARCH BOX (Dual Input: Nomor Pesanan & Nomor Resi) */}
        <div className="mb-8 p-5 sm:p-6 bg-[#FAFAF9] border border-neutral-200 rounded-[2px]">
          <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-900 mb-3 flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Pencarian Status Pengiriman</span>
          </h2>

          <form onSubmit={handleTrackingSearch} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Field 1: Nomor Pesanan */}
              <div className="sm:col-span-5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                  Nomor Pesanan (Order ID)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={orderIdInput}
                    onChange={(e) => setOrderIdInput(e.target.value)}
                    placeholder="Contoh: SHILL-982310"
                    className="w-full h-11 pl-9 pr-3 text-xs bg-white border border-neutral-300 focus:border-black focus:outline-none rounded-[2px] font-mono text-neutral-900 placeholder:text-neutral-400 placeholder:font-sans"
                  />
                </div>
              </div>

              {/* Field 2: Nomor Resi */}
              <div className="sm:col-span-5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                  Nomor Resi (AWB / Tracking Number)
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={resiInput}
                    onChange={(e) => setResiInput(e.target.value)}
                    placeholder="Contoh: SCP-10293817 / JNE-88120349"
                    className="w-full h-11 pl-9 pr-3 text-xs bg-white border border-neutral-300 focus:border-black focus:outline-none rounded-[2px] font-mono text-neutral-900 placeholder:text-neutral-400 placeholder:font-sans"
                  />
                </div>
              </div>

              {/* Button: Lacak Pesanan */}
              <div className="sm:col-span-2 flex items-end">
                <button
                  type="submit"
                  disabled={isSearchingAPI}
                  className="w-full h-11 bg-[#111111] hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
                >
                  {isSearchingAPI ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
                  )}
                  <span>{isSearchingAPI ? 'Melacak...' : 'Lacak'}</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Resi Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] text-neutral-400 font-medium">
                Pilih Sampel Pesanan Demo:
              </span>
              {allOrders.map((o) => (
                <button
                  key={o.orderNumber}
                  type="button"
                  onClick={() => handleSelectDemoOrder(o)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-[2px] border transition-colors cursor-pointer ${
                    order?.orderNumber === o.orderNumber
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-300'
                  }`}
                >
                  #{o.orderNumber} ({o.courierName})
                </button>
              ))}
            </div>
          </form>

          {/* Error / Not Found Message */}
          {searchError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-[2px] flex items-start gap-2 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block">Pencarian Tidak Ditemukan:</span>
                <span>{searchError}</span>
              </div>
            </div>
          )}
        </div>

        {/* FEEDBACK POPUP NOTICE */}
        {actionNotice && (
          <div className="mb-6 p-3.5 bg-neutral-900 text-white text-xs flex items-center justify-between rounded-[2px] shadow-sm animate-in fade-in duration-200">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {actionNotice}
            </span>
            <button
              type="button"
              onClick={() => setActionNotice(null)}
              className="text-neutral-400 hover:text-white text-xs px-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* ORDER DETAILS & TRACKING VIEW */}
        {!order ? (
          /* Empty / Not Selected State */
          <div className="border border-neutral-200 p-10 sm:p-14 text-center bg-[#FAFAF9] rounded-[2px]">
            <div className="w-14 h-14 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <Truck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h2 className="text-xl font-light text-[#111111] mb-2">
              Masukkan Data Pesanan untuk Melacak
            </h2>
            <p className="text-xs text-neutral-500 max-w-md mx-auto mb-6 leading-relaxed">
              Ketikkan nomor pesanan (Order ID) atau nomor resi pengiriman yang tertera pada bukti checkout / email konfirmasi pesanan Anda.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/account"
                className="px-6 py-2.5 bg-white border border-neutral-300 hover:border-black text-xs font-semibold uppercase tracking-wider text-neutral-900 rounded-[2px] transition-colors"
              >
                Lihat Pesanan di Akun Saya
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 2. SECTION: 5 STATUS TAHAP PESANAN (Pesanan Diproses, Dikemas, Dalam Pengiriman, Sedang Diantar, Terkirim) */}
            <div className="bg-white border border-neutral-200 p-5 sm:p-7 rounded-[2px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-neutral-150">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 block mb-1">
                    STATUS PROGRESS PENGIRIMAN
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-semibold text-neutral-900">
                      {MAIN_TRACKING_STAGES[currentMainStageIndex]?.title || 'Pesanan Diproses'}
                    </span>
                    <span className="px-2 py-0.5 bg-neutral-900 text-white text-[10px] uppercase tracking-wider font-semibold rounded-[2px]">
                      Tahap {currentMainStageIndex + 1} dari 5
                    </span>
                  </div>
                </div>

                {/* Data Source Transparency Badge */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-2.5 py-1 bg-neutral-100 text-neutral-600 border border-neutral-200 text-[10px] font-medium uppercase tracking-wider rounded-[2px]">
                    {order.isLiveTracking
                      ? '🟢 Terhubung API Kurir Live'
                      : 'ℹ️ Mode Demo / Data Terjadwal'}
                  </span>
                </div>
              </div>

              {/* 5-Step Horizontal Progress Bar */}
              <div className="relative">
                {/* Connecting line behind stages */}
                <div className="absolute top-4 sm:top-5 left-6 right-6 h-[2px] bg-neutral-200 z-0 hidden sm:block">
                  <div
                    className="h-full bg-black transition-all duration-500 ease-out"
                    style={{
                      width: `${(currentMainStageIndex / (MAIN_TRACKING_STAGES.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-2 relative z-10">
                  {MAIN_TRACKING_STAGES.map((stage, idx) => {
                    const isPassed = idx < currentMainStageIndex;
                    const isCurrent = idx === currentMainStageIndex;
                    const isFuture = idx > currentMainStageIndex;

                    return (
                      <div
                        key={stage.key}
                        className={`flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 p-2 sm:p-0 rounded-[2px] ${
                          isCurrent ? 'bg-neutral-50 sm:bg-transparent' : ''
                        }`}
                      >
                        {/* Circle Indicator */}
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isPassed
                              ? 'bg-black text-white'
                              : isCurrent
                              ? 'bg-black text-white ring-4 ring-neutral-200 shadow-xs'
                              : 'bg-white border-2 border-neutral-300 text-neutral-400 font-mono text-xs'
                          }`}
                        >
                          {isPassed ? (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          ) : isCurrent ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                          ) : (
                            idx + 1
                          )}
                        </div>

                        {/* Stage Titles */}
                        <div className="min-w-0">
                          <p
                            className={`text-xs sm:text-[13px] font-semibold leading-tight ${
                              isCurrent
                                ? 'text-black font-bold'
                                : isPassed
                                ? 'text-neutral-800'
                                : 'text-neutral-400 font-normal'
                            }`}
                          >
                            {stage.title}
                          </p>
                          <span
                            className={`text-[10px] hidden sm:block mt-0.5 ${
                              isCurrent ? 'text-neutral-600 font-medium' : 'text-neutral-400'
                            }`}
                          >
                            {stage.description}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. KEY METRICS BAR (Kurir, Resi, Estimasi, Penerima) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#FAFAF9] border border-neutral-200 rounded-[2px] text-xs">
              {/* Kurir & Resi */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Ekspedisi &amp; No. Resi
                </span>
                <span className="font-semibold text-neutral-900 block">
                  {order.courierName}
                </span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-neutral-900 mt-0.5">
                  <span className="truncate">{order.trackingNumber}</span>
                  <button
                    type="button"
                    onClick={copyResi}
                    className="text-neutral-400 hover:text-black cursor-pointer shrink-0"
                    title="Salin No. Resi"
                  >
                    {copiedResi ? (
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Order ID */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Nomor Pesanan
                </span>
                <div className="flex items-center gap-1.5 font-mono font-semibold text-neutral-900">
                  <span>#{order.orderNumber}</span>
                  <button
                    type="button"
                    onClick={copyOrderNo}
                    className="text-neutral-400 hover:text-black cursor-pointer"
                    title="Salin Nomor Pesanan"
                  >
                    {copiedOrderNo ? (
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <span className="text-[10px] text-neutral-400 block mt-0.5">
                  {order.date}
                </span>
              </div>

              {/* Estimasi Kedatangan */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Estimasi Tiba
                </span>
                <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>{order.estimatedArrival}</span>
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">
                  Tujuan: {order.customer.city}
                </span>
              </div>

              {/* Status Pembayaran */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Pembayaran
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {order.paymentStatus === 'paid' ? 'Lunas / Berhasil' : 'Menunggu'}
                </span>
                <span className="text-[11px] text-neutral-500 block mt-0.5">
                  via {order.paymentMethodName}
                </span>
              </div>
            </div>

            {/* 4. LIVE ANIMATED COURIER MAP & TELEMETRY */}
            <LiveCourierMap
              orderNumber={order.orderNumber}
              recipientName={order.customer.fullName}
              address={order.customer.address}
              city={order.customer.city}
              province={order.customer.province}
              postalCode={order.customer.postalCode}
              courierName={order.courierName}
              trackingNumber={order.trackingNumber}
            />

            {/* 5. 2-COLUMN SECTION: RIWAYAT PERJALANAN PAKET + SIMULASI/SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: TIMELINE RIWAYAT PERJALANAN PAKET (lg:col-span-7) */}
              <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-8 rounded-[2px]">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-150">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-neutral-800" />
                    <h3 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-neutral-900">
                      Riwayat Perjalanan Paket
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">
                    {order.history.length} Catatan Checkpoint
                  </span>
                </div>

                {/* Vertical Timeline Checkpoints */}
                <div className="relative pl-2 sm:pl-3 space-y-6 sm:space-y-8">
                  {order.history.map((record, idx) => {
                    const isLatest = idx === order.history.length - 1;

                    return (
                      <div key={`${record.step}-${idx}`} className="relative flex items-start gap-4 sm:gap-5">
                        {/* Vertical line connecting checkpoints */}
                        {idx < order.history.length - 1 && (
                          <div className="absolute left-[13px] sm:left-[15px] top-6 bottom-[-24px] w-[2px] bg-neutral-200" />
                        )}

                        {/* Checkpoint Pin */}
                        <div className="relative z-10 shrink-0">
                          {isLatest ? (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center ring-4 ring-neutral-200">
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-300 flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                          )}
                        </div>

                        {/* Checkpoint Details */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h4
                              className={`text-xs sm:text-sm font-semibold ${
                                isLatest ? 'text-black' : 'text-neutral-800'
                              }`}
                            >
                              {record.title}
                            </h4>
                            <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 shrink-0">
                              {record.timestamp}
                            </span>
                          </div>

                          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                            {record.description}
                          </p>

                          <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-neutral-500">
                            <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                            <span className="truncate">{record.location}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT: SIMULASI PENGUJIAN + RINGKASAN PESANAN (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                {/* 1. SIMULASI KONTROL PENGIRIMAN (DEMO CONTROLLER) */}
                <div className="border border-neutral-300 bg-white p-5 sm:p-6 rounded-[2px] shadow-2xs">
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-neutral-150">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900 flex items-center gap-1.5">
                      <FastForward className="w-3.5 h-3.5" />
                      SIMULASI PERJALANAN PAKET
                    </span>
                    <span className="text-[9px] bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600 font-mono font-medium">
                      DEMO MODE
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-500 leading-relaxed mb-4">
                    Gunakan kontrol ini untuk mensimulasikan perpindahan 5 status logistik (Pesanan Diproses, Dikemas, Dalam Pengiriman, Sedang Diantar, Terkirim).
                  </p>

                  <div className="space-y-2">
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
                        Pilih Status Langsung:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {MAIN_TRACKING_STAGES.map((stage) => {
                          const isSelected = currentMainStageKey === stage.key;
                          return (
                            <button
                              key={stage.key}
                              type="button"
                              onClick={() => handleSetSpecificStep(stage.key as TrackingStepStatus)}
                              className={`p-2 text-left text-[11px] rounded-[2px] border transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-neutral-900 text-white border-neutral-900 font-medium'
                                  : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200'
                              }`}
                            >
                              <span className="truncate block">{stage.title}</span>
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
                      <span>Reset Status ke Awal</span>
                    </button>
                  </div>
                </div>

                {/* 2. TUJUAN PENGIRIMAN & PENERIMA */}
                <div className="border border-neutral-200 bg-[#FAFAF9] p-5 sm:p-6 rounded-[2px] text-xs">
                  <div className="pb-3 mb-3 border-b border-neutral-200 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111111]">
                      Alamat Penerima
                    </h3>
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  </div>

                  <div className="space-y-1.5 text-neutral-700">
                    <p className="font-semibold text-neutral-900 text-sm">
                      {order.customer.fullName}
                    </p>
                    <p className="font-mono text-[11px] text-neutral-500">
                      {order.customer.phone}
                    </p>
                    <p className="pt-1 leading-relaxed text-neutral-800">
                      {order.customer.address}
                    </p>
                    <p className="text-neutral-500">
                      {order.customer.city}, {order.customer.province}{' '}
                      {order.customer.postalCode ? `(${order.customer.postalCode})` : ''}
                    </p>
                    {order.customer.notes && (
                      <p className="text-[11px] text-neutral-500 italic pt-1 border-t border-neutral-200 mt-2">
                        Catatan: &ldquo;{order.customer.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* 3. RINGKASAN PRODUK PESANAN */}
                <div className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-[2px]">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-150">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111111]">
                      Produk yang Dikirim
                    </h3>
                    <span className="text-[11px] text-neutral-500">
                      {order.items.length} Item
                    </span>
                  </div>

                  <div className="divide-y divide-neutral-100 max-h-60 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="py-3 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
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
                      Total Pembayaran:
                    </span>
                    <span className="font-bold text-neutral-900 text-sm">
                      Rp {order.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* 4. TAUTAN KONFIRMASI PESANAN */}
                <div className="space-y-2">
                  <Link
                    href={`/order-confirmation?orderId=${order.orderNumber}`}
                    className="w-full h-11 border border-neutral-300 hover:border-black text-[#111111] text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Buka Bukti Konfirmasi Pesanan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
