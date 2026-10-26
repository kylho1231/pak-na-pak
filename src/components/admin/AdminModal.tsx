"use client";

import React, { useState } from "react";
import {
  X,
  Lock,
  Unlock,
  RotateCcw,
  Check,
  Search,
  Sparkles,
  DollarSign,
  Layers,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminModal() {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    menuItems,
    updateMenuItem,
    toggleInStock,
    toggleBestSeller,
    resetAllDefaults,
  } = useAdmin();

  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [successToast, setSuccessToast] = useState("");

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pinInput);
    if (success) {
      setPinError(false);
      setPinInput("");
    } else {
      setPinError(true);
    }
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 2000);
  };

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl h-[88vh] bg-pak-cream rounded-3xl shadow-2xl flex flex-col border border-zinc-300 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-title"
      >
        {/* Header */}
        <div className="bg-pak-black text-white p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pak-yellow flex items-center justify-center text-pak-black">
              {isAdminLoggedIn ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 id="admin-title" className="font-display font-black text-lg text-white">
                Pak na Pak Store Admin / Menu Manager
              </h3>
              <p className="text-xs text-pak-yellow">
                Phase 2 Prototype: Edit prices, mark sold out & toggle best sellers
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
            aria-label="Close admin modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success toast */}
        {successToast && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center animate-fadeIn flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {!isAdminLoggedIn ? (
          /* Login Form */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-display font-black text-xl text-pak-black">
              Manager Passcode Required
            </h4>
            <p className="text-xs text-zinc-600 mt-1 mb-5">
              Enter manager passcode to access menu editing. (Demo PIN: <strong className="text-pak-black">pak</strong> or <strong className="text-pak-black">1234</strong>)
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <input
                type="password"
                placeholder="Enter PIN (e.g. pak or 1234)"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={`w-full text-center text-sm py-2.5 px-4 rounded-xl border ${
                  pinError ? "border-rose-500 bg-rose-50" : "border-zinc-300 bg-white"
                } focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900 font-bold`}
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-semibold">
                  Invalid passcode. Hint: Use &apos;pak&apos; or &apos;1234&apos;
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-sm py-2.5 rounded-xl shadow cursor-pointer transition-colors"
              >
                Unlock Menu Editor
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Editor */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar with Search & Reset */}
            <div className="p-3 sm:p-4 bg-white border-b border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search item to edit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-pak-yellow"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => {
                    resetAllDefaults();
                    showToast("Restored all items to original defaults");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-2 rounded-xl cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={logoutAdmin}
                  className="text-xs font-bold text-rose-600 hover:underline px-2 py-1 cursor-pointer"
                >
                  Lock
                </button>
              </div>
            </div>

            {/* Menu Items Table */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="text-xs text-zinc-500 font-semibold mb-1 flex items-center justify-between">
                <span>Total Items: {filteredItems.length}</span>
                <span>Changes save directly to live site</span>
              </div>

              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-3 sm:p-4 border transition-all ${
                    !item.inStock
                      ? "opacity-60 border-zinc-200 bg-zinc-50"
                      : "border-zinc-200 shadow-xs"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-extrabold text-sm text-pak-black">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        {item.isBestSeller && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                            ★ Best Seller
                          </span>
                        )}
                        {!item.inStock && (
                          <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">
                            SOLD OUT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 truncate max-w-md mt-0.5">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and Toggles */}
                    <div className="flex items-center gap-3 shrink-0">
                      {/* Price Editor */}
                      <div className="flex items-center gap-1 bg-zinc-100 rounded-xl px-2.5 py-1 border border-zinc-200">
                        <span className="text-xs font-black text-zinc-500">₱</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            updateMenuItem(item.id, { price: val });
                          }}
                          className="w-14 text-xs font-black text-zinc-900 bg-transparent focus:outline-none"
                        />
                      </div>

                      {/* Best Seller Toggle */}
                      <button
                        type="button"
                        onClick={() => {
                          toggleBestSeller(item.id);
                          showToast(`Updated Best Seller tag for ${item.name}`);
                        }}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                          item.isBestSeller
                            ? "bg-amber-400 text-pak-black border-amber-400"
                            : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                        }`}
                        title="Toggle Best Seller"
                      >
                        ★ Best
                      </button>

                      {/* Stock Toggle */}
                      <button
                        type="button"
                        onClick={() => {
                          toggleInStock(item.id);
                          showToast(
                            `${item.name} marked as ${
                              item.inStock ? "Sold Out" : "In Stock"
                            }`
                          );
                        }}
                        className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                          item.inStock
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : "bg-rose-100 text-rose-800 border-rose-300"
                        }`}
                      >
                        {item.inStock ? "In Stock" : "Sold Out"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
