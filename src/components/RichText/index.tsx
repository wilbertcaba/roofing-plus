import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

type TextStateValue = {
  css: CSSProperties
  label: string
}

type TextStateMap = Record<string, Record<string, TextStateValue>>

const colorState: TextStateMap = {
  color: {
    mutedForeground: {
      label: 'Muted Foreground',
      css: {
        color: 'rgb(75 85 99)',
      },
    },
  },
  size: {
    small: {
      label: 'Small',
      css: {
        fontSize: '1.25rem',
      },
    },
    medium: {
      label: 'Medium',
      css: {
        fontSize: '1.5rem',
      },
    },
  },
}

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const getTextStateStyles = (node: unknown): CSSProperties => {
  const styles: CSSProperties = {}
  const nodeState = (node as { $?: Record<string, string | null | undefined> })?.$

  if (!nodeState) {
    return styles
  }

  Object.entries(colorState).forEach(([stateKey, stateValues]) => {
    const stateValue = nodeState[stateKey]
    if (stateValue && stateValues[stateValue]) {
      Object.assign(styles, stateValues[stateValue].css)
    }
  })

  return styles
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  text: ({ node, ...converterArgs }) => {
    const text: ReactNode =
      typeof defaultConverters.text === 'function'
        ? defaultConverters.text({ node, ...converterArgs })
        : node.text

    const styles = getTextStateStyles(node)
    return Object.keys(styles).length ? <span style={styles}>{text}</span> : text
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md light:prose-invert lg:prose-lg xl:prose-xl': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
