"use client";

import { useEffect, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform, useSpring } from "framer-motion";

const TOTAL_FRAMES = 40;

/* ─────────────────────────────────────────────
   TEXT OVERLAY CONFIG
   Matches requested "Zenith X" flow
   ───────────────────────────────────────────── */
interface OverlaySection {
  id: string;
  title: string;
  align: "center" | "left" | "right";
  rangeIn: [number, number];
  rangeOut: [number, number];
}

const OVERLAYS: OverlaySection[] = [
  {
    id: "zenith",
    title: "Zenith X. Pure Sound.",
    align: "center",
    rangeIn: [0.0, 0.05],
    rangeOut: [0.15, 0.22],
  },
  {
    id: "precision",
    title: "Precision Engineering.",
    align: "left",
    rangeIn: [0.28, 0.33],
    rangeOut: [0.45, 0.52],
  },
  {
    id: "titanium",
    title: "Titanium Drivers.",
    align: "right",
    rangeIn: [0.55, 0.60],
    rangeOut: [0.72, 0.79],
  },
  {
    id: "hear",
    title: "Hear Everything.",
    align: "center",
    rangeIn: [0.85, 0.90],
    rangeOut: [0.98, 1.0],
  },
];

/* ─── Individual Text Overlay Component ─── */
function TextOverlay({
  section,
  scrollProgress,
}: {
  section: OverlaySection;
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    scrollProgress,
    [
      section.rangeIn[0],
      section.rangeIn[1],
      section.rangeOut[0],
      section.rangeOut[1],
    ],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollProgress,
    [
      section.rangeIn[0],
      section.rangeIn[1],
      section.rangeOut[0],
      section.rangeOut[1],
    ],
    [40, 0, 0, -40]
  );

  const alignClass =
    section.align === "left"
      ? "items-start text-left pl-8 md:pl-20 lg:pl-32"
      : section.align === "right"
      ? "items-end text-right pr-8 md:pr-20 lg:pr-32"
      : "items-center text-center";

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col justify-center ${alignClass} pointer-events-none z-10`}
      style={{ opacity, y }}
    >
      <h2
        className={`overlay-text text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white/90 leading-none ${
          section.id === "hear" ? "overlay-text--glow-cyan" : ""
        }`}
      >
        {section.title}
      </h2>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN CANVAS HERO COMPONENT (AWWWARDS LEVEL)
   ───────────────────────────────────────────── */
interface HeadphoneScrollProps {
  images: HTMLImageElement[];
}

export default function HeadphoneScroll({ images }: HeadphoneScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  /* LERP State */
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Smooth parallax value */
  const parallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 20]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  /* Map scroll straight to target frame */
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      targetFrameRef.current = latest * (TOTAL_FRAMES - 1);
    });
  }, [scrollYProgress]);

  /* ── Draw logic ── */
  const drawFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // 1. Calculate LERP
    const target = targetFrameRef.current;
    let current = currentFrameRef.current;

    // Lerp smoothing factor. Higher = snappier, lower = smoother.
    current += (target - current) * 0.08;
    currentFrameRef.current = current;

    // 2. Velocity calculation for Motion Blur
    const velocity = Math.abs(target - current);
    const blurAmount = Math.min(velocity * 2, 8); // clamp between 0 and 8px
    ctx.filter = `blur(${blurAmount}px)`;

    // 3. Determine frames to crossfade
    const lowerFrameIndex = Math.floor(current);
    const upperFrameIndex = Math.ceil(current);
    const blendFactor = current - lowerFrameIndex;

    const imgLower = images[lowerFrameIndex];
    const imgUpper = images[Math.min(upperFrameIndex, TOTAL_FRAMES - 1)];

    if (!imgLower || !imgLower.complete || imgLower.naturalWidth === 0) {
        rafRef.current = requestAnimationFrame(drawFrame);
        return;
    }

    // 4. Handle Canvas Scaling (High-DPI & Object-Contain)
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep dark background match #050505
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Cinematic Glow Enhancement
    ctx.shadowColor = "rgba(0,255,255,0.2)";
    ctx.shadowBlur = 20;

    const drawImageScaled = (img: HTMLImageElement, alpha: number) => {
      ctx.globalAlpha = alpha;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = displayWidth / displayHeight;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        drawWidth = displayWidth;
        drawHeight = displayWidth / imgRatio;
        offsetX = 0;
        offsetY = (displayHeight - drawHeight) / 2;
      } else {
        drawHeight = displayHeight;
        drawWidth = displayHeight * imgRatio;
        offsetX = (displayWidth - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // 5. Draw Crossfade
    if (lowerFrameIndex === upperFrameIndex) {
      drawImageScaled(imgLower, 1);
    } else {
      drawImageScaled(imgLower, 1 - blendFactor);
      if (imgUpper && imgUpper.complete) {
        drawImageScaled(imgUpper, blendFactor);
      }
    }

    ctx.restore();

    // Loop
    rafRef.current = requestAnimationFrame(drawFrame);
  };

  /* ── Start rendering loop ── */
  useEffect(() => {
    if (images.length > 0) {
      rafRef.current = requestAnimationFrame(drawFrame);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [images]);

  return (
    <section ref={containerRef} className="relative h-[400vh]" id="hero-scroll">
      {/* ── Sticky canvas viewport ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden canvas-container bg-brand-dark">
        {/* Parallax wrapper around canvas */}
        <motion.canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
          style={{ 
            display: "block",
            y: parallaxY, 
            scale: 1.05 // slightly scale up to prevent edges showing during parallax
          }}
        />

        {/* ── Cinematic Grain Overlay ── */}
        <div className="grain-overlay" />

        {/* ── Text Overlays ── */}
        {OVERLAYS.map((section) => (
          <TextOverlay
            key={section.id}
            section={section}
            scrollProgress={scrollYProgress}
          />
        ))}

        {/* ── Scroll Indicator ── */}
        <ScrollIndicator scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
}

/* ─── Scroll Indicator (fades out as user scrolls) ─── */
function ScrollIndicator({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0, 0.05], [1, 0]);

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-20"
      style={{ opacity }}
    >
      <span className="text-white/30 text-xs tracking-[0.4em] uppercase font-light">
        Scroll
      </span>
      <motion.div
        className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
