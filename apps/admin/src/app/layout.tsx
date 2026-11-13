import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import { AdminProvider } from "@/context/AdminContext";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Pak na Pak Admin | Private Management Portal",
  description: "Internal store analytics, inventory management, and courier dispatches.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
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
      className={`${montserrat.variable} ${plusJakarta.variable} w-full max-w-full overflow-x-hidden`}
    >
      <body className="min-h-screen bg-zinc-950 text-white font-body antialiased selection:bg-pak-yellow selection:text-black">
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
