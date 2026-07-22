import { defineField, defineType } from 'sanity'

// Keep in sync with SERVICES titles in lib/services-data.ts — services rarely change,
// so this list is maintained by hand rather than fetched dynamically.
const SERVICE_TITLES = [
  'Radio & TV Commercials',
  'Corporate Narration',
  'Documentaries',
  'E-Learning',
  'Social Media Promos',
  'Podcast Intros & Outros',
  'Audio-Visual Production',
  'Audio-Book Narration',
]

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio Items',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the project, e.g. "Bethany Delights Social Media Promo".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service category',
      type: 'string',
      description: 'Which service this piece of work belongs to.',
      options: { list: SERVICE_TITLES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Video or audio?',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'Audio', value: 'audio' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'driveLink',
      title: 'Google Drive link',
      type: 'url',
      description:
        'Paste the full "Share" link from Google Drive here. Important: the file must be shared as "Anyone with the link can view", or it will not play on the site.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'service' },
  },
})
