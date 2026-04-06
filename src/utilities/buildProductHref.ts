import type { Product, ProductCategory } from '@/payload-types'

export function buildProductHref(product: Product): string | undefined {
  const slug = product.slug
  if (!slug) return undefined

  const category = product.productCategory
  const categorySlug =
    typeof category === 'object' && category != null && 'slug' in category
      ? (category as ProductCategory).slug
      : null

  if (categorySlug) return `/productos/${categorySlug}/${slug}`
  return `/productos/${slug}`
}
