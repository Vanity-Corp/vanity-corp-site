"use client";
import { CarouselItem } from "@/components/ui/carousel";
import { DirectionAwareHover } from "./ui/direction-aware-hover";
import React from "react";

export default function VaniTeam(props: any) {
  return (
    <>
      <CarouselItem className="basis-1/5  bg-cover bg-center flex flex-col p-0 justify-center">
        <DirectionAwareHover imageUrl={props.picture}>
          <p className="font-bold text-2xl">{props.name}</p>
          <p className="font-normal text-sm line-clamp-3">
            {props.presentation}
          </p>
        </DirectionAwareHover>
      </CarouselItem>
    </>
  );
}
