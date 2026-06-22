import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'email',
    group: 'WEB',
    defaultColumns: ['name', 'email', 'assignedClient', 'createdAt'],
  },
  access: {    
    create: () => true,     
    read: ({ req: { user } }) => {      
      if (!user) return false       
      if (user.role === 'admin') return true 
      
      return {
        assignedClient: {
          equals: user.id,
        },
      }
    },
        
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'source', type: 'text', admin: { readOnly: true } },      
    {
      name: 'assignedClient',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Assign this lead to a client so they can view it in their portal.',
      },      
      filterOptions: {
        role: { equals: 'client' }, 
      },
    },
  ],
}