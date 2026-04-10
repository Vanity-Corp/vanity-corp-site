"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu as MenuIcon, X as CloseIcon, ChevronDown } from "lucide-react";

type Service = {
  image: string;
  title: string;
  description: string;
  href: string;
  cta?: string;
};

const SERVICES: Service[] = [
  {
    image: "/img/Shooting_Les_Frangines.webp",
    title: "Studio de tournage",
    description: "Réserver le studio",
    href: "/#studio-de-tournage",
    cta: "Réserver le studio",
  },
  {
    image: "/img/Portfolio Accompagnement Stratégique Vanity.webp",
    title: "Accompagnement stratégique",
    description: "Community management & audit digital",
    href: "/#accompagnement-strategique",
  },
  {
    image: "/img/Production.webp",
    title: "Audiovisuel",
    description: "Production vidéo / photo",
    href: "/#audiovisuel",
  },
];

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [megaTop, setMegaTop] = useState(0);

  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    function update() {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMegaTop(Math.ceil(rect.bottom));
      }
    }
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  const openMega = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleCloseMega = (delay = 120) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setMegaOpen(false);
      closeTimerRef.current = null;
    }, delay);
  };

  return (
    <nav ref={navRef} className="fixed z-50 w-full top-0">
      <div className="flex items-center justify-between px-3 md:px-32 py-3 bg-black text-white">
        <Link href="/">
          <Image
            src="/vanity_corp_Icon_color.svg"
            width={35}
            height={35}
            alt="Vanity Corp Logo"
          />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={() => scheduleCloseMega(150)}
          >
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-md">
              <span>Services</span>
              <ChevronDown size={16} />
            </button>

            <div
              className={`fixed left-1/2 -translate-x-1/2 w-[min(92vw,1000px)] p-6 rounded-2xl bg-black/75 border border-gray-700 backdrop-blur-lg transition-all duration-200 ${
                megaOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              style={{ top: megaTop }}
              onMouseEnter={openMega}
              onMouseLeave={() => scheduleCloseMega(150)}
            >
              <div className="grid lg:grid-cols-3 gap-4">
                {SERVICES.map((s) => (
                  <Link
                    key={s.title}
                    href={s.href}
                    className="group rounded-xl p-4 bg-black/50 border border-gray-800 hover:bg-white/5 transition"
                  >
                    <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={s.image}
                        alt={s.title}
                        width={400}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="uppercase tracking-wide text-sm font-semibold">
                      {s.title}
                    </h3>
                    {s.cta ? (
                      <span className="inline-block mt-3 text-xs rounded-full px-3 py-1 bg-white text-black font-medium">
                        {s.cta}
                      </span>
                    ) : (
                      <p className="mt-2 text-sm text-gray-300">{s.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/realisations" className="px-4 py-2 hover:bg-gray-800 rounded-md">
            Nos réalisations
          </Link>
          <Link href="/#nos-tarifs" className="px-4 py-2 hover:bg-gray-800 rounded-md">
            Nos tarifs
          </Link>
          <Link href="/contactez-nous" className="px-4 py-2 hover:bg-gray-800 rounded-md">
            Contactez-nous
          </Link>
        </div>

        <div className="hidden md:block">
          <Button className="rounded-full uppercase text-base py-1 px-4">
            <Link href="/estimation">Estimation gratuite</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Link href="/estimation">
            <Button className="rounded-full uppercase text-[10px] py-0 px-2">Estimation</Button>
          </Link>
          <button
            className="focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 py-3 space-y-2">
          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-900"
          >
            <span>Services</span>
            <ChevronDown size={16} className={mobileServicesOpen ? "rotate-180" : ""} />
          </button>

          {mobileServicesOpen && (
            <div className="space-y-2">
              {SERVICES.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  className="block px-3 py-2 rounded-md border border-gray-800 hover:bg-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          )}

          <Link href="/realisations" className="block px-3 py-2 rounded-md hover:bg-gray-900" onClick={() => setIsOpen(false)}>
            Nos réalisations
          </Link>
          <Link href="/#nos-tarifs" className="block px-3 py-2 rounded-md hover:bg-gray-900" onClick={() => setIsOpen(false)}>
            Nos tarifs
          </Link>
          <Link href="/contactez-nous" className="block px-3 py-2 rounded-md hover:bg-gray-900" onClick={() => setIsOpen(false)}>
            Contactez-nous
          </Link>
        </div>
      )}
    </nav>
  );
}
