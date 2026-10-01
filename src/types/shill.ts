export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  formattedPrice: string;
  compareAtPrice?: number;
  formattedCompareAtPrice?: string;
  discountBadge?: string;
  images: string[];
  link: string;
  rating?: number;
  reviewCount?: number;
  colors?: string[];
  sizes?: string[];
  isNew?: boolean;
}

export interface BannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  desktopImage: string;
  mobileImage: string;
  link: string;
  buttonText?: string;
}

export interface CollageItem {
  id: string;
  title: string;
  subtitle?: string;
  points?: string[];
  image: string;
  link: string;
  buttonText?: string;
  buttonStyle?: 'primary' | 'yellow' | 'outline';
}

export interface CategoryPill {
  id: string;
  title: string;
  icon: string;
  link: string;
}

export interface BlogStory {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
  tag: string;
  instagramHandle?: string;
}

export interface MegaMenuItem {
  title: string;
  links: { label: string; href: string }[];
  featuredImages: { image: string; title: string; href: string }[];
}
