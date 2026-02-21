import type { Block } from 'payload'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ProjectsFeaturedBlock: Block = {
  slug: 'featuredProject',
  interfaceName: 'ProjectsFeaturedBlock',
  labels: {
    singular: 'Featured Project',
    plural: 'Featured Projects',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Project Image',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Project Logo',
      required: true,
    },
    {
      name: 'sectionHeading',
      type: 'richText',
      // type: 'text',
      label: 'Project Heading',
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
    link({
      overrides: {
        name: 'link',
        label: 'Link to Projects',
        required: true,
      },
    }),
  ],
}
