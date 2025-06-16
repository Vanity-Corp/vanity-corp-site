"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ContactModal } from "./ContactModal";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center font-medium px-3 md:px-32 py-3 bg-black absolute z-10 w-full top-0">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image
            src={
              isOpen ? "/vanity_corp_logo.svg" : "/vanity_corp_Icon_color.svg"
            }
            width={isOpen ? 200 : 35}
            height={isOpen ? 35 : 35}
            alt="Vanity Corp Logo"
          />
        </Link>
      </div>

      {/* Estimation Button (always shown) */}
      <div className="hidden md:block">
        <Button className="rounded-full uppercase text-base py-1 px-4">
          <Link href="/estimation">Estimation gratuite </Link>
        </Button>
      </div>
      <div className="md:hidden">
        <Link href="/estimation">
          <Button className="rounded-full uppercase text-[10px] py-0 px-2">
            Estimation gratuite
          </Button>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 items-center">
        <Link href="/realisations">Réalisations</Link>
        <ContactModal>
          <Button className="rounded-full uppercase text-base py-1 px-4">
            Contact
          </Button>
        </ContactModal>
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden focus:outline-none"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <CloseIcon size={24} color="white" />
        ) : (
          <MenuIcon size={24} color="white" />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg md:hidden">
          <Link
            href="/realisations"
            className="block px-4 py-2 hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Réalisations
          </Link>
          <div className="px-4 py-2">
            <ContactModal>
              <Button className="w-full rounded-full uppercase text-[10px] py-1 px-2">
                Contact
              </Button>
            </ContactModal>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
