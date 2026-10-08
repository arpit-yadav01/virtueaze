'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ProjectFeature {
    number: string
    title: string
    desc: string
    imgSrc: string
}

const features: ProjectFeature[] = [
    { number: '(01)', title: 'Full exterior view', desc: 'The complete building from every angle and height — approach road, façade, terraces.', imgSrc: 'https://images.unsplash.com/photo-1759472018220-d6e258796fce?w=900&auto=format&fit=crop&q=80' },
    { number: '(02)', title: 'Nearby connectivity', desc: 'Metro, highways, schools, hospitals and malls mapped with distances and travel times.', imgSrc: 'https://plus.unsplash.com/premium_photo-1661963428055-4b25a7ebd3a9?w=900&auto=format&fit=crop&q=80' },
    { number: '(03)', title: 'Day, night & sun path', desc: 'Real lighting from sunrise to sunset, so buyers see when the sun reaches their balcony.', imgSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=80' },
    { number: '(04)', title: 'Amenities access', desc: 'Lobby, lifts, parking, clubhouse, pool and gardens — every shared space, walkable.', imgSrc: 'https://plus.unsplash.com/premium_photo-1661957690855-693887d13b87?w=900&auto=format&fit=crop&q=80' },
    { number: '(05)', title: 'Complete interior walkthrough', desc: 'Room to room in true scale. Check the kitchen width, balcony door and ceiling height.', imgSrc: 'https://images.unsplash.com/photo-1553101331-ce6281c677b9?w=900&auto=format&fit=crop&q=80' },
    { number: '(06)', title: 'Unit comparison + live availability', desc: 'Compare layouts side by side with sold, held and available units synced to your inventory.', imgSrc: 'https://images.unsplash.com/photo-1763811939454-e7e6ec3394ee?w=900&auto=format&fit=crop&q=80' },
    { number: '(07)', title: 'The view from every balcony', desc: 'Pick a tower, floor and facing to see what that exact unit sees — not a generic render.', imgSrc: 'https://images.unsplash.com/photo-1759472018220-d6e258796fce?w=900&auto=format&fit=crop&q=80' },
    { number: '(08)', title: 'Reserve from inside the twin', desc: 'Talk to sales or reserve a unit directly through your CRM or WhatsApp.', imgSrc: 'https://plus.unsplash.com/premium_photo-1661963428055-4b25a7ebd3a9?w=900&auto=format&fit=crop&q=80' },
]

export default function WhyBuyersExplore() {
    const sectionRef = useRef<HTMLElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const introRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        const section = sectionRef.current
        const stage = stageRef.current
        const intro = introRef.current
        const cards = cardRefs.current.filter(Boolean)

        if (!section || !stage || !intro || cards.length === 0) return

        const ctx = gsap.context(() => {
            gsap.set(intro.children, { opacity: 0, y: 28 })
            gsap.set(cards, { x: (index: number) => index % 2 === 0 ? '-115vw' : '115vw', rotate: 5, opacity: 0 })

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    pin: stage,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })

            timeline
                .to(intro.children, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' })
                .to(intro.children, { opacity: 0, y: -24, duration: 0.25, stagger: 0.04, ease: 'power2.in' }, '-=0.05')

            cards.forEach((card, index) => {
                const direction = index % 2 === 0 ? 1 : -1
                timeline
                    .to(card, { x: 0, rotate: index % 2 === 0 ? -2 : 2, opacity: 1, duration: 0.95, ease: 'power4.out' }, index === 0 ? '-=0.15' : '-=0.3')
                    .to(card, { x: `${direction * -115}vw`, rotate: index % 2 === 0 ? 3 : -3, opacity: 0, duration: 0.85, ease: 'power3.in' }, '+=0.35')
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section id="experience" ref={sectionRef} className="relative h-[860svh] scroll-mt-24 overflow-hidden border-t border-[#d4af37]/20 bg-background text-foreground">
            <div ref={stageRef} className="relative flex h-[100svh] min-h-[620px] w-full items-center justify-center overflow-hidden px-6">
                <div ref={introRef} className="relative z-10 max-w-3xl text-center flex flex-col items-center">
                    <span className="inline-block px-3 py-1.5 mb-8 bg-foreground/5 text-foreground/70 text-[10px] md:text-xs tracking-widest uppercase border border-foreground/10">
                        What Buyers Explore
                    </span>

                    <h2
                        className="text-4xl md:text-6xl lg:text-6xl font-medium uppercase tracking-[-0.04em] leading-[1.1] mb-8 text-foreground"
                        style={{ fontFamily: 'var(--font-gilroy)' }}
                    >
                        See everything.
                        <br />
                        <span className="text-[#bf953f]">Before they visit.</span>
                    </h2>

                    <p className="mx-auto text-base md:text-lg font-light leading-relaxed max-w-2xl text-foreground/70">
                        One Digital Twin answers the questions that usually take three site visits and a dozen phone calls.
                    </p>
                </div>

                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                    {features.map((feature, index) => (
                        <div key={feature.title} ref={(element) => { if (element) cardRefs.current[index] = element }} className="absolute h-[62svh] min-h-[420px] w-[82vw] max-w-[430px] overflow-hidden rounded-[26px] border border-[#d4af37]/45 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.3)] will-change-transform sm:w-[54vw] md:h-[70vh] md:w-[390px]">
                            <img src={feature.imgSrc} alt={feature.title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/5" />
                            <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
                                <div className="text-xs uppercase tracking-[0.2em] font-medium mb-2 text-[#bf953f] flex items-center gap-3">
                                    <span className="h-px w-8 bg-[#bf953f]" />
                                    <span>{feature.number}</span>
                                </div>
                                <h3 className="text-xl md:text-3xl font-light mb-3 md:mb-4 text-[#f5f5f2]">{feature.title}</h3>
                                <p className="max-w-[340px] text-sm md:text-base leading-relaxed font-light text-white/70">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <span className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-[10px] md:text-xs tracking-widest text-foreground/50 uppercase font-bold" style={{ fontFamily: 'var(--font-gilroy)' }}>Scroll to explore</span>
            </div>
        </section>
    )
}