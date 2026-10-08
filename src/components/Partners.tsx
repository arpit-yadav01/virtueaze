'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const integrations = [
  { name: 'stripe' },
  { name: 'FANDANGO' },
  { name: 'comscore' },
  { name: 'webedia.' },
  { name: 'spotify' },
  { name: 'netflix' },
]

const Partners = () => {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // We animate the track by exactly 50% of its total width
    // since we duplicate the list items twice to create the seamless loop.
    const totalWidth = track.scrollWidth / 2

    const tween = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 50, // Slowed down for a more majestic, luxurious feel
      ease: 'none',
      repeat: reduceMotion ? 0 : -1,
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section className="w-full bg-background py-20 sm:py-12 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Eyebrow */}
      <div className="mb-12 sm:mb-16">
        <span 
          className="text-[10px] sm:text-xs tracking-[0.25em] text-foreground/50 uppercase font-bold"
          style={{ fontFamily: 'var(--font-gilroy)' }}
        >
          Trusted by developers across the globe
        </span>
      </div>
      
      {/* Infinite Marquee Container */}
      <div className="relative flex w-full items-center overflow-hidden border-y border-foreground/10 
        before:absolute before:left-0 before:top-0 before:bottom-0 before:z-10 before:w-16 before:bg-gradient-to-r before:from-background before:to-transparent 
        after:absolute after:right-0 after:top-0 after:bottom-0 after:z-10 after:w-16 after:bg-gradient-to-l after:from-background after:to-transparent 
        sm:before:w-48 sm:after:w-48">
        
        <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
          
          {/* We map the array twice so that when the first set scrolls out of view, 
              the second set is seamlessly replacing it. */}
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex items-center">
              {integrations.map((item, i) => (
                <div 
                  key={`${loopIndex}-${i}`} 
                  className="flex items-center justify-center h-32 w-56 sm:w-80 border-r border-foreground/10 transition-colors hover:bg-foreground/[0.02] shrink-0"
                >
                  <span 
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.04em] text-gold/50 transition-all duration-500 hover:text-[#f5f5f2] opacity-70 hover:opacity-100"
                    style={{ fontFamily: 'var(--font-gilroy)' }}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
          
        </div>
      </div>
      
    </section>
  )
}

export default Partners