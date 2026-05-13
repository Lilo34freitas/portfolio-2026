"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

export interface StaggeredMenuItem {
  label: string;
  href: string;
}

export interface StaggeredMenuProps {
  items: StaggeredMenuItem[];
  colors?: string[]; // Arrays of underlays starting from furthest to closest
}

const HoverRevealLink = ({ children }: { children: string }) => {
  const DURATION = 0.25;
  const STAGGER = 0.025;

  return (
    <div className="relative block overflow-hidden whitespace-nowrap pb-2">
      <div className="flex">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
            className="inline-block text-[#8A2BE2]"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default function StaggeredMenu({
  items,
  colors = ["#1A1A2E", "#2F293A", "#8A2BE2", "#111111"],
}: StaggeredMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const tlCache = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Check if body scroll should be disabled
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    // Build Timeline
    if (tlCache.current) {
      tlCache.current.kill();
    }

    const tl = gsap.timeline({ paused: true });

    // Ensure elements start positioned to the right
    gsap.set(layerRefs.current, { x: "100%" });
    gsap.set(itemsRef.current, { y: 40, opacity: 0 });

    tl.to(layerRefs.current, {
      x: "0%",
      duration: 0.6,
      ease: "power3.inOut",
      stagger: 0.08,
    });

    tl.to(
      itemsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.06,
      },
      "-=0.2"
    );

    tlCache.current = tl;

    return () => {
      tl.kill();
    };
  }, [items.length]);

  useEffect(() => {
    if (isOpen) {
      tlCache.current?.play();
    } else {
      tlCache.current?.reverse();
    }
  }, [isOpen]);

  return (
    <div className="fixed z-[100] font-body text-white">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 md:top-8 md:right-12 z-[110] w-14 h-14 flex flex-col justify-center items-center gap-[6px] bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors shadow-xl"
        aria-label="Toggle Menu"
      >
        <motion.div
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-[2px] bg-white origin-center"
        />
        <motion.div
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-[2px] bg-white"
        />
        <motion.div
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-[2px] bg-white origin-center"
        />
      </button>

      {/* Menu Overlay Container */}
      <AnimatePresence>
        <div
          className={`fixed inset-0 z-[105] overflow-hidden ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Transparent click-away layer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          {/* Staggered Underlays */}
          {colors.map((color, idx) => (
            <div
              key={idx}
              ref={(el) => {
                layerRefs.current[idx] = el;
              }}
              className="absolute inset-y-0 right-0 w-full md:w-[600px]"
              style={{
                backgroundColor: color,
                zIndex: idx + 1,
              }}
            >
              {/* Final Layer Content */}
              {idx === colors.length - 1 && (
                <div className="w-full h-full flex flex-col justify-center px-12 sm:px-16 md:px-24 relative">
                  {/* Brand / Logo Space (Graffiti) */}
                  <div className="absolute top-12 left-12 sm:left-16 md:left-24 mb-16">
                    <span 
                      className="font-jakArta text-5xl md:text-6xl font-black text-white tracking-widest uppercase"
                      style={{
                        WebkitTextStroke: "2px #1A1A2E",
                        textShadow: "3px 3px 0px #6C5CE7, 6px 6px 0px #00D2FF" // matching "SOBRE M1M" style
                      }}
                    >
                      MENU
                    </span>
                  </div>

                  <div className="flex flex-col gap-6 md:gap-8 mt-16">
                    {items.map((item, i) => (
                      <motion.a
                        key={item.label}
                        ref={(el) => {
                          itemsRef.current[i] = el;
                        }}
                        initial="initial"
                        whileHover="hovered"
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-start gap-6 relative w-fit outline-none"
                      >
                        <span className="text-sm font-mono text-white/30 group-hover:text-[#FF00E5] transition-colors duration-300 min-w-[24px] mt-3">
                          0{i + 1}
                        </span>
                        <span className="text-5xl sm:text-6xl font-quicksand font-bold tracking-wide text-white">
                          <HoverRevealLink>{item.label}</HoverRevealLink>
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
