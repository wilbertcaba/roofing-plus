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
    <div className="relative overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[540px]">
          <div className="absolute inset-0">
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
            <div className="absolute inset-0 flex items-end justify-center">
              <Media
                resource={subjectImage}
                className="max-h-full w-auto"
                pictureClassName="block"
                imgClassName="h-auto w-auto max-h-[95%] object-contain"
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div className="px-6 py-12 md:px-10 lg:px-14 xl:px-16 flex items-center">
          <div className="w-full">
            {sectionTitle && (
              <RichText
                data={sectionTitle}
                className="m-0 p-0 text-balance [&_h2]:m-0 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-foreground md:[&_h2]:text-4xl"
                enableProse={false}
                enableGutter={false}
              />
            )}

            <div className="mt-8 grid gap-6 sm:grid-cols-3 md:gap-8">
              {statsList.map((stat, index) => (
                <div key={stat.id ?? index} className="sm:px-2 sm:border-l sm:border-border first:sm:border-l-0">
                  {stat.heading && (
                    <RichText
                      data={stat.heading}
                      className="m-0 p-0 text-primary [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 [&_h3]:text-4xl [&_h3]:font-bold [&_p]:m-0 [&_p]:text-4xl [&_p]:font-bold"
                      enableProse={false}
                      enableGutter={false}
                    />
                  )}
                  {stat.description && (
                    <RichText
                      data={stat.description}
                      className="mt-1 m-0 p-0 text-muted-foreground [&_p]:m-0"
                      enableProse={false}
                      enableGutter={false}
                    />
                  )}
                </div>
              ))}
            </div>

            {ctaLink && (
              <div className="mt-8">
                <CMSLink {...ctaLink} size="lg" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
