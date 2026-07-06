import { render } from "@react-email/render";
import ContactEmail from "@/components/emails/contactEmail";
import transporter from "@/lib/mail";
import { NextResponse } from "next/server"; // Import NextResponse

export async function POST(request: Request) {
  const { email, name, message, phone } = await request.json();

  const html = await render(ContactEmail({ name, email, message, phone }));

  // Send the email using SMTP
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: "Corp.vanity@gmail.com",
    subject: "Contact",
    html,
    replyTo: email,
  });

  // Return a success response
  return NextResponse.json(
    { message: "Email sent successfully!" },
    { status: 200 },
  );
}
