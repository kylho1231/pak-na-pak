"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  FileText,
  ShieldCheck,
  Heart,
  Share2,
} from "lucide-react";
import { STORE_INFO } from "@/data/storeData";
import { useCart } from "@/context/CartContext";

export default function Footer() {
  const pathname = usePathname();
  const { openScanModal } = useCart();

  // Isolate Data App / Dashboard completely from public customer portal
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-pak-black text-zinc-300 border-t-4 border-pak-yellow pb-24 md:pb-0 w-full max-w-full overflow-hidden">
      {/* Pre-Footer Action Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-pak-yellow to-amber-400 text-pak-black py-10 px-4 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left w-full">
          <div>
            <span className="inline-block bg-pak-black text-pak-yellow text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-2">
              Ready to eat?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight text-pak-black">
              Craving na? Message Pak na Pak Now!
            </h2>
            <p className="text-zinc-900 font-medium text-sm sm:text-base mt-1 max-w-xl">
              Order your favorite ₱99 meals, crispy glazed fried chicken, chao fan, or book your unli samgyupsal table in San Jose, Antique.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={STORE_INFO.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pak-black hover:bg-zinc-900 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition-transform duration-150 hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-pak-yellow" />
              <span>Order on Messenger</span>
            </a>
            <a
              href={`tel:${STORE_INFO.contactNumber}`}
              className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-pak-black font-extrabold px-5 py-3.5 rounded-xl transition-transform duration-150 hover:scale-105 cursor-pointer shadow"
            >
              <Phone className="w-5 h-5" />
              <span>Call {STORE_INFO.contactNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-pak-yellow flex items-center justify-center font-display font-black text-pak-black text-xl">
                <Flame className="w-6 h-6 fill-pak-black text-pak-black" />
              </div>
              <div>
                <span className="font-display font-black text-2xl text-white tracking-tight">
                  Pak na Pak
                </span>
                <span className="block text-xs text-pak-yellow font-bold uppercase tracking-wider">
                  San Jose, Antique
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Antique’s favorite destination for crispy fried chicken with 12 signature glazes, wok-tossed chao fan, sizzling hot plates, unlimited feasts, and Korean samgyupsal.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pak-yellow bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                <ShieldCheck className="w-4 h-4" />
                100% Quality & Affordable Sulit Meals
              </span>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pak-yellow"></span>
              Popular Categories
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/#bestsellers" className="hover:text-pak-yellow transition-colors cursor-pointer">
                  Best Selling Meals (₱99 Pak Meal)
                </Link>
              </li>
              <li>
                <Link href="/#unlimited" className="hover:text-pak-yellow transition-colors cursor-pointer">
                  Unlimited Chicken & Rice (₱239)
                </Link>
              </li>
              <li>
                <Link href="/#samgyup" className="hover:text-pak-yellow transition-colors cursor-pointer">
                  Unlimited Samgyupsal (From ₱249)
                </Link>
              </li>
              <li>
                <Link href="/#menu" className="hover:text-pak-yellow transition-colors cursor-pointer">
                  12 Signature Chicken Flavors
                </Link>
              </li>
              <li>
                <Link href="/#menu" className="hover:text-pak-yellow transition-colors cursor-pointer">
                  Chao Fan Special (Siomai & Shanghai)
                </Link>
              </li>
              <li>
                <Link href="/#menu" className="hover:text-pak-yellow transition-colors cursor-pointer">
                  Sizzling Hot Plates (₱99 Sisig & Steak)
                </Link>
              </li>
              <li>
                <Link href="/#menu" className="hover:text-pak-yellow transition-colors cursor-pointer">
                  Take-out Party Bundles (10 & 20 pcs)
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Hours & Dine-In Info */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pak-yellow"></span>
              Branches & Hours
            </h3>
            <ul className="space-y-3.5 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pak-yellow mt-0.5 shrink-0" />
                <div>
                  <span className="text-white font-semibold block text-xs">San Jose (Main Branch):</span>
                  <span className="text-xs">San Jose de Buenavista, 5700 Antique</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=10.74189637279932,121.93939029205245"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[11px] text-pak-yellow hover:underline mt-0.5"
                  >
                    📍 Map Pin (10.741896, 121.939390)
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pak-yellow mt-0.5 shrink-0" />
                <div>
                  <span className="text-white font-semibold block text-xs">Sibalom Branch:</span>
                  <span className="text-xs">Sibalom, 5701 Antique</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=10.786897358232114,122.01643319435914"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[11px] text-pak-yellow hover:underline mt-0.5"
                  >
                    📍 Map Pin (10.786897, 122.016433)
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-pak-yellow mt-0.5 shrink-0" />
                <div>
                  <span className="text-white font-semibold block text-xs">Store Hours:</span>
                  <span className="text-xs">10:00 AM - 9:00 PM Daily (Samgyup to 9:30 PM)</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-pak-yellow mt-0.5 shrink-0" />
                <div>
                  <span className="text-white font-semibold block text-xs">Mobile Hotline:</span>
                  <a href={`tel:${STORE_INFO.contactNumber}`} className="text-pak-yellow hover:underline text-xs">
                    {STORE_INFO.contactNumber}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Connect & Social Channels */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pak-yellow"></span>
              Follow on Facebook
            </h3>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Follow our official Facebook pages for daily promos, holiday announcements & menu drops:
            </p>

            <div className="flex flex-col gap-2">
              <a
                href="https://www.facebook.com/pork.ever"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-pak-yellow shrink-0" />
                <span>San Jose FB (@pork.ever)</span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61594810508350"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-pak-yellow shrink-0" />
                <span>Sibalom FB (Official Page)</span>
              </a>

              <button
                onClick={() => openScanModal(0)}
                className="inline-flex items-center gap-2 bg-zinc-850 hover:bg-zinc-750 text-pak-yellow text-xs font-bold py-2 px-3 rounded-xl transition-colors cursor-pointer text-left mt-1 border border-zinc-700"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>View Original Menu Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p className="flex items-center gap-1">
            © 2026 Pak na Pak Restaurant. Proudly serving San Jose, Antique.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Antiqueños
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
