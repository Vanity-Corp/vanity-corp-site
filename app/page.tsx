"use client";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import HeaderCarousel from "@/components/HeaderCarousel";
import GlobeContainer from "@/components/globeContainer";
import { Button } from "@/components/ui/button";
import StackedCard from "@/components/ui/stacked";
import { ExpertiseTabs } from "@/components/expertiseTabs";
import { HighlightedText } from "@/components/higlightedText";
import { GeneratedText } from "@/components/GenerateTextSection";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/AnimatedButton";
import { Meteors } from "@/components/ui/meteors";
import { WorksGrid } from "@/components/WorksGrid";
import VideoTabs from "@/components/VideoTabs";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import VaniTeam from "@/components/VaniTeam";
import { BrandSlider } from "@/components/BrandSlider";
import { News } from "@/components/News";

export default function Home() {
  return (
    <main className="w-[97%] ">
      <header className="h-dvh flex  flex-col justify-end w-full">
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

      <section className="flex flex-col items-center justify-center h-screen w-full">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{ once: true }}
          className="text-center text-xl md:text-5xl font-bold text-black dark:text-white pt-10"
        >
          LE MONDE EST DANS NOS CARTES SD
        </motion.h2>
        <div className="flex pl-32 flex-row items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center gap-[2rem] h-full w-1/3">
            <motion.p
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="text-base md:text-2xl font-normal text-neutral-700 dark:text-neutral-200 mt-2 "
            >
              On ne sait pas si l’herbe est plus verte ailleurs mais nos caméras
              la filmeront !<br />
              <br /> nous intervenons dans toute l’Europe et et là ou vos
              projets nous emmènent
            </motion.p>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <Button className="rounded-full uppercase">
                J’ai un projet À L’ÉTRANGER
              </Button>
            </motion.div>
          </div>
          <GlobeContainer />
        </div>
      </section>
      <section className="flex flex-col gap-6 justify-center items-center h-screen w-full">
        <div className=" w-auto relative ">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800  py-8 h-full overflow-hidden rounded-2xl flex flex-col gap-6">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              viewport={{ once: true }}
              className="text-center text-xl md:text-5xl font-bold text-black dark:text-white z-50"
            >
              Prêt à nous parler de
              <br /> votre projet ?
            </motion.h1>

            <GeneratedText
              className="text-base text-gray-400 text-center z-50"
              text="Notre équipe est à votre disposition, pour faire le point
sur vos besoins et sur vos enjeux !"
            />
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.5,
              }}
              className="z-50"
            >
              <AnimatedButton />
            </motion.div>

            {/* Meaty part - Meteor effect */}
            <Meteors number={20} />
          </div>
        </div>
      </section>
      <HighlightedText />
      <WorksGrid />
      <section className="w-full flex flex-col gap-10 justify-center items-center h-screen">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{ once: true }}
          className="text-center uppercase text-xl md:text-5xl font-bold text-black dark:text-white pt-10"
        >
          Nos réalisations en vidéo
        </motion.h2>
        <VideoTabs />
        <HoverBorderGradient className="flex gap-2 items-center">
          Je veux une video{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </HoverBorderGradient>
      </section>
      <section className="w-full flex flex-col gap-10 justify-center items-center h-screen">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{ once: true }}
          className="text-left text-xl md:text-5xl font-bold text-black dark:text-white pt-10"
        >
          LA VANITEAM{" "}
        </motion.h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-[125%]"
        >
          <CarouselContent>
            <VaniTeam
              name="Antoine"
              picture="/img/ANTOINE.webp"
              presentation="L'âme stratégique de Vanity Corp, il est expert en gestion de projets et d'équipes. Ses compétences couvrent le montage, l'écriture de scripts, la création de contenu, le marketing d'influence, la négociation client et la gestion budgétaire. Il veille à la bonne conduite de chaque projet, de la conception à la réalisation."
            />
            <VaniTeam
              name="Yahia"
              picture="/img/yahia.webp"
              presentation="L'âme stratégique de Vanity Corp, il est expert en gestion de projets et d'équipes. Ses compétences couvrent le montage, l'écriture de scripts, la création de contenu, le marketing d'influence, la négociation client et la gestion budgétaire. Il veille à la bonne conduite de chaque projet, de la conception à la réalisation."
            />
            <VaniTeam
              name="Yanis"
              picture="/img/Yanis.webp"
              presentation="L'âme stratégique de Vanity Corp, il est expert en gestion de projets et d'équipes. Ses compétences couvrent le montage, l'écriture de scripts, la création de contenu, le marketing d'influence, la négociation client et la gestion budgétaire. Il veille à la bonne conduite de chaque projet, de la conception à la réalisation."
            />
            <VaniTeam
              name="Remy"
              picture="/img/rEMY.webp"
              presentation="L'âme stratégique de Vanity Corp, il est expert en gestion de projets et d'équipes. Ses compétences couvrent le montage, l'écriture de scripts, la création de contenu, le marketing d'influence, la négociation client et la gestion budgétaire. Il veille à la bonne conduite de chaque projet, de la conception à la réalisation."
            />
            <VaniTeam
              name="Zak"
              picture="/img/Zak.webp"
              presentation="L'âme stratégique de Vanity Corp, il est expert en gestion de projets et d'équipes. Ses compétences couvrent le montage, l'écriture de scripts, la création de contenu, le marketing d'influence, la négociation client et la gestion budgétaire. Il veille à la bonne conduite de chaque projet, de la conception à la réalisation."
            />
            <VaniTeam
              name="Kenza"
              picture="/img/KENZA.webp"
              presentation="L'âme stratégique de Vanity Corp, il est expert en gestion de projets et d'équipes. Ses compétences couvrent le montage, l'écriture de scripts, la création de contenu, le marketing d'influence, la négociation client et la gestion budgétaire. Il veille à la bonne conduite de chaque projet, de la conception à la réalisation."
            />
          </CarouselContent>
        </Carousel>
      </section>
      <section className="w-full flex flex-col gap-10 justify-center items-center h-screen">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{ once: true }}
          className="text-left text-xl uppercase   md:text-5xl font-bold text-black dark:text-white pt-10"
        >
          IlS nous ont fait confiance
        </motion.h2>

        <BrandSlider />
      </section>
      <section className="w-full flex flex-col gap-10 justify-center items-center h-screen">
        <News />
      </section>
    </main>
  );
}
