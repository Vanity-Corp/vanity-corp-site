import { Footer } from "@/components/Footer";
import { getPage, findSection } from "@/lib/payload-cms";
import type { Metadata } from "next";

const DEFAULT_SECTIONS = [
  {
    heading: "Éditeur du site",
    body: "Le site vanitycorp.fr est édité par Vanity Corp, agence de communication créative basée à Paris 11ème et Massy (91300). Contact : contact@vanitycorp.fr.",
  },
  {
    heading: "Hébergement",
    body: "Ce site est hébergé sur une infrastructure dédiée. Pour toute question relative à l'hébergement, contactez l'éditeur du site.",
  },
  {
    heading: "Propriété intellectuelle",
    body: "L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos) est la propriété exclusive de Vanity Corp ou de ses clients, sauf mention contraire. Toute reproduction sans autorisation est interdite.",
  },
  {
    heading: "Données personnelles",
    body: "Les informations recueillies via les formulaires de ce site sont utilisées exclusivement pour répondre à vos demandes et ne sont jamais cédées à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à contact@vanitycorp.fr.",
  },
];

export const metadata: Metadata = {
  title: "Mentions légales | Vanity Corp",
  description: "Mentions légales du site Vanity Corp.",
};

export default async function MentionsLegales() {
  const page = await getPage("mentions-legales");
  const legal = findSection(page, "legal");
  const heading = (legal?.heading as string) ?? "Mentions légales";
  const sections =
    (legal?.sections as { heading: string; body: string }[]) ?? DEFAULT_SECTIONS;

  return (
    <div className="dark min-h-screen w-full text-white flex flex-col">
      <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-24 sm:px-8">
        <h1 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h1>
        <div className="flex flex-col gap-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-2 text-lg font-semibold text-white">{s.heading}</h2>
              <p className="text-sm leading-relaxed text-neutral-400">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
