import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cmsMetadata } from "@/lib/cmsMetadata";

export function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("audiovisuel", {
    title: "Production audiovisuelle : vidéo, photo, montage | Vanity Corp",
    description:
      "Production vidéo et photo, du concept à la livraison multi-format pour tous vos contenus.",
  });
}

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
