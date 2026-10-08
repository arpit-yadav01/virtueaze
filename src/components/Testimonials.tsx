'use client'

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Vikram Malhotra",
    designation: "Managing Director",
    quote: "Virtueaze helped us explain the project clearly. Buyers understood the layout, views and amenities in the first meeting.",
    projects: "30+",
    videoImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Ananya Sharma",
    designation: "VP of Sales",
    quote: "A family spent 40 minutes comparing two 3 BHKs and booked the same evening. The digital twin removed all hesitation.",
    projects: "45+",
    videoImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Rajesh Patel",
    designation: "Chief Executive Officer",
    quote: "We closed our entire phase-one inventory faster than expected because buyers could virtually walk through every unit.",
    projects: "20+",
    videoImg: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Siddharth Roy",
    designation: "Chief Marketing Officer",
    quote: "The level of detail and realism changed how our stakeholders perceive remote luxury project launches entirely.",
    projects: "50+",
    videoImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="stories" className="w-full scroll-mt-24 bg-background py-14 md:py-24 px-4 md:px-8 font-sans overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-4 md:gap-6"
      >
        
        {/* Left Card - Dark */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 bg-[#0a0a0a] rounded-[32px] p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Top block */}
          <div className="flex items-start sm:items-center justify-between mb-12 sm:mb-16 md:mb-24 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <div className="flex items-center">
                {/* Avatars */}
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="avatar" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-[#0a0a0a] object-cover relative z-30" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="avatar" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-[#0a0a0a] object-cover relative z-20" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="avatar" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-[#0a0a0a] object-cover relative z-10" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-[#0a0a0a] bg-white text-black flex items-center justify-center text-[10px] sm:text-xs font-bold z-40 relative">
                    72+
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-white text-[10px] sm:text-xs tracking-widest flex gap-1">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className="text-white/70 text-xs sm:text-sm font-light">Happy clients worldwide</div>
              </div>
            </div>
            
            {/* Dots */}
            <div className="flex gap-2 z-50 mt-2 sm:mt-0">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-4' : 'bg-white/30 w-2'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 relative min-h-[250px] sm:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-4 sm:gap-6 h-full justify-end"
              >
                {/* Middle block */}
                <div>
                  <p className="text-white/50 text-xs sm:text-sm mb-1 sm:mb-1.5 font-light">{testimonials[currentIndex].name}</p>
                  <h4 className="text-white text-xl sm:text-2xl font-medium tracking-tight">{testimonials[currentIndex].designation}</h4>
                </div>

                {/* Bottom block: Video Thumbnail */}
                <div className="relative w-full aspect-[21/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-zinc-800 shrink-0">
                  <img src={testimonials[currentIndex].videoImg} alt="Video thumbnail" className="w-full h-full object-cover" />
                  
                  {/* Showreel Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
                      Showreel
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Card - Light */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex-1 bg-[#FAFAFA] rounded-[32px] p-6 sm:p-8 md:p-12 flex flex-col justify-between border border-black/5 text-black"
        >
          <div>
            <span className="inline-block px-3 py-1.5 mb-6 bg-black/5 text-black/70 text-[10px] md:text-xs tracking-widest uppercase border border-black/10">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase tracking-[-0.04em] text-black mb-8 leading-[1.1]" style={{ fontFamily: 'var(--font-gilroy)' }}>
              What <br className="hidden sm:block" /> <span className="text-[#bf953f]">developers</span> say
            </h2>
            <div className="min-h-[140px] sm:min-h-[160px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-black/80 text-base sm:text-lg md:text-2xl font-light leading-relaxed mb-8 sm:mb-12"
                >
                  "{testimonials[currentIndex].quote}"
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div>
            <div className="mb-8 sm:mb-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="text-4xl sm:text-5xl md:text-6xl text-black font-light tracking-tight mb-1 sm:mb-2">{testimonials[currentIndex].projects}</div>
                  <div className="text-black/50 text-xs sm:text-sm font-medium uppercase tracking-wider">Projects</div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full h-[1px] bg-black/10 mb-6 sm:mb-8"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div>
                <div className="text-black text-sm sm:text-base font-semibold tracking-wider uppercase mb-0.5 sm:mb-1">VIRTUEAZE</div>
                <div className="text-black/50 text-[10px] sm:text-xs font-medium">Creativity that connects</div>
              </div>
              <div className="flex items-center gap-2">
                {/* Logo text/icon */}
                <div className="font-bold text-lg sm:text-xl tracking-tighter flex items-center text-black">
                  <span className="text-[#c5a059] mr-1 sm:mr-2 flex items-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3L9 21L14 3H10L6.5 13L4 3H2Z" fill="#c5a059"/>
                      <path d="M22 3L15 21L10 3H14L17.5 13L20 3H22Z" fill="currentColor"/>
                    </svg>
                  </span>
                  VIRTUEAZE
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}