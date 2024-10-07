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
        <ContactModal />
      </div>
    </nav>
  );
}

export default Navbar;
