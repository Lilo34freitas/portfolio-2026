import React from "react";
import { motion } from "framer-motion";

interface DrawCircleTextProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  strokeWidth?: string | number;
  delay?: number;
}

const DrawCircleText: React.FC<DrawCircleTextProps> = ({
  children,
  className = "",
  color = "#6C5CE7", // Default to violet from the theme
  strokeWidth = "4",
  delay = 0.5,
}) => {
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      {/* The actual text */}
      <span className="relative z-10">{children}</span>

      {/* The SVG Circle */}
      <svg
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          width: "115%",
          height: "150%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            delay: delay,
          }}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          // A hand-drawn looking overlapping oval
          d="M 20 50 C 30 10 270 10 280 50 C 290 90 30 90 20 50 C 15 35 30 20 60 15"
        />
      </svg>
    </span>
  );
};

export default DrawCircleText;
