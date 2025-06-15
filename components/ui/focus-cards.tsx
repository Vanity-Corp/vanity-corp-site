"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <a href={card.link}>
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-lg relative bg-black  overflow-hidden h-full w-full aspect-video transition-all duration-300 ease-out",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
      >
        <Image
          src={card.src}
          alt={card.title}
          fill
          className="object-cover  absolute inset-0"
        />
        <div
          className={cn(
            "absolute inset-0 bg-black/70 flex items-end py-8 px-4 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "md:opacity-0 opacity-100"
          )}
        >
          <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
            {card.title}
            <p className="text-lg">{card.description}</p>
          </div>
        </div>
      </div>
    </a>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  description: string;
  link: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[97%] mx-auto md:px-8 w-full mb-[50px]">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
