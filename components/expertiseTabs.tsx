"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import CollaborativeCursors from "@/components/CollaborativeCursors";
import IPhoneIllustration from "@/components/IPhoneIllustration";
import MacBookWithIcons from "@/components/MacBookWithIcons";
import UptimeStatusIllustration from "@/components/UptimeStatusIllustration";

const CreationPlaceholder = () => (
  <div className="flex h-full items-center justify-center text-white/40">
    Illustration à venir
  </div>
);

const IllustrationFrame = ({ children }: { children: ReactNode }) => (
  <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/10">
    <div className="origin-center scale-[0.58] sm:scale-[0.62] md:scale-[0.5] lg:scale-[0.44] xl:scale-[0.48]">
      {children}
    </div>
  </div>
);

export function ExpertiseTabs({ onTabChange }: any) {
  const [activeTab, setActiveTab] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  const tabsContent = [
    {
      title: "Création",
      value: "creation",
      renderIllustration: () => <CreationPlaceholder />,
      description: (
        <>
          C’est en créant n’importe quoi... Qu’on se différencie de n’importe
          qui !
          <br />
          <br /> Le syndrome de la page blanche, le manque d&apos;idées, ne pas
          savoir comment parler à votre cible... Ces problèmes sont courants.
          Chacun son domaine de compétence. Nous avons réuni une équipe de
          créatifs (garanti sans produits stupéfiants, juste naturellement fous)
          pour vous aider.
          <br /> Contenu pour réseaux sociaux, shootings photo, street
          marketing, événements, levées de fonds : ils ajoutent une touche
          d&apos;originalité à votre projet. Choisissez l&apos;idée qui vous
          convient et adaptez-la à votre identité.
        </>
      ),
    },
    {
      title: "Site web",
      value: "siteweb",
      renderIllustration: (isHovered: boolean) => (
        <MacBookWithIcons content={undefined} forceHovered={isHovered} />
      ),
      description: (
        <>
          On a le code secret ! Nous avons rassemblé une équipe de développeurs
          et de designers pour vous épauler.
          <br />
          <br /> Sites vitrines, e-commerce, blogs, portfolios : nous ajoutons
          une touche unique et originale à chaque projet.
          <br /> Dites nous ce qui vous plaît et nos génies du code s’occupent
          de lui donner vie.
          <br />
          <br /> Ensemble, créons un site web qui capte l’attention et reflète
          votre personnalité.
        </>
      ),
    },
    {
      title: "Social Media",
      value: "socialmedia",
      renderIllustration: (isHovered: boolean) => (
        <IPhoneIllustration content={undefined} forceHovered={isHovered} />
      ),
      description: (
        <>
          Vous allez devenir influenceur B2B. Internet, ce n’est pas que pour
          les jeunes. C’est pour ceux qui savent en tirer profit.
          <br />
          <br /> Ne vous blâmez pas de ne pas avoir les bons réflexes et de ne
          pas connaître les astuces de ces plateformes.
          <br />
          <br /> Blâmez-vous de ne pas vous faire accompagner par des
          professionnels dans le domaine. Des ads à la création de contenu en
          passant par la modération et les bonnes pratiques, vous méritez le
          meilleur.
          <br />
          <br /> Vous nous méritez.
        </>
      ),
    },
    {
      title: "Production",
      value: "production",
      renderIllustration: (isHovered: boolean) => (
        <UptimeStatusIllustration forceHovered={isHovered} />
      ),
      description: (
        <>
          Qui fait quoi ?!
          <br />
          <br /> Qu’on se différencie de n’importe qui ! Le syndrome de la page
          blanche, le manque d&apos;idées, ne pas savoir comment parler à votre
          cible... Ces problèmes sont courants. Chacun son domaine de
          compétence. Nous avons réuni une équipe de créatifs (garanti sans
          produits stupéfiants, juste naturellement fous) pour vous aider.
          <br /> Contenu pour réseaux sociaux, shootings photo, street
          marketing, événements, levées de fonds : ils ajoutent une touche
          d&apos;originalité à votre projet. Choisissez l&apos;idée qui vous
          convient et adaptez-la à votre identité.
        </>
      ),
    },
    {
      title: "Stratégie",
      value: "strategie",
      renderIllustration: (isHovered: boolean) => (
        <CollaborativeCursors forceHovered={isHovered} />
      ),
      description: (
        <>
          Un spécialiste dédié ! Il est impossible d’être sur tous les fronts.
          <br />
          <br /> La plus grande compétence d’un dirigeant est de savoir
          déléguer. Prenez appui sur votre spécialiste dédié pour vous
          accompagner sur le côté stratégie et maximiser vos chances de toucher
          votre cible.
          <br />
          <br /> Notre approche basée sur les données nous permet de fournir des
          recommandations stratégiques précises et efficaces pour positionner
          votre entreprise de manière optimale.
        </>
      ),
    },
  ];

  const activeContent =
    tabsContent.find((tab) => tab.value === activeTab) ?? tabsContent[0];

  const handleCardClick = (value: string) => {
    setActiveTab(value);
    setIsModalOpen(true);
  };

  return (
    <section className="relative flex h-full w-full flex-col items-start gap-10 px-6 py-10 [perspective:1000px] sm:px-10 md:mx-32 lg:px-32">
      <h2 className="w-full text-center text-3xl font-bold text-black dark:text-white md:text-5xl">
        Expertise
      </h2>

      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {tabsContent.map((tab) => {
          const isActive = activeTab === tab.value;
          const isHovered = hoveredCard === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleCardClick(tab.value)}
              onMouseEnter={() => setHoveredCard(tab.value)}
              onMouseLeave={() => setHoveredCard(null)}
              onFocus={() => setHoveredCard(tab.value)}
              onBlur={() => setHoveredCard(null)}
              className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded-[2rem] border p-4 text-left transition-all duration-300 ease-out hover:-translate-y-2 hover:border-violet-300/50 hover:bg-white/[0.12] hover:shadow-[0_24px_80px_rgba(139,92,246,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${
                isActive
                  ? "border-violet-300/60 bg-white/[0.14] shadow-[0_20px_70px_rgba(139,92,246,0.32)]"
                  : "border-white/10 bg-white/[0.07] shadow-[0_12px_40px_rgba(15,10,40,0.18)]"
              }`}
              aria-pressed={isActive}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.28),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <span className="pointer-events-none absolute left-1/2 top-[70%] z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/80 px-4 py-2 text-xs font-medium text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100 group-focus-visible:-translate-y-1 group-focus-visible:opacity-100">
                En savoir plus
              </span>

              <div className="relative z-10 flex h-full flex-1 flex-col">
                <IllustrationFrame>
                  {tab.renderIllustration(isHovered)}
                </IllustrationFrame>

                <h3 className="mt-auto pt-7 text-center text-xl font-semibold text-white md:text-2xl">
                  {tab.title}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/70 p-0 backdrop-blur-md md:items-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="expertise-modal-title"
        >
          <div className="relative flex h-screen w-full flex-col overflow-y-auto border border-white/10 bg-[#160b2f] p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] md:h-auto md:max-h-[85vh] md:max-w-3xl md:rounded-[2rem] md:p-10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="sticky top-0 ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white transition hover:border-violet-200/70 hover:bg-violet-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              aria-label="Fermer le détail"
            >
              ×
            </button>

            <div className="mt-8 md:mt-0">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-violet-200/70">
                Expertise
              </p>
              <h3
                id="expertise-modal-title"
                className="text-3xl font-bold md:text-5xl"
              >
                {activeContent.title}
              </h3>
              <p className="mt-8 text-[16px] font-normal leading-relaxed text-white/80 md:text-xl">
                {activeContent.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
