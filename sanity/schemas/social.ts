import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'social',
  type: 'document',
  title: 'Social',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Platform for social media',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'url',
    }),
  ],
})
