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
        `basis-full h-dvh bg-cover px-5 md:px-40 bg-center flex flex-col justify-center` +
        " " +
        props.background
      }
    >
      <div className="w-full md:w-max select-none flex rounded-3xl backdrop-opacity-75 backdrop-blur-sm bg-black/40 w-fit gap-4 flex-col md:flex-row p-5 md:py-4 md:px-10">
        <div className="flex flex-col justify-center">
          <p className="font-bold header-title text-center md:text-left text-xl md:text-5xl lg:text-4xl 2xl:text-6xl ">
            {props.title}
          </p>

          <p className="text-left font-normal text-center md:text-left header-sub-text text-sm md:text-base lg:text-sm 2xl:text-xl">
            {props.description}
          </p>
        </div>
        <div className="w-full md:w-[2px] h-[2px] md:h-full rounded-full bg-primary"></div>
        <div className="flex flex-col justify-center">
          <ul className="font-normal text-center md:text-left header-list text-sm md:text-lg lg:text-xs 2xl:text-base ">
            {props.list.map((item: any) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </CarouselItem>
  );
}
