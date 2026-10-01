'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Header } from '@/components/sites/shillstore/root/Header';
import { Footer } from '@/components/sites/shillstore/root/Footer';
import { CartDrawer } from '@/components/sites/shillstore/root/CartDrawer';
import { SearchModal } from '@/components/sites/shillstore/root/SearchModal';
import { productsData } from '@/data/shill-data';
import { Product } from '@/types/shill';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);

  return <ProductDetailContent handle={handle} />;
}

interface PerfumeDetail {
  name: string;
  tagline: string;
  type: string;
  volume: string;
  longevity: string;
  character: string;
  top: string;
  middle: string;
  base: string;
}

const perfumeProfiles: Record<string, PerfumeDetail> = {
  'shillstore-noir': {
    name: 'Shillstore Noir',
    tagline: 'dirancang untuk pria dan wanita yang mendambakan wewangian berkarakter bold, percaya diri, dan tak lekang oleh waktu (Bold, Confident, Timeless).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Warm Spicy, Woody, Citrus & Musky',
    top: 'Bergamot, Black Pepper',
    middle: 'Lavender, Cedarwood',
    base: 'Amber, Musk',
  },
  'shillstore-bloom': {
    name: 'Shillstore Bloom',
    tagline: 'hadir dengan aroma floral menyegarkan yang memancarkan pesona keanggunan, kelembutan, dan nuansa ceria (Fresh, Floral, Elegant).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Fresh, Floral & Elegant',
    top: 'Pear, Citrus',
    middle: 'Peony, Jasmine',
    base: 'Musk, Vanilla',
  },
  'shillstore-ocean': {
    name: 'Shillstore Ocean',
    tagline: 'membawa kesegaran deburan angin laut dan sentuhan citrus akuatik yang membangkitkan energi dan semangat sepanjang hari (Fresh, Aquatic, Energetic).',
    type: 'Eau De Toilette (EDT)',
    volume: '100 ML',
    longevity: '6 - 8 Jam (Fresh Daily Scent)',
    character: 'Fresh, Aquatic & Energetic',
    top: 'Bergamot, Lemon',
    middle: 'Marine, Lavender',
    base: 'Cedarwood, Amber',
  },
  'shillstore-legacy': {
    name: 'Shillstore Legacy',
    tagline: 'menghadirkan kehangatan aroma rempah dan kayu yang kaya, berkarakter karismatik dan memikat (Rich, Warm, Charismatic).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Rich, Warm Spicy & Charismatic',
    top: 'Cardamom, Cinnamon',
    middle: 'Tonka Bean, Cedarwood',
    base: 'Amber, Vanilla',
  },
  'shillstore-velo': {
    name: 'Shillstore Vélo',
    tagline: 'menampilkan harmoni aroma segar modern yang minimalis, versatile, dan cocok untuk segala suasana (Minimal, Modern, Versatile).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Minimal, Modern & Versatile',
    top: 'Bergamot, Green Notes',
    middle: 'Orris, Violet',
    base: 'Musk, Sandalwood',
  },
  'shillstore-velvet': {
    name: 'Shillstore Velvet',
    tagline: 'memberikan pesona keharuman sensual yang mewah, elegan, dan tak terlupakan (Sensual, Luxury, Unforgettable).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Sensual, Luxury, Fruity Floral & Unforgettable',
    top: 'Raspberry, Saffron',
    middle: 'Rose, Jasmine',
    base: 'Patchouli, Amber',
  },
};

function ProductDetailContent({ handle }: { handle: string }) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();

  // Find product by matching handle in link or title
  const product: Product = productsData.find(
    (p) => p.link.includes(handle) || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(handle)
  ) || {
    id: 'p-custom',
    title: handle
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    category: 'Apparel',
    price: 183000,
    formattedPrice: 'Rp 183.000',
    compareAtPrice: 350000,
    formattedCompareAtPrice: 'Rp 350.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-chino-sirius-black.jpg'],
    link: `/products/${handle}`,
    rating: 4.9,
    reviewCount: 520,
    isNew: true,
  };

  const isPerfume = product.category === 'Parfum';
  const perfumeInfo =
    (product.id === 'shill-perfume-bloom' || handle.includes('bloom'))
      ? perfumeProfiles['shillstore-bloom']
      : (product.id === 'shill-perfume-ocean' || handle.includes('ocean'))
      ? perfumeProfiles['shillstore-ocean']
      : (product.id === 'shill-perfume-legacy' || handle.includes('legacy'))
      ? perfumeProfiles['shillstore-legacy']
      : (product.id === 'shill-perfume-velo' || handle.includes('velo'))
      ? perfumeProfiles['shillstore-velo']
      : (product.id === 'shill-perfume-velvet' || handle.includes('velvet'))
      ? perfumeProfiles['shillstore-velvet']
      : perfumeProfiles['shillstore-noir'];

  const sizes = product.sizes || (isPerfume ? ['100ml'] : ['S', 'M', 'L', 'XL', 'XXL']);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'size' | 'shipping'>('desc');

  const relatedProducts = productsData.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#121212]">
      <Header />

      <main className="flex-1 py-8">
        <div className="page-width">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-black transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-black transition-colors">
              Produk
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900 line-clamp-1">{product.title}</span>
          </nav>

          {/* Product Hero Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery Left */}
            <div className="flex flex-col gap-4">
              <div
                className={`relative aspect-square w-full rounded-2xl overflow-hidden border border-gray-100 shadow-xs ${
                  handle.includes('bloom')
                    ? 'bg-[#fcf5f3]'
                    : handle.includes('ocean')
                    ? 'bg-[#eef7fc]'
                    : handle.includes('legacy')
                    ? 'bg-[#26130b]'
                    : handle.includes('velo')
                    ? 'bg-[#383a3d]'
                    : handle.includes('velvet')
                    ? 'bg-[#2d0a12]'
                    : isPerfume
                    ? 'bg-[#121212]'
                    : 'bg-gray-50'
                }`}
              >
                {product.discountBadge && (
                  <span className="absolute top-4 left-4 z-10 bg-[#ff1b2d] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.discountBadge}
                  </span>
                )}
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Product Details Right */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#ff1b2d] block mb-2">
                  {product.category}
                </span>

                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-amber-400 text-sm">★★★★★</div>
                  <span className="text-xs font-semibold text-gray-700">{product.rating || 4.9}</span>
                  <span className="text-xs text-gray-400">({product.reviewCount || 340} ulasan)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl mb-6">
                  <span className="text-2xl md:text-3xl font-extrabold text-[#ff1b2d]">
                    Rp {(product.price * quantity).toLocaleString('id-ID')}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm md:text-base text-gray-400 line-through">
                      Rp {(product.compareAtPrice * quantity).toLocaleString('id-ID')}
                    </span>
                  )}
                  {quantity > 1 && (
                    <span className="text-xs text-gray-500 font-medium">
                      ({product.formattedPrice} x {quantity})
                    </span>
                  )}
                  <span className="ml-auto text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                    Hemat hingga 45%
                  </span>
                </div>

                {/* Size Selector */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-800">
                      Ukuran: <span className="text-black font-extrabold">{selectedSize}</span>
                    </label>
                    <button
                      onClick={() => setActiveTab('size')}
                      className="text-xs text-red-600 hover:underline font-medium"
                    >
                      {isPerfume ? 'Fragrance Notes' : 'Panduan Ukuran'}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-12 h-12 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-black text-white border-black shadow-xs'
                            : 'bg-white text-gray-800 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-800 block mb-3">
                    Jumlah:
                  </label>
                  <div className="flex items-center w-36 border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2.5 text-gray-600 hover:bg-gray-100 font-bold"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3.5 py-2.5 text-gray-600 hover:bg-gray-100 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                    }}
                    className="flex-1 py-4 bg-black hover:bg-gray-800 text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Tambah ke Keranjang
                  </button>

                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      setIsCartOpen(false);
                      router.push('/checkout');
                    }}
                    className="flex-1 py-4 bg-[#ff1b2d] hover:bg-[#e70011] text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>

              {/* Accordion Tabs */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex border-b border-gray-100 pb-3 gap-6 text-sm font-bold uppercase tracking-wider">
                  <button
                    onClick={() => setActiveTab('desc')}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === 'desc'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-400 hover:text-black'
                    }`}
                  >
                    Deskripsi
                  </button>
                  <button
                    onClick={() => setActiveTab('size')}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === 'size'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-400 hover:text-black'
                    }`}
                  >
                    {isPerfume ? 'Fragrance Notes' : 'Size Chart'}
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === 'shipping'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-400 hover:text-black'
                    }`}
                  >
                    Pengiriman & Return
                  </button>
                </div>

                <div className="text-xs text-gray-600 leading-relaxed py-2">
                  {activeTab === 'desc' && (
                    <div className="space-y-2">
                      {isPerfume ? (
                        <>
                          <p>
                            <strong>{product.title}</strong> {perfumeInfo.tagline}
                          </p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li><strong>Konsentrasi:</strong> {perfumeInfo.type}</li>
                            <li><strong>Ukuran:</strong> {perfumeInfo.volume}</li>
                            <li><strong>Ketahanan:</strong> {perfumeInfo.longevity}</li>
                            <li><strong>Karakter:</strong> {perfumeInfo.character}</li>
                          </ul>
                        </>
                      ) : (
                        <>
                          <p>
                            Didesain untuk kenyamanan maksimal dan penampilan kasual yang trendi, produk Shill menggunakan material katun pilihan dengan sirkulasi udara yang baik. Cocok digunakan sehari-hari untuk aktivitas santai maupun hangout.
                          </p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Bahan: 100% Katun Premium Combed / Twill Breathable</li>
                            <li>Jahitan: Standar ekspor rapi dan kuat</li>
                            <li>Fitting: Regular & Relaxed Fit Unisex</li>
                          </ul>
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === 'size' && (
                    <div className="space-y-2">
                      {isPerfume ? (
                        <div className="space-y-3">
                          <p className="font-semibold text-gray-800">Piramida Aroma (Fragrance Notes):</p>
                          <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div>
                              <span className="font-bold text-xs uppercase text-red-600 block">Top Notes:</span>
                              <span className="text-gray-700">{perfumeInfo.top}</span>
                            </div>
                            <div>
                              <span className="font-bold text-xs uppercase text-red-600 block">Middle Notes:</span>
                              <span className="text-gray-700">{perfumeInfo.middle}</span>
                            </div>
                            <div>
                              <span className="font-bold text-xs uppercase text-red-600 block">Base Notes:</span>
                              <span className="text-gray-700">{perfumeInfo.base}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p>Rekomendasi ukuran berdasarkan tinggi dan berat badan:</p>
                          <div className="grid grid-cols-4 gap-2 text-center border border-gray-200 p-2 rounded-lg font-mono">
                            <span className="font-bold">Size</span>
                            <span className="font-bold">Lebar Dada</span>
                            <span className="font-bold">Panjang</span>
                            <span className="font-bold">Pinggang</span>
                            <span>S</span><span>50 cm</span><span>70 cm</span><span>28-30</span>
                            <span>M</span><span>52 cm</span><span>72 cm</span><span>31-32</span>
                            <span>L</span><span>54 cm</span><span>74 cm</span><span>33-34</span>
                            <span>XL</span><span>56 cm</span><span>76 cm</span><span>35-36</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2">
                      <p>🚚 <strong>Pasti Gratis Ongkir</strong> ke seluruh kota di Indonesia.</p>
                      <p>🔄 <strong>Jaminan Return & Refund 7 Hari</strong> jika produk salah ukuran atau cacat produksi.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20 pt-10 border-t border-gray-100">
            <h3 className="text-xl font-extrabold uppercase font-koulen tracking-wider text-gray-900 mb-6">
              Produk Terkait yang Mungkin Kamu Suka
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={p.link}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 p-3 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-50 mb-3">
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-red-600 transition-colors">
                    {p.title}
                  </h4>
                  <span className="text-xs font-bold text-red-600 mt-1">{p.formattedPrice}</span>
                </Link>
              ))}
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
