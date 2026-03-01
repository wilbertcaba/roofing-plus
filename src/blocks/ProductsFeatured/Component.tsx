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
  products: selectedProductsFromProps,
}) => {
  const payload = await getPayload({ config: configPromise })
  const limit = limitFromProps || 6

  const selectedProductIDs = (selectedProductsFromProps || [])
    .map((selectedProduct) => {
      if (typeof selectedProduct === 'number') {
        return selectedProduct
      }

      return selectedProduct?.id
    })
    .filter((id): id is number => typeof id === 'number')

  if (!selectedProductIDs.length) {
    return null
  }

  const selectedProducts = await payload.find({
    collection: 'products',
    depth: 2,
    limit: selectedProductIDs.length,
    where: {
      id: {
        in: selectedProductIDs,
      },
    },
  })

  const productsByID = new Map(
    (selectedProducts.docs as Product[]).map((product) => [product.id, product]),
  )
  const products = selectedProductIDs
    .map((productID) => productsByID.get(productID))
    .filter((product): product is Product => Boolean(product))
    .slice(0, limit)

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
