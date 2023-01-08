export default {
  name: 'skill',
  type: 'document',
  title: 'Skill',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'Title of the Skill',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'progress',
      title: 'Progress',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(100),
    },
  ],
}
