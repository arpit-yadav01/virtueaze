'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface ProjectCard {
  name: string
  city: string
  clientLine: string
  walkthroughUrl: string
  liveTwinUrl: string
  poster: string
}

// Any field starting with "[" is treated as an unfilled placeholder and
// simply won't render — swap in the real value and it shows up automatically.
const isPlaceholder = (value?: string) => !value || value.trim().startsWith('[')

const projectsData: ProjectCard[] = [
  {
    name: "North Wind Sanctuary",
    city: "Noida, Gujarat",
    clientLine: "A family spent 40 minutes comparing two 3 BHKs and booked the same evening.",
    walkthroughUrl: "https://www.youtube.com/watch?v=8BGDAjvOqqU",
    liveTwinUrl: "[StreamPixel link]",
    poster: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
  },
  {
    name: "[Project name]",
    city: "[City]",
    clientLine: "Virtuaze helped us explain the project clearly to remote investors during the international launch phase.",
    walkthroughUrl: "https://www.youtube.com/watch?v=NkWnh_X_a-0",
    liveTwinUrl: "[StreamPixel link]",
    poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLElement | null)[]>([])

  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = (i: number) => {
    const clamped = Math.max(0, Math.min(projectsData.length - 1, i))
    slideRefs.current[clamped]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = gsap.context(() => {
      // Header reveal — normal page (vertical) scroll.
      if (headerRef.current) {
        if (prefersReducedMotion) {
          gsap.set(headerRef.current.children, { opacity: 1, y: 0 })
        } else {
          gsap.fromTo(
            headerRef.current.children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      }

      if (!prefersReducedMotion && glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.22,
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }

      // Per-slide reveal + parallax, driven by the *horizontal* scroll of
      // the gallery track itself (GSAP ScrollTrigger supports arbitrary
      // scroll containers via `scroller` + `horizontal: true`).
      slideRefs.current.forEach((slide, index) => {
        if (!slide || !trackRef.current) return

        const image = imageRefs.current[index]
        const content = slide.querySelector<HTMLElement>('[data-anim="content"]')
        const number = slide.querySelector<HTMLElement>('[data-anim="number"]')

        if (prefersReducedMotion) {
          gsap.set(slide, { opacity: 1 })
          if (image) gsap.set(image, { scale: 1, yPercent: 0 })
          if (content) gsap.set(content.children, { opacity: 1, y: 0 })
          if (number) gsap.set(number, { opacity: 1, scale: 1 })
          return
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            scroller: trackRef.current,
            horizontal: true,
            start: 'left 78%',
            end: 'left 22%',
            toggleActions: 'play none none reverse',
            onToggle: (self) => {
              if (self.isActive) setActiveIndex(index)
            },
          },
        })

        tl.fromTo(slide, { opacity: 0.35 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })

        if (image) {
          tl.fromTo(
            image,
            { scale: 1.28 },
            { scale: 1.05, duration: 1.1, ease: 'power2.out' },
            '<'
          )
        }
        if (number) {
          tl.fromTo(
            number,
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)' },
            '-=0.5'
          )
        }
        if (content) {
          tl.fromTo(
            content.children,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out' },
            '-=0.4'
          )
        }

        // Subtle cross-axis drift on the image as the slide passes by —
        // transform-only, stays smooth on touch.
        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: slide,
                scroller: trackRef.current,
                horizontal: true,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          )
        }
      })

      const refresh = () => ScrollTrigger.refresh()
      const timeout = setTimeout(refresh, 150)
      window.addEventListener('resize', refresh)

      return () => {
        clearTimeout(timeout)
        window.removeEventListener('resize', refresh)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full scroll-mt-24 overflow-hidden border-t border-foreground/10 bg-background py-20 text-foreground selection:bg-[#bf953f]/30"
    >
      {/* Ambient Gold Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bf953f]/10 blur-[150px]"
      />

      {/* Section Header */}
      <div ref={headerRef} className="relative z-10 mb-12 max-w-4xl px-6 text-left md:px-20 flex flex-col items-start">
        <span className="inline-block px-3 py-1.5 mb-6 bg-foreground/5 text-foreground/70 text-[10px] md:text-xs tracking-widest uppercase border border-foreground/10">
          Projects
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-6xl font-medium uppercase tracking-[-0.04em] text-foreground mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-gilroy)' }}>
          See what we&apos;ve built.
        </h2>
        <p className="text-foreground/70 text-base md:text-lg font-light leading-relaxed max-w-2xl">
          Explore production-ready interactive digital twins deployed across residential townships, commercial hubs, and luxury developments.
        </p>
      </div>

      {/* Full-bleed swipeable gallery */}
      <div
        ref={trackRef}
        className="relative z-10 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 pl-6 pr-6 md:pl-20 md:pr-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projectsData.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              slideRefs.current[index] = el
            }}
            className="relative h-[480px] w-[86%] shrink-0 snap-center overflow-hidden rounded-2xl border border-foreground/10 sm:h-[560px] sm:w-[70%] md:h-[620px] md:w-[55%] lg:w-[44%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={(el) => {
                imageRefs.current[index] = el
              }}
              src={project.poster}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />

            {/* Faint decorative index number */}
            <span
              data-anim="number"
              className="absolute top-6 left-6 z-10 text-6xl sm:text-8xl font-black text-white/15 leading-none select-none"
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Play affordance */}
            <a
              href={project.walkthroughUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#bf953f]/60 bg-black/60 text-[#fcf6ba] shadow-[0_0_20px_rgba(212,175,55,0.4)] backdrop-blur-md transition-all duration-300 hover:bg-[#bf953f] hover:text-black active:scale-90"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </a>

            {/* Content overlay */}
            <div
              data-anim="content"
              className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#bf953f]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bf953f]">
                  {project.city}
                </span>
              </div>

              <h3 className="text-xl md:text-3xl font-light text-white">
                {project.name}
              </h3>

              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-md">
                &ldquo;{project.clientLine}&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={project.walkthroughUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-black transition-all hover:bg-[#bf953f] active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Watch walkthrough
                </a>
                {!isPlaceholder(project.liveTwinUrl) && (
                  <a
                    href={project.liveTwinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
                  >
                    Open live twin
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* trailing spacer so the last slide can reach center on snap */}
        <div className="shrink-0 w-px" aria-hidden />
      </div>

      {/* Progress dashes + desktop arrows */}
      <div className="relative z-10 mt-6 flex items-center justify-center gap-6 px-6">
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => scrollToIndex(activeIndex - 1)}
          className="hidden h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/70 transition-all hover:border-[#bf953f] hover:text-[#bf953f] active:scale-90 sm:flex"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {projectsData.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to project ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-[#bf953f]' : 'w-3 bg-foreground/20'
                }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next project"
          onClick={() => scrollToIndex(activeIndex + 1)}
          className="hidden h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/70 transition-all hover:border-[#bf953f] hover:text-[#bf953f] active:scale-90 sm:flex"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}