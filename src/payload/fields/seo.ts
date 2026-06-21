import type { Field } from 'payload'

export const seoFields: Field = {
  name: 'meta', // This dictates the JSON key in the database
  label: 'SEO & Metadata',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Meta Title',
      admin: {
        description: 'Recommended length: 50-60 characters.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta Description',
      admin: {
        description: 'Recommended length: 150-160 characters.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Reusing our Media collection!
      label: 'Open Graph Image',
      admin: {
        description: 'Image for social sharing (1200x630px recommended).',
      },
    },
    {
      name: 'keywords',
      type: 'text',
      label: 'Keywords',
      admin: {
        description: 'Comma separated keywords (e.g., agency, web development, react).',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'Hide from Search Engines (NoIndex)',
      defaultValue: false,
      admin: {
        position: 'sidebar', // Moves this specific field to the right-hand sidebar in the UI
      },
    },
  ],
}