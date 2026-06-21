import type { Block } from 'payload'

export const Contact: Block = {
  slug: 'contact',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Get in Touch',
      required: true,
    },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue: 'Fill out the form below and our team will get back to you shortly.',
    },
  ],
}