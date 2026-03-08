// inside WorksGrid file (or replace your current WorksGrid component)
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid } from "./ui/layout-grid";
/* small Skeleton kept for selected modal content */
const Skeleton: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">{title}</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      {subtitle}
    </p>
  </div>
);

/* your cardsData (same as before) */
const cardsData = [
  {
    thumbnail: "/img/gallery-1.webp",
    title: "Little Big Friends",
    subtitle: "Photo Produit",
  },
  {
    thumbnail: "/img/Shooting_Les_Frangines.webp",
    title: "Revlon Professional",
    subtitle: "Photo Produit",
  },
  {
    thumbnail: "/img/gallery (3).webp",
    title: "Nassi",
    subtitle: "Shooting Studio",
  },
  {
    thumbnail: "/img/gallery (4).webp",
    title: "Tournée Mondiale Fally Ipupa",
    subtitle: "Photo de concert",
  },
  { thumbnail: "/img/DORIA.webp", title: "DORIA", subtitle: "Reportage Photo" },
  {
    thumbnail: "/img/gallery (6).webp",
    title: "Leckden",
    subtitle: "Photo Portrait",
  },
  {
    thumbnail: "/img/gallery (7).webp",
    title: "Lily'na",
    subtitle: "Photo Portrait",
  },
  {
    thumbnail: "/img/gallery (8).webp",
    title: "Baoli Lounge",
    subtitle: "Photo Produit",
  },
  {
    thumbnail: "/img/gallery (9).webp",
    title: "Restaurant Healthiny",
    subtitle: "Photo Corporate",
  },
  {
    thumbnail: "/img/gallery (10).webp",
    title: "Baoli Lounge",
    subtitle: "Photo Produit",
  },
  {
    thumbnail: "/img/PHOTO_JOUET_ENFANT.webp",
    title: "Little Big Friends",
    subtitle: "Photo Produit",
  },
  {
    thumbnail: "/img/image.webp",
    title: "WIlly Denzey",
    subtitle: "Photo Reportage",
  },
];

const baseCards = cardsData.map((card, index) => ({
  id: index + 1,
  content: <Skeleton title={card.title} subtitle={card.subtitle} />, // used by modal
  className: "",
  thumbnail: card.thumbnail,
  title: card.title,
  subtitle: card.subtitle,
}));

const randInt = (max: number) => Math.floor(Math.random() * max);
function pickNUniqueIndices(total: number, n: number) {
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = indices.length - 1; i > indices.length - 1 - n; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(indices.length - n);
}

/* AnimatedBackground component — only renders background and fades */
const AnimatedBackground: React.FC<{
  thumbnail: string;
  token: number | string;
}> = ({ thumbnail, token }) => {
  useEffect(() => {
    const img = new Image();
    img.src = thumbnail;
  }, [thumbnail]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={token}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55 }}
        className="absolute inset-0"
        style={{ willChange: "opacity" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${thumbnail})`,
            filter: "brightness(0.6)",
          }}
          aria-hidden
        />
      </motion.div>
    </AnimatePresence>
  );
};

export function WorksGrid({
  LayoutGridComponent,
}: {
  LayoutGridComponent?: any;
}) {
  // keep exactly 12
  const TOTAL_SLOTS = baseCards.length;
  const SWAP_INTERVAL_MS = 2000;
  const PICK_COUNT = 3;

  const [thumbnailsState, setThumbnailsState] = useState<string[]>(
    baseCards.map((c) => c.thumbnail)
  );
  const [tokens, setTokens] = useState<number[]>(
    Array.from({ length: TOTAL_SLOTS }, () => Date.now() + Math.random())
  );

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      const slotsToChange = pickNUniqueIndices(TOTAL_SLOTS, PICK_COUNT);

      setThumbnailsState((prev) => {
        const next = prev.slice();
        const toPreload: string[] = [];
        slotsToChange.forEach((slot) => {
          const pick = cardsData[randInt(cardsData.length)];
          next[slot] = pick.thumbnail;
          toPreload.push(pick.thumbnail);
        });
        toPreload.forEach((u) => {
          const i = new Image();
          i.src = u;
        });
        return next;
      });

      setTokens((prev) =>
        prev.map((t, i) =>
          slotsToChange.includes(i) ? Date.now() + Math.random() : t
        )
      );
    }, SWAP_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const cardsForLayout = useMemo(() => {
    return baseCards.map((c, i) => ({
      ...c,
      thumbnail: thumbnailsState[i],
      // important: keep `content` unchanged (used by SelectedCard)
      // add an animatedBackground prop that LayoutGrid will render on top of image
      animatedBackground: (
        <AnimatedBackground thumbnail={thumbnailsState[i]} token={tokens[i]} />
      ),
    }));
  }, [thumbnailsState, tokens]);

  // Use your LayoutGrid import; I used the original LayoutGrid in your app
  // If you exported LayoutGrid differently, keep importing it as you already do.
  return (
    <div className="h-screen w-full">
      {/* pass the cards with animatedBackground prop */}
      <LayoutGrid cards={cardsForLayout} />
    </div>
  );
}
