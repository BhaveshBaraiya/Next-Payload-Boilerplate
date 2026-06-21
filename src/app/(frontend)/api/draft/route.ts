import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '../../../../payload.config'

export async function GET(request: Request) {
  const payload = await getPayload({ config: configPromise })
  const { searchParams } = new URL(request.url)
  
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const url = searchParams.get('url')

  // 1. Verify the secret matches our .env.local file
  if (secret !== process.env.PAYLOAD_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  // 2. Verify the page actually exists in the database before we preview it
  if (!slug) {
    return new Response('No slug provided', { status: 400 })
  }

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    draft: true, // We are looking for the draft version to verify it exists
    limit: 1,
    overrideAccess: true, 
  })

  if (docs.length === 0) {
    return new Response('Draft not found', { status: 404 })
  }

  // 3. The handshake is successful. Turn on Next.js Draft Mode (this sets the cookie).
  const draft = await draftMode()
  draft.enable()

  // 4. Redirect the user back to the page they want to see
  redirect(url || '/')
}