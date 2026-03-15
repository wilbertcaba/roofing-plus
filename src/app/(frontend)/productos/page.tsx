import type { Metadata } from 'next'
import React from 'react'

import { PageBySlug, generateMetadataForPageSlug } from '../_components/PageBySlug'

export default async function ProductosPage() {
  return <PageBySlug slug="productos" url="/productos" />
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataForPageSlug('productos')
}
