import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brand',
      type: 'group',
      label: 'Brand Identity',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
          label: 'Website Name',
          admin: {
            description: 'Used for SEO titles and general branding.',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media', // This links directly to our Media collection!
          required: true,
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'github',
          type: 'text',
          label: 'GitHub URL',
        },
      ],
    },
  ],
}