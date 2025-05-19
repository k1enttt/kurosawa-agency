import type { Block, Field } from 'payload'

const addressFields: Field[] = [
  {
    name: 'googleMapsEmbedHtml',
    type: 'text',
  },
  {
    name: 'heading',
    type: 'text',
    localized: true,
  },
  {
    name: 'officeAddress',
    type: 'text',
    localized: true,
  },
  {
    name: 'phone',
    type: 'text',
  },
  {
    name: 'email',
    type: 'email',
  },
]

export const Address: Block = {
  slug: 'address',
  interfaceName: 'addressBlock',
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
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'addresses',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: addressFields,
    },
  ],
}
