import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true, 
  },
  admin: {
    // SECURED: Hides the Footer settings from non-admins
    hidden: ({ user }) => user?.role !== 'admin',
  },
  fields: [
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2026 T3Universe.de. All rights reserved.',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Footer Navigation',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'E.g., /privacy-policy or https://google.com',
          },
        },
      ],
    },
  ],
}