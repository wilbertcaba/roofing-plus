import type { Block } from 'payload'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const WhyChooseUsBlock: Block = {
  slug: 'whyChooseUs',
  interfaceName: 'WhyChooseUsBlock',
  labels: {
    singular: 'Why Choose Us Block',
    plural: 'Why Choose Us Blocks',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'richText',
      label: 'Section Title',
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
      name: 'stats',
      type: 'array',
      label: 'Stats',
      minRows: 3,
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'heading',
          type: 'richText',
          label: 'Heading to display the number',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Description to display text',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: 'subjectImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Subject Image',
      required: true,
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
        name: 'ctaLink',
        label: 'Call To Action / Button',
        required: true,
      },
    }),
  ],
}
