'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

// --- 1. Drawing Animation (Polygon + Cursor) ---
export function DrawingAnimation({ isActive }: { isActive: boolean }) {
    const containerRef = useRef<SVGSVGElement>(null)
    const cursorRef = useRef<SVGGElement>(null)
    const line1Ref = useRef<SVGLineElement>(null)
    const line2Ref = useRef<SVGLineElement>(null)
    const line3Ref = useRef<SVGLineElement>(null)
    const line4Ref = useRef<SVGLineElement>(null)
    const rect1Ref = useRef<SVGRectElement>(null)
    const rect2Ref = useRef<SVGRectElement>(null)
    const rect3Ref = useRef<SVGRectElement>(null)
    const rect4Ref = useRef<SVGRectElement>(null)

    useEffect(() => {
        if (!isActive) return
        const ctx = gsap.context(() => {
            const p1 = { x: 100, y: 80 }
            const p2 = { x: 300, y: 60 }
            const p3 = { x: 350, y: 220 }
            const p4 = { x: 80, y: 250 }

            const updatePaths = () => {
                line1Ref.current?.setAttribute('x1', String(p1.x))
                line1Ref.current?.setAttribute('y1', String(p1.y))
                line1Ref.current?.setAttribute('x2', String(p2.x))
                line1Ref.current?.setAttribute('y2', String(p2.y))

                line2Ref.current?.setAttribute('x1', String(p2.x))
                line2Ref.current?.setAttribute('y1', String(p2.y))
                line2Ref.current?.setAttribute('x2', String(p3.x))
                line2Ref.current?.setAttribute('y2', String(p3.y))

                line3Ref.current?.setAttribute('x1', String(p3.x))
                line3Ref.current?.setAttribute('y1', String(p3.y))
                line3Ref.current?.setAttribute('x2', String(p4.x))
                line3Ref.current?.setAttribute('y2', String(p4.y))

                line4Ref.current?.setAttribute('x1', String(p4.x))
                line4Ref.current?.setAttribute('y1', String(p4.y))
                line4Ref.current?.setAttribute('x2', String(p1.x))
                line4Ref.current?.setAttribute('y2', String(p1.y))

                rect1Ref.current?.setAttribute('x', String(p1.x - 4))
                rect1Ref.current?.setAttribute('y', String(p1.y - 4))
                rect2Ref.current?.setAttribute('x', String(p2.x - 4))
                rect2Ref.current?.setAttribute('y', String(p2.y - 4))
                rect3Ref.current?.setAttribute('x', String(p3.x - 4))
                rect3Ref.current?.setAttribute('y', String(p3.y - 4))
                rect4Ref.current?.setAttribute('x', String(p4.x - 4))
                rect4Ref.current?.setAttribute('y', String(p4.y - 4))
            }

            updatePaths()

            const tl = gsap.timeline({ repeat: -1, onUpdate: updatePaths })

            // Start state
            gsap.set(cursorRef.current, { x: 200, y: 150, opacity: 0 })
            tl.to(cursorRef.current, { opacity: 1, duration: 0.5 })

            // Move to P4
            tl.to(cursorRef.current, { x: p4.x, y: p4.y, duration: 1, ease: 'power2.inOut' })
            tl.to(cursorRef.current, { scale: 0.85, duration: 0.15 }) // click down
            // Drag P4
            tl.to(cursorRef.current, { x: 40, y: 270, duration: 1.5, ease: 'power1.inOut' }, 'drag1')
            tl.to(p4, { x: 40, y: 270, duration: 1.5, ease: 'power1.inOut' }, 'drag1')
            tl.to(cursorRef.current, { scale: 1, duration: 0.15 }) // release

            // Move to P2
            tl.to(cursorRef.current, { x: p2.x, y: p2.y, duration: 1.2, ease: 'power2.inOut' })
            tl.to(cursorRef.current, { scale: 0.85, duration: 0.15 }) // click down
            // Drag P2
            tl.to(cursorRef.current, { x: 330, y: 30, duration: 1.5, ease: 'power1.inOut' }, 'drag2')
            tl.to(p2, { x: 330, y: 30, duration: 1.5, ease: 'power1.inOut' }, 'drag2')
            tl.to(cursorRef.current, { scale: 1, duration: 0.15 }) // release

            // Move to P1
            tl.to(cursorRef.current, { x: p1.x, y: p1.y, duration: 1.2, ease: 'power2.inOut' })
            tl.to(cursorRef.current, { scale: 0.85, duration: 0.15 }) // click down
            // Drag P1
            tl.to(cursorRef.current, { x: 130, y: 40, duration: 1.5, ease: 'power1.inOut' }, 'drag3')
            tl.to(p1, { x: 130, y: 40, duration: 1.5, ease: 'power1.inOut' }, 'drag3')
            tl.to(cursorRef.current, { scale: 1, duration: 0.15 }) // release

            // Fade out and return
            tl.to(cursorRef.current, { opacity: 0, duration: 0.5 })
            tl.to(cursorRef.current, { x: 200, y: 150, duration: 0.1 })

        }, containerRef)

        return () => ctx.revert()
    }, [isActive])

    return (
        <svg ref={containerRef} viewBox="0 0 400 300" className="w-full h-full">
            <g stroke="#bf953f" strokeWidth="1" fill="none">
                <line ref={line1Ref} />
                <line ref={line2Ref} />
                <line ref={line3Ref} />
                <line ref={line4Ref} />
                <rect ref={rect1Ref} width="8" height="8" />
                <rect ref={rect2Ref} width="8" height="8" />
                <rect ref={rect3Ref} width="8" height="8" />
                <rect ref={rect4Ref} width="8" height="8" />
            </g>
            <g ref={cursorRef} className="origin-top-left">
                {/* Arrow cursor drawing */}
                <path d="M0,0 L14,14 L6,14 L0,22 Z" fill="#bf953f" stroke="#111" strokeWidth="1.5" />
            </g>
        </svg>
    )
}

// --- 2. Belt Animation (Capsule + Wheels) ---
export function BeltAnimation({ isActive }: { isActive: boolean }) {
    const containerRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        if (!isActive) return
        const ctx = gsap.context(() => {
            gsap.to('.belt-line', {
                strokeDashoffset: -12,
                duration: 0.5,
                ease: 'none',
                repeat: -1
            })
            gsap.to('.wheel', {
                rotation: 360,
                transformOrigin: 'center',
                duration: 4,
                ease: 'none',
                repeat: -1
            })
        }, containerRef)
        return () => ctx.revert()
    }, [isActive])

    return (
        <svg ref={containerRef} viewBox="0 0 400 300" className="w-full h-full">
            <g stroke="#bf953f" strokeWidth="1" fill="none">
                {/* Solid background frame */}
                <rect x="50" y="100" width="300" height="100" rx="50" opacity="0.15" />
                
                {/* Dashed moving belts */}
                <line className="belt-line" x1="100" y1="100" x2="300" y2="100" strokeDasharray="6 6" />
                <line className="belt-line" x1="300" y1="200" x2="100" y2="200" strokeDasharray="6 6" />
                
                {/* Solid end caps */}
                <path d="M 100,100 A 50,50 0 0,0 100,200" />
                <path d="M 300,200 A 50,50 0 0,0 300,100" />

                {/* Internal Wheels */}
                <g className="wheel" style={{ transformOrigin: '100px 150px' }}>
                    <circle cx="100" cy="150" r="30" strokeDasharray="15 15" strokeWidth="1.5" />
                    <circle cx="100" cy="150" r="4" fill="#bf953f" />
                </g>
                <g className="wheel" style={{ transformOrigin: '300px 150px' }}>
                    <circle cx="300" cy="150" r="30" strokeDasharray="15 15" strokeWidth="1.5" />
                    <circle cx="300" cy="150" r="4" fill="#bf953f" />
                </g>
            </g>
        </svg>
    )
}

// --- 3. Network Animation (Nodes + Pulses) ---
export function NetworkAnimation({ isActive }: { isActive: boolean }) {
    const containerRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        if (!isActive) return
        const ctx = gsap.context(() => {
            const lines = gsap.utils.toArray('.pulse-line')

            lines.forEach((line: any) => {
                const triggerPulse = () => {
                    const duration = 1.5 + Math.random() * 1
                    gsap.fromTo(
                        line,
                        { strokeDashoffset: 150 },
                        {
                            strokeDashoffset: -150,
                            duration: duration,
                            ease: 'power1.inOut',
                            onComplete: () => {
                                gsap.delayedCall(Math.random() * 1.5, triggerPulse)
                            },
                        }
                    )
                }
                gsap.delayedCall(Math.random() * 2, triggerPulse)
            })

            // Gentle pulsing of nodes
            gsap.to('.node-circle', {
                scale: 1.15,
                duration: 2,
                yoyo: true,
                repeat: -1,
                stagger: 0.4,
                transformOrigin: 'center',
                ease: 'sine.inOut'
            })
        }, containerRef)

        return () => ctx.revert()
    }, [isActive])

    return (
        <svg ref={containerRef} viewBox="0 0 400 300" className="w-full h-full">
            <g stroke="#bf953f" strokeWidth="1" fill="none">
                {/* Background tracks */}
                <g opacity="0.15">
                    <line x1="200" y1="60" x2="100" y2="150" />
                    <line x1="200" y1="60" x2="300" y2="150" />
                    <line x1="100" y1="150" x2="200" y2="240" />
                    <line x1="300" y1="150" x2="200" y2="240" />
                    <line x1="100" y1="150" x2="300" y2="150" />
                    <line x1="200" y1="60" x2="200" y2="240" />
                </g>

                {/* Pulse lines on top */}
                <g strokeWidth="1.5">
                    <line className="pulse-line" x1="200" y1="60" x2="100" y2="150" strokeDasharray="30 150" />
                    <line className="pulse-line" x1="200" y1="60" x2="300" y2="150" strokeDasharray="30 150" />
                    <line className="pulse-line" x1="100" y1="150" x2="200" y2="240" strokeDasharray="30 150" />
                    <line className="pulse-line" x1="300" y1="150" x2="200" y2="240" strokeDasharray="30 150" />
                    <line className="pulse-line" x1="100" y1="150" x2="300" y2="150" strokeDasharray="30 250" />
                    <line className="pulse-line" x1="200" y1="60" x2="200" y2="240" strokeDasharray="30 250" />
                </g>

                {/* Nodes */}
                <circle className="node-circle" cx="200" cy="60" r="6" fill="#111" />
                <circle className="node-circle" cx="100" cy="150" r="6" fill="#111" />
                <circle className="node-circle" cx="300" cy="150" r="6" fill="#111" />
                <circle className="node-circle" cx="200" cy="240" r="6" fill="#111" />
                
                <circle cx="200" cy="60" r="3" fill="#bf953f" />
                <circle cx="100" cy="150" r="3" fill="#bf953f" />
                <circle cx="300" cy="150" r="3" fill="#bf953f" />
                <circle cx="200" cy="240" r="3" fill="#bf953f" />
            </g>
        </svg>
    )
}
