"use client";
import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
export const artistClients = [
  {
    id: 1,
    name: "Nayra",
    image: "/clients/Nayra.webp",
  },
  {
    id: 2,
    name: "Nej",
    image: "/clients/Nej.webp",
  },
  {
    id: 3,
    name: "Raska",
    image: "/clients/Raska.webp",
  },
  {
    id: 4,
    name: "Redouane Bh",
    image: "/clients/REDOUANE_BH.webp",
  },
  {
    id: 5,
    name: "Rose Ameziane",
    image: "/clients/Rose_ameziane.webp",
  },
  {
    id: 6,
    name: "Siham Bengoua",
    image: "/clients/Siham_Bengoua.webp",
  },
  {
    id: 7,
    name: "Willaxxx",
    image: "/clients/Willaxxx.webp",
  },
  {
    id: 8,
    name: "Willy Denzey",
    image: "/clients/WILLY_Denzey.webp",
  },
  {
    id: 9,
    name: "Doria",
    image: "/clients/Doria.webp",
  },
  {
    id: 10,
    name: "Fally Ipupa",
    image: "/clients/Fally_Ipupa.webp",
  },
  {
    id: 11,
    name: "Houssbad",
    image: "/clients/Houssbad.webp",
  },
  {
    id: 12,
    name: "Karim Zeribi",
    image: "/clients/Karim_Zeribi.webp",
  },
  {
    id: 13,
    name: "Nabil Absi",
    image: "/clients/Nabil_Absi.webp",
  },
  {
    id: 14,
    name: "Nassi",
    image: "/clients/Nassi.webp",
  },
];

export function ClientSection() {
  const firstRow = artistClients.slice(0, 7);
  const secondRow = artistClients.slice(7);

  return (
    <div className="w-full space-y-3 overflow-hidden">
      <InfiniteMovingCards direction="right" speed="normal" items={firstRow} />
      <InfiniteMovingCards direction="left" speed="normal" items={secondRow} />
    </div>
  );
}
