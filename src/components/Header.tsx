import { getPayload } from 'payload'
import configPromise from '../payload.config'
import Link from 'next/link'
import React from 'react'

export async function Header() {
  // 1. Initialize the Payload API
  const payload = await getPayload({ config: configPromise })
  
  // 2. Fetch the singleton Header data from PostgreSQL
  const headerData = await payload.findGlobal({ 
    slug: 'header',
  })

  // Safely extract the navigation items (default to empty array if none exist)
  const navItems = headerData?.navItems || []

  return (
    <header className="absolute top-0 z-50 w-full py-6">
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo / Text */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
          AGENCY<span className="text-blue-500">.</span>
        </Link>

        {/* Dynamic Navigation from CMS */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          {navItems.map((item: any, i: number) => {
            // Check if it's a manual URL or a relationship reference
            const href = item.link.type === 'reference' && typeof item.link.reference?.value === 'object' 
              ? `/${item.link.reference.value.slug}`
              : item.link.url || '/'

            return (
              <Link 
                key={i} 
                href={href} 
                className="hover:text-white transition-colors"
              >
                {item.link.label}
              </Link>
            )
          })}
        </nav>

        {/* Call to Action Button */}
        <button className="bg-white text-slate-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors">
          Get in touch
        </button>
      </div>
    </header>
  )
}