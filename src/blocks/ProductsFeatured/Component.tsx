import React from 'react'
import { getPayload } from 'payload'

import { CMSLink } from '@/components/Link'
import configPromise from '@payload-config'
import type { Product, ProductsFeaturedBlock as ProductsFeaturedBlockType } from '@/payload-types'

import { ProductsFeaturedCarousel } from './Carousel'

export const ProductsFeaturedBlock: React.FC<ProductsFeaturedBlockType> = async ({
  heading,
  ctaLink,
  limit: limitFromProps,
}) => {
  const payload = await getPayload({ config: configPromise })
  const limit = limitFromProps || 6

  const featuredProducts = await payload.find({
    collection: 'products',
    depth: 2,
    limit,
    where: {
      featuredProduct: {
        equals: true,
      },
    },
  })

  const products = featuredProducts.docs as Product[]

  if (!products.length) {
    return null
  }

  return (
    <div className="overflow-hidden bg-gray-50 pt-10 pb-12 md:pt-16 md:pb-20">
      <div className="!container mb-8 md:mb-16 flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between prose md:prose-md light:prose-invert lg:prose-lg xl:prose-xl">
        {heading && <h2 className="!mb-0">{heading}</h2>}
        {ctaLink && (
          <CMSLink {...ctaLink} appearance="inline" className="font-semibold text-primary" />
        )}
      </div>

      <div className="container overflow-visible pl-0">
        <ProductsFeaturedCarousel products={products} />
      </div>
    </div>
  )
}
