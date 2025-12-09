import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Roofing Plus Logo"
      width={228}
      height={43}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[250px] w-full h-[43px]', className)}
      src="/api/media/file/logo-roofing-plus.svg"
    />
  )
}
