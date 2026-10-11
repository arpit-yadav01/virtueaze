// 'use client'

// import React, { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Plus, Minus } from "lucide-react"

// interface FaqItem {
//   question: string
//   answer: string
//   image: string
// }

// const faqData: FaqItem[] = [
//   {
//     question: "What do you need from us to start?",
//     answer: "Floor plans, elevations and sections (PDF or CAD), your brochure, material or finish boards, and any existing renders. If the design is still moving, we start with the masterplan and towers and add interiors as they are finalised.",
//     image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
//   },
//   {
//     question: "How long does a Digital Twin take?",
//     answer: "A single tower typically takes 4 to 8 weeks to a walkable first version; a township with multiple phases takes 8–12 weeks. You review twice before launch.",
//     image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
//   },
//   {
//     question: "Do buyers need to download anything?",
//     answer: "No. The twin streams to any browser on desktop, tablet or phone. For galleries and VR we install a native version on your hardware.",
//     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
//   },
//   {
//     question: "How is this different from a 3D video?",
//     answer: "A video has one path. A Digital Twin lets the buyer choose the tower, the floor, the facing and the time of day, open the balcony door and compare two units. It also updates when inventory changes.",
//     image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
//   },
//   {
//     question: "Can we use it in our sales gallery?",
//     answer: "Yes. We integrate with touchscreens, LED walls and projectors, and the same twin runs on an iPad or a VR headset at launches and roadshows in India, the UAE or abroad.",
//     image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1200&auto=format&fit=crop"
//   },
//   {
//     question: "Can it show live availability?",
//     answer: "Yes. Sold, held and available status can be synced with your inventory sheet or CRM, and pricing can be shown or hidden per audience — buyers versus channel partners.",
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
//   },
// ]

// export default function Faqs() {
//   const [activeIndex, setActiveIndex] = useState<number>(0)

//   const toggleAccordion = (index: number) => {
//     setActiveIndex(activeIndex === index ? 0 : index)
//   }

//   return (
//     <section className="w-full bg-background py-20 md:py-32 px-6 md:px-12 font-sans relative overflow-hidden">
//       {/* Background Ambient Glow */}
//       <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#bf953f]/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
//       <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10">
        
//         {/* Left Side - Sticky Image Gallery */}
//         <div className="w-full lg:w-5/12 shrink-0">
//           <div className="relative lg:sticky lg:top-32 flex flex-col gap-6 md:gap-8">
//             <div className="flex flex-col items-start">
//               <motion.span 
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5 }}
//                 className="inline-block px-3 py-1.5 mb-4 md:mb-6 bg-foreground/5 text-foreground/70 text-[10px] md:text-xs tracking-widest uppercase border border-foreground/10"
//               >
//                 Knowledge Base
//               </motion.span>
//               <motion.h2 
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase tracking-[-0.04em] text-foreground leading-[1.1]" 
//                 style={{ fontFamily: 'var(--font-gilroy)' }}
//               >
//                 Questions <br className="hidden lg:block" /> developers <br className="hidden lg:block" /> <span className="text-[#bf953f]">ask us.</span>
//               </motion.h2>
//             </div>

//             {/* Image Container */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7, delay: 0.2 }}
//               className="relative w-full aspect-[16/9] lg:aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-foreground/10 bg-zinc-900"
//             >
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={activeIndex}
//                   src={faqData[activeIndex].image}
//                   alt={faqData[activeIndex].question}
//                   initial={{ opacity: 0, scale: 1.05 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.6, ease: "easeInOut" }}
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//               </AnimatePresence>
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
//               {/* Dynamic Image Overlay Text */}
//               <div className="absolute bottom-6 left-6 right-6">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeIndex}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.4, delay: 0.2 }}
//                     className="text-white flex items-center gap-4"
//                   >
//                     <span className="text-3xl font-light text-[#bf953f]">
//                       {String(activeIndex + 1).padStart(2, '0')}
//                     </span>
//                     <div className="h-[1px] flex-1 bg-white/20" />
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Right Side - Interactive Accordion */}
//         <div className="w-full lg:w-7/12 flex flex-col justify-center lg:pt-48 pb-24">
//           <div className="flex flex-col gap-0">
//             {faqData.map((faq, index) => {
//               const isActive = activeIndex === index

//               return (
//                 <motion.div 
//                   initial={{ opacity: 0, x: 30 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true, margin: "-50px" }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   key={index} 
//                   className="border-b border-foreground/10 last:border-b-0 overflow-hidden"
//                 >
//                   <button
//                     className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
//                     onClick={() => toggleAccordion(index)}
//                   >
//                     <h3 className={`text-xl md:text-3xl font-light transition-all duration-500 pr-8 ${isActive ? 'text-[#bf953f] translate-x-2' : 'text-foreground group-hover:text-[#bf953f]/70'}`}>
//                       {faq.question}
//                     </h3>
//                     <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
//                       <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${isActive ? 'border-[#bf953f] bg-[#bf953f]/10 scale-100' : 'border-transparent scale-50 group-hover:border-[#bf953f]/30 group-hover:scale-100'}`} />
//                       <Plus className={`w-5 h-5 transition-all duration-500 absolute ${isActive ? 'rotate-90 opacity-0 text-[#bf953f]' : 'rotate-0 opacity-100 text-foreground/50 group-hover:text-[#bf953f]'}`} />
//                       <Minus className={`w-5 h-5 transition-all duration-500 absolute ${isActive ? 'rotate-0 opacity-100 text-[#bf953f]' : '-rotate-90 opacity-0 text-[#bf953f]'}`} />
//                     </div>
//                   </button>

//                   <AnimatePresence>
//                     {isActive && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
//                       >
//                         <div className="pb-8 pl-2 md:pl-6 max-w-2xl border-l-2 border-[#bf953f]/30 ml-2 md:ml-4">
//                           <p className="text-foreground/70 text-base md:text-lg font-light leading-relaxed pl-4">
//                             {faq.answer}
//                           </p>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               )
//             })}
//           </div>
//         </div>
        
//       </div>
//     </section>
//   )
// }





'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, LayoutGroup, useInView, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
  image: string
}

const faqData: FaqItem[] = [
  {
    question: "What do you need from us to start?",
    answer: "Floor plans, elevations and sections (PDF or CAD), your brochure, material or finish boards, and any existing renders. If the design is still moving, we start with the masterplan and towers and add interiors as they are finalised.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    question: "How long does a Digital Twin take?",
    answer: "A single tower typically takes 4 to 8 weeks to a walkable first version; a township with multiple phases takes 8–12 weeks. You review twice before launch.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
  },
  {
    question: "Do buyers need to download anything?",
    answer: "No. The twin streams to any browser on desktop, tablet or phone. For galleries and VR we install a native version on your hardware.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
  },
  {
    question: "How is this different from a 3D video?",
    answer: "A video has one path. A Digital Twin lets the buyer choose the tower, the floor, the facing and the time of day, open the balcony door and compare two units. It also updates when inventory changes.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    question: "Can we use it in our sales gallery?",
    answer: "Yes. We integrate with touchscreens, LED walls and projectors, and the same twin runs on an iPad or a VR headset at launches and roadshows in India, the UAE or abroad.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    question: "Can it show live availability?",
    answer: "Yes. Sold, held and available status can be synced with your inventory sheet or CRM, and pricing can be shown or hidden per audience — buyers versus channel partners.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
  },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const FLIGHT = { type: 'spring' as const, stiffness: 95, damping: 17, mass: 0.9 } // how a question card flies into and out of the answer card
const pad = (n: number) => String(n).padStart(2, '0')
const AUTOPLAY_MS = 3000 // time each question stays open before the next one flies in (raise to 5000-6000 so longer answers can be read)

// Where each floating question sits in the cloud on desktop (share of the cloud box), and its resting tilt
const SLOTS = [
  { left: '0%', top: '2%', rotate: -5 },
  { left: '54%', top: '0%', rotate: 4 },
  { left: '10%', top: '34%', rotate: 3 },
  { left: '56%', top: '36%', rotate: -4 },
  { left: '0%', top: '67%', rotate: 4 },
  { left: '48%', top: '71%', rotate: -3 },
]

// Gold specks drifting upward in the background; positions are fixed so server and browser render the same
const SPECKS = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 23) % 100}%`,
  size: 2 + (i % 3),
  duration: 9 + (i % 5) * 2,
  delay: (i % 7) * 0.9,
}))

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isDesktop
}

// Words fly up out of depth one by one; screen readers get the plain sentence
function FlyWords({ text, play, delay = 0, stagger = 0.05, reduce, className = '' }: { text: string; play: boolean; delay?: number; stagger?: number; reduce: boolean; className?: string }) {
  if (reduce) return <span className={className}>{text}</span>
  const words = text.split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            aria-hidden="true"
            className="inline-block will-change-transform"
            style={{ transformPerspective: 600, transformOrigin: '50% 100%' }}
            initial={{ opacity: 0, y: 40, rotateX: -80, filter: 'blur(8px)' }}
            animate={play ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : undefined}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  )
}

// Phones and tablets get a calm, simple list; laptops and desktops get the flying version
export default function Faqs() {
  const isDesktop = useIsDesktop()
  return isDesktop ? <FlyingFaqs /> : <SimpleFaqs />
}

// ---------- Phones and tablets: a plain accordion, no autoplay, nothing jumping around ----------
function SimpleFaqs() {
  const reduce = !!useReducedMotion()
  const [open, setOpen] = useState<number | null>(0) // the first answer starts open
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({})

  return (
    <section className="relative w-full overflow-hidden bg-background px-5 py-16 font-sans sm:px-8 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#bf953f]/5 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="mb-4 inline-block border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[10px] uppercase tracking-widest text-foreground/70">
            Knowledge Base
          </span>
          <h2
            className="text-[2rem] font-medium uppercase leading-[1.08] tracking-[-0.03em] text-foreground sm:text-4xl"
            style={{ fontFamily: 'var(--font-gilroy)' }}
          >
            Questions developers <span className="text-[#bf953f]">ask us.</span>
          </h2>
          <p className="mt-3 text-sm text-foreground/55">Tap a question to see the answer.</p>
        </motion.div>

        <ul className="mt-8 border-t border-foreground/10">
          {faqData.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.li
                key={faq.question}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                className="border-b border-foreground/10"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start gap-4 py-5 text-left"
                >
                  <span className={`mt-1 shrink-0 text-xs tabular-nums tracking-[0.2em] transition-colors ${isOpen ? 'text-[#bf953f]' : 'text-foreground/40'}`}>
                    {pad(i + 1)}
                  </span>
                  <span className={`flex-1 text-[17px] font-light leading-snug transition-colors ${isOpen ? 'text-[#bf953f]' : 'text-foreground'}`}>
                    {faq.question}
                  </span>
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-[#bf953f] bg-[#bf953f] text-black' : 'border-foreground/20 text-foreground/70'}`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-9">
                        <p className="text-[15px] font-light leading-relaxed text-foreground/75">{faq.answer}</p>
                        <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-foreground/10 bg-zinc-900">
                          {failedImages[i] ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(70%_60%_at_50%_40%,rgba(191,149,63,0.22),transparent_70%)]">
                              <span className="text-4xl font-light text-[#bf953f]/80">{pad(i + 1)}</span>
                            </div>
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={faq.image}
                              alt={faq.question}
                              loading="lazy"
                              onError={() => setFailedImages((prev) => ({ ...prev, [i]: true }))}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

// ---------- Laptops and desktops: the flying questions version ----------
function FlyingFaqs() {
  const reduce = !!useReducedMotion()
  const isDesktop = true // this version only renders on screens 1024px and wider
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.25, once: true })
  const onScreen = useInView(sectionRef, { amount: 0.3 }) // the automatic tour only runs while the section is on screen
  const [paused, setPaused] = useState(false) // pauses while the mouse is over the answer card
  const [active, setActive] = useState(0)
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({}) // pictures that could not be downloaded
  const [entered, setEntered] = useState(false) // true once the cards have flown in, so returning cards don't replay it

  const select = (index: number) => setActive((index + faqData.length) % faqData.length)

  // Automatic tour: the next question flies in every AUTOPLAY_MS; any change (automatic or clicked) restarts the timer
  useEffect(() => {
    if (reduce || paused || !onScreen) return
    const t = setTimeout(() => setActive((a) => (a + 1) % faqData.length), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [active, paused, onScreen, reduce])
  const touring = !reduce && !paused && onScreen

  // The question cloud tilts gently toward the mouse
  const tiltX = useSpring(0, { stiffness: 80, damping: 16 })
  const tiltY = useSpring(0, { stiffness: 80, damping: 16 })
  const onCloudMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
  }
  const onCloudLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const current = faqData[active]

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-background px-5 py-16 font-sans sm:px-5 md:px-10 md:py-24">
      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[640px] w-[640px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#bf953f]/5 blur-[150px]" />

      {/* Gold specks drifting upward */}
      {!reduce && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {SPECKS.map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[#d5bd87]"
              style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
              animate={{ y: [0, -90], opacity: [0, 0.5, 0] }}
              transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
      )}

      <LayoutGroup>
        <div className="relative z-10 mx-auto flex max-w-[1120px] flex-col gap-8 lg:flex-row lg:gap-16">

          {/* Left: heading and the floating question cloud */}
          <div className="w-full lg:w-5/12">
            <motion.span
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={inView ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : undefined}
              transition={{ duration: 0.9, ease: EASE }}
              className="mb-4 inline-block border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[10px] uppercase tracking-widest text-foreground/70 md:mb-5 md:text-[10px]"
            >
              Knowledge Base
            </motion.span>
            <h2
              className="text-3xl font-medium uppercase leading-[1.08] tracking-[-0.04em] text-foreground md:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--font-gilroy)' }}
            >
              <FlyWords text="Questions developers" play={inView} reduce={reduce} delay={0.1} />{' '}
              <FlyWords text="ask us." play={inView} reduce={reduce} delay={0.3} className="text-[#bf953f]" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              className="mt-3 text-xs text-foreground/55 md:text-sm"
            >
              The questions play on their own. Pick any one to jump to it.
            </motion.p>

            {/* The cloud: on desktop the questions float at scattered spots; on phones they stack */}
            <motion.div
              onMouseMove={onCloudMove}
              onMouseLeave={onCloudLeave}
              style={isDesktop ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 } : undefined}
              className={isDesktop ? 'relative mt-8 h-[432px] w-full' : 'mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2'}
            >
              {faqData.map((faq, i) => {
                if (i === active) return null
                const slot = SLOTS[i]
                return (
                  // 1. Flies in from deep in the screen when the section first appears
                  <motion.div
                    key={faq.question}
                    className={isDesktop ? 'absolute w-[46%]' : 'relative'}
                    style={isDesktop ? { left: slot.left, top: slot.top } : undefined}
                    variants={{
                      hidden: { opacity: 0, y: 160, scale: 0.4, rotate: slot.rotate * 5 },
                      shown: { opacity: 1, y: 0, scale: 1, rotate: isDesktop ? slot.rotate : 0 },
                    }}
                    // Cards that fly back from the answer card skip the entrance
                    initial={reduce || entered ? false : 'hidden'}
                    animate={inView || reduce ? 'shown' : 'hidden'}
                    transition={{ type: 'spring', stiffness: 60, damping: 13, delay: entered ? 0 : 0.35 + i * 0.09 }}
                    onAnimationComplete={() => { if (inView && !entered) setEntered(true) }}
                  >
                    {/* 2. Then keeps floating gently */}
                    <motion.div
                      animate={reduce ? undefined : { y: [0, -9, 0], rotate: [0, isDesktop ? 1.2 : 0.4, 0] }}
                      transition={{ duration: 4.2 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {/* 3. Clicking it flies the card across into the answer card */}
                      <motion.button
                        type="button"
                        layoutId={`faq-card-${i}`}
                        transition={FLIGHT}
                        onClick={() => select(i)}
                        whileHover={reduce ? undefined : { scale: 1.04, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex w-full items-start gap-2.5 rounded-xl border border-foreground/10 bg-foreground/[0.04] p-3 text-left shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-[#bf953f]/50 hover:bg-[#bf953f]/[0.07] md:p-4"
                      >
                        <motion.span layout="position" className="mt-0.5 shrink-0 text-[10px] tabular-nums tracking-[0.2em] text-[#bf953f]">
                          {pad(i + 1)}
                        </motion.span>
                        <motion.span layout="position" className="text-sm font-light leading-snug text-foreground transition-colors group-hover:text-[#f5dfad] md:text-base">
                          {faq.question}
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Right: the open question, as a large card the chosen question flies into */}
          <div className="order-first w-full lg:order-none lg:w-7/12 lg:pt-5">
            <div className="lg:sticky lg:top-24" aria-live="polite">
              <motion.article
                key={active}
                layoutId={`faq-card-${active}`}
                transition={FLIGHT}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="overflow-hidden rounded-2xl border border-[#bf953f]/30 bg-[#0e110e]/85 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              >
                <motion.div layout className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                  {failedImages[active] ? (
                    // If a picture link stops working, a clean gold panel shows instead of an empty box
                    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(70%_60%_at_50%_40%,rgba(191,149,63,0.22),transparent_70%)]">
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(191,149,63,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(191,149,63,0.25) 1px, transparent 1px)',
                          backgroundSize: '36px 36px',
                        }}
                      />
                      <span className="relative text-6xl font-light text-[#bf953f]/80">{pad(active + 1)}</span>
                    </div>
                  ) : (
                    <motion.img
                      key={current.image}
                      src={current.image}
                      alt={current.question}
                      initial={{ opacity: 0, scale: 1.18 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ opacity: { duration: 0.5, delay: 0.3 }, scale: { duration: 7, ease: 'easeOut' } }}
                      onError={() => {
                        console.warn('[Faqs] image failed to load:', current.image)
                        setFailedImages((prev) => ({ ...prev, [active]: true }))
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e110e] via-[#0e110e]/10 to-transparent" />
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm md:left-5 md:top-5"
                  >
                    Question {pad(active + 1)} / {pad(faqData.length)}
                  </motion.span>
                </motion.div>

                <div className="p-5 md:p-6">
                  <motion.h3 layout="position" className="text-xl font-light leading-snug text-[#bf953f] md:text-2xl">
                    {current.question}
                  </motion.h3>
                  <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-foreground/75 md:text-base">
                    <FlyWords text={current.answer} play reduce={reduce} delay={0.35} stagger={0.018} />
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-6 flex items-center justify-between gap-4 border-t border-foreground/10 pt-4"
                  >
                    <button
                      type="button"
                      onClick={() => select(active - 1)}
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-foreground/60 transition-colors hover:text-[#bf953f]"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Previous
                    </button>
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      {faqData.map((_, i) => (
                        <span key={i} className={`relative h-1 overflow-hidden rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-[#bf953f]/30' : 'w-1.5 bg-foreground/25'}`}>
                          {/* The active dot fills up like a timer until the next question */}
                          {i === active && (
                            <motion.span
                              key={`${active}-${touring}`}
                              className="absolute inset-0 origin-left rounded-full bg-[#bf953f]"
                              initial={{ scaleX: touring ? 0 : 1 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: touring ? AUTOPLAY_MS / 1000 : 0, ease: 'linear' }}
                            />
                          )}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => select(active + 1)}
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-foreground/60 transition-colors hover:text-[#bf953f]"
                    >
                      Next <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                </div>
              </motion.article>
            </div>
          </div>
        </div>
      </LayoutGroup>

    </section>
  )
}