import { getPayload } from 'payload'
import configPromise from '../payload.config'
import Link from 'next/link'
import React from 'react'

export async function Footer() {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch the Global data
  const footerData = await payload.findGlobal({ 
    slug: 'footer',
  })

  const navItems = footerData?.navItems || []
  const copyright = footerData?.copyright || '© 2026 T3Universe.de. All rights reserved.'

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Dynamic Copyright */}
        <p className="text-sm">
          {copyright}
        </p>

        {/* Dynamic Navigation */}
        <nav className="flex gap-6 text-sm font-medium">
          {navItems.map((item: any, i: number) => (
            <Link 
              key={i} 
              href={item.url} 
              className="hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
      </div>
    </footer>
  )
}