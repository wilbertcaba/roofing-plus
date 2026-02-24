'use client'

import React from 'react'
import Link from 'next/link'

import { Media } from '@/components/Media'
import type { Product as ProductType } from '@/payload-types'
import { cn } from '@/utilities/ui'

type ProductCardProps = {
  className?: string
  colors?: ProductType['colors']
  href?: string
  productCategory?: ProductType['productCategory']
  productImage: ProductType['productImage']
  productName: ProductType['productName']
}

export const ProductCard: React.FC<ProductCardProps> = ({
  className,
  colors,
  href,
  productCategory,
  productImage,
  productName,
}) => {
  const visibleColors = React.useMemo(() => (colors || []).slice(0, 5), [colors])
  const [activeColorIndex, setActiveColorIndex] = React.useState(0)

  React.useEffect(() => {
    setActiveColorIndex(0)
  }, [visibleColors.length])

  const selectedColor = visibleColors[activeColorIndex]
  const selectedImage =
    selectedColor?.thumbnail && typeof selectedColor.thumbnail === 'object'
      ? selectedColor.thumbnail
      : productImage

  const categoryLabel =
    typeof productCategory === 'object' ? productCategory?.title || null : productCategory || null

  return (
    <article
      className={cn(
        'group relative flex h-full min-h-[454px] w-full flex-col overflow-hidden rounded-[2rem] shadow-xl transition-all duration-300 hover:shadow-2xl',
        className,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden">
        {typeof selectedImage === 'object' && (
          <Media
            resource={selectedImage}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between bg-neutral-100 p-6 md:p-8">
        <div>
          {categoryLabel && <p className="text-lg font-semibold text-blue-700">{categoryLabel}</p>}
          <h3 className="text-3xl font-semibold leading-tight text-black">{productName}</h3>
        </div>

        <div className="pt-4">
          {selectedColor?.name && (
            <p className="text-lg text-black">
              <b>Color: </b>
              {selectedColor.name}
            </p>
          )}

          {visibleColors.length > 0 && (
            <div className="mt-5 flex items-center gap-3">
              {visibleColors.map((color, index) => {
                const isSelected = index === activeColorIndex

                return (
                  <button
                    key={`${color.name || 'color'}-${index}`}
                    aria-label={`Ver color ${color.name || index + 1}`}
                    className={cn(
                      'relative z-20 h-12 w-12 overflow-hidden border-2 border-transparent transition',
                      isSelected && 'border-primary border-2',
                    )}
                    onClick={() => setActiveColorIndex(index)}
                    type="button"
                  >
                    {color.thumbnail && typeof color.thumbnail === 'object' && (
                      <Media
                        resource={color.thumbnail}
                        className="h-full w-full"
                        imgClassName="h-full w-full object-cover"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
      {href && (
        <Link
          aria-label={`Ver producto ${productName}`}
          className="absolute inset-0 z-10 rounded-[2rem] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          href={href}
        >
          <span className="sr-only">Ver producto {productName}</span>
        </Link>
      )}
    </article>
  )
}
