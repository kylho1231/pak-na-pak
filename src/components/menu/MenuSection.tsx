"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Flame,
  FileText,
  Utensils,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { MENU_CATEGORIES } from "@/data/storeData";
import { MenuCategoryId, MenuItem } from "@/types";
import { useAdmin } from "@/context/AdminContext";
import { useCart } from "@/context/CartContext";
import MenuCard from "./MenuCard";

export default function MenuSection() {
  const { menuItems } = useAdmin();
  const { openScanModal } = useCart();

  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "under-100" | "unli" | "bundles">("all");

  // Filter items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (activeCategory === "best-sellers" && !item.isBestSeller) {
        return false;
      } else if (
        activeCategory !== "all" &&
        activeCategory !== "best-sellers" &&
        item.category !== activeCategory
      ) {
        return false;
      }

      // Quick filter
      if (priceFilter === "under-100" && item.price > 99) {
        return false;
      }
      if (priceFilter === "unli" && item.category !== "unlimited" && item.category !== "samgyupsal") {
        return false;
      }
      if (priceFilter === "bundles" && item.category !== "takeout-bundles") {
        return false;
      }

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [menuItems, activeCategory, searchQuery, priceFilter]);

  return (
    <section id="menu" className="py-16 sm:py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-pak-black bg-pak-yellow px-3.5 py-1 rounded-full shadow-xs">
            <Utensils className="w-3.5 h-3.5 fill-pak-black" />
            Official Menu
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-pak-black tracking-tight">
            Explore the Pak na Pak Menu
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Every dish is freshly prepared with our signature seasonings, glazes, and generous portions made for Filipino food lovers.
          </p>

          <div className="pt-2">
            <button
              onClick={() => openScanModal(0)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 hover:bg-amber-200 px-3.5 py-1.5 rounded-full border border-amber-300 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Tap here to view photos of the original printed menu</span>
            </button>
          </div>
        </div>

        {/* Search & Quick Filter Controls */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search chicken, chao fan, fries, sisig..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-2xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow shadow-xs text-zinc-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-zinc-500 hidden sm:inline">Filter:</span>
            {[
              { id: "all", label: "All Items" },
              { id: "under-100", label: "🔥 ₱99 Sulit Zone" },
              { id: "unli", label: "♾️ Unlimited Feasts" },
              { id: "bundles", label: "🍗 Barkada Bundles" },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPriceFilter(p.id as any)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all cursor-pointer ${
                  priceFilter === p.id
                    ? "bg-pak-black text-white border-pak-black shadow-xs"
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Category Navigation Bar */}
        <div className="sticky top-[68px] z-20 bg-zinc-50/95 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 border-y border-zinc-200/80">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-150 cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-pak-yellow text-pak-black shadow-md scale-[1.02] ring-2 ring-pak-yellow/40"
                      : "bg-white text-zinc-700 hover:text-pak-black hover:bg-zinc-100 border border-zinc-200"
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.bannerBadge && (
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                        isActive
                          ? "bg-pak-black text-pak-yellow"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {cat.bannerBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Active Category info */}
        <div className="flex items-center justify-between mb-6 text-xs text-zinc-500 font-semibold">
          <span>
            Showing <strong className="text-zinc-900">{filteredItems.length}</strong> items
            {activeCategory !== "all" && ` in ${MENU_CATEGORIES.find((c) => c.id === activeCategory)?.label}`}
          </span>

          {(searchQuery || priceFilter !== "all" || activeCategory !== "all") && (
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                setPriceFilter("all");
              }}
              className="text-amber-700 font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 max-w-md mx-auto my-6 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 mx-auto">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-display font-black text-lg text-zinc-900">
              No matching meals found
            </h3>
            <p className="text-xs text-zinc-500">
              Try searching with different keywords like &apos;chicken&apos;, &apos;pasta&apos;, &apos;sisig&apos;, or reset your filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                setPriceFilter("all");
              }}
              className="bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs px-4 py-2 rounded-xl cursor-pointer"
            >
              Show All Menu Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
