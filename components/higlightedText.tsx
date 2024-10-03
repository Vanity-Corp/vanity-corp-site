"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export function HighlightedText() {
  return (
    <HeroHighlight className="flex flex-col items-center gap-10 snap-start">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto w-full"
      >
        « La clé c&apos;est le{" "}
        <Highlight className="text-black dark:text-white"> bonheur,</Highlight>{" "}
        <br />
        vendez du{" "}
        <Highlight className="text-black dark:text-white"> bonheur !</Highlight>
        »
      </motion.h1>
      <HoverBorderGradient className="flex gap-2 items-center">
        En savoir plus{" "}
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
            strokeLinejoin="round"
            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </HoverBorderGradient>
    </HeroHighlight>
  );
}
