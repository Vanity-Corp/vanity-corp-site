"use client";

import { useState, Suspense, useEffect } from "react";
import Script from "next/script";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
import { ContactModal } from "@/components/ContactModal";
import { PricingWithSwitch } from "@/components/ui/pricing-with-switch";
import Link from "next/link";
import { InstagramGallery } from "@/components/InstagramGallery";

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
      "Un studio adaptable pour vos shootings photo, podcasts, interviews, vidéos corporate, contenus TikTok, Reels Instagram, YouTube et productions pour les réseaux sociaux.",
    icon: <LayoutDashboard size={18} />,
  },
  {
    num: "02",
    title: "Éclairage professionnel",
    description:
      "Des solutions d'éclairage optimisées pour garantir un rendu visuel propre, cohérent et esthétique sur tous vos formats.",
    icon: <SunMedium size={18} />,
  },
  {
    num: "03",
    title: "Matériel disponible",
    description:
      "Accédez à l'équipement essentiel pour produire efficacement : fonds, lumière, micros, caméras et accompagnement technique selon votre formule.",
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
  { id: "am", label: "Matinée - 8h à 13h", available: true },
  { id: "pm", label: "Après midi - 14h à 18h", available: true },
  { id: "eve", label: "Soirée - 18h à 22h", available: true },
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

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const borderClass = [
    index % 2 === 0 ? "border-r" : "",
    index < STATS.length - 2 ? "border-b" : "",
    "sm:border-b-0",
    index < STATS.length - 1 ? "sm:border-r" : "sm:border-r-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`min-w-[120px] px-4 py-6 border-white/10 sm:px-8 sm:py-7 ${borderClass}`}
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
    <section
      id="pricing"
      className="border-b border-white/10 max-w-[1920px] m-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12"
    >
      <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-4">
        Offres studio
      </p>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-neutral-400">
        Choisissez la formule adaptée à votre production : location audio,
        tournage équipé ou accompagnement clé en main.
      </p>
      <PricingWithSwitch />
    </section>
  );
}

function AccessibilitySection() {
  return (
    <section className="border-b border-white/10 max-w-[1920px] m-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
      <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-4">
        Accessibilité
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 [-webkit-overflow-scrolling:touch]">
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
    <section className="border-b border-white/10 max-w-[1920px] m-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
      <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-4">
        Fonctionnement réservation
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "1- Choisissez votre créneau",
            text: "Sélectionnez la date et l’horaire qui correspondent à votre projet de shooting, de podcast ou de tournage.",
          },
          {
            title: "2- Validation de votre demande",
            text: "Notre équipe vérifie la disponibilité du studio et vous confirme votre réservation, ou vous contacte si des précisions sont nécessaires.",
          },
          {
            title: "3- Confirmez votre réservation",
            text: "Une fois votre demande validée, vous disposez de 4 heures pour effectuer le règlement et confirmer définitivement votre créneau.",
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
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Schéma de validation avec Zod
  const formSchema = z.object({
    fullName: z.string().min(1, "Nom et prénom requis"),
    email: z.string().email("Email invalide").min(1, "Email requis"),
    phone: z.string().min(10, "Numéro de téléphone invalide"),
    clientType: z.enum(["particulier", "societe"]),
    projectDescription: z.string().min(1, "Veuillez décrire votre projet"),
  });
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      clientType: "particulier",
    },
  });

  // Plages horaires par créneau
  const hourSlots = [
    {
      group: "Matinée",
      hours: ["8h-9h", "9h-10h", "10h-11h", "11h-12h", "12h-13h"],
    },
    {
      group: "Après‑midi",
      hours: ["14h-15h", "15h-16h", "16h-17h", "17h-18h"],
    },
    { group: "Soirée", hours: ["18h-19h", "19h-20h", "20h-21h", "21h-22h"] },
  ];

  const toggleHour = (hour: string) => {
    setSelectedHours((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour],
    );
  };

  const onSubmit = async (data: FormValues) => {
    if (!date || selectedHours.length === 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const formattedDate = date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const hoursString = selectedHours.sort().join(", ");

    try {
      const response = await fetch("/api/emails/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          date: formattedDate,
          hours: hoursString,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      setSubmitted(true);
      // Optionnel : réinitialiser le formulaire et les sélections
      // form.reset();
      // setSelectedHours([]);
      // setDate(undefined);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Une erreur est survenue.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = date
    ? date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const isFormValid =
    date &&
    selectedHours.length > 0 &&
    form.formState.isValid &&
    form.formState.isDirty;

  return (
    <section
      id="reservation"
      className="border-t border-white/10 m-auto max-w-[1920px]"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-10 py-8 sm:py-10 border-b border-white/10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
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
          Que ce soit pour une heure, une demi-journée ou une journée complète,
          nos formules s’adaptent à vos besoins, à votre budget et au format de
          votre production.
        </p>
      </div>

      {/* Trois colonnes : calendrier / heures / formulaire */}
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* 01 — Calendrier */}
        <div className="px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-6">
            01 — Choisir une date
          </p>
          <div className="dark w-full overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950 p-2 shadow-xl shadow-black/40 sm:p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto rounded-xl"
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

        {/* 02 — Sélection des heures */}
        <div className="px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-6">
            02 — Choisir vos heures
          </p>
          <div className="space-y-6">
            {hourSlots.map((group) => (
              <div key={group.group}>
                <h4 className="text-sm font-medium text-neutral-300 mb-2">
                  {group.group}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.hours.map((hour) => {
                    const isSelected = selectedHours.includes(hour);
                    return (
                      <button
                        key={hour}
                        onClick={() => toggleHour(hour)}
                        className={[
                          "px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150",
                          isSelected
                            ? "border-white bg-white text-neutral-900 shadow-lg shadow-white/10"
                            : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/30 hover:bg-white/10",
                        ].join("  ")}
                      >
                        {hour}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {selectedHours.length > 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-400">
              <CheckCircle2 size={14} className="text-indigo-400" />
              <span>{selectedHours.length} heure(s) sélectionnée(s)</span>
            </div>
          )}
        </div>

        {/* 03 — Formulaire projet (avec React Hook Form + Zod) */}
        <div className="px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-6">
            03 — Parlez‑nous de votre projet
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-neutral-300">
                      Nom et prénom *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jean Dupont"
                        className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-neutral-300">
                      Email *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jean@exemple.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-neutral-300">
                      Numéro de téléphone *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="06 12 34 56 78"
                        className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-neutral-300">
                      Vous êtes *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Choisir..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-neutral-900 border-white/10 text-white">
                        <SelectItem value="particulier">Particulier</SelectItem>
                        <SelectItem value="societe">
                          Société / Professionnel
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-neutral-300">
                      Décrivez votre projet *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Shooting photo, podcast, vidéo corporate, etc. – précisez vos besoins"
                        className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 resize-y min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Récapitulatif + Bouton d’envoi */}
              <div className="pt-4">
                <div
                  className={[
                    "rounded-2xl border p-4 mb-4 transition-all duration-200",
                    date && selectedHours.length > 0
                      ? "border-white/10 bg-white/5"
                      : "border-dashed border-white/10 bg-transparent",
                  ].join("  ")}
                >
                  <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-2">
                    Récapitulatif
                  </p>
                  {!date && selectedHours.length === 0 ? (
                    <p className="text-sm text-indigo-400 italic">
                      Aucune sélection pour le moment.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {date && (
                        <div className="flex items-baseline gap-2 text-sm text-neutral-200">
                          <span className="text-neutral-500 shrink-0">
                            Date —
                          </span>
                          <span className="font-medium capitalize">
                            {formattedDate}
                          </span>
                        </div>
                      )}
                      {selectedHours.length > 0 && (
                        <div className="flex items-baseline gap-2 text-sm text-neutral-200">
                          <span className="text-neutral-500 shrink-0">
                            Heures —
                          </span>
                          <span className="font-medium">
                            {selectedHours.sort().join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {submitted ? (
                  <div className="flex items-center gap-3 rounded-xl bg-white text-neutral-900 px-5 py-4">
                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-neutral-900"
                    />
                    <p className="text-sm font-medium">
                      Demande envoyée — nous confirmons sous 24h.
                    </p>
                  </div>
                ) : (
                  <>
                    <Button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full h-12 rounded-xl bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-100 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting
                        ? "Envoi en cours..."
                        : "Envoyer la demande →"}
                    </Button>
                    {submitError && (
                      <p className="text-red-400 text-sm mt-2">{submitError}</p>
                    )}
                  </>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
function InstagramFeed() {
  // Charge le script Instagram une fois le composant monté
  useEffect(() => {
    // Vérifier si le script est déjà présent
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Si déjà présent, forcer le rechargement des embed
      const instgrm = (window as any).instgrm;
      if (instgrm?.Embeds) {
        instgrm.Embeds.process();
      }
    }
  }, []);

  return (
    <section className="border-b border-white/10 max-w-[1920px] m-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
      <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-4">
        Instagram
      </p>
      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-6">
        Nos dernières
        <br />
        <span className="font-normal text-indigo-400 italic">réalisations</span>
      </h2>

      <div className="flex justify-center">
        <div className="w-full max-w-[1920px] rounded-2xl border border-white/10 bg-neutral-950/50 p-4 shadow-xl shadow-black/40">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/vanihouse.studio/"
            data-instgrm-version="14"
            style={{
              background: "transparent",
              border: "0",
              borderRadius: "12px",
              maxWidth: "100%",
              minWidth: "auto",
              padding: "0",
              width: "100%",
            }}
          >
            <div style={{ padding: "16px" }}>
              <a
                href="https://www.instagram.com/vanihouse.studio/"
                style={{ color: "#c084fc", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                @vanihouse.studio
              </a>
              <p
                style={{
                  color: "#888",
                  fontSize: "14px",
                  marginTop: "8px",
                  marginBottom: "0",
                }}
              >
                Découvrez l’ambiance de notre studio en images.
              </p>
            </div>
          </blockquote>
        </div>
      </div>

      <div className="text-center mt-6">
        <a
          href="https://www.instagram.com/vanihouse.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors border-b border-indigo-400/30 hover:border-indigo-300"
        >
          Voir plus sur Instagram →
        </a>
      </div>
    </section>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function StudioPage() {
  return (
    // Full-bleed dark wrapper — centers content with max-width
    <div className="dark min-h-screen w-full overflow-x-hidden pt-4 sm:pt-8 lg:pt-10">
      <div className="mx-auto w-full px-0 sm:px-4">
        <main className="overflow-hidden border-y border-white/10 text-white sm:rounded-2xl sm:border">
          {/* ── Hero ── */}
          <section className="relative min-h-[auto] lg:min-h-[420px]">
            <div className="relative m-auto flex max-w-[1920px] flex-col items-stretch justify-end overflow-hidden border-b border-white/10 lg:flex-row lg:items-end">
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
              <div className="relative z-10 w-full px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-10">
                <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-indigo-400 border border-white/20 rounded-full px-3.5 py-1 mb-6 backdrop-blur-sm bg-white/5">
                  Studio de tournage à Massy
                </span>

                <h1 className="max-w-lg text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl mb-5">
                  Des espaces pensés
                  <br />
                  pour vos{" "}
                  <span className="font-normal italic text-indigo-300">
                    productions
                  </span>
                </h1>

                <p className="text-[15px] text-neutral-400 leading-relaxed max-w-xl mb-8">
                  Louez un studio photo, vidéo et podcast à Massy, dans
                  l’Essonne, pour réaliser vos shootings, interviews, contenus
                  social media, podcasts filmés et tournages professionnels.
                  Vanihouse vous accueille dans un espace équipé, modulable et
                  facile d’accès, pensé pour produire du contenu de qualité à
                  proximité de Paris.
                </p>

                <ContactModal className="bg-white text-black rounded-lg px-5 h-10 text-sm font-medium transition-colors">
                  Prévoir une visite →
                </ContactModal>
              </div>
              <div
                className="relative z-10 h-[300px] w-full shrink-0 sm:h-[360px] lg:h-[420px] lg:w-[480px]"
              >
                <GreenScreenModel />
              </div>
            </div>
          </section>

          <PricingSection />

          {/* ── Stats ── */}
          <div className="m-auto grid max-w-[1920px] grid-cols-2 border-b border-white/10 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={i}
              />
            ))}
          </div>

          {/* ── Booking info + floor plan ── */}
          <div className="m-auto flex max-w-[1920px] flex-col divide-y divide-white/10 border-b border-white/10 lg:flex-row lg:divide-x lg:divide-y-0">
            <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
              <h2 className="text-2xl font-semibold leading-snug mb-3 text-white">
                Réservez votre
                <br />
                créneau de tournage
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xs mb-7">
                Que ce soit pour une heure, une demi-journée ou une journée
                complète, nos formules s&apos;adaptent à vos besoins, à votre
                budget et au format de votre production.
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
                <Link href={"#pricing"} className="w-full sm:w-auto">
                  <Button className="h-10 w-full rounded-lg bg-white px-5 text-sm text-neutral-900 transition-colors hover:bg-neutral-200 sm:w-auto">
                    Voir les tarifs
                  </Button>
                </Link>

                <Link href={"#reservation"} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-10 w-full rounded-lg bg-transparent px-5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white sm:w-auto"
                  >
                    Réserver
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex min-h-[320px] flex-1 flex-col justify-between bg-white/[0.02] px-4 py-8 sm:px-6 sm:py-10 lg:h-[500px] lg:px-10">
              <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-4">
                Aperçu de l&apos;espace
              </p>
              <div className="flex min-h-[240px] flex-1 items-center justify-center lg:h-[500px]">
                <StudioModel />
              </div>
            </div>
          </div>

          <ReservationUXSection />

          <InstagramGallery />
          {/* ── Reservation with Calendar ── */}
          <ReservationSection />
          <AccessibilitySection />
        </main>
      </div>
      <Footer />
    </div>
  );
}
