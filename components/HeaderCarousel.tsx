"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function HeaderCarousel(props: any) {
  return (
    <CarouselItem
      className={
        `basis-full h-dvh bg-cover pl-40 bg-center flex flex-col justify-center` +
        " " +
        props.background
      }
    >
      <div className="select-none flex rounded-3xl backdrop-opacity-75 px-7 py-4 backdrop-blur-sm bg-black/40 w-fit gap-4 flex-row ">
        <div className="flex flex-col justify-center">
          <p className="text-left font-bold header-title text-5xl lg:text-4xl 2xl:text-6xl ">
            {props.title}
          </p>

          <p className="text-left font-normal header-sub-text text-base lg:text-sm 2xl:text-xl  ">
            {props.description}
          </p>
        </div>
        <div className="w-[2px] rounded-full bg-primary"></div>
        <div className="flex flex-col justify-center">
          <ul className="font-normal header-list text-lg lg:text-xs 2xl:text-base ">
            {props.list.map((item: any) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </CarouselItem>
  );
}
