import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

/**
 * On-demand revalidation endpoint. Payload pings this when content changes,
 * passing a cache tag. Protected by a shared secret (skipped if unset locally).
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (secret && request.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ ok: false, message: 'Non autorisé' }, { status: 401 })
  }

  const { tag } = (await request.json().catch(() => ({}))) as { tag?: string }
  if (!tag) {
    return NextResponse.json({ ok: false, message: 'tag requis' }, { status: 400 })
  }

  revalidateTag(tag)
  return NextResponse.json({ ok: true, revalidated: tag })
}
