import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'assignedClient', 'createdAt'],
  },
  access: {
    // 1. PUBLIC: Anyone on the internet can submit a form
    create: () => true, 
    
    // 2. READ SECURITY: 
    read: ({ req: { user } }) => {
      // If no user is logged in, block access
      if (!user) return false 
      
      // If the user is an Agency Admin, they can see EVERY lead
      if (user.role === 'admin') return true 
      
      // If the user is a Client, ONLY return leads assigned to their specific User ID
      return {
        assignedClient: {
          equals: user.id,
        },
      }
    },
    
    // 3. EDIT SECURITY: Only Admins can delete or edit leads
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'source', type: 'text', admin: { readOnly: true } },
    
    // THE CONNECTION POINT: Link the lead to a specific client
    {
      name: 'assignedClient',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Assign this lead to a client so they can view it in their portal.',
      },
      // Ensure we can only assign leads to users who are marked as clients
      filterOptions: {
        role: { equals: 'client' }, 
      },
    },
  ],
}