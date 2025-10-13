"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import type { NextPage } from "next";

// pages/graphisme.tsx
// Next.js (Pages Router) — Tailwind CSS
// Type-safe component. Black background, each project is a full-screen
// centered section (horizontally + vertically). Banner + description added.
// Now: images are clickable and open a modal carousel with swipe + keyboard navigation.

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
    type: "Identité visuelle & Branding",
    objective:
      "Moderniser l’image de marque pour renforcer la crédibilité auprès des partenaires B2B et transmettre une impression d’innovation et d’efficacité.",
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
    title: "Impulse Gallery",
    type: "Direction artistique & identité",
    objective:
      "Donner une signature visuelle forte et modulable aux expositions, pensée pour les affiches, catalogues et réseaux.",
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
    title: "Life Talk",
    type: "Branding & UI Kit",
    objective:
      "Créer un univers humain et chaleureux pour une plateforme de ressources et échanges.",
    palette: ["#071717", "#8AE7C7", "#FFF8EE"],
    fonts: ["Montserrat", "Inter"],
    images: [
      "https://via.placeholder.com/1000x1000?text=Life+Talk+1",
      "https://via.placeholder.com/800x800?text=Life+Talk+2",
      "https://via.placeholder.com/600x800?text=Life+Talk+3",
    ],
  },
  {
    id: "fraikin",
    title: "Fraikin",
    type: "Refonte logo & charte",
    objective:
      "Raffiner l’identité d’un acteur logistique en mettant l’accent sur la robustesse et la lisibilité à grande échelle.",
    palette: ["#062A3F", "#F2AA4C", "#FFFFFF"],
    fonts: ["Poppins", "Inter"],
    images: [
      "https://via.placeholder.com/1000x1000?text=Fraikin+1",
      "https://via.placeholder.com/800x800?text=Fraikin+2",
    ],
  },
  {
    id: "campagne-grand-froid",
    title: "Campagne Grand Froid — Life",
    type: "Campagne visuelle — œuvre caritative",
    objective:
      "Sensibiliser et mobiliser autour de la distribution de vêtements chauds — design empathique et impactant.",
    palette: ["#000000", "#FFE7A3", "#E33E6B"],
    fonts: ["Georgia", "Inter"],
    images: [
      "https://via.placeholder.com/1000x1000?text=Campagne+1",
      "https://via.placeholder.com/800x800?text=Campagne+2",
    ],
  },
  {
    id: "cemika",
    title: "Cemika — Cuisines équipées",
    type: "Identité produit & packaging",
    objective:
      "Structurer une ligne visuelle premium pour la gamme cuisine, adaptée au commerce en ligne et aux showrooms.",
    palette: ["#0D1321", "#D9D9D9", "#FFD9C7"],
    fonts: ["Sora", "Inter"],
    images: [
      "https://via.placeholder.com/1000x1000?text=Cemika+1",
      "https://via.placeholder.com/800x800?text=Cemika+2",
      "https://via.placeholder.com/600x800?text=Cemika+3",
    ],
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
            Graphismes
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Des identités visuelles & chartes graphiques pensées pour marquer
            les esprits — explorations, déploiement et applications concrètes.
          </p>
        </div>
      </header>

      {/* Service description */}
      <section className="max-w-4xl mx-auto mt-12 px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Présentation du service</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Le graphisme est bien plus qu’une question d’esthétique : c’est un
            langage visuel qui traduit vos valeurs et renforce votre
            crédibilité. Notre équipe conçoit des visuels sur mesure, pensés
            pour séduire et engager votre audience, en ligne comme sur papier.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Nous réalisons la création et la refonte d’identités visuelles, la
            conception de supports print et digitaux, ainsi que des maquettes
            UI/UX haute fidélité pour vos sites et applications. Chaque projet
            est pensé pour répondre à une stratégie précise et à des objectifs
            métiers.
          </p>
          <p className="text-gray-300 leading-relaxed">
            La cohérence visuelle est essentielle : elle assure la
            reconnaissance de la marque sur tous les points de contact et
            renforce la confiance des clients. Nous veillons à une déclinaison
            homogène des éléments graphiques sur l’ensemble des supports.
          </p>
        </div>

        <div className="mt-10 bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Nos services de graphisme
          </h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <li>
              <strong>Identité visuelle</strong>
              <div className="text-sm text-gray-400">
                Création de logos, chartes graphiques et déclinaisons complètes
                pour garantir une image cohérente.
              </div>
            </li>
            <li>
              <strong>Design web & mobile</strong>
              <div className="text-sm text-gray-400">
                UI/UX design sur mesure pour sites et applications, maquettes
                haute fidélité et composants visuels cohérents.
              </div>
            </li>
            <li>
              <strong>Supports de communication</strong>
              <div className="text-sm text-gray-400">
                Flyers, cartes de visite, affiches, bannières et présentations :
                des visuels qui marquent les esprits.
              </div>
            </li>
            <li>
              <strong>Direction artistique</strong>
              <div className="text-sm text-gray-400">
                Accompagnement créatif complet pour assurer la cohérence entre
                votre univers visuel et vos objectifs de marque.
              </div>
            </li>
          </ul>

          <p className="text-xs text-gray-500 mt-4">
            Chaque service est décrit simplement afin d’être compris par des
            non-designers.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-28 w-full mx-auto px-32 pb-32 mt-20">
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
              <div className="w-full  mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 px-6">
                {/* Left: textual column (centered vertically) */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6 items-start lg:items-start">
                  <div>
                    <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight">
                      <span className="block text-white-400">{p.title}</span>
                    </h2>
                    <p className="text-sm text-gray-300 mt-3">
                      {p.type}
                      {p.client ? ` • ${p.client}` : ""}
                    </p>
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
                        <img
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
                          <img
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
                          <img
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
                          <img
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
                            mockups web et sociaux — présenté ici en contexte
                            pour mieux appréhender le rendu réel.
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

                <img
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
                    <img
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
