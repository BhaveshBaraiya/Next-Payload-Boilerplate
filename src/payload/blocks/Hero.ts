import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero', // The internal identifier passed to Next.js
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Main Headline',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading Text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Reusing our enterprise media collection
      required: true,
      label: 'Background / Feature Image',
    },
  ],
}