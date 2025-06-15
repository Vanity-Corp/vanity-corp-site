import React from "react";
import { FocusCards } from "./ui/focus-cards";
import { Description } from "@radix-ui/react-toast";
import { link } from "fs";

export function WorkFocusCards() {
  return <FocusCards cards={realisations} />;
}
export const realisations = [
  {
    title: "COMBO 360",
    src: "/img/Combo360realisations.webp",
    description:
      "On gère tout, de la conception à la publication ! Pour le concept “1€ to be a chef”, on a imaginé, tourné, monté et promu la vidéo pour l’association, mettant en avant leur campagne “1€ = 1 repas”.",
    link: "https://youtu.be/Q9kkYBtzoqw?si=iJI3JEKmlNDpi37Y",
  },
  {
    title: "EXPERIENCE SOCIALE",
    src: "/img/experience-sociale-screenshot.webp",
    description:
      "On organise des expériences sociales filmées, comme l’installation d’un frigo à Châtelet où, avec l’aide d’un influenceur, on demande aux passants d’acheter de la nourriture pour les plus démunis.",
    link: "https://youtu.be/-Mi9ZGXi6CA?si=00a4uwmoNsfXSqf2",
  },
  {
    title: "CLIPS MUSICAUX",
    src: "/img/clips-musicauxscreenshot.webp",
    description:
      "On crée et réalise vos clips musicaux de A à Z, du scénario au montage final, comme celui de Fally Ipupa.",
    link: "https://www.youtube.com/watch?v=wtnoCLyCaC8",
  },
  {
    title: "EVIDÉO INSTITUTIONNELLE",
    src: "/img/video-institutiionelle-screenshot.webp",
    description:
      "On réalise des vidéos récapitulatives d’événements, comme la conférence organisée par le CMDA au Sénat.",
    link: "https://youtu.be/tRFIaqob8w4",
  },
  {
    title: "CONTENU RÉSEAUX SOCIAUX",
    src: "/img/Portfolio Contenu Réseaux sociaux.webp",
    description:
      "On produit des vidéos rapides et engageantes, comme celles où un chef donne son avis sur différents plats, parfaites pour vos réseaux sociaux.",
    link: "",
  },
  {
    title: "ACCOMPAGNEMENT STRATÉGIQUE",
    src: "/img/Portfolio Accompagnement Stratégique Vanity.webp",
    description:
      "On vous accompagne dans la définition et la mise en œuvre de votre stratégie de communication pour maximiser votre impact.",
    link: "",
  },
  {
    title: "SITE INTERNET",
    src: "/img/Portfolio Site internet Vanity.webp",
    description:
      "On crée des sites web sur mesure, adaptés à vos besoins spécifiques et à votre secteur d’activité.",
    link: "",
  },
  {
    title: "GRAPHISME",
    src: "/img/Portfolio Graphisme Vanity.webp",
    description:
      "On conçoit votre identité visuelle, de la charte graphique au logo, en fonction de votre image et de vos attentes.",
    link: "",
  },
  {
    title: "SHOOTING PHOTO",
    src: "/img/Portfolio Shooting Photo Vanity.webp",
    description:
      "On sublime vos produits et vos événements avec des photos professionnelles qui capturent l’essence de votre marque, pour renforcer votre identité visuelle et maximiser votre impact. ",
    link: "",
  },
];
