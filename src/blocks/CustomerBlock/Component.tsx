'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useState, useRef } from 'react'

import type { CustomerBlock as CustomerBlockProps } from '@/payload-types'

function CountUpPercent({
  value,
  duration = 2,
}: {
  value: string | number | null | undefined
  duration?: number
}) {
  console.log('CountUpPercent received value:', value); // Added console.log
  const ref = React.useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const match = typeof value === 'string' ? value.match(/^([0-9]+)%$/) : null
  const percent = match ? Number(match[1]) : typeof value === 'number' ? value : undefined
  const [display, setDisplay] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // New ref

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        // Handle case where entries might be empty or entry undefined
        if (entries.length > 0) {
          const entry = entries[0]
          if (entry) {
            setIsVisible(entry.isIntersecting)
          }
        }
      },
      { threshold: 0.2 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    console.log('CountUpPercent - isVisible:', isVisible, 'percent:', percent, 'hasAnimated:', hasAnimated); // Added console.log
    if (!isVisible || percent === undefined) return

    if (hasAnimated) return; // Prevent re-animation if already animated
    
    setHasAnimated(true)
    let start = 0
    const increment = percent / (duration * 60)
    intervalRef.current = setInterval(() => { // Assign to ref
      start += increment
      if (start >= percent) {
        setDisplay(percent)
        clearInterval(intervalRef.current as NodeJS.Timeout) // Clear using ref
      } else {
        setDisplay(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(intervalRef.current as NodeJS.Timeout) // Clear using ref
  }, [isVisible, percent, duration])

  // New useEffect to handle interruption
  useEffect(() => {
    if (!isVisible && percent !== undefined && intervalRef.current) {
      
      setDisplay(percent);
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Reset ref
    }
  }, [isVisible, percent])

  if (percent !== undefined) {
    return <span ref={ref}>{display}%</span>
  }
  return <span ref={ref}>{value ?? ''}</span>
}

export const CustomerBlock: React.FC<CustomerBlockProps> = (props) => {
  const { backgroundColor, sectionLabel, heading, customer1, customer2, customer3 } = props

  return (
    <div className={cn(backgroundColor == 'dark' ? 'bg-muted' : 'bg-white', 'dark:bg-gray-900')}>
      <div className="container py-8 lg:py-16">
        <div className="space-y-2 mb-9 flex flex-col items-center gap-1 text-center">
          <div className="h-2 w-12 bg-primary rounded-sm"></div>
          <div className="text-muted-foreground font-semibold">{sectionLabel}</div>
          <div className="text-2xl font-bold">{heading}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 justify-items-center">
          <div className="w-full md:w-2/3 text-center">
            <div className="text-[50px] leading-[50px] font-bold">
              <CountUpPercent value={customer1?.textLarge} duration={2} />
            </div>
            <div className="text-muted-foreground font-semibold">{customer1?.textSmall}</div>
          </div>
          <div className="w-full md:w-2/3 text-center">
            <div className="text-[50px] leading-[50px] font-bold">
              <CountUpPercent value={customer2?.textLarge} duration={2} />
            </div>
            <div className="text-muted-foreground font-semibold">{customer2?.textSmall}</div>
          </div>
          <div className="w-full md:w-2/3 text-center">
            <div className="text-[50px] leading-[50px] font-bold">
              <CountUpPercent value={customer3?.textLarge} duration={2} />
            </div>
            <div className="text-muted-foreground font-semibold">{customer3?.textSmall}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
