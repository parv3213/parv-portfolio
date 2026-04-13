import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title of the achievement (e.g., Patent, Publication)',
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
      name: 'description',
      title: 'Description',
      description: 'Summary of the achievement',
      type: 'text',
    }),
    defineField({
      name: 'linkToAsset',
      title: 'Link to Asset',
      description: 'URL to the patent, publication, or proof',
      type: 'url',
    }),
  ],
})
