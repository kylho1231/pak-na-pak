"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, FileText, Phone, MessageCircle } from "lucide-react";
import MenuSection from "@/components/menu/MenuSection";
import FlavorsShowcase from "@/components/home/FlavorsShowcase";
import SamgyupShowcase from "@/components/home/SamgyupShowcase";
import ItemCustomizerModal from "@/components/menu/ItemCustomizerModal";
import { useCart } from "@/context/CartContext";
import { STORE_INFO } from "@/data/storeData";

export default function FullMenuPage() {
  const { openScanModal } = useCart();

  return (
    <div className="min-h-screen bg-pak-cream">
      {/* Top Menu Banner */}
      <div className="bg-pak-black text-white py-10 sm:py-14 border-b border-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-food-pattern opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-pak-yellow transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Digital Menu & Online Ordering
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto">
            Choose your meals, pick your favorite glazes, and send your order straight to Facebook Messenger for instant prep in San Jose, Antique.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openScanModal(0)}
              className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-pak-yellow font-extrabold text-xs px-4 py-2.5 rounded-xl border border-zinc-700 cursor-pointer transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Inspect Real Menu Scans</span>
            </button>

            <a
              href={`tel:${STORE_INFO.contactNumber}`}
              className="inline-flex items-center gap-1.5 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs px-4 py-2.5 rounded-xl shadow cursor-pointer transition-transform active:scale-98"
            >
              <Phone className="w-4 h-4" />
              <span>Call Hotline: {STORE_INFO.contactNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Full Menu Component */}
      <MenuSection />

      {/* 12 Chicken Glazes Detail */}
      <FlavorsShowcase />

      {/* Samgyupsal Detail */}
      <SamgyupShowcase />

      {/* Item Customizer Modal */}
      <ItemCustomizerModal />
    </div>
  );
}
