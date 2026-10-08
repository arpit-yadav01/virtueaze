'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePreloader } from './PreloaderContext'

// Removed preloadVideo to fix mobile infinite loading issues
export default function Preloader() {
  const { isLoaded, setIsLoaded } = usePreloader()
  const counterObj = useRef({ value: 0 })
  const counterRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoaded) return

    document.body.style.overflow = 'hidden'

    const counterTween = gsap.to(counterObj.current, {
      value: 100,
      duration: 2.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counterObj.current.value)
        if (counterRef.current) counterRef.current.textContent = `${v}%`
        if (progressBarRef.current) progressBarRef.current.style.width = `${v}%`
      },
      onComplete: () => {
        setIsLoaded(true)
        document.body.style.overflow = ''
      },
    })

    // Never let a client-side animation failure keep the page inaccessible.
    const fallbackTimer = window.setTimeout(() => {
      setIsLoaded(true)
      document.body.style.overflow = ''
    }, 4000)

    return () => {
      counterTween.kill()
      window.clearTimeout(fallbackTimer)
      document.body.style.overflow = ''
    }
  }, [isLoaded, setIsLoaded])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-6 transition-opacity duration-700 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      <div ref={counterRef} className="text-xl tracking-[0.3em] uppercase text-foreground/80 font-light">
        0%
      </div>
      <div className="w-64 h-[2px] bg-foreground/15 overflow-hidden rounded-full">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] rounded-full"
          style={{ width: '0%', willChange: 'width' }}
        />
      </div>
    </div>
  )
}
