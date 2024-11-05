"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Nayra",
    link: "https://www.instagram.com/nayra932/",
    image: "/clients/Nayra.webp",
  },
  {
    id: 2,
    name: "Nej",
    link: "https://www.youtube.com/channel/UCD_MrT_8bODobOFp6SlrEQQ",
    image: "/clients/Nej.webp",
  },
  {
    id: 3,
    name: "Raska",
    link: "https://www.youtube.com/c/RASKA_mp4",
    image: "/clients/Raska.webp",
  },
  {
    id: 4,
    name: "Redouane Bh",
    link: "https://www.instagram.com/redouanebh/",
    image: "/clients/REDOUANE_BH.webp",
  },
  {
    id: 5,
    name: "Rose Ameziane",
    link: "https://www.instagram.com/roseameziane/?hl=fr",
    image: "/clients/Rose_ameziane.webp",
  },
  {
    id: 6,
    name: "Siham Bengoua",
    link: "https://www.instagram.com/sihambengoua/?hl=fr",
    image: "/clients/Siham_Bengoua.webp",
  },
  {
    id: 7,
    name: "Willaxxx",
    link: "https://www.instagram.com/lewillaxxx/",
    image: "/clients/Willaxxx.webp",
  },
  {
    id: 8,
    name: "Willy Denzey",
    link: "https://www.instagram.com/iamwillydenzey/",
    image: "/clients/WILLY_Denzey.webp",
  },
  {
    id: 9,
    name: "Doria",
    link: "https://www.instagram.com/doriado_do/",
    image: "/clients/Doria.webp",
  },
  {
    id: 10,
    name: "Fally Ipupa",
    link: "https://www.youtube.com/user/fallyipupa",
    image: "/clients/Fally_Ipupa.webp",
  },
  {
    id: 11,
    name: "Houssbad",
    link: "https://www.instagram.com/houssbad/?hl=fr",
    image: "/clients/Houssbad.webp",
  },
  {
    id: 12,
    name: "Karim Zeribi",
    link: "https://www.instagram.com/karim.zeribi/",
    image: "/clients/Karim_Zeribi.webp",
  },
  {
    id: 13,
    name: "Nabil Absi",
    link: "https://www.youtube.com/@NabilAbsi",
    image: "/clients/Nabil_Absi.webp",
  },
  {
    id: 14,
    name: "Nassi",
    link: "https://www.instagram.com/nassiofficiel/?hl=fr",
    image: "/clients/Nassi.webp",
  },
];

export function ClientSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20">
      <AnimatedTooltip items={people} />
    </div>
  );
}
