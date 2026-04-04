'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'

import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Product, ProductCategory } from '@/payload-types'
import { buildProductHref } from '@/utilities/buildProductHref'
import { cn } from '@/utilities/ui'

type ProductsArchiveClientProps = {
  categories: ProductCategory[]
  initialProducts: Product[]
  itemsPerPage: number
  selectedCategoryId: number | null
  selectedCategorySlug: string | null
  totalDocs: number
}

export const ProductsArchiveClient: React.FC<ProductsArchiveClientProps> = ({
  categories,
  initialProducts,
  itemsPerPage,
  selectedCategoryId,
  selectedCategorySlug,
  totalDocs,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const hasMore = totalDocs > products.length
  const showLoadMore = totalDocs > itemsPerPage

  useEffect(() => {
    setProducts(initialProducts)
    setPage(1)
    setLoading(false)
  }, [initialProducts, selectedCategorySlug])

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return
    setLoading(true)
    try {
      const nextPage = page + 1
      const params = new URLSearchParams({
        limit: String(itemsPerPage),
        page: String(nextPage),
        depth: '2',
      })
      if (selectedCategoryId != null) {
        params.set('where', JSON.stringify({ productCategory: { equals: selectedCategoryId } }))
      }
      const res = await fetch(`/api/products?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      const nextDocs = (data.docs ?? []) as Product[]
      setProducts((prev) => [...prev, ...nextDocs])
      setPage(nextPage)
    } finally {
      setLoading(false)
    }
  }, [hasMore, loading, page, itemsPerPage, selectedCategoryId])

  const activeCategoryTitle = selectedCategorySlug
    ? categories.find((c) => (c.slug ?? '') === selectedCategorySlug)?.title
    : undefined
  const mobileCategoryType =
    activeCategoryTitle ?? (selectedCategorySlug ? selectedCategorySlug : 'Ver todos los productos')

  return (
    <div className="px-4 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Sidebar - Categorías (desktop) */}
        <aside className="hidden w-full shrink-0 lg:block md:w-56">
          <h3 className="mb-4 text-lg font-semibold">Categorías</h3>
          <nav className="flex flex-col gap-2" aria-label="Filtrar por categoría">
            <Link
              href="/productos"
              className={cn(
                'rounded-md px-3 py-2 text-left text-sm transition-colors',
                !selectedCategorySlug ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-muted',
              )}
            >
              Ver todos los productos
            </Link>
            {categories.map((cat) => {
              const slug = cat.slug ?? ''
              const isActive = selectedCategorySlug === slug
              return (
                <Link
                  key={cat.id}
                  href={`/productos?categoria=${encodeURIComponent(slug)}`}
                  className={cn(
                    'rounded-md px-3 py-2 text-left text-sm transition-colors',
                    isActive ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-muted',
                  )}
                >
                  {cat.title}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Product grid */}
        <div className="min-w-0 flex-1">
          <div className="sticky top-0 z-20 -mx-4 bg-white px-4 py-4 lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-auto min-h-10 w-full justify-start gap-2 rounded-lg py-2 text-left font-normal"
                  aria-label={`${mobileCategoryType}. Abrir menú para cambiar categoría`}
                >
                  <SlidersHorizontal className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                  <span className="block min-w-0 flex-1 truncate text-left font-medium text-foreground">
                    {mobileCategoryType}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-[min(24rem,70vh)] w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto"
              >
                <DropdownMenuItem
                  asChild
                  className={cn(
                    !selectedCategorySlug &&
                      'bg-primary/10 font-medium text-primary focus:bg-primary/15 focus:text-primary',
                  )}
                >
                  <Link href="/productos">Ver todos los productos</Link>
                </DropdownMenuItem>
                {categories.map((cat) => {
                  const slug = cat.slug ?? ''
                  const isActive = selectedCategorySlug === slug
                  return (
                    <DropdownMenuItem
                      key={cat.id}
                      asChild
                      className={cn(
                        isActive &&
                          'bg-primary/10 font-medium text-primary focus:bg-primary/15 focus:text-primary',
                      )}
                    >
                      <Link href={`/productos?categoria=${encodeURIComponent(slug)}`}>
                        {cat.title}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {products.length === 0 ? (
            <p className="text-muted-foreground">No hay productos en esta categoría.</p>
          ) : (
            <>
              {/* <div className="flex flex-col md:flex-row flex-wrap gap-4 after:basis-[45%] after:grow-[100] after:content-['']"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    colors={product.colors}
                    href={buildProductHref(product)}
                    // className="shrink-0 grow basis-80 sm:basis-[45%] xl:basis-[24%]"
                    className="col-span-1 min-h-full md:min-h-[525px]"
                    productCategory={product.productCategory}
                    productImage={product.productImage}
                    productName={product.productName}
                  />
                ))}
              </div>

              {showLoadMore && (
                <div className="mt-10 flex justify-center">
                  <Button
                    variant={hasMore ? 'default' : 'secondary'}
                    disabled={!hasMore || loading}
                    onClick={loadMore}
                    className="min-w-[140px]"
                  >
                    {loading ? 'Cargando…' : hasMore ? 'Cargar más' : 'Sin más resultados'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
