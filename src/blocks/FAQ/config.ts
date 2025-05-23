import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const questionFields: Field[] = [
  {
    name: 'question',
    type: 'text',
    required: true,
    localized: true,
  },
  {
    name: 'answer',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
    localized: true,
  },
]

export const Faq: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
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
      name: 'questions',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: questionFields,
    },
  ],
}
