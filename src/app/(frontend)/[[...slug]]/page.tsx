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
  // Create the full path string (e.g., '/about/our-mission')
  const path = resolvedParams.slug ? `/${resolvedParams.slug.join('/')}` : '/'

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      // Use the same 'fullPath' logic as your DynamicPage component
      fullPath: { equals: path.replace(/^\//, '') } 
    },
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    return { title: 'Page Not Found' }
  }
  const meta = page.meta || {}

  return {
    title: meta.title || page.title,
    description: meta.description || 'A premium digital experience.',    
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
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || ['home'];
  const currentSlug = slugArray[slugArray.length - 1];

  const payload = await getPayload({ config: configPromise });

  // Simply find the page by its slug
  const { docs } = await payload.find({
    collection: 'pages',
    where: { 
      slug: { equals: currentSlug } 
    },
    limit: 1,
  });

  const page = docs[0];
  if (!page) return notFound();

  return <RenderBlocks layout={page.layout || []} />;
}