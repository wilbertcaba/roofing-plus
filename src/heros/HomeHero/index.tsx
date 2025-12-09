'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Image from 'next/image'

export const HomeHero: React.FC<Page['hero']> = ({ ctaHomeHero, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const subHeadline = ctaHomeHero?.subHeadline
  const avatar = ctaHomeHero?.image
  const button = ctaHomeHero?.button

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div
      className="relative flex items-center justify-center text-slate-900 h-[480px] md:min-h-[80vh] bg-slate-100 overflow-hidden"
      data-theme="light"
    >
      <Image
        src="/api/media/file/img-plus-pattern.svg"
        alt="Plus pattern"
        width={154}
        height={126}
        className="absolute top-0 hidden md:block"
      />
      <Image
        src="/api/media/file/img-plus-pattern.svg"
        alt="Plus pattern"
        width={154}
        height={126}
        className="absolute bottom-0 left-1/4 rotate-180"
      />
      <div className="container mb-8 z-10 relative grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="max-w-[40rem]">
          {richText && (
            <RichText
              className="mb-14 md:mb-6 home-hero-title"
              data={richText}
              enableGutter={false}
            />
          )}

          <div className="flex-col relative z-20">
            <div className="inline-block filter drop-shadow-[0_10px_24px_rgba(12,26,51,0.16)]">
              {subHeadline && (
                <RichText
                  className="relative bg-white px-6 py-4 rounded-2xl mb-8
                  after:content-[''] after:absolute after:w-4 after:h-4
                  after:bg-white after:rotate-45 after:-bottom-2 after:left-6 xl:text-xl 2xl:text-2xl"
                  data={subHeadline}
                  enableGutter={false}
                />
              )}
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              {avatar && typeof avatar === 'object' && (
                <div
                  className="
                  h-auto relative w-12
                  md:w-28
                  xl:w-32
                  "
                >
                  <Media imgClassName="object-contain" resource={avatar} />
                </div>
              )}
              {button && <CMSLink {...button} size="lg" />}
            </div>
          </div>
        </div>
        <div className="relative h-full hidden lg:block">
          <Image
            src="/api/media/file/img-roofing-construction.png"
            alt="Tiles being placed on a roof"
            width={846}
            height={455}
            className="absolute max-w-none lg:w-[800px] xl:w-[846px] xl:h-auto top-1/2 -translate-y-1/2 -left-16"
          />
        </div>
      </div>
      <div
        className="
        absolute top-0 z-1 w-full h-56
        md:h-full md:right-0 md:w-1/3"
      >
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="object-cover object-left"
            priority
            resource={media}
            loading="eager"
          />
        )}
      </div>
    </div>
  )
}
