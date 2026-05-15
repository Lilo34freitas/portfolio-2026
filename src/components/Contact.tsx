"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import ShimmerText from "./ShimmerText";

const MarqueeContent = () => (
  <motion.div
    animate={{ x: ["0%", "-50%"] }}
    transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
    className="flex whitespace-nowrap font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold text-[#050505]/80"
  >
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex gap-6 pr-6">
        <span>• AUTOMAÇÃO INTELIGENTE</span>
        <span>• INOVAÇÃO CONSTANTE</span>
        <span>• RESULTADOS REAIS</span>
        <span>• SOLUÇÕES DIGITAIS</span>
      </div>
    ))}
  </motion.div>
);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax reveal effect
  const y = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);



  return (
    <section 
      ref={containerRef}
      id="contato" 
      className="relative w-full h-[100svh] min-h-[650px] md:min-h-[700px] xl:min-h-[800px] overflow-hidden z-10 bg-[#0D0B1A]"
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full bg-[#EAF3FF] text-[#050505] flex flex-col p-6 sm:p-10 md:p-12 lg:p-16 xl:p-20"
      >
        {/* =====================
            FRAME MARQUEE BORDERS
            ===================== */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top */}
          <div className="absolute top-0 left-0 right-0 h-10 md:h-12 border-b border-[#050505]/15 overflow-hidden flex items-center bg-[#EAF3FF]">
            <MarqueeContent />
          </div>
          {/* Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-10 md:h-12 border-t border-[#050505]/15 overflow-hidden flex items-center rotate-180 bg-[#EAF3FF]">
            <MarqueeContent />
          </div>
          {/* Left */}
          <div className="absolute left-0 top-10 bottom-10 md:top-12 md:bottom-12 w-10 md:w-12 border-r border-[#050505]/15 overflow-hidden bg-[#EAF3FF]">
            <div className="absolute top-full left-0 origin-top-left -rotate-90 w-[150vh] h-10 md:h-12 flex items-center">
              <MarqueeContent />
            </div>
          </div>
          {/* Right */}
          <div className="absolute right-0 top-10 bottom-10 md:top-12 md:bottom-12 w-10 md:w-12 border-l border-[#050505]/15 overflow-hidden bg-[#EAF3FF]">
            <div className="absolute top-0 right-0 origin-top-right rotate-90 w-[150vh] h-10 md:h-12 flex items-center">
              <MarqueeContent />
            </div>
          </div>
        </div>

        {/* =====================
            MAIN CONTENT
            ===================== */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between w-full items-center lg:items-start flex-1 mt-4 md:mt-8 gap-6 sm:gap-12 lg:gap-8">
          
          {/* Left Side: Huge Text + Animated Circle Button Inline */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-0 min-w-0">
            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 md:gap-8">
              <h2 className="font-display font-black text-[3.2rem] sm:text-[4.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[6.5rem] leading-[0.85] tracking-tighter uppercase text-[#050505] break-words">
                Vamos
              </h2>
              <a 
                href="https://w.app/fuhzqg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-full border-[2px] border-[#050505] overflow-hidden transition-all duration-500 hover:scale-105 flex-shrink-0"
              >
                 <span className="absolute inset-0 bg-[#050505] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] rounded-full" />
                 <FiArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-14 lg:h-14 text-[#050505] group-hover:text-[#EAF3FF] relative z-10 transition-colors duration-500" />
              </a>
            </div>
            <h2 className="font-display font-black text-[3.2rem] sm:text-[4.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[6.5rem] leading-[0.85] tracking-tighter uppercase text-[#050505] break-words">
              Conversar
            </h2>
          </div>

          {/* Right Side: Copy & Contacts */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 max-w-sm xl:max-w-md w-full shrink-0 text-center lg:text-left items-center lg:items-start lg:ml-auto lg:pt-4">
            <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-[#050505]/90">
              Se você busca alguém com visão prática, organização obstinada e foco massivo em melhoria contínua, dê o primeiro passo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-12 md:gap-16 xl:gap-24 font-mono text-sm uppercase tracking-widest text-center lg:text-left">
              {/* Contact Info */}
              <div className="flex flex-col gap-4 md:gap-5 items-center lg:items-start">
                <span className="text-[#050505]/50 font-bold tracking-[0.2em]">Contato</span>
                <a href="mailto:mumufreitas667@gmail.com" className="hover:text-brand-magenta transition-colors relative inline-block group font-semibold text-sm md:text-base lowercase">
                  mumufreitas667@gmail.com
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-magenta transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
              
              {/* Social Links */}
              <div className="flex flex-col gap-4 md:gap-5 items-center lg:items-start">
                <span className="text-[#050505]/50 font-bold tracking-[0.2em]">Redes Sociais</span>
                <div className="flex flex-col gap-3 font-semibold text-sm md:text-base items-center lg:items-start">
                  <a href="https://www.linkedin.com/in/murilo-freitas-31579928b" target="_blank" rel="noopener noreferrer" className="hover:text-brand-magenta transition-colors relative inline-block group w-fit">
                    LinkedIn
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-magenta transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="https://github.com/Lilo34freitas" target="_blank" rel="noopener noreferrer" className="hover:text-brand-magenta transition-colors relative inline-block group w-fit">
                    GitHub
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-magenta transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="https://www.instagram.com/mu_freeitas?igsh=MTIwMnNtNmtrYm9hdw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-brand-magenta transition-colors relative inline-block group w-fit">
                    Instagram
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-magenta transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* =====================
            HUGE BOTTOM TEXT (Shimmer Text)
            ===================== */}
        <div className="relative z-10 w-full flex justify-center lg:justify-start items-end mt-auto pointer-events-none select-none pb-2 md:pb-0 md:-translate-y-[2%] lg:-translate-y-[4%]">
           <ShimmerText 
             text="MURILO" 
             className="font-display font-black text-[18vw] sm:text-[18vw] md:text-[15vw] lg:text-[14vw] xl:text-[17vw] leading-none tracking-tighter" 
             baseColor="#050505" 
             shimmerColor="#ffffff"
           />
        </div>
      </motion.div>
    </section>
  );
}
