'use client';

import React, { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !email) return;
    setSubmitted(true);
  };

  return (
    <section className="my-6">
      <div
        className="relative bg-cover bg-center py-16 md:py-24"
        style={{
          backgroundImage:
            'url(/sites/erigostore-co-id/root/images/newsletter-bg.png)',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs" />

        <div className="relative page-width flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 z-10">
          {/* Left Title */}
          <div className="flex-1 text-white text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Tren Casual Fashion Terus Berkembang.{' '}
              <span className="text-[#ffbb00]">Jangan mau ketinggalan!</span>
            </h2>
          </div>

          {/* Right Form */}
          <div className="w-full md:max-w-md bg-black/80 p-6 md:p-8 rounded-2xl border border-white/10 text-white">
            <h3 className="text-sm font-semibold text-gray-200 mb-4 leading-relaxed">
              Jadi yang pertama tahu produk terbaru Erigo dan promo seru lainnya! Daftarkan emailmu di sini
            </h3>

            {submitted ? (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-center space-y-2">
                <span className="text-2xl">🎉</span>
                <p className="text-sm font-bold text-white">
                  Terima Kasih! Anda Berhasil Berlangganan Newsletter.
                </p>
                <p className="text-xs text-gray-300">
                  Cek email Anda untuk kode voucher diskon eksklusif.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan alamat email Anda"
                    required
                    className="w-full px-4 py-3 bg-white text-black placeholder:text-gray-400 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff1b2d]"
                  />
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="accept_marketing"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500 cursor-pointer"
                  />
                  <label
                    htmlFor="accept_marketing"
                    className="text-xs text-gray-300 select-none cursor-pointer leading-relaxed"
                  >
                    Saya bersedia menerima email newsletter Erigo dan telah membaca Kebijakan Privasi
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreed}
                  className={`w-full py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    agreed
                      ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-md'
                      : 'bg-red-600/40 text-white/50 cursor-not-allowed'
                  }`}
                >
                  Kirim
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
