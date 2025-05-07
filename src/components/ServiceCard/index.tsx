import type { Media as MediaType } from '@/payload-types'
import { Media } from '../Media'

type ServiceType = {
  serviceTitle?: string | null
  serviceDescription?: string | null
  serviceIcon?: (number | null) | MediaType
  serviceLink: {
    label: string
    url?: string | null
  }
  id?: string | null
}

const ServiceCard = ({ data }: { data: ServiceType }) => {
  const service = data
  return (
    <div className="flex items-center md:min-w-[324px] min-w-full p-8 bg-white shadow-md rounded-md md:snap-start snap-center snap-always border border-black/[0.06] ">
      <div className="flex w-full h-fit">
        {/* Left column with icon */}
        <div className="w-[60px] pt-2 pr-4 flex items-start justify-center">
          {service.serviceIcon && (
            <Media
              resource={service.serviceIcon}
              imgClassName="object-contain"
              fill
              className="w-full aspect-square relative"
              priority
              alt={service.serviceTitle || 'Service Icon'}
            />
          )}
        </div>
        {/* Right column with title, description, and link */}
        <div className="w-full space-y-1">
          <h4 className="text-base font-bold">{service.serviceTitle}</h4>
          <p className="text-sm font-medium leading-6 text-[#999]">{service.serviceDescription}</p>
          {service.serviceLink && (
            <a
              href={service.serviceLink.url ?? '#'}
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

export default ServiceCard
