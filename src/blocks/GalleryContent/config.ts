import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const GalleryContent: Block = {
  slug: 'galleryContent',
  interfaceName: 'GalleryContentBlock',
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
      name: 'introText',
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
      name: 'contentCards',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        { name: 'media', type: 'upload', relationTo: 'media' },
        { name: 'heading', type: 'text' },
        { name: 'subheading', type: 'text' },
      ],
      maxRows: 6,
    },
  ],
}
