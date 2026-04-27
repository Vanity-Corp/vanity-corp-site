"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock } from "lucide-react";
import { Footer } from "./Footer";
interface TimeSlot {
  id: string;
  label: string;
  available: boolean;
}
interface ReservationSectionProps {
  timeSlots: TimeSlot[]; // Props should be named properties
}
export default function ReservationSection({
  timeSlots,
}: ReservationSectionProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (date && selectedSlot) setSubmitted(true);
  };

  const formattedDate = date
    ? date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="dark min-h-screen pt-10  m-auto bg-neutral-950 text-white flex flex-col">
      <main className="flex-1 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="px-6 sm:px-10 py-10 border-b border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-indigo-400 border border-indigo/40 rounded-full px-3.5 py-1 mb-4">
              Réservation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              Choisissez votre
              <br />
              <span className="font-normal text-indigo-400 italic">
                créneau de tournage
              </span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-xs leading-relaxed md:text-right">
            Sélectionnez une date et un horaire. Notre équipe confirmera la
            disponibilité sous 24h.
          </p>
        </div>

        {/* Calendar + Slots grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Left — Calendar */}
          <div className="px-6 sm:px-10 py-10">
            <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-6">
              01 — Choisir une date
            </p>

            <div className="dark w-full md:w-[70%] rounded-2xl border border-white/10 bg-neutral-950 shadow-xl shadow-black/40 p-3 m-auto">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl w-full "
                disabled={{ before: new Date() }}
              />
            </div>

            {date && (
              <div className="mt-5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                <p className="text-sm text-neutral-300 capitalize">
                  {formattedDate}
                </p>
              </div>
            )}
          </div>

          {/* Right — Slots + Summary */}
          <div className="px-6 sm:px-10 py-10 flex flex-col gap-8">
            {/* Time slots */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-6">
                02 — Choisir un créneau
              </p>
              <div className="flex flex-col gap-2.5">
                {timeSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.id;
                  return (
                    <button
                      key={slot.id}
                      disabled={!slot.available}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      className={[
                        "flex items-center justify-between w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150 text-left",
                        !slot.available
                          ? "border-white/5 bg-white/[0.02] text-neutral-700 cursor-not-allowed"
                          : isSelected
                            ? "border-white bg-white text-neutral-900 shadow-lg shadow-white/10"
                            : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/30 hover:bg-white/10 cursor-pointer",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock
                          size={14}
                          className={
                            !slot.available
                              ? "text-neutral-700"
                              : isSelected
                                ? "text-neutral-900"
                                : "text-neutral-500"
                          }
                        />
                        <span>{slot.label}</span>
                      </div>

                      {!slot.available && (
                        <Badge
                          variant="outline"
                          className="text-[10px] text-neutral-700 border-white/10 font-normal bg-transparent"
                        >
                          Indisponible
                        </Badge>
                      )}

                      {isSelected && (
                        <CheckCircle2
                          size={16}
                          className="shrink-0 text-neutral-900"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary + CTA */}
            <div className="mt-auto">
              <div
                className={[
                  "rounded-2xl border p-5 mb-5 transition-all duration-200",
                  date && selectedSlot
                    ? "border-white/10 bg-white/5"
                    : "border-dashed border-white/10 bg-transparent",
                ].join(" ")}
              >
                <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-3">
                  Récapitulatif
                </p>
                {!date && !selectedSlot ? (
                  <p className="text-sm text-indigo-400 italic">
                    Aucune sélection pour le moment.
                  </p>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {date && (
                      <div className="flex items-baseline gap-2 text-sm text-neutral-200">
                        <span className="text-neutral-500 shrink-0">
                          Date —
                        </span>
                        <span className="font-medium capitalize">
                          {formattedDate}
                        </span>
                      </div>
                    )}
                    {selectedSlot && (
                      <div className="flex items-baseline gap-2 text-sm text-neutral-200">
                        <span className="text-neutral-500 shrink-0">
                          Créneau —
                        </span>
                        <span className="font-medium">
                          {timeSlots.find((s) => s.id === selectedSlot)?.label}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {submitted ? (
                <div className="flex items-center gap-3 rounded-xl bg-white text-neutral-900 px-5 py-4">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-neutral-900"
                  />
                  <p className="text-sm font-medium">
                    Demande envoyée — nous confirmons sous 24h.
                  </p>
                </div>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!date || !selectedSlot}
                  className="w-full h-12 rounded-xl bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-100 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  Envoyer la demande →
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
