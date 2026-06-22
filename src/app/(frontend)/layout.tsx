import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import './styles.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Next Payload CMS',
    default: 'NextPayloadBoilerplate | Premium Web Engineering',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch BOTH globals securely on the server
  const headerData = await payload.findGlobal({ slug: 'header', depth: 2, })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  // Extract the Favicon URL from SiteSettings (if uploaded)
  const faviconUrl = typeof siteSettings?.brand?.favicon === 'object' ? siteSettings.brand.favicon?.url : null

  return (
    <html lang="en">
      <head>
        {/* Dynamically inject the uploaded favicon */}
        {faviconUrl && <link rel="icon" href={faviconUrl} />}
      </head>
      <body className="bg-[#050505] text-white antialiased min-h-screen flex flex-col selection:bg-neutral-800 selection:text-white">        
        
        {/* Pass BOTH datasets to the Header */}
        <Header headerData={headerData} siteSettings={siteSettings} />
        
        <main className="flex-grow pt-20">
          {children}
        </main>        
        
        <Footer />
      </body>
    </html>
  )
}