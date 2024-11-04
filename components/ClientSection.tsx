"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Nayra",
    designation: "",
    image: "/clients/Nayra.webp",
  },
  {
    id: 2,
    name: "Nej",
    designation: "",
    image: "/clients/Nej.webp",
  },
  {
    id: 3,
    name: "Raska",
    designation: "",
    image: "/clients/Raska.webp",
  },
  {
    id: 4,
    name: "Redouane Bh",
    designation: "",
    image: "/clients/REDOUANE_BH.webp",
  },
  {
    id: 5,
    name: "Rose Ameziane",
    designation: "",
    image: "/clients/Rose_ameziane.webp",
  },
  {
    id: 6,
    name: "Siham Bengoua",
    designation: "",
    image: "/clients/Siham_Bengoua.webp",
  },
  {
    id: 7,
    name: "Willaxxx",
    designation: "",
    image: "/clients/Willaxxx.webp",
  },
  {
    id: 8,
    name: "Willy Denzey",
    designation: "",
    image: "/clients/WILLY_Denzey.webp",
  },
  {
    id: 9,
    name: "Doria",
    designation: "",
    image: "/clients/Doria.webp",
  },
  {
    id: 10,
    name: "Fally Ipupa",
    designation: "",
    image: "/clients/Fally_Ipupa.webp",
  },
  {
    id: 11,
    name: "Houssbad",
    designation: "",
    image: "/clients/Houssbad.webp",
  },
  {
    id: 12,
    name: "Karim Zeribi",
    designation: "",
    image: "/clients/Karim_Zeribi.webp",
  },
  {
    id: 13,
    name: "Nabil Absi",
    designation: "",
    image: "/clients/Nabil_Absi.webp",
  },
  {
    id: 14,
    name: "Nassi",
    designation: "",
    image: "/clients/Nassi.webp",
  },
];

export function ClientSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      <AnimatedTooltip items={people} />
    </div>
  );
}
