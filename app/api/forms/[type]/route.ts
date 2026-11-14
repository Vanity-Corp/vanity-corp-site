import { NextResponse } from 'next/server'

import { isFormType, submitForm } from '@/lib/payload-client'

/**
 * Thin same-origin proxy: forwards a public form submission to vanity-backend
 * (which owns persistence + email). Keeps the backend URL + token server-side
 * and avoids cross-origin CORS from the browser.
 */
export async function POST(
  request: Request,
  { params }: { params: { type: string } },
) {
  const { type } = params

  if (!isFormType(type)) {
    return NextResponse.json({ message: 'Type de formulaire inconnu' }, { status: 404 })
  }

  const body = await request.json().catch(() => ({}))

  try {
    const { ok, status, data } = await submitForm(type, body)
    return NextResponse.json(data, { status: ok ? 200 : status })
  } catch (error) {
    console.error('Form proxy error:', error)
    return NextResponse.json({ message: 'Service indisponible' }, { status: 502 })
  }
}
