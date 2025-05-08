import type { FeaturesBlock } from '@/payload-types'
import { Media } from '../Media'

const CardFeature = ({
  data,
}: {
  data: Exclude<FeaturesBlock['columns'], null | undefined>[number]
}) => {
  return (
    <div className="relative rounded-lg h-64 overflow-hidden flex items-end">
      {data.media && (
        <Media
          resource={data.media}
          alt={'Feature image'}
          fill
          className="absolute inset-0"
          imgClassName="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="w-full text-background dark:text-foreground text-lg text-center z-20 mb-7">
        {data.title}
      </div>
    </div>
  )
}

export default CardFeature
