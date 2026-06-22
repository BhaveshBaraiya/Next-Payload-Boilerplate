import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-neutral-200 px-6 relative overflow-hidden">
      
      {/* Subtle Background Glow for Cosmic Vibe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl text-center flex flex-col items-center space-y-8 relative z-10">
        
        {/* The Impactful Minimalist Header */}
        <h1 className="text-[8rem] md:text-[12rem] font-bold tracking-tighter text-white leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600">
          404
        </h1>
        
        <div className="space-y-4">
          {/* The Subtitle */}
          <h2 className="text-xl md:text-3xl font-light tracking-widest uppercase text-neutral-300">
            Lost in the Void
          </h2>
          
          {/* The Description */}
          <p className="text-neutral-500 font-light max-w-md mx-auto text-sm md:text-base leading-relaxed">
            The page you are looking for has been pulled beyond the event horizon. It may have been moved, deleted, or never existed.
          </p>
        </div>
        
        {/* The Return Button */}
        <div className="pt-8">
          <Link 
            href="/" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs md:text-sm uppercase tracking-widest text-neutral-300 border border-neutral-800 hover:border-neutral-500 transition-all duration-500 bg-neutral-900/50 hover:bg-neutral-800 backdrop-blur-sm"
          >
            <span>Return</span>
            <svg 
              className="w-4 h-4 ml-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        
      </div>
    </main>
  )
}