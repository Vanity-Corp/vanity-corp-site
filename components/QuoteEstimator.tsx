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
import Stepper, { Step } from "@/components/ui/Stepper"; // Import the new stepper
import { BriefcaseBusiness, Coffee } from "lucide-react";

const schema = z.object({
  clientType: z.enum(
    [
      "Une entreprise / Collectivité",
      "Un particulier",
      "Indépendant / Artiste / Créateur",
      "Une association / ONG",
    ],
    {
      errorMap: () => ({ message: "ce champ est obligatoire" }),
    },
  ),
  budget: z.enum(
    [
      "1 000 € à 2 000 €",
      "2 000 € à 5 000 €",
      "5 000 € à 10 000 € ",
      "+ 10 000 €",
    ],
    {
      errorMap: () => ({ message: "ce champ est obligatoire" }),
    },
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
      errorMap: () => ({ message: "ce champ est obligatoire" }),
    },
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
    name: "Qu'est ce qu'on peut faire pour vous ? ",
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
    name: "C'est parti ! On s'en occupe ",
    fields: [],
  },
];

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1); // Start from 1 instead of 0
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
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
        setCurrentStep(6); // Move to final step after submission
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

  const handleStepChange = (step: number) => {
    // Validate current step before allowing navigation
    const currentFields = steps[currentStep - 1].fields;
    if (currentFields.length > 0) {
      trigger(currentFields as any).then((isValid) => {
        if (isValid) {
          setCurrentStep(step);
        }
      });
    } else {
      setCurrentStep(step);
    }
  };

  const isStepValid = (step: number) => {
    const stepFields = steps[step - 1].fields;
    return stepFields.every((field) => !errors[field as keyof FormData]);
  };

  return (
    <div className="flex justify-center items-center  mt-10">
      <div className=" rounded-lg p-6 w-full">
        <Stepper
          initialStep={currentStep}
          onStepChange={handleStepChange}
          onFinalStepCompleted={() => console.log("Completed!")}
          disableStepIndicators={false}
        >
          {steps.map((step, index) => (
            <Step key={step.id}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {index < steps.length - 1 ? (
                  <div className="flex flex-col items-center gap-4 md:block">
                    <h3 className="text-xl font-[600]  mb-4">
                      <span>{index + 1}.</span> {step.name}
                    </h3>
                    {step.fields.includes("clientType") && (
                      <div className="mb-4 w-[90%] md:w-full">
                        <Select
                          onValueChange={(value) =>
                            setValue(
                              "clientType",
                              value as FormData["clientType"],
                              { shouldValidate: true },
                            )
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
                    {step.fields.includes("services") && (
                      <div className="mb-4 w-[90%] md:w-full">
                        <Select
                          onValueChange={(value) =>
                            setValue(
                              "services",
                              value as FormData["services"],
                              {
                                shouldValidate: true,
                              },
                            )
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
                    {step.fields.includes("features") && (
                      <div className="mb-4 w-[90%] md:w-full">
                        <Label className=" text-gray-200">
                          Donnez-nous le maximum de détails ( sur vous, la
                          prestation attendu, les delais, le nombre de photos,
                          la longueur de la vidéo, Etc...)
                        </Label>
                        <Textarea
                          {...register("features")}
                          placeholder="Votre message..."
                        />
                        {errors.features && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.features.message}
                          </p>
                        )}
                      </div>
                    )}
                    {step.fields.includes("budget") && (
                      <div className="mb-4 w-[90%] md:w-full">
                        <Select
                          onValueChange={(value) =>
                            setValue("budget", value as FormData["budget"], {
                              shouldValidate: true,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une option" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "1 000 € à 2 000 €",
                              "2 000 € à 5 000 €",
                              "5 000 € à 10 000 € ",
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
                    {step.fields.includes("name") && (
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
                    {step.fields.includes("email") && (
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
                    {step.fields.includes("phone") && (
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
                  <div className="flex flex-col  text-center">
                    <div className="flex flex-col items-center justify-center">
                      <BriefcaseBusiness
                        size={30}
                        color="#8b5cf6"
                        className="mb-3"
                      />
                      <h3 className="text-2xl font-bold mb-4">
                        C&apos;est parti !<br /> On s&apos;en occupe{" "}
                      </h3>
                    </div>

                    <p className="text-lg text-gray-200 mb-6">
                      Vous recevrez un devis dans moins de 24h. Vous voulez une
                      réponse express ? programmez un rendez-vous téléphonique :
                    </p>
                    <Button type="button" className="mx-auto">
                      <Coffee className="mr-2" />
                      <Link
                        className="text-lg"
                        href="https://calendly.com/yanis-vanitycorp/30min"
                      >
                        Programmer un rendez-vous
                      </Link>
                    </Button>
                  </div>
                )}
              </motion.div>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
