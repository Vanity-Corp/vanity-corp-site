import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Image from "next/image";
import { RandomizedTextEffect } from "@/components/ui/text-randomized";
import LetterGlitch from "@/components//LetterGlitch";
import ServiceProcessTimeline from "@/components/Stepper";
import ContentCard from "@/components/ui/content-card";
import { date } from "zod";
import { Footer } from "@/components/Footer";

export default function WebDev() {
  const projects = [
    {
      id: 1,
      title: "Legal Euro Corp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      src: "/webdev/legaleurocorp.webp",
      link: "https://vaniteam.vercel.app/",
      date: "28 mars 2024",
    },
    {
      id: 2,
      title: "Piatto Pizza",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      src: "/webdev/piattopizza.webp",
      link: "https://vaniteam.vercel.app/",
      date: "28 mars 2024",
    },
    {
      id: 3,
      title: "Arca Group Energy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      src: "/webdev/arca.webp",
      link: "https://vaniteam.vercel.app/",
      date: "28 mars 2024",
    },
  ];
  return (
    <div className="flex flex-col w-full justify-center items-center bg-white">
      {/* Title Section */}
      <div className="flex justify-center items-center text-4xl w-full font-bold h-[50vh]">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
        <h1 className="absolute z-10">
          <RandomizedTextEffect text="< Développement Web />" />
        </h1>
      </div>

      {/* Stepper Timeline */}
      <ServiceProcessTimeline />

      {/* Macbook Section with FIX */}
      <div className="relative w-full overflow-hidden">
        <MacbookScroll
          badge={
            <a href="https://peerlist.io/manuarora">
              <Image
                src="/img/github-sticker.png"
                alt="badge"
                width={100}
                height={100}
                className="h-20 w-20 -rotate-12 transform"
              />
            </a>
          }
          src={`/webdev/Vaniteam-dashboard.webp`}
          showGradient={false}
        />
      </div>

      {/* === Section Expertise Développement Web === */}
      <div className="w-full bg-white py-20 px-32 mx-auto">
        <div className="flex flex-row justify-between gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              Notre expertise en
            </h2>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">
              Développement Web
            </h3>
            <p className="italic text-gray-600 mb-8">
              au service de vos projets
            </p>

            <p className="text-gray-700 leading-relaxed max-w-3xl mb-16">
              Depuis plusieurs années, nous mettons notre savoir-faire et notre
              expertise au service de nos clients issus de secteurs variés.{" "}
              <span className="font-semibold">
                Nous concevons et développons avec passion des sites web
              </span>
              , avec le même objectif d’exigence : de la conception à la mise en
              ligne. Nous attachons une grande importance aux relations que nous
              entretenons avec nos clients afin de répondre de la manière la
              plus pertinente à leurs besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Sites Vitrines
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>— Présentation professionnelle</li>
                <li>— Design moderne et impactant</li>
                <li>— Adapté à votre image</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                E-commerce
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>— Boutique en ligne sécurisée</li>
                <li>— Expérience utilisateur intuitive</li>
                <li>— Optimisation des ventes</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Applications Web
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>— Solutions sur-mesure</li>
                <li>— Fonctionnalités avancées</li>
                <li>— Performance et évolutivité</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Refonte & Optimisation
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>— Amélioration du design</li>
                <li>— Optimisation vitesse & SEO</li>
                <li>— Modernisation des fonctionnalités</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Technologies Modernes
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>— Next.js & React</li>
                <li>— WordPress & TailwindCSS</li>
                <li>— PostgreSQL & MongoDB</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Accompagnement
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>— Conseil et stratégie digitale</li>
                <li>— Suivi après lancement</li>
                <li>— Support technique dédié</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="/contact"
            className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            DEMANDER UN DEVIS
          </a>
        </div>
      </div>
      <section className="w-full  py-20 px-32 mx-auto">
        <h2 className=" text-xl md:text-5xl font-extrabold text-black py-10">
          QUELQUES PROJETS
        </h2>
        <div
          className="flex flex-row gap-10
         justify-between"
        >
          {projects.map((project) => (
            <ContentCard
              key={project.id}
              title={project.title}
              description={project.description}
              link={project.link}
              src={project.src}
              date={project.date}
              className="w-1/3"
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
