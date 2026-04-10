import Link from "next/link";

export default function StudioDeTournagePage() {
  return (
    <main className="min-h-screen px-6 md:px-16 pt-28 pb-16 text-white bg-black">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Studio de tournage</h1>
      <p className="text-base md:text-lg text-gray-300 max-w-3xl mb-8">
        Présentation du studio, photos des espaces, options techniques, et tarifs.
        Cette page sert de base pour centraliser toutes les informations du studio.
      </p>

      <section className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl border border-gray-700 p-4">Plateau principal</div>
        <div className="rounded-xl border border-gray-700 p-4">Espace interview</div>
        <div className="rounded-xl border border-gray-700 p-4">Zone photo produit</div>
      </section>

      <div className="rounded-2xl border border-gray-700 p-6 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-3">Réserver le studio</h2>
        <p className="text-gray-300 mb-4">
          Accédez au calendrier pour choisir une date de réservation.
        </p>
        <Link
          href="/studio-de-tournage/reservation"
          className="inline-block rounded-full bg-white text-black px-5 py-2 font-medium"
        >
          Ouvrir le calendrier de réservation
        </Link>
      </div>
    </main>
  );
}
