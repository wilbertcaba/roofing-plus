'use client'

import React from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { ProjectsFeaturedBlock as ProjectsFeaturedBlockType } from '@/payload-types'
import RichText from '@/components/RichText'

export const ProjectsFeaturedBlock: React.FC<ProjectsFeaturedBlockType> = ({
  image,
  logo,
  sectionHeading,
  link,
}) => {
  return (
    <div className="relative h-[656px] md:h-[716px] lg:h-[784px] xl:h-[865px] -mt-48 pt-48 md:pt-56 pb-16 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0">
        {image && typeof image === 'object' && (
          <Media
            resource={image}
            fill
            className="relative size-full"
            pictureClassName="block size-full"
            imgClassName="object-cover object-[22%_50%] md:object-center"
            loading="lazy"
          />
        )}
      </div>
      <div className="!container z-10 relative h-full flex flex-col justify-between">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-4 md:gap-12">
          {logo && typeof logo === 'object' && (
            <Media
              resource={logo}
              className="max-w-36 md:max-w-52 lg:max-w-64 xl:max-w-none"
              pictureClassName="block"
              imgClassName="h-auto w-auto max-h-[121px]"
              loading="lazy"
            />
          )}
          <div aria-hidden className="w-[4px] self-stretch bg-white hidden md:block" />
          <div>
            {sectionHeading && (
              <RichText
                data={sectionHeading}
                className="m-0 max-w-full text-white p-0 text-center md:text-left"
              />
            )}
          </div>
        </div>
        <div className="flex justify-center">{link && <CMSLink {...link} />}</div>
      </div>
    </div>
  )
}
