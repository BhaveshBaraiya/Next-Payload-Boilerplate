import type { Block } from 'payload'
import {
  lexicalEditor,
  AlignFeature,
  HeadingFeature,
  OrderedListFeature,
  UnorderedListFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  UploadFeature,
  FixedToolbarFeature, // <-- 1. Import the fixed toolbar
} from '@payloadcms/richtext-lexical'

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Rich Text Content',
    plural: 'Rich Text Content Blocks',
  },
  fields: [
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Body Content',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures, 
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          AlignFeature(), 
          OrderedListFeature(), 
          UnorderedListFeature(), 
          BlockquoteFeature(), 
          HorizontalRuleFeature(), 
          UploadFeature(), 
          FixedToolbarFeature(), // <-- 2. Lock the TYPO3-style toolbar to the top of the editor
        ],
      }),
    },
  ],
}