import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { GalleryContentBlock } from './GalleryContent/Component'
import { CallToActionWithImageBlock } from './CallToActionWithImage/Component'
import { FaqBlock } from './FAQ/Component'
import { TwoColsContentBlock } from './TwoColsContent/Component'
import { TeamBlock } from './Team/Component'
import { TableBlock } from './TableBlock/Component'
import { FeaturesBlock } from './FeaturesBlock/Component'
import { cn } from '@/utilities/ui'
import { CustomerBlock } from './CustomerBlock/Component'
import { FeaturesWithImageBlock } from './FeaturesWithImage/Component'
import { LastestNewsBlock } from './LatestNewsBlock/Component'
import { MessageBlock } from './Message/Component'
import { AddressBlock } from './Address/Component'
import { ArchiveWithPaginationBlock } from './ArchiveWithPaginationBlock/Component'
import { CardGridBlock } from './CardGrid/Component'

const blockComponents = {
  archive: ArchiveBlock,
  archiveWithPagination: ArchiveWithPaginationBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  ctaWithImage: CallToActionWithImageBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  galleryContent: GalleryContentBlock,
  faq: FaqBlock,
  twoColsContent: TwoColsContentBlock,
  team: TeamBlock,
  tableBlock: TableBlock,
  featuresBlock: FeaturesBlock,
  customerBlock: CustomerBlock,
  featuresWithImage: FeaturesWithImageBlock,
  lastestNews: LastestNewsBlock,
  message: MessageBlock,
  address: AddressBlock,
  cardGrid: CardGridBlock,
}

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
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={cn(index == blocks.length - 1 && 'mb-0')} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
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
