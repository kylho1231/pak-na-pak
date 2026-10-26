"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, MenuItem } from "@/types";

export interface DeliveryLiveLocation {
  lat: number;
  lng: number;
  accuracy: number;
  addressText: string;
  mapUrl: string;
}

export interface DeliveryOrderPayload {
  items: Array<{
    name: string;
    details?: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  packagingFee?: number;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  notes?: string;
  liveLocation?: DeliveryLiveLocation;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    item: MenuItem,
    customization?: {
      flavor?: string;
      pasta?: string;
      sauce?: string;
      instructions?: string;
      quantity?: number;
    }
  ) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  // Modal for customizing item before adding
  customizingItem: MenuItem | null;
  openCustomizer: (item: MenuItem) => void;
  closeCustomizer: () => void;
  // Menu scan viewer
  isScanModalOpen: boolean;
  selectedScanIndex: number;
  openScanModal: (index?: number) => void;
  closeScanModal: () => void;
  setSelectedScanIndex: (index: number) => void;
  // Delivery Riders modal
  isDeliveryModalOpen: boolean;
  deliveryPayload: DeliveryOrderPayload | null;
  openDeliveryModal: (payload?: DeliveryOrderPayload) => void;
  closeDeliveryModal: () => void;
  // Table Reservation modal
  isReservationModalOpen: boolean;
  reservationPrefill: { branch?: "san-jose" | "sibalom"; diningType?: string } | null;
  openReservationModal: (branch?: "san-jose" | "sibalom", diningType?: string) => void;
  closeReservationModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "pak_na_pak_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [selectedScanIndex, setSelectedScanIndex] = useState(0);

  // Delivery Riders modal state
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [deliveryPayload, setDeliveryPayload] = useState<DeliveryOrderPayload | null>(null);

  // Table Reservation modal state
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationPrefill, setReservationPrefill] = useState<{
    branch?: "san-jose" | "sibalom";
    diningType?: string;
  } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // LocalStorage access errors ignored
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  const addToCart = (
    item: MenuItem,
    customization?: {
      flavor?: string;
      pasta?: string;
      sauce?: string;
      instructions?: string;
      quantity?: number;
    }
  ) => {
    const qty = customization?.quantity ?? 1;
    const flavor = customization?.flavor || (item.hasFlavorSelection ? "Garlic Parmesan" : undefined);
    const pasta = customization?.pasta || (item.hasPastaSelection ? "Spaghetti" : undefined);
    const sauce = customization?.sauce || (item.sauceOptions ? item.sauceOptions[0] : undefined);

    // Create unique cart item ID based on combinations
    const cartId = `${item.id}-${flavor || "def"}-${pasta || "def"}-${sauce || "def"}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        {
          cartId,
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: qty,
          selectedFlavor: flavor,
          selectedPasta: pasta,
          selectedSauce: sauce,
          specialInstructions: customization?.instructions,
          image: item.image,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
  };

  const closeCustomizer = () => {
    setCustomizingItem(null);
  };

  const openScanModal = (index = 0) => {
    setSelectedScanIndex(index);
    setIsScanModalOpen(true);
  };

  const closeScanModal = () => {
    setIsScanModalOpen(false);
  };

  const openDeliveryModal = (payload?: DeliveryOrderPayload) => {
    if (payload) {
      setDeliveryPayload(payload);
    } else if (cart.length > 0) {
      setDeliveryPayload({
        items: cart.map((c) => ({
          name: c.name,
          details: [c.selectedFlavor, c.selectedPasta, c.selectedSauce]
            .filter(Boolean)
            .join(", "),
          price: c.price,
          quantity: c.quantity,
        })),
        total: cartTotal,
      });
    } else {
      setDeliveryPayload(null);
    }
    setIsDeliveryModalOpen(true);
  };

  const closeDeliveryModal = () => {
    setIsDeliveryModalOpen(false);
  };

  const openReservationModal = (branch?: "san-jose" | "sibalom", diningType?: string) => {
    setReservationPrefill({ branch, diningType });
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        customizingItem,
        openCustomizer,
        closeCustomizer,
        isScanModalOpen,
        selectedScanIndex,
        openScanModal,
        closeScanModal,
        setSelectedScanIndex,
        isDeliveryModalOpen,
        deliveryPayload,
        openDeliveryModal,
        closeDeliveryModal,
        isReservationModalOpen,
        reservationPrefill,
        openReservationModal,
        closeReservationModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
