"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

type Phase = "drawing" | "zooming" | "exiting";

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("drawing");
  const [canvasReady, setCanvasReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.body.classList.add("loading");
    return () => document.body.classList.remove("loading");
  }, []);

  const handleExitComplete = () => {
    document.body.classList.remove("loading");
    onComplete();
  };

  // ── Phase 1: Draw letters ──────────────────────────────────────
  useEffect(() => {
    let raf: number;
    let stopped = false;

    const initLeon = () => {
      const LeonSans = (window as any).LeonSans;
      if (!LeonSans || !canvasRef.current) {
        if (!stopped) setTimeout(initLeon, 100);
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      const dpr = window.devicePixelRatio || 1;
      const sw = window.innerWidth;
      const sh = window.innerHeight;

      canvas.width = sw * dpr;
      canvas.height = sh * dpr;
      canvas.style.width = sw + "px";
      canvas.style.height = sh + "px";
      ctx.scale(dpr, dpr);

      // Font size: cinematic medium — fills ~40% of screen width
      const fontSize = Math.min(Math.max(sw / 9, 60), 160);

      const leon = new LeonSans({
        text: "Murilo\nFreitas",
        color: ["#EAF3FF"],
        size: fontSize,
        weight: 200,
        tracking: 1,
        align: "center",
        leading: 2,
        isPath: true,
      });

      // Init all drawing values to 0
      for (let i = 0; i < leon.drawing.length; i++) {
        leon.drawing[i].value = 0;
      }

      const x = (sw - leon.rect.w) / 2;
      const y = (sh - leon.rect.h) / 2;
      leon.position(x, y);

      setCanvasReady(true);

      const total = leon.drawing.length;
      const LETTER_DUR = 900;
      const STAGGER = 260;
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

      let startTime: number | null = null;

      const loop = (ts: number) => {
        if (stopped) return;
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;

        ctx.clearRect(0, 0, sw, sh);

        let allDone = true;
        for (let i = 0; i < total; i++) {
          const letterElapsed = elapsed - i * STAGGER;
          const rawT = Math.max(0, Math.min(1, letterElapsed / LETTER_DUR));
          leon.drawing[i].value = easeOut(rawT);
          if (rawT < 1) allDone = false;
        }

        leon.draw(ctx);

        if (!allDone) {
          raf = requestAnimationFrame(loop);
        } else {
          // ── Phase 2: trigger zoom ──────────────────
          setTimeout(() => setPhase("zooming"), 600);
        }
      };

      raf = requestAnimationFrame(loop);
    };

    initLeon();
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Transition to exit when zoom finishes ─────────────────────
  useEffect(() => {
    if (phase === "zooming") {
      // Duration matches the Framer Motion zoom animation (1.1s) + small buffer
      const t = setTimeout(() => setPhase("exiting"), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // ── Scale that the canvas wrapper uses in "zooming" phase ─────
  // We go from 1 → 18 (letters blow up and exit the viewport)
  const zoomScale = phase === "zooming" || phase === "exiting" ? 18 : 1;
  const zoomDuration = 1.1;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {phase !== "exiting" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 10% 10%, #1a0f1f 0%, #05070c 40%, #02030a 100%)" }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeIn" },
          }}
        >
          {/* Canvas — subtle zoom-in on drawing, then HARD zoom on reveal */}
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{
              opacity: canvasReady ? 1 : 0,
              scale: zoomScale,
            }}
            transition={
              phase === "drawing"
                ? { opacity: { duration: 0.7 }, scale: { duration: 3.5, ease: [0.16, 1, 0.3, 1] } }
                : { scale: { duration: zoomDuration, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.1 } }
            }
          >
            <canvas ref={canvasRef} className="block" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
