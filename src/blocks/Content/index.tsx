import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { AgencyImage } from '../../components/AgencyImage'

export function ContentBlock({ body }: { body: any }) {
  if (!body || !body.root) return null

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="prose prose-lg prose-slate mx-auto">
          <RichText 
            data={body} 
            converters={({ defaultConverters }) => ({
              ...defaultConverters,            
              upload: ({ node }) => {                
                if (node.relationTo === 'media') {
                  return (
                    <AgencyImage 
                      image={node.value} 
                      className="rounded-2xl shadow-xl my-8 w-full object-cover" 
                    />
                  )
                }
                return null
              },
            })}
          />
        </div>
      </div>
    </section>
  )
}