/**
 * Server-only client for the vanity-backend (NestJS) public form endpoints.
 *
 * Do NOT import this from client components — it reads a server-only token.
 * It is used by the corp-site form proxy route (app/api/forms/[type]) which
 * forwards public form submissions to vanity-backend, the single source of
 * truth for persistence + email. This site contains no email logic of its own.
 */

const API_URL = process.env.API_URL
const FORM_TOKEN = process.env.FORM_SUBMISSION_TOKEN

/** Public form type → vanity-backend endpoint path (SubmissionsPublicController). */
const ENDPOINTS = {
  contact: '/api/public/forms/contact',
  quote: '/api/public/forms/quote',
  reservation: '/api/public/forms/reservation',
} as const

export type FormType = keyof typeof ENDPOINTS

export const isFormType = (value: string): value is FormType => value in ENDPOINTS

export interface BackendSubmitResult {
  ok: boolean
  status: number
  data: unknown
}

export async function submitForm(
  type: FormType,
  body: unknown,
): Promise<BackendSubmitResult> {
  if (!API_URL) {
    throw new Error('API_URL is not configured')
  }

  const response = await fetch(`${API_URL}${ENDPOINTS[type]}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // FormTokenGuard requires this header on every call, unauthenticated otherwise.
      ...(FORM_TOKEN ? { 'x-form-token': FORM_TOKEN } : {}),
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  const data = await response.json().catch(() => ({}))

  return { ok: response.ok, status: response.status, data }
}
