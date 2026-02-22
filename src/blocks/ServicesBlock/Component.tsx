'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ServicesBlock as ServicesBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Card, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

export const ServicesBlock: React.FC<ServicesBlockType> = ({
  heading,
  subheading,
  services,
  offset,
}) => {
  // Early return if no services are provided
  if (!services || services.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'relative z-20 overflow-hidden',
        offset && 'absolute -translate-y-1/3 -translate-x-1/2 left-1/2 w-full',
      )}
    >
      <div className="container mx-auto p-0">
        {/* Optional Section Header */}
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && <h2 className="text-4xl font-bold text-gray-900 mb-4">{heading}</h2>}
            {subheading && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subheading}</p>}
          </div>
        )}

        <Carousel
          className="w-full"
          opts={{
            active: true,
            breakpoints: {
              '(min-width: 1024px)': { active: false },
            },
          }}
        >
          <CarouselContent className="pb-12">
            {services.map((service, index) => (
              <CarouselItem key={index} className="p-0 basis-[80%] md:basis-[60%] lg:basis-1/3">
                <div className="p-2 md:p-4">
                  <Card className="bg-white rounded-xl shadow-xl hover:shadow-sm transition-shadow duration-300 border-none">
                    <CardHeader className="p-4 md:p-6 space-y-0 flex flex-row gap-4 items-center">
                      {/* Service Icon */}
                      {service.icon && typeof service.icon === 'object' && (
                        <div className="w-12 h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 shrink-0 m-0">
                          <Media
                            resource={service.icon}
                            imgClassName="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div className="m-0">
                        {service.serviceTitle && (
                          <RichText
                            className="text-xl xl:text-2xl 2xl:text-3xl mx-0 font-semibold text-gray-900 2xl:pr-7"
                            data={service.serviceTitle}
                            enableGutter={false}
                          />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-600 px-4 md:px-6 leading-relaxed hyphens-auto">
                      {service.description}
                    </CardContent>
                    <CardFooter className="px-4 md:px-6">
                      {/* Link to Service Page */}
                      {service.link && <CMSLink {...service.link} appearance="secondary" />}
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
