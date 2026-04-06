'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useMediaQuery } from './hooks/use-media-query'

const SEGMENT_LABELS: Record<string, string> = {
  contactanos: 'Contáctanos',
  posts: 'Posts',
  productos: 'Productos',
  search: 'Búsqueda',
}

function humanizeSegment(segment: string): string {
  const key = segment.toLowerCase()
  if (SEGMENT_LABELS[key]) return SEGMENT_LABELS[key]
  try {
    const decoded = decodeURIComponent(segment.replace(/\+/g, ' '))
    return decoded
      .split('-')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  } catch {
    return segment
  }
}

type TrailItem = { href: string; label: string }

function buildTrail(pathname: string): TrailItem[] {
  const raw = pathname.split('/').filter(Boolean)
  if (raw.length === 0) return []

  const levels: TrailItem[] = []
  let acc = ''

  let i = 0
  while (i < raw.length) {
    const seg = raw[i]
    const next = raw[i + 1]

    if (seg === 'page' && next !== undefined && /^\d+$/.test(next)) {
      acc = `${acc}/page/${next}`
      levels.push({ href: acc, label: `Página ${next}` })
      i += 2
      continue
    }

    acc = `${acc}/${seg}`
    levels.push({ href: acc, label: humanizeSegment(seg) })
    i += 1
  }

  return levels
}

export const SiteBreadcrumbs: React.FC = () => {
  const pathname = usePathname()
  const isNarrowPhone = useMediaQuery('(max-width: 767px)')

  if (!pathname || pathname === '/') {
    return null
  }

  const trail = buildTrail(pathname)
  if (trail.length === 0) {
    return null
  }

  const useCollapsedTrail = isNarrowPhone && trail.length > 2
  const firstCrumb = trail[0]
  const innerCrumbs = trail.slice(1, -1)
  const lastCrumb = trail[trail.length - 1]

  return (
    <div className="border-t border-border/60 -mx-4 md:-mx-8 px-4 md:px-8 py-3 md:py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {useCollapsedTrail ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={firstCrumb.href}>{firstCrumb.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
                      aria-label="Más niveles de navegación"
                    >
                      <BreadcrumbEllipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                      {innerCrumbs.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link href={item.href}>{item.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{lastCrumb.label}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            trail.map((item, index) => {
              const isLast = index === trail.length - 1
              return (
                <React.Fragment key={item.href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              )
            })
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
