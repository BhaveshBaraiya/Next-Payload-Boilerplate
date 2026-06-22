'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Header = ({ headerData, siteSettings }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = headerData?.navItems || []

  const siteLogo =
    typeof siteSettings?.brand?.logo === 'object'
      ? siteSettings.brand.logo?.url
      : null

  const siteName =
    siteSettings?.brand?.siteName || 'Next Payload Boilerplate'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 lg:h-28 items-center justify-between">
          <Link
            href="/"
            className="flex items-center shrink-0 relative z-50"
          >
            {siteLogo ? (
              <Image
                src={siteLogo}
                alt={siteName}
                width={600}
                height={250}
                className="h-12 lg:h-28 w-auto object-contain"
              />
            ) : (
              <span className="text-lg lg:text-xl font-bold text-white">
                {siteName}
              </span>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item: any, i: number) => {
              const hasDropdown =
                item.dropdownItems && item.dropdownItems.length > 0

              const linkUrl =
                item.link?.type === 'custom'
                  ? item.link.url
                  : `/${item.link?.reference?.value?.slug || ''}`

              return (
                <div key={i} className="relative group">
                  <Link
                    href={linkUrl}
                    className="flex items-center gap-1 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.link?.label}

                    {hasDropdown && (
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>

                  {hasDropdown && (
                    <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 w-60 rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 shadow-2xl">
                      <div className="p-2">
                        {item.dropdownItems.map((drop: any, j: number) => {
  // Use the relationship field 'page' you created
  const page = drop.page;
  
  // Resolve the URL safely
  // If 'page' is populated (depth 2), use breadcrumbs or slug
  const url = page?.fullPath ? `/${page.fullPath}` : `/${page?.slug || ''}`;

  return (
    <Link
      key={j}
      href={url} // Now this will be a valid string
      className="block rounded-lg px-4 py-3 text-sm text-neutral-400 hover:bg-white/5 hover:text-white transition-colors"
    >
      {drop.label}
    </Link>
  )
})}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/login"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Log In
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 flex items-center justify-center w-10 h-10 text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 7h16M4 12h16M4 17h16'
                }
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 ${
          isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col py-4">
          {navItems.map((item: any, i: number) => {
            const linkUrl =
              item.link?.type === 'custom'
                ? item.link.url
                : `/${item.link?.reference?.value?.slug || ''}`

            return (
              <div key={i}>
                <Link
                  href={linkUrl}
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-4 text-base font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item.link?.label}
                </Link>

{item.dropdownItems?.map((drop: any, j: number) => {
  const page = drop.page;
  const url = page?.fullPath ? `/${page.fullPath}` : `/${page?.slug || ''}`;

  return (
    <Link
      key={j}
      href={url} // FIXED: Now uses the resolved string
      onClick={() => setIsOpen(false)}
      className="block pl-10 pr-6 py-3 text-sm text-neutral-500 hover:text-white hover:bg-white/5 transition-colors"
    >
      {drop.label}
    </Link>
  )
})}
              </div>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-6 flex flex-col gap-3">
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="w-full text-center rounded-full border border-white/10 py-3 text-sm font-medium text-white"
          >
            Log In
          </Link>

          <Link
            href="/register"
            onClick={() => setIsOpen(false)}
            className="w-full text-center rounded-full bg-white py-3 text-sm font-medium text-black"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
