import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ServicesBlock } from '@/blocks/ServicesBlock/Component'
import { ProjectsFeaturedBlock } from '@/blocks/ProjectsFeatured/Component'
import { ClientLogosBlock } from '@/blocks/ClientLogos/Component'
import { ProductsFeaturedBlock } from '@/blocks/ProductsFeatured/Component'
import { WhyChooseUsBlock } from '@/blocks/WhyChooseUs/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: (props: React.ComponentProps<typeof MediaBlock>) => (
    <MediaBlock {...props} disableInnerContainer />
  ),
  services: ServicesBlock,
  featuredProject: ProjectsFeaturedBlock,
  clientLogos: ClientLogosBlock,
  productsFeatured: ProductsFeaturedBlock,
  whyChooseUs: WhyChooseUsBlock,
}

const blocksWithNoPadding: Array<keyof typeof blockComponents> = [
  'services',
  'clientLogos',
  'featuredProject',
  'productsFeatured',
  'whyChooseUs',
]
const blocksWithNoPaddingSet = new Set<keyof typeof blockComponents>(blocksWithNoPadding)

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const typedBlockType = blockType as keyof typeof blockComponents
            const Block = blockComponents[typedBlockType]
            const hasNoPadding = blocksWithNoPaddingSet.has(typedBlockType)

            if (Block) {
              return (
                <section className={`${hasNoPadding ? '' : 'py-10 md:py-16'} relative`} key={index}>
                  {/* @ts-expect-error block prop typing resolves to impossible intersection */}
                  <Block {...block} />
                </section>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
