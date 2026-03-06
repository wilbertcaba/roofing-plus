import React from 'react'

import type { ContactUsBlock as ContactUsBlockType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const ContactUsBlock: React.FC<ContactUsBlockType> = ({
  heading,
  subheading,
  backgroundImage,
  link,
}) => {
  return (
    <div className="relative overflow-hidden bg-primary py-16 md:py-24">
      {backgroundImage && typeof backgroundImage === 'object' && (
        <div className="absolute inset-0">
          <Media
            resource={backgroundImage}
            fill
            className="size-full"
            pictureClassName="block size-full"
            imgClassName="object-cover object-center"
            loading="lazy"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-primary/70" />

      <div className="container relative z-10">
        <div className="max-w-full text-center text-white">
          {heading && <RichText data={heading} className="m-0 max-w-full" enableGutter={false} />}
          {subheading && <RichText data={subheading} className="mt-2 mb-0" enableGutter={false} />}
        </div>

        {link && (
          <div className="relative z-10 mt-8 flex justify-center md:mt-10">
            <CMSLink {...link} size="lg" appearance="secondary" />
          </div>
        )}
      </div>
    </div>
  )
}
