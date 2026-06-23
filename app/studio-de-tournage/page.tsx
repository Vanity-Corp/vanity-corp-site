"use client";

import { useState, Suspense } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  SunMedium,
  Video,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

const StudioModel = dynamic(() => import("@/components/StudioModel"), {
  ssr: false,
});

// ── Types ─────────────────────────────────────────────────────────────────────

interface Feature {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Stat {
  value: string;
  label: string;
}

interface TimeSlot {
  id: string;
  label: string;
  available: boolean;
}

const GreenScreenModel = dynamic(
  () => import("@/components/GreenScreenModel"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
      </div>
    ),
  },
);

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    num: "01",
    title: "Espace modulable",
    description:
      "Un studio adaptable pour différents formats de tournage, du contenu social media aux productions plus ambitieuses.",
    icon: <LayoutDashboard size={18} />,
  },
  {
    num: "02",
    title: "Éclairage professionnel",
    description:
      "Des solutions d'éclairage optimisées pour garantir un rendu visuel cohérent et esthétique sur tous vos formats.",
    icon: <SunMedium size={18} />,
  },
  {
    num: "03",
    title: "Matériel disponible",
    description:
      "Accédez à l'équipement essentiel pour produire efficacement sans contraintes techniques lors de vos tournages.",
    icon: <Video size={18} />,
  },
];

const STATS: Stat[] = [
  { value: "120m²", label: "Surface totale" },
  { value: "4K", label: "Résolution maximale" },
  { value: "3", label: "Configurations d'espace" },
  { value: "24h", label: "Accès flexible" },
];

const TIME_SLOTS: TimeSlot[] = [
  { id: "am", label: "Matinée — 08h à 12h", available: true },
  { id: "pm", label: "Après-midi — 13h à 17h", available: true },
  { id: "eve", label: "Soirée — 18h à 22h", available: false },
  { id: "day", label: "Journée complète — 08h à 17h", available: true },
];

// ── Hero background (Unsplash, cinematic studio atmosphere) ───────────────────
const HERO_IMAGE = "/img/studio.jpg";

const PRICING_OFFERS = [
  {
    name: "Essentiel",
    price: "Demi-journée",
    description: "Pour contenus courts et interviews.",
    features: [
      "Accès plateau",
      "Éclairage de base",
      "Assistance installation",
      "Créneau 4h",
    ],
  },
  {
    name: "Production",
    price: "Journée",
    description: "Le format recommandé pour tourner sereinement.",
    features: [
      "Accès plateau journée",
      "Kit lumière complet",
      "Espace préparation",
      "Support technique",
    ],
  },
  {
    name: "Sur mesure",
    price: "Projet",
    description: "Pour productions complexes et équipes élargies.",
    features: [
      "Repérage",
      "Options matériel",
      "Planning dédié",
      "Accompagnement Vanity",
    ],
  },
];

const ACCESSIBILITY_ROWS = [
  {
    city: "Paris (RER B - Orsay Ville)",
    time: "20 min",
    transport: "RER B + navette / taxi",
    road: "N118 / A10",
    parking: "Sur place",
  },
  {
    city: "Versailles",
    time: "25 min",
    transport: "Voiture / VTC",
    road: "N118",
    parking: "Sur place",
  },
  {
    city: "Massy",
    time: "10 min",
    transport: "RER B / voiture",
    road: "A10 / N118",
    parking: "Sur place",
  },
  {
    city: "Gif-sur-Yvette",
    time: "10 min",
    transport: "RER B / bus",
    road: "D306",
    parking: "Sur place",
  },
  {
    city: "Orly",
    time: "25 min",
    transport: "Orlyval + RER B / voiture",
    road: "A10 / A6",
    parking: "Sur place",
  },
  {
    city: "Évry",
    time: "20 min",
    transport: "Voiture / VTC",
    road: "N104 / A10",
    parking: "Sur place",
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function FeatureCard({ feature }: { feature: Feature }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-1 p-8 cursor-default transition-colors duration-200 hover:bg-white/5"
    >
      {/* Animated top line */}
      <div
        className="absolute top-0 left-0 h-px bg-white transition-all duration-300 ease-out"
        style={{ width: hovered ? "100%" : "0%" }}
      />

      <div className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center mb-6 text-neutral-300">
        {feature.icon}
      </div>

      <p className="text-[11px] text-indigo-400 tracking-widest mb-3">
        {feature.num}
      </p>

      <h3 className="text-base font-semibold leading-snug mb-3 text-white">
        {feature.title}
      </h3>

      <p className="text-sm text-neutral-400 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

function StatCard({ stat, last }: { stat: Stat; last?: boolean }) {
  return (
    <div
      className={`flex-1 px-8 py-7 min-w-[120px] ${
        !last ? "border-r border-white/10" : ""
      }`}
    >
      <div className="text-4xl font-bold leading-none mb-1.5 text-white tracking-tight">
        {stat.value}
      </div>
      <div className="text-xs text-neutral-500 tracking-wide">{stat.label}</div>
    </div>
  );
}

function FloorPlanSVG() {
  return (
    <svg
      viewBox="0 0 260 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[260px]"
    >
      <rect
        width="260"
        height="140"
        rx="6"
        fill="#111"
        stroke="#2a2a2a"
        strokeWidth="0.5"
      />
      <rect x="12" y="12" width="236" height="116" rx="4" fill="#0d0d0d" />
      <line
        x1="12"
        y1="80"
        x2="248"
        y2="80"
        stroke="#2a2a2a"
        strokeWidth="0.5"
      />
      <line
        x1="130"
        y1="12"
        x2="130"
        y2="128"
        stroke="#2a2a2a"
        strokeWidth="0.5"
        strokeDasharray="4 3"
      />
      <circle
        cx="130"
        cy="80"
        r="30"
        fill="#111"
        stroke="#333"
        strokeWidth="0.5"
      />
      <circle cx="130" cy="80" r="5" fill="#f5f5f5" />
      <line
        x1="130"
        y1="50"
        x2="130"
        y2="57"
        stroke="#f5f5f5"
        strokeWidth="1"
      />
      <line
        x1="130"
        y1="103"
        x2="130"
        y2="110"
        stroke="#f5f5f5"
        strokeWidth="1"
      />
      <line
        x1="100"
        y1="80"
        x2="107"
        y2="80"
        stroke="#f5f5f5"
        strokeWidth="1"
      />
      <line
        x1="153"
        y1="80"
        x2="160"
        y2="80"
        stroke="#f5f5f5"
        strokeWidth="1"
      />
      <rect
        x="30"
        y="28"
        width="24"
        height="16"
        rx="2"
        fill="#f5f5f5"
        fillOpacity="0.06"
        stroke="#2a2a2a"
        strokeWidth="0.5"
      />
      <rect
        x="208"
        y="28"
        width="24"
        height="16"
        rx="2"
        fill="#f5f5f5"
        fillOpacity="0.06"
        stroke="#2a2a2a"
        strokeWidth="0.5"
      />
      <rect
        x="30"
        y="95"
        width="24"
        height="16"
        rx="2"
        fill="#f5f5f5"
        fillOpacity="0.06"
        stroke="#2a2a2a"
        strokeWidth="0.5"
      />
      <rect
        x="208"
        y="95"
        width="24"
        height="16"
        rx="2"
        fill="#f5f5f5"
        fillOpacity="0.06"
        stroke="#2a2a2a"
        strokeWidth="0.5"
      />
      <circle cx="42" cy="36" r="3" fill="#f5f5f5" fillOpacity="0.3" />
      <circle cx="220" cy="36" r="3" fill="#f5f5f5" fillOpacity="0.3" />
      <text
        x="130"
        y="134"
        fontSize="8"
        fill="#444"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        Vue aérienne — plan de studio
      </text>
    </svg>
  );
}

function PricingSection() {
  return (
    <section className="border-b border-white/10 max-w-[1920px] m-auto px-6 sm:px-10 py-12">
      <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-4">
        Offres studio
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {PRICING_OFFERS.map((offer) => (
          <article
            key={offer.name}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-indigo-400/40 transition-colors"
          >
            <h3 className="text-xl font-semibold text-white">{offer.name}</h3>
            <p className="mt-2 text-3xl font-bold text-indigo-300">
              {offer.price}
            </p>
            <p className="mt-3 text-sm text-neutral-400">{offer.description}</p>
            <details className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 open:border-indigo-400/30">
              <summary className="cursor-pointer text-sm font-medium text-white">
                Voir les détails
              </summary>
              <ul className="mt-4 space-y-3">
                {offer.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-neutral-300"
                  >
                    <CheckCircle2 size={14} className="text-indigo-300" />
                    {feature}
                  </li>
                ))}
              </ul>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}

function AccessibilitySection() {
  return (
    <section className="border-b border-white/10 max-w-[1920px] m-auto px-6 sm:px-10 py-12">
      <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-4">
        Accessibilité
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-white/[0.06] text-left text-neutral-300">
            <tr>
              {[
                "Ville",
                "Temps",
                "Transports",
                "Accès routiers",
                "Stationnement",
              ].map((h) => (
                <th key={h} className="px-5 py-4 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {ACCESSIBILITY_ROWS.map((row) => (
              <tr key={row.city} className="text-neutral-400">
                <td className="px-5 py-4 text-white">{row.city}</td>
                <td className="px-5 py-4 text-indigo-300 font-semibold">
                  {row.time}
                </td>
                <td className="px-5 py-4">{row.transport}</td>
                <td className="px-5 py-4">{row.road}</td>
                <td className="px-5 py-4">{row.parking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ReservationUXSection() {
  return (
    <section className="border-b border-white/10 max-w-[1920px] m-auto px-6 sm:px-10 py-12">
      <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-4">
        Fonctionnement réservation
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Marge avant validation",
            text: "Le calendrier collecte une intention de réservation : date et créneau restent modifiables tant que la demande n'est pas confirmée par l'équipe.",
          },
          {
            title: "Pré-validation",
            text: "Une demande complète peut être pré-validée côté équipe après vérification de disponibilité, puis transformée en confirmation définitive.",
          },
          {
            title: "Avant confirmation",
            text: "L'utilisateur reçoit un retour sous 24h. UX recommandée : email automatique récapitulatif + statut “en attente de validation”.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Reservation Section ───────────────────────────────────────────────────────

function ReservationSection() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (date && selectedSlot) setSubmitted(true);
  };

  const formattedDate = date
    ? date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section
      id="reservation"
      className="border-t border-white/10 m-auto  max-w-[1920px]"
    >
      {/* Header */}
      <div className="px-6 sm:px-10 py-10 border-b border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-indigo-400 border border-indigo/40 rounded-full px-3.5 py-1 mb-4">
            Réservation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
            Choisissez votre
            <br />
            <span className="font-normal text-indigo-400 italic">
              créneau de tournage
            </span>
          </h2>
        </div>
        <p className="text-sm text-neutral-500 max-w-xs leading-relaxed md:text-right">
          Sélectionnez une date et un horaire. Notre équipe confirmera la
          disponibilité sous 24h.
        </p>
      </div>

      {/* Calendar + Slots grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Left — Calendar */}
        <div className="px-6 sm:px-10 py-10">
          <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-6">
            01 — Choisir une date
          </p>

          <div className="dark w-[70%] rounded-2xl border border-white/10 bg-neutral-950 shadow-xl shadow-black/40 p-3 m-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl w-full "
              disabled={{ before: new Date() }}
            />
          </div>

          {date && (
            <div className="mt-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
              <p className="text-sm text-neutral-300 capitalize">
                {formattedDate}
              </p>
            </div>
          )}
        </div>

        {/* Right — Slots + Summary */}
        <div className="px-6 sm:px-10 py-10 flex flex-col gap-8">
          {/* Time slots */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-6">
              02 — Choisir un créneau
            </p>
            <div className="flex flex-col gap-2.5">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    disabled={!slot.available}
                    onClick={() => slot.available && setSelectedSlot(slot.id)}
                    className={[
                      "flex items-center justify-between w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150 text-left",
                      !slot.available
                        ? "border-white/5 bg-white/[0.02] text-neutral-700 cursor-not-allowed"
                        : isSelected
                          ? "border-white bg-white text-neutral-900 shadow-lg shadow-white/10"
                          : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/30 hover:bg-white/10 cursor-pointer",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock
                        size={14}
                        className={
                          !slot.available
                            ? "text-neutral-700"
                            : isSelected
                              ? "text-neutral-900"
                              : "text-neutral-500"
                        }
                      />
                      <span>{slot.label}</span>
                    </div>

                    {!slot.available && (
                      <Badge
                        variant="outline"
                        className="text-[10px] text-neutral-700 border-white/10 font-normal bg-transparent"
                      >
                        Indisponible
                      </Badge>
                    )}

                    {isSelected && (
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-neutral-900"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary + CTA */}
          <div className="mt-auto">
            <div
              className={[
                "rounded-2xl border p-5 mb-5 transition-all duration-200",
                date && selectedSlot
                  ? "border-white/10 bg-white/5"
                  : "border-dashed border-white/10 bg-transparent",
              ].join(" ")}
            >
              <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-3">
                Récapitulatif
              </p>
              {!date && !selectedSlot ? (
                <p className="text-sm text-indigo-400 italic">
                  Aucune sélection pour le moment.
                </p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {date && (
                    <div className="flex items-baseline gap-2 text-sm text-neutral-200">
                      <span className="text-neutral-500 shrink-0">Date —</span>
                      <span className="font-medium capitalize">
                        {formattedDate}
                      </span>
                    </div>
                  )}
                  {selectedSlot && (
                    <div className="flex items-baseline gap-2 text-sm text-neutral-200">
                      <span className="text-neutral-500 shrink-0">
                        Créneau —
                      </span>
                      <span className="font-medium">
                        {TIME_SLOTS.find((s) => s.id === selectedSlot)?.label}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {submitted ? (
              <div className="flex items-center gap-3 rounded-xl bg-white text-neutral-900 px-5 py-4">
                <CheckCircle2 size={16} className="shrink-0 text-neutral-900" />
                <p className="text-sm font-medium">
                  Demande envoyée — nous confirmons sous 24h.
                </p>
              </div>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!date || !selectedSlot}
                className="w-full h-12 rounded-xl bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-100 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                Envoyer la demande →
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function StudioPage() {
  return (
    // Full-bleed dark wrapper — centers content with max-width
    <div className="dark min-h-screen w-full pt-10 ">
      <div className="mx-auto w-full ">
        <main className=" border border-white/10 rounded-2xl overflow-hidden text-white">
          {/* ── Hero ── */}
          <section className="relative min-h-[420px] ">
            <div className="max-w-[1920px] flex justify-center items-end border-b border-white/10 overflow-hidden m-auto">
              {/* Dark gradient overlay — top transparent, bottom solid */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950" />
              {/* Subtle vertical grid lines on top */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.3) 79px, rgba(255,255,255,0.3) 80px)",
                }}
              />

              {/* Content */}
              <div className="relative z-10 w-full px-6 sm:px-10 pt-16 pb-12 ">
                <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-indigo-400 border border-white/20 rounded-full px-3.5 py-1 mb-6 backdrop-blur-sm bg-white/5">
                  Studio de tournage
                </span>

                <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight max-w-lg mb-5 text-white">
                  Des espaces pensés
                  <br />
                  pour vos{" "}
                  <span className="font-normal italic text-indigo-300">
                    productions
                  </span>
                </h1>

                <p className="text-[15px] text-neutral-400 leading-relaxed max-w-xl mb-8">
                  Découvrez nos espaces, équipements et options de location pour
                  vos productions. Nous mettons à disposition un environnement
                  professionnel conçu pour maximiser la qualité de vos contenus
                  tout en simplifiant vos tournages.
                </p>

                <Button
                  asChild
                  className="bg-white text-neutral-900 hover:bg-neutral-200 rounded-lg px-5 h-10 text-sm font-medium transition-colors"
                >
                  <a href="mailto:contact@krtstudios.fr?subject=Demande%20de%20visite%20studio">
                    Prévoir une visite →
                  </a>
                </Button>
              </div>
              <div
                className="shrink-0 w-full lg:w-[480px]"
                style={{ height: "420px" }}
              >
                <GreenScreenModel />
              </div>
            </div>
          </section>

          <PricingSection />

          {/* ── Stats ── */}
          <div className="flex max-w-[1920px] m-auto flex-wrap border-b border-white/10 divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                stat={stat}
                last={i === STATS.length - 1}
              />
            ))}
          </div>

          {/* ── Booking info + floor plan ── */}
          <div className="flex m-auto  max-w-[1920px] flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
            <div className="flex-1 px-6 sm:px-10 py-10">
              <h2 className="text-2xl font-semibold leading-snug mb-3 text-white">
                Réservez votre
                <br />
                créneau de tournage
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xs mb-7">
                Que ce soit pour une demi-journée ou une semaine complète, nos
                formules s&apos;adaptent à vos besoins et à votre budget de
                production.
              </p>
              <div className="mb-7 grid gap-3">
                {FEATURES.map((feature) => (
                  <div
                    key={feature.num}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-300/20 text-indigo-300">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-indigo-400">
                        {feature.num}
                      </p>
                      <h3 className="text-sm font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Button className="bg-white text-neutral-900 hover:bg-neutral-200 rounded-lg text-sm h-10 px-5 transition-colors">
                  Voir les tarifs
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-lg border-white/10 text-neutral-300 bg-transparent text-sm h-10 px-5 hover:bg-white/5 hover:text-white"
                >
                  <a href="mailto:contact@krtstudios.fr?subject=Demande%20de%20visite%20studio">
                    Demander une visite
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex-1 px-6 sm:px-10 py-10 bg-white/[0.02] flex flex-col justify-between min-h-[220px] md:h-[500px]">
              <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-4">
                Aperçu de l&apos;espace
              </p>
              <div className="flex-1 flex items-center justify-center md:h-[500px]">
                <StudioModel />
              </div>
              <span className="inline-block text-[11px] text-indigo-400 border border-white/10 rounded-full px-3 py-1 mt-4 w-fit">
                Plan interactif disponible sur demande
              </span>
            </div>
          </div>

          <AccessibilitySection />

          <ReservationUXSection />

          {/* ── Reservation with Calendar ── */}
          <ReservationSection />
        </main>
      </div>
      <Footer />
    </div>
  );
}
