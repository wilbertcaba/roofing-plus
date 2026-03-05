import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { WhyChooseUsBlock as WhyChooseUsBlockType } from '@/payload-types'

export const WhyChooseUsBlock: React.FC<WhyChooseUsBlockType> = ({
  sectionTitle,
  stats,
  subjectImage,
  backgroundImage,
  ctaLink,
}) => {
  const statsList = stats?.slice(0, 3) ?? []

  return (
    <div className="relative bg-white">
      <div className="grid lg:grid-cols-3">
        <div className="relative min-h-[360px] lg:min-h-[600px]">
          <div className="absolute inset-0">
            <h2 className="absolute top-1/2 left-12 -translate-y-1/2 z-10 text-4xl hidden sm:block lg:hidden text-white font-bold leading-snug">
              ¿Por qué elegir <br /> a RoofingPlus?
            </h2>
            {backgroundImage && typeof backgroundImage === 'object' && (
              <Media
                resource={backgroundImage}
                fill
                className="relative size-full"
                pictureClassName="block size-full"
                imgClassName="object-cover object-left"
                loading="lazy"
              />
            )}
          </div>

          <div className="absolute inset-0 bg-black/45" />

          {subjectImage && typeof subjectImage === 'object' && (
            <div className="absolute w-80 md:w-96 lg:w-[564px] bottom-0 right-1/2 translate-x-1/2 sm:right-12 sm:translate-x-0 lg:-right-20">
              <Media resource={subjectImage} imgClassName="" loading="lazy" />
            </div>
          )}
        </div>

        <div className="px-4 sm:px-8 py-12 flex items-center lg:col-span-2">
          <div className="w-full text-center">
            {sectionTitle && (
              <RichText data={sectionTitle} className="sm:hidden lg:block" enableGutter={false} />
            )}

            <div className="mt-12 sm:mt-0 lg:mt-16 grid sm:grid-cols-3">
              {statsList.map((stat, index) => (
                <div
                  key={stat.id ?? index}
                  className="mb-12 sm:mb-0 relative px-4 sm:border-r sm:border-border last:border-r-0"
                >
                  {stat.heading && (
                    <RichText
                      data={stat.heading}
                      className="m-0 text-primary text-5xl font-bold"
                      enableProse={false}
                      enableGutter={false}
                    />
                  )}
                  {stat.description && (
                    <RichText
                      data={stat.description}
                      className="mt-4 leading-tight"
                      enableProse={false}
                      enableGutter={false}
                    />
                  )}
                </div>
              ))}
            </div>

            {ctaLink && (
              <div className="mt-2 sm:mt-16">
                <CMSLink {...ctaLink} size="lg" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
