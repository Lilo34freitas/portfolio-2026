"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(({ scroll }) => {
    // Sincroniza o ScrollTrigger sempre que o Lenis rolar a página
    ScrollTrigger.update();
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Conecta o ticker do GSAP ao Lenis para que a sua cena 3D inteira (WebGL)
    // opere no mesmo ritmo ultra-macio da rolagem do DOM
    gsap.ticker.add((time) => {
      // Lenis raf é feito automaticamente pelo Root, mas o ticker refresh garante a física
    });

    return () => {
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    // 'root' avisa ao Lenis para assumir o <html> como o scroller oficial
    <ReactLenis root options={{ lerp: 0.08, duration: 1.4, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
