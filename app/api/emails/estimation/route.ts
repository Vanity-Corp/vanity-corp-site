import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;

    if (!cmsUrl) {
      throw new Error("NEXT_PUBLIC_CMS_URL is not defined");
    }

    // Ensure features is an array
    const features = Array.isArray(body.features)
      ? body.features
      : [body.features].filter(Boolean);

    const payload = { ...body, features };

    const response = await fetch(`${cmsUrl}/api/devis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.error || "CMS request failed",
          details: data.details,
        },
        { status: response.status },
      );
    }

    // Retourner le statut de l'opération (sent/failed)
    return NextResponse.json({
      message: data.message || "Quote request processed",
      status: data.status, // 'sent' ou 'failed'
    });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request" },
      { status: 500 },
    );
  }
}
