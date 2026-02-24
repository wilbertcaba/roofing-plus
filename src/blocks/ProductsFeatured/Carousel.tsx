'use client'

import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Product } from '@/payload-types'

type ProductsFeaturedCarouselProps = {
  products: Product[]
}

export const ProductsFeaturedCarousel: React.FC<ProductsFeaturedCarouselProps> = ({ products }) => {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  React.useEffect(() => {
    if (!carouselApi) {
      return
    }

    const onSelect = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    onSelect()
    carouselApi.on('reInit', onSelect)
    carouselApi.on('select', onSelect)

    return () => {
      carouselApi.off('reInit', onSelect)
      carouselApi.off('select', onSelect)
    }
  }, [carouselApi])

  return (
    <>
      <Carousel
        className="w-full"
        setApi={setCarouselApi}
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent className="items-stretch pb-2 -ml-0">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="flex items-stretch basis-80 pl-4 sm:basis-[360px] md:pl-6"
            >
              {typeof product.productImage === 'object' && (
                <ProductCard
                  colors={product.colors}
                  href={product.slug ? `/productos/${product.slug}` : undefined}
                  productCategory={product.productCategory}
                  productImage={product.productImage}
                  productName={product.productName}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="container mx-auto mt-6 flex items-center justify-center gap-3">
        <Button
          aria-label="Producto anterior"
          className="h-10 w-10 rounded-full"
          disabled={!canScrollPrev}
          onClick={() => carouselApi?.scrollPrev()}
          size="icon"
          type="button"
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Siguiente producto"
          className="h-10 w-10 rounded-full"
          disabled={!canScrollNext}
          onClick={() => carouselApi?.scrollNext()}
          size="icon"
          type="button"
          variant="outline"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
