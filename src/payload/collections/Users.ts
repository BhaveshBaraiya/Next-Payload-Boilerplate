import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, 
  admin: {
    useAsTitle: 'email',
    // SECURED: Hides the Users tab from the sidebar for non-admins
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    // SECURED: API restriction so clients can only read their own user profile
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { id: { equals: user?.id } }
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Agency Admin', value: 'admin' },
        { label: 'Content Editor (Beta)', value: 'editor' }, // <-- NEW TIER
        { label: 'View-Only Client', value: 'client' },
      ],
      defaultValue: 'client',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Client Company Name',
      admin: {
        condition: (data) => data.role === 'client', 
      },
    },
  ],
}