import type { Block } from 'payload'

export const LastestNews: Block = {
  slug: 'lastestNews',
  interfaceName: 'LastestNews',
  fields: [
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
      ],
      defaultValue: 'light',
    },
    {
      name: 'sectionHeading',
      type: 'text',
      localized: true,
    },
  ],
}
