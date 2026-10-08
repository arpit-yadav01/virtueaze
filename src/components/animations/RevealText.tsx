"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  // Use React's built-in ElementType instead of the global JSX namespace
  tagName?: React.ElementType; 
}

export default function RevealText({
  children,
  delay = 0,
  className = "",
  tagName = "div",
}: RevealTextProps) {
  const ref = useRef(null);
  
  // Use the motion() factory function to dynamically generate the component.
  // This avoids TypeScript indexing errors entirely.
  const MotionTag = motion(tagName as any) as any;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <MotionTag
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.16, 1, 0.3, 1], // Custom cubic bezier for premium feel
        }}
        className="block"
      >
        {children}
      </MotionTag>
    </div>
  );
}