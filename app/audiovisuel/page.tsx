"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  MonitorPlay,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Aperture,
  Film,
  CheckCircle2,
  Clock,
  Layers,
  Camera,
  Scissors,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { StarsBackground } from "@/components/backgrounds/stars";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Folder from "@/components/Folder";
import Image from "next/image";
import Link from "next/link";

const CameraModel = dynamic(() => import("@/components/CameraModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
    </div>
  ),
});

// ── Data ──────────────────────────────────────────────────────────────────────

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1800&auto=format&fit=crop&q=80";

// ── Réalisation file card — used as Folder items ──────────────────────────────

function RealisationFile({
  src,
  href,
  alt,
}: {
  src: string;
  href: string;
  alt: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full overflow-hidden rounded-lg border border-white/10 hover:border-amber-400/40 transition-all duration-200 group/file"
      style={{ aspectRatio: "16/9" }}
    >
      <Image
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover/file:scale-105 brightness-75 group-hover/file:brightness-90"
        width={100}
        height={100}
      />
    </a>
  );
}

const FOLDERS = [
  {
    label: "Production vidéo",
    description:
      "Tournage professionnel pour vos contenus marketing, corporate ou réseaux sociaux.",
    color: "#d97706",
    items: [
      <RealisationFile
        key="1"
        src="https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=400&auto=format&fit=crop&q=70"
        href="#"
        alt="Film corporate"
      />,
      <RealisationFile
        key="2"
        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&auto=format&fit=crop&q=70"
        href="#"
        alt="Spot publicitaire"
      />,
      <RealisationFile
        key="3"
        src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&auto=format&fit=crop&q=70"
        href="#"
        alt="Réels Instagram"
      />,
    ],
  },
  {
    label: "Photographie",
    description:
      "Des visuels de qualité pour valoriser votre marque et vos produits.",
    color: "#f59e0b",
    items: [
      <RealisationFile
        key="1"
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=70"
        href="#"
        alt="Lookbook mode"
      />,
      <RealisationFile
        key="2"
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=70"
        href="#"
        alt="Packshots produit"
      />,
      <RealisationFile
        key="3"
        src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70"
        href="#"
        alt="Reportage événement"
      />,
    ],
  },
  {
    label: "Montage & formats",
    description:
      "Optimisation et déclinaison de vos contenus pour toutes les plateformes.",
    color: "#fbbf24",
    items: [
      <RealisationFile
        key="1"
        src="https://images.unsplash.com/photo-1536240478700-b869ad10e2ab?w=400&auto=format&fit=crop&q=70"
        href="#"
        alt="Color grading"
      />,
      <RealisationFile
        key="2"
        src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&auto=format&fit=crop&q=70"
        href="#"
        alt="Motion design"
      />,
      <RealisationFile
        key="3"
        src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop&q=70"
        href="#"
        alt="Multi-formats"
      />,
    ],
  },
];

const FORMATS = [
  { icon: <Youtube size={16} />, label: "YouTube", ratio: "16:9" },
  { icon: <Instagram size={16} />, label: "Instagram", ratio: "1:1 / 9:16" },
  { icon: <Linkedin size={16} />, label: "LinkedIn", ratio: "16:9 / 1:1" },
  { icon: <Globe size={16} />, label: "Web", ratio: "Libre" },
  { icon: <MonitorPlay size={16} />, label: "Corporate", ratio: "16:9" },
];

const SPECS = [
  { label: "Résolution max", value: "8K" },
  { label: "Images/sec", value: "120fps" },
  { label: "Colorimétrie", value: "RAW" },
  { label: "Délai livraison", value: "5 j." },
];

const STATS = [
  { value: "200+", label: "Projets livrés" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "5j", label: "Délai moyen" },
];

// ── Film Strip decoration ─────────────────────────────────────────────────────

function FilmStrip({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-px overflow-hidden", className)}>
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-px shrink-0">
          <div className="w-4 h-2.5 bg-amber-400/20 rounded-[1px]" />
          <div className="w-4 h-7 bg-white/[0.04] rounded-[1px]" />
          <div className="w-4 h-2.5 bg-amber-400/20 rounded-[1px]" />
        </div>
      ))}
    </div>
  );
}

// ── Video Player mock ─────────────────────────────────────────────────────────

function VideoPlayerMock() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(32);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video group">
      {/* Thumbnail */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('${HERO_IMAGE}')`,
          filter: playing ? "brightness(0.3)" : "brightness(0.55)",
        }}
      />
      {/* Cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black/80 z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/80 z-10" />

      {/* Amber glow on playing */}
      {playing && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Play button */}
      <button
        onClick={() => setPlaying(!playing)}
        className="absolute inset-0 z-20 flex items-center justify-center group/btn"
      >
        <div
          className={cn(
            "w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            playing
              ? "border-amber-400/60 bg-amber-400/10 scale-90"
              : "border-white/30 bg-white/10 group-hover/btn:border-amber-400/60 group-hover/btn:bg-amber-400/10 group-hover/btn:scale-110",
          )}
        >
          <Play
            size={22}
            className={cn(
              "ml-1 transition-colors",
              playing
                ? "text-amber-400"
                : "text-white group-hover/btn:text-amber-400",
            )}
            fill="currentColor"
          />
        </div>
      </button>

      {/* Controls bar */}
      <div className="absolute bottom-8 left-0 right-0 z-30 px-5 pb-3 pt-2 bg-gradient-to-t from-black/80 to-transparent">
        {/* Progress bar */}
        <div
          className="w-full h-0.5 bg-white/20 rounded-full mb-2.5 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setProgress(((e.clientX - rect.left) / rect.width) * 100);
          }}
        >
          <div
            className="h-full bg-amber-400 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/50 font-mono">01:24</span>
            <span className="text-[11px] text-white/25 font-mono">/</span>
            <span className="text-[11px] text-white/25 font-mono">04:17</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-amber-400/70 border border-amber-400/30 rounded px-1.5 py-0.5">
              4K
            </span>
            <Aperture size={13} className="text-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-6">
      {children}
    </p>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function AudiovisuelPage() {
  return (
    <div className="dark min-h-screen w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full ">
        <main className="border border-white/10 rounded-2xl overflow-hidden text-white">
          {/* ══════════════════════════════════════════
              HERO — cinematic widescreen feel
          ══════════════════════════════════════════ */}
          <section className="relative min-h-[420px] flex flex-col justify-end border-b border-white/10 overflow-hidden ">
            {/* BG image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
            />
            {/* Gradient — left-heavy to keep text legible */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/40" />

            {/* Film strip top edge */}
            <div className="absolute top-0 left-0 right-0 z-10">
              <FilmStrip />
            </div>

            {/* Amber spotlight leak */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 50%, rgba(245,158,11,0.08) 0%, transparent 65%)",
              }}
            />

            {/* Content — 2-col: text left, 3D model right */}
            <div className="relative max-w-[1920px] m-auto z-10 w-full px-6 sm:px-10 pt-20 pb-12 flex flex-col lg:flex-row lg:items-center gap-8">
              {/* Left — text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-6">
                  <Film size={12} className="text-amber-400" />
                  <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-amber-400">
                    Audiovisuel
                  </span>
                </div>

                <h1 className="text-4xl sm:text-[3.25rem] font-bold leading-[1.08] tracking-tight max-w-2xl mb-5 text-white">
                  Donnez vie
                  <br />
                  <span className="font-normal italic text-amber-300/90">
                    à votre image
                  </span>
                </h1>

                <p className="text-[15px] text-neutral-400 leading-relaxed max-w-lg mb-8">
                  Prestations vidéo/photo, tournage, montage et livraison
                  multi-formats. Nous vous accompagnons de la conception à la
                  livraison pour produire du contenu impactant et adapté à tous
                  vos canaux.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg px-5 h-10 text-sm font-semibold transition-colors">
                    Demander un devis{" "}
                    <ArrowRight size={15} className="ml-1.5" />
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-lg border-white/15 text-neutral-300 bg-transparent text-sm h-10 px-5 hover:bg-white/5 hover:text-white"
                  >
                    <Link href="/realisations">Voir le Portfolio</Link>
                  </Button>
                </div>
              </div>

              {/* Right — 3D camera model */}
              <div
                className="shrink-0 w-full lg:w-[480px]"
                style={{ height: "420px" }}
              >
                <CameraModel />
              </div>
            </div>

            {/* Film strip bottom edge */}
            <div className="absolute max-w-[1920px] m-auto bottom-0 left-0 right-0 z-10">
              <FilmStrip />
            </div>
          </section>

          {/* ══════════════════════════════════════════
              SECTION 1 — Stats bar
          ══════════════════════════════════════════ */}
          <section className="border-b max-w-[1920px] m-auto border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {STATS.map((s) => (
                <div key={s.label} className="px-8 py-7 flex flex-col gap-1">
                  <span className="text-3xl sm:text-4xl font-bold text-amber-400 tracking-tight leading-none">
                    {s.value}
                  </span>
                  <span className="text-sm text-neutral-400 mt-1">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              SECTION 2 — Bento grid: video player + specs + services
          ══════════════════════════════════════════ */}
          <section className="border-b max-w-[1920px] m-auto border-white/10 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5">
              {/* LEFT col — video player + services stacked */}
              <div className="flex flex-col gap-5">
                {/* Video player */}
                <div className="border border-white/10 rounded-2xl p-5 bg-white/[0.01]">
                  <SectionLabel>Aperçu production</SectionLabel>
                  <VideoPlayerMock />
                </div>

                {/* Services — Folder components */}
                <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.01]">
                  <SectionLabel>Nos services & <Link href="/realisations" className="text-amber-400 hover:text-amber-300 underline underline-offset-4">Portfolio</Link></SectionLabel>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-8">
                    Cliquez sur un dossier pour découvrir nos réalisations.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FOLDERS.map((folder) => (
                      <div
                        key={folder.label}
                        className="flex flex-col items-center gap-4"
                      >
                        <div
                          className="flex justify-center items-center"
                          style={{
                            height: "200px",
                            position: "relative",
                            width: "100%",
                          }}
                        >
                          <Folder
                            color={folder.color}
                            size={1.5}
                            items={folder.items}
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-[13px] font-semibold text-white leading-snug mb-1">
                            {folder.label}
                          </p>
                          <p className="text-[11px] text-neutral-500 leading-relaxed">
                            {folder.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT col — specs + formats + CTA stacked */}
              <div className="flex flex-col gap-5">
                {/* Tech specs */}
                <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.01]">
                  <SectionLabel>Spécifications techniques</SectionLabel>
                  <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
                    {SPECS.map((spec) => (
                      <div
                        key={spec.label}
                        className="bg-neutral-950 px-5 py-5"
                      >
                        <p className="text-xl font-bold text-amber-400 leading-none mb-1.5">
                          {spec.value}
                        </p>
                        <p className="text-[11px] text-neutral-500 tracking-wide">
                          {spec.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process steps — vertical */}
                <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.01]">
                  <SectionLabel>Notre processus</SectionLabel>
                  <div className="flex flex-col gap-0">
                    {[
                      {
                        step: "01",
                        label: "Brief & conception",
                        icon: <Layers size={13} />,
                      },
                      {
                        step: "02",
                        label: "Préparation & planning",
                        icon: <Layers size={13} />,
                      },
                      { step: "03", label: "Production", icon: <Camera size={13} /> },
                      {
                        step: "04",
                        label: "Post-production",
                        icon: <Scissors size={13} />,
                      },
                      {
                        step: "05",
                        label: "Livraison multi-formats",
                        icon: <CheckCircle2 size={13} />,
                      },
                    ].map((item, i, arr) => (
                      <div
                        key={item.step}
                        className="relative flex items-start gap-4 py-4"
                      >
                        {/* Vertical connector line */}
                        {i < arr.length - 1 && (
                          <div className="absolute left-[17px] top-10 bottom-0 w-px bg-white/10" />
                        )}
                        <div className="w-9 h-9 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 z-10">
                          {item.icon}
                        </div>
                        <div className="pt-1.5">
                          <span className="text-[10px] text-neutral-600 font-mono tracking-widest block mb-0.5">
                            {item.step}
                          </span>
                          <p className="text-sm font-medium text-neutral-200">
                            {item.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>                {/* Multi-format delivery */}
                <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.01]">
                  <SectionLabel>Livraison multi-plateformes</SectionLabel>
                  <div className="flex flex-col gap-2.5">
                    {FORMATS.map((f) => (
                      <div
                        key={f.label}
                        className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-amber-500/30 hover:bg-amber-950/10 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-amber-400/70 group-hover:text-amber-400 transition-colors">
                            {f.icon}
                          </span>
                          <span className="text-sm text-neutral-300 font-medium">
                            {f.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-600 font-mono">
                          {f.ratio}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>


              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════
              SECTION 3 — Final CTA banner
          ══════════════════════════════════════════ */}
          <section
            className="px-6 sm:px-8 max-w-[1920px] m-auto py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            style={{
              background:
                "linear-gradient(to right, rgba(245,158,11,0.06), transparent)",
            }}
          >
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={13} className="text-amber-400" />
                <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-amber-400">
                  Livraison en 5 jours ouvrés
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Prêt à produire du contenu
                <span className="font-normal italic text-neutral-400">
                  {" "}
                  qui marque les esprits ?
                </span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button className="bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl px-6 h-11 text-sm font-semibold transition-colors">
                Démarrer un projet <ArrowRight size={15} className="ml-1.5" />
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-white/10 text-neutral-400 bg-transparent h-11 px-6 text-sm hover:bg-white/5 hover:text-white"
              >
                Voir les formules
              </Button>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
