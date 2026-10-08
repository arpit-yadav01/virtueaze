'use client'

import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DrawingAnimation, BeltAnimation, NetworkAnimation } from "./animations/GeometricAnimations"

gsap.registerPlugin(ScrollTrigger)

interface ProcessStep {
  id: string
  stepNum: string
  timingLabel: string
  title: string
  description: string
  animationId: string
}

const processSteps: ProcessStep[] = [
  {
    id: "01",
    stepNum: "1",
    timingLabel: "Day 0",
    title: "Share your drawings",
    description: "Plans, elevations, sections, brochure, material boards and any renders you already have. PDF or CAD is fine. We start with clarity to understand your goals.",
    animationId: "drawing",
  },
  {
    id: "02",
    stepNum: "2",
    timingLabel: "Weeks 1–4",
    title: "We build your Digital Twin",
    description: "Modelling, landscaping, lighting, interiors and interactions in Unreal Engine. You review a first walkable version at week 2 and a polished one at week 4.",
    animationId: "belt",
  },
  {
    id: "03",
    stepNum: "3",
    timingLabel: "Launch day",
    title: "Go live, everywhere",
    description: "Web link, gallery install and VR build, plus a one-hour training session for your sales team. Updates whenever inventory or design changes.",
    animationId: "network",
  },
]

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const newIndex = Math.min(
            processSteps.length - 1,
            Math.floor(self.progress * processSteps.length)
          )
          setActiveIndex((currentIndex) =>
            currentIndex === newIndex ? currentIndex : newIndex
          )
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="scroll-mt-24 bg-[#111] text-white h-screen w-full flex items-center relative overflow-hidden font-sans"
    >
      <div className="w-full flex relative max-w-[1200px] mx-auto h-full px-4 md:px-8">

        {/* Left Label - Hidden on mobile */}
        <div className="hidden md:block w-[25%] lg:w-[30%] pt-[15vh] pr-10">
          <span className="inline-block px-3 py-1.5 bg-white/5 text-white/70 text-[10px] md:text-xs tracking-widest uppercase border border-white/10">
            How We Work
          </span>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-[75%] lg:w-[70%] ml-2 md:ml-0 border-l border-white/10 flex flex-col pt-[10vh] md:pt-[12vh] relative z-10 h-full">

          {/* Mobile Label */}
          <div className="md:hidden pl-6 mb-6">
            <span className="inline-block px-3 py-1.5 bg-white/5 text-white/70 text-[10px] md:text-xs tracking-widest uppercase border border-white/10">
              How We Work
            </span>
          </div>

          {processSteps.map((step, index) => {
            const isActive = activeIndex === index
            return (
              <div key={step.id} className="relative flex w-full mb-4 md:mb-6 group shrink-0">

                {/* Desktop Timeline elements */}
                <div className="hidden md:flex absolute left-[-150px] top-[12px] w-[140px] items-center justify-end pr-6">
                  <div
                    className={`flex items-center transition-all duration-500 ease-out ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                  >
                    <div className="w-5 h-5 bg-[#bf953f] flex items-center justify-center text-black text-[12px]">
                      ✦
                    </div>
                    <div className="w-12 h-[1px] bg-[#bf953f]" />
                  </div>
                  <div className={`ml-4 text-sm tracking-widest transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/50'}`}>
                    {step.id}
                  </div>
                </div>

                {/* The Dot on the Line (Desktop + Mobile) */}
                <div
                  className={`absolute left-[-4px] md:top-[18px] top-[18px] w-2 h-2 rounded-full z-10 transition-colors duration-500 ${
                    isActive ? "bg-[#bf953f]" : "bg-white/30"
                  }`}
                />

                {/* Step Content */}
                <div className="w-full pl-6 md:pl-16 pr-2">
                  {/* Mobile step id */}
                  <div className={`md:hidden text-xs mb-1 transition-colors duration-500 ${isActive ? "text-[#bf953f]" : "text-white/50"}`}>
                    {step.id}
                  </div>

                  <h2
                    className={`text-4xl md:text-6xl lg:text-6xl font-medium uppercase tracking-[-0.04em] leading-[1.1] transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/30"
                    }`}
                    style={{ fontFamily: 'var(--font-gilroy)' }}
                  >
                    {step.title}
                  </h2>

                  {/* Accordion Expandable Content */}
                  <div
                    className={`grid transition-all duration-700 ease-in-out ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100 mt-2 md:mt-3 mb-4"
                        : "grid-rows-[0fr] opacity-0 mt-0 mb-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-xl mb-3 md:mb-4 pt-1">
                        {step.description}
                      </p>

                      {/* Significantly increased Lottie Animation dimensions */}
                      <div className="relative w-full max-w-lg flex items-center justify-start py-1">
                        <div className="w-52 h-52 md:w-72 md:h-72 flex items-center justify-center">
                          {step.animationId === 'drawing' && <DrawingAnimation isActive={isActive} />}
                          {step.animationId === 'belt' && <BeltAnimation isActive={isActive} />}
                          {step.animationId === 'network' && <NetworkAnimation isActive={isActive} />}
                        </div>

                        <div className="absolute bottom-1 left-0">
                          <span className="text-[#bf953f] text-[9px] tracking-widest uppercase bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md border border-[#bf953f]/20">
                            {step.timingLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}