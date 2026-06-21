import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  // Setting auth to true automatically adds email/password fields
  // and handles JWT generation, password resets, etc.
  auth: true, 
  fields: [
    // We can add custom fields to the user here later (e.g., 'role', 'name')
  ],
}