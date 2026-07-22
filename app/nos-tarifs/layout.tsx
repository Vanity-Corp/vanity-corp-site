import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cmsMetadata } from "@/lib/cmsMetadata";

export function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("tarifs", {
    title: "Nos tarifs | Vanity Corp",
    description:
      "Découvrez nos offres et tarifs pour vos projets créatifs et audiovisuels.",
  });
}

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
