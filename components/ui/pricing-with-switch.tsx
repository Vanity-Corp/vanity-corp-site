"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

// Descriptions partagées pour le sous-titre de l'onglet (affiché en haut)
const studioDescriptions = {
  audio:
    "Studio calme et équipé pour enregistrer vos podcasts, voix off, interviews et formats audio professionnels.",
  filming:
    "Studio équipé : lumière, fonds, micros, 2 caméras, 1 technicien présent, fichiers bruts fournis.",
  turnkey:
    "Notre équipe prend en charge votre production, du tournage au montage final.",
};

// Données : chaque onglet possède 3 offres avec description et features
const plans = {
  audio: {
    title: "Audio",
    description: studioDescriptions.audio,
    offers: [
      {
        name: "Heure",
        price: "80€",
        description: "Pour une prise de son rapide et professionnelle.",
        features: [
          "Enregistrement haute qualité",
          "Micros professionnels",
          "Prise de son isolée",
        ],
      },
      {
        name: "Demi-journée (4h)",
        price: "300€",
        description: "Idéal pour une session d'enregistrement complète.",
        features: [
          "Enregistrement haute qualité",
          "Micros professionnels",
          "Prise de son isolée",
          "Mixage préliminaire",
        ],
      },
      {
        name: "Journée (8h)",
        price: "500€",
        description: "Pour un projet audio exigeant.",
        features: [
          "Enregistrement haute qualité",
          "Micros professionnels",
          "Prise de son isolée",
          "Mixage complet",
          "Mastering léger",
        ],
      },
    ],
  },

  filming: {
    title: "Tournage",
    description: studioDescriptions.filming,
    offers: [
      {
        name: "Heure",
        price: "100€",
        description: "Pour une captation ponctuelle.",
        features: ["Captation 4K", "Éclairage studio", "Son direct"],
      },
      {
        name: "Demi-journée (4h)",
        price: "350€",
        description: "Pour un tournage efficace.",
        features: [
          "Captation 4K",
          "Éclairage studio",
          "Son direct",
          "Dérushage",
        ],
      },
      {
        name: "Journée (8h)",
        price: "650€",
        description: "Pour un tournage complet.",
        features: [
          "Captation 4K",
          "Éclairage studio",
          "Son direct",
          "Dérushage",
          "Montage basique",
        ],
      },
    ],
  },

  turnkey: {
    title: "Clé en main",
    description: studioDescriptions.turnkey,
    offers: [
      {
        name: "Demi-journée (4h)",
        price: "600€",
        description: "Solution rapide avec tout le nécessaire.",
        features: [
          "Captation multi-cam jusqu'à 3 caméras",
          "1 technicien / cadreur / monteur inclus",
          "Réglage lumière",
          "Enregistrement audio",
          "Dérush + export propre avec montage simple",
          "1 teaser court",
        ],
      },
      {
        name: "Journée (8h)",
        price: "1200€",
        description: "Pour une production complète en une journée.",
        features: [
          "Captation multi-cam jusqu'à 3 caméras",
          "1 technicien / cadreur / monteur inclus",
          "Réglage lumière",
          "Enregistrement audio",
          "Dérush + export propre avec montage simple",
          "1 teaser court",
        ],
      },
      {
        name: "Production Signature",
        price: "À partir de 1700€",
        description: "Accompagnement personnalisé de A à Z.",
        features: [
          "Direction artistique",
          "Aide à la structuration du format",
          "Captation",
          "Montage complet",
          "Extraits réseaux sociaux",
          "Mini stratégie de diffusion",
        ],
      },
    ],
  },
};

type Tab = keyof typeof plans;

export function PricingWithSwitch() {
  const [tab, setTab] = useState<Tab>("audio");
  const currentPlan = plans[tab];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 pb-16">
      {/* Sélecteur d'onglets (3 boutons) */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-full bg-neutral-800 p-1">
          {[
            { key: "audio", label: "Audio" },
            { key: "filming", label: "Tournage" },
            { key: "turnkey", label: "Clé en main" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key as Tab)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${
                tab === item.key
                  ? "bg-white text-black"
                  : "text-white hover:text-neutral-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description de l'onglet (si présente) */}
      {"description" in currentPlan && (
        <p className="mt-6 text-center text-sm text-neutral-300">
          {currentPlan.description}
        </p>
      )}

      {/* Grille des 3 cartes avec le nouveau style */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {currentPlan.offers.map((offer) => (
          <article
            key={offer.name}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-indigo-400/40 transition-colors flex flex-col h-fit"
          >
            <h3 className="text-xl font-semibold text-white">{offer.name}</h3>
            <p className="mt-2 text-3xl font-bold text-indigo-300">
              {offer.price}
            </p>
            <p className="mt-3 text-sm text-neutral-400">{offer.description}</p>

            {/* Détails pliables avec les fonctionnalités */}
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
