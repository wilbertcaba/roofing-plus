import type { Metadata } from 'next'
import React from 'react'

import { PageBySlug, generateMetadataForPageSlug } from '../_components/PageBySlug'

type Args = {
  searchParams: Promise<{ categoria?: string }>
}

export default async function ProductosPage({ searchParams: searchParamsPromise }: Args) {
  const { categoria } = await searchParamsPromise
  return (
    <PageBySlug
      slug="productos"
      url="/productos"
      selectedCategorySlug={categoria ?? null}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataForPageSlug('productos')
}
