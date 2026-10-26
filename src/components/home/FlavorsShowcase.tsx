"use client";

import React, { useState } from "react";
import { Flame, Sparkles, Star, Check, Utensils } from "lucide-react";
import { CHICKEN_FLAVORS_LIST } from "@/data/storeData";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";

export default function FlavorsShowcase() {
  const [selectedFlavorId, setSelectedFlavorId] = useState("garlic-parm");
  const { menuItems } = useAdmin();
  const { openCustomizer } = useCart();

  const currentFlavor =
    CHICKEN_FLAVORS_LIST.find((f) => f.id === selectedFlavorId) || CHICKEN_FLAVORS_LIST[0];

  const handleOrderWithFlavor = () => {
    // Find Pak Meal or 10pcs bundle to customize
    const pakMeal = menuItems.find((m) => m.id === "pak-meal") || menuItems[0];
    openCustomizer(pakMeal);
  };

  return (
    <section className="py-16 sm:py-20 bg-pak-black text-white relative overflow-hidden border-y border-zinc-800">
      <div className="absolute inset-0 bg-food-pattern opacity-40 pointer-events-none" />
      <div className="absolute -top-32 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-pak-yellow bg-zinc-900 border border-zinc-800 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 fill-pak-yellow" />
            Secret House Sauces
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            12 Signature Chicken Glazes
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Every piece of Pak na Pak fried chicken is freshly fried to a golden crisp, then glazed to order in your favorite signature sauce.
          </p>
        </div>

        {/* 12 Flavor Grid Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-10">
          {CHICKEN_FLAVORS_LIST.map((flavor) => {
            const isSelected = selectedFlavorId === flavor.id;
            return (
              <button
                type="button"
                key={flavor.id}
                onClick={() => setSelectedFlavorId(flavor.id)}
                className={`p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between h-24 ${
                  isSelected
                    ? "bg-pak-yellow text-pak-black border-pak-yellow shadow-lg shadow-pak-yellow/20 scale-[1.03] ring-2 ring-pak-yellow"
                    : "bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: flavor.colorHex }}
                  />
                  {flavor.isNew && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-500 text-white">
                      New
                    </span>
                  )}
                  {flavor.isPopular && !flavor.isNew && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                      Top
                    </span>
                  )}
                  {flavor.isSpicy && !flavor.isPopular && !flavor.isNew && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400">
                      Spicy
                    </span>
                  )}
                </div>

                <div>
                  <span
                    className={`font-display font-black text-xs sm:text-sm block leading-tight ${
                      isSelected ? "text-pak-black" : "text-white"
                    }`}
                  >
                    {flavor.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Flavor Focus Banner */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-pak-yellow font-display font-black text-2xl sm:text-3xl">
                {currentFlavor.name}
              </span>
              {currentFlavor.isSpicy && (
                <span className="inline-flex items-center gap-1 bg-rose-950/80 text-rose-400 border border-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <Flame className="w-3.5 h-3.5 fill-rose-500" /> Hot & Spicy Kick
                </span>
              )}
              {currentFlavor.isNew && (
                <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  ★ NEW RELEASE
                </span>
              )}
            </div>
            <p className="text-zinc-300 text-sm sm:text-base max-w-xl">
              {currentFlavor.description}
            </p>
          </div>

          <div className="w-full md:w-auto flex items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOrderWithFlavor}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer text-center min-h-[44px]"
            >
              <Utensils className="w-4 h-4 shrink-0" />
              <span>Order Pak Meal with this Flavor (₱99)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
