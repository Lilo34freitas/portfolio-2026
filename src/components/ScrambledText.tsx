"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import "./ScrambledText.css";

gsap.registerPlugin(SplitText);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<HTMLElement[]>([]);
  // Tracks the interval ID per character — ensures only ONE loop per char
  const activeRef = useRef<Map<HTMLElement, ReturnType<typeof setInterval>>>(new Map());

  useEffect(() => {
    if (!rootRef.current) return;

    const p = rootRef.current.querySelector("p");
    if (!p) return;

    // GSAP SplitText (free ≥ 3.12) — splits text into per-character spans
    const split = SplitText.create(p, {
      type: "chars",
      charsClass: "char",
    });

    const chars = split.chars as HTMLElement[];
    charsRef.current = chars;

    // Cache each char's original HTML before any scrambling
    chars.forEach((c) => {
      c.dataset.original = c.innerHTML;
      gsap.set(c, { display: "inline-block" });
    });

    // ── Scramble ONE character: run until duration elapses, then restore ──
    const startScramble = (el: HTMLElement) => {
      // Already scrambling — skip to prevent double-loop
      if (activeRef.current.has(el)) return;

      const original = el.dataset.original ?? el.textContent ?? "";
      if (!original.trim()) return; // skip spaces

      const startMs = Date.now();
      const durationMs = duration * 1000;
      // Tick interval: ~40ms at speed=0.5 (25fps scramble), faster at higher speed
      const intervalMs = Math.round(40 / Math.max(0.1, speed));

      const id = setInterval(() => {
        const elapsed = Date.now() - startMs;
        const progress = elapsed / durationMs; // 0 → 1

        if (progress >= 1) {
          // Done — restore original and stop
          el.innerHTML = original;
          clearInterval(id);
          activeRef.current.delete(el);
          return;
        }

        // Early phase: mostly scrambled. Late phase: mostly original.
        // threshold rises from ~0 to ~1 as progress advances
        const revealThreshold = progress;
        if (Math.random() > revealThreshold) {
          // Show a random scramble char
          el.textContent =
            scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        } else {
          // Peek at the real char
          el.innerHTML = original;
        }
      }, intervalMs);

      activeRef.current.set(el, id);
    };

    // ── Pointer move: only trigger chars within `radius` px of cursor ──
    const handleMove = (e: PointerEvent) => {
      chars.forEach((c) => {
        const r = c.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

        if (dist < radius) {
          startScramble(c);
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      // Stop all running intervals
      activeRef.current.forEach((id) => clearInterval(id));
      activeRef.current.clear();
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;
