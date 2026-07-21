import { NextResponse } from 'next/server'

import { isFormType, submitToPayload } from '@/lib/payload-client'

/**
 * Thin same-origin proxy: forwards a public form submission to the Payload
 * backend (which owns persistence + email). Keeps the Payload URL + token
 * server-side and avoids cross-origin CORS from the browser.
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
    const { ok, status, data } = await submitToPayload(type, body)
    return NextResponse.json(data, { status: ok ? 200 : status })
  } catch (error) {
    console.error('Form proxy error:', error)
    return NextResponse.json({ message: 'Service indisponible' }, { status: 502 })
  }
}
