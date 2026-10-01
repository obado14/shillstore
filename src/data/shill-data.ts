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
  {
    id: 'shill-p-1',
    title: 'Shill T-Shirt Oversize Antelope Black Unisex',
    category: 'Kaos',
    price: 110000,
    formattedPrice: 'Rp 110.000',
    compareAtPrice: 200000,
    formattedCompareAtPrice: 'Rp 200.000',
    discountBadge: 'Sale',
    images: ['https://shillstore.co.id/cdn/shop/files/T-SHIRT-OVERSIZE-ANTELOPE-BLACK-100.jpg?v=1750320047&width=600'],
    link: '/products/shill-t-shirt-oversize-antelope-black-unisex',
    rating: 4.9,
    reviewCount: 312,
    isNew: true
  },
  {
    id: 'shill-p-2',
    title: 'Shill Chino Pants Sirius Black Unisex',
    category: 'Celana',
    price: 183000,
    formattedPrice: 'Rp 183.000',
    compareAtPrice: 350000,
    formattedCompareAtPrice: 'Rp 350.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-chino-sirius-black.jpg'],
    link: '/products/shill-chino-pants-sirius-black-unisex',
    rating: 4.9,
    reviewCount: 1420,
    isNew: true
  },
  {
    id: 'shill-p-4',
    title: 'Shill Chino Pants Light Grey Unisex',
    category: 'Celana',
    price: 183000,
    formattedPrice: 'Rp 183.000',
    compareAtPrice: 350000,
    formattedCompareAtPrice: 'Rp 350.000',
    discountBadge: 'Sale',
    images: ['https://shillstore.co.id/cdn/shop/files/1ZApO4Cs-PAUL-LIGHT-GREY-100.jpg?v=1750320425&width=600'],
    link: '/products/shill-chino-pants-paul-light-grey-unisex',
    rating: 4.9,
    reviewCount: 680,
    isNew: true
  },
  {
    id: 'shill-p-5',
    title: 'Shill Chino Pants Dark Grey Unisex',
    category: 'Celana',
    price: 183000,
    formattedPrice: 'Rp 183.000',
    compareAtPrice: 350000,
    formattedCompareAtPrice: 'Rp 350.000',
    discountBadge: 'Sale',
    images: ['https://shillstore.co.id/cdn/shop/files/mnMoBBDL-CHINO-PANTS-JACOB-DARK-GREY-100.jpg?v=1750320443&width=600'],
    link: '/products/shill-chino-pants-jacob-dark-grey-unisex',
    rating: 4.8,
    reviewCount: 512,
    isNew: true
  },
  {
    id: 'shill-p-9',
    title: 'Shill Relax Chino Pants Egan Khaky - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-relax-chino-egan-khaky.jpg'],
    link: '/products/shill-relax-chino-pants-egan-khaky-celana-panjang-relax-unisex',
    rating: 4.9,
    reviewCount: 780
  },
  {
    id: 'shill-p-10',
    title: 'Shill Relax Chino Pants Elvin Mocca - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-relax-chino-elvin-mocca.jpg'],
    link: '/products/shill-relax-chino-pants-elvin-mocca-celana-panjang-relax-unisex',
    rating: 4.8,
    reviewCount: 520
  },
  {
    id: 'shill-p-11',
    title: 'Shill Relax Chino Pants Eldon Pebble - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-relax-chino-eldon-pebble.jpg'],
    link: '/products/shill-relax-chino-pants-eldon-pebble-celana-panjang-relax-unisex',
    rating: 4.9,
    reviewCount: 615
  },
  {
    id: 'shill-p-12',
    title: 'Shill Relax Chino Pants Errol Black - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-relax-chino-errol-black.jpg'],
    link: '/products/shill-relax-chino-pants-errol-black-celana-panjang-relax-unisex',
    rating: 5.0,
    reviewCount: 940
  },
  {
    id: 'shill-p-13',
    title: 'Shill Relax Chino Pants Erven Olive - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-relax-chino-erven-olive.jpg'],
    link: '/products/shill-relax-chino-pants-erven-olive-celana-panjang-relax-unisex',
    rating: 4.8,
    reviewCount: 430
  },
  {
    id: 'shill-p-14',
    title: 'Shill Relax Chino Pants Evgeni Oyster Grey - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/shillstore/root/images/prod-relax-chino-evgeni-oyster.jpg'],
    link: '/products/shill-relax-chino-pants-evgeni-oyster-grey-celana-panjang-relax-unisex',
    rating: 4.9,
    reviewCount: 885
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
