// 'use client'

// import React, { useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import Image from 'next/image'

// interface PartnerLogo {
//   name: string
//   logoSrc: string
//   iconOnly?: boolean
//   label?: string
// }

// const integrations: PartnerLogo[] = [
//   { name: 'Stripe', logoSrc: '/partners/stripe.svg' },
//   { name: 'Fandango', logoSrc: '/partners/fandango.svg', iconOnly: true, label: 'FANDANGO' },
//   { name: 'Comscore', logoSrc: '/partners/comscore.svg' },
//   { name: 'Webedia', logoSrc: '/partners/webedia.svg' },
//   { name: 'Spotify', logoSrc: '/partners/spotify.svg', iconOnly: true, label: 'spotify' },
//   { name: 'Netflix', logoSrc: '/partners/netflix.svg', iconOnly: true, label: 'NETFLIX' },
// ]

// const Partners = () => {
//   const trackRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const track = trackRef.current
//     if (!track) return

//     const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
//     // We animate the track by exactly 50% of its total width
//     // since we duplicate the list items twice to create the seamless loop.
//     const totalWidth = track.scrollWidth / 2

//     const tween = gsap.to(track, {
//       x: `-=${totalWidth}`,
//       duration: 50, // Slowed down for a more majestic, luxurious feel
//       ease: 'none',
//       repeat: reduceMotion ? 0 : -1,
//     })

//     return () => {
//       tween.kill()
//     }
//   }, [])

//   return (
//     <section className="w-full bg-background py-20 sm:py-12 flex flex-col items-center justify-center overflow-hidden">
      
//       {/* Eyebrow */}
//       <div className="mb-12 sm:mb-16">
//         <span 
//           className="text-[10px] sm:text-xs tracking-[0.25em] text-foreground/50 uppercase font-bold"
//           style={{ fontFamily: 'var(--font-gilroy)' }}
//         >
//           Trusted by developers across the globe
//         </span>
//       </div>
      
//       {/* Infinite Marquee Container */}
//       <div className="relative flex w-full items-center overflow-hidden border-y border-foreground/10 
//         before:absolute before:left-0 before:top-0 before:bottom-0 before:z-10 before:w-16 before:bg-gradient-to-r before:from-background before:to-transparent 
//         after:absolute after:right-0 after:top-0 after:bottom-0 after:z-10 after:w-16 after:bg-gradient-to-l after:from-background after:to-transparent 
//         sm:before:w-48 sm:after:w-48">
        
//         <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
          
//           {/* We map the array twice so that when the first set scrolls out of view, 
//               the second set is seamlessly replacing it. */}
//           {[...Array(2)].map((_, loopIndex) => (
//             <div key={loopIndex} aria-hidden={loopIndex === 1} className="flex items-center">
//               {integrations.map((item, i) => (
//                 <div 
//                   key={`${loopIndex}-${i}`} 
//                   className="group flex h-32 w-56 shrink-0 items-center justify-center border-r border-foreground/10 transition-colors hover:bg-foreground/[0.02] sm:w-80"
//                 >
//                   <div className="flex items-center gap-3 opacity-75 transition-opacity duration-300 group-hover:opacity-100">
//                     <Image
//                       src={item.logoSrc}
//                       alt={item.name}
//                       width={item.iconOnly ? 44 : 180}
//                       height={item.iconOnly ? 44 : 56}
//                       unoptimized
//                       className={`${item.iconOnly ? 'h-9 w-9' : 'h-10 w-auto max-w-40'} object-contain brightness-0 invert`}
//                     />
//                     {item.label && (
//                       <span className="text-2xl font-bold text-[#f5f5f2]" style={{ fontFamily: 'var(--font-gilroy)' }}>
//                         {item.label}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
          
//         </div>
//       </div>
      
//     </section>
//   )
// }

// export default Partners


'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface Client {
  name: string // alt text, and shown as text if the logo file is missing
  logo: string // file name in /public/partners/ without ".png"
}

// Logo files live in /public/models/partners/:
//   <logo>.png        dark version, used on a light background
//   <logo>-white.png  white version, used on a dark background
const clients: Client[] = [
  { name: 'Tremont', logo: 'tremont' },
  { name: 'Raya', logo: 'raya' },
  { name: 'The Palace', logo: 'the-palace' },
  { name: 'Sunwoods', logo: 'sunwoods' },
  { name: 'Polaris', logo: 'polaris' },
  { name: 'Shivalay', logo: 'shivalay' },
  { name: 'Pramukh Group', logo: 'pramukh' },
  { name: 'Beverlynn', logo: 'beverlynn' },
  { name: 'Omkar Group', logo: 'omkar' },
  { name: 'Vishakha Group', logo: 'vishakha' },
  { name: 'Ashima', logo: 'ashima' },
  { name: 'Diamond', logo: 'diamond' },
  { name: 'Atishay', logo: 'atishay' },
  { name: 'Evermark', logo: 'evermark' },
  { name: 'Shree Bhavani Infra', logo: 'shree-bhavani' },
]

const LOGO_FOLDER = '/models/partners/'

// Keeps the strip full and the loop seamless even with only a few clients
const MIN_ITEMS = 8
const SECONDS_PER_ITEM = 5 // speed: higher = slower

function ClientMark({ client, onDark }: { client: Client; onDark: boolean }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className="text-lg font-semibold uppercase tracking-[0.14em] text-foreground sm:text-xl"
        style={{ fontFamily: 'var(--font-gilroy)' }}
      >
        {client.name}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${LOGO_FOLDER}${client.logo}${onDark ? '-white' : ''}.png`}
      alt={client.name}
      loading="eager"
      draggable={false}
      onError={() => setFailed(true)}
      className="h-14 w-auto max-w-[190px] select-none object-contain sm:h-20 sm:max-w-[240px]"
    />
  )
}

// True when the section's background is dark. Works with any theme switch (class, data-theme, system setting).
function useDarkBackground(ref: React.RefObject<HTMLElement | null>) {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    const check = () => {
      let el: HTMLElement | null = ref.current
      // Walk up until an element with a real (non-transparent) background colour is found
      while (el) {
        const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g)
        if (m && (m.length < 4 || Number(m[3]) > 0.1)) {
          const [r, g, b] = m.map(Number)
          setDark(0.2126 * r + 0.7152 * g + 0.0722 * b < 128)
          return
        }
        el = el.parentElement
      }
    }
    check()
    const mo = new MutationObserver(check)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] })
    mo.observe(document.body, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] })
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', check)
    return () => {
      mo.disconnect()
      mq.removeEventListener('change', check)
    }
  }, [ref])
  return dark
}

const Partners = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const onDark = useDarkBackground(sectionRef)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  // Repeat the list until it is long enough to fill wide screens
  const base: Client[] = []
  while (base.length < MIN_ITEMS) base.push(...clients)

  useEffect(() => {
    const track = trackRef.current
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // The track holds the list twice; moving it by exactly half loops seamlessly at any width,
    // even before the logo images have finished loading
    tweenRef.current = gsap.fromTo(
      track,
      { xPercent: 0 },
      { xPercent: -50, duration: base.length * SECONDS_PER_ITEM, ease: 'none', repeat: -1 }
    )
    return () => {
      tweenRef.current?.kill()
    }
  }, [base.length])

  // Slow down while the visitor hovers, so a logo can be read
  const slow = () => tweenRef.current && gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.6 })
  const resume = () => tweenRef.current && gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6 })

  return (
    <section ref={sectionRef} className="w-full overflow-hidden bg-background py-16 sm:py-24" aria-label="Clients">
      {/* Heading */}
      <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center px-6 text-center sm:mb-14">
        <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a8812f] dark:text-[#d5bd87] sm:text-xs">
          <span className="h-px w-8 bg-current opacity-60" />
          Our clients
          <span className="h-px w-8 bg-current opacity-60" />
        </span>
        <h2
          className="text-2xl font-medium uppercase leading-tight tracking-[-0.02em] text-foreground sm:text-4xl"
          style={{ fontFamily: 'var(--font-gilroy)' }}
        >
          Trusted by developers across the globe
        </h2>
      </div>

      {/* Moving strip */}
      <div
        className="relative w-full border-y border-foreground/10 bg-foreground/[0.02]"
        onMouseEnter={slow}
        onMouseLeave={resume}
      >
        {/* Soft fade at both edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-48" />

        <div ref={trackRef} className="flex w-max items-stretch will-change-transform">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-stretch">
              {base.map((client, i) => (
                <li
                  key={`${copy}-${i}`}
                  className="group flex h-32 w-64 shrink-0 items-center justify-center border-r border-foreground/10 px-8 transition-colors duration-300 hover:bg-[#bf953f]/[0.06] sm:h-40 sm:w-80"
                >
                  <div className="opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
                    <ClientMark client={client} onDark={onDark} />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners