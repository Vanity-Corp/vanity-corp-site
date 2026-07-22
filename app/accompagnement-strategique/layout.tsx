import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cmsMetadata } from "@/lib/cmsMetadata";

export function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("accompagnement", {
    title: "Accompagnement stratégique & community management | Vanity Corp",
    description:
      "Audit digital, stratégie de contenu et community management pour développer durablement votre marque.",
  });
}

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
