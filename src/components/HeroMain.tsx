"use client";

import { motion } from "framer-motion";
import { BlockRevealText } from "./BlockRevealText";
const MENU_ITEMS = [
  { label: "Início", href: "#home" },
  { label: "Sobre Mim", href: "#bio" },
  { label: "Habilidades", href: "#skills" },
  { label: "Projetos", href: "#projetos" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Contato", href: "#contato" },
];

const GEO_ICONS = [
  { 
    label: "WhatsApp", 
    href: "https://w.app/fuhzqg", 
    paths: [
      <motion.path key="1" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    ]
  },
  { 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/murilo-freitas-31579928b", 
    paths: [
      <motion.path key="1" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />,
      <motion.rect key="2" width="4" height="12" x="2" y="9" />,
      <motion.circle key="3" cx="4" cy="4" r="2" />
    ]
  },
  { 
    label: "Insta", 
    href: "https://www.instagram.com/mu_freeitas?igsh=MTIwMnNtNmtrYm9hdw%3D%3D&utm_source=qr", 
    paths: [
      <motion.rect key="1" width="20" height="20" x="2" y="2" rx="5" ry="5" />,
      <motion.path key="2" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />,
      <motion.line key="3" x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    ]
  },
  { 
    label: "GitHub", 
    href: "https://github.com/Lilo34freitas", 
    paths: [
      <motion.path key="1" d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.6 5.5 5.5 0 0 0-.14-3.56s-1.13-.36-3.7 1.38a12.8 12.8 0 0 0-6.8 0C6.27 1.5 5.14 1.86 5.14 1.86a5.5 5.5 0 0 0-.14 3.56A5.2 5.2 0 0 0 3 9c0 5.23 3 6.42 6 6.76-.3.27-.57.73-.65 1.4-1.1.5-3.8 1.4-5.5-1.5-.6-1-1.6-1.4-1.6-1.4-1.1-.1-1.1.7-1.1.7.9.6 1.5 2 1.5 2 1.1 3.5 6 2.3 6 2.3v3" />
    ]
  },
  { 
    label: "Email", 
    href: "mailto:mumufreitas667@gmail.com", 
    paths: [
      <motion.rect key="1" width="20" height="16" x="2" y="4" rx="2" />,
      <motion.path key="2" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    ]
  }
];

export default function HeroMain() {
  return (
    <section id="features" className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden bg-transparent">
      {/* Integrated Staggered Menu removed as requested */}

      <div className="relative z-10 max-w-7xl mx-auto mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Professional Summary with Left-to-Right Entry */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 
            className="font-bebas text-5xl md:text-7xl lg:text-8xl text-brand-white mb-8 leading-[1] tracking-wide uppercase"
            style={{
              WebkitTextStroke: "1px #1A1A2E",
              textShadow: "3px 3px 0px #6C5CE7, 6px 6px 0px #00D2FF",
              letterSpacing: "0.03em",
            }}
          >
            <BlockRevealText delay={0}>Automação</BlockRevealText> <BlockRevealText delay={0.1}>inteligente.</BlockRevealText> <br />
            <span className="text-brand-violet"><BlockRevealText delay={0.2}>Suporte</BlockRevealText> <BlockRevealText delay={0.3}>eficiente.</BlockRevealText></span>
          </h2>
          
          <p className="text-brand-white/80 text-lg md:text-xl font-light leading-relaxed mb-8 flex flex-col gap-1">
            <span><BlockRevealText delay={0.4}>Analista de Suporte Técnico e Infraestrutura com experiência</BlockRevealText></span>
            <span><BlockRevealText delay={0.5}>sólida em ambientes corporativos, atuando ativamente em</BlockRevealText></span>
            <span><BlockRevealText delay={0.6}>camadas N1 e N2.</BlockRevealText></span>
            <br />
            <span><BlockRevealText delay={0.7}>Especializado no ecossistema Microsoft 365, Azure AD e gestão</BlockRevealText></span>
            <span><BlockRevealText delay={0.8}>inteligente de infraestrutura de TI, sempre com foco extremo em</BlockRevealText></span>
            <span><BlockRevealText delay={0.9}>organização, automação e melhoria contínua de processos.</BlockRevealText></span>
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            {GEO_ICONS.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center w-24 h-24 bg-brand-navy border border-brand-white/10 rounded-xl hover:border-brand-cyan transition-all duration-300"
                whileHover={{ y: -5 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 mb-3 text-brand-cyan group-hover:text-brand-violet transition-colors">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    {item.paths.map((PathFragment, pIdx) => (
                      <motion.g
                        key={pIdx}
                        variants={{
                          hidden: { pathLength: 0, opacity: 0 },
                          visible: { 
                            pathLength: 1, 
                            opacity: 1,
                            transition: {
                              delay: idx * 0.15 + pIdx * 0.1,
                              duration: 1.5,
                              ease: "easeInOut"
                            }
                          }
                        }}
                      >
                        {PathFragment}
                      </motion.g>
                    ))}
                  </motion.svg>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-brand-white/50 group-hover:text-brand-white transition-colors">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Espaço vazio reservado fisicamente na tela para os objetos 3D do WebGL virem flutuando */}
        <div className="hidden lg:block w-full h-[500px] pointer-events-none">
          {/* As geometrias (Icosaedro, Toro, Cube, etc) cruzarão a tela guiadas pelo ScrollTrigger do ThreeJS até caírem exatamente neste eixo */}
        </div>
      </div>
    </section>
  );
}
