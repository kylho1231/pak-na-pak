"use client";

import React from "react";
import {
  Bike,
  ExternalLink,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { DELIVERY_PARTNERS, STORE_INFO } from "@/data/storeData";
import { useCart } from "@/context/CartContext";

export default function DeliveryPartnersSection() {
  const { openDeliveryModal } = useCart();

  return (
    <section id="delivery" className="py-16 sm:py-20 bg-white relative border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-pak-black bg-pak-yellow px-3.5 py-1 rounded-full shadow-xs">
            <Bike className="w-3.5 h-3.5 stroke-[2.5]" />
            Door-to-Door Antique Delivery
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-pak-black tracking-tight">
            Accredited Delivery & Pabili Riders
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Craving Pak na Pak at home or the office? Contact our official partner riders in San Jose, Antique to place your pabili order and get hot food delivered fast!
          </p>
        </div>

        {/* 3 Delivery Partners Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {DELIVERY_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="bg-zinc-50 rounded-3xl p-6 sm:p-7 border border-zinc-200 shadow-sm hover:shadow-xl hover:border-pak-yellow transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Rider Icon & Status */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-pak-yellow flex items-center justify-center text-pak-black shadow-md group-hover:scale-105 transition-transform">
                    <Bike className="w-6 h-6 stroke-[2.3]" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active in Antique
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-black text-2xl text-pak-black group-hover:text-amber-600 transition-colors">
                    {partner.name}
                  </h3>
                  <span className="text-xs font-bold text-amber-700 block mt-0.5">
                    {partner.badge}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                    {partner.tagline}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-zinc-200 text-xs text-zinc-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Food Pabili at Pak na Pak Store</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>San Jose de Buenavista & Nearby Towns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct Facebook Messenger Booking</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <a
                  href={partner.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-pak-black hover:bg-zinc-800 text-white hover:text-pak-yellow font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-pak-yellow" />
                  <span>Contact {partner.name}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Step Instruction Box */}
        <div className="bg-gradient-to-r from-amber-500 via-pak-yellow to-amber-400 rounded-3xl p-6 sm:p-8 text-pak-black shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-pak-black">
              How to Order Pak na Pak for Delivery
            </h3>
            <p className="text-xs sm:text-sm text-zinc-900 font-semibold mt-1">
              Simple 3-step pabili process for all Antiqueños
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-black/10 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-pak-black text-pak-yellow font-black text-xs inline-flex items-center justify-center">
                1
              </span>
              <h4 className="font-display font-black text-base text-zinc-900">
                Choose Meals
              </h4>
              <p className="text-xs text-zinc-700 font-medium">
                Browse our digital menu for your ₱99 Pak Meals, Chao Fan, 12 glazes, and barkada bundles.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-black/10 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-pak-black text-pak-yellow font-black text-xs inline-flex items-center justify-center">
                2
              </span>
              <h4 className="font-display font-black text-base text-zinc-900">
                Pick a Delivery Rider
              </h4>
              <p className="text-xs text-zinc-700 font-medium">
                Choose Mr. Cartman, SUGO Express, or ErrandPro to contact them directly on Facebook.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-black/10 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-pak-black text-pak-yellow font-black text-xs inline-flex items-center justify-center">
                3
              </span>
              <h4 className="font-display font-black text-base text-zinc-900">
                Receive & Enjoy!
              </h4>
              <p className="text-xs text-zinc-700 font-medium">
                The rider orders your food fresh at Pak na Pak and brings it hot directly to your home!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
