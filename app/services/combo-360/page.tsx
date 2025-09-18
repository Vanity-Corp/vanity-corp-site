import React from "react";
import { ClientSection } from "@/components/ClientSection";
import ServiceProcessTimeline from "@/components/Stepper";
import ContentCard from "@/components/ui/content-card";
import { date } from "zod";
import { Footer } from "@/components/Footer";
import { HighlightedText360 } from "@/components/HiglightedText360";
import { BentoGrid360 } from "@/components/360BentoGrid";
import { AnimatedTooltipPreview } from "@/components/exemple/AnimatedToolTipDemo";
export default function Combo360() {
  const projects = [
    {
      id: 1,
      title: "Legal Euro Corp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      src: "/webdev/legaleurocorp.webp",
      link: "https://vaniteam.vercel.app/",
      date: "28 mars 2024",
    },
    {
      id: 2,
      title: "Piatto Pizza",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      src: "/webdev/piattopizza.webp",
      link: "https://vaniteam.vercel.app/",
      date: "28 mars 2024",
    },
    {
      id: 3,
      title: "Arca Group Energy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      src: "/webdev/arca.webp",
      link: "https://vaniteam.vercel.app/",
      date: "28 mars 2024",
    },
  ];
  return (
    <div className="flex flex-col w-full justify-center items-center bg-black">
      {/* Title Section */}
      <div className="flex justify-center items-center text-4xl w-full font-bold h-[50vh] bg-black">
        <HighlightedText360 />
      </div>

      {/* Stepper Timeline */}
      <ServiceProcessTimeline />

      {/* Macbook Section with FIX */}
      <div className="relative w-full overflow-hidden py-20">
        <h2 className="text-5xl font-bold text-center">
          QU’EST CE QU’UN COMBO 360 ?
        </h2>
      </div>

      <div className="w-full py-20 px-32 mx-auto">
        <h2 className="text-5xl font-bold mb-10 text-white uppercase">
          C’est ça :
        </h2>
        <div className="mx-20">
          <BentoGrid360 />
        </div>
      </div>
      <div className="w-full py-20 px-32 mx-auto">
        <h2 className="text-5xl font-bold mb-10 text-white uppercase">
          Plus ça :
        </h2>
        <div className="mx-20">
          <ClientSection />
        </div>
      </div>
      <section className="w-full  py-20 px-32 mx-auto">
        <h2 className=" text-xl md:text-5xl font-extrabold text-white py-10">
          QUELQUES PROJETS
        </h2>
        <div
          className="flex flex-row gap-10
         justify-between"
        >
          {projects.map((project) => (
            <ContentCard
              key={project.id}
              title={project.title}
              description={project.description}
              link={project.link}
              src={project.src}
              date={project.date}
              className="w-1/3"
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
