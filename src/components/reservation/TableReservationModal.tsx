"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  Clock,
  Users,
  IdCard,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { STORE_BRANCHES } from "@/data/storeData";
import { BranchInfo, TableReservationRecord } from "@/types";

const ACCEPTED_GOVT_IDS = [
  "Philippine National ID (PhilSys)",
  "Driver's License",
  "Philippine Passport",
  "UMID / SSS / GSIS Card",
  "Postal ID / Voter's ID",
  "PRC Professional ID",
  "Senior Citizen / PWD ID",
  "Valid Student / Company ID",
];

const TIME_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM (Lunch Rush)",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM (Early Dinner)",
  "05:30 PM",
  "06:00 PM (Dinner Rush)",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM (Last Seating)",
];

export default function TableReservationModal() {
  const { isReservationModalOpen, closeReservationModal, reservationPrefill } = useCart();

  const [selectedBranchId, setSelectedBranchId] = useState<"san-jose" | "sibalom">("san-jose");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("06:00 PM (Dinner Rush)");
  const [partySize, setPartySize] = useState("4 Persons");
  const [diningType, setDiningType] = useState("Unlimited Samgyupsal Grill");
  const [notes, setNotes] = useState("");

  // Government ID upload state
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idPreviewUrl, setIdPreviewUrl] = useState<string | null>(null);
  const [idFileName, setIdFileName] = useState<string>("");
  const [idFileSize, setIdFileSize] = useState<string>("");
  const [idType, setIdType] = useState<string>("Philippine National ID (PhilSys)");
  const [idError, setIdError] = useState<string | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<TableReservationRecord | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync prefilled values from callers (e.g. Samgyup showcase)
  useEffect(() => {
    if (reservationPrefill?.branch) {
      setSelectedBranchId(reservationPrefill.branch);
    }
    if (reservationPrefill?.diningType) {
      setDiningType(reservationPrefill.diningType);
    }
    // Set default date to today
    const today = new Date().toISOString().split("T")[0];
    setDate((prev) => prev || today);
  }, [reservationPrefill, isReservationModalOpen]);

  if (!isReservationModalOpen) return null;

  const currentBranch: BranchInfo =
    STORE_BRANCHES.find((b) => b.id === selectedBranchId) || STORE_BRANCHES[0];

  // Handle government ID file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIdError(null);

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setIdError("File size is too large (max 8MB). Please choose a smaller photo.");
      return;
    }

    setIdFile(file);
    setIdFileName(file.name);
    const sizeKb = Math.round(file.size / 1024);
    setIdFileSize(sizeKb > 1000 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`);

    // Create DataURL preview for image
    const reader = new FileReader();
    reader.onloadend = () => {
      setIdPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveId = () => {
    setIdFile(null);
    setIdPreviewUrl(null);
    setIdFileName("");
    setIdFileSize("");
    setIdError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT VALIDATION: Government ID is required!
    if (!idPreviewUrl || !idFileName) {
      setIdError("⚠️ Government ID is required to reserve a table. Please upload your valid ID below.");
      return;
    }

    if (!fullName.trim() || !phone.trim() || !date || !time) {
      return;
    }

    setIsSubmitting(true);

    const refCode = `PAK-RES-${selectedBranchId === "san-jose" ? "SJ" : "SIB"}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const newRecord: TableReservationRecord = {
      id: `res-${Date.now()}`,
      referenceCode: refCode,
      branchId: selectedBranchId,
      branchName: currentBranch.name,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      partySize,
      date,
      time,
      diningType,
      notes: notes.trim() || undefined,
      idFileName,
      idFileSize,
      idFileDataUrl: idPreviewUrl,
      idType,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage for owner dashboard access
    try {
      const existing = localStorage.getItem("pak_reservations_v1");
      const list: TableReservationRecord[] = existing ? JSON.parse(existing) : [];
      list.unshift(newRecord);
      localStorage.setItem("pak_reservations_v1", JSON.stringify(list));
    } catch {
      // Ignore storage errors
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFC700", "#10B981", "#111111"],
      });
    } catch {
      // Ignore
    }

    setSubmittedRecord(newRecord);
    setIsSubmitting(false);

    // Auto-copy message & prepare Messenger dispatch
    const messengerText = buildMessengerText(newRecord);
    navigator.clipboard.writeText(messengerText);
  };

  const buildMessengerText = (rec: TableReservationRecord) => {
    let msg = `📋 TABLE RESERVATION INQUIRY\n`;
    msg += `📍 STORE BRANCH: ${rec.branchName}\n`;
    msg += `🔖 RESERVATION REF: ${rec.referenceCode}\n\n`;
    msg += `👤 RESERVED BY: ${rec.fullName}\n`;
    msg += `📱 CONTACT NUMBER: ${rec.phone}\n`;
    if (rec.email) msg += `✉️ EMAIL: ${rec.email}\n`;
    msg += `📅 RESERVATION DATE: ${rec.date}\n`;
    msg += `⏰ TIME: ${rec.time}\n`;
    msg += `👥 NUMBER OF GUESTS: ${rec.partySize}\n`;
    msg += `🍽️ DINING PREFERENCE: ${rec.diningType}\n`;
    if (rec.notes) msg += `📝 SPECIAL REQUESTS / OCCASION: ${rec.notes}\n`;
    msg += `🆔 GOVERNMENT ID: Uploaded & Verified (${rec.idType} - ${rec.idFileName})\n\n`;
    msg += `👋 Hello Pak na Pak ${rec.branchName}! Magpapa-confirm po sana ako ng aming table reservation. Naka-ready na po ang aking Government ID details for verification. Paki-check po availability. Maraming salamat!`;
    return msg;
  };

  const handleOpenMessenger = () => {
    if (!submittedRecord) return;
    const msg = buildMessengerText(submittedRecord);
    navigator.clipboard.writeText(msg);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
    const encoded = encodeURIComponent(msg);
    window.open(`${currentBranch.messengerUrl}?text=${encoded}`, "_blank");
  };

  const handleCopyTextOnly = () => {
    if (!submittedRecord) return;
    const msg = buildMessengerText(submittedRecord);
    navigator.clipboard.writeText(msg);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-pak-cream rounded-3xl shadow-2xl flex flex-col border border-zinc-300 overflow-hidden max-h-[94vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-pak-black text-white p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-pak-yellow flex items-center justify-center text-pak-black shadow-md">
              <Calendar className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h2
                id="reservation-modal-title"
                className="font-display font-black text-lg sm:text-xl text-white tracking-tight"
              >
                Table Reservation & ID Verification
              </h2>
              <p className="text-xs text-pak-yellow font-semibold">
                Guaranteed advance seating at Pak na Pak Restaurant Antique
              </p>
            </div>
          </div>

          <button
            onClick={closeReservationModal}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {submittedRecord ? (
            /* ========================================================= */
            /* RESERVATION CONFIRMED VIEW                                */
            /* ========================================================= */
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-400 shadow-md space-y-4 animate-fadeIn text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Government ID Verified
                </span>
                <h3 className="font-display font-black text-2xl text-pak-black">
                  Reservation Details Ready!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-md mx-auto">
                  Thank you, <strong>{submittedRecord.fullName}</strong>. Your reservation reference code is:
                </p>
                <div className="inline-block bg-zinc-900 text-pak-yellow font-mono font-black text-lg px-4 py-1.5 rounded-xl mt-2 tracking-wider">
                  {submittedRecord.referenceCode}
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-zinc-50 rounded-2xl p-4 text-left border border-zinc-200 text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-200">
                  <div>
                    <span className="text-zinc-500 block">Branch:</span>
                    <strong className="text-pak-black">{submittedRecord.branchName}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Party Size:</span>
                    <strong className="text-pak-black">{submittedRecord.partySize}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-200">
                  <div>
                    <span className="text-zinc-500 block">Date & Time:</span>
                    <strong className="text-pak-black">
                      {submittedRecord.date} at {submittedRecord.time}
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Dining Type:</span>
                    <strong className="text-pak-black">{submittedRecord.diningType}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-zinc-500 block">Government ID Attached:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {submittedRecord.idFileName} ({submittedRecord.idFileSize})
                    </span>
                  </div>
                  {submittedRecord.idFileDataUrl && (
                    <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-zinc-300">
                      <Image
                        src={submittedRecord.idFileDataUrl}
                        alt="Government ID"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleOpenMessenger}
                  className="w-full flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-pak-black" />
                  <span>Send Confirmation to {submittedRecord.branchName} on Messenger</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyTextOnly}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold py-2.5 px-3 rounded-xl cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Reservation Text</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRecord(null);
                      closeReservationModal();
                    }}
                    className="flex-1 inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* RESERVATION FORM                                          */
            /* ========================================================= */
            <form onSubmit={handleSubmitReservation} className="space-y-5">
              {/* Branch Selection Pills */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-900 block">
                  1. Select Branch:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STORE_BRANCHES.map((branch) => {
                    const isSelected = selectedBranchId === branch.id;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => setSelectedBranchId(branch.id as "san-jose" | "sibalom")}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-pak-black text-white border-pak-black shadow-md"
                            : "bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50"
                        }`}
                      >
                        <div>
                          <strong className="text-xs sm:text-sm block font-black">
                            {branch.town}
                          </strong>
                          <span
                            className={`text-[10px] block ${
                              isSelected ? "text-zinc-300" : "text-zinc-500"
                            }`}
                          >
                            {branch.badge} • Open 10AM-9PM
                          </span>
                        </div>
                        <MapPin
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? "text-pak-yellow" : "text-zinc-400"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customer Personal Details */}
              <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-xs space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-900 block">
                  2. Person Reserving the Table:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-700 block">
                      Full Name (Matching Government ID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Santos dela Cruz"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-700 block">
                      Mobile Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0917-xxx-xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700 block">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                  />
                </div>
              </div>

              {/* Date, Time & Seating Details */}
              <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-xs space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-900 block">
                  3. Reservation Date & Time:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-700 block">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-700 block">
                      Preferred Time *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900 font-medium"
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-700 block">
                      Party Size *
                    </label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900 font-medium"
                    >
                      <option value="1-2 Persons">1-2 Persons (Solo / Couple)</option>
                      <option value="3-4 Persons">3-4 Persons (Small Group)</option>
                      <option value="5-6 Persons">5-6 Persons (Barkada / Family)</option>
                      <option value="7-8 Persons">7-8 Persons</option>
                      <option value="9-10 Persons">9-10 Persons</option>
                      <option value="12-15 Persons">12-15 Persons (Big Group)</option>
                      <option value="16-20+ Persons">16-20+ Persons (Celebration / Feast)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700 block">
                    Dining Preference:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {[
                      { id: "Unlimited Samgyupsal Grill", label: "🥩 Samgyupsal" },
                      { id: "Unlimited Chicken & Rice", label: "🍗 Unli Chicken" },
                      { id: "₱99 Meals & Chao Fan", label: "🍛 Sulit Meals" },
                      { id: "Birthday / Barkada Feast", label: "🎉 Celebration" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDiningType(opt.id)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold text-center border cursor-pointer transition-colors ${
                          diningType === opt.id
                            ? "bg-pak-yellow text-pak-black border-pak-yellow font-extrabold shadow-2xs"
                            : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700 block">
                    Table Notes / Special Occasion (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Birthday celebration, corner booth request, high chair needed..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900"
                  />
                </div>
              </div>

              {/* ========================================================= */}
              {/* MANDATORY GOVERNMENT ID UPLOAD SECTION                     */}
              {/* ========================================================= */}
              <div
                className={`bg-white rounded-2xl p-4 sm:p-5 border-2 shadow-sm space-y-3.5 transition-colors ${
                  idError
                    ? "border-rose-400 bg-rose-50/20"
                    : idPreviewUrl
                    ? "border-emerald-400 bg-emerald-50/20"
                    : "border-amber-300 bg-amber-50/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <IdCard className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-black uppercase tracking-wider text-zinc-900">
                        4. Upload Government ID (Required)
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Required for identity verification and anti-bogus reservation protection.
                    </p>
                  </div>

                  {idPreviewUrl && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ID Attached
                    </span>
                  )}
                </div>

                {/* ID Type Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700 block">
                    Select Type of ID:
                  </label>
                  <select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-pak-yellow text-zinc-900 font-medium"
                  >
                    {ACCEPTED_GOVT_IDS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Upload Box or Preview Card */}
                {!idPreviewUrl ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="govt-id-upload"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <label
                      htmlFor="govt-id-upload"
                      className="border-2 border-dashed border-zinc-300 hover:border-pak-yellow bg-zinc-50 hover:bg-white rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 group-hover:bg-pak-yellow text-amber-800 group-hover:text-black flex items-center justify-center transition-colors mb-2">
                        <Upload className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-zinc-800 group-hover:text-black">
                        Click or Tap to Upload Government ID Photo
                      </span>
                      <span className="text-[11px] text-zinc-500 mt-0.5">
                        Supports JPG, PNG, WebP, or camera photo (Max 8MB)
                      </span>
                    </label>
                  </div>
                ) : (
                  /* ID Preview Card */
                  <div className="bg-white rounded-xl p-3.5 border border-emerald-300 flex items-center justify-between gap-3 animate-fadeIn">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-14 h-12 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100 shrink-0">
                        <Image
                          src={idPreviewUrl}
                          alt="Government ID Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          {idType}
                        </span>
                        <p className="text-xs font-extrabold text-zinc-900 truncate">
                          {idFileName}
                        </p>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {idFileSize} • Ready for verification
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveId}
                      className="p-2 rounded-xl bg-zinc-100 hover:bg-rose-100 text-zinc-600 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                      title="Remove and upload different ID"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Error Banner */}
                {idError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{idError}</span>
                  </div>
                )}

                {/* Privacy & Anti-Bogus Notice */}
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Your ID is protected and solely used by Pak na Pak staff to verify table bookings.
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-pak-yellow hover:bg-pak-yellow-hover text-pak-black font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer min-h-[44px]"
                >
                  <Calendar className="w-5 h-5 stroke-[2.3]" />
                  <span>
                    Submit Table Reservation & Verify ID ({currentBranch.town})
                  </span>
                </button>
                <p className="text-[11px] text-zinc-500 text-center mt-1.5">
                  Submitting generates your reservation reference code and sends your booking details to {currentBranch.name}.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
