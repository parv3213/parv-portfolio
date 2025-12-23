import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'skill',
  type: 'document',
  title: 'Skill',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title of the Skill',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'progress',
      title: 'Progress',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
  ],
})
