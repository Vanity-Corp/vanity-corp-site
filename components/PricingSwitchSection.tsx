"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PricePlan = {
  name: string;
  monthly: string;
  yearly: string;
  description: string;
};

const plans: PricePlan[] = [
  {
    name: "Starter",
    monthly: "690€",
    yearly: "6 900€",
    description: "Pour lancer rapidement votre présence et produire régulièrement.",
  },
  {
    name: "Growth",
    monthly: "1 290€",
    yearly: "12 900€",
    description: "Pour accélérer avec un accompagnement plus stratégique et plus de contenu.",
  },
  {
    name: "Signature",
    monthly: "Sur devis",
    yearly: "Sur devis",
    description: "Un dispositif complet sur mesure selon vos objectifs business.",
  },
];

export default function PricingSwitchSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="tarifs" className="w-full px-4 md:px-10 py-16 md:py-24 bg-neutral-950 text-white scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="uppercase tracking-[0.25em] text-white/60 text-sm">Tarifs</p>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">Choisissez votre formule</h2>
          </div>

          <button
            onClick={() => setYearly((prev) => !prev)}
            className="w-fit flex items-center gap-3 rounded-full border border-white/20 px-3 py-2 bg-white/5"
            aria-label="Basculer entre mensuel et annuel"
          >
            <span className={!yearly ? "text-white" : "text-white/60"}>Mensuel</span>
            <span className="relative inline-flex h-6 w-12 items-center rounded-full bg-white/20">
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  yearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </span>
            <span className={yearly ? "text-white" : "text-white/60"}>Annuel</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="rounded-2xl border border-white/20 bg-white/[0.03] p-6 flex flex-col"
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-4xl font-bold mt-4">{yearly ? plan.yearly : plan.monthly}</p>
              <p className="text-white/70 mt-4 flex-1">{plan.description}</p>
              <Link href="/estimation" className="mt-6">
                <Button className="w-full rounded-full">Demander un devis</Button>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
