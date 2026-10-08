'use client'

import React from "react"
import { motion, Variants } from "framer-motion"
import { Calendar, Phone, Mail, ArrowUpRight } from "lucide-react"

export default function CTA() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="relative w-full scroll-mt-24 py-20 md:py-32 px-6 md:px-12 bg-[#0a0a0a] text-white overflow-hidden" id="contact">
      {/* Subtle background ambient golden lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(191,149,63,0.15)_0%,transparent_70%)] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center"
      >
        
        {/* Centered Editorial Header */}
        <motion.div variants={itemVariants} className="max-w-4xl text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="inline-block px-3 py-1.5 mb-6 bg-white/5 text-white/70 text-[10px] md:text-xs tracking-widest uppercase border border-white/10">
            Get in touch
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-6xl font-medium uppercase tracking-[-0.04em] text-white mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-gilroy)' }}>
            See your project as a <br className="hidden sm:block" /> <span className="text-[#bf953f]">Digital Twin.</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Send us the plans of one project. We'll show you what a conversion-ready twin looks like for it — and what it would take to launch.
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className="w-full space-y-10">
          
          {/* Top Row: Direct Contact Cards Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            
            {/* UAE WhatsApp */}
            <a
              href="https://wa.me/971589468963"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#bf953f]/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#bf953f]/10 border border-[#bf953f]/20 flex items-center justify-center text-[#bf953f] group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-light mb-1">UAE WhatsApp</span>
                  <span className="text-sm sm:text-base text-white font-light group-hover:text-[#bf953f] transition-colors">+971 58 946 8963</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[#bf953f] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </a>

            {/* India WhatsApp */}
            <a
              href="https://wa.me/919106824049"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#bf953f]/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#bf953f]/10 border border-[#bf953f]/20 flex items-center justify-center text-[#bf953f] group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-light mb-1">India WhatsApp</span>
                  <span className="text-sm sm:text-base text-white font-light group-hover:text-[#bf953f] transition-colors">+91 91068 24049</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[#bf953f] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </a>

            {/* Email Us */}
            <a
              href="mailto:contact@virtueaze.com"
              className="flex items-center justify-between p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#bf953f]/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#bf953f]/10 border border-[#bf953f]/20 flex items-center justify-center text-[#bf953f] group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-light mb-1">Email Enquiries</span>
                  <span className="text-sm sm:text-base text-white font-light group-hover:text-[#bf953f] transition-colors">contact@virtueaze.com</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[#bf953f] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </a>

          </motion.div>

          {/* Bottom Stage: Immersive Inline Calendly Stage */}
          <motion.div variants={itemVariants} className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl backdrop-blur-sm">
            
            {/* Header bar inside the calendly frame */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 py-5 sm:py-6 bg-white/5 border-b border-white/10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#bf953f]/10 border border-[#bf953f]/30 flex items-center justify-center text-[#bf953f]">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white font-medium text-center sm:text-left">
                  Schedule a Live Technical Walkthrough
                </span>
              </div>
              
              <a
                href="https://calendly.com/virtueaze-vr/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#bf953f] text-black text-[10px] sm:text-xs uppercase tracking-[0.15em] font-bold transition-all shadow-md flex justify-center items-center gap-2 hover:bg-white hover:scale-105"
              >
                <span>Direct Calendly Link</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Calendly Inline Widget Frame */}
            <div className="w-full h-[600px] md:h-[700px] relative">
              <iframe
                src="https://calendly.com/virtueaze-vr/30min?embed_domain=virtueaze.com&embed_type=Inline&hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a Demo - Virtueaze"
                className="w-full h-full bg-transparent filter invert-[0.9] hue-rotate-180 contrast-125"
              />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}