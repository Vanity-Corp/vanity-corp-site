"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

type BrandItem = { image: string; name: string };

// `row1`/`row2` are optional CMS-driven overrides; falls back to the built-in
// lists so behavior is unchanged until the home page passes real data (4c).
export function BrandSlider({
  row1,
  row2,
}: {
  row1?: BrandItem[];
  row2?: BrandItem[];
}) {
  return (
    <>
      <InfiniteMovingCards
        direction="right"
        items={row1 && row1.length ? row1 : testimonials}
      />
      <InfiniteMovingCards
        direction="left"
        items={row2 && row2.length ? row2 : testimonials2}
      />
    </>
  );
}

const testimonials = [
  {
    image: "/brands/Baby To love.webp",
    name: "BABY TO LOVE",
  },
  {
    image: "/brands/Marionnaud.webp",
    name: "Marionnaud",
  },
  {
    image: "/brands/Business club.webp",
    name: "business club by cmda",
  },
  {
    image: "/brands/Fraikin.webp",
    name: "fraikin",
  },
  {
    image: "/brands/CMI FRANCE.webp",
    name: "CMI France",
  },
  {
    image: "/brands/Arca-group-energy.webp",
    name: "Arca Group Energy",
  },
  {
    image: "/brands/OSS SERRURIE.webp",
    name: "ouverture serrurrie",
  },
  {
    image: "/brands/piatto.webp",
    name: "piatto pizza",
  },
  {
    image: "/brands/Legal Euro Corp.webp",
    name: "legal euro corp",
  },
  {
    image: "/brands/Ecole Ducasse.webp",
    name: "Ecole Ducasse",
  },
  {
    image: "/brands/Elektra.webp",
    name: "Elektra",
  },
];
const testimonials2 = [
  {
    image: "/brands/Fally Ipupa.webp",
    name: "Fally Ipupa",
  },
  {
    image: "/brands/Douceur et Elegance.webp",
    name: "Douceur et elegance",
  },
  {
    image: "/brands/Logo dat schaub.png",
    name: "Dat Schaub",
  },

  {
    image: "/brands/Avekapeti.webp",
    name: "Avekapeti",
  },
  {
    image: "/brands/CMDA.webp",
    name: "Logo cmda ",
  },
  {
    image: "/brands/Interfimo.webp",
    name: "Interfimo",
  },
  {
    image: "/brands/Wizbii.webp",
    name: "Wizbii",
  },
  {
    image: "/brands/Life.webp",
    name: "Life",
  },
  {
    image: "/brands/Cloud B .webp",
    name: "Cloud B",
  },
  {
    image: "/brands/BTL DIFFUSION.webp",
    name: "BTL DIFFUSION",
  },
  {
    image: "/brands/Little Big Friends.webp",
    name: "Little big friends",
  },
];
