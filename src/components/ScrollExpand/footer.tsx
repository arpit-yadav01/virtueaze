"use client";

import React, { useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = {
  youtubeLink: 'https://youtube.com',
  instaLink: 'https://instagram.com',
  linkedinLink: 'https://linkedin.com',
  contact: {
    email: 'contact@virtuaze.com',
    uaePhone: '+971 58 946 8963',
    indiaPhone: '+91 91068 24049',
    uaeAddress: 'Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates',
    indiaAddress: 'A - 06, Krish Residency - 2, near Deepak School, Ankur Chokadi, New India Colony, Nikol, Ahmedabad, Gujarat 380049',
  },
  company: {
    name: 'Virtuaze',
    logo: './v.png',
  },
};

export default function FooterVirtuaze() {
  const footerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const uaeOfficeRef = useRef<HTMLDivElement>(null);
  const indiaOfficeRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Left Column Smooth Stagger Animation
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Right Column Offices Staggered Animation
      const offices = [uaeOfficeRef.current, indiaOfficeRef.current];
      offices.forEach((office, index) => {
        if (!office) return;
        gsap.fromTo(
          office,
          { opacity: 0, y: 45, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 3. Bottom Copyright Bar Entrance Animation
      if (bottomBarRef.current) {
        gsap.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-background text-foreground w-full mt-16 px-6 md:px-20 py-16 border-t border-neutral-800 relative overflow-hidden selection:bg-[#d4af37]/30"
    >
      {/* Ambient Gold Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b38728]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-screen-xl relative z-10">
        {/* Top Grid: Left Stay Connected, Right Offices */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 justify-between">
          
          {/* Left Column: Stay Connected */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Logo Image */}
              <div className="mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.company.logo}
                  alt={data.company.name}
                  className="h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
                Stay connected
              </h2>
              <p className="text-sm md:text-base text-zinc-400 font-light mb-6">
                For project enquiries email:<br />
                <span className="text-foreground font-medium">{data.contact.email}</span>
              </p>
              
              <a
                href={`mailto:${data.contact.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#b38728]/50 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#b38728] hover:text-foreground transition-all shadow-[0_0_15px_rgba(179,135,40,0.15)] w-fit"
              >
                Email Us <ArrowRight className="size-4" />
              </a>
            </div>

            {/* Social Icons with Golden Accent */}
            <div className="flex items-center gap-6 mt-12">
              {/* YouTube Icon */}
              <Link
                href={data.youtubeLink}
                className="text-zinc-300 hover:text-[#fcf6ba] transition-colors p-2.5 rounded-lg border border-neutral-800 hover:border-[#b38728] bg-neutral-900 shadow-sm"
                aria-label="YouTube"
              >
                <svg className="size-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>

              {/* Instagram Icon */}
              <Link
                href={data.instaLink}
                className="text-zinc-300 hover:text-[#fcf6ba] transition-colors p-2.5 rounded-lg border border-neutral-800 hover:border-[#b38728] bg-neutral-900 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="size-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </Link>

              {/* LinkedIn Icon */}
              <Link
                href={data.linkedinLink}
                className="text-zinc-300 hover:text-[#fcf6ba] transition-colors p-2.5 rounded-lg border border-neutral-800 hover:border-[#b38728] bg-neutral-900 shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="size-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Offline / Offices with Staggered Refs */}
          <div className="lg:col-span-6 flex flex-col space-y-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#fcf6ba] font-semibold mb-4 block">
                Offline
              </span>
              
              {/* UAE Office */}
              <div ref={uaeOfficeRef} className="opacity-0">
                <h3 className="text-lg font-medium text-foreground mb-1">UAE Office</h3>
                <address className="not-italic text-sm text-zinc-400 font-light leading-relaxed mb-3">
                  {data.contact.uaeAddress}
                </address>
                <p className="text-sm text-zinc-300 font-medium mb-3">
                  Phone: <span className="font-light">{data.contact.uaePhone}</span>
                </p>
                <a
                  href={`tel:${data.contact.uaePhone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#b38728]/40 bg-foreground text-background text-xs uppercase tracking-[0.15em] hover:bg-[#b38728] hover:text-foreground transition-all shadow-sm w-fit"
                >
                  Call UAE Office <ArrowRight className="size-3.5" />
                </a>
              </div>

              {/* India Office */}
              <div ref={indiaOfficeRef} className="mt-8 opacity-0">
                <h3 className="text-lg font-medium text-foreground mb-1">India Office</h3>
                <address className="not-italic text-sm text-zinc-400 font-light leading-relaxed mb-3">
                  {data.contact.indiaAddress}
                </address>
                <p className="text-sm text-zinc-300 font-medium mb-3">
                  Phone: <span className="font-light">{data.contact.indiaPhone}</span>
                </p>
                <a
                  href={`tel:${data.contact.indiaPhone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#b38728]/40 bg-foreground text-background text-xs uppercase tracking-[0.15em] hover:bg-[#b38728] hover:text-foreground transition-all shadow-sm w-fit"
                >
                  Call India Office <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div ref={bottomBarRef} className="mt-16 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-light opacity-0">
          <p>&copy; {new Date().getFullYear()} {data.company.name}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="hover:text-[#fcf6ba] transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}