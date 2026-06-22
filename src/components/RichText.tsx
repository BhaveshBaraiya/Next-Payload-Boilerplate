import React from 'react'
import Image from 'next/image'
import { RichText as LexicalRichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

// 1. Define the nodes
type NodeTypes = DefaultNodeTypes

// 2. Build the custom converters for "unknown" nodes
const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  
  // Intercept the 'upload' node (which Payload uses for Images)
  upload: ({ node }) => {
    if (node.relationTo === 'media') {
      const uploadDoc = node.value
      
      // Safety check: ensure the image actually exists
      if (typeof uploadDoc !== 'object' || !uploadDoc?.url) {
        return null
      }
      
      // The Premium Agency Image Style
      return (
        <div className="my-10 w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
          <Image 
            src={uploadDoc.url} 
            alt={uploadDoc.alt || 'T3Universe Media'} 
            width={uploadDoc.width || 1200} 
            height={uploadDoc.height || 800} 
            className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105" 
          />
        </div>
      )
    }
    return null
  },
})

// 3. Export the Master Component
export const RichText: React.FC<{ data: SerializedEditorState; className?: string }> = ({ data, className }) => {
  if (!data) return null

  return (
    <div className={`prose prose-invert max-w-none ${className || ''}`}>
      <LexicalRichText data={data} converters={jsxConverters} />
    </div>
  )
}