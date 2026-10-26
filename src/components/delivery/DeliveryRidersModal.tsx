"use client";

import React, { useState } from "react";
import {
  X,
  Bike,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  MapPin,
  Sparkles,
  AlertCircle,
  Phone,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { DELIVERY_PARTNERS, STORE_INFO } from "@/data/storeData";

export default function DeliveryRidersModal() {
  const { isDeliveryModalOpen, closeDeliveryModal, deliveryPayload } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isDeliveryModalOpen) return null;

  const buildPabiliText = (riderName: string) => {
    let msg = `🛵 PABILI REQUEST FOR ${riderName.toUpperCase()}\n`;
    msg += `📍 STORE TO BUY FROM: Pak na Pak Restaurant\n`;
    msg += `📍 STORE LOCATION: San Jose de Buenavista, Antique (Near EBJ Freedom Park)\n\n`;

    if (deliveryPayload && deliveryPayload.items.length > 0) {
      msg += `📋 ITEMS TO BUY:\n`;
      deliveryPayload.items.forEach((item) => {
        msg += `• ${item.quantity}x ${item.name}${
          item.details ? ` (${item.details})` : ""
        } - ₱${item.price * item.quantity}\n`;
      });
      msg += `\n💰 ESTIMATED FOOD COST: ₱${deliveryPayload.total}\n`;
    } else {
      msg += `📋 ITEM TO BUY: (Please refer to Pak na Pak menu)\n`;
    }

    if (deliveryAddress.trim()) {
      msg += `🏠 DELIVER TO: ${deliveryAddress.trim()}\n`;
    } else {
      msg += `🏠 DELIVER TO: [Please provide your Antique address / landmark]\n`;
    }

    msg += `\nPaki-accept po ang delivery order. Thank you!`;
    return msg;
  };

  const handleCopyOrder = () => {
    const text = buildPabiliText("Delivery Rider");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSelectRider = (partner: (typeof DELIVERY_PARTNERS)[0]) => {
    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#FFC700", "#111111", "#2563EB"],
      });
    } catch {
      // Ignore
    }

    // Auto-copy order details for convenience
    const text = buildPabiliText(partner.name);
    navigator.clipboard.writeText(text);
    setCopied(true);

    // Open rider page in a new window
    window.open(partner.facebookUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-pak-cream rounded-3xl shadow-2xl flex flex-col border border-zinc-300 overflow-hidden max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delivery-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-pak-black text-white p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-pak-yellow flex items-center justify-center text-pak-black shadow-md">
              <Bike className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h2
                id="delivery-modal-title"
                className="font-display font-black text-lg sm:text-xl text-white tracking-tight"
              >
                Order via Antique Delivery Riders
              </h2>
              <p className="text-xs text-pak-yellow font-semibold">
                Direct pabili & door-to-door delivery in San Jose, Antique
              </p>
            </div>
          </div>

          <button
            onClick={closeDeliveryModal}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close delivery modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Order Snapshot Box */}
          {deliveryPayload && deliveryPayload.items.length > 0 ? (
            <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Items for Rider to Buy
                </span>
                <span className="font-display font-black text-base text-pak-black">
                  Total: ₱{deliveryPayload.total}
                </span>
              </div>

              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {deliveryPayload.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs text-zinc-700"
                  >
                    <span>
                      <strong className="text-pak-black">{item.quantity}x</strong> {item.name}
                      {item.details && (
                        <span className="text-zinc-500 text-[11px] block sm:inline sm:ml-1">
                          [{item.details}]
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-zinc-900 shrink-0">
                      ₱{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Address Input */}
              <div className="pt-2 border-t border-zinc-100">
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Enter your Delivery Address / Landmark in Antique..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                  />
                </div>
              </div>

              {/* Copy Order Details Button */}
              <button
                type="button"
                onClick={handleCopyOrder}
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs py-2 px-3 rounded-xl transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span className="text-emerald-700 font-black">
                      Pabili Details Copied to Clipboard!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-700" />
                    <span>Copy Pabili Order Details for Rider</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Have your craving ready?</strong>
                <span>
                  Select any rider below to message them your Pak na Pak order details and your delivery address.
                </span>
              </div>
            </div>
          )}

          {/* Delivery Riders List */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-zinc-900 block">
              Choose an Accredited Antique Delivery Courier:
            </label>

            {DELIVERY_PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm hover:shadow-md hover:border-pak-yellow transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="font-display font-black text-base text-pak-black group-hover:text-amber-600 transition-colors">
                      {partner.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                      {partner.badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">
                    {partner.tagline}
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-700 block">
                    ✓ {partner.serviceType}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSelectRider(partner)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs py-2.5 px-4 rounded-xl shadow cursor-pointer transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-pak-black" />
                    <span>Contact on Facebook</span>
                    <ExternalLink className="w-3 h-3 text-zinc-800 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* How Delivery Works Card */}
          <div className="bg-zinc-100 rounded-2xl p-4 border border-zinc-200 text-xs text-zinc-600 space-y-1.5">
            <span className="font-black text-zinc-800 uppercase tracking-wider text-[11px] block">
              💡 How Pabili / Delivery Works in Antique:
            </span>
            <ol className="list-decimal list-inside space-y-1 text-zinc-700">
              <li>Click your chosen delivery courier above (Mr. Cartman, SUGO, or ErrandPro).</li>
              <li>Your order details will be copied automatically—just paste it into your chat with them!</li>
              <li>The rider purchases your fresh food directly at Pak na Pak and brings it right to your doorstep.</li>
            </ol>
            <p className="text-[10px] text-zinc-500 pt-1">
              *Delivery fee is paid directly to your chosen rider based on your location in Antique.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-white border-t border-zinc-200 text-center text-xs text-zinc-500 shrink-0 flex items-center justify-between px-5">
          <span>Need help? Call store directly:</span>
          <a
            href={`tel:${STORE_INFO.contactNumber}`}
            className="font-bold text-amber-700 hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            <span>{STORE_INFO.contactNumber}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
