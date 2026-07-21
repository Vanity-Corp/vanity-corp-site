/**
 * Server-only client for the Payload backend.
 *
 * Do NOT import this from client components — it reads a server-only token.
 * It is used by the corp-site form proxy route (app/api/forms/[type]) which
 * forwards public form submissions to Payload, the single source of truth for
 * persistence + email. This site contains no email logic of its own.
 */

const PAYLOAD_URL = process.env.PAYLOAD_API_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL
const FORM_TOKEN = process.env.PAYLOAD_FORM_TOKEN

/** Public form type → Payload endpoint path. */
const ENDPOINTS = {
  contact: '/api/emails/contact',
  quote: '/api/devis',
  reservation: '/api/reservations',
} as const

export type FormType = keyof typeof ENDPOINTS

export const isFormType = (value: string): value is FormType => value in ENDPOINTS

export interface PayloadSubmitResult {
  ok: boolean
  status: number
  data: unknown
}

export async function submitToPayload(
  type: FormType,
  body: unknown,
): Promise<PayloadSubmitResult> {
  if (!PAYLOAD_URL) {
    throw new Error('PAYLOAD_API_URL (or NEXT_PUBLIC_PAYLOAD_URL) is not configured')
  }

  const response = await fetch(`${PAYLOAD_URL}${ENDPOINTS[type]}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(FORM_TOKEN ? { 'x-form-token': FORM_TOKEN } : {}),
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  const data = await response.json().catch(() => ({}))

  return { ok: response.ok, status: response.status, data }
}
