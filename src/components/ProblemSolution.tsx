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

export default function ProblemSolution() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const videoWrapperRef = useRef<HTMLElement>(null)
    const videoInnerRef = useRef<HTMLDivElement>(null)
    const textContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words1 = gsap.utils.toArray('.animate-word-1')
            if (words1.length > 0) {
                gsap.fromTo(
                    words1,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.4,
                        ease: 'power3.out',
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: words1[0] as Element,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                )
            }

            const words2 = gsap.utils.toArray('.animate-word-2')
            if (words2.length > 0) {
                gsap.fromTo(
                    words2,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.4,
                        ease: 'power3.out',
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: words2[0] as Element,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                )
            }

            gsap.utils.toArray('.animate-text').forEach((el: any) => {
                gsap.fromTo(
                    el,
                    { y: 40, opacity: 0, filter: 'blur(4px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1.4,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })

            cardsRef.current.forEach((card) => {
                if (!card) return
                gsap.fromTo(
                    card,
                    { y: 60, opacity: 0, scale: 0.98 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })

            if (videoWrapperRef.current && videoInnerRef.current && textContentRef.current) {
                // Animate text fading out and moving up
                gsap.to(textContentRef.current, {
                    opacity: 0,
                    y: -50,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: videoWrapperRef.current,
                        start: 'top top',
                        end: 'center top',
                        scrub: 1,
                    }
                })

                // Animate video reveal with a soft zoom so it fills the frame without aggressive edge cropping
                gsap.fromTo(
                    videoInnerRef.current,
                    {
                        scale: 0.96,
                        opacity: 0.88
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        ease: 'power2.inOut',
                        scrollTrigger: {
                            trigger: videoWrapperRef.current,
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: 1,
                        }
                    }
                )
            }

            const refreshId = requestAnimationFrame(() => {
                ScrollTrigger.refresh()
            })

            return () => cancelAnimationFrame(refreshId)
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <div id="solutions" ref={sectionRef} className="w-full scroll-mt-24 bg-background flex flex-col relative z-10 font-sans">
            <section className="text-foreground py-14 md:py-15 px-6 md:px-12">

                {/* HEADER */}
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10 md:gap-24 mb-20 md:mb-32">
                    <div className="w-full md:w-1/4 shrink-0 overflow-hidden">
                        <span className="animate-text inline-block px-3 py-1.5 bg-foreground/5 text-foreground/70 text-[10px] md:text-xs tracking-widest uppercase border border-foreground/10">
                            Why a Digital Twin
                        </span>
                    </div>
                    <div className="w-full md:w-3/4">
                        <h3 className="text-4xl md:text-6xl lg:text-6xl font-medium uppercase tracking-[-0.04em] leading-[1.1] mb-8 flex flex-wrap gap-x-3 md:gap-x-4" style={{ fontFamily: 'var(--font-gilroy)' }}>
                            <span className="animate-word-1 inline-block will-change-transform">Renders</span>
                            <span className="animate-word-1 inline-block will-change-transform">show.</span>
                            <div className="w-full h-0"></div>
                            <span className="animate-word-1 inline-block text-[#bf953f] will-change-transform">Digital</span>
                            <span className="animate-word-1 inline-block text-[#bf953f] will-change-transform">Twins</span>
                            <span className="animate-word-1 inline-block text-[#bf953f] will-change-transform">convince.</span>
                        </h3>
                        <p className="animate-text text-foreground/70 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                            Every project already has a brochure, a set of renders and maybe a sample flat. Buyers still leave with the same question: <span className="italic text-[#bf953f]">"What will I actually get?"</span>
                        </p>
                    </div>
                </div>

                {/* WHAT WE DO WITH QUESTIONS & LOTTIE ANIMATIONS */}
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10 md:gap-24">
                    <div className="w-full md:w-1/4 shrink-0 relative overflow-hidden">
                        <div className="sticky top-24 md:top-32 z-10 animate-text mb-8 md:mb-0">
                            <span className="inline-block px-3 py-1.5 bg-foreground/5 text-foreground/70 text-[10px] md:text-xs tracking-widest uppercase border border-foreground/10 backdrop-blur-md">
                                What We Do
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-3/4 relative flex flex-col pb-32">
                        {services.map((svc, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    cardsRef.current[i] = el
                                }}
                                className="sticky bg-background/90 border border-foreground/15 rounded-2xl md:rounded-3xl p-8 md:p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl flex flex-col md:flex-row gap-6 md:gap-10 items-start will-change-transform opacity-0"
                                style={{
                                    top: `calc(8rem + ${i * 1.5}rem)`,
                                    zIndex: i + 1,
                                    marginBottom: '5px'
                                }}
                            >
                                <div className="shrink-0 w-16 md:w-24 pt-1 flex items-start justify-center">
                                    <span className="text-[#bf953f]/80">
                                        <svc.icon className="w-12 h-12 md:w-12 md:h-12" strokeWidth={1.5} />
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#bf953f] font-medium mb-2">
                                        {svc.question}
                                    </p>
                                    <h4 className="text-xl md:text-3xl font-light mb-3 md:mb-4">{svc.title}</h4>
                                    <p className="text-foreground/70 text-sm md:text-base leading-relaxed font-light">{svc.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMBINED TEXT & VIDEO REVEAL SECTION */}
            <section ref={videoWrapperRef} className="relative w-full h-[300vh] bg-background">
                <div className="sticky top-0 w-full h-[100vh] overflow-hidden flex flex-col items-center justify-start">
                    
                    {/* TEXT CONTENT (Fades out in background) */}
                    <div ref={textContentRef} className="absolute top-0 left-0 w-full pt-[12vh] md:pt-[4vh] px-6 md:px-12 flex flex-col items-center text-center z-0 will-change-transform">
                        <span className="animate-text inline-block px-3 py-1.5 mb-8 bg-foreground/5 text-foreground/70 text-[10px] md:text-xs tracking-widest uppercase border border-foreground/10">
                            Interactive Experience
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-6xl font-medium uppercase tracking-[-0.04em] text-foreground mb-8 leading-[1.1] flex flex-wrap justify-center gap-x-3 md:gap-x-4" style={{ fontFamily: 'var(--font-gilroy)' }}>
                            <span className="animate-word-2 inline-block will-change-transform">Don't</span>
                            <span className="animate-word-2 inline-block will-change-transform">watch</span>
                            <span className="animate-word-2 inline-block will-change-transform">it.</span>
                            <br className="hidden md:block w-full h-0"/>
                            <span className="animate-word-2 inline-block text-[#bf953f] will-change-transform">Walk</span>
                            <span className="animate-word-2 inline-block text-[#bf953f] will-change-transform">it.</span>
                        </h2>
                        <p className="animate-text text-foreground/70 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-12">
                            This is a live Digital Twin of <span className="text-foreground font-medium">North Wind Sanctuary, Noida</span>. Fly over the township, step into a <span className="text-foreground font-medium">3 BHK</span>, switch to sunset and check which units are still available — exactly what your buyers will do.
                        </p>
                        <a
                            href="#explore"
                            className="animate-text group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#bf953f] text-[#07101c] font-medium tracking-widest text-xs uppercase transition-all duration-300 hover:bg-[#fcf6ba] hover:shadow-[0_0_30px_rgba(191,149,63,0.5)]"
                        >
                            <span>Start exploring</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">→</span>
                        </a>
                    </div>

                    {/* VIDEO REVEAL (Expands from bottom) */}
                    <div ref={videoInnerRef} className="absolute inset-0 z-10 w-full h-full overflow-hidden will-change-transform">
                        <video
                            src="/v2.mp4"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </div>
                </div>
            </section>
        </div>
    )
}