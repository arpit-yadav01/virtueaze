'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// three.js touches `window` at import time, so the canvas can only exist
// on the client — keep it out of the server bundle entirely.
const LaptopCanvas = dynamic(
  () => import('./LaptopCanvas').then((mod) => mod.LaptopCanvas),
  { ssr: false }
)

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * "spotlight" section — a plain, continuously-scrolling section (nothing
 * is pinned/scroll-jacked):
 *   1. BOLD / WEBSITES headline sits at the top and scrolls away normally
 *      with the rest of the page — no special exit animation.
 *   2. The laptop's baked GLB clips (lid open + all 4 screen tiles) are
 *      scrubbed against how far the stage has moved through the viewport
 *      as the page scrolls — no pinning, the page keeps moving the whole
 *      time, the animation just tracks scroll progress.
 *   3. The background still fades in over that same scroll range — its
 *      opacity tracks scroll progress exactly like the laptop's mech
 *      animation, rather than a fixed-duration one-shot tween.
 *   4. The closing line fades up once it scrolls into view.
 *
 * Swap `backgroundImages` for the real production stills — they render as
 * a simple crossfaded stack behind the laptop.
 */
export default function Spotlight({ backgroundImages = ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"] }) {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const bgRef = useRef(null)
  const captionRef = useRef(null)

  const laptopController = useRef(null)
  const [modelReady, setModelReady] = useState(false)

  // One-shot fade: closing caption only.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set(captionRef.current, { opacity: 1, y: 0 })
      return
    }

    gsap.set(captionRef.current, { opacity: 0, y: 24 })

    const ctx = gsap.context(() => {
      gsap.to(captionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: captionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timeout)
      ctx.revert()
    }
  }, [])

  // Background fade — scrubbed to the same scroll range as the laptop's
  // mech animation below, instead of a fixed-duration one-shot tween.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set(bgRef.current, { opacity: 1 })
      return
    }

    gsap.set(bgRef.current, { opacity: 0 })

    const st = ScrollTrigger.create({
      trigger: stageRef.current,
      start: 'top 85%',
      end: 'bottom 30%',
      scrub: true,
      onUpdate: (self) => gsap.set(bgRef.current, { opacity: self.progress }),
    })

    return () => st.kill()
  }, [])

  // GLB mech animation (lid + 4 tiles) scrubbed to the stage's own scroll
  // progress through the viewport — no pin, page scrolls normally.
  useEffect(() => {
    if (!modelReady || !laptopController.current) return

    const { setMechProgress } = laptopController.current

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setMechProgress(1)
      return
    }

    const st = ScrollTrigger.create({
      trigger: stageRef.current,
      start: 'top 85%',
      end: 'bottom 30%',
      scrub: true,
      onUpdate: (self) => setMechProgress(self.progress),
    })

    return () => st.kill()
  }, [modelReady])

  return (
    <section
      ref={sectionRef}
      className="spotlight relative w-full overflow-hidden bg-[#080808] text-white"
    >
      {/* headline stack — scrolls normally with the page */}
      <div className="relative z-10 flex flex-col items-center pt-[8vh] sm:pt-[10vh]">
        <div className="pointer-events-none select-none text-center leading-[0.78]">
          <div
            className="font-bold text-[19vw] uppercase tracking-[-0.06em] text-[#f5f5f2] sm:text-[12vw] md:text-[10.5vw]"
            style={{ fontFamily: 'var(--font-gilroy)' }}
          >
            Why
          </div>
          <div className="-mt-1">
            <div
              className="font-bold text-[19vw] uppercase tracking-[-0.06em] text-[#f5f5f2] sm:text-[12vw] md:text-[10.5vw]"
              style={{ fontFamily: 'var(--font-gilroy)' }}
            >
              VIRTUEAZE
            </div>
          </div>
        </div>

        <div
          className="mt-8 flex w-full max-w-4xl items-start justify-between border-t border-white/10 px-6 pt-3 text-[9px] uppercase tracking-[0.16em] text-white/35 sm:mt-10 sm:text-[10px]"
        >
          <div className="text-left">
            <p>Designed for</p>
            <p className="text-white/80">The built environment</p>
            <p className="mt-2">Experience</p>
            <p className="text-white/80">Interactive real estate</p>
          </div>
          <p className="max-w-[14rem] text-center font-medium normal-case tracking-[0.04em] text-white/80">
            From digital space<br />to the physical world
          </p>
          <div className="text-right">
            <p>Built by</p>
            <p className="text-white/80">Virtuaze</p>
            <p className="mt-2">For</p>
            <p className="text-white/80">Developers &amp; owners</p>
          </div>
        </div>

        {/* laptop stage — the background still lives here and fades in
            once this block scrolls into view */}
        <div
          ref={stageRef}
          className="relative z-10 mt-6 h-[42vh] min-h-[320px] w-full flex-none sm:mt-10 sm:h-[85vh] sm:w-[82vw] sm:max-w-[1540px]"
        >
          <div
            ref={bgRef}
            className="absolute left-1/2 -top-1/2 -z-10 h-full w-screen max-w-none -translate-x-1/2 opacity-0"
          >
            <div className="relative w-full aspect-[2001/1310] overflow-hidden">
              {/* theatre frame; its projector screen is filled below */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/stage.webp"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              {backgroundImages.length > 0 ? (
                // The inset follows the projector screen in stage.webp.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={backgroundImages[0]}
                  alt=""
                  className="absolute left-[11.5%] top-[3.4%] h-[63%] w-[77%] object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: modelReady ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            <LaptopCanvas
              onReady={(controller) => {
                laptopController.current = controller
                setModelReady(true)
              }}
            />
          </div>
        </div>

        {/* closing line — fades up once it scrolls into view */}
        <p
          ref={captionRef}
          className="relative z-20 mx-auto max-w-xl px-6 pb-[10vh] pt-8 text-center text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Virtueaze is a 3D visualisation and software studio with teams in Ahmedabad and UAE. We build Digital Twins in game engines because it&apos;s the only way to give a buyer real light, real scale and real control.
        </p>
      </div>
    </section>
  )
}
