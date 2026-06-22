import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true, 
  },
  admin: {
    group: 'SYSTEM',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Links',
      maxRows: 6, 
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
            {
              name: 'reference',
              label: 'Page to link to',
              type: 'relationship',
              relationTo: ['pages'],              
              admin: { condition: (_, siblingData) => siblingData?.type === 'reference' },
            },
            {
              name: 'url',
              label: 'Custom URL',
              type: 'text',
              required: true,
              admin: { condition: (_, siblingData) => siblingData?.type === 'custom' },
            },
          ],
        },        
        {
          name: 'dropdownItems',
          type: 'array',
          label: 'Dropdown Sub-links (Optional)',
          fields: [
            { name: 'label', type: 'text', required: true },    
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}