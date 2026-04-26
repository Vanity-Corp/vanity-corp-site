"use client";

import { Footer } from "@/components/Footer";
import QuoteEstimator from "@/components/QuoteEstimator";
import { Sparkles, ShieldCheck, Clock3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_ITEMS = [
  { icon: <Sparkles size={14} />, label: "100% gratuit, sans engagement" },
  { icon: <Clock3 size={14} />, label: "Réponse sous 24h" },
  { icon: <ShieldCheck size={14} />, label: "Données confidentielles" },
];

const STEPS = [
  { num: "01", label: "Décrivez votre projet" },
  { num: "02", label: "Obtenez une estimation" },
  { num: "03", label: "On vous recontacte" },
];

export default function Estimation() {
  return (
    <div className="dark min-h-screen  m-auto bg-neutral-950 text-white flex flex-col">
      {/* ── Main split layout ── */}
      <main className="flex-1 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-16 py-16 sm:py-20">
          {/* ── LEFT — text content, sticky on desktop ── */}
          <aside className=" w-1/3 shrink-0 lg:sticky lg:top-10 lg:self-start flex flex-col gap-10 mb-12 lg:mb-0">
            {/* Label */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-indigo-400">
                Estimation gratuite
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.08] tracking-tight mb-4 text-white">
                Combien coûte
                <br />
                <span className="font-normal italic text-neutral-400">
                  votre projet ?
                </span>
              </h1>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Renseignez vos besoins et obtenez une estimation personnalisée
                en quelques minutes. Notre équipe vous recontacte rapidement
                pour affiner le devis.
              </p>
            </div>

            {/* Steps */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-neutral-600 mb-4">
                Comment ça marche
              </p>
              <div className="flex flex-col gap-3">
                {STEPS.map((step, i) => (
                  <div key={step.num} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-[11px] font-bold text-indigo-400 shrink-0">
                      {step.num}
                    </div>
                    <span className="text-sm text-neutral-300">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-neutral-600 mb-4">
                Nos engagements
              </p>
              <div className="flex flex-col gap-2">
                {TRUST_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 text-[12px] text-neutral-400 border border-white/10 rounded-xl px-3.5 py-2.5 bg-white/[0.02]"
                  >
                    <span className="text-indigo-400 shrink-0">
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── RIGHT — estimator form ── */}
          <div className="flex-1 w-2/3 min-w-0">
            {/* Separator label — visible on mobile only */}
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] uppercase tracking-widest text-neutral-600">
                Configurez votre projet
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <QuoteEstimator />
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
