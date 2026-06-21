import React from 'react'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { Metadata } from 'next' // <-- Import Next.js Metadata type
import configPromise from '../../../payload.config'
import { RenderBlocks } from '../../../blocks/RenderBlocks'

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

// ============================================================================
// NEW: Phase 12 - Dynamic SEO Metadata Generator
// ============================================================================
export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug ? resolvedParams.slug.join('/') : 'home'

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = docs[0]

  // Fallback if no page is found
  if (!page) {
    return { title: 'Page Not Found' }
  }

  // Extract the meta object we built in Phase 5
  const meta = page.meta || {}

  // Next.js automatically maps this object to standard HTML tags and Open Graph tags
  return {
    title: meta.title || page.title, // Fallback to the page name if the client forgot to write an SEO title
    description: meta.description || 'A premium digital experience.',
    // If we have an image, pass its URL for Twitter/LinkedIn link previews
    openGraph: {
      title: meta.title || page.title,
      description: meta.description || '',
      images: meta.image && typeof meta.image === 'object' && meta.image.url ? [meta.image.url] : [],
    },
    // The noIndex toggle we built to hide pages from Google
    robots: {
      index: !meta.noIndex,
      follow: !meta.noIndex,
    },
  }
}

// ============================================================================
// EXISTING: Visual Page Renderer
// ============================================================================
export default async function DynamicPage({ params }: Args) {
  const resolvedParams = await params
  const slug = resolvedParams.slug ? resolvedParams.slug.join('/') : 'home'

  const { isEnabled: isDraftMode } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: isDraftMode,
    overrideAccess: isDraftMode, 
  })

  const page = docs[0]

  if (!page) return notFound()

  return (
    <main className="min-h-screen relative">
      {isDraftMode && (
        <div className="fixed bottom-4 right-4 z-50 rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
          ⚠️ Draft Mode Active
        </div>
      )}
      <RenderBlocks layout={page.layout} />
    </main>
  )
}