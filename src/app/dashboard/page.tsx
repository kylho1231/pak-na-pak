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
  Lock,
  Unlock,
  ShieldAlert,
  KeyRound,
  LogOut,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { DELIVERY_PARTNERS, STORE_INFO, MENU_CATEGORIES } from "@/data/storeData";
import { MenuItem } from "@/types";

export default function DashboardPage() {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    menuItems,
    toggleInStock,
  } = useAdmin();

  // Authentication PIN Form State
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // Dashboard Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeRange, setTimeRange] = useState<"today" | "7d" | "30d">("today");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.trim().toLowerCase();
    const valid =
      cleanPin === "pak" ||
      cleanPin === "1234" ||
      cleanPin === "admin" ||
      cleanPin === "0000" ||
      cleanPin === "8888" ||
      cleanPin === "porkever";

    if (valid) {
      loginAdmin(pinInput);
      setPinError(false);
      setPinInput("");
    } else {
      setPinError(true);
    }
  };

  // =========================================================================
  // 1. LOCKED VIEW: RESTRICTED ACCESS SCREEN (NO STORE DATA VISIBLE TO CUSTOMERS)
  // =========================================================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between py-12 px-4 selection:bg-pak-yellow selection:text-black">
        <div className="max-w-md w-full mx-auto my-auto space-y-6">
          {/* Brand Logo & Lock Badge */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-pak-yellow text-pak-black mx-auto flex items-center justify-center shadow-2xl shadow-pak-yellow/20">
              <Lock className="w-8 h-8 stroke-[2.4]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-pak-yellow mb-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Restricted Store System</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                Pak na Pak Store Intelligence
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-sm mx-auto">
                Private store analytics, daily revenue metrics, and inventory control.
              </p>
            </div>
          </div>

          {/* Secure Passcode Box */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="owner-pin"
                  className="text-xs font-black uppercase tracking-wider text-zinc-300 block"
                >
                  Enter Store Owner / Staff PIN:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="owner-pin"
                    type={showPin ? "text" : "password"}
                    autoFocus
                    required
                    placeholder="Enter PIN (e.g. pak or 1234)"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (pinError) setPinError(false);
                    }}
                    className={`w-full pl-10 pr-10 py-3 rounded-2xl bg-zinc-950 border text-sm text-white placeholder:text-zinc-600 focus:outline-hidden transition-all ${
                      pinError
                        ? "border-red-500 ring-2 ring-red-500/30"
                        : "border-zinc-700 focus:border-pak-yellow focus:ring-2 focus:ring-pak-yellow/30"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    aria-label={showPin ? "Hide PIN" : "Show PIN"}
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {pinError && (
                  <p className="text-xs font-bold text-red-400 flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Incorrect PIN. Please enter the valid store passcode.</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Store Intelligence</span>
              </button>
            </form>

            <div className="pt-2 border-t border-zinc-800 text-center">
              <span className="text-[11px] text-zinc-500">
                Authorized Personnel Only • San Jose & Sibalom, Antique
              </span>
            </div>
          </div>

          {/* Safe Exit to Public Customer Site */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-pak-yellow transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Customer Website</span>
            </Link>
          </div>
        </div>

        {/* Confidential Notice Footer */}
        <div className="text-center text-[11px] text-zinc-600 mt-8">
          Confidential System © 2026 Pak na Pak Restaurant Antique. All rights reserved.
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. UNLOCKED VIEW: AUTHENTICATED STORE OWNER & MANAGER PORTAL
  // =========================================================================
  const filteredItems = menuItems.filter((item) => {
    const matchesCat =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const inStockCount = menuItems.filter((i) => i.inStock).length;
  const outOfStockCount = menuItems.length - inStockCount;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 selection:bg-pak-yellow selection:text-black">
      {/* Standalone Private Portal Header */}
      <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-pak-yellow flex items-center justify-center font-display font-black text-pak-black text-lg shadow shrink-0">
              <Flame className="w-5 h-5 fill-pak-black text-pak-black" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-sm sm:text-base text-white truncate">
                  Store Intelligence & Operations
                </h1>
                <span className="hidden sm:inline-flex text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black uppercase px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 hidden sm:block">
                San Jose & Sibalom Branches • Internal Dashboard
              </span>
            </div>
          </div>

          {/* Right Action Tools: Time Filters + Exit/Sign Out */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Time Filter Pills */}
            <div className="inline-flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              {(["today", "7d", "30d"] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`text-xs font-black px-2.5 sm:px-3 py-1 rounded-lg transition-colors cursor-pointer uppercase ${
                    timeRange === range
                      ? "bg-pak-yellow text-pak-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Visit Customer Site */}
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-pak-yellow bg-zinc-900 hover:bg-zinc-850 px-3 py-2 rounded-xl border border-zinc-800 transition-colors"
            >
              <span>View Customer Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Lock / Sign Out Button */}
            <button
              type="button"
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-400 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-900/60 px-3 py-2 rounded-xl transition-colors cursor-pointer"
              title="Lock dashboard immediately"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock / Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Scorecards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl relative overflow-hidden">
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

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl">
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

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl">
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

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl">
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
          <div className="lg:col-span-7 bg-zinc-900 rounded-3xl p-6 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
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
                  <div className="h-3 w-full bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
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
          <div className="lg:col-span-5 bg-zinc-900 rounded-3xl p-6 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
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
                  className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3"
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
        <section className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-pak-yellow transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-pak-yellow text-pak-black border-pak-yellow font-black"
                    : "bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500"
                }`}
              >
                All ({menuItems.length})
              </button>
              {MENU_CATEGORIES.slice(1, 8).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-pak-yellow text-pak-black border-pak-yellow font-black"
                      : "bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500"
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
                    ? "bg-zinc-950 border-zinc-800"
                    : "bg-zinc-950/80 border-red-900/50 opacity-70"
                } flex items-center justify-between gap-3`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-zinc-800 bg-zinc-900">
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
                  onClick={() => toggleInStock(dish.id)}
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
