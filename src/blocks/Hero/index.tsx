import Image from 'next/image'
import React from 'react'

export const HeroBlock = ({ headline, subheading, image }: any) => {  
  const isPopulated = typeof image === 'object' && image !== null && 'url' in image
  
  const imageUrl = isPopulated ? image.url : ''
  const imageAlt = isPopulated ? (image.alt || 'Hero Background') : 'Hero Background'

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#050505] text-white">      
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="absolute inset-0 z-0 object-cover opacity-40 mix-blend-luminosity"
          priority
        />
      )}
      
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center px-6">
        <h1 className="mb-6 text-5xl font-bold tracking-tighter md:text-7xl">
          {headline}
        </h1>
        {subheading && (
          <p className="mb-8 text-lg font-light text-neutral-400 md:text-xl tracking-wide max-w-2xl">
            {subheading}
          </p>
        )}
      </div>
    </section>
  )
}