"use client";
import React, { Children, useState } from "react";
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
import { PropsWithChildren } from "react";
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

export function ContactModal({ children }: PropsWithChildren<{}>) {
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
    <div className="flex items-center justify-center z-[100]">
      <Modal>
        <ModalTrigger>{children}</ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-base md:text-lg md:text-xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              ON EN PARLE AUTOUR D&apos;UN CAFÉ ?
            </h4>
            <div className="flex flex-wrap md:px-10 items-start justify-start ">
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
