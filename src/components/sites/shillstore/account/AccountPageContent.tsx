'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  joinedDate: string;
  tier: string;
}

interface OrderItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface CustomerOrder {
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  courier: string;
  trackingNumber: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
}

const defaultProfile: UserProfile = {
  fullName: 'Budi Santoso',
  email: 'budi.santoso@example.com',
  phone: '0812-3456-7890',
  address: 'Jl. Melati No. 12, RT 02 / RW 05, Blok C, Kebayoran Baru',
  city: 'Jakarta Selatan',
  province: 'DKI Jakarta',
  postalCode: '12150',
  joinedDate: 'Januari 2025',
  tier: 'SHILL Club Member',
};

const defaultOrders: CustomerOrder[] = [
  {
    orderNumber: 'SHILL-982310',
    date: '3 Oktober 2026',
    status: 'Shipped',
    courier: 'SiCepat Express',
    trackingNumber: 'SCP-10293817',
    totalAmount: 388000,
    shippingAddress: 'Jl. Melati No. 12, RT 02 / RW 05, Blok C, Kebayoran Baru, Jakarta Selatan',
    items: [
      {
        id: 'shill-perfume-bloom',
        title: 'Parfume Shillstore Bloom Eau De Parfum 100ml',
        price: 139000,
        image: '/sites/shillstore/root/images/prod-perfume-shillstore-bloom.jpg',
        quantity: 1,
        size: '100ml',
      },
      {
        id: 'shill-chino-navy',
        title: 'Shill Relax Chino Pants Navy',
        price: 249000,
        image: '/sites/shillstore/root/images/prod-chino-sirius-black.jpg',
        quantity: 1,
        size: '32',
      },
    ],
  },
  {
    orderNumber: 'SHILL-892144',
    date: '28 September 2026',
    status: 'Delivered',
    courier: 'SiCepat Express',
    trackingNumber: 'SCP-99120481',
    totalAmount: 149000,
    shippingAddress: 'Jl. Melati No. 12, RT 02 / RW 05, Blok C, Kebayoran Baru, Jakarta Selatan',
    items: [
      {
        id: 'shill-perfume-noir',
        title: 'Parfume Shillstore Noir Eau De Parfum 100ml',
        price: 149000,
        image: '/sites/shillstore/root/images/prod-perfume-shillstore-noir.jpg',
        quantity: 1,
        size: '100ml',
      },
    ],
  },
  {
    orderNumber: 'SHILL-741902',
    date: '15 September 2026',
    status: 'Delivered',
    courier: 'JNE Reguler',
    trackingNumber: 'JNE-88120349',
    totalAmount: 349000,
    shippingAddress: 'Jl. Melati No. 12, RT 02 / RW 05, Blok C, Kebayoran Baru, Jakarta Selatan',
    items: [
      {
        id: 'shill-jacket-windbreaker-army-green',
        title: 'Shill Windbreaker Jacket Army Green',
        price: 349000,
        image: '/sites/shillstore/root/images/prod-jacket-windbreaker-army-green.jpg',
        quantity: 1,
        size: 'L',
      },
    ],
  },
];

export function AccountPageContent() {
  // Authentication & View State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewMode, setViewMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // User Profile & Orders
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [orders, setOrders] = useState<CustomerOrder[]>(defaultOrders);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');

  // Edit Modals
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editProvince, setEditProvince] = useState('');
  const [editPostalCode, setEditPostalCode] = useState('');

  // Order Filter
  const [orderFilter, setOrderFilter] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered'>('All');

  // Load persisted session & profile on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('shill_customer_auth');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed.isLoggedIn) {
          setIsLoggedIn(true);
        }
      }

      const savedProfile = localStorage.getItem('shill_customer_profile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }

      const savedOrders = localStorage.getItem('shill_customer_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }

      const rememberedEmail = localStorage.getItem('shill_remembered_email');
      if (rememberedEmail) {
        setLoginEmail(rememberedEmail);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFeedbackMessage('');

    if (!loginEmail.trim()) {
      setFormError('Silakan masukkan alamat email Anda.');
      return;
    }
    if (!loginEmail.includes('@') || !loginEmail.includes('.')) {
      setFormError('Format email tidak valid.');
      return;
    }
    if (!loginPassword) {
      setFormError('Silakan masukkan kata sandi.');
      return;
    }
    if (loginPassword.length < 6) {
      setFormError('Kata sandi minimal 6 karakter.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Determine profile: if default email was used, keep defaultProfile, otherwise adapt to login input
      const updatedProfile: UserProfile = {
        ...userProfile,
        email: loginEmail.trim(),
        fullName: loginEmail.toLowerCase().includes('budi') ? 'Budi Santoso' : userProfile.fullName,
      };

      setUserProfile(updatedProfile);
      setIsLoggedIn(true);

      try {
        localStorage.setItem(
          'shill_customer_auth',
          JSON.stringify({ isLoggedIn: true, email: loginEmail.trim() })
        );
        localStorage.setItem('shill_customer_profile', JSON.stringify(updatedProfile));

        if (rememberMe) {
          localStorage.setItem('shill_remembered_email', loginEmail.trim());
        } else {
          localStorage.removeItem('shill_remembered_email');
        }
      } catch {
        // Ignore
      }

      setFeedbackMessage('Berhasil masuk ke akun Anda.');
      setTimeout(() => setFeedbackMessage(''), 4000);
    }, 700);
  };

  // Handle Register
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFeedbackMessage('');

    if (!regName.trim()) {
      setFormError('Nama lengkap wajib diisi.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@') || !regEmail.includes('.')) {
      setFormError('Email tidak valid.');
      return;
    }
    if (!regPhone.trim() || regPhone.trim().length < 9) {
      setFormError('Nomor WhatsApp minimal 9 digit.');
      return;
    }
    if (regPassword.length < 6) {
      setFormError('Kata sandi minimal 6 karakter.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setFormError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const newProfile: UserProfile = {
        fullName: regName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim(),
        address: 'Alamat belum diatur',
        city: 'Jakarta',
        province: 'DKI Jakarta',
        postalCode: '10110',
        joinedDate: 'Oktober 2026',
        tier: 'SHILL Member',
      };

      setUserProfile(newProfile);
      setIsLoggedIn(true);

      try {
        localStorage.setItem(
          'shill_customer_auth',
          JSON.stringify({ isLoggedIn: true, email: regEmail.trim() })
        );
        localStorage.setItem('shill_customer_profile', JSON.stringify(newProfile));
      } catch {
        // Ignore
      }

      setFeedbackMessage('Akun berhasil dibuat. Selamat datang di SHILLSTORE!');
      setTimeout(() => setFeedbackMessage(''), 5000);
    }, 800);
  };

  // Handle Forgot Password
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFeedbackMessage('');

    if (!forgotEmail.trim() || !forgotEmail.includes('@')) {
      setFormError('Masukkan email yang valid.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFeedbackMessage(
        `Tautan pemulihan kata sandi demo telah dikirimkan ke ${forgotEmail}. Silakan periksa kotak masuk email Anda.`
      );
      setForgotEmail('');
    }, 700);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setViewMode('login');
    setLoginPassword('');
    try {
      localStorage.removeItem('shill_customer_auth');
    } catch {
      // Ignore
    }
    setFeedbackMessage('Anda telah berhasil keluar dari akun.');
    setTimeout(() => setFeedbackMessage(''), 4000);
  };

  // Open Edit Profile
  const openEditProfile = () => {
    setEditName(userProfile.fullName);
    setEditPhone(userProfile.phone);
    setIsEditingProfile(true);
  };

  // Save Edit Profile
  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    const updated = {
      ...userProfile,
      fullName: editName.trim(),
      phone: editPhone.trim(),
    };

    setUserProfile(updated);
    setIsEditingProfile(false);
    try {
      localStorage.setItem('shill_customer_profile', JSON.stringify(updated));
    } catch {
      // Ignore
    }
    setFeedbackMessage('Profil Anda berhasil diperbarui.');
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  // Open Edit Address
  const openEditAddress = () => {
    setEditAddress(userProfile.address);
    setEditCity(userProfile.city);
    setEditProvince(userProfile.province);
    setEditPostalCode(userProfile.postalCode);
    setIsEditingAddress(true);
  };

  // Save Edit Address
  const saveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editAddress.trim()) return;

    const updated = {
      ...userProfile,
      address: editAddress.trim(),
      city: editCity.trim(),
      province: editProvince.trim(),
      postalCode: editPostalCode.trim(),
    };

    setUserProfile(updated);
    setIsEditingAddress(false);
    try {
      localStorage.setItem('shill_customer_profile', JSON.stringify(updated));
    } catch {
      // Ignore
    }
    setFeedbackMessage('Alamat pengiriman berhasil diperbarui.');
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'All') return true;
    return o.status === orderFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* Global Minimal Header */}
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-8 sm:mb-12">
          <Link href="/" className="hover:text-black transition-colors">
            BERANDA
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">ACCOUNT</span>
        </nav>

        {/* Global Feedback Banner */}
        {feedbackMessage && (
          <div className="mb-8 p-4 bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider flex items-center justify-between transition-all">
            <span>{feedbackMessage}</span>
            <button
              type="button"
              onClick={() => setFeedbackMessage('')}
              className="text-neutral-400 hover:text-white text-base ml-4 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE A: LOGGED IN (CUSTOMER ACCOUNT DASHBOARD)                             */}
        {/* ========================================================================= */}
        {isLoggedIn ? (
          <div>
            {/* Account Header / Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 mb-10 border-b border-neutral-150">
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium block mb-1">
                  MEMBER PORTAL
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-900 tracking-tight">
                  Hello, {userProfile.fullName}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Kelola akun, alamat pengiriman, dan lacak status pesanan Anda di SHILLSTORE.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-semibold text-neutral-500 hover:text-black transition-colors self-start sm:self-auto border-b border-neutral-300 hover:border-black pb-0.5 cursor-pointer"
              >
                Sign Out
              </button>
            </div>

            {/* Account Dashboard Layout (2 Columns on Desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column (5 cols): Profile & Shipping Address */}
              <div className="lg:col-span-5 space-y-10">
                {/* 1. Profile Information */}
                <div className="border border-neutral-200 p-6 sm:p-7 bg-white">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-150">
                    <h2 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                      Informasi Profil
                    </h2>
                    <button
                      type="button"
                      onClick={openEditProfile}
                      className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 hover:text-black font-medium transition-colors border-b border-neutral-300 hover:border-black pb-0.5 cursor-pointer"
                    >
                      Edit Profile
                    </button>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 block mb-0.5">
                        Nama Lengkap
                      </span>
                      <span className="font-medium text-neutral-900">{userProfile.fullName}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 block mb-0.5">
                        Email
                      </span>
                      <span className="font-medium text-neutral-900">{userProfile.email}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 block mb-0.5">
                        No. WhatsApp / HP
                      </span>
                      <span className="font-medium text-neutral-900">{userProfile.phone}</span>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Status Keanggotaan</span>
                      <span className="font-semibold text-neutral-900 border border-neutral-200 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                        {userProfile.tier}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Primary Shipping Address */}
                <div className="border border-neutral-200 p-6 sm:p-7 bg-white">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-150">
                    <h2 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                      Alamat Pengiriman
                    </h2>
                    <button
                      type="button"
                      onClick={openEditAddress}
                      className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 hover:text-black font-medium transition-colors border-b border-neutral-300 hover:border-black pb-0.5 cursor-pointer"
                    >
                      Ubah Alamat
                    </button>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    <p className="font-medium text-neutral-900">{userProfile.fullName}</p>
                    <p>{userProfile.address}</p>
                    <p>
                      {userProfile.city}, {userProfile.province} {userProfile.postalCode}
                    </p>
                    <p className="text-neutral-500 pt-1 text-xs">Telp: {userProfile.phone}</p>
                  </div>
                </div>

                {/* Subtle reassurance box */}
                <div className="p-4 border border-dashed border-neutral-200 text-xs text-neutral-500 leading-relaxed space-y-1">
                  <p className="font-medium text-neutral-900">Butuh Bantuan Pesanan?</p>
                  <p>
                    Hubungi Customer Service SHILLSTORE via WhatsApp di{' '}
                    <strong className="text-neutral-800">0811-9757-222</strong> (Senin–Minggu, 09.00–21.00 WIB).
                  </p>
                </div>
              </div>

              {/* Right Column (7 cols): Order History */}
              <div className="lg:col-span-7">
                <div className="border border-neutral-200 p-6 sm:p-8 bg-[#FAFAF9]">
                  {/* Header & Filter Tabs */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-neutral-200">
                    <div>
                      <h2 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                        Riwayat Pesanan
                      </h2>
                      <span className="text-[11px] text-neutral-500">
                        {orders.length} transaksi tercatat
                      </span>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex items-center gap-2 overflow-x-auto text-[10px] uppercase tracking-wider font-semibold">
                      {(['All', 'Processing', 'Shipped', 'Delivered'] as const).map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setOrderFilter(status)}
                          className={`px-2.5 py-1 transition-colors cursor-pointer shrink-0 ${
                            orderFilter === status
                              ? 'bg-black text-white'
                              : 'bg-white text-neutral-600 border border-neutral-200 hover:border-black'
                          }`}
                        >
                          {status === 'All' ? 'Semua' : status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orders List */}
                  {filteredOrders.length === 0 ? (
                    <div className="py-12 text-center text-xs text-neutral-500">
                      Tidak ada pesanan dengan status &ldquo;{orderFilter}&rdquo;.
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredOrders.map((order) => (
                        <div
                          key={order.orderNumber}
                          className="bg-white border border-neutral-200 p-5 sm:p-6 transition-all"
                        >
                          {/* Order Header Row */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-100 text-xs">
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold tracking-wider text-neutral-900">
                                #{order.orderNumber}
                              </span>
                              <span className="text-neutral-400">•</span>
                              <span className="text-neutral-500">{order.date}</span>
                            </div>

                            {/* Status Tag */}
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 border ${
                                order.status === 'Delivered'
                                  ? 'border-neutral-900 bg-neutral-900 text-white'
                                  : order.status === 'Shipped'
                                  ? 'border-blue-300 bg-blue-50 text-blue-900'
                                  : 'border-amber-300 bg-amber-50 text-amber-900'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>

                          {/* Items List */}
                          <div className="divide-y divide-neutral-100">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="py-3 flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="relative w-12 h-12 bg-[#f8f8f8] border border-neutral-150 shrink-0 overflow-hidden">
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

                          {/* Order Footer & Tracking */}
                          <div className="pt-3 mt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="text-[11px] text-neutral-500 font-mono">
                              {order.courier} • Resi: {order.trackingNumber}
                            </span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-[11px] text-neutral-500 uppercase tracking-wider">
                                Total:
                              </span>
                              <span className="font-semibold text-neutral-900 text-sm">
                                Rp {order.totalAmount.toLocaleString('id-ID')}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal: Edit Profile */}
            {isEditingProfile && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs">
                <div className="bg-white border border-neutral-200 max-w-md w-full p-6 sm:p-8 shadow-xl">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-150">
                    <h3 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                      Edit Profile
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="text-neutral-400 hover:text-black cursor-pointer text-lg"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={saveProfile} className="space-y-4 text-xs">
                    <div>
                      <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full h-11 px-3.5 border border-neutral-200 focus:outline-none focus:border-black rounded-[2px]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                        Nomor WhatsApp / HP
                      </label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full h-11 px-3.5 border border-neutral-200 focus:outline-none focus:border-black rounded-[2px]"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="submit"
                        className="flex-1 h-11 bg-black text-white text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        Simpan Perubahan
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="h-11 px-4 border border-neutral-200 text-neutral-600 hover:text-black text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Edit Shipping Address */}
            {isEditingAddress && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs">
                <div className="bg-white border border-neutral-200 max-w-lg w-full p-6 sm:p-8 shadow-xl">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-150">
                    <h3 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                      Ubah Alamat Pengiriman
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="text-neutral-400 hover:text-black cursor-pointer text-lg"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={saveAddress} className="space-y-4 text-xs">
                    <div>
                      <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                        Alamat Lengkap
                      </label>
                      <textarea
                        rows={2}
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full p-3.5 border border-neutral-200 focus:outline-none focus:border-black rounded-[2px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                          Kota / Kabupaten
                        </label>
                        <input
                          type="text"
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                          className="w-full h-11 px-3.5 border border-neutral-200 focus:outline-none focus:border-black rounded-[2px]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                          Provinsi
                        </label>
                        <input
                          type="text"
                          value={editProvince}
                          onChange={(e) => setEditProvince(e.target.value)}
                          className="w-full h-11 px-3.5 border border-neutral-200 focus:outline-none focus:border-black rounded-[2px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-600 block mb-1.5">
                        Kode Pos
                      </label>
                      <input
                        type="text"
                        value={editPostalCode}
                        onChange={(e) => setEditPostalCode(e.target.value)}
                        className="w-full h-11 px-3.5 border border-neutral-200 focus:outline-none focus:border-black rounded-[2px]"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="submit"
                        className="flex-1 h-11 bg-black text-white text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        Simpan Alamat
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingAddress(false)}
                        className="h-11 px-4 border border-neutral-200 text-neutral-600 hover:text-black text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* CASE B: GUEST / NOT LOGGED IN (SIGN IN / REGISTER / FORGOT PASSWORD)      */
          /* ========================================================================= */
          <div className="max-w-md mx-auto py-4 sm:py-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight mb-2">
                My Account
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500">
                Kelola akun dan pesanan Anda di SHILLSTORE.
              </p>
            </div>

            {/* Error Banner */}
            {formError && (
              <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-[2px]">
                {formError}
              </div>
            )}

            {/* ======================= MODE 1: SIGN IN ======================= */}
            {viewMode === 'login' && (
              <div>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-1.5">
                      Email <span className="text-neutral-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="nama@example.com"
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-[2px] focus:outline-none focus:border-black placeholder:text-neutral-400"
                      required
                    />
                  </div>

                  {/* Password Input with Show/Hide */}
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-1.5">
                      Password <span className="text-neutral-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 sm:h-12 px-3.5 pr-14 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-[2px] focus:outline-none focus:border-black placeholder:text-neutral-400 font-mono"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-wider font-semibold text-neutral-400 hover:text-black transition-colors cursor-pointer"
                      >
                        {showLoginPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password Row */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="accent-black rounded-[2px]"
                      />
                      <span>Remember Me</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setFormError('');
                        setViewMode('forgot');
                      }}
                      className="text-neutral-500 hover:text-black underline transition-colors cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-black hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2 rounded-[2px]"
                  >
                    {isSubmitting ? 'Memproses...' : 'Sign In'}
                  </button>
                </form>

                {/* OR Separator */}
                <div className="relative my-7 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200" />
                  </div>
                  <span className="relative bg-white px-3 text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                    OR
                  </span>
                </div>

                {/* Create Account Button */}
                <button
                  type="button"
                  onClick={() => {
                    setFormError('');
                    setViewMode('register');
                  }}
                  className="w-full h-12 border border-black text-black hover:bg-neutral-50 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer flex items-center justify-center rounded-[2px]"
                >
                  Create Account
                </button>

                {/* Demo Hint */}
                <div className="mt-8 text-center text-[11px] text-neutral-400 leading-relaxed">
                  <p>Sistem akun demo antarmuka.</p>
                  <p>Gunakan email apa pun atau daftar akun baru untuk menguji fitur.</p>
                </div>
              </div>
            )}

            {/* ======================= MODE 2: REGISTER ======================= */}
            {viewMode === 'register' && (
              <div>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-1.5">
                      Nama Lengkap <span className="text-neutral-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Budi Santoso"
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-[2px] focus:outline-none focus:border-black placeholder:text-neutral-400"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-1.5">
                      Email <span className="text-neutral-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="nama@example.com"
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-[2px] focus:outline-none focus:border-black placeholder:text-neutral-400"
                      required
                    />
                  </div>

                  {/* WhatsApp / Phone */}
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-1.5">
                      No. WhatsApp / HP <span className="text-neutral-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="081234567890"
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-[2px] focus:outline-none focus:border-black placeholder:text-neutral-400"
                      required
                    />
                  </div>

                  {/* Password with Show/Hide */}
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-1.5">
                      Kata Sandi <span className="text-neutral-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        className="w-full h-11 sm:h-12 px-3.5 pr-14 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-[2px] focus:outline-none focus:border-black placeholder:text-neutral-400 font-mono"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-wider font-semibold text-neutral-400 hover:text-black transition-colors cursor-pointer"
                      >
                        {showRegPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-1.5">
                      Konfirmasi Kata Sandi <span className="text-neutral-400">*</span>
                    </label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi"
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-[2px] focus:outline-none focus:border-black placeholder:text-neutral-400 font-mono"
                      required
                    />
                  </div>

                  {/* Register Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-black hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2 rounded-[2px]"
                  >
                    {isSubmitting ? 'Mendaftarkan...' : 'Create Account'}
                  </button>
                </form>

                {/* Back to Sign In */}
                <div className="mt-6 text-center text-xs text-neutral-600">
                  Sudah memiliki akun?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setFormError('');
                      setViewMode('login');
                    }}
                    className="font-semibold text-black underline hover:text-neutral-600 transition-colors cursor-pointer ml-1"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}

            {/* ======================= MODE 3: FORGOT PASSWORD ======================= */}
            {viewMode === 'forgot' && (
              <div>
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-1.5">
                      Alamat Email Terdaftar <span className="text-neutral-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="nama@example.com"
                      className="w-full h-11 sm:h-12 px-3.5 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-[2px] focus:outline-none focus:border-black placeholder:text-neutral-400"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-black hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 rounded-[2px]"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Reset Password'}
                  </button>
                </form>

                <div className="mt-6 text-center text-xs text-neutral-600">
                  <button
                    type="button"
                    onClick={() => {
                      setFormError('');
                      setViewMode('login');
                    }}
                    className="font-semibold text-black underline hover:text-neutral-600 transition-colors cursor-pointer"
                  >
                    Kembali ke Sign In
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Minimal Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
