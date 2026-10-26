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
  Navigation,
  LocateFixed,
  Loader2,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart, DeliveryLiveLocation } from "@/context/CartContext";
import { STORE_INFO, SUGO_PACKAGING_FEE } from "@/data/storeData";

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

  const [orderType, setOrderType] = useState<"dine-in" | "take-out" | "delivery">("delivery");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Live GPS Location State for Drawer
  const [drawerGps, setDrawerGps] = useState<DeliveryLiveLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // SUGO delivery packaging cost
  const sugoPackagingCost = orderType === "delivery" ? SUGO_PACKAGING_FEE : 0;
  const drawerTotal = cartTotal + sugoPackagingCost;

  if (!isCartOpen) return null;

  // Accurate GPS Location Detection for Order Bag
  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError("Geolocation is not supported on this device/browser.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = Math.round(pos.coords.accuracy);
        const mapUrl = `https://www.google.com/maps?q=${lat.toFixed(6)},${lng.toFixed(6)}`;

        // Smart Antique town fallback detection based on coordinates
        let townName = "San Jose de Buenavista, Antique";
        if (lat >= 10.77 && lat <= 10.86) {
          townName = "Sibalom, Antique";
        } else if (lat < 10.72) {
          townName = "Hamtic, Antique";
        } else if (lat > 10.86) {
          townName = "Belison / Patnongon, Antique";
        }

        let addressText = `${townName} (GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)})`;

        // Reverse geocoding lookup via OpenStreetMap
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);
          if (res.ok) {
            const data = await res.json();
            const parts = [
              data.address?.road || data.address?.pedestrian,
              data.address?.suburb || data.address?.village || data.address?.neighbourhood,
              data.address?.town || data.address?.city || data.address?.municipality || townName,
            ].filter(Boolean);
            if (parts.length > 0) {
              addressText = parts.join(", ");
            } else if (data.display_name) {
              addressText = data.display_name.split(",").slice(0, 3).join(", ");
            }
          }
        } catch {
          // Fallback to townName
        }

        const locationData: DeliveryLiveLocation = {
          lat,
          lng,
          accuracy,
          addressText,
          mapUrl,
        };

        setDrawerGps(locationData);

        if (!customerAddress) {
          setCustomerAddress(addressText);
        }

        setIsLocating(false);

        try {
          confetti({
            particleCount: 50,
            spread: 55,
            origin: { y: 0.6 },
            colors: ["#10B981", "#FFC700", "#111111"],
          });
        } catch {
          // Ignore
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === 1) {
          setLocationError("Location permission denied. Please allow GPS access in your browser.");
        } else if (err.code === 2) {
          setLocationError("GPS position unavailable. Please ensure location services are turned on.");
        } else {
          setLocationError("Location request timed out. Please try again.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

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

    if (orderType === "delivery" && drawerGps) {
      msg += `📍 EXACT GOOGLE MAPS PIN: ${drawerGps.mapUrl}\n`;
      msg += `📌 PINNED AREA: ${drawerGps.addressText}\n`;
      msg += `🎯 GPS ACCURACY: ±${drawerGps.accuracy} meters\n`;
    }

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

    if (orderType === "delivery") {
      msg += `• 🥡 1x SUGO Delivery Food Container - ₱${SUGO_PACKAGING_FEE} (Pang-lagay ng pagkain sa delivery)\n`;
    }

    msg += `\n💰 TOTAL ESTIMATED AMOUNT: ₱${drawerTotal}\n`;
    msg += `\nPaki-confirm po if available and ready for prep. Maraming salamat!`;

    return msg;
  };

  const handleMessengerOrder = () => {
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
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);

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

  const handleOpenDeliveryPartnerModal = () => {
    setIsCartOpen(false);
    openDeliveryModal({
      items: cart.map((c) => ({
        name: c.name,
        details: [c.selectedFlavor, c.selectedPasta, c.selectedSauce]
          .filter(Boolean)
          .join(", "),
        price: c.price,
        quantity: c.quantity,
      })),
      total: cartTotal,
      packagingFee: SUGO_PACKAGING_FEE,
      customerName,
      customerPhone,
      customerAddress,
      notes: orderNotes,
      liveLocation: drawerGps || undefined,
    });
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
        <div className="bg-pak-black text-white p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800 shrink-0">
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
                      { id: "delivery", label: "🛵 Delivery" },
                      { id: "dine-in", label: "🍽️ Dine-In" },
                      { id: "take-out", label: "🛍️ Take-Out" },
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

                {/* SUGO Packaging Fee in Delivery Mode */}
                {orderType === "delivery" && (
                  <div className="p-2.5 bg-amber-50/90 border border-amber-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-200 flex items-center justify-center text-sm shrink-0">
                        🥡
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-pak-black">SUGO Food Packaging Container</span>
                          <span className="text-[10px] bg-pak-yellow text-pak-black font-extrabold px-1.5 py-0.2 rounded">Add-on</span>
                        </div>
                        <p className="text-[10px] text-zinc-600">Puts your food securely in takeout boxes for delivery</p>
                      </div>
                    </div>
                    <span className="font-display font-black text-xs text-amber-950 shrink-0">+₱{SUGO_PACKAGING_FEE}</span>
                  </div>
                )}

                {/* GPS Location Detection in Delivery Mode */}
                {orderType === "delivery" && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wide text-zinc-800 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-amber-600" />
                        Exact Delivery Location
                      </span>

                      {drawerGps && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          GPS Pinned
                        </span>
                      )}
                    </div>

                    {!drawerGps ? (
                      <div>
                        <button
                          type="button"
                          onClick={handleDetectLocation}
                          disabled={isLocating}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pak-yellow to-amber-400 hover:from-amber-400 hover:to-pak-yellow text-pak-black font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
                        >
                          {isLocating ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-pak-black" />
                              <span>Detecting your live GPS coordinates...</span>
                            </>
                          ) : (
                            <>
                              <LocateFixed className="w-3.5 h-3.5 text-pak-black stroke-[2.4]" />
                              <span>📍 Turn On GPS / Pin My Location Live</span>
                            </>
                          )}
                        </button>
                        <p className="text-[10px] text-zinc-500 text-center mt-1">
                          Pins your live spot in Antique so riders deliver straight to your door.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white border border-emerald-300 rounded-lg p-2.5 space-y-1.5">
                        <div className="flex items-start justify-between gap-1.5">
                          <div>
                            <span className="text-[10px] font-black text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Live Pin Confirmed
                            </span>
                            <p className="text-xs font-bold text-zinc-900 leading-snug">
                              {drawerGps.addressText}
                            </p>
                            <p className="text-[10px] text-zinc-500 font-mono">
                              ±{drawerGps.accuracy}m accuracy
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleDetectLocation}
                            disabled={isLocating}
                            title="Re-check GPS location"
                            className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
                          >
                            <RefreshCw className={`w-3 h-3 ${isLocating ? "animate-spin" : ""}`} />
                          </button>
                        </div>

                        <a
                          href={drawerGps.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 hover:underline"
                        >
                          <span>View on Google Maps</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    )}

                    {locationError && (
                      <p className="text-[11px] text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200">
                        {locationError}
                      </p>
                    )}
                  </div>
                )}

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
                  {orderType === "delivery" ? (
                    <span className="text-[11px] text-zinc-600 font-medium">
                      Food ₱{cartTotal} + ₱{SUGO_PACKAGING_FEE} SUGO box
                    </span>
                  ) : (
                    <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Sulit guaranteed
                    </span>
                  )}
                </div>
                <span className="font-display font-black text-2xl sm:text-3xl text-pak-black">
                  ₱{drawerTotal}
                </span>
              </div>

              {/* Primary Delivery Rider Booking Button */}
              <button
                type="button"
                onClick={handleOpenDeliveryPartnerModal}
                className="w-full flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer min-h-[44px]"
              >
                <Bike className="w-5 h-5 stroke-[2.3]" />
                <span>Contact Delivery Riders (Mr. Cartman, SUGO, ErrandPro)</span>
              </button>

              {/* Secondary Store Messenger Button */}
              <button
                type="button"
                onClick={handleMessengerOrder}
                className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-zinc-700 transition-colors cursor-pointer min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-pak-yellow" />
                <span>Or Message Pak na Pak Store Directly</span>
              </button>

              {/* Secondary Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied with Live Pin!</span>
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
                  className="flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer min-h-[44px]"
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
