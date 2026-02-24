import React from 'react'
import { ClientLogosBlock as ClientLogosBlockType } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Media } from '@/components/Media'

export const ClientLogosBlock: React.FC<ClientLogosBlockType> = ({ heading, logos }) => {
  const logosList = logos?.filter((logo) => Boolean(logo?.id && logo.logo)) ?? []

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-center items-stretch h-56">
        {heading && (
          <RichText
            data={heading}
            className="p-2 justify-center items-center col-span-full lg:col-span-1 hidden lg:flex"
          />
        )}
        {logos &&
          logosList.map((logo, index) => (
            <div
              key={logo.id}
              className={`flex p-4 justify-center items-center border border-border ${index === 0 ? 'border-l' : ''} ${index === logosList.length - 1 ? 'border-r-0' : ''}`}
            >
              <Media resource={logo.logo} />
            </div>
          ))}
      </div>
    </div>
  )
}
