"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Bike, Sparkles, Star, ArrowRight } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useCart } from "@/context/CartContext";
import { MenuItem } from "@/types";

export default function BestSellersSection() {
  const { menuItems } = useAdmin();
  const { openCustomizer, openDeliveryModal } = useCart();

  // Get best sellers
  const bestSellers = menuItems.filter((item) => item.isBestSeller).slice(0, 6);

  const handleItemClick = (item: MenuItem) => {
    if (
      item.hasFlavorSelection ||
      item.hasPastaSelection ||
      (item.sauceOptions && item.sauceOptions.length > 0)
    ) {
      openCustomizer(item);
    } else {
      openDeliveryModal({
        items: [
          {
            name: item.name,
            price: item.price,
            quantity: 1,
            details: item.portion,
          },
        ],
        total: item.price,
      });
    }
  };

  return (
    <section id="bestsellers" className="py-16 sm:py-20 bg-pak-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-center md:text-left">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-200/60 px-3 py-1 rounded-full mb-2">
              <Flame className="w-3.5 h-3.5 fill-amber-700" />
              Antique’s Top Picks
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-pak-black tracking-tight">
              Best Sellers & Crowd Favorites
            </h2>
            <p className="text-zinc-600 font-medium text-sm sm:text-base mt-1.5 max-w-xl">
              From our famous ₱99 crispy fried chicken combos to sizzling hot plates and unli samgyupsal sets.
            </p>
          </div>

          <Link
            href="#menu"
            className="inline-flex items-center justify-center gap-1.5 text-sm font-extrabold text-pak-black hover:text-amber-600 transition-colors group cursor-pointer"
          >
            <span>Browse Complete Menu (40+ Items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Image & Badges Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Top Badge */}
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-pak-yellow text-pak-black font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-pak-black" />
                      {item.badge}
                    </span>
                  )}

                  {/* Portion tag */}
                  {item.portion && (
                    <span className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                      {item.portion}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-black text-xl text-pak-black leading-snug group-hover:text-amber-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="font-display font-black text-2xl text-pak-black">
                        ₱{item.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Inclusions or flavor tags */}
                  {item.hasFlavorSelection && (
                    <div className="pt-1">
                      <span className="inline-block bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">
                        ✨ Choice of 12 Glaze Flavors
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => handleItemClick(item)}
                  disabled={!item.inStock}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                    item.inStock
                      ? "bg-pak-black hover:bg-zinc-800 text-white hover:text-pak-yellow shadow-md active:scale-98"
                      : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                  }`}
                >
                  <Bike className="w-4 h-4 text-pak-yellow" />
                  <span>
                    {item.inStock
                      ? item.hasFlavorSelection || item.hasPastaSelection
                        ? "Select Glaze & Order via Rider"
                        : `Order via Delivery Rider • ₱${item.price}`
                      : "Sold Out Today"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
