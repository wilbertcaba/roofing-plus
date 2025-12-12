import type { Block } from 'payload'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ServicesBlock: Block = {
  slug: 'services',
  interfaceName: 'ServicesBlock',
  labels: {
    singular: 'Services Block',
    plural: 'Services Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: false,
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Section Subheading',
      required: false,
    },
    {
      name: 'offset',
      type: 'checkbox',
      label: 'Offset',
      required: false,
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      maxRows: 3,
      fields: [
        {
          name: 'serviceTitle',
          type: 'richText',
          label: 'Service Title',
          required: false,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Service Description',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Service Icon',
          required: true,
        },
        link({
          overrides: {
            name: 'link',
            label: 'Service Page Link',
            required: true,
          },
        }),
      ],
    },
  ],
}
