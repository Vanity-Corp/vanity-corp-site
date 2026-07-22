import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cmsMetadata } from "@/lib/cmsMetadata";

export function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("studio", {
    title: "Studio photo, vidéo et podcast à Massy | Location studio 91",
    description:
      "Louez un studio photo, vidéo et podcast à Massy dans l’Essonne. Espace de 120m² équipé pour shootings, tournages, interviews, podcasts et contenus social media.",
    keywords: [
      "studio photo Massy",
      "location studio vidéo Massy",
      "studio podcast Massy",
      "location studio Essonne",
      "studio tournage 91",
      "lieu de tournage Massy",
      "shooting photo Massy",
    ],
  });
}

export default function StudioDeTournageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
