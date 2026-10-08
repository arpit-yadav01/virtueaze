// 'use client'

// import React, { useEffect, useRef, useState } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { ArrowUpRight } from 'lucide-react'

// if (typeof window !== 'undefined') {
//     gsap.registerPlugin(ScrollTrigger)
// }

// interface ProjectTypeData {
//     title: string
//     subtitle: string
//     imgSrc: string
// }

// const projectTypes: ProjectTypeData[] = [
//     { title: 'Residential towers', subtitle: 'Full elevation and floor control.', imgSrc: 'https://framerusercontent.com/images/PIckQ7vs3QZXJ2eLyq91rmt3hLk.png?width=1399&height=670' },
//     { title: 'Luxury residences', subtitle: 'Material, detail and atmosphere in every room.', imgSrc: 'https://framerusercontent.com/images/qWNssr2VW9pk5zkdisoIYcc0Uo.png?width=1367&height=790' },
//     { title: 'Masterplans', subtitle: 'Navigate phases, amenities and the bigger picture.', imgSrc: 'https://framerusercontent.com/images/QSUDPXU7sOqM557B2LAeaCrKIhc.png?width=1316&height=791' },
//     { title: 'Villas & plots', subtitle: 'Plots, boundaries and custom villa walkthroughs.', imgSrc: 'https://framerusercontent.com/images/eKrcvOMsf6CXnBH0uTpWJli2vY.png?scale-down-to=1024&width=1180&height=900' },
//     { title: 'Commercial & retail', subtitle: 'Footfall, leasing layouts and retail possibilities.', imgSrc: 'https://framerusercontent.com/images/venMvyC03Nyji0T9rBpLlWjBjxo.png?width=1367&height=790' },
//     { title: 'International launches', subtitle: 'Touchscreen-ready experiences for every market.', imgSrc: 'https://framerusercontent.com/images/oytc7a861tIZUl4y8BOlpxFck.png?width=1419&height=790' },
// ]

// const FINAL_QUOTE = 'Walk the project before the first brick is laid.'
// const INDEX_DURATION = 4.5
// const HOLD = 0.4
// const VELLUM = '#f7efdc'
// const SCRUB_DURATION = 6

// export default function Applications() {
//     const sectionRef = useRef<HTMLElement>(null)
//     const stageRef = useRef<HTMLDivElement>(null)
//     const copyRef = useRef<HTMLDivElement>(null)
//     const frameRef = useRef<HTMLDivElement>(null)
//     const marksRef = useRef<HTMLDivElement>(null)
//     const overlayRef = useRef<HTMLDivElement>(null)
//     const quoteRef = useRef<HTMLDivElement>(null)
//     const dragStartX = useRef<number | null>(null)

//     const [activeIndex, setActiveIndex] = useState(0)
//     const indexProxy = useRef({ value: 0 })
//     const lastIndex = useRef(0)
//     const stRef = useRef<ScrollTrigger | null>(null)
//     const tlRef = useRef<gsap.core.Timeline | null>(null)

//     const selectProject = (requestedIndex: number) => {
//         const nextIndex = Math.max(0, Math.min(projectTypes.length - 1, requestedIndex))
//         const trigger = stRef.current
//         const timeline = tlRef.current

//         if (!trigger || !timeline) {
//             indexProxy.current.value = nextIndex
//             lastIndex.current = nextIndex
//             setActiveIndex(nextIndex)
//             return
//         }

//         const indexTime = (nextIndex / (projectTypes.length - 1)) * INDEX_DURATION
//         const timelineProgress = indexTime / timeline.totalDuration()
//         const scrollTop = trigger.start + (trigger.end - trigger.start) * timelineProgress
//         const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

//         window.scrollTo({ top: scrollTop, behavior })
//     }

//     const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
//         if (event.pointerType === 'mouse' && event.button !== 0) return
//         dragStartX.current = event.clientX
//     }

//     const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
//         if (dragStartX.current === null) return

//         const distance = event.clientX - dragStartX.current
//         dragStartX.current = null

//         if (Math.abs(distance) < 48) return
//         selectProject(activeIndex + (distance < 0 ? 1 : -1))
//     }

//     useEffect(() => {
//         const section = sectionRef.current
//         const stage = stageRef.current
//         const copy = copyRef.current
//         const frame = frameRef.current
//         const marks = marksRef.current
//         const overlay = overlayRef.current
//         const quote = quoteRef.current

//         if (!section || !stage || !copy || !frame || !marks || !overlay || !quote) return

//         const mm = gsap.matchMedia()

//         mm.add({ isDesktop: '(min-width: 768px)', isMobile: '(max-width: 767px)' }, (ctx) => {
//             const { isDesktop } = ctx.conditions as { isDesktop: boolean }

//             const rest = isDesktop
//                 ? { left: '27vw', top: '7svh', width: '68vw', height: '82svh' }
//                 : { left: '4vw', top: '26svh', width: '92vw', height: '44svh' }

//             const words = quote.querySelectorAll<HTMLElement>('.q-word')

//             gsap.set(frame, rest)
//             gsap.set(overlay, { opacity: 0.24 })
//             gsap.set(quote, { autoAlpha: 0 })
//             gsap.set(words, { yPercent: 115 })

//             gsap.fromTo(
//                 section,
//                 { borderTopLeftRadius: '50vw', borderTopRightRadius: '50vw' },
//                 {
//                     borderTopLeftRadius: '0vw',
//                     borderTopRightRadius: '0vw',
//                     ease: 'none',
//                     scrollTrigger: {
//                         trigger: section,
//                         start: 'top bottom',
//                         end: 'top top',
//                         scrub: true,
//                     },
//                 }
//             )

//             const tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: section,
//                     start: 'top top',
//                     end: () => `+=${window.innerHeight * SCRUB_DURATION}`,
//                     scrub: 0.6,
//                     pin: stage,
//                     anticipatePin: 1,
//                     invalidateOnRefresh: true,
//                 },
//             })

//             tl.to(
//                 indexProxy.current,
//                 {
//                     value: projectTypes.length - 1,
//                     ease: 'none',
//                     duration: INDEX_DURATION,
//                     onUpdate: () => {
//                         const next = Math.round(indexProxy.current.value)
//                         if (next !== lastIndex.current) {
//                             lastIndex.current = next
//                             setActiveIndex(next)
//                         }
//                     },
//                 },
//                 0
//             )

//             const expand = gsap.timeline()

//             expand.to(
//                 frame,
//                 {
//                     left: 0,
//                     top: 0,
//                     width: '100vw',
//                     height: '100svh',
//                     duration: 2,
//                     ease: 'power3.inOut',
//                 },
//                 0
//             )
//             expand.to(marks, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 0)
//             expand.to(
//                 copy,
//                 { opacity: 0, x: 0, y: -30, duration: 0.8, ease: 'power2.out' },
//                 0
//             )
//             expand.to(overlay, { opacity: 0.78, duration: 2, ease: 'power1.inOut' }, 0)
//             expand.to(quote, { autoAlpha: 1, duration: 0.3 }, 1)
//             expand.to(
//                 words,
//                 { yPercent: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06 },
//                 1.05
//             )

//             tl.add(expand, `>+=${HOLD}`)

//             tlRef.current = tl
//             stRef.current = tl.scrollTrigger ?? null

//             return () => {
//                 tlRef.current = null
//                 stRef.current = null
//             }
//         })

//         return () => mm.revert()
//     }, [])

//     return (
//         <section
//             ref={sectionRef}
//             aria-label="Project types"
//             className="relative z-10 -mt-[100svh] w-full overflow-hidden bg-[#080a08]"
//         >
//             <div ref={stageRef} className="relative h-[100svh] min-h-[620px] w-full overflow-hidden" style={{ color: VELLUM }}>
//                 <div
//                     aria-hidden
//                     className="pointer-events-none absolute inset-0"
//                     style={{
//                         background:
//                             'radial-gradient(90% 80% at 50% 45%, rgba(77,91,71,0.2), transparent 72%), linear-gradient(135deg, #11140f 0%, #080a08 58%, #10120d 100%)',
//                     }}
//                 />
//                 <div
//                     aria-hidden
//                     className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-screen"
//                     style={{
//                         backgroundImage:
//                             "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
//                     }}
//                 />

//                 <div
//                     ref={copyRef}
//                     className="absolute left-[6vw] right-[6vw] top-[8svh] z-20 text-left text-[#f7efdc] md:left-[5vw] md:right-auto md:top-[17svh] md:w-[20vw]"
//                 >
//                     <span className="text-[8px] uppercase tracking-[0.24em] text-[#d5bd87] md:text-[10px]">
//                         Virtuaze / Project applications
//                     </span>
//                     <h2
//                         className="mt-2 max-w-[700px] text-2xl font-medium uppercase leading-[1.04] sm:text-3xl md:text-4xl"
//                         style={{ fontFamily: 'var(--font-decart)' }}
//                     >
//                         One digital twin for every kind of project.
//                     </h2>
//                 </div>

//                 <div
//                     ref={frameRef}
//                     onPointerDown={handlePointerDown}
//                     onPointerUp={handlePointerUp}
//                     onPointerCancel={() => { dragStartX.current = null }}
//                     className="absolute z-10 left-[4vw] top-[26svh] h-[44svh] w-[92vw] overflow-hidden bg-[#10130f] shadow-[0_36px_100px_rgba(0,0,0,0.45)] touch-pan-y cursor-grab active:cursor-grabbing md:left-[27vw] md:top-[7svh] md:h-[82svh] md:w-[68vw]"
//                 >
//                     <div className="relative h-full w-full overflow-hidden">
//                         {projectTypes.map((project, idx) => {
//                             const active = idx === activeIndex
//                             return (
//                                 <img
//                                     key={project.title}
//                                     src={project.imgSrc}
//                                     alt={active ? project.title : ''}
//                                     aria-hidden={!active}
//                                     loading={idx === 0 ? 'eager' : 'lazy'}
//                                     decoding="async"
//                                     draggable={false}
//                                     className={`absolute inset-0 h-full w-full object-contain object-center transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${active ? 'scale-100 opacity-100' : 'scale-[1.035] opacity-0'
//                                         }`}
//                                 />
//                             )
//                         })}

//                         <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-t from-[#080a08]/95 via-[#080a08]/20 to-[#080a08]/35" />

//                     </div>
//                 </div>

//                 <div className="absolute bottom-[17svh] left-[6vw] z-20 max-w-[66vw] text-[#f7efdc] md:bottom-[13svh] md:left-[5vw] md:max-w-[20vw]">
//                     {projectTypes.map((project, idx) => {
//                         const active = idx === activeIndex
//                         return (
//                             <div
//                                 key={project.title}
//                                 aria-hidden={!active}
//                                 className={`absolute bottom-0 left-0 right-0 transition-[opacity,transform] duration-500 ease-out ${active ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
//                             >
//                                 <div className="mb-1 flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-[#d5bd87] md:mb-2 md:gap-3 md:text-[10px]">
//                                     <span className="h-px w-7 bg-[#d5bd87]" />
//                                     <span>Project type</span>
//                                     <span className="text-white/55">{String(idx + 1).padStart(2, '0')} / {String(projectTypes.length).padStart(2, '0')}</span>
//                                 </div>
//                                 <h3 className="text-xl uppercase leading-tight sm:text-2xl md:text-4xl" style={{ fontFamily: 'var(--font-decart)' }}>
//                                     {project.title}
//                                 </h3>
//                                 <p className="mt-1 max-w-[42ch] text-[10px] leading-relaxed text-white/75 sm:text-xs md:mt-3 md:text-sm">
//                                     {project.subtitle}
//                                 </p>
//                             </div>
//                         )
//                     })}
//                 </div>

//                 <button
//                     type="button"
//                     onClick={() => selectProject((activeIndex + 1) % projectTypes.length)}
//                     className="group absolute bottom-[10svh] right-[6vw] z-30 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/35 bg-black/30 px-4 text-[8px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:border-[#d5bd87] hover:text-[#f5dfad] md:bottom-[13svh] md:right-[5vw] md:min-h-12 md:px-6 md:text-[10px]"
//                     aria-label="Explore the next project type"
//                 >
//                     Explore
//                     <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-4 md:w-4" />
//                 </button>

//                 <div ref={marksRef} className="pointer-events-none absolute inset-0 z-30">
//                     <div className="pointer-events-auto absolute right-[2vw] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex">
//                         <span className="text-[9px] tracking-[0.18em] text-white/65">01</span>
//                         <span className="h-8 w-px bg-white/20" />
//                         {projectTypes.map((project, idx) => (
//                             <button
//                                 key={project.title}
//                                 type="button"
//                                 onClick={() => selectProject(idx)}
//                                 aria-label={`Show ${project.title}`}
//                                 aria-current={idx === activeIndex ? 'true' : undefined}
//                                 className={`group relative h-6 w-6 rounded-full transition-colors ${idx === activeIndex ? 'bg-white/10' : 'hover:bg-white/10'}`}
//                             >
//                                 <span className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'scale-150 bg-[#d5bd87]' : 'bg-white/45 group-hover:bg-white'}`} />
//                             </button>
//                         ))}
//                         <span className="h-8 w-px bg-white/20" />
//                         <span className="text-[9px] tracking-[0.18em] text-white/65">06</span>
//                     </div>

//                     <div className="pointer-events-auto absolute bottom-[3svh] left-1/2 flex -translate-x-1/2 items-center gap-1 md:hidden">
//                         {projectTypes.map((project, idx) => (
//                             <button
//                                 key={project.title}
//                                 type="button"
//                                 onClick={() => selectProject(idx)}
//                                 aria-label={`Show ${project.title}`}
//                                 aria-current={idx === activeIndex ? 'true' : undefined}
//                                 className={`h-9 min-w-9 rounded-full px-2 text-[8px] tracking-[0.1em] transition-all ${idx === activeIndex ? 'bg-white/10 text-[#d5bd87]' : 'text-white/50'}`}
//                             >
//                                 {String(idx + 1).padStart(2, '0')}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Final full-screen quote */}
//                 <div
//                     ref={quoteRef}
//                     className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6 text-center"
//                     style={{ color: VELLUM }}
//                 >
//                     <p
//                         aria-label={FINAL_QUOTE}
//                         className="max-w-[800px] text-5xl md:text-6xl lg:text-7xl font-medium uppercase tracking-[-0.04em] leading-[1.1]"
//                         style={{ fontFamily: 'var(--font-gilroy)' }}
//                     >
//                         {FINAL_QUOTE.split(' ').map((word, i) => (
//                             <span key={i} aria-hidden className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
//                                 <span className="q-word inline-block">{word}</span>
//                             </span>
//                         ))}
//                     </p>
//                 </div>
//             </div>
//         </section>
//     )
// }





'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ProjectTypeData {
    title: string
    subtitle: string
    imgSrc: string
}

const projectTypes: ProjectTypeData[] = [
    { title: 'Residential towers', subtitle: 'Full elevation and floor control.', imgSrc: 'https://framerusercontent.com/images/PIckQ7vs3QZXJ2eLyq91rmt3hLk.png?width=1399&height=670' },
    { title: 'Luxury residences', subtitle: 'Material, detail and atmosphere in every room.', imgSrc: 'https://framerusercontent.com/images/qWNssr2VW9pk5zkdisoIYcc0Uo.png?width=1367&height=790' },
    { title: 'Masterplans', subtitle: 'Navigate phases, amenities and the bigger picture.', imgSrc: 'https://framerusercontent.com/images/QSUDPXU7sOqM557B2LAeaCrKIhc.png?width=1316&height=791' },
    { title: 'Villas & plots', subtitle: 'Plots, boundaries and custom villa walkthroughs.', imgSrc: 'https://framerusercontent.com/images/eKrcvOMsf6CXnBH0uTpWJli2vY.png?scale-down-to=1024&width=1180&height=900' },
    { title: 'Commercial & retail', subtitle: 'Footfall, leasing layouts and retail possibilities.', imgSrc: 'https://framerusercontent.com/images/venMvyC03Nyji0T9rBpLlWjBjxo.png?width=1367&height=790' },
    { title: 'International launches', subtitle: 'Touchscreen-ready experiences for every market.', imgSrc: 'https://framerusercontent.com/images/oytc7a861tIZUl4y8BOlpxFck.png?width=1419&height=790' },
]

const FINAL_QUOTE = 'Walk the project before the first brick is laid.'
const INDEX_DURATION = 4.5
const HOLD = 0.4
const VELLUM = '#f7efdc'
const SCRUB_DURATION = 6

// Reel tuning
const CARD_GAP = 0.03 // gap between cards, as a share of the stage height
const IMAGE_DRIFT = 6 // how far the image lags behind its card while moving, in percent (0 at rest)
const SIDE_DIM = 0.5 // how dark the cards above and below the active one are
const MAX_BLUR = 14 // strongest blur on leaving text, in px

const LAST = projectTypes.length - 1
const CARD_BOX = 'left-[4vw] top-[26svh] h-[44svh] w-[92vw] md:left-[27vw] md:top-[7svh] md:h-[82svh] md:w-[68vw]'

export default function Applications() {
    const sectionRef = useRef<HTMLElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const copyRef = useRef<HTMLDivElement>(null)
    const detailsRef = useRef<HTMLDivElement>(null)
    const exploreRef = useRef<HTMLButtonElement>(null)
    const marksRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const quoteRef = useRef<HTMLDivElement>(null)
    const cursorRef = useRef<HTMLDivElement>(null)

    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const imageRefs = useRef<(HTMLDivElement | null)[]>([])
    const dimRefs = useRef<(HTMLDivElement | null)[]>([])
    const detailRefs = useRef<(HTMLDivElement | null)[]>([])

    const [activeIndex, setActiveIndex] = useState(0)
    const indexProxy = useRef({ value: 0 })
    const lastIndex = useRef(0)
    const stRef = useRef<ScrollTrigger | null>(null)
    const tlRef = useRef<gsap.core.Timeline | null>(null)

    const selectProject = (requestedIndex: number) => {
        const nextIndex = Math.max(0, Math.min(LAST, requestedIndex))
        const trigger = stRef.current
        const timeline = tlRef.current

        if (!trigger || !timeline) {
            indexProxy.current.value = nextIndex
            lastIndex.current = nextIndex
            setActiveIndex(nextIndex)
            return
        }

        const indexTime = (nextIndex / LAST) * INDEX_DURATION
        const timelineProgress = indexTime / timeline.totalDuration()
        const scrollTop = trigger.start + (trigger.end - trigger.start) * timelineProgress
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

        window.scrollTo({ top: scrollTop, behavior })
    }

    useEffect(() => {
        const section = sectionRef.current
        const stage = stageRef.current
        const copy = copyRef.current
        const details = detailsRef.current
        const explore = exploreRef.current
        const marks = marksRef.current
        const overlay = overlayRef.current
        const quote = quoteRef.current
        const cursor = cursorRef.current
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
        const images = imageRefs.current.filter(Boolean) as HTMLDivElement[]
        const dims = dimRefs.current.filter(Boolean) as HTMLDivElement[]
        const detailItems = detailRefs.current.filter(Boolean) as HTMLDivElement[]
        const lastCard = cards[LAST]

        if (!section || !stage || !copy || !details || !explore || !marks || !overlay || !quote || !cursor || !lastCard) return

        const mm = gsap.matchMedia()

        mm.add(
            {
                isDesktop: '(min-width: 768px)',
                isMobile: '(max-width: 767px)',
                reduceMotion: '(prefers-reduced-motion: reduce)',
            },
            (ctx) => {
                const { isDesktop, reduceMotion } = ctx.conditions as { isDesktop: boolean; reduceMotion: boolean }

                const rest = isDesktop
                    ? { left: '27vw', top: '7svh', width: '68vw', height: '82svh' }
                    : { left: '4vw', top: '26svh', width: '92vw', height: '44svh' }

                const words = quote.querySelectorAll<HTMLElement>('.q-word')

                gsap.set(cards[0], rest)
                gsap.set(overlay, { opacity: 0 })
                gsap.set(quote, { autoAlpha: 0 })
                gsap.set(words, { yPercent: 115 })

                // Distance from one card to the next on the strip
                let pitch = 0
                const measure = () => {
                    pitch = cards[0].offsetHeight + stage.offsetHeight * CARD_GAP
                }

                // Places every card, image and text block for a fractional index (0 to 5)
                const render = (p: number) => {
                    cards.forEach((card, i) => {
                        const d = i - p
                        const ad = Math.abs(d)
                        const textAlpha = gsap.utils.clamp(0, 1, 1 - ad * 2.4)

                        gsap.set(card, { y: d * pitch, autoAlpha: ad > 1.7 ? 0 : 1 })
                        gsap.set(images[i], { yPercent: -d * IMAGE_DRIFT })
                        gsap.set(dims[i], { opacity: Math.min(ad, 1) * SIDE_DIM })
                        gsap.set(detailItems[i], {
                            opacity: textAlpha,
                            y: d * 22,
                            filter: reduceMotion || ad < 0.01 ? 'none' : `blur(${Math.min(ad * 16, MAX_BLUR)}px)`,
                        })
                    })

                    const next = Math.round(p)
                    if (next !== lastIndex.current) {
                        lastIndex.current = next
                        setActiveIndex(next)
                    }
                }

                measure()
                render(indexProxy.current.value)

                // Scroll rests only on a card or on the finished quote
                let snapPoints: number[] = [0, 1]

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${window.innerHeight * SCRUB_DURATION}`,
                        scrub: 0.6,
                        pin: stage,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        snap: {
                            snapTo: (value) => gsap.utils.snap(snapPoints, value),
                            duration: reduceMotion ? 0.01 : { min: 0.25, max: 0.7 },
                            delay: 0.08,
                            ease: 'power2.out',
                        },
                        onRefresh: () => {
                            measure()
                            render(indexProxy.current.value)
                        },
                    },
                })

                tl.to(
                    indexProxy.current,
                    {
                        value: LAST,
                        ease: 'none',
                        duration: INDEX_DURATION,
                        onUpdate: () => render(indexProxy.current.value),
                    },
                    0
                )

                const expand = gsap.timeline()

                expand.to(
                    lastCard,
                    {
                        left: 0,
                        top: 0,
                        width: '100vw',
                        height: '100svh',
                        duration: 2,
                        ease: 'power3.inOut',
                    },
                    0
                )
                expand.to([marks, explore], { autoAlpha: 0, duration: 0.5, ease: 'power1.out' }, 0)
                expand.to([copy, details], { opacity: 0, y: -30, duration: 0.8, ease: 'power2.out' }, 0)
                expand.to(overlay, { opacity: 0.78, duration: 2, ease: 'power1.inOut' }, 0)
                expand.to(quote, { autoAlpha: 1, duration: 0.3 }, 1)
                expand.to(
                    words,
                    { yPercent: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06 },
                    1.05
                )

                tl.add(expand, `>+=${HOLD}`)

                const total = tl.totalDuration()
                snapPoints = [...projectTypes.map((_, i) => ((i / LAST) * INDEX_DURATION) / total), 1]

                tlRef.current = tl
                stRef.current = tl.scrollTrigger ?? null

                // Press and drag the strip with a mouse. Touch keeps native scrolling.
                let dragging = false
                let startY = 0
                let startScroll = 0

                const onPointerDown = (event: PointerEvent) => {
                    if (event.pointerType !== 'mouse' || event.button !== 0) return
                    if ((event.target as HTMLElement).closest('button')) return
                    dragging = true
                    startY = event.clientY
                    startScroll = window.scrollY
                    stage.setPointerCapture(event.pointerId)
                    stage.style.userSelect = 'none'
                    cursor.textContent = 'Drag'
                    gsap.to(cursor, { scale: 0.76, duration: 0.25 })
                    event.preventDefault()
                }

                const onPointerMove = (event: PointerEvent) => {
                    moveCursorX(event.clientX - stage.getBoundingClientRect().left)
                    moveCursorY(event.clientY - stage.getBoundingClientRect().top)

                    const trigger = tl.scrollTrigger
                    if (!dragging || !trigger || !pitch) return
                    const scrollPerCard = ((trigger.end - trigger.start) * (INDEX_DURATION / LAST)) / total
                    window.scrollTo(0, startScroll - (event.clientY - startY) * (scrollPerCard / pitch))
                }

                const onPointerEnd = () => {
                    if (!dragging) return
                    dragging = false
                    stage.style.userSelect = ''
                    cursor.textContent = 'Scroll'
                    gsap.to(cursor, { scale: 1, duration: 0.25 })
                }

                // Ring that follows the mouse
                gsap.set(cursor, { xPercent: -50, yPercent: -50, x: stage.offsetWidth / 2, y: stage.offsetHeight / 2 })
                const moveCursorX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' })
                const moveCursorY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' })

                stage.addEventListener('pointerdown', onPointerDown)
                stage.addEventListener('pointermove', onPointerMove)
                stage.addEventListener('pointerup', onPointerEnd)
                stage.addEventListener('pointercancel', onPointerEnd)

                return () => {
                    stage.removeEventListener('pointerdown', onPointerDown)
                    stage.removeEventListener('pointermove', onPointerMove)
                    stage.removeEventListener('pointerup', onPointerEnd)
                    stage.removeEventListener('pointercancel', onPointerEnd)
                    stage.style.userSelect = ''
                    tlRef.current = null
                    stRef.current = null
                }
            }
        )

        return () => mm.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            aria-label="Project types"
            className="relative z-10 -mt-[100svh] w-full overflow-hidden bg-[#080a08]"
        >
            <div ref={stageRef} className="relative h-[100svh] min-h-[620px] w-full touch-pan-y overflow-hidden" style={{ color: VELLUM }}>
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(90% 80% at 50% 45%, rgba(77,91,71,0.2), transparent 72%), linear-gradient(135deg, #11140f 0%, #080a08 58%, #10120d 100%)',
                    }}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-screen"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                    }}
                />

                <div
                    ref={copyRef}
                    className="pointer-events-none absolute left-[6vw] right-[6vw] top-[8svh] z-20 text-left text-[#f7efdc] md:left-[5vw] md:right-auto md:top-[17svh] md:w-[20vw]"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#d5bd87] sm:text-xs">
                        Virtuaze / Project applications
                    </span>
                    <h2
                        className="mt-2 max-w-[700px] text-3xl font-medium uppercase leading-[1.04] sm:text-4xl md:text-5xl"
                        style={{ fontFamily: 'var(--font-decart)' }}
                    >
                        One digital twin for every kind of project.
                    </h2>
                </div>

                {/* The reel: one card per project type on a vertical strip */}
                {projectTypes.map((project, idx) => {
                    const active = idx === activeIndex
                    const isLast = idx === LAST
                    return (
                        <div
                            key={project.title}
                            ref={(el) => { cardRefs.current[idx] = el }}
                            aria-hidden={!active}
                            className={`absolute ${CARD_BOX} ${isLast ? 'z-[11]' : 'z-10'} cursor-grab overflow-hidden bg-[#10130f] shadow-[0_36px_100px_rgba(0,0,0,0.45)] will-change-transform active:cursor-grabbing`}
                        >
                            <div ref={(el) => { imageRefs.current[idx] = el }} className="absolute inset-0 will-change-transform">
                                <img
                                    src={project.imgSrc}
                                    alt={active ? project.title : ''}
                                    loading={idx < 2 ? 'eager' : 'lazy'}
                                    decoding="async"
                                    draggable={false}
                                    className="h-full w-full select-none object-contain object-center"
                                />
                            </div>
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080a08]/45 via-transparent to-transparent" />
                            {isLast && <div ref={overlayRef} className="absolute inset-0 bg-[#080a08] opacity-0" />}
                            <div ref={(el) => { dimRefs.current[idx] = el }} className="pointer-events-none absolute inset-0 bg-[#080a08] opacity-0" />
                        </div>
                    )
                })}

                <div
                    ref={detailsRef}
                    className="pointer-events-none absolute bottom-[17svh] left-[6vw] z-20 w-[88vw] text-[#f7efdc] md:bottom-[13svh] md:left-[5vw] md:w-[20vw]"
                >
                    {projectTypes.map((project, idx) => (
                        <div
                            key={project.title}
                            ref={(el) => { detailRefs.current[idx] = el }}
                            aria-hidden={idx !== activeIndex}
                            className={`absolute bottom-0 left-0 right-0 will-change-[transform,opacity,filter] ${idx === 0 ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#d5bd87] sm:text-xs md:mb-2 md:gap-3">
                                <span className="h-px w-7 bg-[#d5bd87]" />
                                <span>Project type</span>
                                <span className="text-white/55">{String(idx + 1).padStart(2, '0')} / {String(projectTypes.length).padStart(2, '0')}</span>
                            </div>
                            <h3 className="text-2xl uppercase leading-tight sm:text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-decart)' }}>
                                {project.title}
                            </h3>
                            <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-white/75 sm:text-base md:mt-3 md:text-sm">
                                {project.subtitle}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    ref={exploreRef}
                    type="button"
                    onClick={() => selectProject((activeIndex + 1) % projectTypes.length)}
                    className="group absolute bottom-[10svh] right-[6vw] z-30 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/35 bg-black/30 px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:border-[#d5bd87] hover:text-[#f5dfad] md:bottom-[13svh] md:right-[5vw] md:min-h-12 md:px-6 md:text-xs"
                    aria-label="Explore the next project type"
                >
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-4 md:w-4" />
                </button>

                <div ref={marksRef} className="pointer-events-none absolute inset-0 z-30">
                    {/* Ring that follows the mouse; shown only on devices with a mouse */}
                    <div
                        ref={cursorRef}
                        aria-hidden
                        className="absolute left-0 top-0 hidden h-[84px] w-[84px] items-center justify-center rounded-full border border-[#f7efdc]/60 text-[9px] uppercase tracking-[0.24em] text-[#f7efdc] [@media(hover:hover)_and_(pointer:fine)]:flex"
                    >
                        Scroll
                    </div>

                    <div className="pointer-events-auto absolute right-[2vw] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex">
                        <span className="text-[9px] tracking-[0.18em] text-white/65">01</span>
                        <span className="h-8 w-px bg-white/20" />
                        {projectTypes.map((project, idx) => (
                            <button
                                key={project.title}
                                type="button"
                                onClick={() => selectProject(idx)}
                                aria-label={`Show ${project.title}`}
                                aria-current={idx === activeIndex ? 'true' : undefined}
                                className={`group relative h-6 w-6 rounded-full transition-colors ${idx === activeIndex ? 'bg-white/10' : 'hover:bg-white/10'}`}
                            >
                                <span className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'scale-150 bg-[#d5bd87]' : 'bg-white/45 group-hover:bg-white'}`} />
                            </button>
                        ))}
                        <span className="h-8 w-px bg-white/20" />
                        <span className="text-[9px] tracking-[0.18em] text-white/65">06</span>
                    </div>

                    <div className="pointer-events-auto absolute bottom-[3svh] left-1/2 flex -translate-x-1/2 items-center gap-1 md:hidden">
                        {projectTypes.map((project, idx) => (
                            <button
                                key={project.title}
                                type="button"
                                onClick={() => selectProject(idx)}
                                aria-label={`Show ${project.title}`}
                                aria-current={idx === activeIndex ? 'true' : undefined}
                                className={`h-9 min-w-9 rounded-full px-2 text-[8px] tracking-[0.1em] transition-all ${idx === activeIndex ? 'bg-white/10 text-[#d5bd87]' : 'text-white/50'}`}
                            >
                                {String(idx + 1).padStart(2, '0')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Final full-screen quote */}
                <div
                    ref={quoteRef}
                    className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6 text-center"
                    style={{ color: VELLUM }}
                >
                    <p
                        aria-label={FINAL_QUOTE}
                        className="max-w-[800px] text-5xl md:text-6xl lg:text-7xl font-medium uppercase tracking-[-0.04em] leading-[1.1]"
                        style={{ fontFamily: 'var(--font-gilroy)' }}
                    >
                        {FINAL_QUOTE.split(' ').map((word, i) => (
                            <span key={i} aria-hidden className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                                <span className="q-word inline-block">{word}</span>
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </section>
    )
}