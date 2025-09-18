"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export function HighlightedText360() {
  return (
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
      className="text-2xl md:text-7xl px-4 font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto w-full"
    >
      «<Highlight className="text-black dark:text-white">Fake it</Highlight>{" "}
      until we <br />
      vendez du{" "}
      <Highlight className="text-black dark:text-white"> make it</Highlight>»
    </motion.h1>
  );
}
