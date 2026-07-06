import { render } from "@react-email/render";
import ReservationEmail from "@/components/emails/reservationEmail";
import transporter from "@/lib/mail";
import { NextResponse } from "next/server";

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

    const html = await render(
      ReservationEmail({
        fullName,
        email,
        phone,
        clientType,
        projectDescription,
        date,
        hours,
      }),
    );

    // Send email via SMTP
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "Corp.vanity@gmail.com",
      subject: "Nouvelle réservation studio",
      html,
      replyTo: email,
    });

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
