import { Product, BannerSlide, CollageItem, CategoryPill, BlogStory } from '@/types/shill';

// Announcements
export const announcements = [
  'Pasti Gratis Ongkir',
  'First Checkout, get 30k',
  'Always Purchase 250k, get Disc20k',
  'Always Purchase 150k, get Disc10k'
];

// Hero Slides
export const bannerSlides: BannerSlide[] = [
  {
    id: 'slide-cargo',
    title: 'CARGO PANTS',
    subtitle: 'New Arrival',
    desktopImage: '/sites/shillstore/root/images/hero-cargo-desktop.jpg',
    mobileImage: '/sites/shillstore/root/images/hero-cargo-mobile.jpg',
    link: '/collections/category-pants-chino-pants',
    buttonText: 'Belanja Sekarang'
  },
  {
    id: 'slide-parka',
    title: 'PARKA JACKET',
    subtitle: 'New Arrival',
    desktopImage: '/sites/shillstore/root/images/hero-parka-desktop.jpg',
    mobileImage: '/sites/shillstore/root/images/hero-parka-mobile.jpg',
    link: '/collections/flight-jacket',
    buttonText: 'Lihat Koleksi'
  },
  {
    id: 'slide-chino',
    title: 'CHINO PANTS FLEXI FIT',
    subtitle: 'New Arrival',
    desktopImage: '/sites/shillstore/root/images/hero-chino-desktop.jpg',
    mobileImage: '/sites/shillstore/root/images/hero-chino-desktop.jpg',
    link: '/collections/category-pants-chino-pants',
    buttonText: 'Beli Sekarang'
  },
  {
    id: 'slide-chino-short',
    title: 'CHINO SHORT FLEXI FIT',
    subtitle: 'New Arrival',
    desktopImage: '/sites/shillstore/root/images/hero-chino-short-desktop.jpg',
    mobileImage: '/sites/shillstore/root/images/hero-chino-short-desktop.jpg',
    link: '/collections/category-pants-chino-pants',
    buttonText: 'Beli Sekarang'
  },
  {
    id: 'slide-jogger',
    title: 'JOGGER PANTS FLEXI FIT',
    subtitle: 'New Arrival',
    desktopImage: '/sites/shillstore/root/images/hero-jogger-desktop.jpg',
    mobileImage: '/sites/shillstore/root/images/hero-jogger-desktop.jpg',
    link: '/collections/category-pants-chino-pants',
    buttonText: 'Beli Sekarang'
  },
  {
    id: 'slide-oxford',
    title: 'OXFORD SHIRT',
    subtitle: 'Signature Style',
    desktopImage: '/sites/shillstore/root/images/hero-oxford-desktop.jpg',
    mobileImage: '/sites/shillstore/root/images/hero-oxford-desktop.jpg',
    link: '/collections/all-shirt',
    buttonText: 'Lihat Sekarang'
  },
  {
    id: 'slide-contrast',
    title: 'T-SHIRT CONTRAST',
    subtitle: 'Everyday Casual',
    desktopImage: '/sites/shillstore/root/images/hero-tshirt-contrast.jpg',
    mobileImage: '/sites/shillstore/root/images/hero-tshirt-contrast.jpg',
    link: '/collections/all-t-shirt',
    buttonText: 'Beli Sekarang'
  },
  {
    id: 'slide-relax-chino',
    title: 'RELAX CHINO PANTS',
    subtitle: 'Relaxed Fit',
    desktopImage: '/sites/shillstore/root/images/hero-relax-chino.jpg',
    mobileImage: '/sites/shillstore/root/images/hero-relax-chino.jpg',
    link: '/collections/category-pants-chino-pants',
    buttonText: 'Lihat Koleksi'
  }
];

// Collage Items
export const collageItems: CollageItem[] = [
  {
    id: 'collage-why-buy',
    title: 'Kenapa harus beli di Website Shill',
    subtitle: '',
    points: ['• Gratis Ongkir', '• Jaminan Return/Refund'],
    image: '/sites/shillstore/root/images/collage-why-buy.jpg',
    link: '/blogs/news/kenapa-harus-beli-di-website-shill',
    buttonText: 'Selengkapnya',
    buttonStyle: 'primary'
  },
  {
    id: 'collage-oxford',
    title: 'Oxford Shirt',
    subtitle: 'New Arrival',
    image: '/sites/shillstore/root/images/collage-oxford.jpg',
    link: '/collections/all-shirt',
    buttonText: '',
    buttonStyle: 'outline'
  },
  {
    id: 'collage-pickup',
    title: 'PICKUP IN STORE',
    subtitle: '',
    image: '/sites/shillstore/root/images/collage-pickup.jpg',
    link: '/blogs/news/pickup-instore',
    buttonText: 'PICKUP IN STORE',
    buttonStyle: 'yellow'
  }
];

// Category Pills
export const categoryPills: CategoryPill[] = [
  { id: 'cat-atasan', title: 'Atasan', icon: '/sites/shillstore/root/images/cat-atasan.png', link: '/collections/atasan' },
  { id: 'cat-bawahan', title: 'Bawahan', icon: '/sites/shillstore/root/images/cat-bawahan.png', link: '/collections/bawahan' },
  { id: 'cat-aksesoris', title: 'Aksesoris', icon: '/sites/shillstore/root/images/cat-aksesoris.png', link: '/collections/accessories' }
];

// 36 Real Products from Shill
export const productsData: Product[] = [
  {
    id: 'shill-perfume-noir',
    title: 'Parfume Shillstore Noir Eau De Parfum 100ml',
    category: 'Parfum',
    price: 149000,
    formattedPrice: 'Rp 149.000',
    compareAtPrice: 249000,
    formattedCompareAtPrice: 'Rp 249.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-perfume-shillstore-noir.jpg'],
    link: '/products/shillstore-noir',
    rating: 5.0,
    reviewCount: 189,
    sizes: ['100ml'],
    colors: ['Noir Black'],
    isNew: true
  },
  {
    id: 'shill-perfume-bloom',
    title: 'Parfume Shillstore Bloom Eau De Parfum 100ml',
    category: 'Parfum',
    price: 139000,
    formattedPrice: 'Rp 139.000',
    compareAtPrice: 239000,
    formattedCompareAtPrice: 'Rp 239.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-perfume-shillstore-bloom.jpg'],
    link: '/products/shillstore-bloom',
    rating: 5.0,
    reviewCount: 164,
    sizes: ['100ml'],
    colors: ['Bloom Pink'],
    isNew: true
  },
  {
    id: 'shill-perfume-ocean',
    title: 'Parfume Shillstore Ocean Eau De Toilette 100ml',
    category: 'Parfum',
    price: 139000,
    formattedPrice: 'Rp 139.000',
    compareAtPrice: 239000,
    formattedCompareAtPrice: 'Rp 239.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-perfume-shillstore-ocean.jpg'],
    link: '/products/shillstore-ocean',
    rating: 4.9,
    reviewCount: 142,
    sizes: ['100ml'],
    colors: ['Ocean Blue'],
    isNew: true
  },
  {
    id: 'shill-perfume-legacy',
    title: 'Parfume Shillstore Legacy Eau De Parfum 100ml',
    category: 'Parfum',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-perfume-shillstore-legacy.jpg'],
    link: '/products/shillstore-legacy',
    rating: 5.0,
    reviewCount: 178,
    sizes: ['100ml'],
    colors: ['Amber Brown'],
    isNew: true
  },
  {
    id: 'shill-perfume-velo',
    title: 'Parfume Shillstore Vélo Eau De Parfum 100ml',
    category: 'Parfum',
    price: 129000,
    formattedPrice: 'Rp 129.000',
    compareAtPrice: 229000,
    formattedCompareAtPrice: 'Rp 229.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-perfume-shillstore-velo.jpg'],
    link: '/products/shillstore-velo',
    rating: 4.9,
    reviewCount: 155,
    sizes: ['100ml'],
    colors: ['Minimalist Clear'],
    isNew: true
  },
  {
    id: 'shill-perfume-velvet',
    title: 'Parfume Shillstore Velvet Eau De Parfum 100ml',
    category: 'Parfum',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-perfume-shillstore-velvet.jpg'],
    link: '/products/shillstore-velvet',
    rating: 5.0,
    reviewCount: 194,
    sizes: ['100ml'],
    colors: ['Ruby Red'],
    isNew: true
  },
  // Windbreaker Jackets (3 Variants) - Rp349.000
  {
    id: 'shill-jacket-windbreaker-army-green',
    title: 'Shill Windbreaker Jacket Army Green',
    category: 'Jaket',
    price: 349000,
    formattedPrice: 'Rp 349.000',
    compareAtPrice: 499000,
    formattedCompareAtPrice: 'Rp 499.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-windbreaker-army-green.jpg'
    ],
    link: '/products/shill-windbreaker-jacket-army-green',
    rating: 5.0,
    reviewCount: 88,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Army Green'],
    isNew: true
  },
  {
    id: 'shill-jacket-windbreaker-beige',
    title: 'Shill Windbreaker Jacket Beige',
    category: 'Jaket',
    price: 349000,
    formattedPrice: 'Rp 349.000',
    compareAtPrice: 499000,
    formattedCompareAtPrice: 'Rp 499.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-windbreaker-beige.jpg'
    ],
    link: '/products/shill-windbreaker-jacket-beige',
    rating: 4.9,
    reviewCount: 76,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige'],
    isNew: true
  },
  {
    id: 'shill-jacket-windbreaker-black',
    title: 'Shill Windbreaker Jacket Black',
    category: 'Jaket',
    price: 349000,
    formattedPrice: 'Rp 349.000',
    compareAtPrice: 499000,
    formattedCompareAtPrice: 'Rp 499.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-windbreaker-black.jpg'
    ],
    link: '/products/shill-windbreaker-jacket-black',
    rating: 4.9,
    reviewCount: 92,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    isNew: true
  },

  // Coach Jackets (3 Variants) - Rp299.000
  {
    id: 'shill-jacket-coach-army-green',
    title: 'Shill Coach Jacket Army Green',
    category: 'Jaket',
    price: 299000,
    formattedPrice: 'Rp 299.000',
    compareAtPrice: 450000,
    formattedCompareAtPrice: 'Rp 450.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-coach-army-green.jpg'
    ],
    link: '/products/shill-coach-jacket-army-green',
    rating: 4.9,
    reviewCount: 110,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Army Green'],
    isNew: true
  },
  {
    id: 'shill-jacket-coach-beige',
    title: 'Shill Coach Jacket Beige',
    category: 'Jaket',
    price: 299000,
    formattedPrice: 'Rp 299.000',
    compareAtPrice: 450000,
    formattedCompareAtPrice: 'Rp 450.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-coach-beige.jpg'
    ],
    link: '/products/shill-coach-jacket-beige',
    rating: 5.0,
    reviewCount: 94,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige'],
    isNew: true
  },
  {
    id: 'shill-jacket-coach-black',
    title: 'Shill Coach Jacket Black',
    category: 'Jaket',
    price: 299000,
    formattedPrice: 'Rp 299.000',
    compareAtPrice: 450000,
    formattedCompareAtPrice: 'Rp 450.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-coach-black.jpg'
    ],
    link: '/products/shill-coach-jacket-black',
    rating: 4.8,
    reviewCount: 82,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    isNew: true
  },

  // Parka Jackets (3 Variants) - Rp499.000
  {
    id: 'shill-jacket-parka-navy',
    title: 'Shill Parka Jacket Navy',
    category: 'Jaket',
    price: 499000,
    formattedPrice: 'Rp 499.000',
    compareAtPrice: 699000,
    formattedCompareAtPrice: 'Rp 699.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-parka-navy.jpg'
    ],
    link: '/products/shill-parka-jacket-navy',
    rating: 5.0,
    reviewCount: 130,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy'],
    isNew: true
  },
  {
    id: 'shill-jacket-parka-army-green',
    title: 'Shill Parka Jacket Army Green',
    category: 'Jaket',
    price: 499000,
    formattedPrice: 'Rp 499.000',
    compareAtPrice: 699000,
    formattedCompareAtPrice: 'Rp 699.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-parka-army-green.jpg'
    ],
    link: '/products/shill-parka-jacket-army-green',
    rating: 4.9,
    reviewCount: 118,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Army Green'],
    isNew: true
  },
  {
    id: 'shill-jacket-parka-black',
    title: 'Shill Parka Jacket Black',
    category: 'Jaket',
    price: 499000,
    formattedPrice: 'Rp 499.000',
    compareAtPrice: 699000,
    formattedCompareAtPrice: 'Rp 699.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-parka-black.jpg'
    ],
    link: '/products/shill-parka-jacket-black',
    rating: 5.0,
    reviewCount: 105,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    isNew: true
  },

  // Varsity Jackets (3 Variants) - Rp499.000
  {
    id: 'shill-jacket-varsity-navy-gray',
    title: 'Shill Varsity Jacket Navy / Gray',
    category: 'Jaket',
    price: 499000,
    formattedPrice: 'Rp 499.000',
    compareAtPrice: 749000,
    formattedCompareAtPrice: 'Rp 749.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-varsity-navy-gray.jpg'
    ],
    link: '/products/shill-varsity-jacket-navy-gray',
    rating: 5.0,
    reviewCount: 145,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy / Gray'],
    isNew: true
  },
  {
    id: 'shill-jacket-varsity-forest-green',
    title: 'Shill Varsity Jacket Forest Green / Cream',
    category: 'Jaket',
    price: 499000,
    formattedPrice: 'Rp 499.000',
    compareAtPrice: 749000,
    formattedCompareAtPrice: 'Rp 749.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-varsity-forest-green.jpg'
    ],
    link: '/products/shill-varsity-jacket-forest-green',
    rating: 5.0,
    reviewCount: 160,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Forest Green / Cream'],
    isNew: true
  },
  {
    id: 'shill-jacket-varsity-black-white',
    title: 'Shill Varsity Jacket Black / White',
    category: 'Jaket',
    price: 499000,
    formattedPrice: 'Rp 499.000',
    compareAtPrice: 749000,
    formattedCompareAtPrice: 'Rp 749.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-jacket-varsity-black-white.jpg'
    ],
    link: '/products/shill-varsity-jacket-black-white',
    rating: 4.9,
    reviewCount: 122,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black / White'],
    isNew: true
  },
  // Kaos Oversized (3 Variants) - Rp179.000
  {
    id: 'shill-tshirt-oversized-college-grey',
    title: 'Shill Kaos Oversized College Series Misty Grey',
    category: 'Kaos',
    price: 179000,
    formattedPrice: 'Rp 179.000',
    compareAtPrice: 279000,
    formattedCompareAtPrice: 'Rp 279.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-oversized-college-grey.jpg'
    ],
    link: '/products/shill-kaos-oversized-college-series-misty-grey',
    rating: 5.0,
    reviewCount: 142,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Misty Grey'],
    isNew: true
  },
  {
    id: 'shill-tshirt-oversized-minimal-green',
    title: 'Shill Kaos Oversized Minimal Series Bottle Green',
    category: 'Kaos',
    price: 179000,
    formattedPrice: 'Rp 179.000',
    compareAtPrice: 279000,
    formattedCompareAtPrice: 'Rp 279.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-oversized-minimal-green.jpg'
    ],
    link: '/products/shill-kaos-oversized-minimal-series-bottle-green',
    rating: 4.9,
    reviewCount: 128,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Bottle Green'],
    isNew: true
  },
  {
    id: 'shill-tshirt-oversized-essential-black',
    title: 'Shill Kaos Oversized Essential Series Black',
    category: 'Kaos',
    price: 179000,
    formattedPrice: 'Rp 179.000',
    compareAtPrice: 279000,
    formattedCompareAtPrice: 'Rp 279.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-oversized-essential-black.jpg'
    ],
    link: '/products/shill-kaos-oversized-essential-series-black',
    rating: 5.0,
    reviewCount: 165,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    isNew: true
  },

  // Kaos Polos (3 Variants) - Rp129.000
  {
    id: 'shill-tshirt-polos-white',
    title: 'Shill Kaos Polos Premium White',
    category: 'Kaos',
    price: 129000,
    formattedPrice: 'Rp 129.000',
    compareAtPrice: 199000,
    formattedCompareAtPrice: 'Rp 199.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-polos-white.jpg'
    ],
    link: '/products/shill-kaos-polos-premium-white',
    rating: 4.9,
    reviewCount: 210,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
    isNew: true
  },
  {
    id: 'shill-tshirt-polos-grey',
    title: 'Shill Kaos Polos Premium Misty Grey',
    category: 'Kaos',
    price: 129000,
    formattedPrice: 'Rp 129.000',
    compareAtPrice: 199000,
    formattedCompareAtPrice: 'Rp 199.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-polos-grey.jpg'
    ],
    link: '/products/shill-kaos-polos-premium-misty-grey',
    rating: 4.8,
    reviewCount: 184,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Misty Grey'],
    isNew: true
  },
  {
    id: 'shill-tshirt-polos-black',
    title: 'Shill Kaos Polos Premium Black',
    category: 'Kaos',
    price: 129000,
    formattedPrice: 'Rp 129.000',
    compareAtPrice: 199000,
    formattedCompareAtPrice: 'Rp 199.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-polos-black.jpg'
    ],
    link: '/products/shill-kaos-polos-premium-black',
    rating: 5.0,
    reviewCount: 250,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    isNew: true
  },

  // Washed T-Shirt (3 Variants) - Rp199.000
  {
    id: 'shill-tshirt-washed-black',
    title: 'Shill Washed T-Shirt Vintage Washed Black',
    category: 'Kaos',
    price: 199000,
    formattedPrice: 'Rp 199.000',
    compareAtPrice: 299000,
    formattedCompareAtPrice: 'Rp 299.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-washed-black.jpg'
    ],
    link: '/products/shill-washed-t-shirt-vintage-washed-black',
    rating: 5.0,
    reviewCount: 175,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Washed Black'],
    isNew: true
  },
  {
    id: 'shill-tshirt-washed-cream',
    title: 'Shill Washed T-Shirt Vintage Washed Cream',
    category: 'Kaos',
    price: 199000,
    formattedPrice: 'Rp 199.000',
    compareAtPrice: 299000,
    formattedCompareAtPrice: 'Rp 299.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-washed-cream.jpg'
    ],
    link: '/products/shill-washed-t-shirt-vintage-washed-cream',
    rating: 4.9,
    reviewCount: 154,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Washed Cream'],
    isNew: true
  },
  {
    id: 'shill-tshirt-washed-army-green',
    title: 'Shill Washed T-Shirt Vintage Washed Army Green',
    category: 'Kaos',
    price: 199000,
    formattedPrice: 'Rp 199.000',
    compareAtPrice: 299000,
    formattedCompareAtPrice: 'Rp 299.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-washed-army-green.jpg'
    ],
    link: '/products/shill-washed-t-shirt-vintage-washed-army-green',
    rating: 5.0,
    reviewCount: 162,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Washed Army Green'],
    isNew: true
  },

  // Kaos Grafis (3 Variants) - Rp159.000
  {
    id: 'shill-tshirt-graphic-wave-cream',
    title: 'Shill Kaos Grafis Wave Series Cream',
    category: 'Kaos',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 249000,
    formattedCompareAtPrice: 'Rp 249.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-graphic-wave-cream.jpg'
    ],
    link: '/products/shill-kaos-grafis-wave-series-cream',
    rating: 4.9,
    reviewCount: 138,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Cream'],
    isNew: true
  },
  {
    id: 'shill-tshirt-graphic-globe-black',
    title: 'Shill Kaos Grafis Globe Series Charcoal Black',
    category: 'Kaos',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 249000,
    formattedCompareAtPrice: 'Rp 249.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-graphic-globe-black.jpg'
    ],
    link: '/products/shill-kaos-grafis-globe-series-charcoal-black',
    rating: 5.0,
    reviewCount: 172,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal Black'],
    isNew: true
  },
  {
    id: 'shill-tshirt-graphic-mountain-black',
    title: 'Shill Kaos Grafis Mountain Series Black',
    category: 'Kaos',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 249000,
    formattedCompareAtPrice: 'Rp 249.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-tshirt-graphic-mountain-black.jpg'
    ],
    link: '/products/shill-kaos-grafis-mountain-series-black',
    rating: 5.0,
    reviewCount: 190,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    isNew: true
  },

  // Chino Pants (3 Variants) - Rp159.000
  {
    id: 'shill-pants-chino-black',
    title: 'Shill Chino Pants Flexi-Fit Black',
    category: 'Celana',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-chino-black.jpg'
    ],
    link: '/products/shill-chino-pants-flexi-fit-black',
    rating: 5.0,
    reviewCount: 168,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    isNew: true
  },
  {
    id: 'shill-pants-chino-navy',
    title: 'Shill Chino Pants Flexi-Fit Navy',
    category: 'Celana',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-chino-navy.jpg'
    ],
    link: '/products/shill-chino-pants-flexi-fit-navy',
    rating: 4.9,
    reviewCount: 145,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy'],
    isNew: true
  },
  {
    id: 'shill-pants-chino-beige',
    title: 'Shill Chino Pants Flexi-Fit Beige',
    category: 'Celana',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-chino-beige.jpg'
    ],
    link: '/products/shill-chino-pants-flexi-fit-beige',
    rating: 5.0,
    reviewCount: 152,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige'],
    isNew: true
  },

  // Cargo Pants (3 Variants) - Rp159.000
  {
    id: 'shill-pants-cargo-black',
    title: 'Shill Cargo Pants Cotton Twill Black',
    category: 'Celana',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-cargo-black.jpg'
    ],
    link: '/products/shill-cargo-pants-cotton-twill-black',
    rating: 5.0,
    reviewCount: 184,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    isNew: true
  },
  {
    id: 'shill-pants-cargo-olive',
    title: 'Shill Cargo Pants Cotton Twill Olive Green',
    category: 'Celana',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-cargo-olive.jpg'
    ],
    link: '/products/shill-cargo-pants-cotton-twill-olive-green',
    rating: 4.9,
    reviewCount: 160,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Olive Green'],
    isNew: true
  },
  {
    id: 'shill-pants-cargo-khaki',
    title: 'Shill Cargo Pants Cotton Twill Khaki',
    category: 'Celana',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-cargo-khaki.jpg'
    ],
    link: '/products/shill-cargo-pants-cotton-twill-khaki',
    rating: 5.0,
    reviewCount: 172,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Khaki'],
    isNew: true
  },

  // Jogger Pants (3 Variants) - Rp249.000
  {
    id: 'shill-pants-jogger-black',
    title: 'Shill Jogger Pants Flexi-Fit Black',
    category: 'Celana',
    price: 249000,
    formattedPrice: 'Rp 249.000',
    compareAtPrice: 349000,
    formattedCompareAtPrice: 'Rp 349.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-jogger-black.jpg'
    ],
    link: '/products/shill-jogger-pants-flexi-fit-black',
    rating: 5.0,
    reviewCount: 136,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    isNew: true
  },
  {
    id: 'shill-pants-jogger-darkgrey',
    title: 'Shill Jogger Pants Flexi-Fit Dark Grey',
    category: 'Celana',
    price: 249000,
    formattedPrice: 'Rp 249.000',
    compareAtPrice: 349000,
    formattedCompareAtPrice: 'Rp 349.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-jogger-darkgrey.jpg'
    ],
    link: '/products/shill-jogger-pants-flexi-fit-dark-grey',
    rating: 4.9,
    reviewCount: 118,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Dark Grey'],
    isNew: true
  },
  {
    id: 'shill-pants-jogger-beige',
    title: 'Shill Jogger Pants Flexi-Fit Beige',
    category: 'Celana',
    price: 249000,
    formattedPrice: 'Rp 249.000',
    compareAtPrice: 349000,
    formattedCompareAtPrice: 'Rp 349.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-jogger-beige.jpg'
    ],
    link: '/products/shill-jogger-pants-flexi-fit-beige',
    rating: 5.0,
    reviewCount: 125,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige'],
    isNew: true
  },

  // Short Pants (3 Variants) - Rp179.000
  {
    id: 'shill-pants-short-black',
    title: 'Shill Short Pants Flexi-Fit Black',
    category: 'Celana',
    price: 179000,
    formattedPrice: 'Rp 179.000',
    compareAtPrice: 279000,
    formattedCompareAtPrice: 'Rp 279.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-short-black.jpg'
    ],
    link: '/products/shill-short-pants-flexi-fit-black',
    rating: 5.0,
    reviewCount: 147,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    isNew: true
  },
  {
    id: 'shill-pants-short-navy',
    title: 'Shill Short Pants Flexi-Fit Navy',
    category: 'Celana',
    price: 179000,
    formattedPrice: 'Rp 179.000',
    compareAtPrice: 279000,
    formattedCompareAtPrice: 'Rp 279.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-short-navy.jpg'
    ],
    link: '/products/shill-short-pants-flexi-fit-navy',
    rating: 4.9,
    reviewCount: 132,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy'],
    isNew: true
  },
  {
    id: 'shill-pants-short-army',
    title: 'Shill Short Pants Flexi-Fit Army Green',
    category: 'Celana',
    price: 179000,
    formattedPrice: 'Rp 179.000',
    compareAtPrice: 279000,
    formattedCompareAtPrice: 'Rp 279.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-pants-short-army.jpg'
    ],
    link: '/products/shill-short-pants-flexi-fit-army-green',
    rating: 5.0,
    reviewCount: 155,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Army Green'],
    isNew: true
  },

  // Oxford Shirt Lengan Pendek (3 Variants) - Rp159.000
  {
    id: 'shill-shirt-oxford-short-white',
    title: 'Shill Oxford Shirt Lengan Pendek White',
    category: 'Kemeja',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 249000,
    formattedCompareAtPrice: 'Rp 249.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-oxford-short-white.jpg'
    ],
    link: '/products/shill-oxford-shirt-lengan-pendek-white',
    rating: 5.0,
    reviewCount: 168,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
    isNew: true
  },
  {
    id: 'shill-shirt-oxford-short-navy',
    title: 'Shill Oxford Shirt Lengan Pendek Navy',
    category: 'Kemeja',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 249000,
    formattedCompareAtPrice: 'Rp 249.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-oxford-short-navy.jpg'
    ],
    link: '/products/shill-oxford-shirt-lengan-pendek-navy',
    rating: 4.9,
    reviewCount: 142,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy'],
    isNew: true
  },
  {
    id: 'shill-shirt-oxford-short-blue',
    title: 'Shill Oxford Shirt Lengan Pendek Light Blue',
    category: 'Kemeja',
    price: 159000,
    formattedPrice: 'Rp 159.000',
    compareAtPrice: 249000,
    formattedCompareAtPrice: 'Rp 249.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-oxford-short-blue.jpg'
    ],
    link: '/products/shill-oxford-shirt-lengan-pendek-light-blue',
    rating: 5.0,
    reviewCount: 156,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Light Blue'],
    isNew: true
  },

  // Oxford Shirt Lengan Panjang (3 Variants) - Rp189.000
  {
    id: 'shill-shirt-oxford-long-white',
    title: 'Shill Oxford Shirt Lengan Panjang White',
    category: 'Kemeja',
    price: 189000,
    formattedPrice: 'Rp 189.000',
    compareAtPrice: 289000,
    formattedCompareAtPrice: 'Rp 289.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-oxford-long-white.jpg'
    ],
    link: '/products/shill-oxford-shirt-lengan-panjang-white',
    rating: 5.0,
    reviewCount: 195,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
    isNew: true
  },
  {
    id: 'shill-shirt-oxford-long-blue',
    title: 'Shill Oxford Shirt Lengan Panjang Light Blue',
    category: 'Kemeja',
    price: 189000,
    formattedPrice: 'Rp 189.000',
    compareAtPrice: 289000,
    formattedCompareAtPrice: 'Rp 289.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-oxford-long-blue.jpg'
    ],
    link: '/products/shill-oxford-shirt-lengan-panjang-light-blue',
    rating: 4.9,
    reviewCount: 178,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Light Blue'],
    isNew: true
  },
  {
    id: 'shill-shirt-oxford-long-navy',
    title: 'Shill Oxford Shirt Lengan Panjang Navy',
    category: 'Kemeja',
    price: 189000,
    formattedPrice: 'Rp 189.000',
    compareAtPrice: 289000,
    formattedCompareAtPrice: 'Rp 289.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-oxford-long-navy.jpg'
    ],
    link: '/products/shill-oxford-shirt-lengan-panjang-navy',
    rating: 5.0,
    reviewCount: 184,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy'],
    isNew: true
  },

  // Kemeja Lengan Pendek Rayon (3 Variants) - Rp139.000
  {
    id: 'shill-shirt-rayon-beige',
    title: 'Shill Kemeja Lengan Pendek Rayon Cream Beige',
    category: 'Kemeja',
    price: 139000,
    formattedPrice: 'Rp 139.000',
    compareAtPrice: 219000,
    formattedCompareAtPrice: 'Rp 219.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-rayon-beige.jpg'
    ],
    link: '/products/shill-kemeja-lengan-pendek-rayon-cream-beige',
    rating: 5.0,
    reviewCount: 172,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Cream Beige'],
    isNew: true
  },
  {
    id: 'shill-shirt-rayon-navy',
    title: 'Shill Kemeja Lengan Pendek Rayon Navy',
    category: 'Kemeja',
    price: 139000,
    formattedPrice: 'Rp 139.000',
    compareAtPrice: 219000,
    formattedCompareAtPrice: 'Rp 219.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-rayon-navy.jpg'
    ],
    link: '/products/shill-kemeja-lengan-pendek-rayon-navy',
    rating: 4.9,
    reviewCount: 148,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy'],
    isNew: true
  },
  {
    id: 'shill-shirt-rayon-sage',
    title: 'Shill Kemeja Lengan Pendek Rayon Sage Green',
    category: 'Kemeja',
    price: 139000,
    formattedPrice: 'Rp 139.000',
    compareAtPrice: 219000,
    formattedCompareAtPrice: 'Rp 219.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-rayon-sage.jpg'
    ],
    link: '/products/shill-kemeja-lengan-pendek-rayon-sage-green',
    rating: 5.0,
    reviewCount: 164,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Sage Green'],
    isNew: true
  },

  // Flannel Shirt Lengan Panjang (3 Variants) - Rp169.000
  {
    id: 'shill-shirt-flannel-blackgrey',
    title: 'Shill Flannel Shirt Lengan Panjang Black Grey',
    category: 'Kemeja',
    price: 169000,
    formattedPrice: 'Rp 169.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-flannel-blackgrey.jpg'
    ],
    link: '/products/shill-flannel-shirt-lengan-panjang-black-grey',
    rating: 5.0,
    reviewCount: 189,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black Grey'],
    isNew: true
  },
  {
    id: 'shill-shirt-flannel-brownnavy',
    title: 'Shill Flannel Shirt Lengan Panjang Brown Navy',
    category: 'Kemeja',
    price: 169000,
    formattedPrice: 'Rp 169.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-flannel-brownnavy.jpg'
    ],
    link: '/products/shill-flannel-shirt-lengan-panjang-brown-navy',
    rating: 4.9,
    reviewCount: 158,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Brown Navy'],
    isNew: true
  },
  {
    id: 'shill-shirt-flannel-greenblack',
    title: 'Shill Flannel Shirt Lengan Panjang Dark Green',
    category: 'Kemeja',
    price: 169000,
    formattedPrice: 'Rp 169.000',
    compareAtPrice: 259000,
    formattedCompareAtPrice: 'Rp 259.000',
    discountBadge: 'Sale',
    images: [
      '/sites/shillstore/root/images/prod-shirt-flannel-greenblack.jpg'
    ],
    link: '/products/shill-flannel-shirt-lengan-panjang-dark-green',
    rating: 5.0,
    reviewCount: 176,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Dark Green'],
    isNew: true
  }
];

// Blog Posts Data
export const blogStoriesData: BlogStory[] = [
  {
    id: 'blog-mpl',
    title: 'Shill x MPL Indonesia',
    excerpt: 'Ditengah hiruk pikuk persaingan dunia fashion maupun game, hadir rilisan spesial yang mempertemukan ambisi besar dan kreativitas streetwear...',
    image: '/sites/shillstore/root/images/blog-mpl.png',
    link: '/blogs/blogs/shill-x-mpl-indonesia',
    tag: 'Blogs',
    instagramHandle: '@shillstore'
  },
  {
    id: 'blog-evos',
    title: 'Shill x EVOS esports',
    excerpt: 'Langkah berani Shill dalam mendukung ekosistem esports tanah air terwujud melalui kerja sama apparel resmi bersama EVOS esports...',
    image: '/sites/shillstore/root/images/blog-evos.jpg',
    link: '/blogs/news/shill-x-evos-esports',
    tag: 'Blogs',
    instagramHandle: '@shillstore'
  },
  {
    id: 'blog-why-buy',
    title: 'Kenapa Harus Beli di Website Shill?',
    excerpt: 'Beli langsung di website resmi Shill memberikan banyak keuntungan: jaminan 100% produk original, gratis ongkir ke seluruh Indonesia, serta jaminan return & refund tanpa ribet...',
    image: '/sites/shillstore/root/images/collage-why-buy.jpg',
    link: '/blogs/news/kenapa-harus-beli-di-website-shill',
    tag: 'News',
    instagramHandle: '@shillstore'
  },
  {
    id: 'blog-pickup',
    title: 'Layanan Baru: Pickup in Store',
    excerpt: 'Sekarang kamu bisa memesan outfit Shill favoritmu secara online melalui website dan langsung mengambilnya di outlet Shill Store terdekat tanpa antri...',
    image: '/sites/shillstore/root/images/collage-pickup.jpg',
    link: '/blogs/news/pickup-instore',
    tag: 'News',
    instagramHandle: '@shillstore'
  }
];

// Collections metadata
export const collectionsList = [
  { handle: 'all-t-shirt', title: 'Kaos / T-Shirt', description: 'Pilihan kaos grafis, oversized, polos, dan washed t-shirt berbahan katun premium.' },
  { handle: 'all-shirt', title: 'Kemeja Pria & Wanita', description: 'Koleksi kemeja lengan pendek rayon, oxford shirt, dan flannel trendi.' },
  { handle: 'flight-jacket', title: 'Jaket & Outerwear', description: 'Parka jacket, coach jacket, varsity, dan windbreaker untuk petualangan harianmu.' },
  { handle: 'category-pants-chino-pants', title: 'Celana / Pants', description: 'Chino pants, cargo pants, jogger pants, dan short pants berfitur flexi-fit.' },
  { handle: 'accessories', title: 'Aksesoris', description: 'Topi, tas, kaos kaki, dan perlengkapan fungsional pelengkap gaya urbanmu.' },
  { handle: 'perfume', title: 'Parfum Series', description: 'Aroma wewangian segar dan berkelas menemani setiap kegiatanmu.' },
  { handle: 'atasan', title: 'Kategori Atasan', description: 'Koleksi lengkap pakaian atasan kasual: Kaos, Kemeja, Hoodie, dan Jaket.' },
  { handle: 'bawahan', title: 'Kategori Bawahan', description: 'Koleksi lengkap celana panjang, chino, cargo, dan celana pendek santai.' }
];

// Offline Store Locations
export const storeLocations = [
  {
    name: 'Shill Store Bekasi',
    address: 'Ruko Grand Galaxy City, Jl. Boulevard Raya timur RGB No.96, RT.001/RW.002, Jaka Setia, Bekasi Selatan, Kota Bekasi, Jawa Barat 17148',
    hours: '10.00 - 22.00 WIB',
    phone: '0811-9757-222',
    mapUrl: 'https://maps.app.goo.gl/oiieTPFB1vv8qpqB6'
  },
  {
    name: 'Shill Store Pamulang',
    address: 'Jl. Pamulang Permai No.14 Blok SH21, Pamulang Barat, Kec. Pamulang, Kota Tangerang Selatan, Banten 15417',
    hours: '10.00 - 22.00 WIB',
    phone: '0811-9757-222',
    mapUrl: 'https://maps.app.goo.gl/E716sAiEZYTogU3c8'
  },
  {
    name: 'Shill Store Banjarbaru',
    address: 'Jl. A. Yani No.km 35, Loktabat Sel., Kec. Banjarbaru Selatan, Kota Banjar Baru, Kalimantan Selatan 70721',
    hours: '10.00 - 22.00 WITA',
    phone: '0811-9757-222',
    mapUrl: 'https://maps.app.goo.gl/3sX68tX5XkKLQmP48'
  }
];

// FAQs
export const faqList = [
  {
    q: 'Berapa lama estimasi pengiriman pesanan?',
    a: 'Pengiriman untuk area Jabodetabek berkisar antara 1-3 hari kerja, sedangkan untuk luar Jabodetabek berkisar 3-7 hari kerja tergantung lokasi dan ekspedisi yang dipilih.'
  },
  {
    q: 'Apakah bisa melakukan penukaran ukuran (size exchange)?',
    a: 'Ya, penukaran ukuran dapat dilakukan maksimal 7 hari setelah barang diterima, asalkan tag harga masih terpasang dan produk belum dicuci/dipakai.'
  },
  {
    q: 'Metode pembayaran apa saja yang diterima?',
    a: 'Kami menerima berbagai metode pembayaran aman: Transfer Bank (BCA, Mandiri, BNI, BRI), E-Wallet (GoPay, OVO, ShopeePay, DANA), QRIS, serta Kartu Kredit/Debit Visa dan Mastercard.'
  },
  {
    q: 'Bagaimana cara melacak pesanan saya?',
    a: 'Nomor resi pengiriman akan dikirimkan otomatis melalui email dan WhatsApp setelah pesanan diserahkan ke pihak ekspedisi. Kamu juga bisa mengeceknya di halaman Lacak Pesanan.'
  },
  {
    q: 'Apakah Shill menyediakan pengiriman gratis ongkir?',
    a: 'Ya! Kami menyediakan promo Pasti Gratis Ongkir ke seluruh Indonesia sesuai syarat dan ketentuan promo yang sedang berlangsung.'
  }
];

// Navigation menu structure
export const navCategories = [
  {
    title: 'Kaos',
    href: '/collections/all-t-shirt',
    badge: null,
    sublinks: [
      { label: 'Semua Kaos', href: '/collections/all-t-shirt' },
      { label: 'T-Shirt Regular', href: '/collections/all-t-shirt' },
      { label: 'T-Shirt Oversize', href: '/collections/all-t-shirt' }
    ]
  },
  {
    title: 'Kemeja',
    href: '/collections/all-shirt',
    badge: null,
    sublinks: [
      { label: 'Semua Kemeja', href: '/collections/all-shirt' },
      { label: 'Short Shirt Rayon', href: '/collections/all-shirt' },
      { label: 'Oxford Shirt', href: '/collections/all-shirt' }
    ]
  },
  {
    title: 'Jaket',
    href: '/collections/flight-jacket',
    badge: null,
    sublinks: [
      { label: 'Semua Jaket', href: '/collections/flight-jacket' },
      { label: 'Parka Jacket', href: '/collections/flight-jacket' },
      { label: 'Coach Jacket', href: '/collections/flight-jacket' }
    ]
  },
  {
    title: 'Celana',
    href: '/collections/category-pants-chino-pants',
    badge: null,
    sublinks: [
      { label: 'Semua Celana', href: '/collections/category-pants-chino-pants' },
      { label: 'Chino Pants', href: '/collections/category-pants-chino-pants' },
      { label: 'Relax Chino', href: '/collections/category-pants-chino-pants' }
    ]
  },
  {
    title: 'Aksesoris',
    href: '/collections/accessories',
    badge: null,
    sublinks: [
      { label: 'Topi', href: '/collections/accessories' },
      { label: 'Tas & Aksesoris', href: '/collections/accessories' }
    ]
  },
  {
    title: 'Parfum',
    href: '/collections/perfume',
    badge: null
  },
  {
    title: 'Lokasi Toko',
    href: '/pages/our-store',
    badge: null
  }
];
