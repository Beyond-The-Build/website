import { defineArrayMember, defineField, defineType } from 'sanity'
import { RiSpeakFill } from 'react-icons/ri'

export default defineType({
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  icon: RiSpeakFill,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      }),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      }),
    }),
    defineField({
      name: 'bluesky',
      title: 'Bluesky',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      }),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      }),
    }),
  ],
})