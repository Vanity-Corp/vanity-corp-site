"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function ReservationStudioPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="min-h-screen px-6 md:px-16 pt-28 pb-16 text-white bg-black">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Réservation studio</h1>
      <p className="text-gray-300 mb-6">
        Sélectionnez une date souhaitée pour votre tournage. L&apos;équipe confirmera
        ensuite la disponibilité.
      </p>
      <div className="w-fit rounded-2xl border border-gray-700 p-4 bg-black/60">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
      </div>
    </main>
  );
}
