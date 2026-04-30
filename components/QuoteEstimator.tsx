"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Stepper, { Step } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import Link from "next/link";
import { BriefcaseBusiness, Coffee } from "lucide-react";

const schema = z.object({
  clientType: z.enum([
    "Une entreprise / Collectivité",
    "Un particulier",
    "Indépendant / Artiste / Créateur",
    "Une association / ONG",
  ]),
  budget: z.enum([
    "1 000 € à 2 000 €",
    "2 000 € à 5 000 €",
    "5 000 € à 10 000 € ",
    "+ 10 000 €",
  ]),
  services: z.enum([
    "Vidéo / Photo",
    "Site web",
    "Réseaux sociaux",
    "Graphisme",
    "Stratégie",
    "Autre",
  ]),
  features: z.string().min(1, "Ce champ est obligatoire"),
  name: z.string().min(2, "Le nom est obligatoire"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().regex(/^\+?[0-9]\d{9,14}$/, "Numéro invalide"),
});

type FormData = z.infer<typeof schema>;

const baseSteps = [
  { id: "step1", name: "Qui êtes vous ?", fields: ["clientType"] },
  { id: "step2", name: "Service ?", fields: ["services"] },
  { id: "step3", name: "Votre projet", fields: ["features"] },
  { id: "step4", name: "Budget", fields: ["budget"] },
  { id: "step5", name: "Contact", fields: ["name", "email", "phone"] },
];

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const watchedValues = watch();

  // ✅ Step validity (SYNC, safe for UI)
  const isStepValid = () => {
    const fields = baseSteps[currentStep - 1]?.fields || [];

    return fields.every((field) => {
      const value = watchedValues[field as keyof FormData];
      const hasError = errors[field as keyof FormData];
      return value && !hasError;
    });
  };

  // ✅ Steps with success step
  const steps = [
    ...baseSteps,
    ...(isSubmitted
      ? [{ id: "step6", name: "Done", fields: [] as string[] }]
      : []),
  ];

  // ✅ Simple step change (no validation here anymore)
  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  // ✅ Submit
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch("/api/emails/estimation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      setIsSubmitted(true);
      setCurrentStep(6);

      toast({
        title: "Demande envoyée",
        description: "On vous répond sous 24h.",
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible d’envoyer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stepper
            disableStepIndicators={true} // 🔥 prevent skipping
            initialStep={currentStep}
            key={currentStep} // 🔥 keep Stepper in sync
            onStepChange={handleStepChange}
            onFinalStepCompleted={handleSubmit(onSubmit)}
            nextButtonText={currentStep === 5 ? "Envoyer" : "Hop ! la suite"}
            backButtonText="Étape précédente"
            nextButtonProps={{
              disabled: !isStepValid(), // ✅ core fix
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.id}>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* ✅ SUCCESS STEP */}
                  {isSubmitted && index === steps.length - 1 ? (
                    <div className="text-center">
                      <BriefcaseBusiness
                        size={32}
                        className="mx-auto mb-4 text-violet-500"
                      />
                      <h3 className="text-2xl font-bold mb-4">
                        C'est parti ! On s&apos;en occupe
                      </h3>
                      <p className="mb-6">Vous recevrez un devis sous 24h.</p>
                      <Button>
                        <Coffee className="mr-2" />
                        <Link href="https://calendly.com/yanis-vanitycorp/30min">
                          Prendre rendez-vous
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold mb-4">
                        {step.name}
                      </h3>

                      {/* STEP 1 */}
                      {step.fields.includes("clientType") && (
                        <>
                          <Select
                            onValueChange={(v) =>
                              setValue("clientType", v as any, {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir..." />
                            </SelectTrigger>
                            <SelectContent>
                              {schema.shape.clientType.options.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.clientType && (
                            <p className="text-red-500 text-sm">
                              {errors.clientType.message}
                            </p>
                          )}
                        </>
                      )}

                      {/* STEP 2 */}
                      {step.fields.includes("services") && (
                        <>
                          <Select
                            onValueChange={(v) =>
                              setValue("services", v as any, {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir..." />
                            </SelectTrigger>
                            <SelectContent>
                              {schema.shape.services.options.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.services && (
                            <p className="text-red-500 text-sm">
                              {errors.services.message}
                            </p>
                          )}
                        </>
                      )}

                      {/* STEP 3 */}
                      {step.fields.includes("features") && (
                        <>
                          <Label>Détails du projet</Label>
                          <Textarea {...register("features")} />
                          {errors.features && (
                            <p className="text-red-500 text-sm">
                              {errors.features.message}
                            </p>
                          )}
                        </>
                      )}

                      {/* STEP 4 */}
                      {step.fields.includes("budget") && (
                        <>
                          <Select
                            onValueChange={(v) =>
                              setValue("budget", v as any, {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir..." />
                            </SelectTrigger>
                            <SelectContent>
                              {schema.shape.budget.options.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.budget && (
                            <p className="text-red-500 text-sm">
                              {errors.budget.message}
                            </p>
                          )}
                        </>
                      )}

                      {/* STEP 5 */}
                      {step.fields.includes("name") && (
                        <>
                          <Input placeholder="Nom" {...register("name")} />
                          {errors.name && (
                            <p className="text-red-500 text-sm">
                              {errors.name.message}
                            </p>
                          )}
                        </>
                      )}

                      {step.fields.includes("email") && (
                        <>
                          <Input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">
                              {errors.email.message}
                            </p>
                          )}
                        </>
                      )}

                      {step.fields.includes("phone") && (
                        <>
                          <Input
                            placeholder="Téléphone"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm">
                              {errors.phone.message}
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </motion.div>
              </Step>
            ))}
          </Stepper>
        </form>
      </div>
    </div>
  );
}
