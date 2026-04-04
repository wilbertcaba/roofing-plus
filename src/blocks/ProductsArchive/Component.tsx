import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Product, ProductCategory, ProductsArchiveBlock as ProductsArchiveBlockType } from '@/payload-types'

import { ProductsArchiveClient } from './ComponentClient'

type ProductsArchiveBlockProps = ProductsArchiveBlockType & {
  id?: string
  selectedCategorySlug?: string | null
}

export const ProductsArchiveBlock: React.FC<ProductsArchiveBlockProps> = async (props) => {
  const { itemsPerPage, selectedCategorySlug } = props
  const payload = await getPayload({ config: configPromise })
  const perPage = itemsPerPage ?? 9

  let selectedCategoryId: number | null = null
  if (selectedCategorySlug) {
    const cat = await payload.find({
      collection: 'productCategories',
      where: { slug: { equals: selectedCategorySlug } },
      limit: 1,
      depth: 0,
    })
    selectedCategoryId = cat.docs[0]?.id ?? null
  }

  const [categoriesResult, productsResult] = await Promise.all([
    payload.find({
      collection: 'productCategories',
      limit: 100,
      sort: 'title',
      depth: 0,
    }),
    payload.find({
      collection: 'products',
      depth: 2,
      limit: perPage,
      page: 1,
      ...(selectedCategoryId != null
        ? { where: { productCategory: { equals: selectedCategoryId } } }
        : {}),
    }),
  ])

  const categories = categoriesResult.docs as ProductCategory[]
  const initialProducts = productsResult.docs as Product[]
  const totalDocs = productsResult.totalDocs

  return (
    <ProductsArchiveClient
      categories={categories}
      initialProducts={initialProducts}
      itemsPerPage={perPage}
      selectedCategoryId={selectedCategoryId}
      selectedCategorySlug={selectedCategorySlug ?? null}
      totalDocs={totalDocs}
    />
  )
}
