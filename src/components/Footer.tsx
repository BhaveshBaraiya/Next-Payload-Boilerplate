import { getPayload } from 'payload'
import configPromise from '../payload.config'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export async function Footer() {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch BOTH collections
  const footerData = await payload.findGlobal({ slug: 'footer' })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  // Extract from Footer Global
  const navItems = footerData?.navItems || []
  const copyright = footerData?.copyright || '© 2026 Next Payload Boilerplate All rights reserved.'
  const brandMessage = footerData?.brandMessage || 'Pioneering digital experiences.'

  // Extract from SiteSettings Global
  const siteLogo = typeof siteSettings?.brand?.logo === 'object' ? siteSettings.brand.logo?.url : null
  const siteName = siteSettings?.brand?.siteName || 'Next Payload Boilerplate'
  const linkedin = siteSettings?.social?.linkedin
  const github = siteSettings?.social?.github

  return (
    <footer className="border-t border-neutral-900 bg-[#020202] pt-24 pb-12 text-neutral-500 font-light text-sm">
      <div className="container mx-auto px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              {siteLogo ? (
                <Image src={siteLogo} alt={siteName} width={140} height={40} className="object-contain" />
              ) : (
                <h3 className="text-white text-xl font-bold tracking-tighter">{siteName}</h3>
              )}
            </Link>
            <p className="leading-relaxed max-w-sm">{brandMessage}</p>
          </div>

          <div className="md:col-span-2 md:col-start-9 space-y-6">
            <h4 className="text-white font-semibold uppercase tracking-widest text-xs">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {navItems.map((item: any, i: number) => (
                <Link key={i} href={item.url} className="hover:text-white transition-colors w-fit">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-white font-semibold uppercase tracking-widest text-xs">Socials</h4>
            <nav className="flex flex-col gap-4">
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">
                  LinkedIn
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">
                  GitHub
                </a>
              )}
            </nav>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-neutral-900 gap-4">
          <p className="tracking-wide text-xs">{copyright}</p>
          <div className="flex gap-6 text-xs tracking-widest uppercase">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}