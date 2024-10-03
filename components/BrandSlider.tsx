"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function BrandSlider() {
  return (
    <>
      <InfiniteMovingCards direction="right" items={testimonials} />
      <InfiniteMovingCards direction="left" items={testimonials2} />
    </>
  );
}

const testimonials = [
  {
    image: "/img/BABY-TO-LOVE-NEW-logo-e1698713347997.webp",
    name: "BABY TO LOVE",
  },
  {
    image: "/img/Logo_Marionnaud.png",
    name: "Marionnaud",
  },
  {
    image: "/img/LOGO_BUSINESS_CLUB_BYCMDA_WHITE.png",
    name: "business club by cmda",
  },
  {
    image: "/img/Logo Fraikin.png",
    name: "fraikin",
  },
  {
    image: "/img/logo-cmi-france.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/arca.webp",
    name: "Arca Group Energy",
  },
  {
    image: "/img/ouverture.webp",
    name: "ouverture serrurrie",
  },
  {
    image: "/img/piatto.webp",
    name: "piatto pizza",
  },
  {
    image: "/img/legal.webp",
    name: "legal euro corp",
  },
  {
    image: "/img/logo-ecole-ducasse.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/logo-elektra-records.webp",
    name: "Winston Smith",
  },
];
const testimonials2 = [
  {
    image: "/img/logo-fally-ipupa.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/Logo douceur elegance.png",
    name: "Douceur elegance",
  },
  {
    image: "/img/Logo dat schaub.png",
    name: "Dat Schaub",
  },
  {
    image: "/img/logo-fally-ipupa.webp",
    name: "Fally ipupa",
  },
  {
    image: "/img/Logo Avekapeti.png",
    name: "Avekapeti",
  },
  {
    image: "/img/cropped-logo-CMDA-blanc-final.png",
    name: "Logo cmda ",
  },
  {
    image: "/img/logo-Interfimo.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/logo-wizbii.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/logo-life.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/Cloudb_White-logo-e1698713329665.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/BTL-DIFFUSION-LOGO-detoure-e1698713303907.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/Logo_little_big_friends_FINAL_white-e1698713157411.webp",
    name: "Winston Smith",
  },
];
