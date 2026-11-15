"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { CmsPricingPackage, PricingCategory } from "@/lib/payload-cms";

const TAB_LABELS: Record<PricingCategory, string> = {
  audio: "Audio",
  filming: "Tournage",
  turnkey: "Clé en main",
};

// Sous-titre affiché sous les onglets — même contenu que l'ancienne version
// statique, pas de champ CMS dédié pour ça (une seule phrase par catégorie).
const TAB_DESCRIPTIONS: Record<PricingCategory, string> = {
  audio:
    "Studio calme et équipé pour enregistrer vos podcasts, voix off, interviews et formats audio professionnels.",
  filming:
    "Studio équipé : lumière, fonds, micros, 2 caméras, 1 technicien présent, fichiers bruts fournis.",
  turnkey:
    "Notre équipe prend en charge votre production, du tournage au montage final.",
};

function formatPrice(offer: CmsPricingPackage): string | null {
  if (offer.price == null) return null;
  const prefix = offer.pricePrefix ? `${offer.pricePrefix} ` : "";
  return `${prefix}${offer.price}€`;
}

export function PricingWithSwitch({ packages }: { packages: CmsPricingPackage[] }) {
  const tabs = (Object.keys(TAB_LABELS) as PricingCategory[]).filter((key) =>
    packages.some((p) => p.category === key)
  );
  const [tab, setTab] = useState<PricingCategory>(tabs[0] ?? "audio");
  const offers = packages.filter((p) => p.category === tab);

  if (tabs.length === 0) return null;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 pb-16">
      {/* Sélecteur d'onglets */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-full bg-neutral-800 p-1">
          {tabs.map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${
                tab === key
                  ? "bg-white text-black"
                  : "text-white hover:text-neutral-200"
              }`}
            >
              {TAB_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Description de l'onglet */}
      <p className="mt-6 text-center text-sm text-neutral-300">
        {TAB_DESCRIPTIONS[tab]}
      </p>

      {/* Grille des cartes */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {offers.map((offer) => (
          <article
            key={offer.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-indigo-400/40 transition-colors flex flex-col h-fit"
          >
            <h3 className="text-xl font-semibold text-white">{offer.title}</h3>
            {formatPrice(offer) && (
              <p className="mt-2 text-3xl font-bold text-indigo-300">
                {formatPrice(offer)}
              </p>
            )}
            {offer.description && (
              <p className="mt-3 text-sm text-neutral-400">{offer.description}</p>
            )}

            {/* Détails pliables avec les fonctionnalités */}
            {offer.features.length > 0 && (
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
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
