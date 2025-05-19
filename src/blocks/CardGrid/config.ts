import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

const cardFields: Field[] = [
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'title',
    type: 'text',
    required: true,
    localized: true,
  },
  {
    name: 'description',
    type: 'textarea',
    localized: true,
  },
  link({
    disableLabel: true,
    appearances: ['default'],
  }),
]

export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      localized: true,
    },
    {
      name: 'cards',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: cardFields,
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        { name: 'media', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text', localized: true },
      ],
      maxRows: 6,
    },
  ],
}
