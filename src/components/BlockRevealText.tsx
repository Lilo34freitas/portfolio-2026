import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BlockRevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const BlockRevealText = ({ children, className = "", delay = 0 }: BlockRevealTextProps) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Block mask */}
      <motion.div
        className="absolute inset-0 z-10 bg-current pointer-events-none"
        initial={{ left: "0%", right: "100%" }}
        whileInView={{ 
          left: ["0%", "0%", "100%"], 
          right: ["100%", "0%", "0%"] 
        }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ 
          duration: 0.9, 
          delay: delay,
          ease: [0.76, 0, 0.24, 1], 
          times: [0, 0.5, 1]
        }}
      />

      {/* Actual Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ 
          duration: 0, 
          delay: delay + 0.45 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
