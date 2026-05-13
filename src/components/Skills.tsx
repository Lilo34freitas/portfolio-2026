import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlockRevealText } from "./BlockRevealText";

const SKILLS_DATA = [
  {
    title: "Sistemas & Cloud",
    description: "Administração de ambientes corporativos, englobando Microsoft 365, Azure AD, WordPress e gestão de acessos e fluxos no JIRA.",
    img: "/Assets/Sistemas e cloud.jpeg"
  },
  {
    title: "Infraestrutura Core",
    description: "Sustentação da base operacional com manutenção de hardware, redes ativas e passivas, cabeamento estruturado e rotinas de backup.",
    img: "/Assets/Infraestrutura cloud.jpeg"
  },
  {
    title: "IA & Automações",
    description: "Engenharia de prompts e criação de fluxos inteligentes utilizando integrações (Make, Forms) para automatizar tarefas operacionais.",
    img: "/Assets/IA e automaçoes.jpeg"
  },
  {
    title: "Suporte N1 & N2",
    description: "Resolução de incidentes técnicos, estruturação de Base de Conhecimento, mapeamento de inventário e aplicação de políticas LGPD.",
    img: "/Assets/Suporte técnico.jpeg"
  },
  {
    title: "Análise de Dados",
    description: "Manipulação de dados, automação de processos transacionais e criação de dashboards de controle utilizando Excel e lógica em VBA.",
    img: "/Assets/Analise de dados.jpeg"
  },
  {
    title: "Vibecoder",
    description: "Desenvolvimento web guiado por estética e fluidez. Criação de landing pages e portfólios imersivos, combinando intuição em UI/UX e IA generativa para otimizar o código.",
    img: "/Assets/vibecoder.jpeg"
  }
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 6 itens -> translate de 0 a -(5/6)% = -83.3333%
  const forwardAnim = useTransform(scrollYProgress, [0, 1], ["0%", "-83.3333%"]);
  const backwardAnim = useTransform(scrollYProgress, [0, 1], ["-83.3333%", "0%"]);

  return (
    <>
      {/* Cabeçalho da Seção */}
      <section className="w-full bg-[#0D0B1A] pt-32 pb-16 text-center">
        <h2 
          className="font-bebas text-5xl md:text-7xl lg:text-[7rem] uppercase text-white leading-[1.1] tracking-wide"
          style={{
            textShadow: "1px 1px 0px #000, 2px 2px 0px #000, 3px 3px 0px #000, 4px 4px 0px #00D2FF, 5px 5px 0px #00D2FF, 6px 6px 0px #00D2FF",
            letterSpacing: "0.04em",
          }}
        >
          <BlockRevealText delay={0}>HABILIDADES EM</BlockRevealText> <span style={{ color: "#6C5CE7" }}><BlockRevealText delay={0.2}>DESTAQUE</BlockRevealText></span>
        </h2>
      </section>

      {/* Opposite Scroll - Desktop & Mobile */}
      <section 
        ref={containerRef}
        id="skills" 
        className="relative w-full h-[600vh] bg-[#0D0B1A]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* DESKTOP LAYOUT (Vertical Split) */}
          <div className="hidden md:flex w-full h-full">
            {/* Metade Esquerda: Textos (Sobe) */}
            <motion.div 
              className="w-1/2 h-[600vh] flex flex-col"
              style={{ y: forwardAnim }}
            >
              {SKILLS_DATA.map((skill, index) => {
                const isDark = index % 2 === 0;
                return (
                  <div 
                    key={`desktop-left-${index}`} 
                    className={`h-screen w-full flex flex-col justify-center px-12 lg:px-24 xl:px-32 transition-colors duration-500 ${
                      isDark ? "bg-[#0D0B1A] text-white" : "bg-[#F4F4F5] text-black"
                    }`}
                  >
                    <span className={`font-bold tracking-widest text-sm mb-4 block ${isDark ? "text-brand-cyan" : "text-brand-violet"}`}>
                      0{index + 1}
                    </span>
                    <h3 className="text-5xl lg:text-6xl font-black uppercase font-display mb-6 tracking-tight leading-none">
                      {skill.title}
                    </h3>
                    <p className={`font-light text-xl leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Metade Direita: Imagens (Desce) */}
            <motion.div 
              className="w-1/2 h-[600vh] flex flex-col"
              style={{ y: backwardAnim }}
            >
              {[...SKILLS_DATA].reverse().map((skill, index) => (
                <div 
                  key={`desktop-right-${index}`} 
                  className="h-screen w-full relative"
                >
                  <img 
                    src={skill.img} 
                    alt={skill.title} 
                    className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1]"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* MOBILE LAYOUT (Horizontal Split) */}
          <div className="flex flex-col md:hidden w-full h-full">
            {/* Metade Superior: Textos (Vai pra Esquerda) */}
            <motion.div 
              className="h-1/2 w-[600vw] flex flex-row"
              style={{ x: forwardAnim }}
            >
              {SKILLS_DATA.map((skill, index) => {
                const isDark = index % 2 === 0;
                return (
                  <div 
                    key={`mobile-top-${index}`} 
                    className={`w-[100vw] h-full flex flex-col justify-center px-8 transition-colors duration-500 ${
                      isDark ? "bg-[#0D0B1A] text-white" : "bg-[#F4F4F5] text-black"
                    }`}
                  >
                    <span className={`font-bold tracking-widest text-xs mb-2 block ${isDark ? "text-brand-cyan" : "text-brand-violet"}`}>
                      0{index + 1}
                    </span>
                    <h3 className="text-4xl font-black uppercase font-display mb-3 tracking-tight leading-[1.1]">
                      {skill.title}
                    </h3>
                    <p className={`font-light text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Metade Inferior: Imagens (Vai pra Direita) */}
            <motion.div 
              className="h-1/2 w-[600vw] flex flex-row"
              style={{ x: backwardAnim }}
            >
              {[...SKILLS_DATA].reverse().map((skill, index) => (
                <div key={`mobile-bottom-${index}`} className="w-[100vw] h-full relative">
                  <img 
                    src={skill.img} 
                    alt={skill.title} 
                    className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1]" 
                  />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}
