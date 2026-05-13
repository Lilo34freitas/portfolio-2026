"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import CursorGlow from "@/components/CursorGlow";

// Seções
import NavigationMenu from "@/components/NavigationMenu";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

// SSR-safe dynamic import for Three.js
const NexusCanvas = dynamic(() => import("@/components/NexusCanvas"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen">
      {/* Universal 3D background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NexusCanvas />
      </div>

      <CursorGlow />

      {/* ── PRELOADER ── */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* ── MAIN CONTENT — rendered only after preloader to avoid hydration errors ── */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <NavigationMenu />

          {/* ── HERO UNIFICADA ── */}
          <Hero />

          {/* ── SEÇÕES PRINCIPAIS ── */}
          <div id="main-grid" className="relative z-40">
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </div>
        </motion.div>
      )}
    </main>
  );
}
