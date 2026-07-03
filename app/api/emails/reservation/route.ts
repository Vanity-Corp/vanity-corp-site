import { Resend } from "resend";
import ReservationEmail from "@/components/emails/reservationEmail";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Destructure with default values
    const {
      fullName,
      email,
      phone,
      clientType,
      projectDescription,
      date,
      hours,
    } = body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !projectDescription ||
      !date ||
      !hours
    ) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 },
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "contact@vanitycorp.fr",
      to: "Corp.vanity@gmail.com",
      subject: "Nouvelle réservation studio",
      react: ReservationEmail({
        fullName,
        email,
        phone,
        clientType,
        projectDescription,
        date,
        hours,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Réservation envoyée avec succès !" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 },
    );
  }
}
