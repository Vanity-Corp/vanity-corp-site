"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ServiceSection = {
  id: string;
  navLabel: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

export const homepageServices: ServiceSection[] = [
  {
    id: "studio-de-tournage",
    navLabel: "Studio de tournage",
    title: "Studio de tournage",
    description:
      "Un plateau prêt à l'emploi, une équipe technique disponible et un cadre premium pour vos capsules, interviews ou publicités.",
    ctaLabel: "Découvrir le service",
    href: "/services/shooting-photo",
  },
  {
    id: "accompagnement-strategique",
    navLabel: "Accompagnement stratégique",
    title: "Accompagnement stratégique",
    description:
      "Nous cadrons vos objectifs, votre positionnement et votre plan d'action pour construire une communication qui convertit.",
    ctaLabel: "Voir l'accompagnement",
    href: "/services/combo-360",
  },
  {
    id: "audiovisuel",
    navLabel: "Audiovisuel",
    title: "Audiovisuel",
    description:
      "De la pré-production à la livraison, nous réalisons des contenus vidéo pensés pour vos canaux et votre audience.",
    ctaLabel: "Voir les productions",
    href: "/realisations",
  },
];

export default function ServicesStickySections() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = useMemo(
    () => homepageServices[activeIndex] ?? homepageServices[0],
    [activeIndex]
  );

  return (
    <section className="w-full px-4 md:px-10 py-16 md:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center md:text-left">
          Nos services
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-4 md:space-y-6">
            {homepageServices.map((service, index) => (
              <article
                id={service.id}
                key={service.id}
                onMouseEnter={() => setActiveIndex(index)}
                className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 scroll-mt-28 ${
                  activeIndex === index
                    ? "border-white bg-white/10"
                    : "border-white/20 bg-white/5"
                }`}
              >
                <p className="text-sm uppercase tracking-[0.2em] text-white/70 mb-2">
                  {service.navLabel}
                </p>
                <h3 className="text-2xl md:text-3xl font-semibold">{service.title}</h3>
                <p className="text-white/80 mt-3">{service.description}</p>
                <div className="mt-5">
                  <Link href={service.href}>
                    <Button className="rounded-full">{service.ctaLabel}</Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="md:sticky md:top-28 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 min-h-[320px] p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Focus</p>
              <h3 className="mt-3 text-3xl md:text-4xl font-bold">{activeService.title}</h3>
              <p className="mt-4 text-white/80 leading-relaxed">{activeService.description}</p>
            </div>
            <Link href={activeService.href} className="mt-8 inline-block">
              <Button variant="outline" className="rounded-full text-black bg-white hover:bg-white/90">
                {activeService.ctaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
