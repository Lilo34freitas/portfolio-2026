"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlockRevealText } from "./BlockRevealText";

gsap.registerPlugin(ScrollTrigger);

export default function Hero01() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* ── Fade out + subtle lift as user scrolls (like Nexus) ── */
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], ["0px", "-60px"]);

  /* ── Scroll indicator fades early ── */
  const indicatorOpacity = useTransform(scrollYProgress, [0.05, 0.2], [1, 0]);

  /* ── GSAP: Entrance choreography (igual ao Nexus) ── */
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleRef.current,
      {
        y: 70,
        opacity: 0,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 1.3,
        ease: "power4.out",
      }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-transparent">
      {/* Sticky scene container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Cinematic Grain */}
        <div className="grain-overlay z-10" />

        {/* ── HERO CONTENT — Centered like Nexus ── */}
        <motion.div
           ref={heroContentRef}
           className="relative z-30 flex flex-col items-center text-center px-6"
           style={{ opacity: contentOpacity, y: contentY }}
        >
           {/* Welcome line */}
           <p className="text-brand-white/80 font-body text-sm md:text-lg lg:text-xl max-w-lg mb-3 leading-relaxed uppercase tracking-widest font-bold">
             <BlockRevealText delay={0}>Bem vindo, me chamo</BlockRevealText>
           </p>

           {/* Main title */}
           <h1
             ref={titleRef}
             className="leading-none mb-6 opacity-0 uppercase text-center"
             style={{
               fontFamily: "var(--font-aerosol), sans-serif",
               fontSize: "clamp(4rem, 16vw, 14rem)",
               letterSpacing: "0.02em",
               overflow: "visible",
               paddingRight: "0.15em",
             }}
           >
             {/* MURILO — Fill branco sólido: stroke espesso + paint-order */}
             <span style={{
               color: "#ffffff",
               WebkitTextStroke: "0.06em #ffffff",
               paintOrder: "stroke fill",
               textShadow: "1px 1px 0px #000, 2px 2px 0px #000, 3px 3px 0px #000, 4px 4px 0px #00D2FF, 5px 5px 0px #00D2FF, 6px 6px 0px #00D2FF",
               display: "inline-block",
             }}>
               <BlockRevealText delay={0.2}>MURILO</BlockRevealText>
             </span>
             <br />
             {/* FREITAS — Fill roxo sólido: stroke espesso + paint-order */}
             <span style={{
               color: "#6C5CE7",
               WebkitTextStroke: "0.06em #6C5CE7",
               paintOrder: "stroke fill",
               textShadow: "1px 1px 0px #000, 2px 2px 0px #000, 3px 3px 0px #000, 4px 4px 0px #4834d4, 5px 5px 0px #4834d4, 6px 6px 0px #4834d4",
               display: "inline-block",
               paddingRight: "0.12em",
             }}>
               <BlockRevealText delay={0.4}>FREITAS</BlockRevealText>
             </span>
           </h1>

           {/* Cargo / Subtitle */}
           <p
             ref={subtitleRef}
             className="text-brand-white/80 font-body text-sm md:text-lg lg:text-xl max-w-lg mb-12 leading-relaxed opacity-0 uppercase tracking-widest font-bold"
           >
             <BlockRevealText delay={0.6}>Analista de Suporte Técnico e</BlockRevealText> <br/>
             <BlockRevealText delay={0.7}>Infraestrutura</BlockRevealText>
           </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 flex flex-col items-center gap-3 z-30 opacity-0"
          style={{ opacity: indicatorOpacity }}
        >
          <div
            className="w-px h-12 bg-gradient-to-b from-brand-cyan to-transparent"
            style={{
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
          <span className="font-mono text-[10px] tracking-[3px] text-brand-white/40 uppercase">
            Scroll
          </span>
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.3; transform: scaleY(0.6); }
        }
      `}</style>
    </section>
  );
}
