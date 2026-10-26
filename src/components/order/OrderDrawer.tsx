"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Phone,
  Copy,
  Check,
  MapPin,
  User,
  Sparkles,
  Bike,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { STORE_INFO, DELIVERY_PARTNERS } from "@/data/storeData";

export default function OrderDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    openDeliveryModal,
  } = useCart();

  const [orderType, setOrderType] = useState<"dine-in" | "take-out" | "delivery">("dine-in");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  if (!isCartOpen) return null;

  const generateOrderMessage = () => {
    const typeLabel =
      orderType === "dine-in"
        ? "Dine-In (Pak na Pak Antique)"
        : orderType === "take-out"
        ? "Take-Out / Pick-up"
        : "Delivery";

    let msg = `👋 Hello Pak na Pak Restaurant Antique!\nI would like to place an order:\n\n`;
    msg += `📍 ORDER TYPE: ${typeLabel}\n`;
    if (customerName) msg += `👤 NAME: ${customerName}\n`;
    if (customerPhone) msg += `📱 PHONE: ${customerPhone}\n`;
    if (customerAddress) {
      msg +=
        orderType === "dine-in"
          ? `🪑 TABLE / TIME: ${customerAddress}\n`
          : `🏠 DELIVERY ADDRESS / LANDMARK: ${customerAddress}\n`;
    }
    if (orderNotes) msg += `📝 NOTES: ${orderNotes}\n`;

    msg += `\n🛒 ITEMS ORDERED:\n`;
    cart.forEach((item) => {
      let details = "";
      if (item.selectedFlavor) details += ` [Glaze: ${item.selectedFlavor}]`;
      if (item.selectedPasta) details += ` [Pasta: ${item.selectedPasta}]`;
      if (item.selectedSauce) details += ` [Sauce: ${item.selectedSauce}]`;
      if (item.specialInstructions) details += ` (Note: ${item.specialInstructions})`;

      msg += `• ${item.quantity}x ${item.name}${details} - ₱${item.price * item.quantity}\n`;
    });

    msg += `\n💰 TOTAL ESTIMATED AMOUNT: ₱${cartTotal}\n`;
    msg += `\nPaki-confirm po if available and ready for prep. Maraming salamat!`;

    return msg;
  };

  const handleMessengerOrder = () => {
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FFC700", "#111111", "#F59E0B"],
      });
    } catch {
      // Ignore if confetti fails
    }

    const message = generateOrderMessage();
    // Copy to clipboard
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);

    // Open Messenger URL
    const encoded = encodeURIComponent(message);
    const messengerUrl = `${STORE_INFO.messengerUrl}?text=${encoded}`;
    window.open(messengerUrl, "_blank");
  };

  const handleCopySummary = () => {
    const message = generateOrderMessage();
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="relative w-full max-w-md bg-pak-cream h-full shadow-2xl flex flex-col z-10 border-l border-zinc-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-drawer-title"
      >
        {/* Drawer Header */}
        <div className="bg-pak-black text-white p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pak-yellow flex items-center justify-center text-pak-black">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="order-drawer-title"
                className="font-display font-black text-lg sm:text-xl text-white tracking-tight"
              >
                Your Order Bag
              </h2>
              <span className="text-xs text-pak-yellow font-semibold">
                {cartCount} {cartCount === 1 ? "item" : "items"} selected
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-3xl bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="font-display font-black text-xl text-pak-black">
              Your bag is empty
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xs">
              Explore our ₱99 Pak Meals, Chao Fan, 12 glazed wings, and sizzling plates!
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-6 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-sm px-6 py-2.5 rounded-xl shadow cursor-pointer"
            >
              Browse Menu Now
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-zinc-200/60">
              {cart.map((item) => (
                <div key={item.cartId} className="pt-3 first:pt-0 flex gap-3 items-start">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-200 border border-zinc-300">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-display font-extrabold text-xs sm:text-sm text-pak-black truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-zinc-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization Details */}
                    <div className="text-[11px] text-zinc-600 space-y-0.5 mt-0.5">
                      {item.selectedFlavor && (
                        <span className="inline-block bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded mr-1">
                          {item.selectedFlavor}
                        </span>
                      )}
                      {item.selectedPasta && (
                        <span className="inline-block bg-orange-100 text-orange-900 font-bold px-1.5 py-0.5 rounded mr-1">
                          {item.selectedPasta}
                        </span>
                      )}
                      {item.selectedSauce && (
                        <span className="inline-block bg-zinc-200 text-zinc-800 font-medium px-1.5 py-0.5 rounded mr-1">
                          {item.selectedSauce}
                        </span>
                      )}
                      {item.specialInstructions && (
                        <span className="block text-zinc-500 italic">
                          &ldquo;{item.specialInstructions}&rdquo;
                        </span>
                      )}
                    </div>

                    {/* Quantity & Line Total */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white border border-zinc-300 rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="text-zinc-600 hover:text-black cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black w-4 text-center text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="text-zinc-600 hover:text-black cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-display font-black text-sm text-pak-black">
                        ₱{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-right">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-zinc-400 hover:text-rose-600 underline cursor-pointer"
                >
                  Clear all items
                </button>
              </div>

              {/* Order Info Form */}
              <div className="pt-3 space-y-3 bg-white p-3.5 rounded-2xl border border-zinc-200">
                <label className="text-xs font-black uppercase tracking-wider text-pak-black block">
                  How will you enjoy this?
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { id: "dine-in", label: "🍽️ Dine-In" },
                      { id: "take-out", label: "🛍️ Take-Out" },
                      { id: "delivery", label: "🛵 Delivery" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setOrderType(opt.id)}
                      className={`py-2 px-1 rounded-xl text-xs font-extrabold text-center transition-all cursor-pointer border ${
                        orderType === opt.id
                          ? "bg-pak-yellow text-pak-black border-pak-yellow shadow-xs"
                          : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 pt-1">
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Your Name / Nickname"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="Mobile Number (e.g. 0917-xxx-xxxx)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder={
                        orderType === "dine-in"
                          ? "Table # or Estimated Arrival Time"
                          : "Delivery Address / Landmark in Antique"
                      }
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Notes (e.g. please pack condiments separately)"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow"
                  />
                </div>
              </div>
            </div>

            {/* Sticky Drawer Footer with Messenger CTA */}
            <div className="p-4 bg-white border-t border-zinc-300 space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-500 font-semibold block">Total Amount</span>
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Sulit guaranteed
                  </span>
                </div>
                <span className="font-display font-black text-2xl sm:text-3xl text-pak-black">
                  ₱{cartTotal}
                </span>
              </div>

              {/* Primary Delivery Rider Booking Button */}
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  openDeliveryModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer"
              >
                <Bike className="w-5 h-5 stroke-[2.3]" />
                <span>Contact Delivery Riders (Mr. Cartman, SUGO, ErrandPro)</span>
              </button>

              {/* Secondary Store Messenger Button */}
              <button
                type="button"
                onClick={handleMessengerOrder}
                className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-zinc-700 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-pak-yellow" />
                <span>Or Message Pak na Pak Store Directly</span>
              </button>

              {/* Secondary Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Order Text</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${STORE_INFO.contactNumber}`}
                  className="flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
