import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'client',
  title: 'Clients',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      description: 'The client\'s full business name.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Display name',
      type: 'string',
      description: 'The name shown next to the logo on the site (can be the same as the full name).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'The client\'s logo. Square or roughly-square images work best.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
})
