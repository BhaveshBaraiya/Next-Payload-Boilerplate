import React from 'react'
import './styles.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer' // <-- 1. Import the Footer
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | T3Universe.de',
    default: 'NextPayloadBoilerplate | Premium Web Engineering',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white antialiased min-h-screen flex flex-col">
        
        <Header />
        
        {/* The 'grow' class ensures the main content pushes the footer to the absolute bottom of the screen */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer /> {/* <-- 2. Mount the Footer */}
        
      </body>
    </html>
  )
}