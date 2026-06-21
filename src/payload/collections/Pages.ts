import type { CollectionConfig } from 'payload'
import { seoFields } from '../fields/seo'
import { Hero } from '../blocks/Hero'
import { Content } from '../blocks/Content'
import { Contact } from '../blocks/Contact'

export const Pages: CollectionConfig = {
  slug: 'pages',
  // IT MUST BE INSIDE THIS ADMIN BLOCK
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    
    preview: (doc) => {
    if (!doc?.slug) return null
    const url = doc.slug === 'home' ? '/' : `/${doc.slug}` // Changed 'index' to 'home'
    return `http://localhost:3000/api/draft?url=${url}&slug=${doc.slug}&secret=${process.env.PAYLOAD_SECRET}`
    },
  },
  // NOT DOWN HERE
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout Builder',
      blocks: [
        Hero,
        Content,
        Contact,
      ],
    },
    seoFields,
  ],
}