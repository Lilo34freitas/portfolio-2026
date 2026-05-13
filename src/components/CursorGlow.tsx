"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[1] rounded-full"
      style={{
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(91, 124, 255, 0.08) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        left: "-1000px", // Hide initially
        top: "-1000px",
        transition: "opacity 0.3s",
      }}
    />
  );
}
