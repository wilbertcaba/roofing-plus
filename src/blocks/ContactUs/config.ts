import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const ContactUsBlock: Block = {
  slug: 'contactUs',
  interfaceName: 'ContactUsBlock',
  labels: {
    singular: 'Contact Us Block',
    plural: 'Contact Us Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      label: 'Heading',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'subheading',
      type: 'richText',
      label: 'Subheading',
      required: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
    link({
      overrides: {
        name: 'link',
        label: 'Link',
        required: true,
      },
    }),
  ],
}
