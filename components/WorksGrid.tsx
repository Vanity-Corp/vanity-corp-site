"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "./ui/layout-grid";
import { title } from "process";

export function WorksGrid() {
  return (
    <div className="h-screen w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Little Big Friends
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Photo Produit
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Revlon Professional
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Photo Produit
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Nassi</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Shooting Studio
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Tournée Mondiale Fally Ipupa
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Photo de concert
      </p>
    </div>
  );
};
const SkeletonFive = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">DORIA</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Reportage Photo
      </p>
    </div>
  );
};
const SkeletonSix = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Leckden</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Photo Portrait
      </p>
    </div>
  );
};
const SkeletonSeven = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Lily&apos;na</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Photo Portrait
      </p>
    </div>
  );
};
const SkeletonEight = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Baoli Lounge</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Photo Produit
      </p>
    </div>
  );
};
const SkeletonNine = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Restaurant Healthiny
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Photo Corporate
      </p>
    </div>
  );
};
const SkeletonTen = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Baoli Lounge</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Photo Produit
      </p>
    </div>
  );
};
const SkeletonEleven = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Little Big Friends
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Photo Produit
      </p>
    </div>
  );
};
const SkeletonTwelve = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">WIlly Denzey</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Photo Reportage
      </p>
    </div>
  );
};
const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "",
    thumbnail: "/img/gallery-1.webp",
    title: "hello",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "",
    thumbnail: "img/Shooting_Les_Frangines.webp",
    title: "hello",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "",
    thumbnail: "/img/gallery (3).webp",
    title: "hello",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "",
    thumbnail: "/img/gallery (4).webp",
    title: "hello",
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: "",
    thumbnail: "/img/DORIA.webp",
    title: "hello",
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: "",
    thumbnail: "/img/gallery (6).webp",
    title: "hello",
  },
  {
    id: 7,
    content: <SkeletonSeven />,
    className: "",
    thumbnail: "/img/gallery (7).webp",
    title: "hello",
  },
  {
    id: 8,
    content: <SkeletonEight />,
    className: "",
    thumbnail: "/img/gallery (8).webp",
    title: "hello",
  },
  {
    id: 9,
    content: <SkeletonNine />,
    className: "",
    thumbnail: "/img/gallery (9).webp",
    title: "hello",
  },
  {
    id: 10,
    content: <SkeletonTen />,
    className: "",
    thumbnail: "/img/gallery (10).webp",
    title: "hello",
  },
  {
    id: 11,
    content: <SkeletonEleven />,
    className: "",
    thumbnail: "/img/PHOTO_JOUET_ENFANT.webp",
    title: "hello",
  },
  {
    id: 12,
    content: <SkeletonTwelve />,
    className: "",
    thumbnail: "/img/image.webp",
    title: "hello",
  },
];
