"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { BlockRevealText } from "./BlockRevealText";

const EXP_DATA = [
  {
    id: "01",
    company: "Univali",
    color: "#181528",
    accentText: "text-brand-cyan",
    hoverBg: "hover:bg-brand-cyan hover:border-brand-cyan",
    image: "/Assets/Logo Univali.jpeg",
    tags: [
      "Suporte técnico N2",
      "Gestão de laboratórios de informática",
      "Manutenção de hardware",
      "Documentação técnica",
      "Suporte a impressoras"
    ]
  },
  {
    id: "02",
    company: "RDM Milhas",
    color: "#151222",
    accentText: "text-brand-violet",
    hoverBg: "hover:bg-brand-violet hover:border-brand-violet",
    image: "/Assets/Logo RDM.jpeg",
    tags: [
      "Suporte técnico N1",
      "HelpDesk",
      "Apoio a infraestrutura",
      "Suporte presencial e remoto",
      "Documentação de processos"
    ]
  },
  {
    id: "03",
    company: "Edna Center",
    color: "#110E1C",
    accentText: "text-brand-cyan",
    hoverBg: "hover:bg-brand-cyan hover:border-brand-cyan",
    image: "/Assets/Logo Edna.jpeg",
    tags: [
      "Suporte N1 e N2",
      "Gestão de usuários",
      "Suporte wordpress",
      "Fluxos e automações",
      "Projetos LGPD"
    ]
  },
  {
    id: "04",
    company: "EQI Investimentos",
    color: "#0D0B1A", // Match with next section (Gallery)
    accentText: "text-brand-violet",
    hoverBg: "hover:bg-brand-violet hover:border-brand-violet",
    image: "/Assets/Logo Eqi.jpeg",
    tags: [
      "Suporte a hardware, software e rede",
      "Inventario de ativos",
      "Gestão de acessos e contas",
      "Racks e cabeamento",
      "Documentação de processos"
    ]
  }
];

function AkaruButton({ hoverBg }: { hoverBg: string }) {
  return (
    <div className={`relative inline-flex items-center justify-between gap-8 px-6 py-3 md:px-8 md:py-4 rounded-full border-[1px] border-white/20 text-white group ${hoverBg} hover:text-brand-dark transition-all duration-300 cursor-pointer w-max`}>
      <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase">SAIBA MAIS</span>
      <span className="w-2 h-2 bg-white rounded-full group-hover:bg-brand-dark transition-colors duration-300" />
    </div>
  );
}

const Card = ({ item, index, progress }: { item: typeof EXP_DATA[0]; index: number; progress: MotionValue<number> }) => {
  const start = index === 0 ? 0 : (index - 1) * (1 / 3);
  const end = index === 0 ? 0 : index * (1 / 3);

  const clipPercent = useTransform(progress, [start, end], [100, 0]);
  const clipPath = useTransform(clipPercent, (val) => `inset(${val}% 0% 0% 0%)`);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col justify-start pt-[18vh] pb-8 md:justify-end md:pt-0 md:pb-24 px-6 md:px-12"
      style={{
        backgroundColor: item.color,
        clipPath: index === 0 ? "none" : clipPath,
        zIndex: index + 10,
      }}
    >
      <div className="w-full h-full max-w-[1500px] mx-auto flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start md:items-end">
        
        {/* Lado Esquerdo: Index & Title */}
        <div className="flex items-start md:items-center gap-3 md:gap-6 md:pb-12 shrink-0">
          <span className={`text-xs md:text-sm font-bold pt-2 md:pt-0 ${item.accentText}`}>{item.id}</span>
          <h3 className="text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight font-sans">
            {item.company}
          </h3>
        </div>

        {/* Centro: Imagem */}
        <div className="flex-1 flex justify-center items-center w-full py-4 md:py-0">
          <div className="relative w-full max-w-[340px] md:max-w-none md:w-[380px] lg:w-[460px] aspect-square shadow-2xl overflow-hidden bg-white/5 border border-white/5 rounded-sm mx-auto">
            <Image 
              src={item.image} 
              alt={item.company} 
              fill 
              className="object-cover opacity-90 transition-opacity hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Lado Direito: Tags & Button */}
        <div className="flex flex-col gap-6 md:gap-14 md:pb-12 md:pl-12 lg:pl-20 shrink-0 mt-auto md:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            {item.tags.map((tag, i) => (
              <div key={i} className="flex items-start gap-2 group cursor-default">
                <span className={`${item.accentText} font-bold text-[11px] md:text-xs`}>/</span>
                <span className="text-white/60 font-bold text-[11px] md:text-xs tracking-[0.08em] uppercase leading-relaxed font-sans group-hover:text-white transition-colors duration-300">
                  {tag}
                </span>
              </div>
            ))}
          </div>
          <div>
            <AkaruButton hoverBg={item.hoverBg} />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="experiencia" className="relative w-full h-[400vh]" ref={containerRef}>
      
      {/* Container Sticky que fixa na tela por 100vh */}
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden bg-[#181528]">
        
        {/* Título Principal Fixo no Fundo/Topo */}
        <div className="absolute top-4 md:top-24 left-0 w-full text-center z-50 pointer-events-none opacity-90">
          <h2 className="font-bebas uppercase text-[4rem] md:text-[8rem] lg:text-[11rem] leading-none text-white tracking-tight transition-colors duration-200" style={{ textShadow: "1px 1px 0px #000, 2px 2px 0px #000, 3px 3px 0px #000, 4px 4px 0px #00D2FF, 5px 5px 0px #00D2FF, 6px 6px 0px #00D2FF" }}>
            <BlockRevealText delay={0}>Trajetória</BlockRevealText>
          </h2>
        </div>

        {/* Cards Empilhados */}
        {EXP_DATA.map((item, index) => (
          <Card key={item.id} item={item} index={index} progress={scrollYProgress} />
        ))}

      </div>
    </section>
  );
}
