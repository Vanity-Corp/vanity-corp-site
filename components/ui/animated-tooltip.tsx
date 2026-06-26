"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;

    image: string;
    link: string;
  }[];
}) => {
  const x = useMotionValue(0);

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      {items.map((item, idx) => (
        <div className="  relative group" key={item.name}>
          <Link href={item.link} target="_blank">
            <Image
              onMouseMove={handleMouseMove}
              height={200}
              width={200}
              src={item.image}
              alt={item.name}
              className="object-cover !m-0 !p-0 object-top rounded-full h-32 w-32 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
            />
            <p className="pt-2 text-center font-semibold">{item.name}</p>
          </Link>
        </div>
      ))}
    </>
  );
};
