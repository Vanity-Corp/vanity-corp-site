"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
export const artistClients = [
  {
    id: 1,
    link: "https://www.instagram.com/nayra932/",
    name: "Nayra",
    image: "/clients/Nayra.webp",
  },
  {
    id: 2,
    link: "https://www.youtube.com/channel/UCD_MrT_8bODobOFp6SlrEQQ",
    name: "Nej",
    image: "/clients/Nej.webp",
  },
  {
    id: 3,
    link: "https://www.youtube.com/c/RASKA_mp4",
    name: "Raska",
    image: "/clients/Raska.webp",
  },
  {
    id: 4,
    link: "https://www.instagram.com/redouanebh/",
    name: "Redouane Bh",
    image: "/clients/REDOUANE_BH.webp",
  },
  {
    id: 5,
    link: "https://www.instagram.com/roseameziane/?hl=fr",
    name: "Rose Ameziane",
    image: "/clients/Rose_ameziane.webp",
  },
  {
    id: 6,
    link: "https://www.instagram.com/sihambengoua/?hl=fr",
    name: "Siham Bengoua",
    image: "/clients/Siham_Bengoua.webp",
  },
  {
    id: 7,
    link: "https://www.instagram.com/lewillaxxx/",
    name: "Willaxxx",
    image: "/clients/Willaxxx.webp",
  },
  {
    id: 8,
    link: "https://www.instagram.com/iamwillydenzey/",
    name: "Willy Denzey",
    image: "/clients/WILLY_Denzey.webp",
  },
  {
    id: 9,
    link: "https://www.instagram.com/doriado_do/",
    name: "Doria",
    image: "/clients/Doria.webp",
  },
  {
    id: 10,
    link: "https://www.youtube.com/user/fallyipupa",
    name: "Fally Ipupa",
    image: "/clients/Fally_Ipupa.webp",
  },
  {
    id: 11,
    link: "https://www.instagram.com/houssbad/?hl=fr",
    name: "Houssbad",
    image: "/clients/Houssbad.webp",
  },
  {
    id: 12,
    link: "https://www.instagram.com/karim.zeribi/",
    name: "Karim Zeribi",
    image: "/clients/Karim_Zeribi.webp",
  },
  {
    id: 13,
    link: "https://www.youtube.com/@NabilAbsi",
    name: "Nabil Absi",
    image: "/clients/Nabil_Absi.webp",
  },
  {
    id: 14,
    link: "https://www.instagram.com/nassiofficiel/?hl=fr",
    name: "Nassi",
    image: "/clients/Nassi.webp",
  },
];

function ArtistMarquee({
  items,
  reverse = false,
}: {
  items: typeof artistClients;
  reverse?: boolean;
}) {
  return (
    <div className="scroller relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
      <div
        className={`flex w-max min-w-full shrink-0 gap-8 py-8 ${reverse ? "[animation-direction:reverse]" : ""} animate-scroll hover:[animation-play-state:paused]`}
        style={{ "--animation-duration": "55s" } as React.CSSProperties}
      >
        <AnimatedTooltip items={items} />
        <AnimatedTooltip
          items={items.map((item) => ({ ...item, id: item.id + 100 }))}
        />
      </div>
    </div>
  );
}

export function ClientSection() {
  const firstRow = artistClients.slice(0, 7);
  const secondRow = artistClients.slice(7);

  return (
    <div className="w-full space-y-2 overflow-visible">
      <ArtistMarquee items={firstRow} />
      <ArtistMarquee items={secondRow} reverse />
    </div>
  );
}
