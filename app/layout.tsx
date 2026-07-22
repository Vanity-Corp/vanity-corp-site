import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { getSiteSettings } from "@/lib/payload-cms";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vanity corp | Agence de communication créative 360",
  description:
    "Tout buzzer pour donner de la visibilité à votre projet est un savoir faire. Vanity Corp est une agence de communication créative 360.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const gaId =
    settings?.analytics?.gaMeasurementId || process.env.GOOGLE_ANALYTICS || "";

  return (
    <html lang="fr" className="dark">
      <GoogleAnalytics GA_MEASUREMENT_ID={gaId} />

      <body className={montserrat.className}>
        {/* Provide modal context globally */}

        <Navbar />
        <div className="flex flex-row">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
