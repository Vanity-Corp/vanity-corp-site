"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
const schema = z.object({
  clientType: z.enum(
    [
      "Une entreprise / Collectivité",
      "Un particulier",
      "Indépendant / Artiste / Créateur",
      "Une association / ONG",
    ],
    {
      errorMap: (issue) => {
        return { message: "ce champ est obligatoire" }; // Default message for other errors
      },
    }
  ),
  budget: z.enum(
    [
      "1 000 € à 2 000 €",
      "2 000 € à 5 000 €",
      "5 000 € à 10 000 € ",
      "+ 10 000 €",
    ],
    {
      errorMap: (issue) => {
        return { message: "ce champ est obligatoire" }; // Default message for other errors
      },
    }
  ),
  services: z.enum(
    [
      "Vidéo / Photo",
      "Site web",
      "Réseaux sociaux",
      "Graphisme",
      "Stratégie",
      "Autre",
    ],
    {
      errorMap: (issue) => {
        return { message: "ce champ est obligatoire" }; // Default message for other errors
      },
    }
  ),
  features: z.string().min(1, "Ce champ est obligatoire"),
  name: z.string().min(2, "Le nom est obligatoire"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().regex(/^\+?[0-9]\d{9,14}$/, "Numéro de téléphone invalide"),
});

type FormData = z.infer<typeof schema>;

const steps = [
  {
    id: "step1",
    name: "Qui êtes vous ? ",
    fields: ["clientType"],
  },
  {
    id: "step2",
    name: "Qu’est ce qu’on peut faire pour vous ? ",
    fields: ["services"],
  },
  {
    id: "step3",
    name: "Racontez-nous votre projet en quelques mots...",
    fields: ["features"],
  },
  {
    id: "step4",
    name: "Quel est votre budget ? ",
    fields: ["budget"],
  },
  {
    id: "step5",
    name: "Comment vous contacter ?",
    fields: ["name", "email", "phone"],
  },
  {
    id: "step6",
    name: "C’est parti ! On s'en occupe 💼",
    fields: [],
  },
];

/*************  ✨ Codeium Command ⭐  *************/
/**
 * This component renders a multi-step form to request a quote for a project.
 *
 * The form has 6 steps, each with its own fields and validation rules.
 * The component uses the `useForm` hook from `react-hook-form` to manage the
 * form state and validation.
 *
 * The component also uses the `motion` library to animate the transition between
 * steps.
 *
 * @returns {JSX.Element} The rendered form component.
 */
/******  36b877e7-372c-4b4c-83fc-1843a6e5e148  *******/ export default function QuoteEstimator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/emails/estimation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        handleNext(); // Move to the thank you step
        toast({
          title: "Quote Request Sent",
          description:
            "We've received your request and will get back to you soon.",
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem sending your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const currentStepFields = steps[currentStep].fields;

  return (
    <div className="flex justify-center items-center w-full h-screen mt-10">
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.slice(0, -1).map((step, index) => (
              <div key={step.id} className="flex items-center justify-space">
                <div
                  className={`p-2 w-full  rounded-full flex items-center  justify-center text-[20px] md:text-base ${
                    index <= currentStep
                      ? "bg-white text-[#D33E6B] border-[#D33E6B] border-2"
                      : "bg-[#D33E6B]  text-white"
                  }`}
                >
                  <span className="hidden md:block">Étape {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep < steps.length - 1 ? (
              <div className="flex flex-col items-center gap-4 md:block">
                <h3 className="text-xl font-[600] text-gray-900 mb-4">
                  <span className="text-[#D33E6B]">{currentStep + 1}.</span>{" "}
                  {steps[currentStep].name}
                </h3>
                {currentStepFields.includes("clientType") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Select
                      onValueChange={(value) =>
                        setValue("clientType", value as FormData["clientType"])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Une entreprise / Collectivité",
                          "Un particulier",
                          "Indépendant / Artiste / Créateur",
                          "Une association / ONG",
                        ].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.clientType && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.clientType.message}
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("services") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Select
                      onValueChange={(value) =>
                        setValue("services", value as FormData["services"])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Vidéo / Photo",
                          "Site web",
                          "Réseaux sociaux",
                          "Graphisme",
                          "Stratégie",
                          "Autre",
                        ].map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.services && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.services.message}
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("features") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Label className="text-black">
                      Donnez-nous le maximum de détails ( sur vous, la
                      prestation attendu, les delais, le nombre de photos, la
                      longueur de la vidéo, Etc...)
                    </Label>
                    <Textarea
                      onChange={(e) =>
                        setValue(
                          "features",
                          e.target.value as unknown as FormData["features"]
                        )
                      }
                      placeholder="Votre message..."
                    />
                    {errors.features && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.features.message}
                      </p>
                    )}
                  </div>
                )}

                {currentStepFields.includes("budget") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Select
                      onValueChange={(value) =>
                        setValue("budget", value as FormData["budget"])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "1 000 € à 2 000 €",
                          "2 000 € à 5 000 €",
                          "5 000 € à 10 000 € ",
                          "+ 10 000 €",
                        ].map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.budget && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>
                )}

                {currentStepFields.includes("name") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Input
                      placeholder="Votre nom*"
                      id="name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("email") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Input
                      placeholder="Votre adresse email*"
                      id="email"
                      type="email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
                {currentStepFields.includes("phone") && (
                  <div className="mb-4 w-[90%] md:w-full">
                    <Input
                      id="phone"
                      placeholder="Votre numéro de téléphone*"
                      type="tel"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  C’est parti !<br /> On s’en occupe 💼{" "}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Vous recevrez un devis dans moins de 24h. Vous voulez une
                  réponse express ? programmez un rendez-vous téléphonique :
                </p>
              </div>
            )}
          </motion.div>
          <div className="mt-8 flex justify-between">
            {currentStep < steps.length - 1 ? (
              <>
                <Button
                  type="button"
                  className="text-black bg-white border-2 hover:bg-black hover:text-white rounded-full text-[10px] md:text-base"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  variant="outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Étape précédente
                </Button>
                {currentStep < steps.length - 2 ? (
                  <Button
                    className="text-[#D33E6B] bg-white border-[#D33E6B] border-2 hover:bg-[#D33E6B] hover:text-white rounded-full text-[10px] md:text-base"
                    type="button"
                    onClick={handleNext}
                  >
                    Hop ! la suite
                  </Button>
                ) : (
                  <Button
                    className="text-[#D33E6B] bg-white border-[#D33E6B] border-2 hover:bg-[#D33E6B] hover:text-white rounded-full text-[10px] md:text-base"
                    type="submit"
                  >
                    Soumettre
                  </Button>
                )}
              </>
            ) : (
              <Button type="button" className="mx-auto">
                <Link href="https://calendly.com/yanis-vanitycorp/30min">
                  ☕ Programmer un rendez-vous{" "}
                </Link>
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
