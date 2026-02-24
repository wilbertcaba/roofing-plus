import type { Block } from 'payload'

import { link } from '@/fields/link'

export const ProductsFeaturedBlock: Block = {
  slug: 'productsFeatured',
  interfaceName: 'ProductsFeaturedBlock',
  labels: {
    singular: 'Products Featured Block',
    plural: 'Products Featured Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: true,
      defaultValue: 'Productos Populares',
    },
    link({
      appearances: false,
      overrides: {
        name: 'ctaLink',
        label: 'Section CTA Link',
        required: true,
      },
    }),
    {
      name: 'limit',
      type: 'number',
      label: 'Products Limit',
      defaultValue: 6,
      min: 1,
      max: 12,
      required: false,
      admin: {
        description: 'Maximum number of featured products to display in this carousel.',
      },
    },
  ],
}
