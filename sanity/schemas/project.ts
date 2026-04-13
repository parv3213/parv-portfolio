import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title of the Project',
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
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'reference', to: {type: 'skill'}}],
    }),
    defineField({
      name: 'architectureDetails',
      title: 'Architecture Details',
      description: 'Discuss system design, smart contract architecture, and data flows',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'challengesAndTradeoffs',
      title: 'Challenges and Trade-offs',
      description: 'Highlight edge cases, security audits, and engineering decisions',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'linkToBuild',
      title: 'Link to Live Preview',
      type: 'url',
    }),
    defineField({
      name: 'linkToGithub',
      title: 'Link to GitHub',
      type: 'url',
    }),
    defineField({
      name: 'impactRank',
      title: 'Impact Rank',
      description: 'Higher number means higher impact (shows up first)',
      type: 'number',
    }),
  ],
})
