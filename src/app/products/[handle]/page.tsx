'use client';

import React, { useState, useMemo, useRef, useEffect, use } from 'react';
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
import { EditorialProductCard } from '@/components/sites/shillstore/root/EditorialProductCard';

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

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
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
  'shillstore-force': {
    name: 'Shillstore Force',
    tagline: 'hadir dengan aroma bold dan maskulin yang memancarkan kekuatan, ketegasan, dan kepercayaan diri tanpa batas (Stronger. Bolder. You).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Citrus Spicy, Aromatic Lavender & Bold Woody',
    top: 'Bergamot, Lemon, Black Pepper',
    middle: 'Lavender, Geranium, Sage',
    base: 'Cedarwood, Vetiver, Amber',
  },
  'shillstore-elysium': {
    name: 'Shillstore Elysium',
    tagline: 'membawa kesegaran laut lepas yang membangkitkan suasana hati ceria dan penuh energi positif (Fresh Vibes. Higher Days).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Fresh Aquatic, Marine & Uplifting Citrus',
    top: 'Bergamot, Mandarin, Sea Notes',
    middle: 'Jasmine, Rosemary, Violet',
    base: 'Musk, Ambergris, Cedarwood',
  },
  'shillstore-nocturn': {
    name: 'Shillstore Nocturn',
    tagline: 'menghadirkan daya tarik malam yang misterius, karismatik, dan berkarakter tegas (Darkness Brings Character).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Dark Leather, Warm Spicy & Mysterious Woody',
    top: 'Cardamom, Black Pepper, Bergamot',
    middle: 'Leather, Iris, Violet',
    base: 'Sandalwood, Tonka Bean, Amber',
  },
  'shillstore-savage': {
    name: 'Shillstore Savage',
    tagline: 'memadukan aroma fruity liar dan woody hangat yang autentik, berani, dan bebas (Untamed. Wild. Real).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Wild Fruity, Earthy Patchouli & Amber Woody',
    top: 'Grapefruit, Pineapple, Black Currant',
    middle: 'Rose, Patchouli, Jasmine',
    base: 'Oakmoss, Amber, Musk',
  },
  'shillstore-zenith': {
    name: 'Shillstore Zenith',
    tagline: 'menampilkan wewangian bersih yang halus, elegan, dan meninggalkan kesan mendalam yang memikat (Simple Scent. Lasting Impression).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Crisp Fruity Floral, Clean & Sophisticated Vanilla',
    top: 'Bergamot, Apple, Pear',
    middle: 'Lavender, White Flowers, Nutmeg',
    base: 'Vanilla, Cedarwood, Musk',
  },
  'shillstore-ember': {
    name: 'Shillstore Ember',
    tagline: 'memancarkan kehangatan bourbon dan rempah cinnamon manis yang mendalam dan mempesona (Warmer Soul. Deeper You).',
    type: 'Eau De Parfum (EDP)',
    volume: '100 ML',
    longevity: '8 - 12 Jam (Long Lasting)',
    character: 'Warm Bourbon, Sweet Cinnamon & Rich Amber Vanilla',
    top: 'Cinnamon, Nutmeg, Orange',
    middle: 'Bourbon, Tonka Bean, Lavender',
    base: 'Vanilla, Amber, Sandalwood',
  },
};

function ProductDetailContent({ handle }: { handle: string }) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const reviewsRef = useRef<HTMLDivElement>(null);

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
    rating: 5.0,
    reviewCount: 164,
    isNew: true,
  };

  const isPerfume = product.category === 'Parfum';
  const foundPerfumeKey = Object.keys(perfumeProfiles).find(
    (key) => product.id.includes(key.replace('shillstore-', '')) || handle.includes(key.replace('shillstore-', ''))
  );
  const perfumeInfo = foundPerfumeKey ? perfumeProfiles[foundPerfumeKey] : perfumeProfiles['shillstore-noir'];

  const sizes = product.sizes || (isPerfume ? ['100ml'] : ['S', 'M', 'L', 'XL', 'XXL']);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'size' | 'shipping'>('desc');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sibling products for thumbnail gallery and related products
  const siblingProducts = useMemo(() => {
    return productsData.filter((p) => p.category === product.category && p.id !== product.id);
  }, [product]);

  // Gallery images: prioritize product's own images, complement with sibling angle/colorways if only 1
  const galleryImages = useMemo(() => {
    const list = [...product.images];
    if (list.length === 1 && siblingProducts.length > 0) {
      siblingProducts.slice(0, 3).forEach((sp) => {
        if (sp.images[0] && !list.includes(sp.images[0])) {
          list.push(sp.images[0]);
        }
      });
    }
    return list;
  }, [product, siblingProducts]);

  const activeImage = galleryImages[selectedImageIndex] || product.images[0];
  const relatedProducts = siblingProducts.slice(0, 4);

  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : null;

  // Reviews functionality
  const initialBaseCount = product.reviewCount || 164;
  const initialBaseRating = product.rating || 5.0;

  // Realistic default customer reviews
  const defaultReviews: ReviewItem[] = useMemo(() => {
    if (isPerfume) {
      return [
        {
          id: 'rev-1',
          name: 'Dimas Rizky',
          rating: 5,
          date: '3 Okt 2026',
          comment: 'Aromanya mewah dan tahan seharian lebih dari 8 jam. Pas semprot pertama terasa fresh citrus, setelah beberapa jam drydown-nya hangat dan sangat elegan. Worth it banget!',
          verified: true,
        },
        {
          id: 'rev-2',
          name: 'Sarah Amalia',
          rating: 5,
          date: '28 Sep 2026',
          comment: 'Wangi floral-nya sangat lembut, tidak menyengat atau bikin pusing. Kemasan botolnya juga kokoh dan terasa sangat premium. Pasti repurchase varian ini.',
          verified: true,
        },
        {
          id: 'rev-3',
          name: 'Kevin Pratama',
          rating: 5,
          date: '19 Sep 2026',
          comment: 'Blind buy terbaik tahun ini. Proyeksi aromanya mantap, banyak yang nanya pakai parfum apa saat di kantor. Rekomendasi buat daily use.',
          verified: true,
        },
        {
          id: 'rev-4',
          name: 'Nabila Putri',
          rating: 5,
          date: '12 Sep 2026',
          comment: 'Pengiriman kilat dan packaging sangat aman dengan bubble wrap tebal. Ketahanan wangi sesuai deskripsi dari pagi sampai sore.',
          verified: true,
        },
        {
          id: 'rev-5',
          name: 'Aditya Wardhana',
          rating: 5,
          date: '5 Sep 2026',
          comment: 'Karakter aromanya unik dan versatile. Cocok dipakai acara formal maupun nongkrong malam hari. Sillage-nya sopan dan menyenangkan.',
          verified: true,
        },
      ];
    }

    return [
      {
        id: 'rev-1',
        name: 'Arya Maulana',
        rating: 5,
        date: '3 Okt 2026',
        comment: 'Bahannya tebal tapi tetap breathable dan tidak gerah dipakai siang hari. Fitting regular-nya pas banget di badan, kualitas jahitan standar ekspor.',
        verified: true,
      },
      {
        id: 'rev-2',
        name: 'Rendy Pratama',
        rating: 5,
        date: '27 Sep 2026',
        comment: 'Cutting presisi dan bahannya premium. Jahitan kuat dan rapi, nyaman banget dipakai beraktivitas seharian tanpa kaku.',
        verified: true,
      },
      {
        id: 'rev-3',
        name: 'Fajar Nugraha',
        rating: 5,
        date: '18 Sep 2026',
        comment: 'Kualitas produk SHILLSTORE memang konsisten bagus. Warna kain pekat dan tidak luntur setelah beberapa kali pencucian.',
        verified: true,
      },
      {
        id: 'rev-4',
        name: 'Dika Saputra',
        rating: 5,
        date: '10 Sep 2026',
        comment: 'Desainnya clean dan streetwear banget. Cocok dipadukan dengan berbagai outfit casual harian. Pengiriman juga sangat cepat.',
        verified: true,
      },
      {
        id: 'rev-5',
        name: 'Bintang Pratama',
        rating: 5,
        date: '2 Sep 2026',
        comment: 'Kualitas kain solid, ukuran sesuai dengan tabel panduan. Sangat puas dengan harga segini dapat kualitas premium.',
        verified: true,
      },
    ];
  }, [isPerfume]);

  const [userReviews, setUserReviews] = useState<ReviewItem[]>([]);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load reviews from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`shill_reviews_${product.id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setUserReviews(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [product.id]);

  // Handle adding new review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      rating: newRating,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      comment: newComment.trim(),
      verified: true,
    };

    const updated = [newRev, ...userReviews];
    setUserReviews(updated);
    try {
      localStorage.setItem(`shill_reviews_${product.id}`, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setNewName('');
    setNewComment('');
    setNewRating(5);
    setIsWritingReview(false);
    setSuccessMessage('Terima kasih! Ulasan Anda telah berhasil diterbitkan.');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  // Base counts
  const initialStarCounts = useMemo(() => {
    const five = Math.floor(initialBaseCount * 0.94);
    const four = Math.floor(initialBaseCount * 0.05);
    const three = Math.max(0, initialBaseCount - five - four);
    return {
      5: five,
      4: four,
      3: three,
      2: 0,
      1: 0,
    };
  }, [initialBaseCount]);

  // Combined star counts
  const starCounts = useMemo(() => {
    const counts = { ...initialStarCounts };
    userReviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, r.rating)) as 1 | 2 | 3 | 4 | 5;
      counts[star] = (counts[star] || 0) + 1;
    });
    return counts;
  }, [initialStarCounts, userReviews]);

  // Total reviews count
  const totalReviews = initialBaseCount + userReviews.length;

  // Average rating calculated dynamically
  const averageRating = useMemo(() => {
    const baseTotalPoints = initialBaseCount * initialBaseRating;
    const userPoints = userReviews.reduce((sum, r) => sum + r.rating, 0);
    const totalPoints = baseTotalPoints + userPoints;
    const avg = totalPoints / totalReviews;
    return Math.min(5.0, Math.max(1.0, Number(avg.toFixed(1))));
  }, [initialBaseCount, initialBaseRating, userReviews, totalReviews]);

  const allReviews = useMemo(() => {
    return [...userReviews, ...defaultReviews];
  }, [userReviews, defaultReviews]);

  // Smooth scroll handler
  const scrollToReviews = () => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* Global Minimal Header */}
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-8 sm:mb-12">
          <Link href="/" className="hover:text-black transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-black transition-colors">
            {product.category.toUpperCase()}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* 1. Main Product Section (Clean, unified editorial grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
          {/* Left Column: Product Image Gallery (1:1 Ratio, No cropping) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main 1:1 Image Canvas */}
            <div
              className="relative w-full aspect-square bg-[#f8f8f8] border border-neutral-150 overflow-hidden flex items-center justify-center"
              style={{ aspectRatio: '1 / 1' }}
            >
              {hasDiscount && (
                <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-900 bg-white/95 px-2.5 py-1 border border-neutral-200">
                  Sale
                </span>
              )}
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                className="object-contain p-6 sm:p-10 transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>

            {/* Thumbnail Gallery (Alternative angles / colorways) */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pt-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#f8f8f8] border transition-all cursor-pointer shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-black ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                    }`}
                    style={{ aspectRatio: '1 / 1' }}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-contain p-1.5"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Information & Purchase Controls */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Category Subtitle */}
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium block mb-2">
              {product.category}
            </span>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-900 tracking-tight leading-[1.15] mb-3">
              {product.title}
            </h1>

            {/* Functional Clickable Rating */}
            <div className="flex items-center gap-2 mb-6 text-xs text-neutral-500">
              <button
                type="button"
                onClick={scrollToReviews}
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer group"
                aria-label="Lihat ulasan produk"
              >
                <span className="flex text-neutral-900 text-xs tracking-tighter">
                  {'★'.repeat(Math.min(5, Math.max(1, Math.round(averageRating))))}
                </span>
                <span className="font-semibold text-neutral-900">{averageRating.toFixed(1)}</span>
              </button>
              <span className="text-neutral-300">•</span>
              <button
                type="button"
                onClick={scrollToReviews}
                className="hover:underline hover:text-black transition-colors cursor-pointer text-neutral-500 font-medium"
              >
                {totalReviews} ulasan
              </button>
            </div>

            {/* Price & Simple Discount */}
            <div className="flex items-baseline gap-3 mb-8 pb-6 border-b border-neutral-150">
              <span className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
                Rp {(product.price * quantity).toLocaleString('id-ID')}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm sm:text-base text-neutral-400 line-through">
                    Rp {(product.compareAtPrice! * quantity).toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-red-600">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Size / Variant Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[11px] uppercase tracking-[0.16em] font-medium text-neutral-700">
                  Ukuran: <span className="text-black font-semibold">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('size')}
                  className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 hover:text-black transition-colors font-medium border-b border-neutral-200 hover:border-black cursor-pointer pb-0.5"
                >
                  {isPerfume ? 'Fragrance Notes' : 'Panduan Ukuran'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-11 h-10 px-3.5 text-xs uppercase tracking-wider font-medium border transition-colors cursor-pointer ${
                      selectedSize === s
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-200 text-neutral-800 bg-white hover:border-black'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <span className="text-[11px] uppercase tracking-[0.16em] font-medium text-neutral-700 block mb-2.5">
                Jumlah:
              </span>
              <div className="inline-flex items-center border border-neutral-200 h-10 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-full flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors text-sm font-medium cursor-pointer"
                  aria-label="Kurangi jumlah"
                >
                  -
                </button>
                <span className="w-12 text-center text-xs font-semibold text-neutral-900 select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-full flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors text-sm font-medium cursor-pointer"
                  aria-label="Tambah jumlah"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Secondary Add To Cart, Primary Buy Now */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {/* Secondary CTA: Tambah ke Keranjang */}
              <button
                type="button"
                onClick={() => addToCart(product, quantity)}
                className="flex-1 h-12 border border-black text-black hover:bg-neutral-50 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer text-center flex items-center justify-center"
              >
                Tambah ke Keranjang
              </button>

              {/* Primary CTA: Beli Sekarang */}
              <button
                type="button"
                onClick={() => {
                  addToCart(product, quantity);
                  setIsCartOpen(false);
                  router.push('/checkout');
                }}
                className="flex-1 h-12 bg-black hover:bg-neutral-800 text-white text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer text-center flex items-center justify-center"
              >
                Beli Sekarang
              </button>
            </div>

            {/* Subtle Editorial Reassurance */}
            <div className="py-3.5 border-t border-b border-neutral-150 mb-10 grid grid-cols-3 gap-2 text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 text-center">
              <div>Gratis Ongkir</div>
              <div className="border-x border-neutral-200">100% Original</div>
              <div>Garansi 7 Hari</div>
            </div>

            {/* Minimal Editorial Accordion Tabs */}
            <div className="space-y-4">
              <div className="flex border-b border-neutral-200 gap-8 text-xs uppercase tracking-[0.18em]">
                <button
                  type="button"
                  onClick={() => setActiveTab('desc')}
                  className={`pb-3 transition-colors cursor-pointer ${
                    activeTab === 'desc'
                      ? 'border-b-2 border-black font-semibold text-black -mb-[1px]'
                      : 'text-neutral-400 hover:text-black font-medium'
                  }`}
                >
                  Deskripsi
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('size')}
                  className={`pb-3 transition-colors cursor-pointer ${
                    activeTab === 'size'
                      ? 'border-b-2 border-black font-semibold text-black -mb-[1px]'
                      : 'text-neutral-400 hover:text-black font-medium'
                  }`}
                >
                  {isPerfume ? 'Fragrance Notes' : 'Panduan Ukuran'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-3 transition-colors cursor-pointer ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-black font-semibold text-black -mb-[1px]'
                      : 'text-neutral-400 hover:text-black font-medium'
                  }`}
                >
                  Pengiriman & Return
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {activeTab === 'desc' && (
                  <div className="space-y-4">
                    {isPerfume ? (
                      <>
                        <p>
                          <span className="font-semibold text-neutral-900">{product.title}</span> {perfumeInfo.tagline}
                        </p>
                        <div className="grid grid-cols-2 gap-y-2.5 text-xs pt-3 border-t border-neutral-100">
                          <div>
                            <span className="text-neutral-400 block">Konsentrasi</span>
                            <span className="text-neutral-900 font-medium">{perfumeInfo.type}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block">Volume</span>
                            <span className="text-neutral-900 font-medium">{perfumeInfo.volume}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block">Ketahanan</span>
                            <span className="text-neutral-900 font-medium">{perfumeInfo.longevity}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block">Karakter</span>
                            <span className="text-neutral-900 font-medium">{perfumeInfo.character}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p>
                          Didesain untuk kenyamanan optimal dan siluet kasual modern. Menggunakan material katun pilihan berdaya tahan tinggi dengan sirkulasi udara yang baik untuk menunjang gaya hidup urban setiap hari.
                        </p>
                        <div className="grid grid-cols-2 gap-y-2.5 text-xs pt-3 border-t border-neutral-100">
                          <div>
                            <span className="text-neutral-400 block">Material</span>
                            <span className="text-neutral-900 font-medium">100% Katun Premium Combed / Twill</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block">Fitting</span>
                            <span className="text-neutral-900 font-medium">Regular & Relaxed Unisex</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block">Jahitan</span>
                            <span className="text-neutral-900 font-medium">Standar Ekspor Rapi & Kuat</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block">Perawatan</span>
                            <span className="text-neutral-900 font-medium">Cuci mesin air dingin, jemur teduh</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'size' && (
                  <div>
                    {isPerfume ? (
                      <div className="space-y-4">
                        <p className="text-neutral-500">Piramida aroma komposisi wewangian:</p>
                        <div className="border border-neutral-150 p-4 space-y-3">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 block mb-0.5">
                              Top Notes
                            </span>
                            <span className="text-neutral-900 font-medium">{perfumeInfo.top}</span>
                          </div>
                          <div className="border-t border-neutral-100 pt-2.5">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 block mb-0.5">
                              Middle Notes
                            </span>
                            <span className="text-neutral-900 font-medium">{perfumeInfo.middle}</span>
                          </div>
                          <div className="border-t border-neutral-100 pt-2.5">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 block mb-0.5">
                              Base Notes
                            </span>
                            <span className="text-neutral-900 font-medium">{perfumeInfo.base}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-neutral-500">Panduan ukuran standar (cm):</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-neutral-200 text-[10px] uppercase tracking-wider text-neutral-400">
                                <th className="py-2 pr-4 font-semibold">Ukuran</th>
                                <th className="py-2 px-4 font-semibold">Lebar Dada</th>
                                <th className="py-2 px-4 font-semibold">Panjang</th>
                                <th className="py-2 pl-4 font-semibold">Pinggang</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 text-neutral-700">
                              <tr>
                                <td className="py-2 pr-4 font-semibold text-neutral-900">S</td>
                                <td className="py-2 px-4">50 cm</td>
                                <td className="py-2 px-4">70 cm</td>
                                <td className="py-2 pl-4">28–30</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-semibold text-neutral-900">M</td>
                                <td className="py-2 px-4">52 cm</td>
                                <td className="py-2 px-4">72 cm</td>
                                <td className="py-2 pl-4">31–32</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-semibold text-neutral-900">L</td>
                                <td className="py-2 px-4">54 cm</td>
                                <td className="py-2 px-4">74 cm</td>
                                <td className="py-2 pl-4">33–34</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-semibold text-neutral-900">XL</td>
                                <td className="py-2 px-4">56 cm</td>
                                <td className="py-2 px-4">76 cm</td>
                                <td className="py-2 pl-4">35–36</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-3 text-xs sm:text-sm">
                    <p>
                      <strong className="text-neutral-900 font-medium">Pengiriman:</strong> Pesanan dikirimkan dalam 1–2 hari kerja melalui SiCepat, JNE, atau kurir instan. Gratis ongkos kirim ke seluruh Indonesia untuk pesanan di atas Rp 250.000.
                    </p>
                    <p>
                      <strong className="text-neutral-900 font-medium">Jaminan Return &amp; Refund:</strong> Penukaran ukuran dapat dilakukan maksimal 7 hari setelah barang diterima dalam kondisi utuh dengan tag masih terpasang.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Customer Reviews Section (Functional & Interactive) */}
        <section ref={reviewsRef} id="reviews" className="mt-20 sm:mt-28 pt-12 border-t border-neutral-150 scroll-mt-24">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-150">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium block mb-2">
                TESTIMONI &amp; RATING
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-neutral-900 tracking-tight">
                Ulasan Pelanggan
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsWritingReview((prev) => !prev)}
              className="inline-flex items-center justify-center px-6 py-3 border border-black text-black hover:bg-black hover:text-white text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors cursor-pointer self-start sm:self-auto"
            >
              {isWritingReview ? 'Tutup Form' : 'Tulis Ulasan'}
            </button>
          </div>

          {/* Success Notification */}
          {successMessage && (
            <div className="mb-8 p-4 bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider flex items-center justify-between">
              <span>{successMessage}</span>
              <button
                type="button"
                onClick={() => setSuccessMessage('')}
                className="text-neutral-400 hover:text-white text-base ml-4 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Rating Summary Breakdown & Score */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 mb-12 border-b border-neutral-150">
            {/* Left: Overall Score */}
            <div className="md:col-span-4 flex flex-col justify-center sm:border-r border-neutral-150 sm:pr-8">
              <div className="text-5xl sm:text-6xl font-light text-neutral-900 tracking-tight mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex text-neutral-900 text-sm tracking-tighter mb-2">
                {'★'.repeat(Math.min(5, Math.max(1, Math.round(averageRating))))}
                {'☆'.repeat(Math.max(0, 5 - Math.round(averageRating)))}
              </div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider">
                Berdasarkan {totalReviews} ulasan terverifikasi
              </p>
            </div>

            {/* Right: Star Breakdown Bars */}
            <div className="md:col-span-8 flex flex-col justify-center gap-2.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = starCounts[stars as 1 | 2 | 3 | 4 | 5] || 0;
                const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                return (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-16 text-neutral-500 shrink-0 font-medium">
                      {stars} Bintang
                    </span>
                    <div className="flex-1 h-2 bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full bg-neutral-900 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-neutral-400 font-mono text-[11px] shrink-0">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* "Tulis Ulasan" Collapsible Form */}
          {isWritingReview && (
            <form onSubmit={handleAddReview} className="mb-12 p-6 sm:p-8 bg-[#FAFAF9] border border-neutral-200">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900 mb-6">
                Tulis Ulasan Anda
              </h3>

              {/* Star Rating Picker */}
              <div className="mb-5">
                <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-2">
                  Rating Bintang <span className="text-neutral-400">*</span>
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl transition-transform hover:scale-110 cursor-pointer p-0.5"
                      aria-label={`Beri rating ${star} bintang`}
                    >
                      <span
                        className={
                          (hoverRating || newRating) >= star
                            ? 'text-neutral-900'
                            : 'text-neutral-300'
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-neutral-800 ml-2">
                    {hoverRating || newRating} / 5
                  </span>
                </div>
              </div>

              {/* Name Input */}
              <div className="mb-4">
                <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-1.5">
                  Nama Lengkap <span className="text-neutral-400">*</span>
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full h-11 px-3.5 text-xs text-neutral-900 bg-white border border-neutral-200 rounded-[2px] focus:outline-none focus:border-black placeholder:text-neutral-400"
                  required
                />
              </div>

              {/* Comment Input */}
              <div className="mb-6">
                <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-700 block mb-1.5">
                  Ulasan / Komentar <span className="text-neutral-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ceritakan pengalaman Anda mengenai produk ini..."
                  className="w-full p-3.5 text-xs text-neutral-900 bg-white border border-neutral-200 rounded-[2px] focus:outline-none focus:border-black placeholder:text-neutral-400"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-black hover:bg-neutral-800 text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
                >
                  Kirim Ulasan
                </button>
                <button
                  type="button"
                  onClick={() => setIsWritingReview(false)}
                  className="px-6 py-3.5 border border-neutral-200 text-neutral-600 hover:text-black text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="divide-y divide-neutral-150">
            {allReviews.map((rev) => (
              <div key={rev.id} className="py-6 sm:py-8 first:pt-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                      {rev.name}
                    </span>
                    {rev.verified && (
                      <span className="text-[9px] uppercase tracking-[0.16em] font-semibold text-neutral-500 border border-neutral-200 px-2 py-0.5">
                        Terverifikasi
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {rev.date}
                  </span>
                </div>

                <div className="flex text-neutral-900 text-xs tracking-tighter mb-2">
                  {'★'.repeat(rev.rating)}
                  {'☆'.repeat(5 - rev.rating)}
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Related Products Section (Clean, 1:1 image grid) */}
        <div className="mt-20 sm:mt-28 pt-12 border-t border-neutral-150">
          <div className="flex items-baseline justify-between mb-8 sm:mb-10">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium block mb-2">
                REKOMENDASI
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight">
                Produk Terkait yang Mungkin Kamu Suka
              </h3>
            </div>
            <Link
              href="/collections"
              className="text-[11px] uppercase tracking-[0.18em] font-semibold text-neutral-500 hover:text-black transition-colors hidden sm:block"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14">
            {relatedProducts.map((p, idx) => (
              <EditorialProductCard
                key={p.id}
                product={p}
                priority={idx < 2}
                aspectRatio="square"
                showDiscount={false}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Global Minimal Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
