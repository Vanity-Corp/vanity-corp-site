import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ButtonMovingBorder } from "./ui/moving-border";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
function Navbar() {
  return (
    <div className="flex justify-between items-center font-medium px-32 py-3 bg-black absolute z-10 w-full top-0 ">
      <div>
        <Link href="/">
          <Image src="/vanity_corp_logo.svg" width={200} height={35} alt="" />
        </Link>
      </div>
      <div>
        <Button className="rounded-full uppercase">
          <Link href={"/estimation"}>Estimation gratuite</Link>
        </Button>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar;
