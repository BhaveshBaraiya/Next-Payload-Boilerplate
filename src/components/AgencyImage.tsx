import React from 'react'
import Image from 'next/image'

export function AgencyImage({ image, className }: { image: any, className?: string }) {
  // If the image is just a string, it's a URL (external)
  if (typeof image === 'string') {
    return <img src={image} className={className} alt="Image" />
  }

  // If the image is a Payload Media object, use Next.js optimized Image
  return (
    <Image
      src={image.url}
      alt={image.alt || 'Agency Media'}
      width={image.width || 800}
      height={image.height || 600}
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}