'use client' // This is required because forms need user interaction (typing, submitting)

import React, { useState } from 'react'
import { submitLead } from './action'

type ContactBlockProps = {
  heading: string
  subtext?: string
}

export function ContactBlock({ heading, subtext }: ContactBlockProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // The client-side form handler
  async function action(formData: FormData) {
    setStatus('loading')
    
    // Add the current page URL so you know where the lead came from
    formData.append('source', window.location.pathname)
    
    const result = await submitLead(formData)
    
    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="py-24 bg-slate-50 text-center">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h3>
        <p className="text-slate-600">Thank you for reaching out. We will be in touch soon.</p>
      </section>
    )
  }

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{heading}</h2>
          {subtext && <p className="text-lg text-slate-600">{subtext}</p>}
        </div>

        <form action={action} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900" />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
            <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900"></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="text-red-500 text-center mt-4 text-sm font-medium">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  )
}