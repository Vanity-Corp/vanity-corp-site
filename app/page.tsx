"use client";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeaderCarousel from "@/components/HeaderCarousel";

export default function Home() {
  return (
    <main className="w-[97%]">
      <header className="h-dvh flex flex-col justify-end  ">
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
            <HeaderCarousel
              background="bg-[url('/img/banner-1.png')]"
              title={
                <span>
                  PRODUCTION <br /> AUDIOVISUELLE
                </span>
              }
              description="De l’idéation à la publication"
              list={[
                "Production éxecutive",
                "Cadrage",
                "Montage",
                "Étalonnage",
                "Sound FX",
                "Voix off",
              ]}
            />
            <HeaderCarousel
              background="bg-[url('/img/banner-2.png')]"
              title={
                <span>
                  COMMUNITY <br /> MANAGEMENT
                </span>
              }
              description="De l’idéation à la publication"
              list={[
                "Animation de réseaux sociaux",
                "Création de contenu",
                "Conception / rédaction",
                "Modération",
                "Reporting",
              ]}
            />
            <HeaderCarousel
              background="bg-[url('/img/banner-1.png')]"
              title={<span>SHOOTING PHOTO</span>}
              description="De l’idéation à la publication"
              list={[
                "Shooting produits",
                "Shooting studio",
                "Photos portraits",
                "Photos de mariage",
                "Photos d’événement",
              ]}
            />
            <HeaderCarousel
              background="bg-[url('/img/banner-2.png')]"
              title="GRAPHISME"
              description="De l’idéation à la publication"
              list={[
                "Charge graphique",
                "Papeterie",
                "Affichages",
                "Maquettes web",
                "infographies",
              ]}
            />

            <HeaderCarousel
              background="bg-[url('/img/banner-1.png')]"
              title={
                <span>
                  DÉVELOPPEMENT <br />
                  WEB
                </span>
              }
              description="De l’idéation à la publication"
              list={[
                "Création de site web",
                "Landing page",
                "Maintenance",
                "Conception UX UI Design",
                "SEO : Référencement naturel",
              ]}
            />
          </CarouselContent>
        </Carousel>
      </header>
    </main>
  );
}
