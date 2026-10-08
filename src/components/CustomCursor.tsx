"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Show cursor on first mouse move
    const onFirstMove = (e: MouseEvent) => {
      setIsVisible(true);
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      window.removeEventListener("mousemove", onFirstMove);
    };
    window.addEventListener("mousemove", onFirstMove);

    // Continuous mouse movement logic
    const onMouseMove = (e: MouseEvent) => {
      if (isVisible) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out",
        });
      } else {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Interactive elements hover logic
    const interactables = document.querySelectorAll(
      "a, button, input, textarea, select, .interactable"
    );

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.2 });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
    };

    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onFirstMove);
      window.removeEventListener("mousemove", onMouseMove);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      style={{ opacity: isVisible ? 1 : 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white/20 mix-blend-difference transition-opacity duration-300 hidden md:block"
    />
  );
}
