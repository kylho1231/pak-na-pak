"use client";

import React, { useState, useEffect } from "react";
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
  Navigation,
  LocateFixed,
  Loader2,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart, DeliveryLiveLocation } from "@/context/CartContext";
import { DELIVERY_PARTNERS, STORE_INFO } from "@/data/storeData";

const POPULAR_ANTIQUE_LANDMARKS = [
  "EBJ Freedom Park, San Jose",
  "Antique Provincial Capitol",
  "Funda-Dalipe, San Jose",
  "San Jose Public Market",
  "Sibalom Town Center",
];

export default function DeliveryRidersModal() {
  const { isDeliveryModalOpen, closeDeliveryModal, deliveryPayload } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [landmarkNotes, setLandmarkNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [copySuccessToast, setCopySuccessToast] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  // Live GPS Location State
  const [liveLocation, setLiveLocation] = useState<DeliveryLiveLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Sync payload if passed from Order Drawer
  useEffect(() => {
    if (deliveryPayload) {
      if (deliveryPayload.liveLocation) {
        setLiveLocation(deliveryPayload.liveLocation);
      }
      if (deliveryPayload.customerAddress) {
        setDeliveryAddress(deliveryPayload.customerAddress);
      }
      if (deliveryPayload.notes) {
        setLandmarkNotes(deliveryPayload.notes);
      }
    }
  }, [deliveryPayload]);

  if (!isDeliveryModalOpen) return null;

  // Detect accurate GPS location
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

        // Reverse geocoding lookup
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
          // Gracefully fallback to coordinates and town name
        }

        setLiveLocation({
          lat,
          lng,
          accuracy,
          addressText,
          mapUrl,
        });

        if (!deliveryAddress) {
          setDeliveryAddress(addressText);
        }

        setIsLocating(false);

        // Celebration confetti on successful GPS pin
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
          setLocationError(
            "Location permission was denied. Please allow location access in your browser or type your Antique address manually."
          );
        } else if (err.code === 2) {
          setLocationError(
            "GPS position unavailable. Please ensure location services are turned on."
          );
        } else {
          setLocationError(
            "Location request timed out. Please try again or type your address manually."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Build the complete pabili text with live Google Maps pin
  const buildPabiliText = (riderName = "Delivery Rider") => {
    let msg = `🛵 PABILI / DELIVERY REQUEST FOR ${riderName.toUpperCase()}\n`;
    msg += `📍 STORE TO BUY FROM: Pak na Pak Restaurant\n`;
    msg += `📍 STORE LOCATION: San Jose de Buenavista, Antique (Near EBJ Freedom Park)\n`;
    msg += `📞 STORE HOTLINE: ${STORE_INFO.contactNumber}\n\n`;

    if (deliveryPayload?.customerName) {
      msg += `👤 CUSTOMER NAME: ${deliveryPayload.customerName}\n`;
    }
    if (deliveryPayload?.customerPhone) {
      msg += `📱 CUSTOMER CONTACT: ${deliveryPayload.customerPhone}\n\n`;
    }

    if (deliveryPayload && deliveryPayload.items.length > 0) {
      msg += `📋 ITEMS TO BUY:\n`;
      deliveryPayload.items.forEach((item) => {
        msg += `• ${item.quantity}x ${item.name}${
          item.details ? ` [${item.details}]` : ""
        } - ₱${item.price * item.quantity}\n`;
      });
      msg += `\n💰 ESTIMATED FOOD COST: ₱${deliveryPayload.total} (Excludes rider fee)\n\n`;
    } else {
      msg += `📋 ITEM TO BUY: (Please refer to Pak na Pak menu)\n\n`;
    }

    msg += `🏠 DELIVER TO (CUSTOMER LOCATION):\n`;
    if (liveLocation) {
      msg += `📍 EXACT LIVE GOOGLE MAPS PIN: ${liveLocation.mapUrl}\n`;
      msg += `📌 PINNED AREA: ${liveLocation.addressText}\n`;
      msg += `🎯 GPS ACCURACY: ±${liveLocation.accuracy} meters\n`;
      if (landmarkNotes.trim()) {
        msg += `🏠 HOUSE / LANDMARK NOTES: ${landmarkNotes.trim()}\n`;
      } else if (deliveryAddress.trim() && deliveryAddress !== liveLocation.addressText) {
        msg += `🏠 HOUSE / LANDMARK NOTES: ${deliveryAddress.trim()}\n`;
      }
    } else if (deliveryAddress.trim()) {
      msg += `🏠 Delivery Address / Landmark: ${deliveryAddress.trim()}\n`;
      if (landmarkNotes.trim()) {
        msg += `📌 Additional Notes: ${landmarkNotes.trim()}\n`;
      }
    } else {
      msg += `🏠 Delivery Address: [Please provide your Antique address / landmark]\n`;
    }

    msg += `\n👋 Paki-pabili po sa Pak na Pak Restaurant Antique at paki-deliver sa live Google Maps pin sa taas. Maraming salamat!`;
    return msg;
  };

  const currentPabiliMessage = buildPabiliText("Delivery Rider");

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(currentPabiliMessage);
    setCopied(true);
    setCopySuccessToast("Pabili details & Google Maps live location pin copied to clipboard!");
    setTimeout(() => {
      setCopied(false);
      setCopySuccessToast(null);
    }, 4000);
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

    // Auto-copy order details with live location pin for the rider
    const text = buildPabiliText(partner.name);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopySuccessToast(
      `Order details & Live Google Maps Pin copied! Opening ${partner.name} on Facebook—just paste the message in your chat!`
    );

    // Open rider page in a new window
    window.open(partner.facebookUrl, "_blank");

    setTimeout(() => {
      setCopied(false);
      setCopySuccessToast(null);
    }, 6000);
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
                Direct pabili & door-to-door delivery with live GPS pin
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

        {/* Floating Success Toast */}
        {copySuccessToast && (
          <div className="bg-emerald-600 text-white px-4 py-3 text-xs font-bold flex items-center justify-between gap-2 shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
              <span>{copySuccessToast}</span>
            </div>
            <button
              onClick={() => setCopySuccessToast(null)}
              className="text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

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
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Have your craving ready?</strong>
                <span>
                  Turn on your GPS location below and choose your preferred delivery rider to contact on Facebook!
                </span>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* LIVE GPS LOCATION PIN SECTION                              */}
          {/* ========================================================= */}
          <div className="bg-white rounded-2xl p-4 border-2 border-zinc-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-black uppercase tracking-wider text-zinc-900">
                  Step 1: Your Delivery Location
                </span>
              </div>

              {liveLocation && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live GPS Pinned
                </span>
              )}
            </div>

            {/* GPS Detection Action Button */}
            {!liveLocation ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pak-yellow via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-pak-yellow text-pak-black font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer min-h-[44px]"
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-pak-black" />
                      <span>Detecting your exact GPS location in Antique...</span>
                    </>
                  ) : (
                    <>
                      <LocateFixed className="w-4 h-4 text-pak-black stroke-[2.4]" />
                      <span>📍 Turn On GPS / Pin My Exact Location</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-zinc-500 text-center">
                  Tapping will detect where you are in Antique and create a direct Google Maps pin link for your delivery rider!
                </p>
              </div>
            ) : (
              /* Live Pinned Location Active Card */
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 space-y-2.5 animate-fadeIn">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-black text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Live Location Pin Ready!
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-zinc-900 leading-snug">
                      {liveLocation.addressText}
                    </p>
                    <p className="text-[10px] text-zinc-600 font-mono">
                      Coordinates: {liveLocation.lat.toFixed(6)}, {liveLocation.lng.toFixed(6)} • ±{liveLocation.accuracy}m accurate
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isLocating}
                    title="Re-scan / Refresh GPS position"
                    className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLocating ? "animate-spin" : ""}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-emerald-200">
                  <a
                    href={liveLocation.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 hover:text-emerald-950 underline"
                  >
                    <span>Test Pinned Link on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Error Message if Permission Denied */}
            {locationError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{locationError}</span>
              </div>
            )}

            {/* Delivery Landmark / House Notes */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-zinc-700 block">
                {liveLocation
                  ? "House #, Landmark or Notes for Rider (Optional):"
                  : "Or type your Delivery Address / Landmark in Antique:"}
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Near green gate, beside pharmacy, Purok 3..."
                  value={liveLocation ? landmarkNotes : deliveryAddress}
                  onChange={(e) => {
                    if (liveLocation) {
                      setLandmarkNotes(e.target.value);
                    } else {
                      setDeliveryAddress(e.target.value);
                    }
                  }}
                  className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                />
              </div>

              {/* Quick Antique Landmarks Chips */}
              {!liveLocation && (
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="text-[10px] text-zinc-400 font-semibold mr-1">Quick picks:</span>
                  {POPULAR_ANTIQUE_LANDMARKS.map((landmark) => (
                    <button
                      key={landmark}
                      type="button"
                      onClick={() => setDeliveryAddress(landmark)}
                      className="text-[10px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded-md border border-zinc-200 cursor-pointer font-medium"
                    >
                      {landmark}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* STEP 2: LIVE MESSAGE PREVIEW FOR THE RIDER                */}
          {/* ========================================================= */}
          <div className="bg-white rounded-2xl p-4 border border-zinc-300 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                Step 2: Message to Send on Facebook
              </span>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-[11px] text-zinc-500 hover:text-zinc-800 flex items-center gap-1 cursor-pointer font-semibold"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="w-3 h-3" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />
                    <span>Show</span>
                  </>
                )}
              </button>
            </div>

            {showPreview && (
              <div className="space-y-2 animate-fadeIn">
                <div className="bg-zinc-900 text-zinc-200 rounded-xl p-3 font-mono text-[11px] leading-relaxed max-h-44 overflow-y-auto whitespace-pre-wrap select-all border border-zinc-800">
                  {currentPabiliMessage}
                </div>

                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-extrabold text-xs py-2.5 px-3 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                      <span className="text-emerald-800 font-black">
                        Copied with Live Location Pin!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-800" />
                      <span>Copy Pabili Order Details with Live Pin</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* STEP 3: CHOOSE DELIVERY RIDER ON FACEBOOK                 */}
          {/* ========================================================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-900 block">
                Step 3: Choose Rider to Open on Facebook:
              </label>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Auto-copies live pin
              </span>
            </div>

            {DELIVERY_PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm hover:shadow-md hover:border-pak-yellow transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
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

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleSelectRider(partner)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs py-2.5 px-4 rounded-xl shadow cursor-pointer transition-transform active:scale-95 min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4 fill-pak-black shrink-0" />
                    <span>Send Order on Facebook</span>
                    <ExternalLink className="w-3 h-3 text-zinc-800 ml-0.5 shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* How Delivery Works Card */}
          <div className="bg-zinc-100 rounded-2xl p-4 border border-zinc-200 text-xs text-zinc-600 space-y-1.5">
            <span className="font-black text-zinc-800 uppercase tracking-wider text-[11px] block">
              💡 How Live Location Pabili Works in Antique:
            </span>
            <ol className="list-decimal list-inside space-y-1 text-zinc-700">
              <li>Click <strong>&quot;Turn On GPS / Pin My Exact Location&quot;</strong> to get your exact Google Maps pin.</li>
              <li>Tap your chosen rider (Mr. Cartman, SUGO, or ErrandPro) to copy the pabili details and open Facebook Messenger.</li>
              <li>Paste the message into the chat—your rider gets the order list and direct Google Maps link to your door!</li>
            </ol>
            <p className="text-[10px] text-zinc-500 pt-1">
              *Delivery fee is paid directly to your chosen rider upon arrival.
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
