"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import BorderGlow from "./BorderGlow";

const plans = {
  monthly: [
    {
      name: "Starter",
      price: "390€",
      description: "Pour les besoins ponctuels.",
      points: ["1 projet inclus", "Support par email", "Livraison rapide"],
    },
    {
      name: "Pro",
      price: "890€",
      description: "Pour une production régulière.",
      points: [
        "Jusqu’à 3 projets",
        "Support prioritaire",
        "Suivi personnalisé",
      ],
    },
    {
      name: "Premium",
      price: "1490€",
      description: "Accompagnement complet.",
      points: ["Projets illimités", "Stratégie sur mesure", "Support dédié"],
    },
  ],
  yearly: [
    {
      name: "Starter",
      price: "3900€",
      description: "Engagement annuel allégé.",
      points: ["1 projet inclus", "Support par email", "Livraison rapide"],
    },
    {
      name: "Pro",
      price: "8900€",
      description: "Production + stratégie continue.",
      points: [
        "Jusqu’à 3 projets",
        "Support prioritaire",
        "Suivi personnalisé",
      ],
    },
    {
      name: "Premium",
      price: "14900€",
      description: "Solution full service annuelle.",
      points: ["Projets illimités", "Stratégie sur mesure", "Support dédié"],
    },
  ],
};

export function PricingWithSwitch() {
  const [isYearly, setIsYearly] = useState(false);
  const currentPlans = isYearly ? plans.yearly : plans.monthly;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-white">
        Nos tarifs
      </h2>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="relative inline-flex h-10 w-56 items-center rounded-full bg-neutral-800 p-1"
          aria-label="Basculer entre mensuel et annuel"
        >
          <span
            className={`absolute top-1 h-8 w-[108px] rounded-full bg-white transition-transform ${
              isYearly ? "translate-x-[108px]" : "translate-x-0"
            }`}
          />
          <span
            className={`relative z-10 w-1/2 text-sm font-medium ${
              isYearly ? "text-white" : "text-black"
            }`}
          >
            Mensuel
          </span>
          <span
            className={`relative z-10 w-1/2 text-sm font-medium ${
              isYearly ? "text-black" : "text-white"
            }`}
          >
            Annuel
          </span>
        </button>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {currentPlans.map((plan) => (
          <BorderGlow
            edgeSensitivity={0}
            glowColor="40 80 80"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={["#c084fc", "#f472b6", "#38bdf8"]}
            key={plan.name}
          >
            <article className=" p-6 text-white">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-4 text-4xl font-bold">{plan.price}</p>
              <p className="mt-3 text-sm text-neutral-300">
                {plan.description}
              </p>

              <ul className="mt-5 space-y-3">
                {plan.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-neutral-200"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-6 w-full rounded-full bg-white text-black py-2 font-medium">
                Choisir cette offre
              </button>
            </article>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
}
