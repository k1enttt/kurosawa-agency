import type { Block } from 'payload'

export const CustomerBlock: Block = {
  slug: 'customerBlock',
  interfaceName: 'CustomerBlock',
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
      name: 'sectionLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'customer1',
      label: 'Customer 1',
      type: 'group',
      fields: [
        {
          name: 'textLarge',
          type: 'text',
        },
        {
          name: 'textSmall',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'customer2',
      label: 'Customer 2',
      type: 'group',
      fields: [
        {
          name: 'textLarge',
          type: 'text',
        },
        {
          name: 'textSmall',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'customer3',
      label: 'Customer 3',
      type: 'group',
      fields: [
        {
          name: 'textLarge',
          type: 'text',
        },
        {
          name: 'textSmall',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
