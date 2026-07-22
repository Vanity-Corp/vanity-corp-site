import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cmsMetadata } from "@/lib/cmsMetadata";

export function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("realisations", {
    title: "Nos réalisations | Portfolio Vanity Corp",
    description:
      "Découvrez nos projets et réalisations audiovisuelles et créatives.",
  });
}

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
