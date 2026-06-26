// components/Navbar.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ContactModal } from "./ContactModal";
import { Menu as MenuIcon, X as CloseIcon, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
type Service = {
  image: string;
  title: string;
  description: string;
  link: string;
};

const SERVICES: Service[] = [
  {
    image: "/img/studio.jpg",
    title: "STUDIO DE TOURNAGE",
    description: "De l’idéation à la publication",
    link: "studio-de-tournage",
  },
  {
    image: "/img/Portfolio Accompagnement Stratégique Vanity.webp",
    title: "Accompagnement stratégique",
    description: "Community management & audit digital",
    link: "accompagnement-strategique",
  },
  {
    image: "/img/Production.webp",
    title: "Audiovisuel",
    description: "Production vidéo / photo",
    link: "audiovisuel",
  },
];

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [megaOpen, setMegaOpen] = useState(false); // desktop mega open
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [megaTop, setMegaTop] = useState(0);

  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const pathname = usePathname();
  const isHomPage = pathname === "/";
  // Decide full-screen breakpoint and compute top offset
  useEffect(() => {
    function update() {
      const vw = window.innerWidth;
      // when viewport <= 1152px, we use full-width panel
      setIsFullScreen(vw <= 1152);

      // measure navbar bottom (relative to viewport top)
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMegaTop(Math.ceil(rect.bottom));
      }
    }

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update); // keep position accurate on scroll
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  // Prevent body horizontal scroll when full-screen mega is open
  useEffect(() => {
    if (megaOpen && isFullScreen) {
      const prev = {
        overflow: document.body.style.overflow,
        overflowX: document.body.style.overflowX,
      };
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
      return () => {
        document.body.style.overflow = prev.overflow;
        document.body.style.overflowX = prev.overflowX;
      };
    }
    return;
  }, [megaOpen, isFullScreen]);

  // Clear any pending close timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, []);

  // open immediately, cancel any close timer
  const openMega = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMegaOpen(true);
  };

  // schedule close with a tiny delay so user can move pointer from button -> panel
  const scheduleCloseMega = (delay = 150) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setMegaOpen(false);
      closeTimerRef.current = null;
    }, delay);
  };

  // classes
  const basePanelStyles =
    "transition-all duration-180 ease-in-out bg-black/60 border border-gray-700 p-6 backdrop-blur-lg shadow-2xl";
  const visible = "opacity-100 translate-y-0 scale-100 pointer-events-auto";
  const hidden = "opacity-0 translate-y-2 scale-95 pointer-events-none";

  // Inline style to center independent of the trigger:
  const panelStyle: React.CSSProperties = isFullScreen
    ? {
        position: "fixed",
        top: `${megaTop}px`,
        left: 0,
        right: 0,
        width: "100%",
        borderRadius: 0,
        zIndex: 1000,
      }
    : {
        position: "fixed",
        top: `${megaTop}px`,
        left: "50%",
        transform: "translateX(-50%)",
        width: "fit-content",
        borderRadius: 16,
        zIndex: 1000,
      };

  return (
    <nav ref={navRef} className="fixed  font-medium  z-50 w-full top-0">
      <div className="flex items-center justify-between px-3 md:px-32 py-3 bg-black text-white">
        {/* Logo */}
        <div className="hidden md:block">
          <Link href="/">
            <Image
              src="/vanity_corp_Icon_color.svg"
              width={35}
              height={35}
              alt="Vanity Corp Logo"
            />
          </Link>
        </div>

        {/* Desktop center links */}
        <div className="hidden md:flex items-center gap-6">
          <div
            className="relative"
            // use robust handlers (open immediately, close with delay)
            onMouseEnter={openMega}
            onMouseLeave={() => scheduleCloseMega(180)}
          >
            <button
              aria-expanded={megaOpen}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <span>Services</span>
              <ChevronDown size={16} />
            </button>

            {/* Panel - fixed & centered (independent from button)
                Attach same mouse handlers to panel so moving pointer into it cancels close */}
            <div
              className={`${basePanelStyles} ${megaOpen ? visible : hidden}`}
              style={panelStyle}
              onMouseEnter={openMega}
              onMouseLeave={() => scheduleCloseMega(180)}
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start z-50">
                {/* Featured first service */}
                <div className="hidden lg:flex  items-center justify-center">
                  <div className="w-fit">
                    <Link
                      href={
                        isHomPage ? `#${SERVICES[0].link}` : SERVICES[0].link
                      }
                    >
                      <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-gray-900">
                        <Image
                          src={SERVICES[0].image}
                          alt={SERVICES[0].title}
                          width={220}
                          height={120}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </Link>
                    <div className="mt-4 text-center">
                      <Link
                        href={
                          isHomPage ? `#${SERVICES[0].link}` : SERVICES[0].link
                        }
                      >
                        <h3 className="text-lg font-bold uppercase tracking-wider">
                          {SERVICES[0].title}
                        </h3>
                      </Link>
                      <Link
                        className="inline-block mt-3 text-lg rounded-full px-3 py-1 bg-white text-black font-medium"
                        href="/studio-de-tournage/#reservation"
                      >
                        Réserver le studio
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right side grid 2x2 (exclude the featured first service) */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6 items-start w-fit">
                  {SERVICES.slice(1, 5).map((s) => (
                    <Link
                      key={s.title}
                      href={isHomPage ? `#${s.link}` : s.link}
                      className="group block rounded-xl p-4 bg-black/50 border border-gray-800 hover:bg-white/5 transition-colors shadow-md hover:shadow-xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-gray-900">
                          <Image
                            src={s.image}
                            alt={s.title}
                            width={200}
                            height={200}
                            className="object-cover w-32 h-32"
                          />
                        </div>

                        <div className="flex-1 h-full flex flex-col justify-center">
                          <h3 className="text-base tracking-wider font-semibold">
                            {s.title}
                          </h3>
                          <p className="mt-2 text-sm text-gray-300">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer row with CTA */}
              <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between gap-4">
                <div className="text-sm text-gray-300">
                  Vous ne trouvez pas ce que vous cherchez ?
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/estimation" className="text-sm hover:underline">
                    Estimation gratuite
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/realisations"
            className="px-4 py-2 hover:bg-gray-800 rounded-md"
          >
            Portfolio
          </Link>
          <Link
            href="/#nos-tarifs"
            className="px-4 py-2 hover:bg-gray-800 rounded-md"
          >
            Nos tarifs
          </Link>
          <ContactModal variant={"ghost"} className="bg-none text-base">
            Contactez-nous
          </ContactModal>
        </div>

        {/* Right side - Estimation button */}
        <div className="hidden md:block">
          <Button className="rounded-full uppercase text-base py-1 px-4">
            <Link href="/estimation">Estimation gratuite</Link>
          </Button>
        </div>

        {/* Mobile icons */}
        <div className="md:hidden flex items-center w-full justify-between gap-2">
          <div>
            <Link href="/">
              <Image
                src="/vanity_corp_Icon_color.svg"
                width={35}
                height={35}
                alt="Vanity Corp Logo"
              />
            </Link>
          </div>
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

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-3">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-900"
            >
              <span>Services</span>
              <ChevronDown
                size={16}
                className={`${
                  mobileServicesOpen ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>

            {mobileServicesOpen && (
              <div className="mt-2 space-y-2">
                {SERVICES.map((s) => (
                  <div
                    key={s.title}
                    className="border border-gray-800 rounded-md overflow-hidden"
                  >
                    <Link
                      href={`/${s.link}`}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900"
                    >
                      <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={s.image}
                          alt={s.title}
                          width={48}
                          height={48}
                          className="object-cover w-12 h-12"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{s.title}</div>
                        <div className="text-xs text-gray-300">
                          {s.description}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3">
              <ContactModal variant="ghost" className="bg-none">
                <Button className="w-full rounded-full uppercase py-2">
                  Contact
                </Button>
              </ContactModal>
            </div>

            <Link
              href="/realisations"
              className="block mt-3 px-3 py-2 hover:bg-gray-900 rounded-md"
            >
              Portfolio
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
