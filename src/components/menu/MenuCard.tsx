"use client";

import React from "react";
import Image from "next/image";
import { Bike, Sparkles, Flame, Plus } from "lucide-react";
import { MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const { openCustomizer, openDeliveryModal } = useCart();

  const handleAction = () => {
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
    <div
      className={`group bg-white rounded-3xl overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
        item.inStock
          ? "border-zinc-200 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-amber-300"
          : "border-zinc-200 opacity-60 bg-zinc-50"
      }`}
    >
      <div>
        {/* Image Frame */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            {item.badge ? (
              <span className="bg-pak-yellow text-pak-black font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-pak-black" />
                {item.badge}
              </span>
            ) : item.isBestSeller ? (
              <span className="bg-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <Flame className="w-3 h-3 fill-white" />
                Best Seller
              </span>
            ) : <span />}

            {!item.inStock && (
              <span className="bg-rose-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded-full shadow-md">
                Sold Out
              </span>
            )}
          </div>

          {/* Portion Tag */}
          {item.portion && (
            <span className="absolute bottom-2 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
              {item.portion}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-2">
          <div className="flex items-start justify-between gap-1.5">
            <h3 className="font-display font-black text-base sm:text-lg text-pak-black leading-snug group-hover:text-amber-600 transition-colors">
              {item.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-display font-black text-xl sm:text-2xl text-pak-black">
                ₱{item.price}
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
            {item.description}
          </p>

          {/* Customization Options Hints */}
          <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-bold">
            {item.hasFlavorSelection && (
              <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                12 Glaze Flavors
              </span>
            )}
            {item.hasPastaSelection && (
              <span className="bg-orange-50 text-orange-900 border border-orange-200 px-2 py-0.5 rounded">
                Spaghetti or Carbonara
              </span>
            )}
            {item.sauceOptions && (
              <span className="bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                Sauce Selection
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          type="button"
          onClick={handleAction}
          disabled={!item.inStock}
          className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all duration-150 cursor-pointer ${
            item.inStock
              ? "bg-pak-black hover:bg-zinc-800 text-white hover:text-pak-yellow active:scale-98 shadow-xs"
              : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
          }`}
        >
          <Bike className="w-3.5 h-3.5 text-pak-yellow" />
          <span>
            {item.inStock
              ? item.hasFlavorSelection || item.hasPastaSelection
                ? "Select Flavors & Order via Rider"
                : `Order via Delivery Rider • ₱${item.price}`
              : "Unavailable Today"}
          </span>
        </button>
      </div>
    </div>
  );
}
