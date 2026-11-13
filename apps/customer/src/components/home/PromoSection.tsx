"use client";

import React from "react";
import Link from "next/link";
import { Flame, Sparkles, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import { PROMO_BANNERS } from "@/data/storeData";
import { useCart } from "@/context/CartContext";

export default function PromoSection() {
  const { openScanModal } = useCart();

  return (
    <section id="promos" className="py-16 sm:py-20 bg-pak-black text-white relative overflow-hidden w-full max-w-full">
      <div className="absolute inset-0 bg-food-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-pak-black bg-pak-yellow px-3.5 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5 fill-pak-black" />
            Special Deals & Combos
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Maximum Sulit. Maximum Sarap.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Whether dining solo for lunch, hanging out with friends, or hosting a family party at home, Pak na Pak has the best value food packages in Antique.
          </p>
        </div>

        {/* 3 Promos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: ₱99 Sulit Zone */}
          <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-500 text-pak-black rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-pak-black text-pak-yellow text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                  Solo & Barkada Hit
                </span>
                <span className="font-display font-black text-3xl text-pak-black">
                  ₱99 ONLY
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-pak-black leading-tight">
                  The ₱99 Sulit Zone
                </h3>
                <p className="text-xs sm:text-sm text-zinc-900 font-semibold mt-2 leading-relaxed">
                  Choose from Pak Meal (3pcs Chicken + Rice), Full Pak Meal (2pcs + Pasta + Rice), Sizzling Sisig, or Wok Chao Fan!
                </p>
              </div>

              <ul className="space-y-1.5 text-xs font-bold text-zinc-950 pt-2 border-t border-black/10">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pak-black" />
                  3 pcs Crispy Glazed Chicken + Rice
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pak-black" />
                  Chicken + Spaghetti/Carbonara + Rice
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pak-black" />
                  Sizzling Sisig & Burger Steak with Rice
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="#menu"
                className="w-full inline-flex items-center justify-center gap-2 bg-pak-black hover:bg-zinc-900 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow cursor-pointer transition-colors"
              >
                <span>View ₱99 Meals</span>
                <ArrowRight className="w-4 h-4 text-pak-yellow" />
              </Link>
            </div>
          </div>

          {/* Card 2: Unlimited All-You-Can-Eat */}
          <div className="bg-zinc-900 border-2 border-pak-yellow rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-pak-yellow text-pak-black text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                  Eat-All-You-Can
                </span>
                <span className="font-display font-black text-3xl text-pak-yellow">
                  FROM ₱239
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-white leading-tight">
                  Unlimited Chicken Feasts
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-2 leading-relaxed">
                  Refill as much crispy fried chicken and hot rice as you want in all 12 signature glazes. Upgrade to include unlimited pasta and bottomless iced tea!
                </p>
              </div>

              <ul className="space-y-1.5 text-xs font-semibold text-zinc-300 pt-2 border-t border-zinc-800">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pak-yellow" />
                  Unli Pak A (Chicken & Rice) - ₱239
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pak-yellow" />
                  Unli Pak B (+ Unlimited Pasta) - ₱269
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pak-yellow" />
                  Unli Pak C (+ Bottomless Iced Tea) - ₱299
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="#unlimited"
                className="w-full inline-flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow cursor-pointer transition-colors"
              >
                <span>Explore Unlimited Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Party Take-Out Bundles */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-zinc-800 text-zinc-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                  Celebrations & Salo-Salo
                </span>
                <span className="font-display font-black text-3xl text-white">
                  ₱269 - ₱469
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-white leading-tight">
                  Take-Out Party Bundles
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-2 leading-relaxed">
                  Family-sized chicken buckets and party pasta pans. Perfect for birthday handaan, office meetings, and movie nights.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs font-semibold text-zinc-300 pt-2 border-t border-zinc-800">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  10 pcs Chicken Bucket - ₱269
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  20 pcs Chicken Party Bucket - ₱469
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Family Pan Pasta (Spaghetti/Carbonara) - ₱399
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="#menu"
                className="w-full inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl border border-zinc-700 cursor-pointer transition-colors"
              >
                <span>Order Party Bundles</span>
                <ArrowRight className="w-4 h-4 text-pak-yellow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
