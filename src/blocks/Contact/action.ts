'use server' // This guarantees this code ONLY runs on the Node server, never in the browser

import { getPayload } from 'payload'
import configPromise from '../../payload.config'

export async function submitLead(formData: FormData) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Extract the raw string data from the HTML form
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      source: formData.get('source') as string,
    }

    // Insert the data into PostgreSQL
    await payload.create({
      collection: 'leads',
      data,
    })

    return { success: true }
  } catch (error) {
    console.error('Lead submission failed:', error)
    return { success: false }
  }
}