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
      name: 'category',
      title: 'Category',
      description: 'Category of the Skill (e.g. Frontend, Backend, Web3, Database, Tools)',
      type: 'string',
      options: {
        list: [
          {title: 'Frontend', value: 'Frontend'},
          {title: 'Backend', value: 'Backend'},
          {title: 'Web3', value: 'Web3'},
          {title: 'Database', value: 'Database'},
          {title: 'Tools', value: 'Tools'},
          {title: 'Other', value: 'Other'},
        ],
      },
    }),
  ],
})
