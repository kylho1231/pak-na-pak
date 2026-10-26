"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Phone,
  MessageCircle,
  FileText,
  Clock,
  MapPin,
  Flame,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STORE_INFO } from "@/data/storeData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, cartTotal, setIsCartOpen, openScanModal } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Full Menu", href: "/#menu" },
    { label: "Best Sellers", href: "/#bestsellers" },
    { label: "Unlimited Meals", href: "/#unlimited" },
    { label: "Samgyupsal", href: "/#samgyup" },
    { label: "₱99 Promos", href: "/#promos" },
    { label: "About", href: "/#about" },
    { label: "Location", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notification Strip */}
      <div className="bg-pak-black text-white text-xs font-medium py-1.5 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-pak-yellow font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Open Now in San Jose, Antique
            </span>
            <span className="hidden md:inline text-zinc-400">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-pak-yellow" />
              10:00 AM - 9:00 PM Daily
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => openScanModal(0)}
              className="text-pak-yellow hover:text-white transition-colors flex items-center gap-1 text-xs cursor-pointer font-medium"
              aria-label="View original physical menu scans"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="underline underline-offset-2">Original Menu Scans</span>
            </button>
            <a
              href={`tel:${STORE_INFO.contactNumber}`}
              className="hidden sm:flex items-center gap-1 text-zinc-300 hover:text-pak-yellow transition-colors"
            >
              <Phone className="w-3 h-3 text-pak-yellow" />
              <span>{STORE_INFO.contactNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-pak-black/95 backdrop-blur-md text-white shadow-xl border-b border-pak-yellow/20 py-2.5"
            : "bg-pak-black text-white py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-pak-yellow rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-pak-yellow flex items-center justify-center font-display font-black text-pak-black text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
              <Flame className="w-6 h-6 fill-pak-black text-pak-black" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-display font-black tracking-tight text-xl sm:text-2xl text-white group-hover:text-pak-yellow transition-colors">
                  Pak na Pak
                </span>
                <span className="bg-pak-yellow text-pak-black font-extrabold text-[10px] uppercase px-1.5 py-0.5 rounded tracking-wide">
                  Antique
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium tracking-tight -mt-1 hidden sm:block">
                Sulit sa Sarap. Busog Ka.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-zinc-200">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-lg hover:text-pak-yellow hover:bg-zinc-850/80 transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pak-yellow"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Messenger Link */}
            <a
              href={STORE_INFO.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer border border-zinc-700 hover:border-pak-yellow focus:outline-none focus:ring-2 focus:ring-pak-yellow"
              aria-label="Chat on Facebook Messenger"
            >
              <MessageCircle className="w-4 h-4 text-pak-yellow" />
              <span>Messenger</span>
            </a>

            {/* Cart / Order Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md transition-all duration-200 cursor-pointer hover:shadow-pak-yellow/20 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pak-yellow"
              aria-label={`Open order tray with ${cartCount} items, total ₱${cartTotal}`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Order Bag</span>
              {cartCount > 0 && (
                <span className="bg-pak-black text-pak-yellow font-black text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
              {cartTotal > 0 && (
                <span className="hidden md:inline font-black text-xs bg-black/10 px-1.5 py-0.5 rounded">
                  ₱{cartTotal}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-pak-yellow transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-pak-yellow"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-pak-black border-t border-zinc-800 px-4 pt-3 pb-6 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-base font-bold text-zinc-200 hover:text-pak-black hover:bg-pak-yellow transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openScanModal(0);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-2.5 px-4 rounded-xl cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-pak-yellow" />
                  <span>View Original Menu Cards</span>
                </button>

                <a
                  href={STORE_INFO.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-pak-yellow text-pak-black font-extrabold py-2.5 px-4 rounded-xl cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Us on Facebook</span>
                </a>

                <div className="mt-2 text-center text-xs text-zinc-400 flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pak-yellow" />
                  <span>San Jose de Buenavista, Antique</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
