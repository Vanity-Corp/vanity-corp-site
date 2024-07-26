import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { HeroHighlight } from "@/components/ui/hero-highlight";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600"] });

export const metadata: Metadata = {
  title: "Vanitiy corp | Agence de communication créative 360",
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
