import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cmsMetadata } from "@/lib/cmsMetadata";

export function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("estimation", {
    title: "Estimation gratuite de votre projet | Vanity Corp",
    description:
      "Obtenez une estimation gratuite et personnalisée pour votre projet en quelques étapes.",
  });
}

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
