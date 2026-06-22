import type { CollectionConfig } from 'payload'
import { seoFields } from '../fields/seo'
import { Hero } from '../blocks/Hero'
import { Content } from '../blocks/Content'
import { Contact } from '../blocks/Contact'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    // REMOVED the 'hidden' rule so clients can see the Pages tab
    preview: (doc) => {
      if (!doc?.slug) return null
      const url = doc.slug === 'home' ? '/' : `/${doc.slug}`
      return `http://localhost:3000/api/draft?url=${url}&slug=${doc.slug}&secret=${process.env.PAYLOAD_SECRET}`
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    // Anyone on the internet can read published pages
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    // ALLOW logged-in clients to create, edit, and delete pages
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
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