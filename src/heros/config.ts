import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Flowbite',
          value: 'flowbite',
        },
        {
          label: 'Porto',
          value: 'porto',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        condition: (_, { type } = {}) => !['highImpact'].includes(type),
      },
      label: false,
      localized: true,
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
      required: true,
      localized: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        localized: true,
        admin: {
          condition: (_, { type } = {}) => !['porto'].includes(type),
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'flowbite', 'porto'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mediaText',
      type: 'textarea',
      admin: {
        condition: (_, { type } = {}) => ['porto'].includes(type),
      },
      localized: true,
    },
    {
      name: 'servicesSlider',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => ['porto'].includes(type),
      },
      fields: [
        {
          name: 'sliderHeading',
          type: 'text',
          label: 'Slider Heading',
          localized: true,
        },
        {
          name: 'servicesList',
          type: 'array',
          label: 'Services List',
          fields: [
            {
              name: 'serviceTitle',
              type: 'text',
              label: 'Service Title',
              localized: true,
            },
            {
              name: 'serviceDescription',
              type: 'textarea',
              label: 'Service Description',
              localized: true,
            },
            {
              name: 'serviceIcon',
              type: 'upload',
              label: 'Service Icon',
              relationTo: 'media',
            },
            {
              name: 'serviceLink',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'slug',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  label: false,
}
