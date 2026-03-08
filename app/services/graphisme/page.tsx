"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import MagicBento from "@/components/MagicBento";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Footer } from "@/components/Footer";

interface Project {
  id: string;
  title: string;
  client?: string;
  type: string;
  objective: string;
  palette: string[];
  fonts: string[];
  images: string[];
  url?: string;
}

const projects: ReadonlyArray<Project> = [
  {
    id: "arca-group",
    title: "ARCA GROUP ENERGY",
    client: "ARCA Group",
    type: "Identité visuelle · Branding · Webdesign · Print",
    objective:
      "ARCA Group Energy nous a confié la refonte complète de son image. Objectif : moderniser la marque pour renforcer sa crédibilité auprès des partenaires B2B et refléter un positionnement tourné vers l'innovation et l'efficacité. Nous avons imaginé une charte graphique sur mesure, puis décliné l'univers sur l'ensemble des supports : site web, plaquettes, cartes de visite, documents internes.",
    palette: ["#d64536", "#7456a0", "#e8461d", "#7456a0"],
    fonts: ["Satoshi", "Inter"],
    images: [
      "/services/graphismes/arca-logos.webp",
      "/services/graphismes/arca-font.webp",
      "/services/graphismes/arca-colors.webp",
      "/services/graphismes/arca-main.webp",
    ],
  },
  {
    id: "impulse-gallery",
    title: "IMPULSE GALLERY",
    type: "Direction artistique · Identité visuelle · Design d'espace & print",
    objective:
      "Impulse Gallery souhaitait une identité underground et artistique, à l'image de son concept. Nous avons conçu une charte graphique complète — du logo à la signalétique — puis décliné la direction artistique sur plaquettes, cartes membres, signatures de mail et tous les supports de communication. Une image forte, modulable et reconnaissable.",
    palette: ["#0A0F1A", "#FF3D81", "#F5F7FA"],
    fonts: ["Playfair Display", "Inter"],
    images: [
      "/services/graphismes/impulse-logos.webp",
      "/services/graphismes/impulse-font.webp",
      "/services/graphismes/impulse-colors.webp",
      "/services/graphismes/impulse-main.webp",
    ],
  },
  {
    id: "life-talk",
    title: "LIFE TALK",
    type: "Branding · UI Kit · Direction artistique",
    objective:
      "Un talk-show caritatif imaginé par l'ONG LIFE. L'objectif : créer une identité qui évoque l'univers du plateau télé tout en parlant à une génération connectée. Nous avons développé une charte graphique jeune et impactante, capable de réunir les natifs de YouTube comme les amateurs de télévision traditionnelle.",
    palette: ["#071717", "#8AE7C7", "#FFF8EE"],
    fonts: ["Montserrat", "Inter"],
    images: [
      "/services/graphismes/life-talk-showcase2.jpg",
      "/services/graphismes/life-talk-showcase.png",
      "/services/graphismes/life-talk-main.png",
      "/services/graphismes/life-talk-main.png",
    ],
  },
  {
    id: "fraikin",
    title: "FRAIKIN",
    type: "Refonte de logo · Charte graphique",
    objective:
      "Pour célébrer son anniversaire, le leader du transport Fraikin a souhaité moderniser son logo tout en conservant sa dimension institutionnelle. Mission : raffiner l'identité visuelle en renforçant robustesse, lisibilité et aspect premium.",
    palette: ["#062A3F", "#F2AA4C", "#FFFFFF"],
    fonts: ["Poppins", "Inter"],
    images: [
      "/services/graphismes/fraikin-logos.png",
      "/services/graphismes/fraikin-font.png",
      "/services/graphismes/fraikin-colors.png",
      "/services/graphismes/fraikin-main.png",
    ],
  },
  {
    id: "campagne-grand-froid",
    title: "CAMPAGNE GRAND FROID — LIFE",
    type: "Campagne visuelle · Communication caritative",
    objective:
      "Pour LIFE, nous avons imaginé une campagne visuelle choc autour de la distribution de vêtements chauds pendant l'hiver. L'idée : détourner les codes de la publicité en créant des visuels trompe-l'œil, forts et émotionnels, confrontant le spectateur à la réalité de la rue tout en gardant une esthétique soignée et un ton empathique.",
    palette: ["#000000", "#FFE7A3", "#E33E6B"],
    fonts: ["Georgia", "Inter"],
    images: [
      "/services/graphismes/grand-froid.webp",
      "/services/graphismes/grand-froid2.webp",
      "/services/graphismes/grand-froid3.webp",
    ],
  },
  /*
  {
    id: "cemika",
    title: "CEMIKA — Cuisines équipées",
    type: "Identité produit & packaging",
    objective:
      "Structurer une ligne visuelle premium pour la gamme cuisine, adaptée au commerce en ligne et aux showrooms.",
    palette: ["#0D1321", "#D9D9D9", "#FFD9C7"],
    fonts: ["Sora", "Inter"],
    images: [],
  },*/
] as const;

const GraphismePage: NextPage = () => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [modalIndex, setModalIndex] = useState<number>(0);

  // touch swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const setSectionRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id") ?? "";
          setVisible((prev) => ({ ...prev, [id]: entry.isIntersecting }));
        });
      },
      { root: null, threshold: 0.12 }
    );

    const elements = Object.values(sectionRefs.current).filter(
      (el): el is HTMLElement => el !== null
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!modalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextModal();
      if (e.key === "ArrowLeft") prevModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, modalProject, modalIndex]);

  function openModal(project: Project, index: number) {
    setModalProject(project);
    setModalIndex(index);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setModalOpen(false);
    setModalProject(null);
    setModalIndex(0);
    document.body.style.overflow = "";
  }

  function nextModal() {
    if (!modalProject) return;
    setModalIndex((i) => (i + 1) % modalProject.images.length);
  }

  function prevModal() {
    if (!modalProject) return;
    setModalIndex(
      (i) => (i - 1 + modalProject.images.length) % modalProject.images.length
    );
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.touches[0].clientX;
  }

  function onTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    const threshold = 50; // px
    if (delta > threshold) {
      nextModal();
    } else if (delta < -threshold) {
      prevModal();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }

  return (
    <main className="min-h-screen w-full bg-black text-white antialiased">
      {/* Banner */}

      <section
        className={`relative flex flex-col h-[90vh] justify-between items-center text-center overflow-hidden `}
        style={{
          backgroundImage: `url(/graphism-hero-background.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#f8f5f1]/30 mix-blend-overlay" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6">
          {/* Header */}

          {/* Main title */}
          <div className="relative flex flex-col items-center justify-center">
            <h1 className="text-[4vw] uppercase font-black text-indigo-500 leading-none">
              Graphisme sur mesure qui <br />
              marque les esprits
            </h1>
            <p className="mt-4 text-lg text-black max-w-3xl mx-auto">
              Chez Vanity Corp, on ne fait pas juste du joli. On crée des
              visuels qui captent l’attention, racontent une histoire et rendent
              votre marque impossible à ignorer.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 w-full flex items-center justify-between px-6 py-4 text-xs text-gray-700">
          <div className="flex gap-2">
            <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center">
              S
            </div>
            <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center">
              ✦
            </div>
          </div>
          <div className="flex-1 h-px bg-black mx-4" />
          <div>March 2025 – All rights are reserved</div>
        </div>
      </section>
      {/* Service description */}
      <section className="w-[90%] max-w-[1920px] mx-auto mt-12 ">
        {/* === BENTO GRID (title -> description -> diversified grid -> final line) === */}
        <div className="mt-10 bg-zinc-900 p-8 rounded-2xl shadow-lg">
          {/* Title */}
          <h3 className="text-5xl font-bold uppercase text-white">
            Du logo au site web, on s’occupe de tout
          </h3>

          {/* Description (exact) */}
          <p className="mt-3 text-gray-300 text-2xl">
            Notre pôle graphique imagine, conçoit et décline tout ce qu’il faut
            pour donner vie à votre image :
          </p>

          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
        {/* === fin bento grid === */}
      </section>
      {/* === Début : Méthode & Adaptabilité (coller ici) === */}
      <section
        id="method-adapt"
        aria-labelledby="method-heading"
        className="w-[90%] max-w-[1920px] mx-auto  mt-12"
      >
        {/* SECTION 1 - Méthode */}
        <div className="py-16 relative md:py-24 bg-zinc-900 rounded-2xl shadow-lg overflow-hidden">
          <div className="container mx-auto px-6 flex justify-between gap-12 items-center">
            {/* Texte */}
            <div className="space-y-6 w-2/3">
              <h2
                id="method-heading"
                className="text-3xl md:text-4xl lg:text-5xl  uppercase font-extrabold leading-tight text-white"
              >
                Une méthode simple et humaine
              </h2>

              <div className="space-y-4 text-lg text-gray-200">
                <p>Pas de jargon, pas de chichi : on s’adapte à vous.</p>

                <p className="font-medium">
                  Vous avez déjà une idée claire ? On la met en forme.
                </p>

                <p>
                  Vous partez d’une page blanche ? On prend la température, on
                  pose les bonnes questions, et on vous propose plusieurs pistes
                  créatives jusqu’à trouver celle qui fait tilt.
                </p>

                <p>
                  Notre but, c’est pas de vous imposer notre style. C’est de
                  créer une image qui vous ressemble, et qui tape juste.
                </p>
              </div>
            </div>

            {/* Visuel */}
            <div className="relative rounded-2xl w-1/3 overflow-hidden h-64 md:h-96">
              <Image
                src="/images/methode-humaine.jpg"
                alt="Illustration méthode humaine"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2 - Adaptabilité */}
        <div className="py-16 md:py-24 mt-10 bg-zinc-900 rounded-2xl shadow-lg overflow-hidden">
          <div className="container mx-auto px-6 md:px-8 flex  justify-between gap-12 items-center">
            {/* Visuel (gauche sur desktop) */}
            <div className="relative rounded-2xl w-1/3 overflow-hidden h-64 md:h-96 order-1 md:order-none">
              <Image
                src="/images/adaptable.jpg"
                alt="Illustration design adaptable"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Texte */}
            <div className="space-y-6 w-2/3">
              <h3
                id="adapt-heading"
                className="text-3xl md:text-4xl lg:text-5xl uppercase font-extrabold leading-tight text-white"
              >
                Nos créations s’adaptent à tout — comme nous
              </h3>

              <div className="space-y-4 text-lg text-gray-200">
                <p>
                  Qu’on travaille pour une startup, une marque de luxe, une ONG
                  ou une PME, nos designs s’ajustent à chaque univers.
                </p>

                <p>
                  On ne parle pas de “style Vanity”, parce que notre spécialité,
                  c’est justement de faire briller le vôtre.
                </p>

                <p>
                  Du minimalisme épuré à l’univers coloré et audacieux : on sait
                  tout faire, et surtout, on le fait bien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* === Fin : Méthode & Adaptabilité === */}

      {/* Projects */}
      <section className="space-y-28 w-[90%] max-w-[1920px] mx-auto  pb-32 mt-40">
        <h3 className="text-5xl font-bold uppercase text-white">
          Quelques réalisations
        </h3>
        {projects.map((p) => {
          const isVisible = Boolean(visible[p.id]);

          // Safe fallbacks for images
          const img0 = p.images[0] ?? "";
          const img1 = p.images[1] ?? img0;
          const img2 = p.images[2] ?? img0;
          const img3 = p.images[3] ?? img0;

          return (
            <section
              key={p.id}
              ref={setSectionRef(p.id)}
              data-id={p.id}
              className={` flex items-center justify-center transition-all duration-700 ease-in-out transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-full  mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 ">
                {/* Left: textual column (centered vertically) */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6 items-start lg:items-start">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                      <span className="block text-white-400">{p.title}</span>
                    </h2>
                    <p className="text-sm text-gray-300 mt-3">{p.type}</p>
                  </div>

                  <p className="text-gray-300 leading-relaxed">{p.objective}</p>

                  <div className="flex items-center gap-4">
                    {p.palette.map((c) => (
                      <div key={c} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-md border"
                          style={{ background: c }}
                        />
                        <span className="text-xs text-gray-400">{c}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-2">
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-sky-500 to-violet-600 text-black font-medium text-sm"
                      >
                        Visiter le site
                      </a>
                    )}

                    <button className="px-4 py-2 rounded-md border border-gray-700 text-sm text-gray-200">
                      Demander un devis
                    </button>
                  </div>

                  <div className="text-xs text-gray-500 mt-4">Date : 2023</div>
                </div>

                {/* Right: mosaic visual area (centered) */}
                <div className="w-full lg:w-2/3">
                  <div className="grid grid-cols-12 gap-4 items-stretch">
                    {/* Large left tile */}
                    <div className="col-span-7 row-span-2 rounded-2xl overflow-hidden shadow-lg">
                      <button
                        type="button"
                        onClick={() => openModal(p, 0)}
                        className="w-full h-full block"
                      >
                        <Image
                          width={1000}
                          height={1000}
                          src={img0}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    </div>

                    {/* Top-right column: two stacked tiles */}
                    <div className="col-span-5 grid grid-rows-2 gap-4">
                      <div className="rounded-2xl overflow-hidden shadow-lg">
                        <button
                          type="button"
                          onClick={() => openModal(p, 1)}
                          className="w-full h-full block"
                        >
                          <Image
                            width={1000}
                            height={1000}
                            src={img1}
                            alt={`${p.title}-1`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </div>
                      <div className="rounded-2xl overflow-hidden shadow-lg">
                        <button
                          type="button"
                          onClick={() => openModal(p, 2)}
                          className="w-full h-full block"
                        >
                          <Image
                            width={1000}
                            height={1000}
                            src={img2}
                            alt={`${p.title}-2`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Full width bottom tiles */}
                    <div className="col-span-12 grid grid-cols-12 gap-4 mt-2">
                      <div className="col-span-4 rounded-2xl overflow-hidden shadow-lg">
                        <button
                          type="button"
                          onClick={() => openModal(p, 3)}
                          className="w-full h-full block"
                        >
                          <Image
                            width={1000}
                            height={1000}
                            src={img3}
                            alt={`${p.title}-3`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </div>

                      <div className="col-span-8 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center bg-gradient-to-tr from-gray-900 to-gray-800">
                        <div className="p-6">
                          <div className="text-sm text-gray-300">
                            Direction créative
                          </div>
                          <h3 className="text-2xl font-semibold mt-2">
                            {p.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-3 max-w-xl">
                            Exemples d’application : affiches, packaging,
                            mockups web et sociaux — présentés en contexte pour
                            mieux appréhender le rendu réel.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </section>

      {/* Modal carousel */}
      {modalOpen && modalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-5xl bg-transparent rounded-xl overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-2 text-black"
            >
              ✕
            </button>

            <div
              className="relative bg-black/95 rounded-xl p-6 flex flex-col items-center"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={prevModal}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 hover:bg-white/20 p-3"
                >
                  ‹
                </button>

                <Image
                  width={1000}
                  height={1000}
                  src={modalProject.images[modalIndex]}
                  alt={`${modalProject.title}-${modalIndex}`}
                  className="max-h-[70vh] object-contain"
                />

                <button
                  onClick={nextModal}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 hover:bg-white/20 p-3"
                >
                  ›
                </button>
              </div>

              <div className="w-full mt-6 flex items-center justify-center gap-3">
                {modalProject.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setModalIndex(i)}
                    className={`w-16 h-10 overflow-hidden rounded border ${
                      i === modalIndex ? "border-white" : "border-transparent"
                    }`}
                  >
                    <Image
                      width={1000}
                      height={1000}
                      src={src}
                      alt={`thumb-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-300">
                {modalProject.title} • {modalIndex + 1}/
                {modalProject.images.length}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default GraphismePage;
interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={` list-none ${area}`}>
      <div className="relative h-auto rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-fit flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
