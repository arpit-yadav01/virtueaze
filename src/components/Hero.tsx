'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { usePreloader } from './PreloaderContext'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const { isLoaded } = usePreloader()
  const sectionRef = useRef<HTMLElement>(null)
  const heroStageRef = useRef<HTMLDivElement>(null)
  const seamRef = useRef<HTMLDivElement>(null)

  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoDimRef = useRef<HTMLDivElement>(null)
  const centeredLogoRef = useRef<HTMLDivElement>(null)
  const goldRuleRef = useRef<HTMLDivElement>(null)

  const placeRef = useRef<HTMLDivElement>(null)
  const ofRef = useRef<HTMLDivElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)

  // 2. Main cinematic sequence + Scroll Hinge using matchMedia for mobile responsiveness
  useEffect(() => {
    if (!isLoaded) return

    const mm = gsap.matchMedia()
    const screenHeight = window.innerHeight

    // ---------- DESKTOP ANIMATIONS ----------
    mm.add('(min-width: 768px)', () => {
      // Cinematic Reveal
      const tl = gsap.timeline()
      tl.fromTo(
        videoContainerRef.current,
        { clipPath: 'inset(49% 49% 49% 49% round 10px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.8, ease: 'power4.inOut' },
        '<'
      )
        .to(videoDimRef.current, { opacity: 1, duration: 1.8, ease: 'power2.inOut' }, '<')
        .to(
          centeredLogoRef.current,
          { y: -(screenHeight / 2) + 40, scale: 0.55, duration: 1.4, ease: 'power3.inOut' },
          '<0.2'
        )
        .to(centeredLogoRef.current, { opacity: 0, duration: 0.3 })
        .fromTo(
          goldRuleRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut', transformOrigin: 'left center' },
          '-=0.6'
        )
        .fromTo(
          [placeRef.current, ofRef.current, artRef.current],
          { y: '120%', opacity: 0, rotationZ: 3 },
          { y: '0%', opacity: 1, rotationZ: 0, duration: 1.5, stagger: 0.2, ease: 'power4.out' },
          '-=0.8'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
          '-=1'
        )

      // Desktop 3D Scroll Hinge
      gsap.to(heroStageRef.current, {
        rotateX: -18,
        scale: 0.92,
        y: -30,
        ease: 'none',
        transformOrigin: '50% 100%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
      gsap.to(seamRef.current, {
        opacity: 1,
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    })

    // ---------- MOBILE ANIMATIONS ----------
    mm.add('(max-width: 767px)', () => {
      // Cinematic Reveal (Mobile Tweaked)
      const tl = gsap.timeline()
      tl.fromTo(
        videoContainerRef.current,
        // Mobile starts as a portrait card rather than a tiny dot
        { clipPath: 'inset(40% 15% 40% 15% round 12px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.6, ease: 'power3.inOut' },
        '<'
      )
        .to(videoDimRef.current, { opacity: 1, duration: 1.6, ease: 'power2.inOut' }, '<')
        .to(
          centeredLogoRef.current,
          // Less Y travel to respect notches/dynamic island on mobile (increased safety margin to 120px)
          { y: -(screenHeight / 2) + 120, scale: 0.6, duration: 1.2, ease: 'power3.inOut' },
          '<0.2'
        )
        .to(centeredLogoRef.current, { opacity: 0, duration: 0.3 })
        .fromTo(
          goldRuleRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power3.inOut', transformOrigin: 'left center' },
          '-=0.4'
        )
        .fromTo(
          [placeRef.current, ofRef.current, artRef.current],
          { y: '120%', opacity: 0, rotationZ: 2 },
          { y: '0%', opacity: 1, rotationZ: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
          '-=0.6'
        )

      // Mobile Optimized Scroll Hinge (Push Back instead of deep 3D)
      gsap.to(heroStageRef.current, {
        rotateX: -5, // Slight rotation to keep it performant
        scale: 0.95,
        opacity: 0.4, // Fades out to look cinematic
        y: -15,
        ease: 'none',
        transformOrigin: '50% 100%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 1, // Smoother scrub on mobile touch screens
        },
      })
      gsap.to(seamRef.current, {
        opacity: 1,
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    // Performance: Pause video when scrolled out of view to save battery/CPU
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => videoRef.current?.play(),
      onEnterBack: () => videoRef.current?.play(),
      onLeave: () => videoRef.current?.pause(),
      onLeaveBack: () => videoRef.current?.pause(),
    })

    return () => mm.revert() // Cleanup everything safely for React
  }, [isLoaded])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-background text-foreground flex flex-col font-sans [perspective:1800px]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={heroStageRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Video Mask Container */}
        <div
          ref={videoContainerRef}
          className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none"
          // Keep the hero visible before hydration; GSAP adds the cinematic mask after load.
          style={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', willChange: 'clip-path' }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="./v1.mp4"
          />
          <div
            ref={videoDimRef}
            className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-black/85 opacity-0 will-change-opacity"
          />
        </div>

        {/* Traveling logo */}
        <div
          ref={centeredLogoRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center will-change-transform"
        >
          <img
            src="./v.png"
            alt="Virtuaze"
            className="h-16 md:h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(191,149,63,0.35)] mb-4"
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 pt-20 h-full pointer-events-none">
          <div className="relative w-full max-w-[1400px] mx-auto h-full flex flex-col pointer-events-auto">
            <div
              ref={subtitleRef}
              className="absolute top-[20%] right-5 hidden md:block opacity-0 max-w-[25%]"
            >
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/60 leading-relaxed block">
                Virtuaze builds a fully interactive 3D Digital Twin of your project. Buyers
                walk every tower, floor, balcony and amenity on any screen, before
                construction begins.
              </span>
            </div>

            <div className="relative h-full flex flex-col justify-around md:justify-center gap-8 md:gap-2">
              <div className="relative h-full flex flex-col justify-end md:justify-start gap-2 top-2 pb-10 md:pb-0">
                <div
                  ref={goldRuleRef}
                  className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] mb-2 md:mb-4 origin-left scale-x-0"
                />
                <div className="overflow-hidden">
                  <div
                    ref={placeRef}
                    // Adjusted responsive typography sizes
                    className="font-bold text-[12vw] md:text-[6vw] leading-[0.9] text-[#f5f5f2] uppercase tracking-[-0.06em]"
                    style={{ fontFamily: 'var(--font-gilroy)' }}
                  >
                    Sell your
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div
                    ref={ofRef}
                    className="font-bold text-[12vw] md:text-[6vw] leading-[0.9] text-[#f5f5f2] uppercase tracking-[-0.06em]"
                    style={{ fontFamily: 'var(--font-gilroy)' }}
                  >
                    property
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end w-full pb-10 md:pb-12 md:pl-12">
                <div className="overflow-hidden">
                  <div
                    ref={artRef}
                    className="font-bold text-[10vw] md:text-[5vw] leading-[1] md:leading-[0.9] text-[#f5f5f2] uppercase tracking-[-0.06em] opacity-90 md:pr-4 translate-x-4 md:translate-x-4"
                    style={{ fontFamily: 'var(--font-gilroy)' }}
                  >
                    before you <br />
                    build it.
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#experience"
                    className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-[#bf953f] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-black motion-safe:transition-transform motion-safe:hover:-translate-y-1"
                  >
                    Explore the experience
                    <ArrowDown className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-y-1" />
                  </a>
                  <a
                    href="#contact"
                    className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-white/40 bg-black/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm motion-safe:transition-colors hover:border-[#bf953f] hover:text-[#fcf6ba]"
                  >
                    Book a demo
                    <ArrowUpRight className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HINGE SEAM */}
      <div
        ref={seamRef}
        className="absolute bottom-0 inset-x-0 h-[2px] z-50 opacity-0 scale-x-0 origin-center bg-gradient-to-r from-transparent via-[#bf953f] to-transparent"
      />
    </section>
  )
}