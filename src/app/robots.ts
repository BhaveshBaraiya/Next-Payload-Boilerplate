import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://t3universe.de'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Block search engines from indexing your CMS portal and internal APIs
      disallow: ['/admin/', '/api/'], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}