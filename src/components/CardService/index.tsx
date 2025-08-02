import type { Config } from '@/payload-types'
import { Media } from '../Media'

const CardService = ({
  data: service,
}: {
  data: NonNullable<
    NonNullable<Config['collections']['pages']['hero']['servicesSlider']>['servicesList']
  >[number]
}) => {
  return (
    <div className="flex items-start md:w-full min-w-full h-full p-8 bg-white shadow-md rounded-md md:snap-start snap-center snap-always border border-black/6 ">
      <div className="flex w-full">
        {/* Left column with icon */}
        <div className="w-[60px] pt-2 pr-4 flex items-start justify-center">
          {service.serviceIcon && (
            <Media
              resource={service.serviceIcon}
              fill
              imgClassName="object-contain"
              className="w-full aspect-square relative"
              priority
              alt={service.serviceTitle || 'Service Icon'}
            />
          )}
        </div>
        {/* Right column with title, description, and link */}
        <div className="w-full space-y-1">
          <h4 className="text-base font-bold text-foreground dark:text-background line-clamp-2">
            {service.serviceTitle}
          </h4>
          <p className="text-sm font-medium leading-6 text-[#999] line-clamp-3">
            {service.serviceDescription}
          </p>
          {service.serviceLink && (
            <a
              href={service.serviceLink.slug ? `/${service.serviceLink.slug}` : '#'}
              className="text-primary hover:text-primary/80 font-semibold underline text-sm"
              target="_self"
            >
              {service.serviceLink.label}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardService
