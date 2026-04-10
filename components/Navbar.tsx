"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

const MENU_ITEMS = [
  { label: "Studio de tournage", href: "/studio-de-tournage" },
  { label: "Accompagnement stratégique", href: "/accompagnement-strategique" },
  { label: "Audiovisuel", href: "/audiovisuel" },
  { label: "Nos réalisations", href: "/realisations" },
  { label: "Nos tarifs", href: "/nos-tarifs" },
  { label: "Contactez-nous", href: "/contactez-nous" },
  { label: "Estimation gratuite", href: "/estimation" },
] as const;

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed z-50 w-full top-0">
      <div className="flex items-center justify-between px-3 md:px-32 py-3 bg-black text-white">
        <Link href="/">
          <Image
            src="/vanity_corp_Icon_color.svg"
            width={35}
            height={35}
            alt="Vanity Corp Logo"
          />
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2 hover:bg-gray-800 rounded-md text-sm"
            >
              {item.label}
            </Link>
          ))}
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
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-3 space-y-2">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 hover:bg-gray-900 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
