"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Bike,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  Filter,
  Flame,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  BarChart3,
  RefreshCw,
  Lock,
  Unlock,
  ShieldAlert,
  KeyRound,
  LogOut,
  ExternalLink,
  Eye,
  EyeOff,
  Calendar,
  IdCard,
  Users,
  Phone,
  Mail,
  MapPin,
  Check,
  X,
  FileText,
  ShieldCheck,
  Trash2,
  Download,
  UserCheck,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { DELIVERY_PARTNERS, STORE_INFO, MENU_CATEGORIES } from "@/data/storeData";
import { MenuItem, TableReservationRecord } from "@/types";

const SAMPLE_PHILSYS_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380"><rect width="600" height="380" rx="18" fill="%230d3b66"/><rect x="12" y="12" width="576" height="356" rx="12" fill="%23ffffff"/><path d="M12 12 H588 V90 H12 Z" fill="%230038a8"/><circle cx="50" cy="51" r="26" fill="%23f4d06f"/><text x="90" y="42" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="%23ffffff">REPUBLIKA NG PILIPINAS</text><text x="90" y="60" font-family="Arial, sans-serif" font-size="11" fill="%23f4d06f">PAMBANSANG PAGKAKAKILANLAN / PHILIPPINE IDENTIFICATION SYSTEM</text><text x="90" y="76" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="%23ffffff">PSA / PHILPOST OFFICIAL ID</text><rect x="36" y="115" width="130" height="160" rx="8" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="2"/><circle cx="101" cy="165" r="32" fill="%2394a3b8"/><path d="M60 250 Q101 205 142 250 Z" fill="%2364748b"/><text x="101" y="295" font-family="Arial, sans-serif" font-size="9" text-anchor="middle" fill="%2364748b" font-weight="bold">PHOTO VERIFIED</text><text x="190" y="132" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">APELYIDO / LAST NAME</text><text x="190" y="152" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="%230f172a">SANTOS</text><text x="190" y="180" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">MGA PANGALAN / GIVEN NAMES</text><text x="190" y="200" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="%230f172a">MARIA CLARA</text><text x="190" y="228" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">PETSA NG KAPANGANAKAN / DATE OF BIRTH</text><text x="190" y="246" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="%230f172a">OCT 14, 1996</text><text x="190" y="274" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">TIRAHAN / ADDRESS</text><text x="190" y="292" font-family="Arial, sans-serif" font-size="12" fill="%23334155">San Jose de Buenavista, Antique 5700</text><rect x="36" y="318" width="528" height="38" rx="6" fill="%23f1f5f9"/><text x="50" y="342" font-family="Courier, monospace" font-size="13" font-weight="bold" fill="%231e293b">PSA-PSN: 7104-9281-3049-5821</text></svg>`;

const SAMPLE_LICENSE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380"><rect width="600" height="380" rx="18" fill="%230466c8"/><rect x="12" y="12" width="576" height="356" rx="12" fill="%23ffffff"/><path d="M12 12 H588 V80 H12 Z" fill="%230353a4"/><text x="36" y="42" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="%23ffffff">REPUBLIC OF THE PHILIPPINES • DEPT. OF TRANSPORTATION</text><text x="36" y="62" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="%23ffd166">LAND TRANSPORTATION OFFICE • DRIVER'S LICENSE</text><rect x="36" y="105" width="130" height="165" rx="8" fill="%23e2e8f0" stroke="%2394a3b8" stroke-width="2"/><circle cx="101" cy="160" r="34" fill="%2394a3b8"/><path d="M60 245 Q101 200 142 245 Z" fill="%23475569"/><text x="101" y="290" font-family="Arial, sans-serif" font-size="9" text-anchor="middle" fill="%23475569" font-weight="bold">PHOTO VERIFIED</text><text x="190" y="125" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">LICENSE NO.</text><text x="190" y="145" font-family="Courier, monospace" font-size="16" font-weight="bold" fill="%23b91c1c">F02-18-094821</text><text x="190" y="172" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">NAME (LAST, FIRST, MIDDLE)</text><text x="190" y="192" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="%230f172a">DELA CRUZ, JUAN MIGUEL</text><text x="190" y="220" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">NATIONALITY / SEX / EXPIRATION</text><text x="190" y="238" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="%230f172a">PHL / MALE / 2029-08-25</text><text x="190" y="266" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">ADDRESS</text><text x="190" y="284" font-family="Arial, sans-serif" font-size="12" fill="%23334155">Sibalom Town Center, Antique 5701</text><rect x="36" y="315" width="528" height="40" rx="6" fill="%23f8fafc" stroke="%23e2e8f0"/><text x="50" y="340" font-family="Courier, monospace" font-size="12" font-weight="bold" fill="%23334155">LTO-BARCODE: ||||| | |||| || |||||| | ||||| |||| || |</text></svg>`;

const SAMPLE_PASSPORT_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380"><rect width="600" height="380" rx="18" fill="%231a365d"/><rect x="12" y="12" width="576" height="356" rx="12" fill="%23f8fafc"/><path d="M12 12 H588 V75 H12 Z" fill="%231e293b"/><text x="36" y="42" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="%23ffffff">REPUBLIKA NG PILIPINAS / REPUBLIC OF THE PHILIPPINES</text><text x="36" y="62" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="%23facc15">PASAPORTE / PASSPORT (DFA)</text><rect x="36" y="100" width="130" height="170" rx="8" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="2"/><circle cx="101" cy="155" r="34" fill="%2394a3b8"/><path d="M60 240 Q101 195 142 240 Z" fill="%23475569"/><text x="101" y="285" font-family="Arial, sans-serif" font-size="9" text-anchor="middle" fill="%23475569" font-weight="bold">BIOMETRIC PHOTO</text><text x="190" y="120" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">PASSPORT NO.</text><text x="190" y="140" font-family="Courier, monospace" font-size="16" font-weight="bold" fill="%23b91c1c">P9820491B</text><text x="190" y="168" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">NAME / PANGALAN</text><text x="190" y="188" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="%230f172a">ROXAS, BEA ALONZO</text><text x="190" y="216" font-family="Arial, sans-serif" font-size="10" fill="%2364748b" font-weight="bold">DATE OF BIRTH / EXPIRY</text><text x="190" y="234" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="%230f172a">03 JUL 1998 / 18 NOV 2032</text><rect x="36" y="305" width="528" height="50" rx="6" fill="%230f172a"/><text x="50" y="328" font-family="Courier, monospace" font-size="13" fill="%2322c55e">P&lt;PHLROXAS&lt;&lt;BEA&lt;ALONZO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text><text x="50" y="344" font-family="Courier, monospace" font-size="13" fill="%2322c55e">P9820491B5PHL9807038F3211186&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text></svg>`;

const INITIAL_SAMPLE_RESERVATIONS: TableReservationRecord[] = [
  {
    id: "res-sample-1",
    referenceCode: "PAK-RES-SJ-8821",
    branchId: "san-jose",
    branchName: "Pak na Pak San Jose Main",
    fullName: "Maria Clara Santos",
    phone: "0917-555-4321",
    email: "maria.santos@gmail.com",
    partySize: "4 Persons",
    date: new Date().toISOString().split("T")[0],
    time: "7:00 PM (Dinner Rush)",
    diningType: "Unlimited Samgyupsal (₱249/pax)",
    notes: "Window booth requested if available. Celebrating birthday!",
    idFileName: "philsys_national_id_santos.jpg",
    idFileSize: "1.4 MB",
    idType: "Philippine National ID (PhilSys)",
    idFileDataUrl: SAMPLE_PHILSYS_SVG,
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "res-sample-2",
    referenceCode: "PAK-RES-SIB-3419",
    branchId: "sibalom",
    branchName: "Pak na Pak Sibalom Branch",
    fullName: "Juan Miguel Dela Cruz",
    phone: "0998-123-9876",
    partySize: "6 Persons",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "12:30 PM (Lunch)",
    diningType: "Pak Family Fried Chicken Feast",
    notes: "High chair for 1 toddler please.",
    idFileName: "drivers_license_delacruz.jpg",
    idFileSize: "980 KB",
    idType: "Driver's License (LTO)",
    idFileDataUrl: SAMPLE_LICENSE_SVG,
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "res-sample-3",
    referenceCode: "PAK-RES-SJ-1092",
    branchId: "san-jose",
    branchName: "Pak na Pak San Jose Main",
    fullName: "Bea Alonzo Roxas",
    phone: "0920-888-7711",
    partySize: "2 Persons",
    date: new Date().toISOString().split("T")[0],
    time: "8:00 PM (Evening)",
    diningType: "Unlimited Samgyupsal (₱249/pax)",
    notes: "Anniversary dinner reservation.",
    idFileName: "passport_roxas.jpg",
    idFileSize: "2.1 MB",
    idType: "Philippine Passport (DFA)",
    idFileDataUrl: SAMPLE_PASSPORT_SVG,
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
];

export default function DashboardPage() {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    menuItems,
    toggleInStock,
  } = useAdmin();

  // Authentication PIN Form State
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // Dashboard Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeRange, setTimeRange] = useState<"today" | "7d" | "30d">("today");

  // Table Reservations & Government ID State
  const [reservations, setReservations] = useState<TableReservationRecord[]>([]);
  const [selectedResForId, setSelectedResForId] = useState<TableReservationRecord | null>(null);
  const [resStatusFilter, setResStatusFilter] = useState<string>("all");
  const [resBranchFilter, setResBranchFilter] = useState<string>("all");
  const [resSearchQuery, setResSearchQuery] = useState<string>("");

  // Load reservations from localStorage or default samples
  useEffect(() => {
    try {
      const stored = localStorage.getItem("pak_reservations_v1");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReservations(parsed);
          return;
        }
      }
      // Seed default samples if empty
      setReservations(INITIAL_SAMPLE_RESERVATIONS);
      localStorage.setItem("pak_reservations_v1", JSON.stringify(INITIAL_SAMPLE_RESERVATIONS));
    } catch {
      setReservations(INITIAL_SAMPLE_RESERVATIONS);
    }
  }, []);

  const handleUpdateResStatus = (id: string, status: TableReservationRecord["status"]) => {
    setReservations((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status } : r));
      try {
        localStorage.setItem("pak_reservations_v1", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (selectedResForId && selectedResForId.id === id) {
      setSelectedResForId((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleDeleteReservation = (id: string) => {
    if (!confirm("Are you sure you want to remove this reservation record?")) return;
    setReservations((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      try {
        localStorage.setItem("pak_reservations_v1", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (selectedResForId?.id === id) {
      setSelectedResForId(null);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.trim().toLowerCase();
    const valid =
      cleanPin === "pak" ||
      cleanPin === "1234" ||
      cleanPin === "admin" ||
      cleanPin === "0000" ||
      cleanPin === "8888" ||
      cleanPin === "porkever";

    if (valid) {
      loginAdmin(pinInput);
      setPinError(false);
      setPinInput("");
    } else {
      setPinError(true);
    }
  };

  // =========================================================================
  // 1. LOCKED VIEW: RESTRICTED ACCESS SCREEN (NO STORE DATA VISIBLE TO CUSTOMERS)
  // =========================================================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between py-12 px-4 selection:bg-pak-yellow selection:text-black">
        <div className="max-w-md w-full mx-auto my-auto space-y-6">
          {/* Brand Logo & Lock Badge */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-pak-yellow text-pak-black mx-auto flex items-center justify-center shadow-2xl shadow-pak-yellow/20">
              <Lock className="w-8 h-8 stroke-[2.4]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-pak-yellow mb-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Restricted Store System</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                Pak na Pak Store Intelligence
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-sm mx-auto">
                Private store analytics, daily revenue metrics, and inventory control.
              </p>
            </div>
          </div>

          {/* Secure Passcode Box */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="owner-pin"
                  className="text-xs font-black uppercase tracking-wider text-zinc-300 block"
                >
                  Enter Store Owner / Staff PIN:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="owner-pin"
                    type={showPin ? "text" : "password"}
                    autoFocus
                    required
                    placeholder="Enter PIN (e.g. pak or 1234)"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (pinError) setPinError(false);
                    }}
                    className={`w-full pl-10 pr-10 py-3 rounded-2xl bg-zinc-950 border text-sm text-white placeholder:text-zinc-600 focus:outline-hidden transition-all ${
                      pinError
                        ? "border-red-500 ring-2 ring-red-500/30"
                        : "border-zinc-700 focus:border-pak-yellow focus:ring-2 focus:ring-pak-yellow/30"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    aria-label={showPin ? "Hide PIN" : "Show PIN"}
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {pinError && (
                  <p className="text-xs font-bold text-red-400 flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Incorrect PIN. Please enter the valid store passcode.</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Store Intelligence</span>
              </button>
            </form>

            <div className="pt-2 border-t border-zinc-800 text-center">
              <span className="text-[11px] text-zinc-500">
                Authorized Personnel Only • San Jose & Sibalom, Antique
              </span>
            </div>
          </div>

          {/* Safe Exit to Public Customer Site */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-pak-yellow transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Customer Website</span>
            </Link>
          </div>
        </div>

        {/* Confidential Notice Footer */}
        <div className="text-center text-[11px] text-zinc-600 mt-8">
          Confidential System © 2026 Pak na Pak Restaurant Antique. All rights reserved.
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. UNLOCKED VIEW: AUTHENTICATED STORE OWNER & MANAGER PORTAL
  // =========================================================================
  const filteredItems = menuItems.filter((item) => {
    const matchesCat =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const inStockCount = menuItems.filter((i) => i.inStock).length;
  const outOfStockCount = menuItems.length - inStockCount;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 selection:bg-pak-yellow selection:text-black">
      {/* Standalone Private Portal Header */}
      <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-pak-yellow flex items-center justify-center font-display font-black text-pak-black text-lg shadow shrink-0">
              <Flame className="w-5 h-5 fill-pak-black text-pak-black" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-sm sm:text-base text-white truncate">
                  Store Intelligence & Operations
                </h1>
                <span className="hidden sm:inline-flex text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black uppercase px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 hidden sm:block">
                San Jose & Sibalom Branches • Internal Dashboard
              </span>
            </div>
          </div>

          {/* Right Action Tools: Time Filters + Exit/Sign Out */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Time Filter Pills */}
            <div className="inline-flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              {(["today", "7d", "30d"] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`text-xs font-black px-2.5 sm:px-3 py-1 rounded-lg transition-colors cursor-pointer uppercase ${
                    timeRange === range
                      ? "bg-pak-yellow text-pak-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Visit Customer Site */}
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-pak-yellow bg-zinc-900 hover:bg-zinc-850 px-3 py-2 rounded-xl border border-zinc-800 transition-colors"
            >
              <span>View Customer Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Lock / Sign Out Button */}
            <button
              type="button"
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-400 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-900/60 px-3 py-2 rounded-xl transition-colors cursor-pointer"
              title="Lock dashboard immediately"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock / Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Scorecards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Daily Revenue Est.
              </span>
              <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-pak-yellow flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-black text-3xl text-white">
              ₱14,850
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs. yesterday</span>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Total Orders Dispatched
              </span>
              <div className="w-9 h-9 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-black text-3xl text-white">
              86
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12.1% fulfillment rate</span>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Average Ticket Size
              </span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-black text-3xl text-white">
              ₱172.60
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-zinc-400">
              <span>Healthy average for combo meals</span>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Top Courier Partner
              </span>
              <div className="w-9 h-9 rounded-2xl bg-amber-400/20 text-pak-yellow flex items-center justify-center">
                <Bike className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-black text-2xl text-white truncate">
              Mr. Cartman
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-pak-yellow">
              <span>46% share (38 dispatches today)</span>
            </div>
          </div>
        </section>

        {/* Charts & Breakdown Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Category Sales Distribution (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900 rounded-3xl p-6 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h2 className="font-display font-black text-lg text-white">
                  Revenue by Menu Category
                </h2>
                <p className="text-xs text-zinc-400">
                  Fried chicken combos and samgyupsal drive over 60% of total volume
                </p>
              </div>
              <span className="text-xs font-black text-pak-yellow uppercase">
                Ranked by Sales
              </span>
            </div>

            <div className="space-y-4">
              {[
                { name: "Fried Chicken Meals & Flavors", pct: 36, rev: "₱5,346", count: 42, color: "bg-pak-yellow" },
                { name: "Samgyupsal Dine-In Sets", pct: 28, rev: "₱4,158", count: 14, color: "bg-orange-500" },
                { name: "Chao Fan & Rice Bowls", pct: 17, rev: "₱2,524", count: 22, color: "bg-amber-400" },
                { name: "Sizzling Hot Plates", pct: 11, rev: "₱1,633", count: 16, color: "bg-red-500" },
                { name: "Snacks, Drinks & Soju", pct: 8, rev: "₱1,189", count: 18, color: "bg-emerald-500" },
              ].map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-200">{cat.name}</span>
                    <span className="text-zinc-400 font-medium">
                      {cat.rev} ({cat.pct}%) • {cat.count} orders
                    </span>
                  </div>
                  <div className="h-3 w-full bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courier Fleet Leaderboard (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-900 rounded-3xl p-6 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h2 className="font-display font-black text-lg text-white">
                  Antique Delivery Fleet
                </h2>
                <p className="text-xs text-zinc-400">
                  Real-time local courier performance
                </p>
              </div>
              <Bike className="w-5 h-5 text-pak-yellow" />
            </div>

            <div className="space-y-3.5">
              {DELIVERY_PARTNERS.map((partner, idx) => (
                <div
                  key={partner.id}
                  className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-sm text-white">
                        {partner.name}
                      </span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-black uppercase">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      {partner.tagline}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-display font-black text-lg text-pak-yellow">
                      {idx === 0 ? "46%" : idx === 1 ? "33%" : "21%"}
                    </span>
                    <span className="text-[10px] text-zinc-500 block">
                      {idx === 0 ? "38 Trips" : idx === 1 ? "27 Trips" : "17 Trips"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            TABLE RESERVATIONS & GOVERNMENT ID VERIFICATION LEDGER
            ========================================================================= */}
        <section className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pak-yellow/20 text-pak-yellow flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-black text-xl text-white">
                      Table Reservations &amp; Government ID Ledger
                    </h2>
                    <span className="text-[10px] bg-pak-yellow/20 text-pak-yellow border border-pak-yellow/30 font-black px-2 py-0.5 rounded-full">
                      Anti-Bogus Shield
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Verify customer identity and manage incoming dine-in bookings for San Jose &amp; Sibalom branches.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick KPI Counters */}
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="bg-zinc-950 text-zinc-300 font-bold px-3 py-1.5 rounded-xl border border-zinc-800">
                Total: <strong className="text-white">{reservations.length}</strong>
              </span>
              <span className="bg-amber-500/20 text-amber-300 font-bold px-3 py-1.5 rounded-xl border border-amber-500/30 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Pending ID: <strong>{reservations.filter((r) => r.status === "pending").length}</strong></span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Confirmed: <strong>{reservations.filter((r) => r.status === "confirmed").length}</strong></span>
              </span>
              <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1.5 rounded-xl border border-blue-500/30 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Seated: <strong>{reservations.filter((r) => r.status === "seated").length}</strong></span>
              </span>
            </div>
          </div>

          {/* Filters Bar: Search + Branch Filter + Status Filter */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by customer name, phone, reference code (e.g. PAK-RES)..."
                value={resSearchQuery}
                onChange={(e) => setResSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-pak-yellow transition-colors"
              />
            </div>

            {/* Branch Pills */}
            <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-2xl border border-zinc-800 shrink-0">
              <span className="text-[10px] font-bold text-zinc-500 px-2 uppercase tracking-wider">Branch:</span>
              {[
                { id: "all", label: "All" },
                { id: "san-jose", label: "San Jose" },
                { id: "sibalom", label: "Sibalom" },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setResBranchFilter(b.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    resBranchFilter === b.id
                      ? "bg-pak-yellow text-pak-black font-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-2xl border border-zinc-800 shrink-0 overflow-x-auto">
              <span className="text-[10px] font-bold text-zinc-500 px-2 uppercase tracking-wider">Status:</span>
              {[
                { id: "all", label: "All" },
                { id: "pending", label: "Pending" },
                { id: "confirmed", label: "Confirmed" },
                { id: "seated", label: "Seated" },
                { id: "cancelled", label: "Cancelled" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setResStatusFilter(s.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer capitalize ${
                    resStatusFilter === s.id
                      ? "bg-pak-yellow text-pak-black font-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reservations Cards List */}
          {reservations.filter((res) => {
            const matchesStatus = resStatusFilter === "all" || res.status === resStatusFilter;
            const matchesBranch = resBranchFilter === "all" || res.branchId === resBranchFilter;
            const matchesSearch =
              res.fullName.toLowerCase().includes(resSearchQuery.toLowerCase()) ||
              res.phone.toLowerCase().includes(resSearchQuery.toLowerCase()) ||
              res.referenceCode.toLowerCase().includes(resSearchQuery.toLowerCase()) ||
              (res.notes && res.notes.toLowerCase().includes(resSearchQuery.toLowerCase()));
            return matchesStatus && matchesBranch && matchesSearch;
          }).length === 0 ? (
            <div className="text-center py-12 px-4 bg-zinc-950/60 rounded-2xl border border-dashed border-zinc-800 space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-zinc-600" />
              <p className="font-bold text-sm text-zinc-300">No table reservations match your filters</p>
              <p className="text-xs text-zinc-500">
                Try switching branch or status filters, or clear your search term.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations
                .filter((res) => {
                  const matchesStatus = resStatusFilter === "all" || res.status === resStatusFilter;
                  const matchesBranch = resBranchFilter === "all" || res.branchId === resBranchFilter;
                  const matchesSearch =
                    res.fullName.toLowerCase().includes(resSearchQuery.toLowerCase()) ||
                    res.phone.toLowerCase().includes(resSearchQuery.toLowerCase()) ||
                    res.referenceCode.toLowerCase().includes(resSearchQuery.toLowerCase()) ||
                    (res.notes && res.notes.toLowerCase().includes(resSearchQuery.toLowerCase()));
                  return matchesStatus && matchesBranch && matchesSearch;
                })
                .map((res) => (
                  <div
                    key={res.id}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4"
                  >
                    {/* Top Row: Ref, Branch, Schedule, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono font-black text-sm text-pak-yellow bg-pak-yellow/10 border border-pak-yellow/20 px-2.5 py-0.5 rounded-lg">
                          {res.referenceCode}
                        </span>
                        <span className="text-xs font-bold text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-lg">
                          {res.branchName}
                        </span>
                        <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-pak-yellow" />
                          <span>{res.date} • {res.time}</span>
                        </span>
                      </div>

                      {/* Status Tag */}
                      <div className="flex items-center gap-2">
                        {res.status === "pending" && (
                          <span className="inline-flex items-center gap-1 text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-xl">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Pending Verification</span>
                          </span>
                        )}
                        {res.status === "confirmed" && (
                          <span className="inline-flex items-center gap-1 text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-xl">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Confirmed &amp; Verified</span>
                          </span>
                        )}
                        {res.status === "seated" && (
                          <span className="inline-flex items-center gap-1 text-xs font-black bg-blue-500/20 text-blue-400 border border-blue-500/40 px-2.5 py-1 rounded-xl">
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Seated at Table</span>
                          </span>
                        )}
                        {res.status === "cancelled" && (
                          <span className="inline-flex items-center gap-1 text-xs font-black bg-zinc-800 text-zinc-400 border border-zinc-700 px-2.5 py-1 rounded-xl">
                            <X className="w-3.5 h-3.5" />
                            <span>Cancelled</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle Row: Customer Info, Booking Details, Government ID Card */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      {/* Customer Info (4 cols) */}
                      <div className="md:col-span-4 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-black text-base text-white">
                            {res.fullName}
                          </span>
                        </div>

                        <div className="space-y-1 text-xs text-zinc-400">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-zinc-500" />
                            <a
                              href={`tel:${res.phone}`}
                              className="text-pak-yellow hover:underline font-bold"
                            >
                              {res.phone}
                            </a>
                          </div>
                          {res.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-zinc-500" />
                              <span className="truncate">{res.email}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-zinc-300">
                            <Users className="w-3.5 h-3.5 text-pak-yellow" />
                            <span className="font-bold">{res.partySize}</span>
                            <span>•</span>
                            <span className="text-zinc-400 truncate">{res.diningType}</span>
                          </div>
                        </div>

                        {res.notes && (
                          <div className="mt-2 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">
                            <strong className="text-pak-yellow block">Special Request:</strong>
                            {res.notes}
                          </div>
                        )}
                      </div>

                      {/* Government ID & Anti-Bogus Verification (4 cols) */}
                      <div className="md:col-span-4">
                        <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black uppercase tracking-wider text-pak-yellow flex items-center gap-1.5">
                              <IdCard className="w-3.5 h-3.5" />
                              <span>Government ID Upload</span>
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {res.idFileSize || "Verified"}
                            </span>
                          </div>

                          <div className="text-xs">
                            <p className="font-bold text-zinc-200 truncate">
                              {res.idType || "Philippine Government ID"}
                            </p>
                            <p className="text-[11px] text-zinc-500 truncate font-mono">
                              {res.idFileName}
                            </p>
                          </div>

                          {/* Inspect ID Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedResForId(res)}
                            className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-750 text-white font-extrabold text-xs py-2 px-3 rounded-xl border border-zinc-700 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-pak-yellow" />
                            <span>Inspect Customer ID</span>
                          </button>
                        </div>
                      </div>

                      {/* Actions Column (4 cols) */}
                      <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2 justify-center">
                        {res.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateResStatus(res.id, "confirmed")}
                            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs py-2.5 px-3 rounded-xl shadow transition-transform active:scale-98 cursor-pointer"
                          >
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Verify ID &amp; Confirm Table</span>
                          </button>
                        )}

                        {res.status === "confirmed" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateResStatus(res.id, "seated")}
                            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl shadow transition-transform active:scale-98 cursor-pointer"
                          >
                            <UserCheck className="w-4 h-4" />
                            <span>Customer Has Arrived (Seated)</span>
                          </button>
                        )}

                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${res.phone}`}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white text-xs font-bold py-2 px-3 rounded-xl border border-zinc-800 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Call</span>
                          </a>

                          {res.status !== "cancelled" ? (
                            <button
                              type="button"
                              onClick={() => handleUpdateResStatus(res.id, "cancelled")}
                              className="flex items-center justify-center gap-1 text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-900/40 border border-red-900/50 py-2 px-3 rounded-xl transition-colors cursor-pointer"
                              title="Cancel reservation"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Decline</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleUpdateResStatus(res.id, "pending")}
                              className="flex items-center justify-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-900/50 py-2 px-3 rounded-xl transition-colors cursor-pointer"
                              title="Reopen reservation"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Reopen</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDeleteReservation(res.id)}
                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer"
                            title="Delete reservation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Live Menu Inventory Management (Full Width) */}
        <section className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-pak-yellow" />
                <h2 className="font-display font-black text-xl text-white">
                  Menu Inventory & Live Availability Control
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Toggle dishes in/out of stock. Changes immediately reflect on the live menu.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                {inStockCount} In Stock
              </span>
              <span className="bg-red-500/20 text-red-400 font-bold px-3 py-1 rounded-full border border-red-500/30">
                {outOfStockCount} Out of Stock
              </span>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search dish name, description, price..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-pak-yellow transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-pak-yellow text-pak-black border-pak-yellow font-black"
                    : "bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500"
                }`}
              >
                All ({menuItems.length})
              </button>
              {MENU_CATEGORIES.slice(1, 8).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-pak-yellow text-pak-black border-pak-yellow font-black"
                      : "bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  {cat.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Table / Grid of Dishes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.slice(0, 15).map((dish) => (
              <div
                key={dish.id}
                className={`p-4 rounded-2xl border transition-all ${
                  dish.inStock
                    ? "bg-zinc-950 border-zinc-800"
                    : "bg-zinc-950/80 border-red-900/50 opacity-70"
                } flex items-center justify-between gap-3`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-zinc-800 bg-zinc-900">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display font-black text-xs sm:text-sm text-white truncate">
                        {dish.name}
                      </h3>
                      {dish.badge && (
                        <span className="text-[9px] bg-pak-yellow text-pak-black font-black px-1.5 py-0.2 rounded shrink-0">
                          {dish.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-black text-xs text-pak-yellow">
                      ₱{dish.price}
                    </span>
                    <span className="text-[10px] text-zinc-500 block truncate">
                      {dish.portion || dish.category}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleInStock(dish.id)}
                  title={dish.inStock ? "Set as Out of Stock" : "Set as In Stock"}
                  className={`p-2 rounded-xl font-black text-xs cursor-pointer transition-all ${
                    dish.inStock
                      ? "text-emerald-400 hover:bg-emerald-500/20"
                      : "text-red-400 hover:bg-red-500/20"
                  }`}
                >
                  {dish.inStock ? (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] uppercase font-bold">In Stock</span>
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] uppercase font-bold">Out</span>
                      <ToggleLeft className="w-6 h-6 text-red-400" />
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center pt-2 text-xs text-zinc-500">
            Showing top {Math.min(15, filteredItems.length)} of {filteredItems.length} dishes matching criteria.
          </div>
        </section>
        {/* =========================================================================
            GOVERNMENT ID INSPECTION MODAL (STORE OWNER / STAFF VIEW)
            ========================================================================= */}
        {selectedResForId && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
            onClick={() => setSelectedResForId(null)}
          >
            <div
              className="bg-zinc-900 border border-zinc-700 max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl my-auto text-zinc-100 flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between gap-3 bg-zinc-950/80 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-pak-yellow/20 text-pak-yellow flex items-center justify-center shrink-0">
                    <IdCard className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-black text-base sm:text-lg text-white truncate">
                        Government ID Inspection
                      </h3>
                      <span className="font-mono text-[11px] font-black text-pak-yellow bg-pak-yellow/10 border border-pak-yellow/20 px-2 py-0.5 rounded-md">
                        {selectedResForId.referenceCode}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                      {selectedResForId.fullName} • {selectedResForId.branchName}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedResForId(null)}
                  className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close Government ID modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
                {/* ID Photo Viewer Container */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-zinc-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Uploaded ID Document:</span>
                    </span>
                    <span className="text-zinc-400 text-[11px]">
                      {selectedResForId.idType || "Philippine Government ID"}
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-700 bg-zinc-950 shadow-inner flex items-center justify-center min-h-[220px] max-h-[360px]">
                    {selectedResForId.idFileDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selectedResForId.idFileDataUrl}
                        alt={`Government ID of ${selectedResForId.fullName}`}
                        className="w-full h-auto max-h-[350px] object-contain"
                      />
                    ) : (
                      <div className="text-center p-8 space-y-2">
                        <IdCard className="w-12 h-12 text-zinc-600 mx-auto" />
                        <p className="text-sm font-bold text-zinc-400">
                          {selectedResForId.idFileName}
                        </p>
                        <p className="text-xs text-zinc-500">
                          File uploaded ({selectedResForId.idFileSize || "Verified"})
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1">
                    <span className="truncate font-mono">
                      File: {selectedResForId.idFileName} ({selectedResForId.idFileSize || "Verified"})
                    </span>
                    {selectedResForId.idFileDataUrl && (
                      <a
                        href={selectedResForId.idFileDataUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pak-yellow hover:underline flex items-center gap-1 font-bold shrink-0 ml-2"
                      >
                        <span>Open Full Screen</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Customer Booking Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">
                      Customer Name &amp; Contact
                    </span>
                    <p className="font-bold text-white text-sm mt-0.5">
                      {selectedResForId.fullName}
                    </p>
                    <a
                      href={`tel:${selectedResForId.phone}`}
                      className="text-pak-yellow hover:underline font-bold inline-flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{selectedResForId.phone}</span>
                    </a>
                    {selectedResForId.email && (
                      <p className="text-zinc-400 truncate">{selectedResForId.email}</p>
                    )}
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">
                      Schedule &amp; Branch
                    </span>
                    <p className="font-bold text-white mt-0.5">
                      {selectedResForId.branchName}
                    </p>
                    <p className="text-zinc-300 mt-0.5">
                      {selectedResForId.date} at {selectedResForId.time}
                    </p>
                    <p className="text-zinc-400 mt-0.5 font-bold">
                      {selectedResForId.partySize} • {selectedResForId.diningType}
                    </p>
                  </div>

                  {selectedResForId.notes && (
                    <div className="sm:col-span-2 pt-2 border-t border-zinc-800/80">
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">
                        Special Requests / Celebration Notes
                      </span>
                      <p className="text-zinc-300 mt-0.5">{selectedResForId.notes}</p>
                    </div>
                  )}
                </div>

                {/* Anti-Bogus Verification Guidelines */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300 space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-400 block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Antique Branch Anti-Bogus Policy</span>
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-zinc-300 text-[11px]">
                    <li>Ensure customer presents matching physical ID card upon seating.</li>
                    <li>Reservations are held for up to 15 minutes past the reserved schedule.</li>
                    <li>Contact customer via phone if arrival is delayed.</li>
                  </ul>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={`tel:${selectedResForId.phone}`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-zinc-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call Customer</span>
                  </a>

                  {selectedResForId.status !== "cancelled" ? (
                    <button
                      type="button"
                      onClick={() => handleUpdateResStatus(selectedResForId.id, "cancelled")}
                      className="inline-flex items-center justify-center gap-1 text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-900/40 border border-red-900/50 py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleUpdateResStatus(selectedResForId.id, "pending")}
                      className="inline-flex items-center justify-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-900/50 py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reopen</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {selectedResForId.status !== "confirmed" && selectedResForId.status !== "seated" && (
                    <button
                      type="button"
                      onClick={() => handleUpdateResStatus(selectedResForId.id, "confirmed")}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs py-2.5 px-4 rounded-xl shadow transition-transform active:scale-98 cursor-pointer"
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Confirm Reservation</span>
                    </button>
                  )}

                  {selectedResForId.status === "confirmed" && (
                    <button
                      type="button"
                      onClick={() => handleUpdateResStatus(selectedResForId.id, "seated")}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow transition-transform active:scale-98 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Mark as Seated</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedResForId(null)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-zinc-700 transition-colors cursor-pointer"
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
