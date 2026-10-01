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
      setVoucherError('Kode voucher tidak valid atau sudah kedaluwarsa.');
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
    if (!address.trim()) errors.address = 'Alamat pengiriman wajib diisi';

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
    }, 900);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  // SUCCESS SCREEN
  if (orderSuccess) {
    const waText = encodeURIComponent(
      `Halo Admin Shill Store, saya ingin konfirmasi pembayaran pesanan saya:\n\n` +
      `*No. Pesanan:* #${orderSuccess.orderNumber}\n` +
      `*Nama Pemesan:* ${orderSuccess.customer.fullName}\n` +
      `*No. HP:* ${orderSuccess.customer.phone}\n` +
      `*Alamat:* ${orderSuccess.customer.address}, ${orderSuccess.customer.city}, ${orderSuccess.customer.province}\n` +
      `*Kurir:* ${orderSuccess.courier.toUpperCase()}\n` +
      `*Metode Bayar:* ${orderSuccess.paymentMethod.toUpperCase().replace('_', ' ')}\n` +
      `*Total Tagihan:* Rp ${orderSuccess.total.toLocaleString('id-ID')}\n\n` +
      `Mohon segera diproses dan dikirimkan resinya. Terima kasih banyak!`
    );

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-[#121212]">
        {/* Simple Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-30">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="relative block w-36 h-8">
              <Image src="/logo.png" alt="Shill Logo" fill className="object-contain object-left" priority />
            </Link>
            <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Pesanan Diterima
            </span>
          </div>
        </header>

        <main className="flex-1 py-10 px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Success Banner */}
            <div className="bg-[#121212] text-white p-8 text-center relative overflow-hidden">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                ✓
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold uppercase font-koulen tracking-wider">
                Pesanan Berhasil Dibuat!
              </h1>
              <p className="text-xs text-gray-300 mt-2">
                Terima kasih telah berbelanja di Shill Store. Pesananmu sedang kami siapkan.
              </p>
              <div className="mt-4 inline-block bg-white/10 px-4 py-1.5 rounded-lg border border-white/20 text-xs font-mono font-bold tracking-wider">
                Nomor Pesanan: {orderSuccess.orderNumber}
              </div>
            </div>

            {/* Payment Instructions Box */}
            <div className="p-6 md:p-8 space-y-6">
              {orderSuccess.paymentMethod === 'qris' && (
                <div className="bg-rose-50/50 border border-red-100 rounded-xl p-6 text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-extrabold text-sm uppercase tracking-wider text-red-600">
                      Pembayaran QRIS Instant
                    </span>
                    <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded">
                      Semua E-Wallet &amp; Bank
                    </span>
                  </div>

                  {/* QRIS Code Visualization */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 inline-block shadow-xs">
                    <div className="w-48 h-48 mx-auto relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                      {/* Stylized QR representation */}
                      <div className="grid grid-cols-6 gap-1.5 p-3">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded-xs ${
                              (i % 2 === 0 || i % 5 === 0) && i !== 14 && i !== 21
                                ? 'bg-black'
                                : 'bg-gray-100'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="absolute bottom-1 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                        Scan QRIS Shill
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                    Buka aplikasi <strong>BCA Mobile, Mandiri Livin, GoPay, OVO, ShopeePay, atau DANA</strong>, lalu scan kode QR di atas untuk menyelesaikan pembayaran otomatis.
                  </p>
                </div>
              )}

              {orderSuccess.paymentMethod === 'bca_va' && (
                <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-blue-900">BCA Virtual Account</span>
                    <span className="text-xs font-mono text-gray-500">Otomatis Terverifikasi</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-white border border-blue-200 rounded-lg">
                    <span className="font-mono text-lg font-extrabold text-blue-950 tracking-wider">
                      8077 0812 3456 7890
                    </span>
                    <button
                      onClick={() => copyToClipboard('8077081234567890')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-colors cursor-pointer"
                    >
                      {copiedVA ? 'Tersalin! ✓' : 'Salin'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">
                    Gunakan menu Transfer &gt; BCA Virtual Account pada m-BCA atau ATM BCA.
                  </p>
                </div>
              )}

              {orderSuccess.paymentMethod === 'mandiri_va' && (
                <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-amber-900">Mandiri Virtual Account</span>
                    <span className="text-xs font-mono text-gray-500">Otomatis Terverifikasi</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-white border border-amber-200 rounded-lg">
                    <span className="font-mono text-lg font-extrabold text-amber-950 tracking-wider">
                      8890 8081 2345 6789
                    </span>
                    <button
                      onClick={() => copyToClipboard('8890808123456789')}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded transition-colors cursor-pointer"
                    >
                      {copiedVA ? 'Tersalin! ✓' : 'Salin'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">
                    Gunakan menu Bayar &gt; Virtual Account pada aplikasi Livin&apos; by Mandiri atau ATM.
                  </p>
                </div>
              )}

              {orderSuccess.paymentMethod === 'cod' && (
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-6 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <span>💵 Bayar di Tempat (COD)</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Mohon persiapkan uang tunai pas sebesar <strong>Rp {orderSuccess.total.toLocaleString('id-ID')}</strong> saat kurir mengantarkan paket ke alamat Anda.
                  </p>
                </div>
              )}

              {/* Order Items Summary */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                  Rincian Produk
                </h3>
                <div className="divide-y divide-gray-100">
                  {orderSuccess.items.map((item) => (
                    <div key={item.product.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{item.product.title}</p>
                          <p className="text-gray-500">Jumlah: {item.quantity} pcs</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">
                        Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rp {orderSuccess.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Ongkos Kirim ({orderSuccess.courier.toUpperCase()})</span>
                    <span>{orderSuccess.shippingCost === 0 ? 'GRATIS' : `Rp ${orderSuccess.shippingCost.toLocaleString('id-ID')}`}</span>
                  </div>
                  {orderSuccess.discount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Potongan Diskon</span>
                      <span>-Rp {orderSuccess.discount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-extrabold text-black pt-2 border-t border-gray-100">
                    <span>Total Pembayaran</span>
                    <span className="text-red-600 text-base">
                      Rp {orderSuccess.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 p-4 rounded-xl text-xs space-y-1 text-gray-600">
                <p><strong>Penerima:</strong> {orderSuccess.customer.fullName} ({orderSuccess.customer.phone})</p>
                <p><strong>Alamat:</strong> {orderSuccess.customer.address}, {orderSuccess.customer.city}, {orderSuccess.customer.province}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <a
                  href={`https://wa.me/628119757222?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Konfirmasi via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    clearCart();
                    router.push('/');
                  }}
                  className="w-full py-3.5 bg-black hover:bg-gray-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Selesai &amp; Belanja Lagi
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // EMPTY CART SCREEN
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-[#121212]">
        <header className="bg-white border-b border-gray-200 py-4 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="relative block w-36 h-8">
              <Image src="/logo.png" alt="Shill Logo" fill className="object-contain object-left" priority />
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xs border border-gray-200 text-center max-w-md w-full space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-2xl">
              🛒
            </div>
            <h1 className="text-xl font-bold uppercase font-koulen tracking-wider text-gray-900">
              Keranjang Belanja Kosong
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              Anda belum menambahkan produk ke keranjang belanja. Silakan pilih produk terbaik kami terlebih dahulu.
            </p>
            <Link
              href="/collections"
              className="inline-block w-full py-3.5 bg-black hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
            >
              Mulai Belanja
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // MAIN CHECKOUT FORM
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-[#121212]">
      {/* Checkout Minimal Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="relative block w-32 sm:w-44 h-8">
              <Image src="/logo.png" alt="Shill Logo" fill className="object-contain object-left" priority />
            </Link>
            <span className="hidden sm:inline-block text-gray-300">|</span>
            <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-gray-500">
              Checkout Resmi
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-gray-600">
            <span className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
              🔒 <span className="hidden sm:inline">Pembayaran</span> 256-Bit SSL
            </span>
            <Link href="/cart" className="hover:text-black underline text-xs">
              Kembali ke Keranjang
            </Link>
          </div>
        </div>
      </header>

      {/* Main Form Body */}
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Customer Info, Shipping & Payment */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Customer Info */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Informasi Pembeli &amp; Kontak
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition-all ${
                        formErrors.fullName ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                      }`}
                    />
                    {formErrors.fullName && (
                      <span className="text-[11px] text-red-500 mt-1 block">{formErrors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      No. WhatsApp / HP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="081234567890"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition-all ${
                        formErrors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-red-500 mt-1 block">{formErrors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Email (Opsional untuk resi)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="budi@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Alamat Pengiriman
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Provinsi
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition-all"
                    >
                      <option value="DKI Jakarta">DKI Jakarta</option>
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="Banten">Banten</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                      <option value="DI Yogyakarta">DI Yogyakarta</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                      <option value="Bali">Bali</option>
                      <option value="Sumatera Utara">Sumatera Utara</option>
                      <option value="Sumatera Selatan">Sumatera Selatan</option>
                      <option value="Kalimantan Selatan">Kalimantan Selatan</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Kota / Kabupaten
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Contoh: Jakarta Selatan / Bekasi / Bandung"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Alamat Lengkap (Jalan, RT/RW, No. Rumah, Patokan) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Jl. Melati No. 12, RT 02 / RW 05, Blok C, Dekat Masjid Al-Ikhlas"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition-all ${
                        formErrors.address ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                      }`}
                    />
                    {formErrors.address && (
                      <span className="text-[11px] text-red-500 mt-1 block">{formErrors.address}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Kode Pos (Opsional)
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="12345"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Catatan Pengiriman (Opsional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Contoh: Titipkan ke satpam"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Courier Options */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Opsi Ekspedisi Pengiriman
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    onClick={() => setCourier('sicepat')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      courier === 'sicepat'
                        ? 'border-black bg-gray-50 ring-1 ring-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="courier"
                        checked={courier === 'sicepat'}
                        onChange={() => setCourier('sicepat')}
                        className="accent-black"
                      />
                      <div>
                        <span className="text-xs font-bold block text-gray-900">SiCepat Express</span>
                        <span className="text-[11px] text-gray-500">Estimasi 1-2 Hari</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-green-600">GRATIS</span>
                  </label>

                  <label
                    onClick={() => setCourier('jne')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      courier === 'jne'
                        ? 'border-black bg-gray-50 ring-1 ring-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="courier"
                        checked={courier === 'jne'}
                        onChange={() => setCourier('jne')}
                        className="accent-black"
                      />
                      <div>
                        <span className="text-xs font-bold block text-gray-900">JNE Reguler</span>
                        <span className="text-[11px] text-gray-500">Estimasi 2-3 Hari</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-green-600">GRATIS</span>
                  </label>

                  <label
                    onClick={() => setCourier('jnt')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      courier === 'jnt'
                        ? 'border-black bg-gray-50 ring-1 ring-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="courier"
                        checked={courier === 'jnt'}
                        onChange={() => setCourier('jnt')}
                        className="accent-black"
                      />
                      <div>
                        <span className="text-xs font-bold block text-gray-900">J&amp;T Express</span>
                        <span className="text-[11px] text-gray-500">Estimasi 2-3 Hari</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-green-600">GRATIS</span>
                  </label>

                  <label
                    onClick={() => setCourier('instant')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      courier === 'instant'
                        ? 'border-black bg-gray-50 ring-1 ring-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="courier"
                        checked={courier === 'instant'}
                        onChange={() => setCourier('instant')}
                        className="accent-black"
                      />
                      <div>
                        <span className="text-xs font-bold block text-gray-900">Kurir Instant</span>
                        <span className="text-[11px] text-gray-500">Sampai Hari Ini</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-gray-900">Rp 20.000</span>
                  </label>
                </div>
              </div>

              {/* 4. Payment Methods */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Metode Pembayaran
                  </h2>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'qris'
                        ? 'border-black bg-gray-50 ring-1 ring-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'qris'}
                        onChange={() => setPaymentMethod('qris')}
                        className="accent-black"
                      />
                      <div>
                        <span className="text-xs font-bold text-gray-900 flex items-center gap-2">
                          QRIS (BCA, GoPay, OVO, ShopeePay, Dana)
                          <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded">
                            Instan
                          </span>
                        </span>
                        <span className="text-[11px] text-gray-500 block mt-0.5">
                          Scan barcode langsung dari semua mobile banking &amp; e-wallet
                        </span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('bca_va')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'bca_va'
                        ? 'border-black bg-gray-50 ring-1 ring-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bca_va'}
                        onChange={() => setPaymentMethod('bca_va')}
                        className="accent-black"
                      />
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">
                          BCA Virtual Account
                        </span>
                        <span className="text-[11px] text-gray-500 block mt-0.5">
                          Transfer melalui ATM BCA, KlikBCA, atau m-BCA
                        </span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('mandiri_va')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'mandiri_va'
                        ? 'border-black bg-gray-50 ring-1 ring-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'mandiri_va'}
                        onChange={() => setPaymentMethod('mandiri_va')}
                        className="accent-black"
                      />
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">
                          Mandiri Virtual Account
                        </span>
                        <span className="text-[11px] text-gray-500 block mt-0.5">
                          Transfer melalui Livin&apos; by Mandiri atau ATM Mandiri
                        </span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-black bg-gray-50 ring-1 ring-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-black"
                      />
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] text-gray-500 block mt-0.5">
                          Bayar tunai di tempat saat kurir mengantar pesanan ke rumah Anda
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Order Summary & Sticky CTA */}
            <div className="lg:col-span-5 sticky top-24 space-y-5">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Ringkasan Pesanan ({cart.length} Produk)
                  </h3>
                  <Link href="/cart" className="text-xs text-red-600 hover:underline font-semibold">
                    Ubah
                  </Link>
                </div>

                {/* Items List */}
                <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-200">
                          <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{item.product.title}</p>
                          <p className="text-gray-400 mt-0.5">{item.product.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500 font-medium">Qty: {item.quantity}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-700 font-bold">
                              Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Voucher Box */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      placeholder="Kode Promo (SHILL30)"
                      className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white uppercase font-bold focus:outline-none focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={applyVoucher}
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Pakai
                    </button>
                  </div>
                  {appliedVoucher && (
                    <p className="text-[11px] text-green-600 font-semibold mt-1.5 flex items-center gap-1">
                      ✓ Voucher {appliedVoucher} berhasil digunakan!
                    </p>
                  )}
                  {voucherError && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1.5">
                      {voucherError}
                    </p>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal Produk</span>
                    <span className="font-bold text-gray-900">
                      Rp {totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Ongkos Kirim ({courier.toUpperCase()})</span>
                    <span className="font-bold text-green-600">
                      {shippingCost === 0 ? 'GRATIS' : `Rp ${shippingCost.toLocaleString('id-ID')}`}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Potongan Diskon</span>
                      <span>-Rp {discount.toLocaleString('id-ID')}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-gray-900 uppercase">Total Tagihan</span>
                    <span className="text-xl font-extrabold text-[#ff1b2d]">
                      Rp {finalTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Submit Checkout Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#ff1b2d] hover:bg-[#e70011] disabled:bg-gray-400 text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Memproses Pesanan...</span>
                    </>
                  ) : (
                    <span>Bayar Sekarang (Rp {finalTotal.toLocaleString('id-ID')})</span>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-500 text-center">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    ✨ <strong>100% Original</strong> Shill
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    🔄 <strong>Garansi Return</strong> 7 Hari
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
