"use client";
import {
  CarouselItem,
  CarouselContent,
  Carousel,
} from "@/components/ui/carousel";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "./ui/direction-aware-hover";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
export default function VaniTeam(props: any) {
  return (
    <CarouselItem className="basis-1/5  bg-cover bg-center flex flex-col p-0 justify-center">
      <DirectionAwareHover imageUrl={props.picture}>
        <p className="font-bold text-2xl">{props.name}</p>
        <p className="font-normal text-sm line-clamp-3">{props.presentation}</p>
      </DirectionAwareHover>
    </CarouselItem>
  );
}
