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
  image?: string;
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

export interface BranchInfo {
  id: "san-jose" | "sibalom";
  name: string;
  town: string;
  tagline: string;
  badge: string;
  fullAddress: string;
  landmark: string;
  coordinates: {
    lat: number;
    lng: number;
    str: string;
  };
  facebookUrl: string;
  facebookHandle: string;
  messengerUrl: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  openingHours: string;
  operatingDays: string;
  samgyupHours: string;
  contactNumber: string;
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
  branches?: BranchInfo[];
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
  governmentIdFile?: string;
}

export interface TableReservationRecord {
  id: string;
  referenceCode: string;
  branchId: "san-jose" | "sibalom";
  branchName: string;
  fullName: string;
  phone: string;
  email?: string;
  partySize: string;
  date: string;
  time: string;
  diningType: string;
  notes?: string;
  idFileName: string;
  idFileSize?: string;
  idFileDataUrl?: string; // base64 preview of uploaded Government ID
  idType?: string;
  status: "pending" | "confirmed" | "seated" | "cancelled";
  createdAt: string;
}

// -------------------------------------------------------------
// REST API CONTRACTS & ENVELOPES (api-design & api-and-interface-design)
// -------------------------------------------------------------
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp: string;
  };
}

export interface AiRecommendationRequest {
  query: string;
  budget?: number;
  pax?: number;
  preferences?: string[];
  diningType?: "delivery" | "dine-in";
}

export interface AiRecommendedMeal {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  portion?: string;
  flavor?: string;
  image: string;
  reason: string;
}

export interface AiRecommendationResult {
  headline: string;
  tagline: string;
  summary: string;
  recommendedMeals: AiRecommendedMeal[];
  totalPrice: number;
  budget?: number;
  savingsNote?: string;
  recommendedCourier: {
    id: string;
    name: string;
    url: string;
    tip: string;
  };
  disclaimer: string;
}

export interface AnalyticsKpi {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
}

export interface SalesCategoryMetric {
  category: string;
  percentage: number;
  revenue: number;
  orderCount: number;
  colorHex: string;
}

export interface HourlyOrderMetric {
  hour: string;
  orders: number;
  peak: boolean;
}

export interface CourierDispatchMetric {
  name: string;
  sharePercentage: number;
  totalTrips: number;
  avgDeliveryMinutes: number;
  status: "active" | "busy";
}

export interface AnalyticsDashboardData {
  kpis: AnalyticsKpi[];
  categoryMetrics: SalesCategoryMetric[];
  hourlyTraffic: HourlyOrderMetric[];
  courierDispatches: CourierDispatchMetric[];
  recentSimulatedOrders: {
    id: string;
    customer: string;
    items: string;
    total: number;
    courier: string;
    timeAgo: string;
    status: "Delivered" | "Dispatched" | "Preparing";
  }[];
}
