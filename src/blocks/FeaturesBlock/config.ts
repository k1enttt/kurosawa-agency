import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const columnFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    localized: true,
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
  },
]

export const FeaturesBlock: Block = {
  slug: 'featuresBlock',
  interfaceName: 'FeaturesBlock',
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
      name: 'yearsInBusiness',
      type: 'number',
    },
    {
      name: 'paragraphSmall',
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
      label: 'Small Paragraph',
      localized: true,
    },
    {
      name: 'paragraphLarge',
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
      label: 'Large Paragraph',
      localized: true,
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
      maxRows: 3,
    },
  ],
}
