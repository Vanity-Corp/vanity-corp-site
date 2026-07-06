import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import QuoteRequestEmail from "@/components/emails/quote-request-email";
import transporter from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ensure features is an array
    const features = Array.isArray(body.features)
      ? body.features
      : [body.features].filter(Boolean);

    const html = await render(QuoteRequestEmail({ ...body, features }));

    const data = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "Corp.vanity@gmail.com",
      subject: "Nouvelle demande de devis",
      html,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
