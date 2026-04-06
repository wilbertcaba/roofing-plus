import type { Block } from 'payload'

export const ProductsArchiveBlock: Block = {
  slug: 'productsArchive',
  interfaceName: 'ProductsArchiveBlock',
  labels: {
    singular: 'Products Archive Block',
    plural: 'Products Archive Blocks',
  },
  fields: [
    {
      name: 'itemsPerPage',
      type: 'number',
      label: 'Items Per Page',
      defaultValue: 9,
      min: 1,
      max: 24,
      required: true,
      admin: {
        description:
          'Number of products per page. Load more button is hidden when total products ≤ this value.',
      },
    },
  ],
}
