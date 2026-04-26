import { ContactModal } from "@/components/ContactModal";

export default function ContactezNousPage() {
  return (
    <main className="min-h-screen px-6 md:px-16 pt-28 pb-16 text-white bg-black">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
      <p className="text-base md:text-lg text-gray-300 max-w-3xl mb-8">
        Le formulaire de contact reste identique à la version actuelle.
      </p>
      <ContactModal>
        <button className="rounded-full bg-white text-black px-5 py-2 font-medium">
          Ouvrir le formulaire de contact
        </button>
      </ContactModal>
    </main>
  );
}
