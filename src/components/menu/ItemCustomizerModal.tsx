"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, Check, Flame, Bike, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CHICKEN_FLAVORS_LIST } from "@/data/storeData";
import { ChickenFlavorName } from "@/types";

export default function ItemCustomizerModal() {
  const { customizingItem, closeCustomizer, addToCart, openDeliveryModal } = useCart();

  const [selectedFlavor, setSelectedFlavor] = useState<ChickenFlavorName>("Garlic Parmesan");
  const [selectedPasta, setSelectedPasta] = useState<"Spaghetti" | "Carbonara">("Spaghetti");
  const [selectedSauce, setSelectedSauce] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (customizingItem) {
      setSelectedFlavor("Garlic Parmesan");
      setSelectedPasta("Spaghetti");
      if (customizingItem.sauceOptions && customizingItem.sauceOptions.length > 0) {
        setSelectedSauce(customizingItem.sauceOptions[0]);
      } else {
        setSelectedSauce("");
      }
      setInstructions("");
      setQuantity(1);
    }
  }, [customizingItem]);

  if (!customizingItem) return null;

  const handleOrderViaRider = () => {
    const details = [
      customizingItem.hasFlavorSelection ? selectedFlavor : undefined,
      customizingItem.hasPastaSelection ? selectedPasta : undefined,
      customizingItem.sauceOptions ? selectedSauce : undefined,
      instructions.trim() ? `Note: ${instructions.trim()}` : undefined,
    ]
      .filter(Boolean)
      .join(", ");

    openDeliveryModal({
      items: [
        {
          name: customizingItem.name,
          details,
          price: customizingItem.price,
          quantity,
        },
      ],
      total: customizingItem.price * quantity,
    });
    closeCustomizer();
  };

  const handleAdd = () => {
    addToCart(customizingItem, {
      flavor: customizingItem.hasFlavorSelection ? selectedFlavor : undefined,
      pasta: customizingItem.hasPastaSelection ? selectedPasta : undefined,
      sauce: customizingItem.sauceOptions ? selectedSauce : undefined,
      instructions: instructions.trim() ? instructions.trim() : undefined,
      quantity,
    });
    closeCustomizer();
  };

  const totalPrice = customizingItem.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-pak-cream rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-item-title"
      >
        {/* Header with image */}
        <div className="relative h-44 sm:h-52 w-full bg-pak-black shrink-0">
          <Image
            src={customizingItem.image}
            alt={customizingItem.name}
            fill
            className="object-cover opacity-85"
            sizes="(max-width: 640px) 100vw, 500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pak-cream via-transparent to-black/40" />

          {/* Close button */}
          <button
            onClick={closeCustomizer}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          {customizingItem.badge && (
            <span className="absolute top-3 left-3 bg-pak-yellow text-pak-black font-extrabold text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {customizingItem.badge}
            </span>
          )}

          {/* Bottom Title bar */}
          <div className="absolute bottom-2 left-4 right-4 flex items-end justify-between">
            <div>
              <h3
                id="modal-item-title"
                className="font-display font-black text-2xl text-pak-black leading-tight"
              >
                {customizingItem.name}
              </h3>
              {customizingItem.portion && (
                <span className="text-xs font-semibold text-zinc-600 block">
                  {customizingItem.portion}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="font-display font-black text-2xl sm:text-3xl text-pak-black">
                ₱{customizingItem.price}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            {customizingItem.description}
          </p>

          {/* Chicken Glaze Flavor Selector */}
          {customizingItem.hasFlavorSelection && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-pak-black flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Select Chicken Glaze Flavor (Required)
                </label>
                <span className="text-[11px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                  12 Flavors
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 bg-white rounded-2xl border border-zinc-200">
                {CHICKEN_FLAVORS_LIST.map((flavor) => {
                  const isSelected = selectedFlavor === flavor.name;
                  return (
                    <button
                      type="button"
                      key={flavor.id}
                      onClick={() => setSelectedFlavor(flavor.name)}
                      className={`flex items-start justify-between p-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer border ${
                        isSelected
                          ? "bg-amber-50 border-pak-yellow ring-2 ring-pak-yellow/50 text-pak-black"
                          : "bg-zinc-50/70 border-zinc-200 hover:bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      <div className="pr-1">
                        <span className="font-bold text-xs block leading-snug">
                          {flavor.name}
                        </span>
                        {flavor.isPopular && (
                          <span className="text-[9px] text-amber-600 font-bold uppercase tracking-tight">
                            ★ Popular
                          </span>
                        )}
                        {flavor.isSpicy && (
                          <span className="text-[9px] text-rose-600 font-bold uppercase tracking-tight">
                            🌶 Spicy
                          </span>
                        )}
                        {flavor.isNew && (
                          <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-tight">
                            NEW
                          </span>
                        )}
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? "border-pak-yellow bg-pak-yellow text-pak-black"
                            : "border-zinc-300"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pasta Flavor Selector */}
          {customizingItem.hasPastaSelection && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-pak-black block">
                Choose Pasta Flavor
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["Spaghetti", "Carbonara"] as const).map((pasta) => (
                  <button
                    type="button"
                    key={pasta}
                    onClick={() => setSelectedPasta(pasta)}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs text-center border transition-all cursor-pointer ${
                      selectedPasta === pasta
                        ? "bg-pak-black text-white border-pak-black shadow-md"
                        : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100"
                    }`}
                  >
                    {pasta === "Spaghetti" ? "🍝 Sweet Spaghetti" : "🧀 Creamy Carbonara"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sauce Options */}
          {customizingItem.sauceOptions && customizingItem.sauceOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-pak-black block">
                Select Sauce Dip / Drizzle
              </label>
              <div className="grid grid-cols-2 gap-2">
                {customizingItem.sauceOptions.map((sauce) => (
                  <button
                    type="button"
                    key={sauce}
                    onClick={() => setSelectedSauce(sauce)}
                    className={`py-2 px-3 rounded-xl font-bold text-xs text-center border transition-all cursor-pointer ${
                      selectedSauce === sauce
                        ? "bg-pak-yellow text-pak-black border-pak-yellow shadow-sm font-extrabold"
                        : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100"
                    }`}
                  >
                    {sauce}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Requests */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 block">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra sauce on the side, well done..."
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-800"
              maxLength={120}
            />
          </div>
        </div>

        {/* Footer with Quantity & Add to Cart button */}
        <div className="p-4 sm:p-5 bg-white border-t border-zinc-200 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-zinc-100 border border-zinc-200 rounded-xl px-2 py-1.5">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-1.5 rounded-lg hover:bg-zinc-200 disabled:opacity-30 cursor-pointer text-zinc-800"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-display font-black text-sm text-zinc-900 w-5 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1.5 rounded-lg hover:bg-zinc-200 cursor-pointer text-zinc-800"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Actions */}
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-2">
            <button
              type="button"
              onClick={handleOrderViaRider}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer"
            >
              <Bike className="w-4 h-4 stroke-[2.3]" />
              <span>Order via Delivery Rider • ₱{totalPrice}</span>
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="w-full sm:w-auto text-[11px] font-bold text-zinc-600 hover:text-black hover:bg-zinc-100 py-2 sm:py-3 px-3 rounded-xl border border-zinc-200 transition-colors cursor-pointer"
              title="Add to multi-item pabili list"
            >
              + Add to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
