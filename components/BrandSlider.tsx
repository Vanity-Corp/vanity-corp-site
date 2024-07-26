"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function BrandSlider() {
  return <InfiniteMovingCards items={testimonials} />;
}

const testimonials = [
  {
    image: "/img/BABY-TO-LOVE-NEW-logo-e1698713347997.webp",
    name: "BABY TO LOVE",
  },
  {
    image: "/img/logo-cmi-france.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/logo-ecole-ducasse.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/logo-elektra-records.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/logo-fally-ipupa.webp",
    name: "Winston Smith",
  },
  {
    image: "/img/logo-hawaya.webp",
    name: "Winston Smith",
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
