'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Mail, Menu, X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer'
import { useMediaQuery } from '../hooks/use-media-query'
import { Logo } from '@/components/Logo/Logo'
import Image from 'next/image'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [open, setOpen] = useState(false)

  const ContactButtons = () => (
    <div className="flex flex-col lg:flex-row gap-4">
      <CMSLink appearance="default" type="custom" url="tel:809-399-3443">
        <FaWhatsapp className="w-4 h-4 mr-2" />
        (809) 399-3443
      </CMSLink>
      <CMSLink appearance="default" type="custom" url="/contactanos">
        <Mail className="w-4 h-4 mr-2" />
        Contáctanos
      </CMSLink>
    </div>
  )

  if (isDesktop) {
    return (
      <nav className="flex gap-8 items-center">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" className="text-secondary" />
        })}
        <ContactButtons />
      </nav>
    )
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-row items-center justify-between p-5">
          <DrawerTitle>
            <div>
              <Logo className="h-10" loading="eager" priority="high" />
            </div>
            <div className="sr-only">Navegación</div>
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-6">
          <nav className="flex flex-col">
            {navItems.map(({ link, navItemIcon }, i) => (
              <div
                key={i}
                onClick={() => setOpen(false)}
                className="border-b border-gray-200 first:border-t first:border-gray-200"
              >
                <div className="flex items-center gap-3 px-4 py-2 ">
                  {navItemIcon && typeof navItemIcon === 'object' && navItemIcon.url && (
                    <Image
                      src={navItemIcon.url}
                      alt={navItemIcon.alt || ''}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  )}
                  <CMSLink
                    {...link}
                    appearance="link"
                    className="text-lg py-2 flex-1 text-gray-900"
                  />
                </div>
              </div>
            ))}
          </nav>
          <div className="px-4">
            <ContactButtons />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
