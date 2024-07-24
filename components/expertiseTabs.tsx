"use client";

import Image from "next/image";
import { Tabs } from "./ui/tabs";

export function ExpertiseTabs() {
  const tabs = [
    {
      title: "Combo 360",
      value: "combo",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl  text-white bg-gradient-to-br from-[#884980] to-[#A5619C]">
          <Image
            src="/img/Combo 360.png"
            alt="dummy image"
            width="700"
            height="700"
            className="object-cover w-1/2 rounded-2xl"
          />
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
        <div className="flex flex-row gap-10 w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl  text-white bg-gradient-to-br from-[#B1B7E1] to-[#C1C7EE]">
          <Image
            src="/img/CREATION.png"
            alt="dummy image"
            width="700"
            height="700"
            className="object-cover w-1/2 rounded-2xl"
          />
          <div className=" flex gap-10 flex-col w-1/2 h-full">
            <h3 className="font-bold text-2xl">
              C’est en créant n’importe quoi...{" "}
            </h3>
            <p className="text-base">
              Qu’on se différencie de n’importe qui !<br />
              <br /> Le syndrome de la page blanche, le manque d'idées, ne pas
              savoir comment parler à votre cible... Ces problèmes sont
              courants. Chacun son domaine de compétence. Nous avons réuni une
              équipe de créatifs (garanti sans produits stupéfiants, juste
              naturellement fous) pour vous aider.
              <br /> Contenu pour réseaux sociaux, shootings photo, street
              marketing, événements, levées de fonds : ils ajoutent une touche
              d'originalité à votre projet. Choisissez l'idée qui vous convient
              et adaptez-la à votre identité.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Production",
      value: "production",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl  text-white bg-gradient-to-br from-[#884980] to-[#A5619C]">
          <Image
            src="/img/Combo 360.png"
            alt="dummy image"
            width="700"
            height="700"
            className="object-cover w-1/2 rounded-2xl"
          />
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
              votre imagination. On le couve ensemble, hors de question de vous
              laisser l’assumer seul. Enfin on vous aide à créer, gérer et
              alimenter les réseaux sociaux, le site, ou tout autre contenu
              necessaire à votre petit poussin lors de la sortie de sa coquille.{" "}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Stratégie",
      value: "strategie",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl  text-white bg-gradient-to-br from-[#884980] to-[#A5619C]">
          <Image
            src="/img/Combo 360.png"
            alt="dummy image"
            width="700"
            height="700"
            className="object-cover w-1/2 rounded-2xl"
          />
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
              votre imagination. On le couve ensemble, hors de question de vous
              laisser l’assumer seul. Enfin on vous aide à créer, gérer et
              alimenter les réseaux sociaux, le site, ou tout autre contenu
              necessaire à votre petit poussin lors de la sortie de sa coquille.{" "}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Site web",
      value: "siteweb",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl  text-white bg-gradient-to-br from-[#884980] to-[#A5619C]">
          <Image
            src="/img/Combo 360.png"
            alt="dummy image"
            width="700"
            height="700"
            className="object-cover w-1/2 rounded-2xl"
          />
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
              votre imagination. On le couve ensemble, hors de question de vous
              laisser l’assumer seul. Enfin on vous aide à créer, gérer et
              alimenter les réseaux sociaux, le site, ou tout autre contenu
              necessaire à votre petit poussin lors de la sortie de sa coquille.{" "}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Social Media",
      value: "socialmedia",
      content: (
        <div className="flex flex-row gap-10 w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl  text-white bg-gradient-to-br from-[#884980] to-[#A5619C]">
          <Image
            src="/img/Combo 360.png"
            alt="dummy image"
            width="700"
            height="700"
            className="object-cover w-1/2 rounded-2xl"
          />
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
              votre imagination. On le couve ensemble, hors de question de vous
              laisser l’assumer seul. Enfin on vous aide à créer, gérer et
              alimenter les réseaux sociaux, le site, ou tout autre contenu
              necessaire à votre petit poussin lors de la sortie de sa coquille.{" "}
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <h2 className="text-white text-center mb-10 text-5xl">EXPERTISE</h2>
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
