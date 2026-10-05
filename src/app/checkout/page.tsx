'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, CartItem } from '@/context/CartContext';

interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  notes: string;
}

interface OrderSuccessData {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  customer: OrderCustomer;
  courier: 'jne' | 'sicepat' | 'jnt' | 'instant';
  paymentMethod: 'qris' | 'bca_va' | 'mandiri_va' | 'cod';
  date: string;
}

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

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [orderSuccess, setOrderSuccess] = useState<OrderSuccessData | null>(null);
  const [copiedVA, setCopiedVA] = useState(false);

  // Calculations
  const shippingCost = courier === 'instant' ? 20000 : 0;
  const finalTotal = Math.max(0, totalPrice + shippingCost - discount);

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

  const handleCheckout = (e: React.FormEvent) => {
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
    setIsSubmitting(true);

    const generatedOrderNumber = `SHILL-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess({
        orderNumber: generatedOrderNumber,
        items: [...cart],
        subtotal: totalPrice,
        shippingCost,
        discount,
        total: finalTotal,
        customer: {
          fullName,
          phone,
          email,
          province,
          city,
          postalCode,
          address,
          notes,
        },
        courier,
        paymentMethod,
        date: new Date().toLocaleString('id-ID', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  // SUCCESS SCREEN
  if (orderSuccess) {
    const waText = encodeURIComponent(
      `Halo Admin SHILLSTORE, saya ingin konfirmasi pesanan saya:\n\n` +
      `*No. Pesanan:* #${orderSuccess.orderNumber}\n` +
      `*Nama Pemesan:* ${orderSuccess.customer.fullName}\n` +
      `*No. HP:* ${orderSuccess.customer.phone}\n` +
      `*Alamat:* ${orderSuccess.customer.address}, ${orderSuccess.customer.city}, ${orderSuccess.customer.province}\n` +
      `*Kurir:* ${orderSuccess.courier.toUpperCase()}\n` +
      `*Metode Bayar:* ${orderSuccess.paymentMethod.toUpperCase().replace('_', ' ')}\n` +
      `*Total Tagihan:* Rp ${orderSuccess.total.toLocaleString('id-ID')}\n\n` +
      `Mohon segera diproses. Terima kasih!`
    );

    return (
      <div className="min-h-screen bg-white text-[#111111] font-sans flex flex-col">
        {/* Minimal Header */}
        <header className="border-b border-[#E5E5E5] bg-white sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-base sm:text-lg font-black tracking-[0.22em] uppercase text-[#111111] hover:opacity-80 transition-opacity"
              >
                SHILLSTORE
              </Link>
              <span className="text-neutral-300">/</span>
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-neutral-500">
                PESANAN BERHASIL
              </span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 font-medium">
              STATUS: DITERIMA
            </span>
          </div>
        </header>

        <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium block mb-3">
              SHILLSTORE ORDER CONFIRMATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-light text-[#111111] tracking-tight mb-2">
              Pesanan Anda Telah Dibuat
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Terima kasih telah berbelanja di SHILLSTORE. Silakan selesaikan pembayaran untuk memproses pengiriman.
            </p>
            <div className="mt-4 inline-block border border-neutral-300 px-4 py-1.5 text-xs font-mono tracking-widest text-[#111111]">
              NOMOR PESANAN: #{orderSuccess.orderNumber}
            </div>
          </div>

          {/* Payment Details */}
          <div className="border border-[#E5E5E5] p-6 sm:p-8 mb-8 space-y-6">
            {orderSuccess.paymentMethod === 'qris' && (
              <div className="text-center space-y-4">
                <div className="text-xs uppercase tracking-[0.18em] font-semibold text-[#111111]">
                  PEMBAYARAN QRIS INSTAN
                </div>
                <div className="bg-white p-4 border border-[#E5E5E5] inline-block">
                  <div className="w-48 h-48 mx-auto relative flex flex-col items-center justify-center border border-dashed border-neutral-300 bg-neutral-50">
                    <div className="grid grid-cols-6 gap-1.5 p-3">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-5 h-5 ${
                            (i % 2 === 0 || i % 5 === 0) && i !== 14 && i !== 21
                              ? 'bg-black'
                              : 'bg-neutral-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="absolute bottom-1.5 text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                      SCAN QRIS
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                  Buka aplikasi mobile banking (BCA, Mandiri, BNI, BRI) atau e-wallet (GoPay, OVO, ShopeePay, DANA) lalu scan QR code di atas.
                </p>
              </div>
            )}

            {orderSuccess.paymentMethod === 'bca_va' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-[0.15em] font-semibold text-[#111111]">
                    BCA Virtual Account
                  </span>
                  <span className="text-neutral-400">Verifikasi Otomatis</span>
                </div>
                <div className="flex items-center justify-between p-3.5 border border-[#E5E5E5] bg-neutral-50">
                  <span className="font-mono text-base sm:text-lg font-bold text-[#111111] tracking-wider">
                    8077 0812 3456 7890
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('8077081234567890')}
                    className="px-4 py-1.5 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                  >
                    {copiedVA ? 'Tersalin' : 'Salin'}
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Transfer melalui menu Transfer &gt; BCA Virtual Account pada m-BCA, KlikBCA, atau ATM BCA.
                </p>
              </div>
            )}

            {orderSuccess.paymentMethod === 'mandiri_va' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-[0.15em] font-semibold text-[#111111]">
                    Mandiri Virtual Account
                  </span>
                  <span className="text-neutral-400">Verifikasi Otomatis</span>
                </div>
                <div className="flex items-center justify-between p-3.5 border border-[#E5E5E5] bg-neutral-50">
                  <span className="font-mono text-base sm:text-lg font-bold text-[#111111] tracking-wider">
                    8890 8081 2345 6789
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('8890808123456789')}
                    className="px-4 py-1.5 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                  >
                    {copiedVA ? 'Tersalin' : 'Salin'}
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Transfer melalui menu Bayar &gt; Virtual Account pada Livin&apos; by Mandiri atau ATM Mandiri.
                </p>
              </div>
            )}

            {orderSuccess.paymentMethod === 'cod' && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.15em] font-semibold text-[#111111] block">
                  Cash on Delivery (COD)
                </span>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Harap siapkan uang tunai pas sebesar <strong>Rp {orderSuccess.total.toLocaleString('id-ID')}</strong> saat kurir mengantarkan paket ke alamat Anda.
                </p>
              </div>
            )}

            {/* Order Items Review */}
            <div className="border-t border-[#E5E5E5] pt-6">
              <h3 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-neutral-400 mb-4">
                Rincian Produk
              </h3>
              <div className="divide-y divide-[#E5E5E5]">
                {orderSuccess.items.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-white border border-[#E5E5E5] shrink-0 overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#111111] line-clamp-1">{item.product.title}</p>
                        <p className="text-neutral-500 text-[11px]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#111111]">
                      Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="mt-4 pt-4 border-t border-[#E5E5E5] space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>Rp {orderSuccess.subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Pengiriman ({orderSuccess.courier.toUpperCase()})</span>
                  <span>{orderSuccess.shippingCost === 0 ? 'GRATIS' : `Rp ${orderSuccess.shippingCost.toLocaleString('id-ID')}`}</span>
                </div>
                {orderSuccess.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Potongan Diskon</span>
                    <span>-Rp {orderSuccess.discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold text-[#111111] pt-3 border-t border-[#E5E5E5]">
                  <span>Total Tagihan</span>
                  <span>Rp {orderSuccess.total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="border-t border-[#E5E5E5] pt-4 text-xs text-neutral-600 space-y-1">
              <p><strong>Penerima:</strong> {orderSuccess.customer.fullName} ({orderSuccess.customer.phone})</p>
              <p><strong>Alamat:</strong> {orderSuccess.customer.address}, {orderSuccess.customer.city}, {orderSuccess.customer.province}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/628119757222?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-12 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Konfirmasi via WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                clearCart();
                router.push('/');
              }}
              className="flex-1 h-12 border border-[#E5E5E5] hover:border-black text-[#111111] text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
            >
              Selesai &amp; Belanja Lagi
            </button>
          </div>
        </main>
      </div>
    );
  }

  // EMPTY CART SCREEN
  if (cart.length === 0) {
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
              className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-neutral-800 text-white text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              JELAJAHI KOLEKSI
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // MAIN CHECKOUT FORM
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

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans flex flex-col">
      {/* 1. Header (Clean, minimalist, no bulky security badges) */}
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
              <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
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
        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
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
            <div className="border border-[#E5E5E5] bg-[#FAFAF9] p-6 sm:p-7">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <h3 className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
                  RINGKASAN PESANAN
                </h3>
                <Link
                  href="/cart"
                  className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 hover:text-black transition-colors font-medium"
                >
                  Ubah
                </Link>
              </div>

              {/* Product Items List (1:1 aspect ratio thumbnails) */}
              <div className="divide-y divide-[#E5E5E5]/70 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-4 flex items-start gap-4">
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 bg-white border border-[#E5E5E5] shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-[13px] font-medium text-[#111111] line-clamp-2 leading-snug">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Qty {item.quantity}
                      </p>
                      <p className="text-xs font-semibold text-[#111111] mt-1.5">
                        Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-4 border-t border-[#E5E5E5]">
                <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-neutral-500 block mb-1.5">
                  Kode Promo
                </label>
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
                  <span>Pengiriman</span>
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

              {/* Submit CTA Button (Solid Premium Black) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 sm:h-13 bg-[#111111] hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-2 mt-5 rounded-[2px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>
                    BAYAR SEKARANG — Rp {finalTotal.toLocaleString('id-ID')}
                  </span>
                )}
              </button>

              {/* Small Subtle Reassurance Text */}
              <p className="text-[11px] text-neutral-500 text-center tracking-normal mt-3">
                Gratis pengiriman • Pembayaran aman • Garansi retur 7 hari
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
