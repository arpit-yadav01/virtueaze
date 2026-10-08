'use client'

import React, { useEffect, useRef, useState, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Html, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function MacbookModel({ progressRef }: { progressRef: React.MutableRefObject<{ val: number, scale: number, y: number }> }) {
  const { scene } = useGLTF('/models/DracbookPro.glb')
  const groupRef = useRef<THREE.Group>(null)
  const lidRef = useRef<THREE.Object3D | null>(null)
  const screenMeshRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    // Traverse to find the lid and screen
    scene.traverse((child) => {
      const name = child.name.toLowerCase()
      // Usually lid nodes contain "lid", "top", or "display"
      if (name.includes('lid') || name.includes('macbookprotop') || name.includes('screen_group')) {
        lidRef.current = child
      }
      // Screen mesh usually has "screen" in the name
      if (name.includes('screen')) {
        screenMeshRef.current = child as THREE.Mesh
      }
    })

    // If lid wasn't found by name, try to assume the first child that isn't the base
    // This is a generic fallback, but DracbookPro usually has a "Lid" node
    
    if (screenMeshRef.current) {
      screenMeshRef.current.material = new THREE.MeshBasicMaterial({ color: 0x000000 })
    }
  }, [scene])

  useFrame(() => {
    if (groupRef.current) {
      // Zoom camera / scale laptop
      const currentScale = progressRef.current.scale
      groupRef.current.scale.setScalar(currentScale)
      groupRef.current.position.y = progressRef.current.y
    }

    if (lidRef.current) {
      // Rotate lid to open. Adjust max angle as needed.
      const openAngle = -1.9 
      // We start opening at progress 0.1 and finish by 0.5
      const lidProgress = Math.max(0, Math.min(1, (progressRef.current.val - 0.1) / 0.4))
      lidRef.current.rotation.x = openAngle * lidProgress
    }
  })

  return (
    <group ref={groupRef} position={[0, -1, 0]} rotation={[0.2, Math.PI, 0]}>
      <primitive object={scene} />
      
      {/* HTML overlay positioned roughly where the screen is. */}
      {lidRef.current && (
        <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
          {/* We attach the Html inside the lidRef so it rotates with it */}
          <primitive object={lidRef.current}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.16}
              position={[0, 1.45, -1.05]} // approximate coords relative to lid hinge
              rotation={[0, 0, 0]} // no extra rotation needed if it's inside lidRef
            >
              <div className="w-[800px] h-[500px] bg-[#111] overflow-hidden flex flex-col pointer-events-none rounded-lg border-[6px] border-black">
                {/* Header inside screen */}
                <div className="w-full h-12 bg-black flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-4 text-white/50 text-sm font-sans flex-1 text-center pr-16">virtueaze.com</div>
                </div>
                <video
                   src="/v2.mp4"
                   className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
                   autoPlay
                   loop
                   muted
                   playsInline
                 />
              </div>
            </Html>
          </primitive>
        </group>
      )}
    </group>
  )
}

// Preload the model
useGLTF.preload('/models/DracbookPro.glb')

export default function SectionSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  
  // This object will be animated by GSAP and read by R3F's useFrame
  const progressRef = useRef({ val: 0, scale: 3, y: -1 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // 300vh of scrolling
          scrub: true,
          pin: true,
        }
      })

      // 1. Fade out header as we start scrolling
      tl.to(headerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.2,
        ease: "power1.inOut",
      }, 0)

      // 2. Animate the progress value for the R3F component (lid opens during this)
      tl.to(progressRef.current, {
        val: 1,
        duration: 1,
        ease: "none",
      }, 0)

      // 3. Scale up the laptop massively and shift it up so the screen centers
      tl.to(progressRef.current, {
        scale: 14,
        y: -6,
        duration: 0.6,
        ease: "power2.inOut",
      }, 0.4)

      // 4. Fade in the bottom paragraph text at the very end
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      }, 0.8)
      
      const refreshId = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
      return () => cancelAnimationFrame(refreshId)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden font-sans">
      
      {/* Background glow / image that appears when open */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#bf953f]/20 via-[#050505] to-[#050505]" />

      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-10">
        
        {/* Header Content */}
        <div 
          ref={headerRef} 
          className="absolute top-[15%] md:top-[20%] z-20 flex flex-col items-center text-center px-4 w-full pointer-events-none"
        >
          <h2 className="text-6xl md:text-8xl lg:text-[140px] font-bold text-white tracking-tighter uppercase" style={{ fontFamily: 'var(--font-decart)' }}>
            OUR WORK
          </h2>
          <div className="flex items-center gap-4 mt-6">
            <span className="text-white/50 text-xs md:text-sm tracking-[0.2em] uppercase">From digital screens to the big screen</span>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
            <ambientLight intensity={1.5} />
            <Environment preset="city" />
            <Suspense fallback={null}>
              <MacbookModel progressRef={progressRef} />
              <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            </Suspense>
          </Canvas>
        </div>

        {/* Bottom Paragraph */}
        <div 
          ref={textRef}
          className="absolute bottom-[10%] z-20 max-w-2xl text-center px-6 opacity-0 translate-y-10 pointer-events-none"
        >
          <p className="text-white md:text-2xl font-light leading-relaxed mb-6">
            Captivate audiences with bold immersive layouts that celebrate the art of curation through visual tracks of new releases, virtual tours, and interactive spaces.
          </p>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Evoke the style, history, and ambience of your distinct physical space.
          </p>
        </div>

      </div>
    </section>
  )
}
