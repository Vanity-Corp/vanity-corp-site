"use client";
import React from "react";
import { Carousel, CarouselContent, type CarouselApi } from "./ui/carousel";
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
    background: "bg-[url('/img/design.webp')]",
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
    background: "bg-[url('/img/Computer_Four_Screens.webp')]",
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
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrentIndex(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };
  return (
    <header className="h-dvh flex flex-col justify-end w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 6000,
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
        <div className="flex absolute justify-center items-center inset-1/2 transform -translate-x-1/2 translate-y-[40dvh] w-52 bg-black/70 rounded-lg p-4 text-whit">
          {headerCarouselData.map((item, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full cursor-pointer ${
                currentIndex === index + 1
                  ? "bg-white"
                  : "bg-transparent border border-white"
              } mx-2`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </Carousel>
    </header>
  );
}

export default BannerSlider;
