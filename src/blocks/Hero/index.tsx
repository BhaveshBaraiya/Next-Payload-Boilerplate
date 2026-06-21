import Image from 'next/image'

// In a real project, we would use the generated payload-types.ts here, 
// but we will use 'any' temporarily while learning the pattern.
export const HeroBlock = ({ headline, subheading, image }: any) => {
  // Safely extract the image URL and Alt text
  const imageUrl = image?.url || ''
  const imageAlt = image?.alt || 'Hero Background'

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-900 text-white">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="absolute inset-0 z-0 object-cover opacity-40"
          priority // Tells Next.js to preload this image for LCP (Largest Contentful Paint) optimization
        />
      )}
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center px-6">
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">{headline}</h1>
        {subheading && <p className="mb-8 text-lg text-slate-300 md:text-xl">{subheading}</p>}
      </div>
    </section>
  )
}