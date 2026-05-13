"use client";

import { motion } from "framer-motion";
import DomeGallery from "./DomeGallery";
import { BlockRevealText } from "./BlockRevealText";

const PHOTOS = [
  { src: "/Assets/Galeria/imagem 1.jpeg", alt: "Cotidiano & Ação" },
  { src: "/Assets/Galeria/imagem 2.jpeg", alt: "Cultura & Asfalto" },
  { src: "/Assets/Galeria/imagem 3.jpeg", alt: "Bodyboard Extremo" },
  { src: "/Assets/Galeria/imagem 4.jpeg", alt: "Conexão Natureza" },
  { src: "/Assets/Galeria/imagem 5.jpeg", alt: "Infraestrutura" },
  { src: "/Assets/Galeria/imagem 6.jpeg", alt: "Lifestyle" },
  { src: "/Assets/Galeria/imagem 7.jpeg", alt: "Urbano & Grafitti" },
  { src: "/Assets/Galeria/imagem 8.jpeg", alt: "Setup Developer" },
  { src: "/Assets/Galeria/imagem 9.jpeg", alt: "Aventura no Mar" },
  { src: "/Assets/Galeria/imagem10.jpeg", alt: "Adrenalina" },
  { src: "/Assets/Galeria/imagem 11.jpeg", alt: "Visão & Código" },
  { src: "/Assets/Galeria/imagem 12.jpeg", alt: "Momentos" },
];

export default function Gallery() {
  return (
    <section id="galeria" className="relative w-full py-32 overflow-hidden" style={{ background: "linear-gradient(to bottom, #0D0B1A 0%, #0D0B1A 80%, transparent 100%)" }}>
      {/* Cabeçalho da Seção */}
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-30">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="text-center"
        >
          <h2 
            className="font-bebas text-5xl md:text-7xl uppercase text-white mb-4 tracking-tight"
            style={{ textShadow: "1px 1px 0px #000, 2px 2px 0px #000, 3px 3px 0px #000, 4px 4px 0px #00D2FF, 5px 5px 0px #00D2FF, 6px 6px 0px #00D2FF" }}
          >
            <BlockRevealText delay={0}>Galeria</BlockRevealText> <span style={{ color: "#6C5CE7" }}><BlockRevealText delay={0.2}>Pessoal</BlockRevealText></span>
          </h2>
          <div className="w-24 h-1 bg-brand-cyan mx-auto rounded-full" />
          <p className="mt-8 text-white/50 max-w-2xl mx-auto font-light text-lg">
            Muito além do código e da infraestrutura. A vida moldada entre a pulsação do asfalto, os bytes do servidor e o impacto contínuo do surf e das artes.
          </p>
        </motion.div>
      </div>

      {/* Dome Gallery 3D Component */}
      <div className="w-full relative z-20 h-[600px] md:h-[800px]">
        <DomeGallery 
          images={PHOTOS} 
          fit={0.85}
          minRadius={900} 
          maxVerticalRotationDeg={5} 
          segments={32}
          dragDampening={4} 
          grayscale={false}
        />
      </div>
      
      {/* Luzes de palco sutis para dar profundidade ao fundo sólido */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-brand-cyan/5 blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-brand-violet/5 blur-[120px] pointer-events-none z-10" />
    </section>
  );
}
