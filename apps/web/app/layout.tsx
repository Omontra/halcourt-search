import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ThumbBar } from "@/components/ThumbBar";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Taylor Made Salcombe — A Curated Collection of Luxury Holiday Homes",
  description:
    "A curated collection of luxury self-catering holiday homes in Salcombe & the South Hams, Devon — with a complimentary personal concierge and private in-home catering.",
};

export const viewport: Viewport = {
  themeColor: "#0E1418",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-1/2 focus:top-0 focus:z-[200] focus:-translate-x-1/2 focus:rounded-b bg-gold px-[18px] py-[10px] font-sans text-[14px] tracking-[0.05em] text-[#221b0c]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="pb-[76px] sm:pb-0">
          {children}
        </main>
        <SiteFooter />
        <ThumbBar />
      </body>
    </html>
  );
}
