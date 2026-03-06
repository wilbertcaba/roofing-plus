import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

import type { Footer as FooterGlobal } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

const socialIconMap = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
} as const

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterGlobal

  const socialIcons: NonNullable<FooterGlobal['socialIcons']> = footerData?.socialIcons || []
  const legalLinks: NonNullable<FooterGlobal['legalLinks']> = footerData?.legalLinks || []
  const copyrightText =
    footerData?.copyrightText || '© 2025 RoofingPlus. Todos los derechos reservados.'

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="container py-8 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>

          <nav aria-label="Social media links" className="flex items-center gap-4">
            {socialIcons.map(({ platform, url, newTab }, index) => {
              const Icon = platform ? socialIconMap[platform] : null

              if (!Icon || !url) return null

              return (
                <Link
                  key={`${platform}-${index}`}
                  href={url}
                  className="text-primary transition-opacity hover:opacity-70"
                  aria-label={platform}
                  {...(newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="h-px bg-border" />

        <div className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{copyrightText}</p>

          <nav aria-label="Legal links" className="flex flex-wrap items-center gap-4">
            {legalLinks.map(({ link }, i) => {
              return <CMSLink className="hover:text-primary transition-colors" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
