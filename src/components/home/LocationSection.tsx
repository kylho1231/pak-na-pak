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
  Star,
  ThumbsUp,
  ExternalLink,
  Navigation,
  MessageSquare,
  Share2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { STORE_BRANCHES, STORE_INFO } from "@/data/storeData";
import { BranchInfo } from "@/types";

interface CustomerReview {
  id: string;
  branchId: "san-jose" | "sibalom";
  name: string;
  rating: number; // 1 to 10
  tags: string[];
  comment: string;
  date: string;
}

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    branchId: "san-jose",
    name: "Althea M. (San Jose)",
    rating: 10,
    tags: ["🍗 Crispy Fried Chicken", "⭐ Super Sulit ₱99"],
    comment: "Ang sarap ng Garlic Parm at Carbonara! Best ₱99 combo sa San Jose Antique.",
    date: "Yesterday",
  },
  {
    id: "rev-2",
    branchId: "san-jose",
    name: "Mark & Barkada",
    rating: 10,
    tags: ["🥩 Best Unli Samgyup", "😊 Friendly Staff"],
    comment: "Super enjoy sa unli samgyup with cheese dip and soju! Sulit sobra ang Set B.",
    date: "2 days ago",
  },
  {
    id: "rev-3",
    branchId: "sibalom",
    name: "Rhea Mae C.",
    rating: 10,
    tags: ["🍳 Siomai Chao Fan", "🛵 Fast Rider Delivery"],
    comment: "Sobrang saya may Pak na Pak na dito sa Sibalom! Mainit pa ang deliver ng rider.",
    date: "3 days ago",
  },
];

const COMPLIMENT_TAGS = [
  "🍗 Crispy Fried Chicken",
  "🥩 Best Unli Samgyup",
  "🍝 Rich Pasta Carbonara",
  "🍳 Siomai Chao Fan",
  "🔥 Sizzling Sisig",
  "🛵 Fast Rider Delivery",
  "⭐ Super Sulit ₱99",
  "😊 Friendly Staff",
];

export default function LocationSection() {
  const [selectedBranchId, setSelectedBranchId] = useState<"san-jose" | "sibalom">("san-jose");
  const [activeTab, setActiveTab] = useState<"rate" | "reserve">("rate");

  const currentBranch: BranchInfo =
    STORE_BRANCHES.find((b) => b.id === selectedBranchId) || STORE_BRANCHES[0];

  // 1-10 Rating Form State
  const [score, setScore] = useState<number>(10);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "🍗 Crispy Fried Chicken",
    "⭐ Super Sulit ₱99",
  ]);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  // Table Reservation Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    partySize: "4",
    date: "",
    time: "18:00",
    diningType: "samgyupsal",
    notes: "",
  });
  const [isReserveSubmitted, setIsReserveSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getScoreLabel = (val: number) => {
    if (val === 10) return "🔥 10/10 — Pak na Pak sa Sarap! (Super Sulit)";
    if (val === 9) return "⭐ 9/10 — Namit Guid! Highly Recommended";
    if (val === 8) return "👍 8/10 — Busog & Very Satisfied";
    if (val === 7) return "👌 7/10 — Good Food & Great Value";
    if (val === 6) return "🙂 6/10 — Satisfactory Experience";
    if (val === 5) return "😐 5/10 — Average";
    return "⚠️ 1-4/10 — Needs Improvement";
  };

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim()) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFC700", "#111111", "#F59E0B"],
      });
    } catch {
      // Ignore
    }

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      branchId: selectedBranchId,
      name: reviewerName.trim(),
      rating: score,
      tags: selectedTags,
      comment: reviewComment.trim(),
      date: "Just now",
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsRatingSubmitted(true);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FFC700", "#111111", "#10B981"],
      });
    } catch {
      // Ignore
    }

    setIsReserveSubmitted(true);

    const msg = `👋 Hello Pak na Pak ${currentBranch.name}! Mag-iinquire po sana ako for table reservation:
📍 Branch: ${currentBranch.name}
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
📝 Notes: ${formData.notes || "None"}`;

    setTimeout(() => {
      window.open(`${currentBranch.messengerUrl}?text=${encodeURIComponent(msg)}`, "_blank");
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-pak-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/70 px-3.5 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-amber-800" />
            Official Store Branches & Reviews
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-pak-black tracking-tight">
            Visit, Follow & Rate Us
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Proudly serving Antique in two accessible locations: <strong>San Jose de Buenavista</strong> & <strong>Sibalom</strong>.
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex justify-center mb-8 px-2">
          <div className="inline-flex w-full sm:w-auto bg-zinc-200/80 p-1.5 rounded-2xl gap-2 shadow-inner">
            {STORE_BRANCHES.map((branch) => {
              const isSelected = selectedBranchId === branch.id;
              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => {
                    setSelectedBranchId(branch.id);
                    setIsRatingSubmitted(false);
                  }}
                  className={`flex-1 sm:flex-initial py-3 px-3 sm:px-7 rounded-xl font-display font-black text-xs sm:text-sm transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap min-h-[44px] ${
                    isSelected
                      ? "bg-pak-black text-white shadow-md scale-[1.02]"
                      : "text-zinc-700 hover:text-black hover:bg-zinc-300/60"
                  }`}
                >
                  <MapPin
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? "text-pak-yellow" : "text-zinc-500"
                    }`}
                  />
                  <span>{branch.town}</span>
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-black shrink-0 ${
                      isSelected
                        ? "bg-pak-yellow text-pak-black"
                        : "bg-zinc-300 text-zinc-700"
                    }`}
                  >
                    {branch.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Store Details / Map (Left) + Rate / Reserve Tabs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Branch Details & Google Map with Pin (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Branch Details Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-zinc-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {currentBranch.badge}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-pak-black leading-tight">
                    {currentBranch.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {currentBranch.tagline}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    Coordinates Pin
                  </span>
                  <span className="font-mono text-xs font-bold text-zinc-800 bg-zinc-100 px-2 py-1 rounded-md inline-block sm:block">
                    {currentBranch.coordinates.str}
                  </span>
                </div>
              </div>

              {/* Info Rows */}
              <div className="space-y-3.5 text-sm text-zinc-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-black text-pak-black block text-xs">
                      Exact Address:
                    </span>
                    <span className="text-zinc-800 text-xs sm:text-sm font-semibold">
                      {currentBranch.fullAddress}
                    </span>
                    <span className="block text-xs text-zinc-500 mt-0.5">
                      {currentBranch.landmark}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-black text-pak-black block text-xs">
                      Store Hours:
                    </span>
                    <span className="text-zinc-800 text-xs sm:text-sm font-semibold">
                      {currentBranch.operatingDays} • {currentBranch.openingHours}
                    </span>
                    <span className="block text-xs text-amber-700 font-bold mt-0.5">
                      Dine-in & Samgyupsal: {currentBranch.samgyupHours}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-black text-pak-black block text-xs">
                      Contact Hotline:
                    </span>
                    <a
                      href={`tel:${currentBranch.contactNumber}`}
                      className="text-amber-700 font-extrabold text-sm hover:underline"
                    >
                      {currentBranch.contactNumber}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Follow Facebook & Rate on Google Maps */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={currentBranch.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow cursor-pointer transition-transform active:scale-98"
                >
                  <ThumbsUp className="w-4 h-4 fill-white" />
                  <span>Follow on Facebook</span>
                </a>

                <a
                  href={currentBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs py-3 px-4 rounded-xl shadow cursor-pointer transition-transform active:scale-98"
                >
                  <Star className="w-4 h-4 fill-pak-black text-pak-black" />
                  <span>Rate on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map with Exact Pin Marker */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-md aspect-[16/10] relative">
              <iframe
                key={currentBranch.googleMapsEmbedUrl}
                title={`${currentBranch.name} Google Map Location`}
                src={currentBranch.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Pin Coordinates Pill */}
              <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-700 text-[11px] font-bold text-white flex items-center gap-2 shadow">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>
                  Pinned: {currentBranch.town} ({currentBranch.coordinates.str})
                </span>
              </div>

              {/* Open in Google Maps External Trigger */}
              <a
                href={currentBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-zinc-900 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg border border-zinc-200 flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 1-10 Rating & Reservation Tabs (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-lg space-y-6">
            {/* Top Mode Switcher: Rate 1-10 vs Reservation */}
            <div className="flex bg-zinc-100 p-1.5 rounded-2xl gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("rate")}
                className={`flex-1 py-2.5 px-3 rounded-xl font-display font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  activeTab === "rate"
                    ? "bg-pak-black text-white shadow-sm"
                    : "text-zinc-600 hover:text-black hover:bg-zinc-200/60"
                }`}
              >
                <Star className="w-4 h-4 fill-pak-yellow text-pak-yellow" />
                <span>Rate Us (1 - 10)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("reserve")}
                className={`flex-1 py-2.5 px-3 rounded-xl font-display font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  activeTab === "reserve"
                    ? "bg-pak-black text-white shadow-sm"
                    : "text-zinc-600 hover:text-black hover:bg-zinc-200/60"
                }`}
              >
                <Calendar className="w-4 h-4 text-pak-yellow" />
                <span>Book a Table</span>
              </button>
            </div>

            {/* TAB 1: RATE THE RESTAURANT (1 - 10) */}
            {activeTab === "rate" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Customer Feedback & Reviews
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-pak-black leading-tight">
                    How was your Pak na Pak experience?
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Rate <strong>{currentBranch.name}</strong> on a scale of 1 to 10. We love hearing from our Antiqueño barkadas!
                  </p>
                </div>

                {isRatingSubmitted ? (
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 text-center space-y-4 animate-scale-up">
                    <div className="w-14 h-14 rounded-full bg-pak-yellow text-pak-black flex items-center justify-center mx-auto shadow font-display font-black text-2xl">
                      {score}
                    </div>

                    <div>
                      <h4 className="font-display font-black text-lg text-zinc-900">
                        Maraming Salamat, {reviewerName}!
                      </h4>
                      <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
                        Your {score}/10 rating for <strong>{currentBranch.name}</strong> has been received!
                      </p>
                    </div>

                    {/* Follow Up CTAs */}
                    <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-3">
                      <p className="text-xs font-bold text-zinc-800">
                        ⭐ Help more people find us in Antique! Please drop your 5-star rating on Google Maps and follow our Facebook page:
                      </p>

                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <a
                          href={currentBranch.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-black text-xs py-2.5 px-3 rounded-xl shadow cursor-pointer"
                        >
                          <Star className="w-4 h-4 fill-pak-black" />
                          <span>Post on Google Maps</span>
                        </a>

                        <a
                          href={currentBranch.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-black text-xs py-2.5 px-3 rounded-xl shadow cursor-pointer"
                        >
                          <ThumbsUp className="w-4 h-4 fill-white" />
                          <span>Follow FB Page</span>
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsRatingSubmitted(false);
                        setReviewComment("");
                      }}
                      className="text-xs font-bold text-zinc-600 underline cursor-pointer"
                    >
                      Rate another order or branch
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRateSubmit} className="space-y-5">
                    {/* 1 to 10 Interactive Rating Selector */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black uppercase tracking-wider text-zinc-800">
                          Select Your Score (1 to 10):
                        </label>
                        <span className="font-display font-black text-lg text-amber-700">
                          {score} / 10
                        </span>
                      </div>

                      {/* 10 Rating Buttons */}
                      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-1.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                          const isActive = score === num;
                          return (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setScore(num)}
                              className={`min-h-[44px] py-2.5 sm:py-3 rounded-xl font-display font-black text-sm flex items-center justify-center cursor-pointer transition-all ${
                                isActive
                                  ? "bg-pak-yellow text-pak-black ring-2 ring-black scale-105 shadow-md font-black"
                                  : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 active:scale-95"
                              }`}
                              aria-label={`Rate ${num} out of 10`}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>

                      <div className="bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold text-center">
                        {getScoreLabel(score)}
                      </div>
                    </div>

                    {/* Compliment Tags */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-zinc-800 block">
                        What did you enjoy the most?
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {COMPLIMENT_TAGS.map((tag) => {
                          const isTagSelected = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold ${
                                isTagSelected
                                  ? "bg-pak-yellow text-pak-black border-pak-yellow shadow-2xs font-extrabold"
                                  : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200"
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Reviewer Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-700 block">
                        Your Name / Barkada Nickname *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kuya Kevin (San Jose)"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                      />
                    </div>

                    {/* Feedback Comment */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-700 block">
                        Comments or Message to the Chef / Crew (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us what you liked, your favorite chicken glaze flavor, or how we can improve..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-pak-black hover:bg-zinc-800 text-pak-yellow font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01]"
                    >
                      <Star className="w-4 h-4 fill-pak-yellow" />
                      <span>Submit {score}/10 Rating</span>
                    </button>
                  </form>
                )}

                {/* Recent Ratings Stream */}
                <div className="pt-2 border-t border-zinc-100 space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 block">
                    Recent Customer Ratings:
                  </span>
                  <div className="space-y-2">
                    {reviewsList.slice(0, 3).map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-display font-black text-zinc-900">
                            {rev.name}
                          </span>
                          <span className="bg-pak-yellow text-pak-black font-black text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Star className="w-3 h-3 fill-pak-black text-pak-black" />
                            {rev.rating}/10
                          </span>
                        </div>
                        {rev.comment && (
                          <p className="text-xs text-zinc-600 leading-snug">
                            "{rev.comment}"
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {rev.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-white text-zinc-600 px-2 py-0.5 rounded border border-zinc-200 font-semibold"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TABLE RESERVATION FORM */}
            {activeTab === "reserve" && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full mb-1">
                    <Sparkles className="w-3 h-3" />
                    Advance Bookings
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-pak-black leading-tight">
                    Reserve a Table at {currentBranch.town}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Celebrating a birthday, barkada reunion, or family dinner? Send an advance inquiry and our crew will confirm your table!
                  </p>
                </div>

                {isReserveSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h4 className="font-display font-black text-lg text-emerald-900">
                      Inquiry Sent to {currentBranch.town}!
                    </h4>
                    <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                      Opening Messenger to confirm with {currentBranch.name}. Thank you, {formData.fullName}!
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsReserveSubmitted(false)}
                      className="text-xs font-bold text-emerald-800 underline cursor-pointer pt-2"
                    >
                      Send another reservation
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleReserveSubmit} className="space-y-4">
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
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pak-yellow text-zinc-900"
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
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pak-yellow text-zinc-900"
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
                          className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pak-yellow text-zinc-900 font-medium"
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
                          className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pak-yellow text-zinc-900"
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
                          className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pak-yellow text-zinc-900"
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
                                ? "bg-pak-yellow text-pak-black border-pak-yellow font-extrabold shadow-2xs"
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
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-pak-black hover:bg-zinc-800 text-pak-yellow font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-pak-yellow" />
                      <span>Send Reservation to {currentBranch.town}</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
