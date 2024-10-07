"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const TabContent = ({ content }: any) => (
  <div className="flex justify-center items-center flex-col md:flex-row gap-10 w-full overflow-hidden relative rounded-2xl py-10 text-xl md:text-4xl text-white">
    <div className="relative md:w-[50%]">
      <Image
        src={content.imageSrc}
        width={500}
        height={500}
        style={{ objectFit: "cover" }}
        alt={content.title}
        className="w-full"
      />
    </div>
    <div className="flex md:w-[50%] gap-10 flex-col px-10 h-full">
      <h3 className="font-bold text-center md:text-left text-2xl">
        {content.title}
      </h3>
      <p className="text-[15px] md:text-base text-center md:text-left">
        {content.description}
      </p>
    </div>
  </div>
);

export function ExpertiseTabs({ onTabChange }: any) {
  const [activeTab, setActiveTab] = useState("combo");

  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  const tabsContent = [
    {
      title: "Combo 360",
      value: "combo",
      imageSrc: "/img/Combo 360.webp",
      description: (
        <>
          Imaginez que vous êtes une poule. Vous êtes une poule et l’œuf est
          votre besoin en communication marketing.
          <br />
          <br /> Notre combo vous accompagne dans la conception de l’oeuf, on
          l’imagine ensemble. On vous aide à le pondre, c’est toujours délicat
          de passer à l’acte et produire un oeuf à la hauteur de votre
          imagination.
          <br /> On le couve ensemble, hors de question de vous laisser
          l’assumer seul.
          <br /> Enfin, on vous aide à créer, gérer et alimenter les réseaux
          sociaux, le site, ou tout autre contenu nécessaire à votre petit
          poussin lors de la sortie de sa coquille.
        </>
      ),
    },
    {
      title: "Creation",
      value: "creation",
      imageSrc: "/img/Création.webp",
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
      title: "Production",
      value: "production",
      imageSrc: "/img/Production.webp",
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
      imageSrc: "/img/Stratégie.webp",
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
    {
      title: "Site web",
      value: "siteweb",
      imageSrc: "/img/Site Internet.webp",
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
      imageSrc: "/img/Social Media.webp",
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
  ];

  return (
    <div className="h-full [perspective:1000px] relative flex flex-col md:max-w-5xl mx-auto w-full gap-10 items-start ">
      <h2 className="text-center text-xl w-full md:text-5xl font-bold text-black dark:text-white pt-10">
        Expertise
      </h2>
      <Tabs
        defaultValue="combo"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="flex flex-wrap">
          {tabsContent.map((tab) => (
            <TabsTrigger
              className="text-[10px] md:text-base"
              key={tab.value}
              value={tab.value}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsContent.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <TabContent content={tab} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
