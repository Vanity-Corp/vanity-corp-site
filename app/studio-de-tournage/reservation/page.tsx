import ReservationSection from "@/components/Reservation";
const TIME_SLOTS = [
  { id: "am", label: "Matinée — 08h à 12h", available: true },
  { id: "pm", label: "Après-midi — 13h à 17h", available: true },
  { id: "eve", label: "Soirée — 18h à 22h", available: false },
  { id: "day", label: "Journée complète — 08h à 17h", available: true },
];
export default function ReservationStudioPage() {
  return <ReservationSection timeSlots={TIME_SLOTS} />;
}
