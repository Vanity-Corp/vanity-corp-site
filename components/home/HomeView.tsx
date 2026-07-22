"use client";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ExpertiseTabs } from "@/components/expertiseTabs";
import { HighlightedTextHome } from "@/components/HiglightedTextHome";
import { GeneratedText } from "@/components/GenerateTextSection";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Meteors } from "@/components/ui/meteors";
import VaniTeam from "@/components/VaniTeam";
import { BrandSlider } from "@/components/BrandSlider";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { VaniteamGrid } from "@/components/VaniyTeamGrid";
import { ClientSection } from "@/components/ClientSection";
import { PricingWithSwitch } from "@/components/ui/pricing-with-switch";
import { services } from "@/lib/services";
import BannerVideo from "@/components/ui/BannerVideo";
import ServiceSection from "@/components/ServiceSection";
import { WorldMapSection } from "@/components/WordMap";

type Brand = { image: string; name: string };
type Artist = { id: number; name: string; image: string; link: string };

type HomeViewProps = {
  brands1?: Brand[];
  brands2?: Brand[];
  artists?: Artist[];
};

export default function HomeView({ brands1, brands2, artists }: HomeViewProps) {
  return (
    <div
      className="md:w-[97%] w-full "
      style={{
        transition: "background-color 0.5s ease",
      }}
    >
      {" "}
      <BannerVideo
        src="/videos/SHOWREEL 2025_2026_V6SQ2.mp4"
        poster="/fallback.webp"
      />
      <section className="w-full px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-violet-300">
              À propos
            </p>
            <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
              Une équipe créative, stratégique et terrain.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
              Vanity Corp réunit stratégie, production audiovisuelle, création
              de contenu et studio de tournage pour transformer une idée en
              contenu prêt à performer.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                "Brief clair",
                "Production agile",
                "Livraison multi-format",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 ">
            {[
              "camera.png",
              "story board.png",
              "director Chair.png",
              "lighting.png",
              "microphone.png",
              "film reel.png",
            ].map((icon) => (
              <div
                key={icon}
                className="flex aspect-square items-center justify-center rounded-3xl border border-white/10 bg-black/25 p-4"
              >
                <Image
                  src={`/newicones/${icon}`}
                  alt="Icône production Vanity Corp"
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceSection services={services} />
      <section
        /*  ref={targetRef} */
        className="flex flex-col justify-center items-center w-full "
      >
        {" "}
        <ExpertiseTabs />{" "}
      </section>{" "}
      <section className="w-full flex flex-col gap-8 justify-center items-center py-16 md:py-24">
        {" "}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:text-left text-center text-xl uppercase md:px-4 md:text-5xl font-bold text-black dark:text-white pt-10"
        >
          {" "}
          Ils nous ont fait confiance{" "}
        </motion.h2>{" "}
        <BrandSlider row1={brands1} row2={brands2} />{" "}
      </section>{" "}
      <section className="flex flex-col items-center justify-center w-full pb-20">
        {" "}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:text-left text-center text-xl uppercase md:px-4 md:text-5xl font-bold text-black dark:text-white pt-10 mb-20"
        >
          {" "}
          Artistes & talents accompagnés{" "}
        </motion.h2>{" "}
        <ClientSection clients={artists} />{" "}
      </section>{" "}
      <section className="flex flex-col items-center justify-center w-full">
        {" "}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-xl md:text-5xl font-bold text-black dark:text-white pt-10"
        >
          {" "}
          LE MONDE EST DANS NOS CARTES SD{" "}
        </motion.h2>{" "}
        <WorldMapSection />
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          {" "}
          <div className="flex flex-col items-center justify-center">
            {" "}
            <motion.p
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="text-base md:text-2xl text-center font-normal text-neutral-700 dark:text-neutral-200 mt-2 p-5"
            >
              {" "}
              On ne sait pas si l’herbe est plus verte ailleurs mais nos caméras
              la filmeront !<br /> <br /> nous intervenons dans toute l’Europe
              et là ou vos projets nous emmènent{" "}
            </motion.p>{" "}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              {" "}
              <Link href={"/estimation"}>
                {" "}
                <Button className="rounded-full hidden md:block uppercase">
                  {" "}
                  J’ai un projet À L’ÉTRANGER{" "}
                </Button>{" "}
              </Link>{" "}
            </motion.div>{" "}
          </div>{" "}
          <Link href={"/estimation"}>
            {" "}
            <Button className="rounded-full md:hidden uppercase">
              {" "}
              J’ai un projet À L’ÉTRANGER{" "}
            </Button>{" "}
          </Link>{" "}
        </div>{" "}
      </section>{" "}
      <section className="flex flex-col px-6 gap-6 justify-center items-center py-16 md:py-24 w-full">
        {" "}
        <div className=" w-auto relative ">
          {" "}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />{" "}
          <div className="relative shadow-xl bg-gray-900 border border-gray-800 py-8 h-full overflow-hidden rounded-2xl flex flex-col gap-6">
            {" "}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center text-xl md:text-5xl font-bold text-black dark:text-white z-10"
            >
              {" "}
              Prêt à nous parler de <br /> votre projet ?{" "}
            </motion.h1>{" "}
            <GeneratedText
              className="text-[14px] text-gray-400 text-center z-50"
              text="Notre équipe est à votre disposition, pour faire le point sur vos besoins et sur vos enjeux !"
            />{" "}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="z-50"
            >
              {" "}
              <Link href="tel:0634368418">
                {" "}
                <AnimatedButton />{" "}
              </Link>{" "}
            </motion.div>{" "}
            {/* Meaty part - Meteor effect */} <Meteors number={20} />{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <HighlightedTextHome />{" "}
      {/*<WorksGrid />
      <section className="w-full flex flex-col gap-10 justify-center items-center ">
        {" "}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center uppercase text-xl md:text-5xl font-bold text-black dark:text-white pt-10"
        >
          {" "}
          Nos réalisations en vidéo{" "}
        </motion.h2>{" "}
        <VideoTabs />{" "}
        <Link href="/estimation">
          {" "}
          <HoverBorderGradient className="flex gap-2 items-center">
            {" "}
            Je veux une video{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              {" "}
              <path
                strokeLinecap="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />{" "}
            </svg>{" "}
          </HoverBorderGradient>{" "}
        </Link>{" "}
      </section>*/}
      <section className="w-full flex flex-col gap-10 justify-center items-center mb-20">
        {" "}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-left text-xl md:text-5xl font-bold text-black dark:text-white pt-10"
        >
          {" "}
          LA VANITEAM{" "}
        </motion.h2>{" "}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full hidden "
        >
          {" "}
          <CarouselContent>
            {" "}
            <VaniTeam
              name="Antoine"
              picture="/img/ANTOINE.webp"
              presentation="Antoine est notre graphiste, titulaire d'un BTS design graphique. Il a effectué un apprentissage chez Publicis de 2012 à 2014. Il s'est spécialisé sur Illustrator et a toujours eu un penchant pour la création de logos. Aujourd'hui, il est spécialisé dans le branding et l'image de marque."
            />{" "}
            <VaniTeam
              name="Yahia"
              picture="/img/yahia.webp"
              presentation="Yahia est notre expert en stratégie digitale. Community manager expérimenté, il déploie avec créativité notre présence sur les réseaux sociaux clés. Grâce à sa connaissance fine des communautés, il crée un contenu engageant qui amplifie notre image. Véritable maître des mots, Yahia est notre atout pour connecter nos marques et identifier les tendances. Qu'il s'agisse de lancer des buzz ou gérer les crises, il mène avec flair notre stratégie social media."
            />{" "}
            <VaniTeam
              name="Yanis"
              picture="/img/Yanis.webp"
              presentation="L'âme stratégique de Vanity Corp, il est expert en gestion de projets et d'équipes. Ses compétences couvrent le montage, l'écriture de scripts, la création de contenu, le marketing d'influence, la négociation client et la gestion budgétaire. Il veille à la bonne conduite de chaque projet, de la conception à la réalisation."
            />{" "}
            <VaniTeam
              name="Remy"
              picture="/img/rEMY.webp"
              presentation="Notre couteau suisse de la production audiovisuelle, il possède une expertise variée allant des vidéos institutionnelles aux clips musicaux. Capable de gérer tous les aspects de la production et de diriger une équipe sur des projets majeurs, il garantit une qualité visuelle élevée."
            />{" "}
            <VaniTeam
              name="Zak"
              picture="/img/Zak.webp"
              presentation="Notre spécialiste en stratégie de marque, diplômé de Sup de Pub à Paris. Il a de l'expérience en vente et communication de marque, prospection, audits d'entreprise et planification budgétaire. Il travaille en collaboration avec nos clients pour comprendre leurs besoins et développer des stratégies de communication efficaces."
            />{" "}
          </CarouselContent>{" "}
        </Carousel>{" "}
        <div>
          {" "}
          <VaniteamGrid />{" "}
        </div>{" "}
      </section>{" "}
      <Footer />
    </div>
  );
}
