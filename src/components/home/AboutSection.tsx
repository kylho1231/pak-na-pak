"use client";

import React from "react";
import Image from "next/image";
import {
  Flame,
  Heart,
  Users,
  ShieldCheck,
  Sparkles,
  MapPin,
  Utensils,
  Award,
} from "lucide-react";
import { STORE_INFO } from "@/data/storeData";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white relative overflow-hidden border-t border-zinc-200 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Image Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/4.8] shadow-2xl border-4 border-pak-yellow">
                <Image
                  src="/dishes/full-pak-meal-carbonara.jpg"
                  alt="Pak na Pak Full Pak Meal with Carbonara"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-black uppercase tracking-wider text-pak-yellow block">
                    San Jose, Antique
                  </span>
                  <p className="font-display font-black text-lg">
                    Where Good Food Meets Great Company
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-2 left-2 sm:-top-4 sm:-left-6 bg-pak-black text-white p-2.5 sm:p-3.5 rounded-2xl shadow-xl border-2 border-pak-yellow flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-pak-yellow flex items-center justify-center text-pak-black font-black shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="font-display font-black text-xs sm:text-sm block leading-tight text-white">
                    Proudly Local
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-zinc-400">
                    San Jose de Buenavista
                  </span>
                </div>
              </div>

              {/* Floating Stat Pill */}
              <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-6 bg-pak-yellow text-pak-black p-2 sm:p-3 rounded-2xl shadow-xl border border-black/10 flex items-center gap-1.5 sm:gap-2 font-display font-black text-[11px] sm:text-xs">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-pak-black shrink-0" />
                <span>100% Sulit Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Principles (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 fill-amber-700" />
                Our Story
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-pak-black tracking-tight leading-tight">
                Crafted for Antiqueños. <br />
                <span className="text-amber-600">Busog Every Time.</span>
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed pt-1">
                At <strong>Pak na Pak</strong>, we believe great food shouldn’t break the bank. We started right here in <strong>San Jose, Antique</strong> with a vision to create a vibrant food haven where students, office barkadas, and families can gather over generous portions of mouth-watering comfort food.
              </p>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Whether it’s our signature <strong>₱99 Pak Meals</strong> with crispy fried chicken and savory pasta, sizzling hot plates, or our all-you-can-eat <strong>Samgyupsal grill</strong>, we prepare every dish with heart, authentic flavor, and sincere hospitality.
              </p>
            </div>

            {/* Three Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-display font-black text-sm text-zinc-900">
                  Always Fresh
                </h4>
                <p className="text-xs text-zinc-500 leading-snug">
                  Freshly fried to order with golden crispiness in every bite.
                </p>
              </div>

              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-display font-black text-sm text-zinc-900">
                  12 Glaze Flavors
                </h4>
                <p className="text-xs text-zinc-500 leading-snug">
                  From Garlic Parmesan to Orange Glazed and Spicy Buffalo.
                </p>
              </div>

              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="font-display font-black text-sm text-zinc-900">
                  Barkada Friendly
                </h4>
                <p className="text-xs text-zinc-500 leading-snug">
                  Cozy dine-in spaces, party packages & friendly local service.
                </p>
              </div>
            </div>

            {/* Quote Banner */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
              <div className="w-2 self-stretch rounded-full bg-pak-yellow" />
              <p className="text-xs sm:text-sm font-semibold text-zinc-800 italic">
                &ldquo;Sa Pak na Pak, hindi ka lang mabubusog—siguradong babalik-balikan mo ang sarap!&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
