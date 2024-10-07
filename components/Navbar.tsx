import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ButtonMovingBorder } from "./ui/moving-border";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { ContactModal } from "./ContactModal";
function Navbar() {
  return (
    <nav className="flex justify-between items-center font-medium px-3 md:px-32 py-3 bg-black absolute z-10 w-full top-0 ">
      <div className="hidden md:block">
        <Link href="/">
          <Image src="/vanity_corp_logo.svg" width={200} height={35} alt="" />
        </Link>
      </div>
      <div className="md:hidden">
        <Link href="/">
          <Image
            src="/vanity_corp_Icon_color.svg"
            width={35}
            height={35}
            alt=""
          />
        </Link>
      </div>

      <div>
        <Button className="rounded-full uppercase text-[10px] md:text-base py-0 md:py-1 px-2 md:px-4">
          <Link href={"/estimation"}>Estimation gratuite</Link>
        </Button>
      </div>
      <div className=" md:hidden">
        <ContactModal>
          {" "}
          <svg
            width={20}
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M215.4 96H144 107.8 96v8.8V144v40.4 89L.2 202.5c1.6-18.1 10.9-34.9 25.7-45.8L48 140.3V96c0-26.5 21.5-48 48-48h76.6l49.9-36.9C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L339.4 48H416c26.5 0 48 21.5 48 48v44.3l22.1 16.4c14.8 10.9 24.1 27.7 25.7 45.8L416 273.4v-89V144 104.8 96H404.2 368 296.6 215.4zM0 448V242.1L217.6 403.3c11.1 8.2 24.6 12.7 38.4 12.7s27.3-4.4 38.4-12.7L512 242.1V448v0c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64v0zM176 160H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
          </svg>
        </ContactModal>
      </div>
    </nav>
  );
}

export default Navbar;
