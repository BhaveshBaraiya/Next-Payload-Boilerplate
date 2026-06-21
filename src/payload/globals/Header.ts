import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true, // Publicly readable by the frontend
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Links',
      maxRows: 6, // Keep the UI clean, don't let clients add 50 links to a header
      fields: [
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'radio',
              options: [
                { label: 'Internal Page', value: 'reference' },
                { label: 'Custom URL', value: 'custom' },
              ],
              defaultValue: 'reference',
              admin: { layout: 'horizontal' },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            // Show this field ONLY if they choose "Internal Page"
            {
              name: 'reference',
              label: 'Page to link to',
              type: 'relationship',
              relationTo: ['pages'],
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            // Show this field ONLY if they choose "Custom URL"
            {
              name: 'url',
              label: 'Custom URL',
              type: 'text',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
            },
          ],
        },
      ],
    },
  ],
}