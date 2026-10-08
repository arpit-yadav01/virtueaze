'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { usePreloader } from './PreloaderContext'

const navigationLinks = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Stories', href: '#stories' },
]

export default function Navbar() {
  const { isLoaded } = usePreloader()
  const headerNavRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      // Cinematic Reveal
      gsap.fromTo(
        headerNavRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1.3 }
      )
    })

    mm.add('(max-width: 767px)', () => {
      gsap.to(headerNavRef.current, { opacity: 1, duration: 0.5, delay: 0.5 })
    })

    return () => mm.revert()
  }, [isLoaded])

  // Scroll handler using theme-aware background variables
  useEffect(() => {
    const handleScroll = () => {
      if (!headerNavRef.current) return
      if (window.scrollY > 20) {
        gsap.to(headerNavRef.current, {
          backgroundColor: 'var(--background)', // Adapts automatically to Light / Dark theme root variables
          borderColor: 'rgba(191, 149, 63, 0.25)', // Golden border
          borderBottomWidth: '1px',
          backdropFilter: 'blur(16px)',
          paddingTop: '0.85rem',
          paddingBottom: '0.85rem',
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.to(headerNavRef.current, {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderBottomWidth: '0px',
          backdropFilter: 'blur(0px)',
          paddingTop: '1.25rem', // py-5 equivalent
          paddingBottom: '1.25rem',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      ref={headerNavRef}
      className="fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-4 md:px-6 py-5 opacity-0 pointer-events-auto transition-all"
    >
      <nav className="flex items-center gap-4" aria-label="Primary navigation">
        <button
          type="button"
          className="flex md:hidden items-center justify-center text-[#bf953f]"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hidden md:flex items-center gap-3">
          {navigationLinks.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--foreground)] px-5 py-2.5 rounded-full border border-[#bf953f]/40 hover:bg-[#bf953f]/10 transition-colors text-[10px] tracking-[0.1em] uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
        <img
          src="./v.png"
          alt="Virtuaze"
          className="h-8 md:h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(191,149,63,0.3)]"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          {navigationLinks.slice(3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--foreground)] px-5 py-2.5 rounded-full border border-[#bf953f]/40 hover:bg-[#bf953f]/10 transition-colors text-[10px] tracking-[0.1em] uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a href="#contact" onClick={() => setMenuOpen(false)} className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-[#BF953F] hover:bg-[#ecab28] text-[#051936] font-medium transition-colors text-[9px] md:text-[10px] tracking-[0.1em] uppercase whitespace-nowrap">
          Book a Demo
        </a>
        <ThemeToggle />
      </div>

      <div
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`absolute left-4 right-4 top-full overflow-hidden rounded-lg border border-[#bf953f]/30 bg-background/95 shadow-xl backdrop-blur-xl md:hidden motion-safe:transition-[max-height,opacity,transform] motion-safe:duration-300 ${menuOpen ? 'max-h-[min(80vh,24rem)] translate-y-2 opacity-100' : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'}`}
      >
        <nav className="grid p-3" aria-label="Mobile links">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-foreground/10 px-4 py-3 text-xs uppercase tracking-[0.15em] text-foreground transition-colors last:border-b-0 hover:text-[#bf953f]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}