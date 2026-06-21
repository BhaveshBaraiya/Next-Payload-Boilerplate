import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  // Access control: Anyone visiting the site must be able to view images,
  // but only admins can upload or delete them.
  access: {
    read: () => true,
  },
  // Enabling 'upload' transforms this from a standard data table into a file manager
  upload: true, 
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'SEO Alternative Text',
      admin: {
        description: 'Describe the image for search engines and screen readers.',
      },
    },
  ],
}