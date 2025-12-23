import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageInfo',
  type: 'document',
  title: 'PageInfo',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'backgroundInformation',
      type: 'string',
      title: 'BackgroundInformation',
    }),
    defineField({
      name: 'profilePic',
      type: 'image',
      title: 'ProfilePic',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [{type: 'reference', to: {type: 'social'}}],
    }),
  ],
})
