import { Resend } from "resend";
import ContactEmail from "@/components/emails/contactEmail";
import { NextResponse } from "next/server"; // Import NextResponse

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, name, message, phone } = await request.json();

  // Send the email using Resend
  await resend.emails.send({
    from: "contact@vanitycorp.fr",
    to: "Corp.vanity@gmail.com",
    subject: "Contact",
    react: ContactEmail({ name, email, message, phone }),
  });

  // Return a success response
  return NextResponse.json(
    { message: "Email sent successfully!" },
    { status: 200 }
  );
}
