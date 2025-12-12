import React from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ServicesBlock as ServicesBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

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
    <section className={cn('relative z-20', offset && '-mt-48')}>
      <div className="container mx-auto px-4">
        {/* Optional Section Header */}
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && <h2 className="text-4xl font-bold text-gray-900 mb-4">{heading}</h2>}
            {subheading && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subheading}</p>}
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-xl hover:shadow-sm transition-shadow duration-300"
            >
              <div className="flex gap-4 items-center">
                {/* Service Icon */}
                {service.icon && typeof service.icon === 'object' && (
                  <div className="w-12 h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 mb-4 shrink-0">
                    <Media resource={service.icon} imgClassName="w-full h-full object-contain" />
                  </div>
                )}

                {/* Service Title */}
                {service.serviceTitle && (
                  <RichText
                    className="text-xl xl:text-2xl 2xl:text-3xl mx-0 font-semibold text-gray-900 mb-3 2xl:pr-7"
                    data={service.serviceTitle}
                    enableGutter={false}
                  />
                )}
              </div>

              {/* Service Description */}
              <p className="text-gray-600 mb-6 leading-relaxed hyphens-auto">
                {service.description}
              </p>

              {/* Link to Service Page */}
              {service.link && (
                <CMSLink {...service.link} appearance="default" className="inline-block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
