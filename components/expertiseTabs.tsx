"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

export function ExpertiseTabs({
  onTabChange,
}: {
  onTabChange: (value: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("combo");

  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab, onTabChange]);
  const tabsContent: any = [
    {
      title: "Combo 360",
      value: "combo",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative  rounded-2xl py-10 text-xl md:text-4xl  text-white">
          <div className="relative h-1/2 w-1/2">
            <Image
              src="/img/Combo 360.webp"
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
              alt="Combo 360" // or "contain" depending on your needs
            />
          </div>
          <div className=" flex gap-10 flex-col w-1/2 h-full">
            <h3 className="font-bold text-2xl">
              Imaginez que vous êtes une poule
            </h3>
            <p className="text-base">
              Vous êtes une poule et l’oeuf est votre besoin en communication
              marketing.
              <br />
              <br /> Notre combo vous accompagne dans la conception de l’oeuf,
              on l’imagine ensemble. On vous aide à le pondre, c’est toujours
              délicat de passer à l’acte et produire un oeuf à la hauteur de
              votre imagination.
              <br /> On le couve ensemble, hors de question de vous laisser
              l’assumer seul.
              <br /> Enfin on vous aide à créer, gérer et alimenter les réseaux
              sociaux, le site, ou tout autre contenu necessaire à votre petit
              poussin lors de la sortie de sa coquille.{" "}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Creation",
      value: "creation",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative  rounded-2xl py-10 text-xl md:text-4xl  text-white">
          <Image
            src="/img/Création.webp"
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
            alt="Combo 360" // or "contain" depending on your needs // or "contain" depending on your needs
          />

          <div className=" flex gap-10 flex-col w-1/2 h-full">
            <h3 className="font-bold text-2xl">
              C’est en créant n’importe quoi...{" "}
            </h3>
            <p className="text-base">
              Qu’on se différencie de n’importe qui !<br />
              <br /> Le syndrome de la page blanche, le manque d&apos;idées, ne
              pas savoir comment parler à votre cible... Ces problèmes sont
              courants. Chacun son domaine de compétence. Nous avons réuni une
              équipe de créatifs (garanti sans produits stupéfiants, juste
              naturellement fous) pour vous aider.
              <br /> Contenu pour réseaux sociaux, shootings photo, street
              marketing, événements, levées de fonds : ils ajoutent une touche
              d&apos;originalité à votre projet. Choisissez l&apos;idée qui vous
              convient et adaptez-la à votre identité.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Production",
      value: "production",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative  rounded-2xl py-10 text-xl md:text-4xl  text-white">
          <div className="relative h-1/2 w-1/2">
            <Image
              src="/img/Production.webp"
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
              alt="Combo 360" // or "contain" depending on your needs
            />
          </div>
          <div className=" flex gap-10 flex-col w-1/2 h-full">
            <h3 className="font-bold text-2xl">Qui fait quoi ?! </h3>
            <p className="text-base">
              Qu’on se différencie de n’importe qui !<br />
              <br /> Le syndrome de la page blanche, le manque d&apos;idées, ne
              pas savoir comment parler à votre cible... Ces problèmes sont
              courants. Chacun son domaine de compétence. Nous avons réuni une
              équipe de créatifs (garanti sans produits stupéfiants, juste
              naturellement fous) pour vous aider.
              <br /> Contenu pour réseaux sociaux, shootings photo, street
              marketing, événements, levées de fonds : ils ajoutent une touche
              d&apos;originalité à votre projet. Choisissez l&apos;idée qui vous
              convient et adaptez-la à votre identité.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Stratégie",
      value: "strategie",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative  rounded-2xl py-10 text-xl md:text-4xl  text-white">
          <div className="relative h-1/2 w-1/2">
            <Image
              src="/img/Stratégie.webp"
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
              alt="Combo 360" // or "contain" depending on your needs
            />
          </div>
          <div className=" flex gap-10 flex-col w-1/2 h-full">
            <h3 className="font-bold text-2xl">Un spécialiste dédié !</h3>
            <p className="text-base">
              Il est impossible d’être sur tous les fronts.
              <br />
              <br /> La plus grande compétence d’un dirigeant est de savoir
              déléguer. Prennez appuie sur votre spécialiste dédié pour vous
              accompagner sur le côté stratégie et maximiser vos chances de
              toucher votre cible.
              <br />
              <br /> Notre approche basée sur les données nous permet de fournir
              des recommandations stratégiques précises et efficaces pour
              positionner votre entreprise de manière optimale.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Site web",
      value: "siteweb",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative  rounded-2xl py-10 text-xl md:text-4xl  text-white">
          <div className="relative h-1/2 w-1/2">
            <Image
              src="/img/Site Internet.webp"
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
              alt="Combo 360" // or "contain" depending on your needs
            />
          </div>
          <div className=" flex gap-10 flex-col w-1/2 h-full">
            <h3 className="font-bold text-2xl">On a le code secret ! </h3>
            <p className="text-base">
              Nous avons rassemblé une équipe de développeurs et de designers
              pour vous épauler.
              <br />
              <br />
              Sites vitrines, e-commerce, blogs, portfolios : nous ajoutons une
              touche unique et originale à chaque projet. <br />
              Dites nous ce qui vous plait et nos génies du code s’occupent de
              lui donner vie. <br />
              <br />
              Ensemble, créons un site web qui capte l’attention et reflète
              votre personnalité.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Social Media",
      value: "socialmedia",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative  rounded-2xl py-10 text-xl md:text-4xl  text-white">
          <div className="relative h-1/2 w-1/2">
            <Image
              src="/img/Social Media.webp"
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
              alt="Combo 360" // or "contain" depending on your needs
            />
          </div>
          <div className=" flex gap-10 flex-col w-1/2 h-full">
            <h3 className="font-bold text-2xl">
              Vous allez devenir influenceur B2B
            </h3>
            <p className="text-base">
              Internet ce n’est pas que pour les jeunes. C’est pour ceux qui
              savent en tirer profit.
              <br />
              <br /> Ne vous blâmez pas de ne pas avoir les bons réflex et de ne
              pas connaitre les tips de ces plateformes.
              <br />
              <br /> Blâmez vous de ne pas vous faire accompagner par des
              professionnels dans le domaine. Des ads à la création de contenu
              en passant par la modération et les bonnes pratique, vous méritez
              le meilleur.
              <br />
              <br /> Vous nous méritez
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full gap-10 items-start justify-center">
      <h2 className="text-center text-xl md:text-5xl font-bold text-black dark:text-white pt-10">
        Expertise
      </h2>
      <Tabs defaultValue="combo" onValueChange={setActiveTab}>
        <TabsList>
          {tabsContent.map((tab: any) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsContent.map((tab: any) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
