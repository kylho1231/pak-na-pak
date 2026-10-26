"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  ArrowRight,
  MessageCircle,
  FileText,
  Sparkles,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
} from "lucide-react";
import { STORE_INFO } from "@/data/storeData";
import { useCart } from "@/context/CartContext";

export default function HeroSection() {
  const { openScanModal, addToCart } = useCart();

  return (
    <section className="relative bg-pak-black text-white overflow-hidden pt-8 pb-16 lg:py-20 border-b border-zinc-800">
      {/* Background Glows and Food Pattern */}
      <div className="absolute inset-0 bg-food-pattern opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pak-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Location & Status Tag */}
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-pak-yellow/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-zinc-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-pak-yellow">Now Serving in San Jose, Antique</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">Dine-In, Take-Out & Delivery</span>
            </div>

            {/* Main Punchy Headlines */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tight leading-[1.05] text-white">
                SULIT SA SARAP. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pak-yellow via-amber-400 to-yellow-300">
                  BUSOG KA.
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed pt-2">
                Crispy fried chicken in 12 signature glazes, wok-tossed chao fan, sizzling hot plates, barkada take-out bundles, and all-you-can-eat samgyupsal grill.
              </p>
            </div>

            {/* Quick Value Pillars */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs sm:text-sm font-bold">
              <span className="bg-zinc-900/90 text-pak-yellow border border-zinc-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-pak-yellow" />
                ₱99 Sulit Meals
              </span>
              <span className="bg-zinc-900/90 text-zinc-100 border border-zinc-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                12 Chicken Glazes
              </span>
              <span className="bg-zinc-900/90 text-zinc-100 border border-zinc-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <Star className="w-4 h-4 text-pak-yellow fill-pak-yellow" />
                Unli Feasts from ₱239
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-base px-7 py-4 rounded-2xl shadow-xl shadow-pak-yellow/20 hover:scale-[1.02] active:scale-98 transition-all duration-150 cursor-pointer"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href={STORE_INFO.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-base px-6 py-4 rounded-2xl border border-zinc-700 hover:border-pak-yellow transition-all duration-150 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-pak-yellow" />
                <span>Order via Messenger</span>
              </a>

              <button
                type="button"
                onClick={() => openScanModal(0)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-pak-yellow py-3 px-4 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-pak-yellow" />
                <span>Original Menu Scans</span>
              </button>
            </div>

            {/* Social Proof Strip */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1 text-pak-yellow">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-pak-yellow text-pak-yellow" />
                ))}
                <span className="font-extrabold text-white ml-1">4.9/5</span>
                <span className="text-zinc-400">Barkada Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pak-yellow" />
                <span>San Jose de Buenavista, Antique</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-pak-yellow" />
                <span>Open 10:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Golden Border Card */}
              <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-pak-yellow via-amber-400 to-amber-600 shadow-2xl shadow-pak-yellow/20">
                <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/4.8]">
                  <Image
                    src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1200&auto=format&fit=crop"
                    alt="Crispy Pak na Pak Fried Chicken"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-pak-yellow text-pak-black font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                      <Flame className="w-3.5 h-3.5 fill-pak-black" />
                      Antique’s #1 Crispy Fried Chicken
                    </span>
                    <span className="bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-full border border-zinc-700">
                      ₱99 Meals
                    </span>
                  </div>

                  {/* Bottom Dish Showcase Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-pak-black/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-700/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-pak-yellow">
                          Signature Combo
                        </span>
                        <h2 className="font-display font-black text-xl text-white">
                          Full Pak Meal
                        </h2>
                        <p className="text-xs text-zinc-300">
                          2 pcs Fried Chicken + Spaghetti/Carbonara + Hot Rice
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-zinc-400 block line-through">
                          ₱129
                        </span>
                        <span className="font-display font-black text-2xl text-pak-yellow">
                          ₱99
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Highlight Sticker: 12 Flavors */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white text-pak-black p-3 sm:p-3.5 rounded-2xl shadow-xl border-2 border-pak-yellow flex items-center gap-3 animate-pulse-subtle">
                <div className="w-10 h-10 rounded-xl bg-pak-yellow flex items-center justify-center font-black text-pak-black text-lg">
                  12
                </div>
                <div>
                  <span className="font-display font-black text-xs sm:text-sm block leading-tight text-zinc-900">
                    Signature Glazes
                  </span>
                  <span className="text-[10px] text-zinc-500 font-semibold">
                    Garlic Parm, Buffalo, Teriyaki...
                  </span>
                </div>
              </div>

              {/* Floating Highlight Sticker: Chao Fan & Samgyup */}
              <div className="absolute -top-4 -right-3 sm:-right-5 bg-pak-yellow text-pak-black font-extrabold text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-black/20 flex items-center gap-1.5 rotate-2">
                <Sparkles className="w-4 h-4 fill-pak-black" />
                <span>Chao Fan + Samgyup Grill</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
