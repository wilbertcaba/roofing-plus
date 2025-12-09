'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-8 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className="text-secondary" />
      })}
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
      <div className="flex gap-4">
        <CMSLink appearance="default" type="custom" url="tel:809-399-3443">
          <FaWhatsapp className="w-4 h-4 mr-2" />
          (809) 399-3443
        </CMSLink>
        <CMSLink appearance="default" type="custom" url="/contactanos">
          <Mail className="w-4 h-4 mr-2" />
          Contáctanos
        </CMSLink>
      </div>
    </nav>
  )
}
