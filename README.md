# Pak na Pak — Restaurant & Digital Ordering Web Platform

> **"Sulit sa Sarap. Busog Ka."**  
> Official modern web platform for **Pak na Pak**, a beloved local food business located in **San Jose de Buenavista, Antique, Philippines**.

[![Next.js](https://img.shields.io/badge/Next.js-16%20(Turbopack)-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel Live](https://img.shields.io/badge/Vercel-Live_Production-success?style=flat&logo=vercel)](https://pak-na-pak.vercel.app)
[![Live URL](https://img.shields.io/badge/Website-pak--na--pak.vercel.app-FFC700?style=flat&labelColor=111111)](https://pak-na-pak.vercel.app)
[![Location](https://img.shields.io/badge/Location-San_Jose,_Antique-FFC700?style=flat&labelColor=111111)](https://www.google.com/maps)

---

## 🍗 About Pak na Pak

Pak na Pak is Antique's destination for crispy fried chicken with 12 signature glazes, wok-tossed chao fan, sizzling hot plates, barkada take-out bundles, and unlimited Korean-style samgyupsal grill feasts.

---

## ✨ Features

- **🟡 Bold Yellow & Black Visual System:** Brand-authentic colors (`#FFC700`, `#111111`, `#FAF6ED`) with punchy typography and fast-casual food energy.
- **✨ 12 Signature Chicken Glazes:** Interactive flavor tasting cards for Garlic Parmesan, Spicy Buffalo, Salted Egg, Classic Orange Glazed, Honey Glazed, Korean BBQ, and more.
- **🍛 ₱99 Sulit Zone & Chao Fan:** Pak Meal (3 pcs chicken + rice), Full Pak Meal (2 pcs + pasta + rice), Siomai Chao Fan, Shanghai Chao Fan, and Sizzling Sisig.
- **🥩 Unlimited Samgyupsal Grill:** Side-by-side interactive comparison of Set A (₱249), Set B (₱299), and Set C (₱499) with 8 side dishes and melted cheese dip.
- **🛒 Interactive Order Bag & Glaze Customizer:** Customers can choose glazes, pasta choices, sauce dips, and special notes with live subtotal calculation.
- **💬 1-Click Facebook Messenger Order Bridge:** Generates an automated, pre-formatted order summary ready to send straight to the restaurant's Facebook Messenger.
- **📸 Original Physical Menu Scans Viewer:** High-resolution zoomable gallery showcasing the real printed menu cards.
- **📅 Table Reservation & Inquiry Form:** Advance bookings for barkadas, birthdays, and family dinners.
- **🛠️ Admin dashboard:** Isolated in `apps/admin` for local development only. Do not deploy it until the separate admin-access module replaces the demo PIN/localStorage authentication.
- **📱 Mobile-First Sticky Action Bar:** Persistent quick-access bar with 44px+ touch targets for calling, menu navigation, and cart checkout.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Partial Prefetching)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/) (Strict SVG — zero emojis as icons)
- **Interactivity:** [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Language:** TypeScript
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9+ (required by the installed Next.js version)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kylho1231/pak-na-pak.git

# Navigate to project directory
cd pak-na-pak

# Install dependencies
npm install

# Start the customer app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Workspace commands

```bash
# Customer app
npm run dev:customer
npm run build:customer
npm run start:customer

# Admin app (local development only; do not deploy yet)
npm run dev:admin
npm run build:admin
npm run start:admin
```

The customer and admin apps are separate Next.js workspaces. Shared menu data and contracts live in `packages/shared`. Each app can also be run directly with npm's `--workspace` option, for example `npm run build --workspace @pak-na-pak/admin`.

### Vercel projects

Configure each app as a separate Vercel project connected to this repository. Vercel's monorepo support uses the repository's npm workspace definition and root lockfile.

| App | Root Directory | Build Command | Deployment status |
| --- | --- | --- | --- |
| Customer | `apps/customer` | `npm run build` | Ready for a separate customer project |
| Admin | `apps/admin` | `npm run build` | **Keep disabled. Do not create or enable a public deployment until secure admin authentication is implemented and the `admin-access` module is approved.** |

Keep the Vercel install command auto-detected from the root `package-lock.json`; do not use a filtered install that omits `@pak-na-pak/shared`. Leave the output-directory setting at its Next.js default.

See Vercel's [monorepo deployment guide](https://vercel.com/docs/monorepos) and [Root Directory build setting](https://vercel.com/docs/builds/configure-a-build#root-directory).

### Workspace and route-boundary check

After building both workspaces, run the focused production-boundary check:

```bash
npm run typecheck
npm run test:workspace
```

It verifies the generated route manifests keep the dashboard out of the customer app and that the existing Messenger handoff remains wired.

---

## 📍 Store Information

- **Location:** San Jose de Buenavista, 5700 Antique, Philippines
- **Landmark:** Town Center, near EBJ Freedom Park & Provincial Capitol
- **Hours:** 10:00 AM – 9:00 PM Daily (Samgyupsal & Dine-in until 9:30 PM)
- **Services:** Dine-In, Take-Out, Delivery & Event Reservations

---

## 📄 License

Created for **Pak na Pak** — San Jose, Antique.
