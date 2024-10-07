"use client";
import React from "react";
import { Carousel, CarouselContent } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import HeaderCarousel from "./HeaderCarousel";

const headerCarouselData = [
  {
    background: "bg-[url('/img/DORIA.webp')]",
    title: (
      <span>
        PRODUCTION <br /> AUDIOVISUELLE
      </span>
    ),
    description: "De l’idéation à la publication",
    list: [
      "Production exécutive",
      "Cadrage",
      "Montage",
      "Étalonnage",
      "Sound FX",
      "Voix off",
    ],
  },
  {
    background: "bg-[url('/img/banner-2.png')]",
    title: (
      <span>
        COMMUNITY <br /> MANAGEMENT
      </span>
    ),
    description: "De l’idéation à la publication",
    list: [
      "Animation de réseaux sociaux",
      "Création de contenu",
      "Conception / rédaction",
      "Modération",
      "Reporting",
    ],
  },
  {
    background: "bg-[url('/img/Shooting_Les_Frangines.webp')]",
    title: <span>SHOOTING PHOTO</span>,
    description: "De l’idéation à la publication",
    list: [
      "Shooting produits",
      "Shooting studio",
      "Photos portraits",
      "Photos de mariage",
      "Photos d’événement",
    ],
  },
  {
    background: "bg-[url('/img/banner-2.png')]",
    title: "GRAPHISME",
    description: "De l’idéation à la publication",
    list: [
      "Charge graphique",
      "Papeterie",
      "Affichages",
      "Maquettes web",
      "Infographies",
    ],
  },
  {
    background: "bg-[url('/img/devweb.webp')]",
    title: (
      <span>
        DÉVELOPPEMENT <br />
        WEB
      </span>
    ),
    description: "De l’idéation à la publication",
    list: [
      "Création de site web",
      "Landing page",
      "Maintenance",
      "Conception UX/UI Design",
      "SEO : Référencement naturel",
    ],
  },
];

function BannerSlider() {
  return (
    <header className="h-dvh flex flex-col justify-end w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full h-full flex flex-col justify-center"
      >
        <CarouselContent>
          {headerCarouselData.map((item, index) => (
            <HeaderCarousel
              key={index} // Use a unique key; if available, use a unique id
              background={item.background}
              title={item.title}
              description={item.description}
              list={item.list}
            />
          ))}
        </CarouselContent>
      </Carousel>
    </header>
  );
}

export default BannerSlider;
