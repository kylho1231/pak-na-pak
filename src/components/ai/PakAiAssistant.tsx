"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Sparkles,
  Bot,
  Send,
  X,
  Bike,
  Flame,
  CheckCircle2,
  RefreshCw,
  MessageCircle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { AiRecommendationResult, AiRecommendedMeal } from "@/types";
import { useCart } from "@/context/CartContext";

const QUICK_PROMPTS = [
  { label: "⚡ Sulit ₱100 Solo Meal", query: "Anong pinakasulit na solo lunch meal under ₱100?", budget: 100, pax: 1 },
  { label: "🥩 Unli Samgyup & Soju for 2", query: "Magkano unli samgyupsal with melted cheese and Jinro Soju for 2 pax?", budget: 800, pax: 2 },
  { label: "🍗 Barkada 20pcs Chicken Feast", query: "Barkada combo with 20 pcs chicken bundle and family pasta", budget: 900, pax: 5 },
  { label: "🍳 Chao Fan & Sizzling Sisig", query: "Gusto ko ng combination ng Fried Chicken Chao Fan at Sizzling Sisig", budget: 350, pax: 2 },
];

export default function PakAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiRecommendationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { openDeliveryModal } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on ESC key (modern web accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleAsk = async (customQuery?: string, budget?: number, pax?: number) => {
    const textToAsk = (customQuery || query).trim();
    if (!textToAsk) return;

    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const res = await fetch("/api/v1/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: textToAsk,
          budget: budget || undefined,
          pax: pax || undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setErrorMsg(data.error?.message || "Failed to generate recommendation. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDispatchMeals = (res: AiRecommendationResult) => {
    openDeliveryModal({
      items: res.recommendedMeals.map((m) => ({
        name: m.name,
        price: m.price,
        quantity: m.quantity,
        details: m.portion || m.flavor,
      })),
      total: res.totalPrice,
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Pak AI Food Assistant"
        className="fixed bottom-24 right-5 sm:bottom-28 sm:right-6 z-40 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold px-4 py-3 rounded-full shadow-2xl border-2 border-black flex items-center gap-2.5 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-black"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-pak-black stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black animate-pulse" />
        </div>
        <span className="font-display font-black text-xs sm:text-sm tracking-tight hidden sm:inline">
          Ask Pak AI Matcher
        </span>
        <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
          Gemini
        </span>
      </button>

      {/* Accessible Dialog Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pak-ai-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border-2 border-zinc-900 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-pak-yellow px-5 py-4 border-b-2 border-pak-black flex items-center justify-between text-pak-black">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-black text-pak-yellow flex items-center justify-center font-black shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="pak-ai-title" className="font-display font-black text-base sm:text-lg text-pak-black leading-tight flex items-center gap-1.5">
                    <span>Pak AI Food Matcher</span>
                    <span className="bg-black text-white text-[9px] uppercase font-black px-1.5 py-0.2 rounded">
                      Gemini 3.8
                    </span>
                  </h3>
                  <p className="text-[11px] font-bold text-zinc-800">
                    Smart meal & budget recommendations for San Jose, Antique
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Assistant"
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-pak-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-zinc-50">
              {/* Quick Prompt Chips */}
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 block mb-2">
                  Popular Antique Craving Shortcuts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      disabled={isLoading}
                      onClick={() => {
                        setQuery(prompt.query);
                        handleAsk(prompt.query, prompt.budget, prompt.pax);
                      }}
                      className="text-xs bg-white hover:bg-pak-yellow hover:text-pak-black text-zinc-800 font-bold px-3 py-1.5 rounded-xl border border-zinc-200 shadow-2xs transition-all duration-150 cursor-pointer disabled:opacity-50 text-left"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAsk();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="E.g. Masarap na dinner for 3 pax under ₱500 with chicken..."
                    className="w-full bg-white text-zinc-900 placeholder:text-zinc-400 text-xs sm:text-sm font-medium px-4 py-3 rounded-2xl border-2 border-zinc-300 focus:border-black focus:outline-hidden transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="bg-black hover:bg-zinc-800 text-white font-extrabold px-4 sm:px-5 py-3 rounded-2xl flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer disabled:opacity-40 transition-transform active:scale-95 shrink-0"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-pak-yellow" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-pak-yellow" />
                      <span className="hidden sm:inline">Match Me</span>
                    </>
                  )}
                </button>
              </form>

              {/* Loading State */}
              {isLoading && (
                <div className="bg-white rounded-2xl p-6 border border-zinc-200 text-center space-y-3 shadow-xs">
                  <div className="inline-flex p-3 rounded-2xl bg-amber-50 border border-amber-200 animate-bounce">
                    <Sparkles className="w-6 h-6 text-amber-600 fill-amber-500" />
                  </div>
                  <h4 className="font-display font-black text-zinc-900 text-sm sm:text-base">
                    Pak AI is cooking up the best sulit combo...
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Matching authentic recipes, side dishes, sauces, and local delivery couriers in San Jose Antique.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="bg-red-50 text-red-900 border border-red-200 p-4 rounded-2xl text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              {/* AI Recommendation Result Card */}
              {result && (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-zinc-900 shadow-xl space-y-5 animate-scale-up">
                  {/* Headline & Summary */}
                  <div className="border-b border-zinc-100 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {result.tagline}
                    </span>
                    <h4 className="font-display font-black text-lg sm:text-xl text-zinc-900 leading-tight">
                      {result.headline}
                    </h4>
                    <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                      {result.summary}
                    </p>
                  </div>

                  {/* Meals List */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-black uppercase tracking-wider text-zinc-700 block">
                      Recommended Dishes:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.recommendedMeals.map((meal) => (
                        <div
                          key={meal.id}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200"
                        >
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-zinc-300 bg-zinc-200">
                            <Image
                              src={meal.image}
                              alt={meal.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="font-display font-black text-xs text-zinc-900 truncate">
                              {meal.name}
                            </h5>
                            <span className="text-[11px] text-zinc-500 font-semibold block truncate">
                              {meal.portion || meal.flavor || `Qty: ${meal.quantity}`}
                            </span>
                            <span className="font-black text-xs text-amber-700">
                              ₱{meal.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Savings Breakdown */}
                  <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                        Calculated Combo Total
                      </span>
                      <span className="font-display font-black text-2xl text-zinc-900">
                        ₱{result.totalPrice}
                      </span>
                      {result.savingsNote && (
                        <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                          ✓ {result.savingsNote}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleDispatchMeals(result)}
                        className="bg-black hover:bg-zinc-800 text-pak-yellow font-extrabold text-xs px-4 py-2.5 rounded-xl shadow cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Bike className="w-4 h-4 text-pak-yellow" />
                        <span>Order via Courier</span>
                      </button>

                      {result.recommendedCourier?.url && (
                        <a
                          href={result.recommendedCourier.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 font-extrabold text-xs px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1"
                        >
                          <span>{result.recommendedCourier.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Courier Delivery Advice */}
                  {result.recommendedCourier?.tip && (
                    <div className="flex items-start gap-2 text-[11px] text-zinc-500 bg-zinc-100 p-2.5 rounded-xl">
                      <Bike className="w-4 h-4 text-zinc-700 shrink-0 mt-0.5" />
                      <span>{result.recommendedCourier.tip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
