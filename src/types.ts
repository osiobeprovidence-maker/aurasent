export type Category = 'Men' | 'Women' | 'Unisex' | 'Niche' | 'Gift Sets';

export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductVariant {
  size: string;
  price: number;
  inventory: number;
  sku: string;
  barcode: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  rating: number;
  category: Category;
  collection?: string;
  sku?: string;
  productType?: string;
  gender?: 'Men' | 'Women' | 'Unisex' | 'All';
  concentration?: string;
  launchYear?: number;
  quantity?: number;
  lowStockAlert?: number;
  availability?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  description: string;
  shortDescription?: string;
  usageInstructions?: string;
  perfectFor?: string;
  longevity?: string;
  projection?: string;
  season?: string;
  occasion?: string;
  images: string[];
  notes: FragranceNotes;
  ingredients: string[];
  reviews: Review[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isGiftReady?: boolean;
  isLimitedEdition?: boolean;
  isFeatured?: boolean;
  isExclusive?: boolean;
  isNewArrival?: boolean;
  recommendedPairings?: string[];
  variants?: ProductVariant[];
  seoTitle?: string;
  metaDescription?: string;
  urlSlug?: string;
  keywords?: string[];
  status?: 'Draft' | 'Ready for Review' | 'Published' | 'Archived';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  lastOrder: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
}

export interface StorePromotion {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  isActive: boolean;
}

export interface StoreStat {
  label: string;
  value: string;
  icon: string;
}

export interface StoreConfig {
  name: string;
  tagline: string;
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontVibe: 'Serif' | 'Sans' | 'Mono';
  headingFont: string;
  bodyFont: string;
  borderRadius: 'None' | 'Soft' | 'Deep';
  shadowStyle: 'Flat' | 'Subtle' | 'Elevated';
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroOverlay: number;
  enableNewsletter: boolean;
  enableTestimonials: boolean;
  enableInstagramFeed: boolean;
  // New Marketing Fields
  announcementText: string;
  enableAnnouncement: boolean;
  enablePopup: boolean;
  popupTitle: string;
  popupSubtitle: string;
  popupImage: string;
  promoBannerText: string;
  enablePromoBanner: boolean;
  promotions: StorePromotion[];
  stats: StoreStat[];
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}
