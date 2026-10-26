"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import FlavorsShowcase from "@/components/home/FlavorsShowcase";
import SamgyupShowcase from "@/components/home/SamgyupShowcase";
import MenuSection from "@/components/menu/MenuSection";
import PromoSection from "@/components/home/PromoSection";
import AboutSection from "@/components/home/AboutSection";
import LocationSection from "@/components/home/LocationSection";
import DeliveryPartnersSection from "@/components/home/DeliveryPartnersSection";
import ItemCustomizerModal from "@/components/menu/ItemCustomizerModal";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section with dynamic brand headline & visuals */}
      <HeroSection />

      {/* 2. Best Sellers Section */}
      <BestSellersSection />

      {/* 3. 12 Signature Chicken Flavors Interactive Showcase */}
      <FlavorsShowcase />

      {/* 4. Full Categorized Menu with search, category tabs, & food cards */}
      <MenuSection />

      {/* 5. Accredited Antique Delivery & Pabili Couriers (Mr. Cartman, SUGO, ErrandPro) */}
      <DeliveryPartnersSection />

      {/* 6. Korean Samgyupsal Grill Interactive Showcase (Set A, B, C) */}
      <SamgyupShowcase />

      {/* 7. Special Promos & Barkada Deals (₱99 Zone, Unli, Take-out Bundles) */}
      <PromoSection />

      {/* 8. About Pak na Pak in San Jose, Antique */}
      <AboutSection />

      {/* 9. Location, Operating Hours, Google Map & Reservation Inquiry */}
      <LocationSection />

      {/* Item Customizer Modal (Flavors, Pasta choice, Sauce, Quantity) */}
      <ItemCustomizerModal />
    </>
  );
}
