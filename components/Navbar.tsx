"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ContactModal } from "./ContactModal";
import { Menu as MenuIcon, X as CloseIcon, ChevronDown } from "lucide-react";

const NAV_SERVICES = [
  { title: "Studio de tournage", href: "/#studio-de-tournage" },
  {
    title: "Accompagnement stratégique",
    href: "/#accompagnement-strategique",
  },
  { title: "Audiovisuel", href: "/#audiovisuel" },
];

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [megaTop, setMegaTop] = useState(0);

  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    function updateTop() {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMegaTop(Math.ceil(rect.bottom));
      }
    }

    updateTop();
    window.addEventListener("resize", updateTop);
    window.addEventListener("scroll", updateTop);
    return () => {
      window.removeEventListener("resize", updateTop);
      window.removeEventListener("scroll", updateTop);
    };
  }, []);

  const openMega = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMegaOpen(true);
  };

  const closeMega = (delay = 150) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setMegaOpen(false);
      closeTimerRef.current = null;
    }, delay);
  };

  return (
    <nav ref={navRef} className="fixed font-medium z-50 w-full top-0">
      <div className="flex items-center justify-between px-3 md:px-32 py-3 bg-black text-white">
        <Link href="/">
          <Image
            src="/vanity_corp_Icon_color.svg"
            width={35}
            height={35}
            alt="Vanity Corp Logo"
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={() => closeMega(180)}
          >
            <button
              aria-expanded={megaOpen}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <span>Services</span>
              <ChevronDown size={16} />
            </button>

            <div
              className={`fixed left-1/2 -translate-x-1/2 w-[min(94vw,1100px)] mt-2 rounded-2xl border border-gray-700 bg-black/90 backdrop-blur-lg shadow-2xl p-6 transition-all duration-150 ${
                megaOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
              style={{ top: `${megaTop}px` }}
              onMouseEnter={openMega}
              onMouseLeave={() => closeMega(180)}
            >
              <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6">
                <div className="rounded-xl border border-gray-800 bg-black/60 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    Service phare
                  </p>
                  <h3 className="mt-3 text-2xl font-bold uppercase">
                    Studio de tournage
                  </h3>
                  <div className="mt-4">
                    <Link href="/#studio-de-tournage">
                      <Button className="rounded-full">Réserver le studio</Button>
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4">
                  {NAV_SERVICES.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="rounded-xl border border-gray-800 bg-black/40 p-4 hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-sm tracking-wider uppercase font-semibold">
                        {service.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-300">
                  Vous ne trouvez pas ce que vous cherchez ?
                </p>
                <Link href="/estimation" className="text-sm hover:underline">
                  Estimation gratuite
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/realisations"
            className="px-4 py-2 hover:bg-gray-800 rounded-md"
          >
            Réalisations
          </Link>

          <ContactModal>Contactez-nous</ContactModal>
        </div>

        <div className="hidden md:block">
          <Button className="rounded-full uppercase text-base py-1 px-4">
            <Link href="/estimation">Estimation gratuite</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Link href="/estimation">
            <Button className="rounded-full uppercase text-[10px] py-0 px-2">
              Estimation
            </Button>
          </Link>

          <button
            className="focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 text-white">
          <div className="px-4 py-3">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-900"
            >
              <span>Services</span>
              <ChevronDown
                size={16}
                className={`${mobileServicesOpen ? "rotate-180" : ""} transition-transform`}
              />
            </button>

            {mobileServicesOpen && (
              <div className="mt-2 space-y-2">
                {NAV_SERVICES.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="block px-3 py-2 rounded-md border border-gray-800 hover:bg-gray-900"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-3">
              <ContactModal>
                <Button className="w-full rounded-full uppercase py-2">Contact</Button>
              </ContactModal>
            </div>

            <Link
              href="/realisations"
              className="block mt-3 px-3 py-2 hover:bg-gray-900 rounded-md"
            >
              Réalisations
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
