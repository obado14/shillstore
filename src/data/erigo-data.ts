import { Product, BannerSlide, CollageItem, CategoryPill, BlogStory } from '@/types/erigo';

export const announcements = [
  'Pasti Gratis Ongkir',
  'First Checkout, get 30k',
  'Always Purchase 250k, get Disc20k',
  'Always Purchase 150k, get Disc10k'
];

export const bannerSlides: BannerSlide[] = [
  {
    id: 'slide-cargo',
    title: 'CARGO PANTS',
    subtitle: 'New Arrival',
    desktopImage: '/sites/erigostore-co-id/root/images/hero-cargo-desktop.jpg',
    mobileImage: '/sites/erigostore-co-id/root/images/hero-cargo-mobile.jpg',
    link: '/collections/all-product',
    buttonText: 'Belanja Sekarang'
  },
  {
    id: 'slide-parka',
    title: 'PARKA JACKET',
    subtitle: 'New Arrival',
    desktopImage: '/sites/erigostore-co-id/root/images/hero-parka-desktop.jpg',
    mobileImage: '/sites/erigostore-co-id/root/images/hero-parka-mobile.jpg',
    link: '/collections/flight-jacket',
    buttonText: 'Lihat Koleksi'
  },
  {
    id: 'slide-chino',
    title: 'CHINO PANTS FLEXI FIT',
    subtitle: 'New Arrival',
    desktopImage: '/sites/erigostore-co-id/root/images/hero-chino-desktop.jpg',
    mobileImage: '/sites/erigostore-co-id/root/images/hero-chino-desktop.jpg',
    link: '/collections/category-pants-chino-pants',
    buttonText: 'Beli Sekarang'
  },
  {
    id: 'slide-chino-short',
    title: 'CHINO SHORT FLEXI FIT',
    subtitle: 'New Arrival',
    desktopImage: '/sites/erigostore-co-id/root/images/hero-chino-short-desktop.jpg',
    mobileImage: '/sites/erigostore-co-id/root/images/hero-chino-short-desktop.jpg',
    link: '/collections/category-pants-chino-pants',
    buttonText: 'Beli Sekarang'
  },
  {
    id: 'slide-jogger',
    title: 'JOGGER PANTS FLEXI FIT',
    subtitle: 'New Arrival',
    desktopImage: '/sites/erigostore-co-id/root/images/hero-jogger-desktop.jpg',
    mobileImage: '/sites/erigostore-co-id/root/images/hero-jogger-desktop.jpg',
    link: '/collections/category-pants-chino-pants',
    buttonText: 'Beli Sekarang'
  },
  {
    id: 'slide-oxford',
    title: 'OXFORD SHIRT',
    subtitle: 'Signature Style',
    desktopImage: '/sites/erigostore-co-id/root/images/hero-oxford-desktop.jpg',
    mobileImage: '/sites/erigostore-co-id/root/images/hero-oxford-desktop.jpg',
    link: '/collections/all-shirt',
    buttonText: 'Lihat Sekarang'
  },
  {
    id: 'slide-contrast',
    title: 'T-SHIRT CONTRAST',
    subtitle: 'Everyday Casual',
    desktopImage: '/sites/erigostore-co-id/root/images/hero-tshirt-contrast.jpg',
    mobileImage: '/sites/erigostore-co-id/root/images/hero-tshirt-contrast.jpg',
    link: '/collections/all-t-shirt',
    buttonText: 'Beli Sekarang'
  },
  {
    id: 'slide-relax-chino',
    title: 'RELAX CHINO PANTS',
    subtitle: 'Relaxed Fit',
    desktopImage: '/sites/erigostore-co-id/root/images/hero-relax-chino.jpg',
    mobileImage: '/sites/erigostore-co-id/root/images/hero-relax-chino.jpg',
    link: '/collections/category-pants-chino-pants',
    buttonText: 'Lihat Koleksi'
  },
  {
    id: 'slide-movease',
    title: 'ERIGO MOVEASE',
    subtitle: 'Bergerak Bebas',
    desktopImage: '/sites/erigostore-co-id/root/images/hero-movease.jpg',
    mobileImage: '/sites/erigostore-co-id/root/images/hero-movease.jpg',
    link: '/pages/bergerakbebas-movease-by-erigo',
    buttonText: 'Jelajahi'
  }
];

export const collageItems: CollageItem[] = [
  {
    id: 'collage-why-buy',
    title: 'Kenapa harus beli di Website Erigo',
    subtitle: '',
    points: ['• Gratis Ongkir', '• Jaminan Return/Refund'],
    image: '/sites/erigostore-co-id/root/images/collage-why-buy.jpg',
    link: '/blogs/news/kenapa-harus-beli-di-website-erigo',
    buttonText: 'Selengkapnya',
    buttonStyle: 'primary'
  },
  {
    id: 'collage-oxford',
    title: 'Oxford Shirt',
    subtitle: 'New Arrival',
    image: '/sites/erigostore-co-id/root/images/collage-oxford.jpg',
    link: '/collections/all-shirt',
    buttonText: '',
    buttonStyle: 'outline'
  },
  {
    id: 'collage-pickup',
    title: 'PICKUP IN STORE',
    subtitle: '',
    image: '/sites/erigostore-co-id/root/images/collage-pickup.jpg',
    link: '/blogs/news/pickup-instore',
    buttonText: 'PICKUP IN STORE',
    buttonStyle: 'yellow'
  }
];

export const categoryPills: CategoryPill[] = [
  { id: 'cat-atasan', title: 'Atasan', icon: '/sites/erigostore-co-id/root/images/cat-atasan.png', link: '/collections/atasan' },
  { id: 'cat-bawahan', title: 'Bawahan', icon: '/sites/erigostore-co-id/root/images/cat-bawahan.png', link: '/collections/bawahan' },
  { id: 'cat-aksesoris', title: 'Aksesoris', icon: '/sites/erigostore-co-id/root/images/cat-aksesoris.png', link: '/collections/accessories' }
];

export const productsData: Product[] = [
  {
    id: 'p1',
    title: 'Erigo Chino Pants Sirius Black Unisex',
    category: 'Chino Pants',
    price: 183000,
    formattedPrice: 'Rp 183.000',
    compareAtPrice: 350000,
    formattedCompareAtPrice: 'Rp 350.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-chino-sirius-black.jpg'],
    link: '/products/erigo-chino-pants-sirius-black-unisex',
    rating: 4.9,
    reviewCount: 1420,
    isNew: true
  },
  {
    id: 'p2',
    title: 'Erigo Short Shirt Pocket Daeio Olive - Kemeja Lengan Pendek Rayon Unisex',
    category: 'Short Shirt',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    compareAtPrice: 280000,
    formattedCompareAtPrice: 'Rp 280.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-short-shirt-daeio-olive.jpg'],
    link: '/products/erigo-short-shirt-pocket-daeio-olive',
    rating: 4.8,
    reviewCount: 890,
    isNew: true
  },
  {
    id: 'p3',
    title: 'Erigo Short Shirt Pocket Danvin Teracotta - Kemeja Lengan Pendek Rayon Unisex',
    category: 'Short Shirt',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    compareAtPrice: 280000,
    formattedCompareAtPrice: 'Rp 280.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-short-shirt-danvin-teracotta.jpg'],
    link: '/products/erigo-short-shirt-pocket-danvin-teracotta',
    rating: 4.9,
    reviewCount: 1102
  },
  {
    id: 'p4',
    title: 'Erigo Short Shirt Pocket Dalwyn Brown - Kemeja Lengan Pendek Rayon Unisex',
    category: 'Short Shirt',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    compareAtPrice: 280000,
    formattedCompareAtPrice: 'Rp 280.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-short-shirt-dalwyn-brown.jpg'],
    link: '/products/erigo-short-shirt-pocket-dalwyn-brown',
    rating: 4.7,
    reviewCount: 654
  },
  {
    id: 'p5',
    title: 'Erigo Relax Chino Pants Egan Khaky - Celana Panjang Relax Unisex',
    category: 'Relax Chino',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-egan-khaky.jpg'],
    link: '/products/erigo-relax-chino-pants-egan-khaky',
    rating: 4.9,
    reviewCount: 780
  },
  {
    id: 'p6',
    title: 'Erigo Relax Chino Pants Elvin Mocca - Celana Panjang Relax Unisex',
    category: 'Relax Chino',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-elvin-mocca.jpg'],
    link: '/products/erigo-relax-chino-pants-elvin-mocca',
    rating: 4.8,
    reviewCount: 520
  },
  {
    id: 'p7',
    title: 'Erigo Relax Chino Pants Eldon Pebble - Celana Panjang Relax Unisex',
    category: 'Relax Chino',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-eldon-pebble.jpg'],
    link: '/products/erigo-relax-chino-pants-eldon-pebble',
    rating: 4.9,
    reviewCount: 615
  },
  {
    id: 'p8',
    title: 'Erigo Relax Chino Pants Errol Black - Celana Panjang Relax Unisex',
    category: 'Relax Chino',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-errol-black.jpg'],
    link: '/products/erigo-relax-chino-pants-errol-black',
    rating: 5.0,
    reviewCount: 940
  },
  {
    id: 'p9',
    title: 'Erigo Relax Chino Pants Erven Olive - Celana Panjang Relax Unisex',
    category: 'Relax Chino',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-erven-olive.jpg'],
    link: '/products/erigo-relax-chino-pants-erven-olive',
    rating: 4.8,
    reviewCount: 430
  },
  {
    id: 'p10',
    title: 'Erigo Relax Chino Pants Evgeni Oyster Grey - Celana Panjang Relax Unisex',
    category: 'Relax Chino',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-evgeni-oyster.jpg'],
    link: '/products/erigo-relax-chino-pants-evgeni-oyster',
    rating: 4.9,
    reviewCount: 885
  }
];

export const blogStoriesData: BlogStory[] = [
  {
    id: 'blog-mpl',
    title: 'Kolaborasi Erigo x MPL Indonesia',
    excerpt: 'Ditengah hiruk pikuk persaingan dunia fashion maupun game, akhirnya tercipta kolaborasi yang mempertemukan ambisi besar dan kreativitas, menyatukan misi untuk melahirkan sesuatu yang akan menjadi perbincangan hangat...',
    image: '/sites/erigostore-co-id/root/images/blog-mpl.png',
    link: '/blogs/blogs/kolaborasi-erigo-x-mpl-indonesia',
    tag: 'Blogs',
    instagramHandle: '@erigostore'
  },
  {
    id: 'blog-evos',
    title: 'Kolaborasi Erigo x EVOS esports',
    excerpt: 'Langkah berani Erigo dalam mendukung ekosistem esports tanah air terwujud melalui kerja sama spesial dengan salah satu tim terbesar di Asia Tenggara, EVOS esports...',
    image: '/sites/erigostore-co-id/root/images/blog-evos.jpg',
    link: '/blogs/news/kolaborasi-erigo-x-evos-esports',
    tag: 'Blogs',
    instagramHandle: '@erigostore'
  }
];

export const navCategories = [
  {
    title: 'Semua Produk',
    href: '/collections/all-product',
    badge: null
  },
  {
    title: 'Kaos',
    href: '/collections/all-t-shirt',
    badge: null,
    sublinks: [
      { label: 'T-Shirt Regular', href: '/collections/t-shirt-regular' },
      { label: 'T-Shirt Oversize', href: '/collections/t-shirt-oversize' },
      { label: 'Washed T-Shirt', href: '/collections/washed-t-shirt' },
      { label: 'Long Sleeve', href: '/collections/long-sleeve' }
    ]
  },
  {
    title: 'Kemeja',
    href: '/collections/all-shirt',
    badge: null,
    sublinks: [
      { label: 'Short Shirt', href: '/collections/short-shirt' },
      { label: 'Oxford Shirt', href: '/collections/oxford-shirt' },
      { label: 'Flannel Shirt', href: '/collections/flannel-shirt' }
    ]
  },
  {
    title: 'Jaket',
    href: '/collections/flight-jacket',
    badge: null,
    sublinks: [
      { label: 'Coach Jacket', href: '/collections/coach-jacket' },
      { label: 'Parka Jacket', href: '/collections/parka-jacket' },
      { label: 'Windbreaker', href: '/collections/windbreaker' },
      { label: 'Varsity', href: '/collections/varsity' }
    ]
  },
  {
    title: 'Celana',
    href: '/collections/category-pants-chino-pants',
    badge: null,
    sublinks: [
      { label: 'Chino Pants', href: '/collections/chino-pants' },
      { label: 'Cargo Pants', href: '/collections/cargo-pants' },
      { label: 'Relax Chino', href: '/collections/relax-chino' },
      { label: 'Chino Short', href: '/collections/chino-short' },
      { label: 'Jogger Pants', href: '/collections/jogger-pants' }
    ]
  },
  {
    title: 'Aksesoris',
    href: '/collections/accessories',
    badge: null,
    sublinks: [
      { label: 'Topi', href: '/collections/topi' },
      { label: 'Tas & Backpack', href: '/collections/tas' },
      { label: 'Kaus Kaki', href: '/collections/kaus-kaki' }
    ]
  },
  {
    title: 'Parfum',
    href: '/collections/perfume',
    badge: null
  },
  {
    title: 'MOVEASE',
    href: '/pages/bergerakbebas-movease-by-erigo',
    badge: 'NEW'
  },
  {
    title: 'Kolaborasi',
    href: '#',
    badge: null,
    featuredCollabs: [
      { title: 'JKT48', image: '/sites/erigostore-co-id/root/images/mega-jkt48.jpg', href: '/collections/erigo-x-jkt48' },
      { title: 'MS Glow', image: '/sites/erigostore-co-id/root/images/mega-msglow.jpg', href: '/collections/ms-glow' },
      { title: 'MPL id', image: '/sites/erigostore-co-id/root/images/mega-mpl.jpg', href: '/collections/erigo-x-mpl' }
    ]
  },
  {
    title: 'Lokasi Toko',
    href: '/pages/our-store',
    badge: null
  }
];
