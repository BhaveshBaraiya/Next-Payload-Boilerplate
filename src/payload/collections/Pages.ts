// payload/collections/Pages.ts
import type { CollectionConfig } from 'payload'
import { seoFields } from '../fields/seo'
import { Hero } from '../blocks/Hero'
import { Content } from '../blocks/Content'
import { Contact } from '../blocks/Contact'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'WEB',
    defaultColumns: ['title', 'fullPath', 'updatedAt'],
    preview: (doc) => {
      if (!doc?.slug) return null
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      const path = doc.fullPath || doc.slug
      const url = path === 'home' ? '/' : `/${path}`
      return `${baseUrl}/api/draft?url=${url}&slug=${doc.slug}&secret=${process.env.PAYLOAD_SECRET}`
    },
  },
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
      admin: { position: 'sidebar' },
      hooks: {
        beforeChange: [
          ({ data, operation }) => {            
            if (operation === 'create' && data && !data.slug && data.title) {
              return data.title.toLowerCase().replace(/ /g, '-');
            }            
            return data?.slug || ''; 
          }
        ]
      }
    },
    {
      name: 'parent',
      label: 'Parent Page',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'fullPath',
      type: 'text',
      admin: { 
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            // 1. Safety Guard: If data doesn't exist, exit gracefully
            if (!data) return;

            // 2. Access slug safely
            const slug = data.slug;
            if (!slug) return;

            let fullPath = slug;

            // 3. Build path safely
            if (data.parent) {
              const parentId = typeof data.parent === 'object' ? data.parent.id : data.parent;
              
              try {
                const parent = await req.payload.findByID({
                  collection: 'pages',
                  id: parentId,
                  depth: 0, // Depth 0 is faster as we only need the slug/fullPath
                });

                if (parent && (parent as any).fullPath) {
                  fullPath = `${(parent as any).fullPath}/${slug}`;
                } else if (parent && (parent as any).slug) {
                  fullPath = `${(parent as any).slug}/${slug}`;
                }
              } catch (err) {
                console.error("Error building fullPath:", err);
              }
            }

            return fullPath;
          }
        ]
      }
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