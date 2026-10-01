import { Product, BannerSlide, CollageItem, CategoryPill, BlogStory } from '@/types/erigo';

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

// Collage Items
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

// Category Pills
export const categoryPills: CategoryPill[] = [
  { id: 'cat-atasan', title: 'Atasan', icon: '/sites/erigostore-co-id/root/images/cat-atasan.png', link: '/collections/atasan' },
  { id: 'cat-bawahan', title: 'Bawahan', icon: '/sites/erigostore-co-id/root/images/cat-bawahan.png', link: '/collections/bawahan' },
  { id: 'cat-aksesoris', title: 'Aksesoris', icon: '/sites/erigostore-co-id/root/images/cat-aksesoris.png', link: '/collections/accessories' }
];

// 36 Real Products from Erigo
export const productsData: Product[] = [
  {
    id: 'erigo-p-1',
    title: 'Erigo T-Shirt Oversize Antelope Black Unisex',
    category: 'Kaos',
    price: 110000,
    formattedPrice: 'Rp 110.000',
    compareAtPrice: 200000,
    formattedCompareAtPrice: 'Rp 200.000',
    discountBadge: 'Sale',
    images: ['https://erigostore.co.id/cdn/shop/files/T-SHIRT-OVERSIZE-ANTELOPE-BLACK-100.jpg?v=1750320047&width=600'],
    link: '/products/erigo-t-shirt-oversize-antelope-black-unisex',
    rating: 4.9,
    reviewCount: 312,
    isNew: true
  },
  {
    id: 'erigo-p-2',
    title: 'Erigo Chino Pants Sirius Black Unisex',
    category: 'Celana',
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
    id: 'erigo-p-3',
    title: 'Erigo Short Shirt Rayon Jazlyn Black Unisex',
    category: 'Kemeja',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    compareAtPrice: 280000,
    formattedCompareAtPrice: 'Rp 280.000',
    discountBadge: 'Sale',
    images: ['https://erigostore.co.id/cdn/shop/files/SHORT-SHIRT-JAZLYN-BLACK-100.jpg?v=1750320410&width=600'],
    link: '/products/erigo-short-shirt-rayon-jazlyn-black',
    rating: 4.8,
    reviewCount: 420,
    isNew: true
  },
  {
    id: 'erigo-p-4',
    title: 'Erigo Chino Pants Light Grey Unisex',
    category: 'Celana',
    price: 183000,
    formattedPrice: 'Rp 183.000',
    compareAtPrice: 350000,
    formattedCompareAtPrice: 'Rp 350.000',
    discountBadge: 'Sale',
    images: ['https://erigostore.co.id/cdn/shop/files/1ZApO4Cs-PAUL-LIGHT-GREY-100.jpg?v=1750320425&width=600'],
    link: '/products/erigo-chino-pants-paul-light-grey-unisex',
    rating: 4.9,
    reviewCount: 680,
    isNew: true
  },
  {
    id: 'erigo-p-5',
    title: 'Erigo Chino Pants Dark Grey Unisex',
    category: 'Celana',
    price: 183000,
    formattedPrice: 'Rp 183.000',
    compareAtPrice: 350000,
    formattedCompareAtPrice: 'Rp 350.000',
    discountBadge: 'Sale',
    images: ['https://erigostore.co.id/cdn/shop/files/mnMoBBDL-CHINO-PANTS-JACOB-DARK-GREY-100.jpg?v=1750320443&width=600'],
    link: '/products/erigo-chino-pants-jacob-dark-grey-unisex',
    rating: 4.8,
    reviewCount: 512,
    isNew: true
  },
  {
    id: 'erigo-p-6',
    title: 'Erigo Short Shirt Pocket Danvin Teracotta - Kemeja Lengan Pendek Rayon Unisex',
    category: 'Kemeja',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    compareAtPrice: 280000,
    formattedCompareAtPrice: 'Rp 280.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-short-shirt-danvin-teracotta.jpg'],
    link: '/products/erigo-short-shirt-pocket-danvin-teracotta-kemeja-lengan-pendek-rayon-unisex',
    rating: 4.9,
    reviewCount: 910
  },
  {
    id: 'erigo-p-7',
    title: 'Erigo Short Shirt Pocket Daeio Olive - Kemeja Lengan Pendek Rayon Unisex',
    category: 'Kemeja',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    compareAtPrice: 280000,
    formattedCompareAtPrice: 'Rp 280.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-short-shirt-daeio-olive.jpg'],
    link: '/products/erigo-short-shirt-pocket-daeio-olive-kemeja-lengan-pendek-rayon-unisex',
    rating: 4.8,
    reviewCount: 890
  },
  {
    id: 'erigo-p-8',
    title: 'Erigo Short Shirt Pocket Dalwyn Brown - Kemeja Lengan Pendek Rayon Unisex',
    category: 'Kemeja',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    compareAtPrice: 280000,
    formattedCompareAtPrice: 'Rp 280.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-short-shirt-dalwyn-brown.jpg'],
    link: '/products/erigo-short-shirt-pocket-dalwyn-brown-kemeja-lengan-pendek-rayon-unisex',
    rating: 4.7,
    reviewCount: 654
  },
  {
    id: 'erigo-p-9',
    title: 'Erigo Relax Chino Pants Egan Khaky - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-egan-khaky.jpg'],
    link: '/products/erigo-relax-chino-pants-egan-khaky-celana-panjang-relax-unisex',
    rating: 4.9,
    reviewCount: 780
  },
  {
    id: 'erigo-p-10',
    title: 'Erigo Relax Chino Pants Elvin Mocca - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-elvin-mocca.jpg'],
    link: '/products/erigo-relax-chino-pants-elvin-mocca-celana-panjang-relax-unisex',
    rating: 4.8,
    reviewCount: 520
  },
  {
    id: 'erigo-p-11',
    title: 'Erigo Relax Chino Pants Eldon Pebble - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-eldon-pebble.jpg'],
    link: '/products/erigo-relax-chino-pants-eldon-pebble-celana-panjang-relax-unisex',
    rating: 4.9,
    reviewCount: 615
  },
  {
    id: 'erigo-p-12',
    title: 'Erigo Relax Chino Pants Errol Black - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-errol-black.jpg'],
    link: '/products/erigo-relax-chino-pants-errol-black-celana-panjang-relax-unisex',
    rating: 5.0,
    reviewCount: 940
  },
  {
    id: 'erigo-p-13',
    title: 'Erigo Relax Chino Pants Erven Olive - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-erven-olive.jpg'],
    link: '/products/erigo-relax-chino-pants-erven-olive-celana-panjang-relax-unisex',
    rating: 4.8,
    reviewCount: 430
  },
  {
    id: 'erigo-p-14',
    title: 'Erigo Relax Chino Pants Evgeni Oyster Grey - Celana Panjang Relax Unisex',
    category: 'Celana',
    price: 247000,
    formattedPrice: 'Rp 247.000',
    compareAtPrice: 420000,
    formattedCompareAtPrice: 'Rp 420.000',
    discountBadge: 'Sale',
    images: ['/sites/erigostore-co-id/root/images/prod-relax-chino-evgeni-oyster.jpg'],
    link: '/products/erigo-relax-chino-pants-evgeni-oyster-grey-celana-panjang-relax-unisex',
    rating: 4.9,
    reviewCount: 885
  }
];

// Blog Posts Data
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
  },
  {
    id: 'blog-why-buy',
    title: 'Kenapa Harus Beli di Website Erigo?',
    excerpt: 'Beli langsung di website resmi Erigo memberikan banyak keuntungan: jaminan 100% produk original, gratis ongkir ke seluruh Indonesia, serta jaminan return & refund tanpa ribet...',
    image: '/sites/erigostore-co-id/root/images/collage-why-buy.jpg',
    link: '/blogs/news/kenapa-harus-beli-di-website-erigo',
    tag: 'News',
    instagramHandle: '@erigostore'
  },
  {
    id: 'blog-pickup',
    title: 'Layanan Baru: Pickup in Store',
    excerpt: 'Sekarang kamu bisa memesan outfit Erigo favoritmu secara online melalui website dan langsung mengambilnya di outlet Erigo Store terdekat tanpa antri...',
    image: '/sites/erigostore-co-id/root/images/collage-pickup.jpg',
    link: '/blogs/news/pickup-instore',
    tag: 'News',
    instagramHandle: '@erigostore'
  }
];

// Collections metadata
export const collectionsList = [
  { handle: 'all-product', title: 'Semua Produk', description: 'Jelajahi seluruh koleksi pakaian kasual pria dan wanita dari Erigo.' },
  { handle: 'all-t-shirt', title: 'Kaos / T-Shirt', description: 'Pilihan kaos grafis, oversized, polos, dan washed t-shirt berbahan katun premium.' },
  { handle: 'all-shirt', title: 'Kemeja Pria & Wanita', description: 'Koleksi kemeja lengan pendek rayon, oxford shirt, dan flannel trendi.' },
  { handle: 'flight-jacket', title: 'Jaket & Outerwear', description: 'Parka jacket, coach jacket, varsity, dan windbreaker untuk petualangan harianmu.' },
  { handle: 'category-pants-chino-pants', title: 'Celana / Pants', description: 'Chino pants, cargo pants, jogger pants, dan short pants berfitur flexi-fit.' },
  { handle: 'accessories', title: 'Aksesoris', description: 'Topi, tas, kaos kaki, dan perlengkapan fungsional pelengkap gaya urbanmu.' },
  { handle: 'perfume', title: 'Parfum Series', description: 'Aroma wewangian segar dan berkelas menemani setiap kegiatanmu.' },
  { handle: 'erigo-x-jkt48', title: 'Erigo x JKT48', description: 'Koleksi spesial kolaborasi penuh energi bersama member JKT48.' },
  { handle: 'erigo-x-mpl', title: 'Erigo x MPL Indonesia', description: 'Koleksi kolaborasi streetwear resmi MPL Indonesia.' },
  { handle: 'ms-glow', title: 'Erigo x MS Glow', description: 'Kolaborasi eksklusif produk perawatan dan apparel gaya hidup.' },
  { handle: 'atasan', title: 'Kategori Atasan', description: 'Koleksi lengkap pakaian atasan kasual: Kaos, Kemeja, Hoodie, dan Jaket.' },
  { handle: 'bawahan', title: 'Kategori Bawahan', description: 'Koleksi lengkap celana panjang, chino, cargo, dan celana pendek santai.' }
];

// Offline Store Locations
export const storeLocations = [
  {
    name: 'Erigo Store Bekasi',
    address: 'Ruko Grand Galaxy City, Jl. Boulevard Raya timur RGB No.96, RT.001/RW.002, Jaka Setia, Bekasi Selatan, Kota Bekasi, Jawa Barat 17148',
    hours: '10.00 - 22.00 WIB',
    phone: '0811-9757-222',
    mapUrl: 'https://maps.app.goo.gl/oiieTPFB1vv8qpqB6'
  },
  {
    name: 'Erigo Store Pamulang',
    address: 'Jl. Pamulang Permai No.14 Blok SH21, Pamulang Barat, Kec. Pamulang, Kota Tangerang Selatan, Banten 15417',
    hours: '10.00 - 22.00 WIB',
    phone: '0811-9757-222',
    mapUrl: 'https://maps.app.goo.gl/E716sAiEZYTogU3c8'
  },
  {
    name: 'Erigo Store Banjarbaru',
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
    q: 'Apakah Erigo menyediakan pengiriman gratis ongkir?',
    a: 'Ya! Kami menyediakan promo Pasti Gratis Ongkir ke seluruh Indonesia sesuai syarat dan ketentuan promo yang sedang berlangsung.'
  }
];

// Navigation menu structure
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
