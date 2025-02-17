import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import HideNavbar from "@/components/HideNavbar";
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
        <HideNavbar>
          <Navbar />
        </HideNavbar>

        <div className="flex flex-row">
          <HideNavbar>
            <Sidebar />{" "}
          </HideNavbar>
          {children}
        </div>
      </body>
    </html>
  );
}
