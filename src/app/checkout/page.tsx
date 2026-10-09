'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { saveOrder } from '@/lib/orderStorage';
import { ShillOrder, OrderItemDetail } from '@/types/order';
import {
  Check,
  AlertCircle,
  Copy,
  CheckCheck,
  X,
  ShieldCheck,
  ArrowRight,
  QrCode,
  CreditCard,
  Banknote,
  RotateCcw,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('DKI Jakarta');
  const [city, setCity] = useState('Jakarta Selatan');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Shipping & Payment
  const [courier, setCourier] = useState<'jne' | 'sicepat' | 'jnt' | 'instant'>('sicepat');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bca_va' | 'mandiri_va' | 'cod'>('qris');

  // Voucher
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [voucherError, setVoucherError] = useState('');

  // Form & Simulation state
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSimulationError, setPaymentSimulationError] = useState<string | null>(null);
  const [copiedVA, setCopiedVA] = useState(false);

  // Calculations
  const shippingCost = courier === 'instant' ? 20000 : 0;
  const finalTotal = Math.max(0, totalPrice + shippingCost - discount);

  const shippingOptions = [
    { id: 'sicepat' as const, name: 'SiCepat Express', estimate: 'Estimasi 1–2 Hari', cost: 0 },
    { id: 'jne' as const, name: 'JNE Reguler', estimate: 'Estimasi 2–3 Hari', cost: 0 },
    { id: 'jnt' as const, name: 'J&T Express', estimate: 'Estimasi 2–3 Hari', cost: 0 },
    { id: 'instant' as const, name: 'Kurir Instant', estimate: 'Sampai hari ini', cost: 20000 },
  ];

  const paymentOptions = [
    { id: 'qris' as const, name: 'QRIS', desc: 'BCA, GoPay, OVO, ShopeePay, DANA & Mobile Banking' },
    { id: 'bca_va' as const, name: 'BCA Virtual Account', desc: 'Transfer via m-BCA, KlikBCA, atau ATM BCA' },
    { id: 'mandiri_va' as const, name: 'Mandiri Virtual Account', desc: 'Transfer via Livin\' by Mandiri atau ATM' },
    { id: 'cod' as const, name: 'Cash on Delivery (COD)', desc: 'Bayar tunai di tempat saat kurir tiba' },
  ];

  const provinces = [
    'DKI Jakarta',
    'Jawa Barat',
    'Banten',
    'Jawa Tengah',
    'DI Yogyakarta',
    'Jawa Timur',
    'Bali',
    'Sumatera Utara',
    'Sumatera Selatan',
    'Kalimantan Selatan',
  ];

  const applyVoucher = () => {
    setVoucherError('');
    const code = voucherCode.trim().toUpperCase();
    if (code === 'SHILL30' || code === 'DISC30K') {
      setDiscount(30000);
      setAppliedVoucher('SHILL30 (-Rp 30.000)');
    } else if (code === 'HEMAT45' || code === 'SHILL45') {
      const disc = Math.round(totalPrice * 0.45);
      setDiscount(disc);
      setAppliedVoucher(`HEMAT45 (-Rp ${disc.toLocaleString('id-ID')})`);
    } else if (code) {
      setVoucherError('Kode promo tidak valid atau sudah kedaluwarsa.');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi';
    if (!phone.trim()) {
      errors.phone = 'Nomor WhatsApp / HP wajib diisi';
    } else if (phone.trim().length < 9) {
      errors.phone = 'Nomor telepon minimal 9 digit';
    }
    if (!address.trim()) errors.address = 'Alamat pengiriman lengkap wajib diisi';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setFormErrors({});
    setPaymentSimulationError(null);
    setShowPaymentModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  // 1. Simulate SUCCESSFUL payment
  const handlePaymentSuccess = () => {
    setIsProcessingPayment(true);
    setPaymentSimulationError(null);

    const generatedOrderNumber = `SHILL-${Math.floor(100000 + Math.random() * 900000)}`;

    let generatedResi = `SCP-${Math.floor(10000000 + Math.random() * 90000000)}`;
    if (courier === 'jne') generatedResi = `JNE-${Math.floor(10000000 + Math.random() * 90000000)}`;
    if (courier === 'jnt') generatedResi = `JT-${Math.floor(10000000 + Math.random() * 90000000)}`;
    if (courier === 'instant') generatedResi = `INST-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const selectedCourierObj = shippingOptions.find((o) => o.id === courier) || shippingOptions[0];
    const selectedPaymentObj = paymentOptions.find((o) => o.id === paymentMethod) || paymentOptions[0];

    const now = new Date();
    const formattedDate =
      now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }) +
      ', ' +
      now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
      ' WIB';

    const orderItems: OrderItemDetail[] = cart.map((item) => ({
      id: item.product.id,
      title: item.product.title,
      price: item.product.price,
      image: item.product.images[0] || '/sites/shillstore/root/images/prod-perfume-shillstore-bloom.jpg',
      quantity: item.quantity,
      size: item.product.sizes?.[0] || 'All Size',
    }));

    const newOrder: ShillOrder = {
      orderNumber: generatedOrderNumber,
      date: formattedDate,
      customer: {
        fullName,
        phone,
        email: email || undefined,
        province,
        city,
        postalCode: postalCode || undefined,
        address,
        notes: notes || undefined,
      },
      items: orderItems,
      subtotal: totalPrice,
      shippingCost,
      discount,
      voucherCode: appliedVoucher || undefined,
      total: finalTotal,
      courierId: courier,
      courierName: selectedCourierObj.name,
      trackingNumber: generatedResi,
      estimatedArrival: selectedCourierObj.estimate,
      paymentMethod,
      paymentMethodName: selectedPaymentObj.name,
      paymentStatus: 'paid',
      currentStep: 'processing', // Step 1 & 2 completed, step 3 active!
      history: [
        {
          step: 'created',
          title: 'Pesanan Dibuat',
          description: 'Pesanan berhasil dibuat di sistem SHILLSTORE',
          location: 'SHILLSTORE Online Store',
          timestamp: formattedDate,
        },
        {
          step: 'paid',
          title: 'Pembayaran Berhasil',
          description: `Pembayaran Rp ${finalTotal.toLocaleString('id-ID')} via ${selectedPaymentObj.name} berhasil diverifikasi`,
          location: 'Payment Gateway SHILLSTORE',
          timestamp: formattedDate,
        },
        {
          step: 'processing',
          title: 'Pesanan Diproses',
          description: 'Paket sedang disiapkan & quality check di warehouse',
          location: 'Warehouse SHILLSTORE Jakarta Selatan',
          timestamp: formattedDate,
        },
      ],
    };

    setTimeout(() => {
      saveOrder(newOrder);
      clearCart();
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      router.push(`/order-confirmation?orderId=${newOrder.orderNumber}`);
    }, 800);
  };

  // 2. Simulate FAILED payment
  const handlePaymentFailed = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSimulationError(
        '⚠️ Simulasi Pembayaran Gagal: Transaksi ditolak atau batas waktu pembayaran habis. Saldo Anda tidak terpotong dan pesanan belum dibuat. Silakan coba lagi atau ganti metode pembayaran.'
      );
    }, 600);
  };

  // EMPTY CART SCREEN
  if (cart.length === 0 && !showPaymentModal) {
    return (
      <div className="min-h-screen bg-white text-[#111111] font-sans flex flex-col">
        <header className="border-b border-[#E5E5E5] bg-white sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
            <Link
              href="/"
              className="text-base sm:text-lg font-black tracking-[0.22em] uppercase text-[#111111] hover:opacity-80 transition-opacity"
            >
              SHILLSTORE
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md w-full py-16">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium block mb-3">
              CHECKOUT
            </span>
            <h1 className="text-2xl sm:text-3xl font-light text-[#111111] tracking-tight mb-3">
              Keranjang Belanja Kosong
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-8">
              Anda belum menambahkan produk ke keranjang belanja. Silakan pilih produk dari koleksi kami.
            </p>
            <Link
              href="/collections"
              className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors rounded-[2px]"
            >
              JELAJAHI KOLEKSI
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans flex flex-col">
      {/* 1. Header (Clean, minimalist) */}
      <header className="border-b border-[#E5E5E5] bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: SHILLSTORE / CHECKOUT */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="text-base sm:text-lg font-black tracking-[0.22em] uppercase text-[#111111] hover:opacity-80 transition-opacity"
            >
              SHILLSTORE
            </Link>
            <span className="text-neutral-300 font-light">/</span>
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-neutral-500">
              CHECKOUT
            </span>
          </div>

          {/* Right: Security Reassurance & Back to Cart */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-neutral-400" />
              Secure checkout
            </span>
            <Link
              href="/cart"
              className="text-xs sm:text-[12px] uppercase tracking-[0.15em] text-neutral-700 hover:text-black transition-colors font-medium border-b border-neutral-300 hover:border-black pb-0.5"
            >
              Kembali ke Keranjang
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Checkout Layout (Desktop 2-column: 60% Left, 40% Sticky Right) */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN: Checkout Info (~60%) */}
          <div className="lg:col-span-7">
            {/* 01 INFORMASI PEMBELI */}
            <section>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-400 font-medium">01</span>
                <h2 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
                  INFORMASI PEMBELI
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                    Nama Lengkap <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Budi Santoso"
                    className={`w-full h-11 sm:h-12 px-3.5 text-sm text-[#111111] bg-white border rounded-[2px] transition-colors focus:outline-none placeholder:text-neutral-400 ${
                      formErrors.fullName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[#E5E5E5] focus:border-black'
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="text-[11px] text-red-600 mt-1 block">{formErrors.fullName}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                      WhatsApp / HP <span className="text-neutral-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="081234567890"
                      className={`w-full h-11 sm:h-12 px-3.5 text-sm text-[#111111] bg-white border rounded-[2px] transition-colors focus:outline-none placeholder:text-neutral-400 ${
                        formErrors.phone
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E5] focus:border-black'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-red-600 mt-1 block">{formErrors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                      Email (Opsional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="budi@example.com"
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-[#111111] bg-white border border-[#E5E5E5] rounded-[2px] transition-colors focus:border-black focus:outline-none placeholder:text-neutral-400"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-b border-[#E5E5E5] my-10 sm:my-12" />

            {/* 02 ALAMAT PENGIRIMAN */}
            <section>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-400 font-medium">02</span>
                <h2 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
                  ALAMAT PENGIRIMAN
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                      Provinsi
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-[#111111] bg-white border border-[#E5E5E5] rounded-[2px] transition-colors focus:border-black focus:outline-none cursor-pointer"
                    >
                      {provinces.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                      Kota / Kabupaten
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Jakarta Selatan"
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-[#111111] bg-white border border-[#E5E5E5] rounded-[2px] transition-colors focus:border-black focus:outline-none placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                    Alamat Lengkap <span className="text-neutral-400">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                    className={`w-full p-3.5 text-sm text-[#111111] bg-white border rounded-[2px] transition-colors focus:outline-none placeholder:text-neutral-400 ${
                      formErrors.address
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[#E5E5E5] focus:border-black'
                    }`}
                  />
                  {formErrors.address && (
                    <span className="text-[11px] text-red-600 mt-1 block">{formErrors.address}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="12345"
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-[#111111] bg-white border border-[#E5E5E5] rounded-[2px] transition-colors focus:border-black focus:outline-none placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                      Catatan Pengiriman (Opsional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Titipkan di pos satpam"
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-[#111111] bg-white border border-[#E5E5E5] rounded-[2px] transition-colors focus:border-black focus:outline-none placeholder:text-neutral-400"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-b border-[#E5E5E5] my-10 sm:my-12" />

            {/* 03 PENGIRIMAN */}
            <section>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-400 font-medium">03</span>
                <h2 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
                  PENGIRIMAN
                </h2>
              </div>

              <div className="space-y-2.5">
                {shippingOptions.map((opt) => {
                  const isSelected = courier === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => setCourier(opt.id)}
                      className={`flex items-center justify-between p-3.5 sm:p-4 border rounded-[2px] transition-all cursor-pointer ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-50/80'
                          : 'border-[#E5E5E5] hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                            isSelected ? 'border-black' : 'border-neutral-300'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-medium text-[#111111] block">
                            {opt.name}
                          </span>
                          <span className="text-[11px] text-neutral-500 block mt-0.5">
                            {opt.estimate}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-xs uppercase tracking-wider font-semibold ${
                          opt.cost === 0 ? 'text-emerald-700' : 'text-[#111111]'
                        }`}
                      >
                        {opt.cost === 0 ? 'GRATIS' : `Rp ${opt.cost.toLocaleString('id-ID')}`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Divider */}
            <div className="border-b border-[#E5E5E5] my-10 sm:my-12" />

            {/* 04 PEMBAYARAN */}
            <section>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-400 font-medium">04</span>
                <h2 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
                  PEMBAYARAN
                </h2>
              </div>

              <div className="space-y-2.5">
                {paymentOptions.map((opt) => {
                  const isSelected = paymentMethod === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => setPaymentMethod(opt.id)}
                      className={`flex items-center justify-between p-3.5 sm:p-4 border rounded-[2px] transition-all cursor-pointer ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-50/80'
                          : 'border-[#E5E5E5] hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                            isSelected ? 'border-black' : 'border-neutral-300'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-medium text-[#111111] block">
                            {opt.name}
                          </span>
                          <span className="text-[11px] text-neutral-500 block mt-0.5">
                            {opt.desc}
                          </span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Order Summary (~40%, Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="border border-[#E5E5E5] bg-[#FAFAF9] p-6 sm:p-7 rounded-[2px]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E5E5]">
                <h3 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
                  RINGKASAN PESANAN
                </h3>
                <span className="text-[11px] text-neutral-500">
                  {cart.reduce((total, i) => total + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#E5E5E5] max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 bg-white border border-[#E5E5E5] shrink-0 overflow-hidden rounded-[2px]">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-[#111111] truncate">{item.product.title}</p>
                        <p className="text-neutral-500 text-[11px]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#111111] shrink-0">
                      Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-4 mt-3 border-t border-[#E5E5E5]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="SHILL30"
                    className="flex-1 h-10 px-3 text-xs uppercase tracking-wider font-semibold border border-[#E5E5E5] bg-white text-[#111111] focus:border-black focus:outline-none placeholder:text-neutral-400 placeholder:font-normal rounded-[2px]"
                  />
                  <button
                    type="button"
                    onClick={applyVoucher}
                    className="h-10 px-4 bg-[#111111] text-white text-[11px] uppercase tracking-[0.15em] font-semibold hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 rounded-[2px]"
                  >
                    Pakai
                  </button>
                </div>
                {appliedVoucher && (
                  <p className="text-[11px] text-emerald-700 font-medium mt-1.5">
                    ✓ Voucher {appliedVoucher} digunakan
                  </p>
                )}
                {voucherError && (
                  <p className="text-[11px] text-red-600 font-normal mt-1.5">
                    {voucherError}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-[#E5E5E5] space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#111111]">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Pengiriman ({shippingOptions.find((o) => o.id === courier)?.name})</span>
                  <span className={shippingCost === 0 ? 'font-semibold text-emerald-700' : 'font-medium text-[#111111]'}>
                    {shippingCost === 0 ? 'GRATIS' : `Rp ${shippingCost.toLocaleString('id-ID')}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Potongan Diskon</span>
                    <span className="font-semibold">-Rp {discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-[#E5E5E5] flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-[0.15em] font-bold text-[#111111]">
                    TOTAL
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-[#111111] tracking-tight">
                    Rp {finalTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full h-12 sm:h-13 bg-[#111111] hover:bg-neutral-800 text-white text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-2 mt-5 rounded-[2px]"
              >
                <span>
                  BAYAR SEKARANG — Rp {finalTotal.toLocaleString('id-ID')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-neutral-500 text-center tracking-normal mt-3">
                Gratis pengiriman • Garansi tukar ukuran 7 hari • Pembayaran aman
              </p>
            </div>
          </div>
        </form>
      </main>

      {/* =========================================================================
          3. SIMULASI PEMBAYARAN MODAL (Clean, Minimal, High-End Fashion Style)
         ========================================================================= */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
          <div className="bg-white border border-neutral-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl rounded-[2px] relative my-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                if (!isProcessingPayment) {
                  setShowPaymentModal(false);
                  setPaymentSimulationError(null);
                }
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black cursor-pointer p-1"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center pb-5 mb-5 border-b border-neutral-150">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
                SHILLSTORE GATEWAY
              </span>
              <h2 className="text-lg sm:text-xl font-light text-[#111111] tracking-tight">
                Simulasi Pembayaran
              </h2>
              <div className="mt-2 text-xs text-neutral-500">
                Total Tagihan:{' '}
                <strong className="text-neutral-900 font-semibold text-sm">
                  Rp {finalTotal.toLocaleString('id-ID')}
                </strong>
              </div>
            </div>

            {/* Error Notification if Simulated Payment Failed */}
            {paymentSimulationError && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-[2px] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{paymentSimulationError}</p>
              </div>
            )}

            {/* PAYMENT METHOD DETAILS */}
            <div className="mb-6 space-y-4">
              {/* QRIS */}
              {paymentMethod === 'qris' && (
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-neutral-900">
                    <QrCode className="w-4 h-4" />
                    <span>Scan QRIS Resmi</span>
                  </div>
                  <div className="bg-white p-3 border border-neutral-200 inline-block shadow-2xs">
                    <div className="w-44 h-44 mx-auto relative flex flex-col items-center justify-center border border-dashed border-neutral-300 bg-neutral-50">
                      <div className="grid grid-cols-6 gap-1.5 p-3">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-4.5 h-4.5 ${
                              (i % 2 === 0 || i % 5 === 0) && i !== 14 && i !== 21
                                ? 'bg-black'
                                : 'bg-neutral-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="absolute bottom-1.5 text-[8px] font-mono tracking-widest text-neutral-500 uppercase">
                        SHILLSTORE QRIS
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-500 max-w-sm mx-auto leading-relaxed">
                    Buka BCA Mobile, GoPay, OVO, ShopeePay, atau aplikasi mobile banking favorit Anda, lalu scan kode QR di atas.
                  </p>
                </div>
              )}

              {/* BCA VA */}
              {paymentMethod === 'bca_va' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="uppercase tracking-[0.15em] font-semibold text-[#111111] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4" />
                      BCA Virtual Account
                    </span>
                    <span className="text-neutral-400 text-[11px]">Verifikasi Otomatis</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-neutral-200 bg-neutral-50 rounded-[2px]">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#111111] tracking-wider">
                      8077 0812 3456 7890
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('8077081234567890')}
                      className="px-3.5 py-1.5 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer rounded-[2px]"
                    >
                      {copiedVA ? 'Tersalin' : 'Salin'}
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Pilih Transfer &gt; BCA Virtual Account pada m-BCA atau KlikBCA. Masukkan nomor VA di atas.
                  </p>
                </div>
              )}

              {/* MANDIRI VA */}
              {paymentMethod === 'mandiri_va' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="uppercase tracking-[0.15em] font-semibold text-[#111111] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4" />
                      Mandiri Virtual Account
                    </span>
                    <span className="text-neutral-400 text-[11px]">Verifikasi Otomatis</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-neutral-200 bg-neutral-50 rounded-[2px]">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#111111] tracking-wider">
                      8890 8081 2345 6789
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('8890808123456789')}
                      className="px-3.5 py-1.5 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer rounded-[2px]"
                    >
                      {copiedVA ? 'Tersalin' : 'Salin'}
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Pilih Bayar &gt; Virtual Account pada aplikasi Livin&apos; by Mandiri atau ATM Mandiri.
                  </p>
                </div>
              )}

              {/* COD */}
              {paymentMethod === 'cod' && (
                <div className="space-y-2 p-3.5 bg-neutral-50 border border-neutral-200 rounded-[2px]">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#111111]">
                    <Banknote className="w-4 h-4" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Siapkan uang tunai sebesar <strong>Rp {finalTotal.toLocaleString('id-ID')}</strong> saat kurir mengantarkan paket ke alamat Anda.
                  </p>
                </div>
              )}
            </div>

            {/* SIMULATION ACTION BUTTONS */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-150">
              {/* 1. Simulate SUCCESS */}
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handlePaymentSuccess}
                className="w-full h-12 bg-[#111111] hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors rounded-[2px] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Pembayaran...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Simulasikan Pembayaran Berhasil</span>
                  </>
                )}
              </button>

              {/* 2. Simulate FAILED */}
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handlePaymentFailed}
                className="w-full h-11 border border-neutral-300 hover:border-red-600 hover:text-red-600 text-neutral-700 text-xs font-semibold uppercase tracking-[0.15em] transition-colors rounded-[2px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Simulasikan Pembayaran Gagal</span>
              </button>

              {/* 3. Cancel / Change Method */}
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={() => {
                  setShowPaymentModal(false);
                  setPaymentSimulationError(null);
                }}
                className="w-full py-2 text-center text-[11px] text-neutral-400 hover:text-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                Batal / Ganti Metode Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
