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
import { Globe } from "@/components/ui/globe";
import GlobeContainer from "@/components/globeContainer";
import { Button } from "@/components/ui/button";
import Stacked from "@/components/ui/stacked";
import StackedCard from "@/components/ui/stacked";
import { ExpertiseTabs } from "@/components/expertiseTabs";

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
      <StackedCard />
      <ExpertiseTabs />
      <section className="flex flex-col  items-center justify-center h-screen w-full">
        <h2 className="text-center text-xl md:text-5xl font-bold text-black dark:text-white pt-10">
          LE MONDE EST DANS NOS CARTES SD
        </h2>
        <div className="flex pl-32 flex-row items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center gap-[2rem] h-full w-1/3">
            <p className="text-base md:text-2xl font-normal text-neutral-700 dark:text-neutral-200 mt-2 ">
              On ne sait pas si l’herbe est plus verte ailleurs mais nos caméras
              la filmeront !<br />
              <br /> nous intervenons dans toute l’Europe et et là ou vos
              projets nous emmènent
            </p>
            <Button className="rounded-full uppercase">
              J’ai un projet À L’ÉTRANGER
            </Button>
          </div>
          <GlobeContainer />
        </div>
      </section>
    </main>
  );
}
