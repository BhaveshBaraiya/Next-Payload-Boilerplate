import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white px-6">
      <div className="max-w-2xl text-center flex flex-col items-center space-y-8">
        {/* The Impactful Minimalist Header */}
        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-neutral-100">
          404
        </h1>
        
        {/* The Subtitle */}
        <h2 className="text-xl md:text-2xl font-light tracking-widest uppercase text-neutral-400">
          Lost in the Void
        </h2>
        
        {/* The Description */}
        <p className="text-neutral-500 font-light max-w-md text-sm md:text-base leading-relaxed">
          It looks like the page you are looking for has been pulled beyond the event horizon. The URL might be incorrect, or the page no longer exists.
        </p>
        
        {/* The Return Button */}
        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-block border border-neutral-700 px-8 py-4 text-xs md:text-sm uppercase tracking-widest text-neutral-300 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            Return to Base
          </Link>
        </div>
      </div>
    </main>
  )
}