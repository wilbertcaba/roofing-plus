import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  BlocksFeature,
  ChecklistFeature,
} from '@payloadcms/richtext-lexical'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from '@/fields/slug'
import { MediaBlock } from '@/blocks/MediaBlock/config'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['productName', 'productCategory', 'featuredProduct', 'updatedAt'],
    useAsTitle: 'productName',
  },
  defaultPopulate: {
    productName: true,
    productImage: true,
    productCategory: true,
    featuredProduct: true,
    colors: true,
  },
  fields: [
    {
      name: 'featuredProduct',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Product',
      admin: {
        description: 'When enabled, this product appears in the Productos Populares carousel.',
      },
    },
    {
      name: 'productImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Product Image',
    },
    {
      name: 'productCategory',
      type: 'relationship',
      relationTo: 'productCategories',
      required: true,
      label: 'Product Category',
    },
    {
      name: 'productName',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Description',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
          ParagraphFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          BlockquoteFeature(),
          HorizontalRuleFeature(),
          BlocksFeature({ blocks: [MediaBlock] }),
          ChecklistFeature(),
        ],
      }),
    },
    {
      name: 'colors',
      type: 'array',
      required: false,
      label: 'Colors',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Color Name',
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Color Thumbnail',
        },
      ],
    },
    ...slugField(),
  ],
}
