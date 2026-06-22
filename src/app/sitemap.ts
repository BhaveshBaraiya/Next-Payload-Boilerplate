import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
export const dynamic = 'force-dynamic' // <--- ADD THIS LINE
import configPromise from '../payload.config' 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })

  // Fetch all published pages from the database
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      _status: { equals: 'published' },
    },
    limit: 1000, // Adjust if your site scales massively
  })

  // Use your production URL, fallback to localhost for development
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://t3universe.de'

  // Map the Payload pages to the Next.js Sitemap format
  const sitemapEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    // If the slug is 'home', make it the root URL, otherwise append the slug
    url: `${baseUrl}${page.slug === 'home' ? '' : `/${page.slug}`}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly',
    // Give the homepage the highest SEO priority
    priority: page.slug === 'home' ? 1 : 0.8,
  }))

  return sitemapEntries
}