import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ContentCardProps {
  title: string;
  description: string;
  link: string;
  src: string;
  date: string;
  className?: string; // 👈 allow custom classes
}

export default function ContentCard({
  title,
  description,
  link,
  src,
  date,
  className,
}: ContentCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col  rounded-xl shadow-md overflow-hidden",
        className
      )}
    >
      <div className="relative h-[300px] bg-gradient-to-r from-blue-800 to-indigo-900 p-4 overflow-hidden">
        <div className="w-1/2">
          <Image
            src="/vanity_corp_Icon_color.webp"
            alt={title}
            width={500}
            height={500}
            className="w-8 h-8 rounded-full mb-5"
          />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>

        <Image
          src={src}
          alt={title}
          width={500}
          height={500}
          className="absolute  w-2/3 h-full object-cover  object-left rounded-xl top-4 right-[-70px]"
        />
      </div>
      {/*   <Image
        src={src}
        alt={title}
        width={500}
        height={500}
        className="aspect-video w-full object-cover object-top rounded-t-xl"
      /> */}

      <div className="flex flex-col gap-5 p-7">
        <p className="text-gray-500 font-normal">{description}</p>

        <div className="flex flex-row justify-between items-center">
          <p className="text-gray-500">{date}</p>
          <a className="text-white bg-black rounded-full py-2 px-4" href={link}>
            Lire la suite
          </a>
        </div>
      </div>
    </div>
  );
}
