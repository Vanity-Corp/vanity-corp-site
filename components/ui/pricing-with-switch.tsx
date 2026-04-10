"use client";

import { useState } from "react";

const plans = {
  monthly: [
    { name: "Starter", price: "390€", description: "Pour les besoins ponctuels." },
    { name: "Pro", price: "890€", description: "Pour une production régulière." },
    { name: "Premium", price: "1490€", description: "Accompagnement complet." },
  ],
  yearly: [
    { name: "Starter", price: "3900€", description: "Engagement annuel allégé." },
    { name: "Pro", price: "8900€", description: "Production + stratégie continue." },
    { name: "Premium", price: "14900€", description: "Solution full service annuelle." },
  ],
};

export function PricingWithSwitch() {
  const [isYearly, setIsYearly] = useState(false);
  const currentPlans = isYearly ? plans.yearly : plans.monthly;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-white">Nos tarifs</h2>
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
          <span className={`relative z-10 w-1/2 text-sm font-medium ${isYearly ? "text-white" : "text-black"}`}>
            Mensuel
          </span>
          <span className={`relative z-10 w-1/2 text-sm font-medium ${isYearly ? "text-black" : "text-white"}`}>
            Annuel
          </span>
        </button>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {currentPlans.map((plan) => (
          <article key={plan.name} className="rounded-2xl border border-neutral-700 bg-black/40 p-6 text-white">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="mt-4 text-4xl font-bold">{plan.price}</p>
            <p className="mt-3 text-sm text-neutral-300">{plan.description}</p>
            <button className="mt-6 w-full rounded-full bg-white text-black py-2 font-medium">
              Choisir cette offre
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
