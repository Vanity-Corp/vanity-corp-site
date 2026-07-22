import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cmsMetadata } from "@/lib/cmsMetadata";

export function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("contact", {
    title: "Contactez-nous | Vanity Corp",
    description: "Parlons de votre projet. Contactez l’équipe Vanity Corp.",
  });
}

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
