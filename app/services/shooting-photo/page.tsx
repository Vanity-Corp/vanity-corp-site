"use client";
import React from "react";
import { GridBeams } from "@/components/ui/grid-beams";
import ImageMouseTrail from "@/components/ui/mousetrail";
import { WorksGrid } from "@/components/WorksGrid";
const images = [
  "/img/DORIA.webp",
  "/img/gallery (4).webp",
  "/img/gallery (3).webp",
  "img/LesFrangines.webp",
  "/img/gallery-1.webp",
  "/img/gallery (9).webp",
  "/img/gallery (8).webp",
  "/img/gallery (7).webp",
  "/img/gallery (6).webp",
];
export default function index() {
  return (
    <main className="w-full flex flex-col justify-center items-center ">
      <section className="w-full h-[50vh] flex flex-col justify-center items-center ">
        <GridBeams
          gridSize={0}
          gridColor="rgba(255, 255, 255, 0.2)"
          rayCount={20}
          rayOpacity={0.55}
          raySpeed={1.5}
          rayLength="20vh"
          gridFadeStart={5}
          gridFadeEnd={90}
          className="h-full w-full"
        >
          <ImageMouseTrail
            items={images}
            maxNumberOfImages={5}
            distance={25}
            imgClass="sm:w-40 w-28 sm:h-48 h-36"
            fadeAnimation={true}
          >
            <article className="relative z-40 mix-blend-difference">
              <h1 className="text-2xl md:text-7xl px-4 font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto w-full mix-blend-difference">
                Photo shooting
              </h1>
            </article>
          </ImageMouseTrail>
        </GridBeams>
      </section>
      <section className="w-full flex flex-col justify-center items-center ">
        <WorksGrid />
      </section>
    </main>
  );
}
