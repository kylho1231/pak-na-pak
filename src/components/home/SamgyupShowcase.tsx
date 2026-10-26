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
} from "lucide-react";
import { SAMGYUP_SETS, STORE_INFO } from "@/data/storeData";
import { useCart } from "@/context/CartContext";

export default function SamgyupShowcase() {
  const [selectedSetIndex, setSelectedSetIndex] = useState(1); // Set B default
  const { openScanModal, addToCart } = useCart();

  const currentSet = SAMGYUP_SETS[selectedSetIndex];

  return (
    <section id="samgyup" className="py-16 sm:py-20 bg-pak-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-zinc-200/80 p-1.5 rounded-2xl gap-1.5 max-w-full overflow-x-auto">
            {SAMGYUP_SETS.map((set, idx) => (
              <button
                key={set.id}
                type="button"
                onClick={() => setSelectedSetIndex(idx)}
                className={`py-2.5 px-4 sm:px-6 rounded-xl font-display font-black text-xs sm:text-sm transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                  selectedSetIndex === idx
                    ? "bg-pak-black text-white shadow-md scale-[1.02]"
                    : "text-zinc-700 hover:text-black hover:bg-zinc-300/60"
                }`}
              >
                <span>{set.code}</span>
                <span className="text-pak-yellow font-black">₱{set.pricePerHead}</span>
                {set.highlightBadge && (
                  <span className="hidden sm:inline text-[9px] bg-pak-yellow text-pak-black px-1.5 py-0.2 rounded font-extrabold uppercase">
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
          <div className="lg:col-span-5 bg-zinc-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-zinc-700">
              <Image
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=900&auto=format&fit=crop"
                alt="Pak na Pak Samgyupsal Grill"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="bg-pak-yellow text-pak-black font-extrabold px-2.5 py-1 rounded-md">
                  Fresh Meats & Kimchi
                </span>
                <span className="bg-black/80 text-white font-bold px-2 py-1 rounded-md">
                  Dine-In Antique
                </span>
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
                <a
                  href={`${STORE_INFO.messengerUrl}?text=${encodeURIComponent(
                    `Hi Pak na Pak Antique! Mag-iinquire po sana kami for Samgyupsal ${currentSet.code} table reservation.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow cursor-pointer transition-transform active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-pak-black" />
                  <span>Inquire / Book Table</span>
                </a>

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
