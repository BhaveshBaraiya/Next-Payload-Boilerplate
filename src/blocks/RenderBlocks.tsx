import React from 'react'
import { HeroBlock } from './Hero'
import { ContentBlock } from './Content'
import { ContactBlock } from './Contact'
import { BlockBoundary } from '../components/BlockBoundary'

// 2. Map the CMS slug to the React Component
const blockComponents = {
  hero: HeroBlock,
  content: ContentBlock, 
  contact: ContactBlock,
}

export const RenderBlocks: React.FC<{ layout: any[] }> = ({ layout }) => {
  if (!layout || layout.length === 0) return null

  return (
    <React.Fragment>      
{layout.map((block, index) => {
  const Block = blockComponents[block.blockType as keyof typeof blockComponents]
  
  if (!Block) return null

  return (
    <BlockBoundary key={index} title={block.blockType}>
      <Block {...block} />
    </BlockBoundary>
  )
})}
    </React.Fragment>
  )
}