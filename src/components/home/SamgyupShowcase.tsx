"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Flame,
  Check,
  Clock,
  Users,
  Sparkles,
  Plus,
  MessageCircle,
  ShieldAlert,
  Calendar,
} from "lucide-react";
import { SAMGYUP_SETS, STORE_INFO } from "@/data/storeData";
import { useCart } from "@/context/CartContext";

const SAMGYUP_PHOTOS = [
  {
    src: "/dishes/samgyup-feast-grill.jpg",
    title: "Sizzling Grill & Melted Cheese Cup",
    caption: "Melted cheese in the center, juicy pork slices, and banchan side dishes",
    tag: "Sizzling Grill Feast",
  },
  {
    src: "/dishes/samgyup-lettuce-wrap.jpg",
    title: "Fresh Lettuce Ssam Wrap",
    caption: "Grilled pork belly dipped in gooey cheese and wrapped in crisp lettuce",
    tag: "Fresh Korean Ssam",
  },
  {
    src: "/dishes/samgyup-table-spread.jpg",
    title: "Full Table Spread with Jinro Soju",
    caption: "Dine-in feast with marinated pork, 8 side dishes, rice bowls, and cold Soju",
    tag: "Table Setup & Drinks",
  },
];

export default function SamgyupShowcase() {
  const [selectedSetIndex, setSelectedSetIndex] = useState(1); // Set B default
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const { openScanModal, addToCart, openReservationModal } = useCart();

  const currentSet = SAMGYUP_SETS[selectedSetIndex];

  return (
    <section id="samgyup" className="py-16 sm:py-20 bg-pak-cream relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-3.5 py-1 rounded-full">
            <Flame className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
            Korean Grill Experience
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-pak-black tracking-tight">
            Unlimited Samgyupsal Grill
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Sizzle tender marinated meats right at your table with authentic Korean side dishes, melted cheese dips, and ice-cold drinks in San Jose, Antique.
          </p>
        </div>

        {/* Set Selector Tabs */}
        <div className="flex justify-center mb-8 px-2">
          <div className="grid grid-cols-3 sm:inline-flex w-full sm:w-auto bg-zinc-200/80 p-1.5 rounded-2xl gap-1.5 shadow-inner">
            {SAMGYUP_SETS.map((set, idx) => (
              <button
                key={set.id}
                type="button"
                onClick={() => setSelectedSetIndex(idx)}
                className={`py-2.5 px-2 sm:px-6 rounded-xl font-display font-black text-xs sm:text-sm transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] ${
                  selectedSetIndex === idx
                    ? "bg-pak-black text-white shadow-md scale-[1.02]"
                    : "text-zinc-700 hover:text-black hover:bg-zinc-300/60"
                }`}
              >
                <span>{set.code}</span>
                <span className="text-pak-yellow font-black">₱{set.pricePerHead}</span>
                {set.highlightBadge && (
                  <span className="hidden md:inline text-[9px] bg-pak-yellow text-pak-black px-1.5 py-0.2 rounded font-extrabold uppercase">
                    {set.highlightBadge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Set Detail Card */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Set inclusions (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                  {currentSet.highlightBadge || "Unlimited Set"}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-pak-black">
                  {currentSet.code} Unlimited Feast
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                  {currentSet.tagline}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-zinc-500 font-bold block">Rate Per Head</span>
                <span className="font-display font-black text-3xl sm:text-4xl text-pak-black">
                  ₱{currentSet.pricePerHead}
                </span>
                <span className="text-[11px] text-zinc-500 font-semibold block">
                  (Min. {currentSet.minPersons} persons • {currentSet.timeLimit})
                </span>
              </div>
            </div>

            {/* Unlimited Inclusions List */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                All-You-Can-Eat Inclusions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentSet.unlimitedItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 text-xs font-bold text-zinc-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complimentary Perks */}
            {currentSet.complimentary.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 fill-amber-500 text-amber-500" />
                  Free Complimentary Items Included
                </h4>
                <div className="space-y-1.5">
                  {currentSet.complimentary.map((comp, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-pak-yellow/15 border border-pak-yellow/30 text-xs font-bold text-zinc-900"
                    >
                      🎉 {comp}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Side dishes & Sauce dips breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Side dishes */}
              <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200 space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-700 block">
                  🥗 Side Dishes ({currentSet.sideDishes.length})
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {currentSet.sideDishes.join(" • ")}
                </p>
              </div>

              {/* Meat flavors */}
              <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200 space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-700 block">
                  🥩 Meat Flavors
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Korean BBQ, Spicy Gochujang, Salt & Pepper
                  {currentSet.chickenFlavors && " (Pork & Chicken)"}
                </p>
              </div>
            </div>

            {/* Strict Policy Reminder */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-100 text-[11px] text-zinc-600">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Reminder for All Unlimited Orders: Strictly no leftovers. Eat all you can for 2 hours!
              </span>
            </div>
          </div>

          {/* Right Column: Visual Grill & Table Action (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-950 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Main Photo Display */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 border border-zinc-700 bg-black">
                <Image
                  src={SAMGYUP_PHOTOS[activePhotoIdx].src}
                  alt={SAMGYUP_PHOTOS[activePhotoIdx].title}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 1024px) 100vw, 450px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                
                {/* 100% Real Photo Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-pak-yellow text-pak-black font-black text-[10px] sm:text-xs px-2.5 py-1 rounded-md shadow flex items-center gap-1.5 uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 fill-pak-black" />
                    Authentic Store Photo
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="bg-black/75 backdrop-blur text-zinc-200 text-[10px] font-bold px-2 py-1 rounded-md border border-zinc-700">
                    San Jose, Antique
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-xs">
                  <span className="inline-block text-[10px] uppercase font-black tracking-wider text-pak-yellow mb-0.5">
                    {SAMGYUP_PHOTOS[activePhotoIdx].tag}
                  </span>
                  <p className="font-display font-black text-white text-sm sm:text-base leading-tight">
                    {SAMGYUP_PHOTOS[activePhotoIdx].title}
                  </p>
                  <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5">
                    {SAMGYUP_PHOTOS[activePhotoIdx].caption}
                  </p>
                </div>
              </div>

              {/* 3 Authentic Photo Thumbnails */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {SAMGYUP_PHOTOS.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setActivePhotoIdx(i)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      activePhotoIdx === i
                        ? "border-pak-yellow ring-2 ring-pak-yellow/40 scale-[1.02]"
                        : "border-zinc-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/70 px-1 py-0.5 text-[9px] text-center text-zinc-300 font-bold truncate">
                      {photo.tag}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-display font-black text-xl text-white">
                  Reserve a Samgyup Table
                </h4>
                <p className="text-xs text-zinc-300">
                  Planning a barkada gathering, birthday, or family dinner? Message us on Facebook or call ahead to secure your grill table!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    openReservationModal("san-jose", `Unlimited Samgyupsal ${currentSet.code}`)
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow cursor-pointer transition-transform active:scale-98"
                >
                  <Calendar className="w-4 h-4 stroke-[2.3]" />
                  <span>Reserve Table &amp; Verify ID</span>
                </button>

                <button
                  type="button"
                  onClick={() => openScanModal(4)}
                  className="flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold py-3 px-4 rounded-xl border border-zinc-700 cursor-pointer"
                >
                  <span>View Original Menu Scan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
