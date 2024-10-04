import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Parlez avec ChatGPT grâce à sa nouvelle application !",
    art: "https://vanitycorp.fr/wp-content/uploads/2023/06/Image_Article_CHATGPT.jpg",
  },
  {
    artist: "Vanity News : Aya x Maluma, Retour d’Habbo Hotel, Draft NBA",
    art: "https://vanitycorp.fr/wp-content/uploads/2024/07/1-3.png",
  },
  {
    artist: "L’IA et la Photographie : Quand Lightroom se réinvente !",
    art: "https://vanitycorp.fr/wp-content/uploads/2023/07/Image_Article_IA_LIGHTROOM.jpg",
  },
  {
    artist:
      "Apple Vision Pro : Le Portail vers le Futur de la Communication dans le Metaverse",
    art: "https://vanitycorp.fr/wp-content/uploads/2023/06/Apple-WWCD23-Vision-Pro-EyeSight.jpg",
  },
  {
    artist: "TAdobe Express: Adobe fait de la concurrence à Canva",
    art: "https://vanitycorp.fr/wp-content/uploads/2023/06/CC-MAX-triple-tablet-1.jpg",
  },
];

export function News() {
  return (
    <>
      <div className="flex items-center justify-between w-3/4">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{ once: true }}
          className="text-left  uppercase text-xl md:text-5xl font-bold text-black dark:text-white "
        >
          NEWS
        </motion.h2>
        <HoverBorderGradient className="flex gap-2 items-center">
          VOIR TOUT{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </HoverBorderGradient>
      </div>
      <ScrollArea className="w-3/4 ">
        <div className="flex items-end w-[300px] space-x-4 p-4">
          {works.map((artwork) => (
            <figure key={artwork.artist} className="shrink-0">
              {" "}
              <h3 className="py-2 line-clamp-2 overflow-hidden text-1xl font-semibold text-foreground w-[300px]">
                {artwork.artist}
              </h3>
              <div className="h-[300px] w-[300px] rounded-md overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.1 }} // Échelle de l'image au survol
                  transition={{ duration: 0.3 }} // Durée de l'effet d'échelle
                >
                  <Image
                    src={artwork.art}
                    alt={`Photo by ${artwork.artist}`}
                    className="aspect-square w-full object-cover"
                    width={300}
                    height={300}
                  />
                </motion.div>
              </div>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
