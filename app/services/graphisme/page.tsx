"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import MagicBento from "@/components/MagicBento";
// SEO & métadonnées (extrait du document Word)
// Méta-titre : Agence de graphisme à Paris – Créations sur mesure | Vanity Corp
// Méta-description : Identité visuelle, logo, webdesign, print, réseaux sociaux… Vanity Corp crée des visuels sur mesure pour entreprises et particuliers. Découvrez nos réalisations et contactez notre studio graphique à Paris.
// Mots-clés : agence de graphisme Paris, studio graphique, identité visuelle, création de logo, design sur mesure, branding, direction artistique, webdesign, communication visuelle.
import { GlowingEffect } from "@/components/ui/glowing-effect";
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
    images: [],
  },
  {
    id: "fraikin",
    title: "FRAIKIN",
    type: "Refonte de logo · Charte graphique",
    objective:
      "Pour célébrer son anniversaire, le leader du transport Fraikin a souhaité moderniser son logo tout en conservant sa dimension institutionnelle. Mission : raffiner l'identité visuelle en renforçant robustesse, lisibilité et aspect premium.",
    palette: ["#062A3F", "#F2AA4C", "#FFFFFF"],
    fonts: ["Poppins", "Inter"],
    images: [],
  },
  {
    id: "campagne-grand-froid",
    title: "CAMPAGNE GRAND FROID — LIFE",
    type: "Campagne visuelle · Communication caritative",
    objective:
      "Pour LIFE, nous avons imaginé une campagne visuelle choc autour de la distribution de vêtements chauds pendant l'hiver. L'idée : détourner les codes de la publicité en créant des visuels trompe-l'œil, forts et émotionnels, confrontant le spectateur à la réalité de la rue tout en gardant une esthétique soignée et un ton empathique.",
    palette: ["#000000", "#FFE7A3", "#E33E6B"],
    fonts: ["Georgia", "Inter"],
    images: [],
  },
  {
    id: "cemika",
    title: "CEMIKA — Cuisines équipées",
    type: "Identité produit & packaging",
    objective:
      "Structurer une ligne visuelle premium pour la gamme cuisine, adaptée au commerce en ligne et aux showrooms.",
    palette: ["#0D1321", "#D9D9D9", "#FFD9C7"],
    fonts: ["Sora", "Inter"],
    images: [],
  },
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
      <header className="w-full bg-gradient-to-r from-zinc-900 via-black to-zinc-900 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Graphisme sur mesure qui marque les esprits
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Chez Vanity Corp, on ne fait pas juste du joli. On crée des visuels
            qui captent l’attention, racontent une histoire et rendent votre
            marque impossible à ignorer.
          </p>
        </div>
      </header>

      {/* Service description */}
      <section className="w-[90%] max-w-[1920px] mx-auto mt-12 ">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Présentation du service</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Notre pôle graphique imagine, conçoit et décline tout ce qu’il faut
            pour donner vie à votre image : identités visuelles & chartes
            graphiques, logos et rebranding complets, affiches, flyers,
            plaquettes et catalogues, packagings & étiquettes produits, design
            de sites web et de landing pages, templates pour les réseaux
            sociaux, motion design et habillages vidéo, présentations, documents
            et supports commerciaux.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            Pas de jargon, pas de chichi : on s’adapte à vous. Vous avez déjà
            une idée claire ? On la met en forme. Vous partez d’une page blanche
            ? On prend la température, on pose les bonnes questions, et on vous
            propose plusieurs pistes créatives jusqu’à trouver celle qui fait
            tilt.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Qu’on travaille pour une startup, une marque de luxe, une ONG ou une
            PME, nos designs s’ajustent à chaque univers. On ne parle pas de
            “style Vanity”, parce que notre spécialité, c’est justement de faire
            briller le vôtre.
          </p>
        </div>
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

        {/* === BENTO GRID (title -> description -> diversified grid -> final line) === */}
        <div className="mt-10 bg-zinc-900 p-8 rounded-2xl shadow-lg">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white">
            Du logo au site web, on s’occupe de tout
          </h3>

          {/* Description (exact) */}
          <p className="mt-3 text-gray-300">
            Notre pôle graphique imagine, conçoit et décline tout ce qu’il faut
            pour donner vie à votre image :
          </p>

          {/* Diversified grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/*
              1 - image LEFT, text RIGHT
            */}
            <div className="rounded-2xl bg-zinc-800 shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch">
                <Image
                  width={1000}
                  height={1000}
                  src="/services/graphismes/graphics-colors.webp"
                  alt="Identités visuelles"
                  className="w-full md:w-32 h-32 md:h-auto object-cover flex-none"
                />
                <div className="p-4">
                  <div className="text-sm font-semibold">
                    Identités visuelles & chartes graphiques
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Logos, chartes graphiques et déclinaisons complètes pour
                    garantir une image cohérente.
                  </div>
                </div>
              </div>
            </div>

            {/*
              2 - image TOP, text BOTTOM (centered)
            */}
            <div className="rounded-2xl bg-zinc-900 shadow-sm overflow-hidden flex flex-col items-center text-center">
              <Image
                width={1000}
                height={1000}
                src="/services/graphismes/logo.webp"
                alt="Logos et rebranding"
                className="w-full h-28 object-cover"
              />
              <div className="p-4">
                <div className="text-sm font-semibold">
                  Logos et rebranding complets
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Refonte d&apos;identité et modernisation pour renforcer la
                  crédibilité.
                </div>
              </div>
            </div>

            {/*
              3 - image BOTTOM, text TOP
            */}
            <div className="rounded-2xl bg-zinc-900 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4">
                <div className="text-sm font-semibold">
                  Affiches, flyers, plaquettes et catalogues
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Affiches, flyers, plaquettes, catalogues.
                </div>
              </div>
              <Image
                width={1000}
                height={1000}
                src="/services/graphismes/graphics-colors.webp"
                alt="Affiches et flyers"
                className="w-full h-28 object-cover mt-auto"
              />
            </div>

            {/*
              4 - image RIGHT, text LEFT (reverse on md)
            */}
            <div className="rounded-2xl bg-zinc-800 shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row-reverse items-stretch">
                <Image
                  width={1000}
                  height={1000}
                  src="/services/graphismes/graphics-colors.webp"
                  alt="Packagings"
                  className="w-full md:w-32 h-32 md:h-auto object-cover flex-none"
                />
                <div className="p-4">
                  <div className="text-sm font-semibold">
                    Packagings & étiquettes produits
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Packaging & étiquette produit.
                  </div>
                </div>
              </div>
            </div>

            {/*
              5 - image as background overlay (text on top)
            */}
            <div className="rounded-2xl relative bg-zinc-900 shadow-sm overflow-hidden">
              <Image
                width={1000}
                height={1000}
                src="/services/graphismes/graphics-colors.webp"
                alt="Design web"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative p-4">
                <div className="text-sm font-semibold">
                  Design de sites web et de landing pages
                </div>
                <div className="text-xs text-gray-200/80 mt-2">
                  Design de sites, landing pages (UX & UI).
                </div>
              </div>
            </div>

            {/*
              6 - image CENTERED above small title (compact)
            */}
            <div className="rounded-2xl bg-zinc-800 shadow-sm flex flex-col items-center p-4">
              <Image
                width={1000}
                height={1000}
                src="/services/graphismes/graphics-colors.webp"
                alt="Templates sociaux"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="mt-3 text-sm font-semibold text-center">
                Templates pour les réseaux sociaux
              </div>
              <div className="text-xs text-gray-400 mt-2 text-center">
                Templates optimisés & kits.
              </div>
            </div>

            {/*
              7 - two-column style inside tile: left text, right tall image
            */}
            <div className="rounded-2xl bg-zinc-900 shadow-sm overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="p-4 flex flex-col justify-center">
                  <div className="text-sm font-semibold">
                    Motion design et habillages vidéo
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Animations, habillages vidéo.
                  </div>
                </div>
                <div className="col-span-1">
                  <Image
                    width={1000}
                    height={1000}
                    src="/services/graphismes/graphics-colors.webp"
                    alt="Motion"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/*
              8 - minimal card: small image bottom-left, text top-right
            */}
            <div className="rounded-2xl bg-zinc-800 shadow-sm p-4 relative overflow-hidden">
              <div className="text-sm font-semibold">
                Présentations, documents et supports commerciaux
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Présentations, documents & supports commerciaux.
              </div>
              <Image
                width={1000}
                height={1000}
                src="/services/graphismes/graphics-colors.webp"
                alt="Présentations"
                className="absolute left-4 bottom-4 w-36 h-24 rounded-md object-cover border border-white/6"
              />
            </div>
          </div>

          {/* Final line (exact) */}
          <p className="mt-6 text-xs text-gray-400">
            Bref, tout ce qui s’imprime, s’affiche ou se scrolle.
          </p>
        </div>
        {/* === fin bento grid === */}
      </section>

      {/* Projects */}
      <section className="space-y-28 w-[90%] max-w-[1920px] mx-auto  pb-32 mt-20">
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
              className={`h-screen flex items-center justify-center transition-all duration-700 ease-in-out transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-full  mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 ">
                {/* Left: textual column (centered vertically) */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6 items-start lg:items-start">
                  <div>
                    <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight">
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

      <footer className="py-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Vanity Corp — Tous droits réservés
      </footer>
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
