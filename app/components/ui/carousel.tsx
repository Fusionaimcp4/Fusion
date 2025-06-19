'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>[0]

interface CarouselProps {
  opts?: UseCarouselParameters
  plugins?: any[]
  setApi?: (api: CarouselApi) => void
  children: React.ReactNode
  className?: string
}

export function Carousel({
  opts = { loop: true },
  plugins,
  setApi,
  className,
  children,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...opts }, plugins)

  React.useEffect(() => {
    if (emblaApi && setApi) {
      setApi(emblaApi)
    }
  }, [emblaApi, setApi])

  return (
    <div className={className}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">{children}</div>
      </div>
    </div>
  )
}

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))
CarouselContent.displayName = 'CarouselContent'

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className="min-w-0 flex-[0_0_100%]" {...props} />
))
CarouselItem.displayName = 'CarouselItem'

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className="absolute left-4 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full border border-neutral-200 bg-white p-2 text-neutral-500 transition-colors hover:text-orange-500"
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Previous slide</span>
  </button>
))
CarouselPrevious.displayName = 'CarouselPrevious'

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full border border-neutral-200 bg-white p-2 text-neutral-500 transition-colors hover:text-orange-500"
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
    <span className="sr-only">Next slide</span>
  </button>
))
CarouselNext.displayName = 'CarouselNext' 