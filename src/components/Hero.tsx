"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawCircleText from "./DrawCircleText";

gsap.registerPlugin(ScrollTrigger);

// ── Live clock ─────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/Sao_Paulo",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

// ── Split title into spans for stagger animation ────────────
function SplitTitle({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", ...style }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hero-letter"
          style={{
            display: "inline-block",
            transform: "translateY(110%) rotate(15deg)",
            opacity: 0,
            willChange: "transform, opacity",
            transformOrigin: "left bottom",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const leftWordRef = useRef<HTMLDivElement>(null);
  const rightWordRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // ── Framer scroll progress ─────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Matemática avançada para transição fluida
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeInQuad = (t: number) => t * t;

  const textOpacity = useTransform(scrollYProgress, [0.28, 0.52], [1, 0], { ease: easeInOutCubic });
  const textY = useTransform(scrollYProgress, [0, 0.52], ["0px", "-20px"], { ease: easeInOutCubic });
  // O scale aumenta de 1 para 1.45, dando o efeito de avanço para frente
  const textScale = useTransform(scrollYProgress, [0.2, 0.52], [1, 1.45], { ease: easeInQuad });
  const indicatorOpacity = useTransform(scrollYProgress, [0.03, 0.18], [1, 0]);
  const locationOpacity = useTransform(scrollYProgress, [0.2, 0.42], [1, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.22, 0.48], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.48], ["0px", "-60px"]);

  // ── Entrance choreography ──────────────────────────────
  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const letters = titleRef.current!.querySelectorAll<HTMLElement>(".hero-letter");

      const tl = gsap.timeline({ delay: 0.15 });

      // Location drops in
      tl.fromTo(
        locationRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );

      // Letters stagger up
      tl.fromTo(
        letters,
        { y: "110%", opacity: 0, rotate: 15 },
        {
          y: "0%",
          opacity: 1,
          rotate: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.05,
        },
        "-=0.4"
      );

      // Left word flies in from left
      tl.fromTo(
        leftWordRef.current,
        { x: "-110%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1.1, ease: "power3.out" },
        "-=0.75"
      );

      // Right word flies in from right
      tl.fromTo(
        rightWordRef.current,
        { x: "110%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1.1, ease: "power3.out" },
        "<"
      );

      // Text block fades up
      tl.fromTo(
        textBlockRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── GSAP ScrollTrigger: horizontal approach ────────────
  useEffect(() => {
    if (!leftWordRef.current || !rightWordRef.current || !containerRef.current) return;

    const timer = setTimeout(() => {
      const mm = gsap.matchMedia();

      // Mobile (<= 480px)
      mm.add("(max-width: 480px)", () => {
        gsap.to(leftWordRef.current, {
          x: "55%",
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "35% top", // Disappears earlier
            scrub: 1.8,
          },
        });

        gsap.to(rightWordRef.current, {
          x: "-55%",
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "35% top", // Disappears earlier
            scrub: 1.8,
          },
        });
      });

      // Desktop (> 480px)
      mm.add("(min-width: 481px)", () => {
        gsap.to(leftWordRef.current, {
          x: "55%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "58% top",
            scrub: 1.8,
          },
        });

        gsap.to(rightWordRef.current, {
          x: "-55%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "58% top",
            scrub: 1.8,
          },
        });
      });
    }, 2400);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative bg-transparent"
      style={{ height: "280vh" }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Top-left: Location + Time ── */}
        <motion.div
          className="absolute top-5 left-5 z-30"
          style={{ opacity: locationOpacity }}
        >
          <div ref={locationRef} style={{ opacity: 0 }}>
            <p style={{
              fontFamily: "var(--font-geist-mono, 'Courier New', monospace)",
              fontSize: "clamp(9px, 1.1vw, 12px)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              lineHeight: 1.7,
              color: "rgba(248, 249, 250, 0.5)",
            }}>
              Itajaí, SC&nbsp;&nbsp;|&nbsp;&nbsp;<LiveClock />&nbsp;&nbsp;GMT-3
            </p>
          </div>
        </motion.div>

        {/* ── MAIN TITLE — full width, one line, top area ── */}
        <motion.div
          className="absolute top-0 left-0 w-full flex items-start justify-center z-20 max-[480px]:pt-[11vh] min-[480px]:pt-[clamp(3.5rem,7vh,6rem)]"
          style={{
            opacity: titleOpacity,
            y: titleY,
            paddingLeft: "clamp(0.5rem, 2vw, 2rem)",
            paddingRight: "clamp(0.5rem, 2vw, 2rem)",
          }}
        >
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-anton), Impact, 'Arial Black', sans-serif",
              fontSize: "clamp(3.5rem, 13.5vw, 14rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {/* MURILO — white */}
            <SplitTitle
              text="MURILO "
              style={{ color: "#ffffff" }}
            />
            {/* FREITAS — violet */}
            <SplitTitle
              text="FREITAS"
              style={{ color: "#6C5CE7" }}
            />
          </h1>
        </motion.div>

        {/* ── SPLIT WORDS + CENTER TEXT (middle zone of viewport) ── */}
        <div
          className="absolute left-0 w-full flex flex-col min-[480px]:flex-row items-center justify-center max-[480px]:top-[22vh] min-[480px]:top-[43vh]"
          style={{ bottom: "12vh" }}
        >
          {/* Mobile wrapper for side-by-side words */}
          <div className="max-[480px]:flex max-[480px]:flex-row max-[480px]:w-full max-[480px]:justify-between max-[480px]:px-6 max-[480px]:order-1 max-[480px]:mb-10 min-[480px]:contents">
            {/* Left: AUTOMAÇÃO INTELIGENTE */}
            <div
              ref={leftWordRef}
              className="opacity-0 select-none max-[480px]:relative min-[480px]:absolute min-[480px]:left-0"
            >
              <span 
                className="max-[480px]:!text-[4.5vw] min-[480px]:pl-[3vw]"
                style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(1.6rem, 4.5vw, 5.5rem)",
                lineHeight: 1.0,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "block",
                whiteSpace: "nowrap",
                color: "#ffffff",
                textAlign: "left",
              }}>
                AUTOMAÇÃO
                <br />
                <span style={{ color: "#6C5CE7" }}>
                  INTELIGENTE
                </span>
              </span>
            </div>

            {/* Right: SUPORTE EFICIENTE */}
            <div
              ref={rightWordRef}
              className="opacity-0 select-none max-[480px]:relative min-[480px]:absolute min-[480px]:right-0"
            >
              <span 
                className="max-[480px]:!text-[4.5vw] min-[480px]:pr-[3vw]"
                style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(1.6rem, 4.5vw, 5.5rem)",
                lineHeight: 1.0,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "block",
                whiteSpace: "nowrap",
                color: "#ffffff",
                textAlign: "right",
              }}>
                SUPORTE
                <br />
                <span style={{ color: "#6C5CE7" }}>
                  EFICIENTE
                </span>
              </span>
            </div>
          </div>

          {/* Center: Bio text block */}
          <motion.div
            className="relative z-20 flex flex-col items-center text-center max-[480px]:order-3"
            style={{
              opacity: textOpacity,
              y: textY,
              scale: textScale,
              maxWidth: "min(440px, 78vw)",
              padding: "0 1rem",
            }}
          >
            <div ref={textBlockRef} style={{ opacity: 0, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Bio — Texto normal */}
              <p
                style={{
                  fontFamily: "var(--font-quicksand), Quicksand, sans-serif",
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  lineHeight: 1.9,
                  fontWeight: 400,
                  color: "rgba(248, 249, 250, 0.8)",
                  textAlign: "center",
                  width: "100%",
                  display: "block",
                }}
              >
                Analista de <DrawCircleText color="#6C5CE7" delay={0.6} strokeWidth={3}>Suporte Técnico e Infraestrutura</DrawCircleText> com experiência sólida em ambientes corporativos, atuando ativamente em camadas N1 e N2. Especializado no ecossistema Microsoft 365, Azure AD e gestão inteligente de infraestrutura de TI, sempre com foco extremo em organização, automação e melhoria contínua de processos.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll Indicator ── */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-30"
          style={{ opacity: indicatorOpacity, bottom: "2rem" }}
        >
          <div ref={scrollIndicatorRef} className="flex flex-col items-center gap-3" style={{ opacity: 0 }}>
            <div style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(0,210,255,0.75), transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-geist-mono, 'Courier New', monospace)",
              fontSize: "9px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(248, 249, 250, 0.3)",
            }}>
              scroll
            </span>
          </div>
        </motion.div>

      </div>

      {/* ── Gradient bridge → About ── */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: "30vh",
          background: "linear-gradient(to bottom, transparent 0%, rgba(8, 6, 18, 0.7) 55%, rgba(8, 6, 18, 0.97) 100%)",
          zIndex: 40,
        }}
      />

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.3; transform: scaleY(0.6); }
        }
      `}</style>
    </section>
  );
}
