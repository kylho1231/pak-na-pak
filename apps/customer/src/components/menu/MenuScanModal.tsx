"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, FileText, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MENU_SCAN_PAGES } from "@/data/storeData";

export default function MenuScanModal() {
  const { isScanModalOpen, closeScanModal, selectedScanIndex, setSelectedScanIndex } = useCart();
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isScanModalOpen) return null;

  const currentScan = MENU_SCAN_PAGES[selectedScanIndex] || MENU_SCAN_PAGES[0];

  const handleNext = () => {
    setSelectedScanIndex((selectedScanIndex + 1) % MENU_SCAN_PAGES.length);
    setZoomLevel(1);
  };

  const handlePrev = () => {
    setSelectedScanIndex((selectedScanIndex - 1 + MENU_SCAN_PAGES.length) % MENU_SCAN_PAGES.length);
    setZoomLevel(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl h-[92vh] bg-zinc-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-zinc-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scan-modal-title"
      >
        {/* Top Control Bar */}
        <div className="bg-zinc-900 text-white p-3 sm:p-4 flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-pak-yellow" />
            <div>
              <h3 id="scan-modal-title" className="font-display font-black text-sm sm:text-base text-white">
                {currentScan.title}
              </h3>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                Page {selectedScanIndex + 1} of {MENU_SCAN_PAGES.length} • Real printed menu card in Antique
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-zinc-800 rounded-lg p-1 border border-zinc-700">
              <button
                onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                className="p-1 hover:text-pak-yellow text-zinc-300 cursor-pointer"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold px-1.5 text-zinc-200">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="p-1 hover:text-pak-yellow text-zinc-300 cursor-pointer"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 hover:text-pak-yellow text-zinc-300 cursor-pointer"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={closeScanModal}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
              aria-label="Close menu scans modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Thumbnail Selector Ribbon */}
        <div className="bg-zinc-900/60 border-b border-zinc-800 px-3 py-2 flex items-center gap-2 overflow-x-auto shrink-0">
          {MENU_SCAN_PAGES.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => {
                setSelectedScanIndex(idx);
                setZoomLevel(1);
              }}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedScanIndex === idx
                  ? "bg-pak-yellow text-pak-black shadow-sm"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {page.title.split("&")[0]}
            </button>
          ))}
        </div>

        {/* Image Display Area */}
        <div className="relative flex-1 bg-zinc-950 overflow-auto flex items-center justify-center p-2 sm:p-4">
          <div
            className="relative transition-transform duration-200 origin-center max-w-full max-h-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <Image
              src={currentScan.image}
              alt={currentScan.title}
              width={750}
              height={1200}
              className="rounded-xl shadow-2xl object-contain max-h-[70vh] w-auto mx-auto border border-zinc-800"
              priority
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-pak-yellow transition-transform hover:scale-110 cursor-pointer z-10"
            aria-label="Previous menu page"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-pak-yellow transition-transform hover:scale-110 cursor-pointer z-10"
            aria-label="Next menu page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption */}
        <div className="bg-zinc-900 text-center py-2 px-4 text-xs text-zinc-400 shrink-0 border-t border-zinc-800">
          <span>{currentScan.description}</span>
        </div>
      </div>
    </div>
  );
}
