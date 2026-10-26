"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  Check,
  Send,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { STORE_INFO } from "@/data/storeData";

export default function LocationSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    partySize: "4",
    date: "",
    time: "18:00",
    diningType: "samgyupsal",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#FFC700", "#111111", "#F59E0B"],
      });
    } catch {
      // Ignore
    }

    setIsSubmitted(true);

    // Prepare Messenger Inquiry link
    const msg = `👋 Hello Pak na Pak Antique! Mag-iinquire po sana ako for table reservation:
👤 Name: ${formData.fullName}
📱 Contact: ${formData.phone}
👥 Party Size: ${formData.partySize} pax
📅 Date & Time: ${formData.date} at ${formData.time}
🍽️ Dining Preference: ${
      formData.diningType === "samgyupsal"
        ? "Unlimited Samgyupsal Grill"
        : formData.diningType === "unlimited"
        ? "Unlimited Chicken & Rice Feast"
        : "Ala Carte / Barkada Salo-Salo"
    }
📝 Notes/Occasion: ${formData.notes || "None"}

Looking forward to your confirmation po!`;

    const encoded = encodeURIComponent(msg);
    setTimeout(() => {
      window.open(`${STORE_INFO.messengerUrl}?text=${encoded}`, "_blank");
    }, 1200);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-pak-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/70 px-3.5 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-amber-800" />
            Visit or Contact Us
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-pak-black tracking-tight">
            Find Us in San Jose, Antique
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Conveniently located in San Jose de Buenavista. Dine-in with friends, grab take-out on your way home, or book a table ahead!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Store Info & Map (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Info Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200 shadow-md space-y-5">
              <h3 className="font-display font-black text-xl text-pak-black border-b border-zinc-100 pb-3">
                Store Details & Operating Hours
              </h3>

              <div className="space-y-4 text-sm text-zinc-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-black text-pak-black block">
                      Address:
                    </span>
                    <span className="text-zinc-800">{STORE_INFO.fullAddress}</span>
                    <span className="block text-xs text-zinc-500 mt-0.5">
                      {STORE_INFO.landmark}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-black text-pak-black block">
                      Business Hours:
                    </span>
                    <span className="text-zinc-800">{STORE_INFO.operatingDays}</span>
                    <span className="block text-xs text-zinc-500 font-semibold">
                      Kitchen & Counter: {STORE_INFO.openingHours}
                    </span>
                    <span className="block text-xs text-amber-700 font-bold">
                      Dine-in & Samgyupsal: {STORE_INFO.samgyupHours}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-black text-pak-black block">
                      Hotline & Orders:
                    </span>
                    <a
                      href={`tel:${STORE_INFO.contactNumber}`}
                      className="text-amber-700 font-extrabold hover:underline block"
                    >
                      {STORE_INFO.contactNumber}
                    </a>
                    <span className="text-xs text-zinc-500">
                      Available for calls and SMS delivery inquiries
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={STORE_INFO.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow cursor-pointer transition-transform active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-pak-black" />
                  <span>Chat on Facebook Messenger</span>
                </a>
                <a
                  href={`tel:${STORE_INFO.contactNumber}`}
                  className="inline-flex items-center justify-center gap-2 bg-pak-black hover:bg-zinc-800 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-pak-yellow" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-md aspect-[16/10] relative">
              <iframe
                title="Pak na Pak San Jose Antique Location"
                src={STORE_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-zinc-200 shadow text-[11px] font-bold text-zinc-800 flex items-center gap-1.5 pointer-events-none">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>San Jose de Buenavista, Antique</span>
              </div>
            </div>
          </div>

          {/* Table Reservation & Inquiry Form (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-lg space-y-6">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full mb-1.5">
                <Sparkles className="w-3 h-3" />
                Table & Event Bookings
              </span>
              <h3 className="font-display font-black text-2xl text-pak-black">
                Table Reservation / Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Celebrating a birthday, barkada reunion, or family dinner? Send an advance inquiry and our team in San Jose, Antique will confirm your table!
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-display font-black text-lg text-emerald-900">
                  Inquiry Sent Successfully!
                </h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Opening Facebook Messenger to confirm with Pak na Pak staff. Thank you, {formData.fullName}!
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-bold text-emerald-800 underline cursor-pointer pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Juan dela Cruz"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 block">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0917-xxx-xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 block">
                      Party Size
                    </label>
                    <select
                      value={formData.partySize}
                      onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900 font-medium"
                    >
                      <option value="2">2 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="6">6 Persons</option>
                      <option value="8">8 Persons</option>
                      <option value="10">10+ Persons (Barkada)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 block">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 block">
                      Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 block">
                    Dining Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "samgyupsal", label: "🥩 Samgyupsal" },
                      { id: "unlimited", label: "🍗 Unli Chicken" },
                      { id: "alacarte", label: "🍛 ₱99 Meals" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, diningType: t.id })}
                        className={`py-2 px-2 rounded-xl text-xs font-bold text-center border cursor-pointer transition-colors ${
                          formData.diningType === t.id
                            ? "bg-pak-yellow text-pak-black border-pak-yellow font-extrabold shadow-xs"
                            : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 block">
                    Special Requests / Celebration Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Birthday celebration, please prepare high chair, or request corner table..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-pak-black hover:bg-zinc-800 text-white hover:text-pak-yellow font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-pak-yellow" />
                  <span>Send Reservation Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
