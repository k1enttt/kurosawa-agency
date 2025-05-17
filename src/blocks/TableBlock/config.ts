import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  IndentFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const columnFields: Field[] = [
  {
    name: 'headerText',
    type: 'text',
    localized: true,
  },
  {
    name: 'valueText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature(), IndentFeature()]
      },
    }),
  },
]

export const TableBlock: Block = {
  slug: 'tableBlock',
  interfaceName: 'TableBlock',
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
      name: 'hasHeader',
      label: 'Is this table has header?',
      type: 'select',
      options: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
      defaultValue: 'no',
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
