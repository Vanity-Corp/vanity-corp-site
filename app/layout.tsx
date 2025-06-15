import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { HeroHighlight } from "@/components/ui/hero-highlight";

import { Footer } from "@/components/Footer";
import BannerSlider from "@/components/BannerSlider";
import Head from "next/head";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";
const montserrat = Montserrat({ subsets: ["latin"], weight: ["600"] });

export const metadata: Metadata = {
  title: "Vanity corp | Agence de communication créative 360",
  description:
    "Tout buzzer pour donner de la visibilité à votre projet est un savoir faire. Vanity Corp est une agence de communication créative 360.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <GoogleAnalytics GA_MEASUREMENT_ID={`${process.env.GOOGLE_ANALYTICS}`} />

      <body className={montserrat.className}>
        <Navbar />
        <div className="flex flex-row">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
