"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Textarea } from "./ui/textarea";

// Validation schema with Zod
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'e-mail est requis." })
    .email({ message: "Veuillez entrer un e-mail valide." }),
  message: z.string().min(1, { message: "Le message est requis." }),
  name: z.string().min(1, { message: "Le nom est requis." }),
  phone: z
    .string() // Changed to string to handle phone numbers
    .min(10, {
      message: "Le numéro de téléphone doit contenir au moins 10 chiffres.",
    })
    .max(14, {
      message: "Le numéro de téléphone ne peut pas dépasser 14 chiffres.",
    }),
});

export function ContactModal() {
  const [successMessage, setSuccessMessage] = useState(""); // State for success notification
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/emails/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Use form data
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des données");
      }

      // Set success message and reset form
      setSuccessMessage("Votre message a été envoyé avec succès !");
      form.reset(); // Reset the form after submission
    } catch (error) {
      console.error("Erreur:", error);
      setSuccessMessage(
        "Une erreur s'est produite lors de l'envoi du message."
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger>
          <svg
            width={20}
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M215.4 96H144 107.8 96v8.8V144v40.4 89L.2 202.5c1.6-18.1 10.9-34.9 25.7-45.8L48 140.3V96c0-26.5 21.5-48 48-48h76.6l49.9-36.9C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L339.4 48H416c26.5 0 48 21.5 48 48v44.3l22.1 16.4c14.8 10.9 24.1 27.7 25.7 45.8L416 273.4v-89V144 104.8 96H404.2 368 296.6 215.4zM0 448V242.1L217.6 403.3c11.1 8.2 24.6 12.7 38.4 12.7s27.3-4.4 38.4-12.7L512 242.1V448v0c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64v0zM176 160H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
          </svg>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              ON EN PARLE AUTOUR D&apos;UN CAFÉ ?
            </h4>
            <div className="flex flex-wrap px-10 items-start justify-start ">
              <Form {...form}>
                <form className="w-full flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre Nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Votre Téléphone"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Votre Message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>{" "}
                {/* End of form here */}
              </Form>

              {/* Success Notification */}
              {successMessage && (
                <div className="mt-4 p-2 bg-green-100 text-green-800 border border-green-300 rounded">
                  {successMessage}
                </div>
              )}
            </div>
          </ModalContent>

          {/* Button in the ModalFooter */}
          <ModalFooter className="gap-4">
            <HoverBorderGradient>
              {/* The submit button triggers the form submission */}
              <Button
                type="button"
                size="inner"
                variant="nobackground"
                onClick={form.handleSubmit(onSubmit)} // Call onSubmit function on click
              >
                Envoyer
              </Button>
            </HoverBorderGradient>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
