// scripts/update-fullPaths.ts
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function updateFullPaths() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    console.log('Fetching all pages...')
    
    const pages = await payload.find({
      collection: 'pages',
      limit: 1000,
      depth: 1, // Include parent relationship
    })

    console.log(`Found ${pages.docs.length} pages to update`)

    for (const page of pages.docs) {
      let fullPath = page.slug
      
      if (page.parent) {
        const parentId = typeof page.parent === 'object' ? page.parent.id : page.parent
        
        try {
          const parent = await payload.findByID({
            collection: 'pages',
            id: parentId,
          })
          
          if (parent) {
            const parentPath = parent.fullPath || parent.slug
            fullPath = `${parentPath}/${page.slug}`
          }
        } catch (error) {
          console.warn(`Could not find parent for page: ${page.title}`, error)
        }
      }
      
      // Only update if fullPath is different or not set
      if (!page.fullPath || page.fullPath !== fullPath) {
        try {
          await payload.update({
            collection: 'pages',
            id: page.id,
            data: {
              fullPath,
            },
          })
          
          console.log(`✅ Updated: "${page.title}" -> ${fullPath}`)
        } catch (error) {
          console.error(`❌ Failed to update: "${page.title}"`, error)
        }
      } else {
        console.log(`⏭️  Skipped: "${page.title}" (already correct)`)
      }
    }
    
    console.log('✨ All pages updated successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

updateFullPaths()