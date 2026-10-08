// 'use client'

// import React, { useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { Eye, Building2, MousePointerClick } from 'lucide-react'

// if (typeof window !== 'undefined') {
//     gsap.registerPlugin(ScrollTrigger)
// }

// const services = [
//     {
//         question: "How do traditional brochures and floor plans fall short?",
//         icon: Eye,
//         title: 'Clear Understanding',
//         description: "Brochures leave buyers imagining, and floor plans can't show the view or the evening light. With digital twins, buyers see everything. No imagination needed.",
//     },
//     {
//         question: "Why aren't physical sample flats enough for buyers?",
//         icon: Building2,
//         title: 'Clear Confidence',
//         description: "Sample flats show one unit, take months to build, and can't show the clubhouse or the tower next door. Now, every space, amenity and view is fully explorable.",
//     },
//     {
//         question: "Why do static walkthrough videos slow down sales?",
//         icon: MousePointerClick,
//         title: 'Clear Decisions',
//         description: "Walkthrough videos can't be asked questions. You can't turn left, open the balcony door, or compare layouts. When buyers understand the project interactively, they decide faster.",
//     }
// ]

// // Splits a word into per-letter spans so each letter can be animated on its own
// function SplitChars({ text, charClassName }: { text: string; charClassName: string }) {
//     return (
//         <>
//             {text.split(' ').map((word, wi, words) => (
//                 <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
//                     {word.split('').map((ch, ci) => (
//                         <span key={ci} className={`inline-block will-change-transform ${charClassName}`}>
//                             {ch}
//                         </span>
//                     ))}
//                     {wi < words.length - 1 && ' '}
//                 </span>
//             ))}
//         </>
//     )
// }

// export default function ProblemSolution() {
//     const sectionRef = useRef<HTMLDivElement>(null)
//     const cardsRef = useRef<(HTMLDivElement | null)[]>([])
//     const videoWrapperRef = useRef<HTMLElement>(null)
//     const videoInnerRef = useRef<HTMLDivElement>(null)
//     const textContentRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             // 1. Headline letters scatter in from random directions and assemble
//             const chars1 = gsap.utils.toArray<HTMLElement>('.fly-char-1')
//             if (chars1.length > 0) {
//                 gsap.fromTo(
//                     chars1,
//                     {
//                         x: () => gsap.utils.random(-500, 500),
//                         y: () => gsap.utils.random(-300, 300),
//                         rotation: () => gsap.utils.random(-180, 180),
//                         scale: () => gsap.utils.random(0, 2.5),
//                         opacity: 0,
//                         filter: 'blur(8px)',
//                     },
//                     {
//                         x: 0,
//                         y: 0,
//                         rotation: 0,
//                         scale: 1,
//                         opacity: 1,
//                         filter: 'blur(0px)',
//                         duration: 1.6,
//                         ease: 'expo.out',
//                         stagger: { each: 0.03, from: 'random' },
//                         scrollTrigger: {
//                             trigger: chars1[0],
//                             start: 'top 85%',
//                             toggleActions: 'play none none reverse',
//                         },
//                     }
//                 )
//             }

//             // 2. "Don't watch it." swings in from alternating sides, "Walk it." drops in from above
//             const words2 = gsap.utils.toArray<HTMLElement>('.fly-word-2')
//             const drops2 = gsap.utils.toArray<HTMLElement>('.drop-word-2')
//             if (words2.length > 0) {
//                 gsap.timeline({
//                     scrollTrigger: {
//                         trigger: words2[0],
//                         start: 'top 85%',
//                         toggleActions: 'play none none reverse',
//                     },
//                 })
//                     .fromTo(
//                         words2,
//                         {
//                             x: (i) => (i % 2 === 0 ? -600 : 600),
//                             rotationY: (i) => (i % 2 === 0 ? -90 : 90),
//                             opacity: 0,
//                         },
//                         { x: 0, rotationY: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.12 }
//                     )
//                     .fromTo(
//                         drops2,
//                         { y: -300, rotation: (i) => (i % 2 === 0 ? -25 : 25), opacity: 0 },
//                         { y: 0, rotation: 0, opacity: 1, duration: 1.2, ease: 'bounce.out', stagger: 0.15 },
//                         '-=0.6'
//                     )
//             }

//             // 3. Tags wipe open while their letter-spacing collapses
//             gsap.utils.toArray<HTMLElement>('.fly-tag').forEach((el) => {
//                 gsap.fromTo(
//                     el,
//                     { clipPath: 'inset(0 100% 0 0)', letterSpacing: '0.6em', opacity: 0 },
//                     {
//                         clipPath: 'inset(0 0% 0 0)',
//                         letterSpacing: '0.1em',
//                         opacity: 1,
//                         duration: 1.2,
//                         ease: 'power3.inOut',
//                         scrollTrigger: {
//                             trigger: el,
//                             start: 'top 85%',
//                             toggleActions: 'play none none reverse',
//                         },
//                     }
//                 )
//             })

//             // 4. Paragraphs glide in from alternating sides with a skew and blur
//             gsap.utils.toArray<HTMLElement>('.fly-para').forEach((el, i) => {
//                 gsap.fromTo(
//                     el,
//                     { x: i % 2 === 0 ? 120 : -120, skewX: i % 2 === 0 ? -12 : 12, opacity: 0, filter: 'blur(6px)' },
//                     {
//                         x: 0,
//                         skewX: 0,
//                         opacity: 1,
//                         filter: 'blur(0px)',
//                         duration: 1.4,
//                         delay: 0.3,
//                         ease: 'power3.out',
//                         scrollTrigger: {
//                             trigger: el,
//                             start: 'top 90%',
//                             toggleActions: 'play none none reverse',
//                         },
//                     }
//                 )
//             })

//             // 5. CTA button pops in with a spin
//             gsap.utils.toArray<HTMLElement>('.fly-btn').forEach((el) => {
//                 gsap.fromTo(
//                     el,
//                     { scale: 0, rotation: -15, opacity: 0 },
//                     {
//                         scale: 1,
//                         rotation: 0,
//                         opacity: 1,
//                         duration: 1,
//                         delay: 0.6,
//                         ease: 'back.out(2.5)',
//                         scrollTrigger: {
//                             trigger: el,
//                             start: 'top 95%',
//                             toggleActions: 'play none none reverse',
//                         },
//                     }
//                 )
//             })

//             // 6. Cards fly in from alternating sides, then their content builds up piece by piece
//             cardsRef.current.forEach((card, i) => {
//                 if (!card) return
//                 const fromLeft = i % 2 === 0
//                 gsap.timeline({
//                     scrollTrigger: {
//                         trigger: card,
//                         start: 'top 85%',
//                         toggleActions: 'play none none reverse',
//                     },
//                 })
//                     .fromTo(
//                         card,
//                         { x: fromLeft ? -250 : 250, y: 80, rotation: fromLeft ? -6 : 6, opacity: 0, scale: 0.9 },
//                         { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }
//                     )
//                     .fromTo(
//                         card.querySelector('.card-icon'),
//                         { rotation: -360, scale: 0, opacity: 0 },
//                         { rotation: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(2)' },
//                         '-=0.6'
//                     )
//                     .fromTo(
//                         card.querySelector('.card-question'),
//                         { x: -60, opacity: 0, letterSpacing: '0.6em' },
//                         { x: 0, opacity: 1, letterSpacing: '0.2em', duration: 0.8, ease: 'power3.out' },
//                         '<'
//                     )
//                     .fromTo(
//                         card.querySelectorAll('.card-title-char'),
//                         { y: 40, rotationX: -90, opacity: 0 },
//                         { y: 0, rotationX: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.03 },
//                         '-=0.5'
//                     )
//                     .fromTo(
//                         card.querySelector('.card-desc'),
//                         { y: 24, opacity: 0, filter: 'blur(6px)' },
//                         { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
//                         '-=0.4'
//                     )
//             })

//             if (videoWrapperRef.current && videoInnerRef.current && textContentRef.current) {
//                 // Animate text fading out and moving up
//                 gsap.to(textContentRef.current, {
//                     opacity: 0,
//                     y: -50,
//                     ease: 'power2.inOut',
//                     scrollTrigger: {
//                         trigger: videoWrapperRef.current,
//                         start: 'top top',
//                         end: 'center top',
//                         scrub: 1,
//                     }
//                 })

//                 // Animate video reveal with a soft zoom so it fills the frame without aggressive edge cropping
//                 gsap.fromTo(
//                     videoInnerRef.current,
//                     {
//                         scale: 0.96,
//                         opacity: 0.88
//                     },
//                     {
//                         scale: 1,
//                         opacity: 1,
//                         ease: 'power2.inOut',
//                         scrollTrigger: {
//                             trigger: videoWrapperRef.current,
//                             start: 'top top',
//                             end: 'bottom bottom',
//                             scrub: 1,
//                         }
//                     }
//                 )
//             }

//             const refreshId = requestAnimationFrame(() => {
//                 ScrollTrigger.refresh()
//             })

//             return () => cancelAnimationFrame(refreshId)
//         }, sectionRef)

//         return () => ctx.revert()
//     }, [])

//     return (
//         <div id="solutions" ref={sectionRef} className="w-full scroll-mt-24 bg-background flex flex-col relative z-10 font-sans">
//             <section className="overflow-x-clip text-foreground py-14 md:py-15 px-6 md:px-12">

//                 {/* HEADER */}
//                 <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10 md:gap-24 mb-20 md:mb-32">
//                     <div className="w-full md:w-1/4 shrink-0 overflow-hidden">
//                         <span className="fly-tag inline-block px-3 py-1.5 bg-foreground/5 text-foreground/70 text-[10px] md:text-xs tracking-widest uppercase border border-foreground/10">
//                             Why a Digital Twin
//                         </span>
//                     </div>
//                     <div className="w-full md:w-3/4">
//                         <h3 aria-label="Renders show. Digital Twins convince." className="text-4xl md:text-6xl lg:text-6xl font-medium uppercase tracking-[-0.04em] leading-[1.1] mb-8 flex flex-wrap gap-x-3 md:gap-x-4" style={{ fontFamily: 'var(--font-gilroy)' }}>
//                             {['Renders', 'show.'].map((w) => (
//                                 <span key={w} className="inline-block"><SplitChars text={w} charClassName="fly-char-1" /></span>
//                             ))}
//                             <div className="w-full h-0"></div>
//                             {['Digital', 'Twins', 'convince.'].map((w) => (
//                                 <span key={w} className="inline-block text-[#bf953f]"><SplitChars text={w} charClassName="fly-char-1" /></span>
//                             ))}
//                         </h3>
//                         <p className="fly-para text-foreground/70 text-base md:text-lg font-light leading-relaxed max-w-2xl">
//                             Every project already has a brochure, a set of renders and maybe a sample flat. Buyers still leave with the same question: <span className="italic text-[#bf953f]">"What will I actually get?"</span>
//                         </p>
//                     </div>
//                 </div>

//                 {/* WHAT WE DO WITH QUESTIONS & LOTTIE ANIMATIONS */}
//                 <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10 md:gap-24">
//                     <div className="w-full md:w-1/4 shrink-0 relative overflow-hidden">
//                         <div className="sticky top-24 md:top-32 z-10 fly-tag mb-8 md:mb-0">
//                             <span className="inline-block px-3 py-1.5 bg-foreground/5 text-foreground/70 text-[10px] md:text-xs tracking-widest uppercase border border-foreground/10 backdrop-blur-md">
//                                 What We Do
//                             </span>
//                         </div>
//                     </div>
//                     <div className="w-full md:w-3/4 relative flex flex-col pb-32">
//                         {services.map((svc, i) => (
//                             <div
//                                 key={i}
//                                 ref={(el) => {
//                                     cardsRef.current[i] = el
//                                 }}
//                                 className="sticky bg-background/90 border border-foreground/15 rounded-2xl md:rounded-3xl p-8 md:p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl flex flex-col md:flex-row gap-6 md:gap-10 items-start will-change-transform opacity-0"
//                                 style={{
//                                     top: `calc(8rem + ${i * 1.5}rem)`,
//                                     zIndex: i + 1,
//                                     marginBottom: '5px'
//                                 }}
//                             >
//                                 <div className="shrink-0 w-16 md:w-24 pt-1 flex items-start justify-center">
//                                     <span className="card-icon inline-block text-[#bf953f]/80">
//                                         <svc.icon className="w-12 h-12 md:w-12 md:h-12" strokeWidth={1.5} />
//                                     </span>
//                                 </div>
//                                 <div>
//                                     <p className="card-question text-xs uppercase tracking-[0.2em] text-[#bf953f] font-medium mb-2">
//                                         {svc.question}
//                                     </p>
//                                     <h4 aria-label={svc.title} className="text-xl md:text-3xl font-light mb-3 md:mb-4 [perspective:600px]">
//                                         <SplitChars text={svc.title} charClassName="card-title-char" />
//                                     </h4>
//                                     <p className="card-desc text-foreground/70 text-sm md:text-base leading-relaxed font-light">{svc.description}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* COMBINED TEXT & VIDEO REVEAL SECTION */}
//             <section ref={videoWrapperRef} className="relative w-full h-[300vh] bg-background">
//                 <div className="sticky top-0 w-full h-[100vh] overflow-hidden flex flex-col items-center justify-start">
                    
//                     {/* TEXT CONTENT (Fades out in background) */}
//                     <div ref={textContentRef} className="absolute top-0 left-0 w-full pt-[12vh] md:pt-[4vh] px-6 md:px-12 flex flex-col items-center text-center z-0 will-change-transform">
//                         <span className="fly-tag inline-block px-3 py-1.5 mb-8 bg-foreground/5 text-foreground/70 text-[10px] md:text-xs tracking-widest uppercase border border-foreground/10">
//                             Interactive Experience
//                         </span>
//                         <h2 className="text-4xl md:text-6xl lg:text-6xl font-medium uppercase tracking-[-0.04em] text-foreground mb-8 leading-[1.1] flex flex-wrap justify-center gap-x-3 md:gap-x-4 [perspective:1000px]" style={{ fontFamily: 'var(--font-gilroy)' }}>
//                             <span className="fly-word-2 inline-block will-change-transform">Don't</span>
//                             <span className="fly-word-2 inline-block will-change-transform">watch</span>
//                             <span className="fly-word-2 inline-block will-change-transform">it.</span>
//                             <br className="hidden md:block w-full h-0"/>
//                             <span className="drop-word-2 inline-block text-[#bf953f] will-change-transform">Walk</span>
//                             <span className="drop-word-2 inline-block text-[#bf953f] will-change-transform">it.</span>
//                         </h2>
//                         <p className="fly-para text-foreground/70 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-12">
//                             This is a live Digital Twin of <span className="text-foreground font-medium">North Wind Sanctuary, Noida</span>. Fly over the township, step into a <span className="text-foreground font-medium">3 BHK</span>, switch to sunset and check which units are still available — exactly what your buyers will do.
//                         </p>
//                         <a
//                             href="#explore"
//                             className="fly-btn group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#bf953f] text-[#07101c] font-medium tracking-widest text-xs uppercase transition-all duration-300 hover:bg-[#fcf6ba] hover:shadow-[0_0_30px_rgba(191,149,63,0.5)]"
//                         >
//                             <span>Start exploring</span>
//                             <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">→</span>
//                         </a>
//                     </div>

//                     {/* VIDEO REVEAL (Expands from bottom) */}
//                     <div ref={videoInnerRef} className="absolute inset-0 z-10 w-full h-full overflow-hidden will-change-transform">
//                         <video
//                             src="/v2.mp4"
//                             className="absolute inset-0 h-full w-full object-cover object-center"
//                             autoPlay
//                             loop
//                             muted
//                             playsInline
//                         />
//                         <div className="absolute inset-0 bg-black/10 pointer-events-none" />
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }



'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, Building2, MousePointerClick } from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const services = [
    {
        question: "How do traditional brochures and floor plans fall short?",
        icon: Eye,
        title: 'Clear Understanding',
        description: "Brochures leave buyers imagining, and floor plans can't show the view or the evening light. With digital twins, buyers see everything. No imagination needed.",
    },
    {
        question: "Why aren't physical sample flats enough for buyers?",
        icon: Building2,
        title: 'Clear Confidence',
        description: "Sample flats show one unit, take months to build, and can't show the clubhouse or the tower next door. Now, every space, amenity and view is fully explorable.",
    },
    {
        question: "Why do static walkthrough videos slow down sales?",
        icon: MousePointerClick,
        title: 'Clear Decisions',
        description: "Walkthrough videos can't be asked questions. You can't turn left, open the balcony door, or compare layouts. When buyers understand the project interactively, they decide faster.",
    }
]

const GOLD = '#bf953f'

// Splits text into per-letter spans so each letter can fly on its own
function SplitChars({ text, charClassName }: { text: string; charClassName: string }) {
    return (
        <>
            {text.split(' ').map((word, wi, words) => (
                <React.Fragment key={wi}>
                    <span aria-hidden="true" className="inline-block whitespace-nowrap">
                        {word.split('').map((ch, ci) => (
                            <span key={ci} className={`inline-block will-change-transform ${charClassName}`}>
                                {ch}
                            </span>
                        ))}
                    </span>
                    {/* The space sits outside the word so the browser keeps it */}
                    {wi < words.length - 1 ? ' ' : null}
                </React.Fragment>
            ))}
        </>
    )
}

// Splits text into per-word spans; screen readers get the plain sentence
function Words({ text, wordClassName = 'fly-word' }: { text: string; wordClassName?: string }) {
    const words = text.split(' ')
    return (
        <>
            <span className="sr-only">{text}</span>
            {words.map((word, i) => (
                <React.Fragment key={i}>
                    <span aria-hidden="true" className={`inline-block will-change-transform ${wordClassName}`}>
                        {word}
                    </span>
                    {i < words.length - 1 ? ' ' : null}
                </React.Fragment>
            ))}
        </>
    )
}

// Thin gold line down a left column that draws itself as you scroll
function ColumnRule() {
    return (
        <span
            aria-hidden="true"
            className="col-rule pointer-events-none absolute bottom-0 left-0 top-14 hidden w-px origin-top bg-gradient-to-b from-[#bf953f]/60 via-[#bf953f]/20 to-transparent md:block"
        />
    )
}

export default function ProblemSolution() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const videoWrapperRef = useRef<HTMLElement>(null)
    const videoInnerRef = useRef<HTMLDivElement>(null)
    const textContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = sectionRef.current
        if (!root) return

        const mm = gsap.matchMedia()

        mm.add(
            {
                isDesktop: '(min-width: 768px)',
                reduceMotion: '(prefers-reduced-motion: reduce)',
            },
            (ctx) => {
                const { isDesktop, reduceMotion } = ctx.conditions as { isDesktop: boolean; reduceMotion: boolean }

                // With reduced motion everything simply stays visible
                if (reduceMotion) return

                const q = (selector: string, scope: ParentNode = root) => Array.from(scope.querySelectorAll<HTMLElement>(selector))
                // Travel distances shrink on phones so nothing flies far off screen
                const amp = isDesktop ? 1 : 0.4
                const replay = (trigger: Element, start = 'top 85%') => ({
                    trigger,
                    start,
                    toggleActions: 'play none none reverse',
                })

                // 1. Headline letters scatter in from random directions and assemble
                const headline = root.querySelector('.headline-1')
                const chars1 = q('.fly-char-1')
                if (headline && chars1.length) {
                    gsap.fromTo(
                        chars1,
                        {
                            x: () => gsap.utils.random(-500, 500) * amp,
                            y: () => gsap.utils.random(-300, 300) * amp,
                            rotation: () => gsap.utils.random(-180, 180),
                            scale: () => gsap.utils.random(0, 2.5),
                            opacity: 0,
                            filter: 'blur(8px)',
                        },
                        {
                            x: 0,
                            y: 0,
                            rotation: 0,
                            scale: 1,
                            opacity: 1,
                            filter: 'blur(0px)',
                            duration: 1.6,
                            ease: 'expo.out',
                            stagger: { each: 0.03, from: 'random' },
                            scrollTrigger: replay(headline),
                        }
                    )
                }

                // 2. Paragraph words rise and tip forward one after another
                q('.fly-words').forEach((block) => {
                    gsap.fromTo(
                        q('.fly-word', block),
                        { y: 34, rotationX: -70, opacity: 0, filter: 'blur(6px)' },
                        {
                            y: 0,
                            rotationX: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                            duration: 0.9,
                            ease: 'power3.out',
                            stagger: 0.022,
                            delay: 0.2,
                            scrollTrigger: replay(block, 'top 88%'),
                        }
                    )
                })

                // 3. Tags wipe open while their letter spacing tightens
                q('.fly-tag').forEach((el) => {
                    gsap.fromTo(
                        el,
                        { clipPath: 'inset(0 100% 0 0)', letterSpacing: isDesktop ? '0.6em' : '0.35em', opacity: 0 },
                        {
                            clipPath: 'inset(0 0% 0 0)',
                            letterSpacing: '0.1em',
                            opacity: 1,
                            duration: 1.2,
                            ease: 'power3.inOut',
                            scrollTrigger: replay(el),
                        }
                    )
                })

                // 4. Left-column lines draw down as the column scrolls past
                q('.col-rule').forEach((rule) => {
                    gsap.fromTo(
                        rule,
                        { scaleY: 0 },
                        {
                            scaleY: 1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: rule.parentElement ?? rule,
                                start: 'top 80%',
                                end: 'bottom 60%',
                                scrub: true,
                            },
                        }
                    )
                })

                // 5. "Don't watch it." swings in from alternating sides, "Walk it." drops in from above
                const words2 = q('.fly-word-2')
                const drops2 = q('.drop-word-2')
                if (words2.length) {
                    gsap.timeline({ scrollTrigger: replay(words2[0]) })
                        .fromTo(
                            words2,
                            {
                                x: (i) => (i % 2 === 0 ? -600 : 600) * amp,
                                rotationY: (i) => (i % 2 === 0 ? -90 : 90),
                                opacity: 0,
                            },
                            { x: 0, rotationY: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.12 }
                        )
                        .fromTo(
                            drops2,
                            { y: -300 * amp, rotation: (i) => (i % 2 === 0 ? -25 : 25), opacity: 0 },
                            { y: 0, rotation: 0, opacity: 1, duration: 1.2, ease: 'bounce.out', stagger: 0.15 },
                            '-=0.6'
                        )
                        .fromTo(
                            q('.walk-line'),
                            { scaleX: 0 },
                            { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
                            '-=0.4'
                        )
                }

                // 6. Call-to-action button pops in with a spin
                q('.fly-btn').forEach((el) => {
                    gsap.fromTo(
                        el,
                        { scale: 0, rotation: -15, opacity: 0 },
                        {
                            scale: 1,
                            rotation: 0,
                            opacity: 1,
                            duration: 1,
                            delay: 0.6,
                            ease: 'back.out(2.5)',
                            scrollTrigger: replay(el, 'top 95%'),
                        }
                    )
                })

                // 7. Cards fly in from alternating sides, then their content builds up piece by piece
                cardsRef.current.forEach((card, i) => {
                    if (!card) return
                    const fromLeft = i % 2 === 0
                    gsap.timeline({ scrollTrigger: replay(card) })
                        .fromTo(
                            card,
                            { x: (fromLeft ? -250 : 250) * amp, y: 80 * amp, rotation: fromLeft ? -6 : 6, opacity: 0, scale: 0.9 },
                            { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }
                        )
                        .fromTo(
                            q('.card-icon', card),
                            { rotation: -360, scale: 0, opacity: 0 },
                            { rotation: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(2)' },
                            '-=0.6'
                        )
                        .fromTo(
                            q('.card-question', card),
                            { x: -60 * amp, opacity: 0, letterSpacing: isDesktop ? '0.6em' : '0.35em' },
                            { x: 0, opacity: 1, letterSpacing: '0.2em', duration: 0.8, ease: 'power3.out' },
                            '<'
                        )
                        .fromTo(
                            q('.card-title-char', card),
                            { y: 40, rotationX: -90, opacity: 0 },
                            { y: 0, rotationX: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.03 },
                            '-=0.5'
                        )
                        .fromTo(
                            q('.card-word', card),
                            { y: 18, opacity: 0, filter: 'blur(4px)' },
                            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', stagger: 0.012 },
                            '-=0.4'
                        )
                })

                // 8. Intro text fades up and away while the video grows to fill the screen
                if (videoWrapperRef.current && videoInnerRef.current && textContentRef.current) {
                    gsap.to(textContentRef.current, {
                        opacity: 0,
                        y: -50,
                        ease: 'power2.inOut',
                        scrollTrigger: {
                            trigger: videoWrapperRef.current,
                            start: 'top top',
                            end: 'center top',
                            scrub: 1,
                        },
                    })

                    gsap.fromTo(
                        videoInnerRef.current,
                        { scale: 0.96, opacity: 0.88 },
                        {
                            scale: 1,
                            opacity: 1,
                            ease: 'power2.inOut',
                            scrollTrigger: {
                                trigger: videoWrapperRef.current,
                                start: 'top top',
                                end: 'bottom bottom',
                                scrub: 1,
                            },
                        }
                    )
                }
            }
        )

        const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
            cancelAnimationFrame(refreshId)
            mm.revert()
        }
    }, [])

    return (
        <div id="solutions" ref={sectionRef} className="relative z-10 flex w-full scroll-mt-24 flex-col bg-background font-sans">
            <section className="overflow-x-clip px-5 py-14 text-foreground sm:px-6 md:px-12 md:py-15">

                {/* HEADER */}
                <div className="mx-auto mb-20 flex max-w-[1200px] flex-col gap-8 md:mb-32 md:flex-row md:gap-24">
                    <div className="relative w-full shrink-0 md:w-1/4">
                        <span className="fly-tag inline-block border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[10px] uppercase tracking-widest text-foreground/70 md:text-xs">
                            Why a Digital Twin
                        </span>
                        <ColumnRule />
                    </div>
                    <div className="w-full md:w-3/4">
                        <h3
                            aria-label="Renders show. Digital Twins convince."
                            className="headline-1 mb-6 flex flex-wrap gap-x-2.5 text-[2.1rem] font-medium uppercase leading-[1.1] tracking-[-0.04em] sm:text-5xl md:mb-8 md:gap-x-4 md:text-6xl"
                            style={{ fontFamily: 'var(--font-gilroy)' }}
                        >
                            {['Renders', 'show.'].map((w) => (
                                <span key={w} className="inline-block"><SplitChars text={w} charClassName="fly-char-1" /></span>
                            ))}
                            <span className="h-0 w-full" />
                            {['Digital', 'Twins', 'convince.'].map((w) => (
                                <span key={w} className="inline-block text-[#bf953f]"><SplitChars text={w} charClassName="fly-char-1" /></span>
                            ))}
                        </h3>
                        <p className="fly-words max-w-2xl text-base font-light leading-relaxed text-foreground/70 [perspective:800px] md:text-lg">
                            <Words text="Every project already has a brochure, a set of renders and maybe a sample flat. Buyers still leave with the same question:" />{' '}
                            <span className="italic text-[#bf953f]"><Words text={'"What will I actually get?"'} /></span>
                        </p>
                    </div>
                </div>

                {/* WHAT WE DO */}
                <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:gap-24">
                    <div className="relative w-full shrink-0 md:w-1/4">
                        <div className="fly-tag sticky top-24 z-10 mb-2 md:top-32 md:mb-0">
                            <span className="inline-block border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[10px] uppercase tracking-widest text-foreground/70 backdrop-blur-md md:text-xs">
                                What We Do
                            </span>
                        </div>
                        <ColumnRule />
                    </div>
                    <div className="relative flex w-full flex-col pb-24 md:w-3/4 md:pb-32">
                        {services.map((svc, i) => (
                            <div
                                key={svc.title}
                                ref={(el) => {
                                    cardsRef.current[i] = el
                                }}
                                className="sticky flex flex-col items-start gap-4 rounded-2xl border border-foreground/15 bg-background/90 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-colors duration-500 will-change-transform hover:border-[#bf953f]/40 sm:flex-row sm:gap-6 md:gap-10 md:rounded-3xl md:p-8"
                                style={{
                                    top: `calc(6rem + ${i * 1.25}rem)`,
                                    zIndex: i + 1,
                                    marginBottom: '5px',
                                }}
                            >
                                <div className="flex w-12 shrink-0 items-start justify-start pt-1 sm:w-16 sm:justify-center md:w-24">
                                    <span className="card-icon inline-block" style={{ color: `${GOLD}cc` }}>
                                        <svc.icon className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.5} />
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <p className="card-question mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#bf953f] md:text-xs">
                                        {svc.question}
                                    </p>
                                    <h4 aria-label={svc.title} className="mb-3 text-2xl font-light [perspective:600px] md:mb-4 md:text-3xl">
                                        <SplitChars text={svc.title} charClassName="card-title-char" />
                                    </h4>
                                    <p className="text-sm font-light leading-relaxed text-foreground/70 md:text-base">
                                        <Words text={svc.description} wordClassName="card-word" />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEXT & VIDEO REVEAL */}
            <section ref={videoWrapperRef} className="relative h-[300vh] w-full bg-background">
                <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-start overflow-hidden">

                    {/* Text that fades away as the video takes over */}
                    <div
                        ref={textContentRef}
                        className="absolute left-0 top-0 z-0 flex w-full flex-col items-center px-5 pt-[12vh] text-center will-change-transform sm:px-6 md:px-12 md:pt-[4vh]"
                    >
                        <span className="fly-tag mb-6 inline-block border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[10px] uppercase tracking-widest text-foreground/70 md:mb-8 md:text-xs">
                            Interactive Experience
                        </span>
                        <h2
                            aria-label="Don't watch it. Walk it."
                            className="mb-6 flex flex-wrap justify-center gap-x-2.5 text-[2.1rem] font-medium uppercase leading-[1.1] tracking-[-0.04em] text-foreground [perspective:1000px] sm:text-5xl md:mb-8 md:gap-x-4 md:text-6xl"
                            style={{ fontFamily: 'var(--font-gilroy)' }}
                        >
                            <span aria-hidden="true" className="fly-word-2 inline-block will-change-transform">Don&apos;t</span>
                            <span aria-hidden="true" className="fly-word-2 inline-block will-change-transform">watch</span>
                            <span aria-hidden="true" className="fly-word-2 inline-block will-change-transform">it.</span>
                            <span className="hidden h-0 w-full md:block" />
                            <span aria-hidden="true" className="relative inline-flex gap-x-2.5 md:gap-x-4">
                                <span className="drop-word-2 inline-block text-[#bf953f] will-change-transform">Walk</span>
                                <span className="drop-word-2 inline-block text-[#bf953f] will-change-transform">it.</span>
                                <span className="walk-line absolute -bottom-1 left-0 right-0 h-[2px] origin-left bg-[#bf953f]/70" />
                            </span>
                        </h2>
                        <p className="fly-words mb-10 max-w-2xl text-base font-light leading-relaxed text-foreground/70 [perspective:800px] md:mb-12 md:text-lg">
                            <Words text="This is a live Digital Twin of" />{' '}
                            <span className="font-medium text-foreground"><Words text="North Wind Sanctuary, Noida" /></span>
                            <Words text=". Fly over the township, step into a" />{' '}
                            <span className="font-medium text-foreground"><Words text="3 BHK" /></span>
                            <Words text=", switch to sunset and check which units are still available — exactly what your buyers will do." />
                        </p>
                        <a
                            href="#explore"
                            className="fly-btn group relative inline-flex items-center gap-3 rounded-full bg-[#bf953f] px-7 py-3.5 text-xs font-medium uppercase tracking-widest text-[#07101c] transition-all duration-300 hover:bg-[#fcf6ba] hover:shadow-[0_0_30px_rgba(191,149,63,0.5)] md:px-8 md:py-4"
                        >
                            <span>Start exploring</span>
                            <span className="font-bold transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                        </a>
                    </div>

                    {/* Video that grows to fill the screen */}
                    <div ref={videoInnerRef} className="absolute inset-0 z-10 h-full w-full overflow-hidden will-change-transform">
                        <video
                            src="/v2.mp4"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <div className="pointer-events-none absolute inset-0 bg-black/10" />
                    </div>
                </div>
            </section>
        </div>
    )
}