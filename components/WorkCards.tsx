import React from "react";
import { FocusCards } from "./ui/focus-cards";

export function WorkFocusCards() {
  return <FocusCards cards={realisations} />;
}
export const realisations = [
  {
    title: "COMBO 360",
    src: "/img/Combo360realisations.webp",
  },
  {
    title: "EXPERIENCE SOCIALE",
    src: "/img/experience-sociale-screenshot.webp",
  },
  {
    title: "CLIPS MUSICAUX",
    src: "/img/clips-musicauxscreenshot.webp",
  },
  {
    title: "EVIDÉO INSTITUTIONNELLE",
    src: "/img/video-institutiionelle-screenshot.webp",
  },
  {
    title: "CONTENU RÉSEAUX SOCIAUX",
    src: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "ACCOMPAGNEMENT STRATÉGIQUE",
    src: "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "SITE INTERNET",
    src: "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "GRAPHISME",
    src: "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "SHOOTING PHOTO",
    src: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
];
