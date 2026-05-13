import React from "react";

interface ShimmerTextProps {
  text: string;
  className?: string;
  baseColor?: string;
  shimmerColor?: string;
}

export default function ShimmerText({
  text,
  className = "",
  baseColor = "#050505",
  shimmerColor = "#ffffff",
}: ShimmerTextProps) {
  // Gera um ID único simples para evitar conflito de keyframes
  const id = React.useId().replace(/:/g, "");

  return (
    <>
      <style>
        {`
          @keyframes shimmerSweep-${id} {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          .shimmer-text-effect-${id} {
            background: linear-gradient(
              120deg,
              ${baseColor} 0%,
              ${baseColor} 40%,
              ${shimmerColor} 50%,
              ${baseColor} 60%,
              ${baseColor} 100%
            );
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shimmerSweep-${id} 3.5s linear infinite;
            padding-right: 0.08em; /* FIX for background-clip slicing the right side of wide/round letters */
          }
        `}
      </style>
      <span className={`shimmer-text-effect-${id} ${className}`}>
        {text}
      </span>
    </>
  );
}
