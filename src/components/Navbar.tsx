"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface NavbarProps {
  scrollProgress: MotionValue<number>;
}

export default function Navbar({ scrollProgress }: NavbarProps) {
  /* Navbar only appears after ~95% of hero scroll */
  const opacity = useTransform(scrollProgress, [0.92, 1], [0, 1]);
  const y = useTransform(scrollProgress, [0.92, 1], [-20, 0]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 navbar-glass"
      style={{ opacity, y }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* ── Brand ── */}
        <motion.a
          href="#"
          className="text-white font-bold text-lg tracking-wider"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-brand-cyan">M</span>
          <span className="text-brand-magenta">F</span>
        </motion.a>

        {/* ── Nav Links ── */}
        <div className="hidden md:flex items-center gap-8">
          {["Sobre", "Projetos", "Habilidades", "Contato"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/50 text-sm tracking-[0.15em] uppercase font-light hover:text-white/90 transition-colors duration-300"
              whileHover={{ y: -1 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* ── CTA Button ── */}
        <motion.a
          href="#contato"
          className="relative px-5 py-2 text-xs tracking-[0.2em] uppercase text-white/80 border border-white/10 rounded-full overflow-hidden group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10 group-hover:text-white transition-colors">
            Fale Comigo
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-brand-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
      </div>
    </motion.nav>
  );
}
