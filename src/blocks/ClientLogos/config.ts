import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ClientLogosBlock: Block = {
  slug: 'clientLogos',
  interfaceName: 'ClientLogosBlock',
  labels: {
    singular: 'Client Logos',
    plural: 'Client Logos',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Section Heading',
      required: true,
    },
    {
      name: 'logos',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          required: true,
        },
      ],
    },
  ],
}
