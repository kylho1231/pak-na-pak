"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Bike,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  Filter,
  Flame,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { MENU_ITEMS } from "@/data/menuData";
import { DELIVERY_PARTNERS, STORE_INFO, MENU_CATEGORIES } from "@/data/storeData";
import { MenuItem } from "@/types";

export default function DashboardPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeRange, setTimeRange] = useState<"today" | "7d" | "30d">("today");

  // Toggle item in-stock state
  const handleToggleStock = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesCat =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const inStockCount = items.filter((i) => i.inStock).length;
  const outOfStockCount = items.length - inStockCount;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-pak-black/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-pak-yellow transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Site</span>
            </Link>
            <div className="h-5 w-px bg-zinc-700" />
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="font-display font-black text-base sm:text-lg text-white">
                Pak na Pak Store Intelligence
              </h1>
              <span className="text-[10px] bg-pak-yellow text-pak-black font-black uppercase px-2 py-0.5 rounded-md">
                Live Data App
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex bg-zinc-800 p-1 rounded-xl border border-zinc-700">
              {(["today", "7d", "30d"] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`text-xs font-black px-3 py-1.5 rounded-lg transition-colors cursor-pointer uppercase ${
                    timeRange === range
                      ? "bg-pak-yellow text-pak-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Scorecards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-zinc-800/80 rounded-3xl p-6 border border-zinc-700/80 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Daily Revenue Est.
              </span>
              <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-pak-yellow flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-black text-3xl text-white">
              ₱14,850
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs. yesterday</span>
            </div>
          </div>

          <div className="bg-zinc-800/80 rounded-3xl p-6 border border-zinc-700/80 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Total Orders Dispatched
              </span>
              <div className="w-9 h-9 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-black text-3xl text-white">
              86
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12.1% fulfillment rate</span>
            </div>
          </div>

          <div className="bg-zinc-800/80 rounded-3xl p-6 border border-zinc-700/80 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Average Ticket Size
              </span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-black text-3xl text-white">
              ₱172.60
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-zinc-400">
              <span>Healthy average for combo meals</span>
            </div>
          </div>

          <div className="bg-zinc-800/80 rounded-3xl p-6 border border-zinc-700/80 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Top Courier Partner
              </span>
              <div className="w-9 h-9 rounded-2xl bg-amber-400/20 text-pak-yellow flex items-center justify-center">
                <Bike className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-black text-2xl text-white truncate">
              Mr. Cartman
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-pak-yellow">
              <span>46% share (38 dispatches today)</span>
            </div>
          </div>
        </section>

        {/* Charts & Breakdown Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Category Sales Distribution (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-800/80 rounded-3xl p-6 border border-zinc-700/80 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-700/60 pb-4">
              <div>
                <h2 className="font-display font-black text-lg text-white">
                  Revenue by Menu Category
                </h2>
                <p className="text-xs text-zinc-400">
                  Fried chicken combos and samgyupsal drive over 60% of total volume
                </p>
              </div>
              <span className="text-xs font-black text-pak-yellow uppercase">
                Ranked by Sales
              </span>
            </div>

            <div className="space-y-4">
              {[
                { name: "Fried Chicken Meals & Flavors", pct: 36, rev: "₱5,346", count: 42, color: "bg-pak-yellow" },
                { name: "Samgyupsal Dine-In Sets", pct: 28, rev: "₱4,158", count: 14, color: "bg-orange-500" },
                { name: "Chao Fan & Rice Bowls", pct: 17, rev: "₱2,524", count: 22, color: "bg-amber-400" },
                { name: "Sizzling Hot Plates", pct: 11, rev: "₱1,633", count: 16, color: "bg-red-500" },
                { name: "Snacks, Drinks & Soju", pct: 8, rev: "₱1,189", count: 18, color: "bg-emerald-500" },
              ].map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-200">{cat.name}</span>
                    <span className="text-zinc-400 font-medium">
                      {cat.rev} ({cat.pct}%) • {cat.count} orders
                    </span>
                  </div>
                  <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-700">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courier Fleet Leaderboard (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-800/80 rounded-3xl p-6 border border-zinc-700/80 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-700/60 pb-4">
              <div>
                <h2 className="font-display font-black text-lg text-white">
                  Antique Delivery Fleet
                </h2>
                <p className="text-xs text-zinc-400">
                  Real-time local courier performance
                </p>
              </div>
              <Bike className="w-5 h-5 text-pak-yellow" />
            </div>

            <div className="space-y-3.5">
              {DELIVERY_PARTNERS.map((partner, idx) => (
                <div
                  key={partner.id}
                  className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-700 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-sm text-white">
                        {partner.name}
                      </span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-black uppercase">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      {partner.tagline}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-display font-black text-lg text-pak-yellow">
                      {idx === 0 ? "46%" : idx === 1 ? "33%" : "21%"}
                    </span>
                    <span className="text-[10px] text-zinc-500 block">
                      {idx === 0 ? "38 Trips" : idx === 1 ? "27 Trips" : "17 Trips"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Menu Inventory Management (Full Width) */}
        <section className="bg-zinc-800/80 rounded-3xl p-6 border border-zinc-700/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-700/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-pak-yellow" />
                <h2 className="font-display font-black text-xl text-white">
                  Menu Inventory & Live Availability Control
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Toggle dishes in/out of stock. Changes immediately reflect on the live menu.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                {inStockCount} In Stock
              </span>
              <span className="bg-red-500/20 text-red-400 font-bold px-3 py-1 rounded-full border border-red-500/30">
                {outOfStockCount} Out of Stock
              </span>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search dish name, description, price..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-pak-yellow transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-pak-yellow text-pak-black border-pak-yellow font-black"
                    : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500"
                }`}
              >
                All ({items.length})
              </button>
              {MENU_CATEGORIES.slice(1, 8).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-pak-yellow text-pak-black border-pak-yellow font-black"
                      : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  {cat.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Table / Grid of Dishes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.slice(0, 15).map((dish) => (
              <div
                key={dish.id}
                className={`p-4 rounded-2xl border transition-all ${
                  dish.inStock
                    ? "bg-zinc-900/90 border-zinc-700/80"
                    : "bg-zinc-950/80 border-red-900/50 opacity-70"
                } flex items-center justify-between gap-3`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-zinc-700 bg-zinc-800">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display font-black text-xs sm:text-sm text-white truncate">
                        {dish.name}
                      </h3>
                      {dish.badge && (
                        <span className="text-[9px] bg-pak-yellow text-pak-black font-black px-1.5 py-0.2 rounded shrink-0">
                          {dish.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-black text-xs text-pak-yellow">
                      ₱{dish.price}
                    </span>
                    <span className="text-[10px] text-zinc-500 block truncate">
                      {dish.portion || dish.category}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleStock(dish.id)}
                  title={dish.inStock ? "Set as Out of Stock" : "Set as In Stock"}
                  className={`p-2 rounded-xl font-black text-xs cursor-pointer transition-all ${
                    dish.inStock
                      ? "text-emerald-400 hover:bg-emerald-500/20"
                      : "text-red-400 hover:bg-red-500/20"
                  }`}
                >
                  {dish.inStock ? (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] uppercase font-bold">In Stock</span>
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] uppercase font-bold">Out</span>
                      <ToggleLeft className="w-6 h-6 text-red-400" />
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center pt-2 text-xs text-zinc-500">
            Showing top {Math.min(15, filteredItems.length)} of {filteredItems.length} dishes matching criteria.
          </div>
        </section>
      </main>
    </div>
  );
}
