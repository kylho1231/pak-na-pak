"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, PromoBanner } from "@/types";
import { INITIAL_MENU_ITEMS } from "@/data/menuData";
import { PROMO_BANNERS } from "@/data/storeData";

interface AdminContextType {
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  menuItems: MenuItem[];
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  toggleInStock: (id: string) => void;
  toggleBestSeller: (id: string) => void;
  promos: PromoBanner[];
  updatePromo: (id: string, updates: Partial<PromoBanner>) => void;
  resetAllDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const MENU_STORAGE_KEY = "pak_na_pak_menu_custom_v1";
const PROMOS_STORAGE_KEY = "pak_na_pak_promos_custom_v1";
const ADMIN_AUTH_KEY = "pak_na_pak_admin_auth";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [promos, setPromos] = useState<PromoBanner[]>(PROMO_BANNERS);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedMenu = localStorage.getItem(MENU_STORAGE_KEY);
      if (storedMenu) {
        setMenuItems(JSON.parse(storedMenu));
      }
      const storedPromos = localStorage.getItem(PROMOS_STORAGE_KEY);
      if (storedPromos) {
        setPromos(JSON.parse(storedPromos));
      }
      const isAuth = localStorage.getItem(ADMIN_AUTH_KEY);
      if (isAuth === "true") {
        setIsAdminLoggedIn(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save menu changes
  const saveMenuItems = (items: MenuItem[]) => {
    setMenuItems(items);
    try {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  };

  // Save promos changes
  const savePromos = (newPromos: PromoBanner[]) => {
    setPromos(newPromos);
    try {
      localStorage.setItem(PROMOS_STORAGE_KEY, JSON.stringify(newPromos));
    } catch {
      // Ignore
    }
  };

  const loginAdmin = (pin: string) => {
    // Master PIN or demo password: "pak" or "1234"
    if (pin.trim().toLowerCase() === "pak" || pin.trim() === "1234" || pin.trim().toLowerCase() === "admin") {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, "true");
      } catch {
        // Ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // Ignore
    }
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const updated = menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item));
    saveMenuItems(updated);
  };

  const toggleInStock = (id: string) => {
    const updated = menuItems.map((item) =>
      item.id === id ? { ...item, inStock: !item.inStock } : item
    );
    saveMenuItems(updated);
  };

  const toggleBestSeller = (id: string) => {
    const updated = menuItems.map((item) =>
      item.id === id ? { ...item, isBestSeller: !item.isBestSeller } : item
    );
    saveMenuItems(updated);
  };

  const updatePromo = (id: string, updates: Partial<PromoBanner>) => {
    const updated = promos.map((promo) => (promo.id === id ? { ...promo, ...updates } : promo));
    savePromos(updated);
  };

  const resetAllDefaults = () => {
    saveMenuItems(INITIAL_MENU_ITEMS);
    savePromos(PROMO_BANNERS);
    try {
      localStorage.removeItem(MENU_STORAGE_KEY);
      localStorage.removeItem(PROMOS_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminOpen,
        setIsAdminOpen,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        menuItems,
        updateMenuItem,
        toggleInStock,
        toggleBestSeller,
        promos,
        updatePromo,
        resetAllDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
