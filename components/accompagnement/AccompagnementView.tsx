"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  Compass,
  Users,
  ArrowRight,
  TrendingUp,
  BarChart2,
  Globe,
  Network,
  Target,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import HoldingsCard from "@/components/Holdingscard";
import { StarsBackground } from "@/components/backgrounds/stars";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Service {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

interface Metric {
  value: string;
  label: string;
  sub: string;
}

type StrategicClient = { name: string; sector?: string; focus?: string };

type AccompagnementViewProps = {
  heroEyebrow?: string;
  heroBody?: string;
  strategicClients?: StrategicClient[];
};

// ── Data ──────────────────────────────────────────────────────────────────────

const StoryBoardModel = dynamic(() => import("@/components/StoryBoardModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
    </div>
  ),
});

// Fallback used when the CMS has no strategic clients yet.
const STRATEGIC_CLIENTS: StrategicClient[] = [
  { name: "CMI France", sector: "Média", focus: "Audit social & roadmap contenu" },
  { name: "Ecole Ducasse", sector: "Formation", focus: "Positionnement digital" },
  { name: "Marionnaud", sector: "Retail", focus: "Activation social media" },
  { name: "Fraikin", sector: "B2B", focus: "Stratégie de visibilité" },
];

function StrategyIllustration() {
  return (
    <div className="absolute right-6 bottom-6 hidden lg:block w-[420px] rounded-3xl border border-fuchsia-400/20 bg-black/50 p-5 backdrop-blur-md shadow-2xl shadow-fuchsia-950/40">
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: <Target size={18} />, label: "Objectifs", value: "KPIs" },
          {
            icon: <Network size={18} />,
            label: "Canaux",
            value: "Social / Web",
          },
          {
            icon: <BarChart2 size={18} />,
            label: "Mesure",
            value: "+340% reach",
          },
          { icon: <Sparkles size={18} />, label: "Actions", value: "Roadmap" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300">
              {item.icon}
            </div>
            <p className="text-[11px] uppercase tracking-widest text-neutral-500">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Audit digital",
    description:
      "Analyse complète de votre présence en ligne pour identifier les opportunités d'amélioration et les points de friction qui freinent votre croissance.",
    icon: <Search size={20} />,
    tags: ["SEO", "UX", "Performance", "Réseaux sociaux"],
  },
  {
    num: "02",
    title: "Stratégie sur mesure",
    description:
      "Des recommandations adaptées à votre marché et à vos objectifs business. Un plan d'action priorisé, actionnable dès le premier jour.",
    icon: <Compass size={20} />,
    tags: ["Roadmap", "KPIs", "Positionnement"],
  },
  {
    num: "03",
    title: "Community management",
    description:
      "Gestion et animation de vos réseaux sociaux pour créer une audience engagée et fidèle autour de votre marque.",
    icon: <Users size={20} />,
    tags: ["Instagram", "LinkedIn", "TikTok", "Engagement"],
  },
];

const METRICS: Metric[] = [
  { value: "+340%", label: "Reach moyen", sub: "sur 6 mois" },
  { value: "×4.2", label: "Engagement rate", sub: "post-stratégie" },
  { value: "48h", label: "Délai d'audit", sub: "livraison garantie" },
];

const PROCESS_STEPS = [
  { step: "1", label: "Découverte", desc: "Échange initial & brief" },
  { step: "2", label: "Analyse", desc: "Audit & benchmark" },
  { step: "3", label: "Stratégie", desc: "Plan d'action détaillé" },
  { step: "4", label: "Exécution", desc: "Mise en œuvre & suivi" },
];

const CHANNELS = [
  { icon: <Globe size={15} />, label: "Web" },
  { icon: <BarChart2 size={15} />, label: "Analytics" },
  { icon: <TrendingUp size={15} />, label: "Growth" },
  { icon: <Users size={15} />, label: "Social" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border border-white/10 rounded-2xl p-7 transition-all duration-300 hover:border-fuchsia-500/30 hover:bg-fuchsia-950/10 cursor-default overflow-hidden"
    >
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(232,121,249,0.07) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
        }}
      />
      <span className="absolute top-4 right-6 text-[72px] font-bold leading-none text-white/[0.03] select-none transition-all duration-300 group-hover:text-fuchsia-400/10">
        {service.num}
      </span>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 transition-all duration-300 group-hover:bg-fuchsia-500/20 group-hover:border-fuchsia-400/40">
            {service.icon}
          </div>
          <span className="text-[11px] text-neutral-600 tracking-widest font-mono mt-1">
            {service.num}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
          {service.title}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed mb-5">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-neutral-500 bg-white/[0.03] tracking-wide"
            >
              {tag}
            </span>
          ))}
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

// ── Main View ──────────────────────────────────────────────────────────────────

export default function AccompagnementView({
  heroEyebrow,
  heroBody,
  strategicClients,
}: AccompagnementViewProps) {
  const clients =
    strategicClients && strategicClients.length
      ? strategicClients
      : STRATEGIC_CLIENTS;

  return (
    <div className="dark min-h-screen px-4 py-10 sm:px-6 w-full lg:px-8">
      <div className="mx-auto w-full ">
        <main className="border border-white/10 rounded-2xl overflow-hidden text-white">
          {/* ══════════════════════════════════════════
              HERO
          ══════════════════════════════════════════ */}
          <section className="relative min-h-[420px] ">
            <StarsBackground
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-xl",
                "dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)] bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#fff_100%)]",
              )}
            />
            <div className="max-w-[1920px] flex justify-center items-end border-b border-white/10 overflow-hidden m-auto">
              <div className="relative max-w-[1920px] m-auto z-10 w-full px-6 sm:px-10 pt-16 pb-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                  <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-fuchsia-400">
                    {heroEyebrow ?? "Accompagnement stratégique"}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-[3.25rem] font-bold leading-[1.08] tracking-tight max-w-2xl mb-5 text-white">
                  Une vision claire
                  <br />
                  <span className="font-normal italic text-fuchsia-300">
                    pour votre croissance
                  </span>
                </h1>
                <p className="text-[15px] text-neutral-400 leading-relaxed max-w-lg mb-8">
                  {heroBody ??
                    "Community management, audit digital et stratégie sur mesure pour votre croissance. Nous analysons votre présence actuelle et construisons des actions concrètes pour améliorer votre visibilité et vos performances."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-white text-neutral-900 hover:bg-neutral-200 rounded-lg px-5 h-10 text-sm font-medium transition-colors">
                    Démarrer un audit{" "}
                    <ArrowRight size={15} className="ml-1.5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-lg border-white/15 text-neutral-300 bg-transparent text-sm h-10 px-5 hover:bg-white/5 hover:text-white"
                  >
                    Voir les formules
                  </Button>
                </div>
              </div>{" "}
              <div
                className="shrink-0 w-full lg:w-[480px]"
                style={{ height: "420px" }}
              >
                <StoryBoardModel />
              </div>
            </div>
          </section>
          {/* ══════════════════════════════════════════
              SECTION 3 — Process (full-width 4-step grid)
          ══════════════════════════════════════════ */}
          <section className="border-b border-white/10 max-w-[1920px] m-auto px-6 sm:px-8 py-12">
            <SectionLabel>Notre processus</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {PROCESS_STEPS.map((item, i) => (
                <div
                  key={item.step}
                  className="bg-neutral-950 px-7 py-8 flex flex-col gap-4 group hover:bg-fuchsia-950/10 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 flex items-center justify-center text-[12px] font-bold text-fuchsia-400">
                      {item.step}
                    </div>
                    {i < PROCESS_STEPS.length - 1 && (
                      <ArrowRight
                        size={14}
                        className="text-neutral-800 hidden md:block group-hover:text-fuchsia-900 transition-colors"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.label}
                    </p>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* ══════════════════════════════════════════
              SECTION 1 — Metrics bar (full-width, 4 equal cols)
          ══════════════════════════════════════════ */}
          <section className="border-b border-white/10 max-w-[1920px] m-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-x divide-white/10">
              {/* Intro cell */}
              <div className="px-6 sm:px-8 py-8 flex flex-col justify-center gap-3 col-span-1">
                <SectionLabel>Résultats clients</SectionLabel>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Des chiffres mesurables, obtenus sur de vrais projets.
                </p>
              </div>

              {/* Metric cells */}
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="px-6 sm:px-8 py-8 flex flex-col justify-center gap-1"
                >
                  <span className="text-3xl sm:text-4xl font-bold text-fuchsia-400 tracking-tight leading-none">
                    {m.value}
                  </span>
                  <span className="text-sm text-white font-medium mt-1">
                    {m.label}
                  </span>
                  <span className="text-[11px] text-neutral-600">{m.sub}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              SECTION 2 — Services (2/3) + Sidebar (1/3)
          ══════════════════════════════════════════ */}
          <section className="border-b border-white/10 max-w-[1920px] m-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* Left — service cards */}
              <div className="px-6 sm:px-8 py-10">
                <SectionLabel>Nos services</SectionLabel>
                <div className="flex flex-col gap-4">
                  {SERVICES.map((service) => (
                    <ServiceCard key={service.num} service={service} />
                  ))}
                </div>
              </div>

              {/* Right sidebar — context + card + CTA */}
              <div className="px-6 sm:px-8 py-10 flex flex-col gap-8 bg-white/[0.01]">
                {/* Description */}
                <div>
                  <SectionLabel>Notre approche</SectionLabel>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Chaque marque a ses propres défis. Nous construisons une
                    approche sur mesure, basée sur des données concrètes — pas
                    des suppositions.
                  </p>
                </div>

                {/* Channel tags */}
                <div>
                  <SectionLabel>Canaux couverts</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {CHANNELS.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-1.5 text-[12px] text-neutral-400 border border-white/10 rounded-full px-3 py-1.5 bg-white/[0.02]"
                      >
                        <span className="text-fuchsia-400">{item.icon}</span>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* HoldingsCard */}
                <div>
                  <SectionLabel>Performance en temps réel</SectionLabel>
                  <HoldingsCard
                    accentColor="#e879f9"
                    title="Reach client"
                    badge="+340%"
                    period="6 mois"
                    baseValue={34200}
                    fluctuation={800}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 max-w-[1920px] m-auto px-6 sm:px-8 py-12">
            <SectionLabel>Clients accompagnés</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-fuchsia-400/30 transition-colors"
                >
                  <p className="text-base font-semibold text-white">
                    {client.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-fuchsia-400">
                    {client.sector}
                  </p>
                  <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                    {client.focus}
                  </p>
                </div>
              ))}
            </div>
          </section>
          {/* ══════════════════════════════════════════
              SECTION 4 — CTA banner
          ══════════════════════════════════════════ */}
          <section className="px-6 sm:px-8 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-gradient-to-r from-fuchsia-950/20 via-transparent to-transparent max-w-[1920px] m-auto">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={13} className="text-fuchsia-400" />
                <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-fuchsia-400">
                  Sans engagement
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Commençons par un audit
                <span className="font-normal italic text-neutral-400">
                  {" "}
                  de votre présence actuelle.
                </span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl px-6 h-11 text-sm font-semibold transition-colors">
                Démarrer un audit gratuit{" "}
                <ArrowRight size={15} className="ml-1.5" />
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
