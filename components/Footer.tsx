"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import Link from "next/link";
const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'e-mail est requis." })
    .email({ message: "Veuillez entrer un e-mail valide." }),
});

export function Footer() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <footer className="w-full flex flex-col  justify-center items-center ">
      <div className="w-3/4  flex flex-col mb-10 items-center justify-center">
        <div className="flex w-full md:items-start items-center justify-between md:flex-row flex-col gap-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:w-[40%] w-full flex md:flex-row flex-col :md:items-end items-center justify-between gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">
                      Rejoindre Notre Newsletter
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Votre Email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <HoverBorderGradient>
                <Button size="inner" variant="nobackground" type="submit">
                  S&apos;abonner
                </Button>
              </HoverBorderGradient>
            </form>
          </Form>
          <ul className="font-extralight w-full	flex flex-col gap-2 items-start flex-wrap">
            <li>À propos de nous</li>
            <li>Services</li>
            <li>Réalisations</li>
            <li>Vaniteam</li>
            <li>Actualités</li>
          </ul>
          <div className="w-full flex flex-col gap-2">
            122 Rue Amelot, 75011 Paris France
          </div>
          <div className=" flex flex-col justify-between gap-10">
            <a href="mailto:contact@vanitycorp.fr">contact@vanitycorp.fr</a>
            <div className="flex items-center flex-row gap-2">
              <a href="https://www.instagram.com/vanity.corp/">
                <motion.svg
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </motion.svg>
              </a>
              <a href="https://linkedin.com/company/vanity-corp">
                <motion.svg
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                      fill="#ffffff"
                    ></path>{" "}
                    <path
                      d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"
                      fill="#ffffff"
                    ></path>{" "}
                    <path
                      d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"
                      fill="#ffffff"
                    ></path>{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </motion.svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-10 py-4">
          <div>
            <Link href="/mentions-legales">Mentions légales</Link>
          </div>
          <div>
            <p>Droits d’auteur © 2023-2024 Vanity. Tous droits réservés. </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
