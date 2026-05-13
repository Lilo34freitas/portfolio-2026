"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const MENU_LINKS = [
  { name: "SOBRE", href: "#bio" },
  { name: "HABILIDADES", href: "#skills" },
  { name: "PROJETOS", href: "#projetos" },
  { name: "TRAJETÓRIA", href: "#experiencia" },
];

const SUB_LINKS = [
  { name: "LINKEDIN", href: "https://www.linkedin.com/in/murilo-freitas-31579928b" },
  { name: "GITHUB", href: "https://github.com/Lilo34freitas" },
  { name: "CONTATO", href: "#contato" },
];

const MagneticButton = ({ children, onClick, isOpen }: { children: React.ReactNode; onClick: () => void; isOpen: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`fixed top-6 right-6 md:top-10 md:right-10 z-[100] w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
        isOpen ? "bg-white text-black shadow-lg" : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/5"
      }`}
    >
      {children}
    </motion.div>
  );
};

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);

  // Show nav button only after #bio section starts scrolling into view
  useEffect(() => {
    const checkVisibility = () => {
      const bioSection = document.getElementById("bio");
      if (!bioSection) return;
      const rect = bioSection.getBoundingClientRect();
      // Show once the About section top is within viewport
      setShowNav(rect.top < window.innerHeight * 0.85);
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    checkVisibility(); // run on mount too
    return () => window.removeEventListener("scroll", checkVisibility);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // 1. Temporarily unlock scroll so we can jump
      document.body.style.overflow = "unset";
      
      // 2. Instantly jump to the section behind the scenes (the menu is still covering it)
      element.scrollIntoView({ behavior: 'instant' });
      
      // 3. Re-lock the scroll immediately so user can't manually scroll while menu animates closing
      document.body.style.overflow = "hidden";
      
      // 4. Trigger the close animation which will take ~1 second to fully reveal the new section
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    animate: { transition: { delayChildren: 0.3, staggerChildren: 0.07, staggerDirection: 1 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1, delayChildren: 0 } }
  };

  const linkVars = {
    initial: { y: "150%", rotate: 3, opacity: 0 },
    animate: { y: 0, rotate: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { y: "150%", rotate: 3, opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <>
      {/* Trigger Button — only visible after scrolling to About section */}
      <AnimatePresence>
        {(showNav || isOpen) && (
          <motion.div
            key="nav-btn"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
              <div className="relative w-6 md:w-7 h-[14px]">
                <motion.div
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="absolute top-0 left-0 w-full h-[2px] bg-current origin-center"
                />
                <motion.div
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  className="absolute top-[6px] left-0 w-full h-[2px] bg-current"
                />
                <motion.div
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-current origin-center"
                />
              </div>
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5, transition: { delay: 0.4, duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-2 md:inset-4 z-[90] bg-[#0D0B1A] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-center max-[480px]:justify-start max-[480px]:pt-[18vh] px-8 md:px-24 lg:px-40"
          >
            {/* Background Accent Glow */}
            <div className="absolute -top-1/2 -right-1/2 w-[100vw] h-[100vw] rounded-full bg-brand-cyan/5 blur-[150px] pointer-events-none" />
            <div className="absolute -bottom-1/2 -left-1/2 w-[100vw] h-[100vw] rounded-full bg-brand-violet/5 blur-[150px] pointer-events-none" />

            {/* Main Menu Links */}
            <motion.ul
              variants={containerVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-6 md:gap-4 z-10"
            >
              {MENU_LINKS.map((link, i) => (
                <div key={link.name} className="overflow-hidden py-1">
                  <motion.li variants={linkVars}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="max-[480px]:text-[9.5vw] text-5xl md:text-7xl lg:text-[7rem] font-black font-display uppercase text-white/90 hover:text-brand-violet transition-colors flex items-center group leading-[0.9]"
                    >
                      <motion.span
                        whileHover={{ x: 30 }}
                        className="inline-block transition-transform duration-400 ease-out"
                      >
                        {link.name}
                      </motion.span>
                      <span className="opacity-0 group-hover:opacity-100 ml-8 text-4xl md:text-6xl text-brand-violet transition-opacity duration-300 font-light">
                        +
                      </span>
                    </a>
                  </motion.li>
                </div>
              ))}
            </motion.ul>

            {/* Sub Links Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute bottom-12 md:bottom-16 left-8 md:left-24 lg:left-40 flex flex-wrap gap-8 md:gap-16 z-10"
            >
              {SUB_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="relative text-xs md:text-sm font-bold uppercase text-white/50 hover:text-white transition-colors group tracking-widest"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </motion.div>

            {/* Email CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute bottom-12 md:bottom-16 right-8 md:right-24 lg:right-40 z-10 hidden md:flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <a
                href="mailto:mumufreitas667@gmail.com"
                className="text-xl md:text-2xl font-light font-sans text-white/70 hover:text-white transition-colors italic"
              >
                mumufreitas667@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
