import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import OrderDrawer from "@/components/order/OrderDrawer";
import MenuScanModal from "@/components/menu/MenuScanModal";
import AdminModal from "@/components/admin/AdminModal";
import DeliveryRidersModal from "@/components/delivery/DeliveryRidersModal";
import TableReservationModal from "@/components/reservation/TableReservationModal";
import PakAiAssistant from "@/components/ai/PakAiAssistant";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFC700",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Pak na Pak | Sulit sa Sarap, Busog Ka! - San Jose, Antique",
  description:
    "Official website of Pak na Pak in San Jose, Antique. Famous for ₱99 crispy fried chicken meals, 12 signature flavors, sizzling plates, chao fan, samgyupsal, and unlimited barkada feasts.",
  keywords: [
    "Pak na Pak",
    "Pak na Pak Antique",
    "San Jose Antique Restaurant",
    "Fried Chicken San Jose Antique",
    "Unli Chicken Antique",
    "Samgyupsal Antique",
    "Chao Fan Antique",
    "Sizzling Sisig Antique",
    "Sulit Meals Antique",
  ],
  authors: [{ name: "Pak na Pak Restaurant" }],
  openGraph: {
    title: "Pak na Pak | Sulit sa Sarap, Busog Ka! - San Jose, Antique",
    description:
      "Crispy fried chicken, 12 glazes, sizzling sisig, chao fan, and unlimited feasts. Dine-in, take-out & delivery in San Jose, Antique.",
    url: "https://paknapak.vercel.app",
    siteName: "Pak na Pak",
    locale: "en_PH",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${plusJakarta.variable} scroll-smooth w-full max-w-full overflow-x-hidden`}
    >
      <body className="min-h-screen bg-pak-cream text-pak-black font-body antialiased flex flex-col selection:bg-pak-yellow selection:text-pak-black w-full max-w-full overflow-x-hidden relative">
        <AdminProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
            <Footer />
            <StickyMobileBar />
            <OrderDrawer />
            <DeliveryRidersModal />
            <TableReservationModal />
            <MenuScanModal />
            <AdminModal />
            <PakAiAssistant />
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
