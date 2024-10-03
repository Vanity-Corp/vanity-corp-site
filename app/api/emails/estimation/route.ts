import { NextResponse } from "next/server";
import { Resend } from "resend";
import QuoteRequestEmail from "@/components/emails/quote-request-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ensure features is an array
    const features = Array.isArray(body.features)
      ? body.features
      : [body.features].filter(Boolean);

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "teemohmost2020@gmail.com",
      subject: "Nouvelle demande de devis",
      react: QuoteRequestEmail({ ...body, features }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
