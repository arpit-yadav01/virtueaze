"use client";

import FooterVirtuaze from "@/components/ScrollExpand/footer";
import SmoothScrollProvider from "@/Lenis/lenis";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Spotlight from '@/components/spotlight/Spotlight';
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import ProblemSolution from "@/components/ProblemSolution";
import WhyBuyersExplore from "@/components/WhyBuyersExplore";
import Applications from "@/components/Applications";
import HowWeWork from "@/components/HowWeWork";
import Channels from "@/components/Channels";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import Faqs from "@/components/Faqs";
import CTA from "@/components/Cta";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <CustomCursor />
      <SmoothScrollProvider>
        <Navbar />
        <Hero />
        <Partners />
        <ProblemSolution />
        <WhyBuyersExplore />
        <Applications />
        <HowWeWork />
        <Channels />
        <Testimonials />
        <Spotlight />
        <Projects />
        <Faqs />
        <CTA />
        <FooterVirtuaze />
      </SmoothScrollProvider>
    </main>
  );
}
