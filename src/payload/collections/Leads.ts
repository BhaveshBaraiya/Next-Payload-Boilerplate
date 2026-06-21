import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  access: {
    // SECURITY: Anyone on the internet can create a lead (submit a form)
    create: () => true,
    // SECURITY: Only logged-in admins can read, update, or delete the leads
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'The page URL where this form was submitted from.',
        readOnly: true, // Prevents admins from accidentally changing it
      },
    },
  ],
}