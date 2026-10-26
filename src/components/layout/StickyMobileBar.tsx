"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, MessageCircle, ShoppingBag, Phone, Bike } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STORE_INFO } from "@/data/storeData";

export default function StickyMobileBar() {
  const pathname = usePathname();
  const { cartCount, cartTotal, setIsCartOpen, openDeliveryModal } = useCart();

  // Isolate Data App / Dashboard completely from public customer portal
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <aside aria-label="Mobile quick actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-pak-black/95 backdrop-blur-lg border-t border-zinc-800 px-3 py-2 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-between gap-1.5">
        {/* Menu shortcut */}
        <Link
          href="/#menu"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-zinc-300 hover:text-pak-yellow hover:bg-zinc-850 transition-colors min-h-[44px]"
        >
          <Utensils className="w-5 h-5 text-pak-yellow" />
          <span className="text-[10px] font-bold mt-0.5">Menu</span>
        </Link>

        {/* Direct Delivery Riders */}
        <button
          type="button"
          onClick={() => openDeliveryModal()}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-zinc-300 hover:text-pak-yellow hover:bg-zinc-850 transition-colors min-h-[44px] cursor-pointer"
        >
          <Bike className="w-5 h-5 text-pak-yellow stroke-[2.2]" />
          <span className="text-[10px] font-bold mt-0.5">Riders</span>
        </button>

        {/* Call shortcut */}
        <a
          href={`tel:${STORE_INFO.contactNumber}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-zinc-300 hover:text-pak-yellow hover:bg-zinc-850 transition-colors min-h-[44px]"
        >
          <Phone className="w-5 h-5 text-pak-yellow" />
          <span className="text-[10px] font-bold mt-0.5">Call</span>
        </a>

        {/* Messenger Direct Order */}
        <a
          href={STORE_INFO.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-zinc-300 hover:text-pak-yellow hover:bg-zinc-850 transition-colors min-h-[44px]"
        >
          <MessageCircle className="w-5 h-5 text-pak-yellow" />
          <span className="text-[10px] font-bold mt-0.5">Chat</span>
        </a>

        {/* Floating Cart / Pabili List Pill */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-2 flex items-center justify-between bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold px-3 py-2.5 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer min-h-[44px]"
          aria-label="View Order Bag"
        >
          <div className="flex items-center gap-1">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-black">Bag</span>
            {cartCount > 0 && (
              <span className="bg-pak-black text-pak-yellow text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-xs font-black ml-1.5">
            ₱{cartTotal > 0 ? cartTotal : 0}
          </span>
        </button>
      </div>
    </aside>
  );
}
