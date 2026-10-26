export type MenuCategoryId =
  | "all"
  | "best-sellers"
  | "chicken-flavors"
  | "ala-carte"
  | "unlimited"
  | "chao-fan"
  | "pepper-rice"
  | "sizzling"
  | "samgyupsal"
  | "takeout-bundles"
  | "snacks"
  | "drinks";

export interface CategoryInfo {
  id: MenuCategoryId;
  label: string;
  shortLabel: string;
  iconName: string;
  description: string;
  bannerBadge?: string;
}

export type ChickenFlavorName =
  | "Garlic Parmesan"
  | "Spicy Garlic Parmesan"
  | "Spicy Buffalo"
  | "Chili Cheese"
  | "Cheddar Cheese"
  | "Honey Glazed"
  | "Teriyaki"
  | "Salted Egg"
  | "Barbeque"
  | "Korean BBQ"
  | "Classic Gravy"
  | "Classic Orange Glazed";

export interface ChickenFlavorDetail {
  id: string;
  name: ChickenFlavorName;
  description: string;
  isSpicy?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  colorHex: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryId;
  price: number;
  originalPrice?: number;
  description: string;
  badge?: string;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isSpicy?: boolean;
  inStock: boolean;
  portion?: string;
  image: string;
  hasFlavorSelection?: boolean;
  hasPastaSelection?: boolean;
  sauceOptions?: string[];
  inclusions?: string[];
  sideDishes?: string[];
}

export interface SamgyupSetDetail {
  id: string;
  code: "Set A" | "Set B" | "Set C";
  pricePerHead: number;
  minPersons: number;
  timeLimit: string;
  tagline: string;
  highlightBadge?: string;
  unlimitedItems: string[];
  complimentary: string[];
  sideDishes: string[];
  porkFlavors: string[];
  chickenFlavors?: string[];
  sauceDips: string[];
}

export interface CartItem {
  cartId: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  selectedFlavor?: string;
  selectedPasta?: string;
  selectedSauce?: string;
  specialInstructions?: string;
  image: string;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  location: string;
  fullAddress: string;
  landmark: string;
  contactNumber: string;
  facebookUrl: string;
  messengerUrl: string;
  openingHours: string;
  operatingDays: string;
  samgyupHours: string;
  googleMapsEmbedUrl: string;
}

export interface PromoBanner {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  priceHighlight?: string;
  actionText: string;
  actionCategory?: MenuCategoryId;
  badge: string;
  bgColor: string;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  tagline: string;
  facebookUrl: string;
  messengerUrl?: string;
  badge: string;
  serviceType: string;
  color: string;
}

export interface ReservationFormData {
  fullName: string;
  contactNumber: string;
  email?: string;
  partySize: number;
  date: string;
  time: string;
  occasion: string;
  specialRequests?: string;
}
