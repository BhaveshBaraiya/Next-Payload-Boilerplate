import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true, 
  },
  admin: {
    group: 'SYSTEM',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  fields: [
    {
      name: 'brandMessage',
      type: 'textarea',
      label: 'Short Brand Message',
      defaultValue: 'Pioneering digital experiences',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Footer Navigation',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        { name: 'platform', type: 'text', required: true, admin: { description: 'e.g., LinkedIn, Twitter' } },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2026 NextPayload All rights reserved.',
    },
  ],
}