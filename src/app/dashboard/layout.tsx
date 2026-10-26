import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pak na Pak Store Intelligence | Private Management Portal",
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-zinc-950 text-white selection:bg-pak-yellow selection:text-black">{children}</div>;
}
