'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

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
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    question: "Can it show live availability?",
    answer: "Yes. Sold, held and available status can be synced with your inventory sheet or CRM, and pricing can be shown or hidden per audience — buyers versus channel partners.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
  },
]

export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? 0 : index)
  }

  return (
    <section className="w-full bg-background py-20 md:py-32 px-6 md:px-12 font-sans relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#bf953f]/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10">
        
        {/* Left Side - Sticky Image Gallery */}
        <div className="w-full lg:w-5/12 shrink-0">
          <div className="relative lg:sticky lg:top-32 flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col items-start">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-3 py-1.5 mb-4 md:mb-6 bg-foreground/5 text-foreground/70 text-[10px] md:text-xs tracking-widest uppercase border border-foreground/10"
              >
                Knowledge Base
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase tracking-[-0.04em] text-foreground leading-[1.1]" 
                style={{ fontFamily: 'var(--font-gilroy)' }}
              >
                Questions <br className="hidden lg:block" /> developers <br className="hidden lg:block" /> <span className="text-[#bf953f]">ask us.</span>
              </motion.h2>
            </div>

            {/* Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full aspect-[16/9] lg:aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-foreground/10 bg-zinc-900"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={faqData[activeIndex].image}
                  alt={faqData[activeIndex].question}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Dynamic Image Overlay Text */}
              <div className="absolute bottom-6 left-6 right-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-white flex items-center gap-4"
                  >
                    <span className="text-3xl font-light text-[#bf953f]">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="h-[1px] flex-1 bg-white/20" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Interactive Accordion */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center lg:pt-48 pb-24">
          <div className="flex flex-col gap-0">
            {faqData.map((faq, index) => {
              const isActive = activeIndex === index

              return (
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index} 
                  className="border-b border-foreground/10 last:border-b-0 overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className={`text-xl md:text-3xl font-light transition-all duration-500 pr-8 ${isActive ? 'text-[#bf953f] translate-x-2' : 'text-foreground group-hover:text-[#bf953f]/70'}`}>
                      {faq.question}
                    </h3>
                    <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                      <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${isActive ? 'border-[#bf953f] bg-[#bf953f]/10 scale-100' : 'border-transparent scale-50 group-hover:border-[#bf953f]/30 group-hover:scale-100'}`} />
                      <Plus className={`w-5 h-5 transition-all duration-500 absolute ${isActive ? 'rotate-90 opacity-0 text-[#bf953f]' : 'rotate-0 opacity-100 text-foreground/50 group-hover:text-[#bf953f]'}`} />
                      <Minus className={`w-5 h-5 transition-all duration-500 absolute ${isActive ? 'rotate-0 opacity-100 text-[#bf953f]' : '-rotate-90 opacity-0 text-[#bf953f]'}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="pb-8 pl-2 md:pl-6 max-w-2xl border-l-2 border-[#bf953f]/30 ml-2 md:ml-4">
                          <p className="text-foreground/70 text-base md:text-lg font-light leading-relaxed pl-4">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
        
      </div>
    </section>
  )
}