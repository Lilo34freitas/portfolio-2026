"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlockRevealText } from "./BlockRevealText";

/* ── Dados ── */
const PROJECTS = [
  {
    id: 1,
    title: "Aplicação Web Fullstack para Gestão Financeira",
    tagline: "Fullstack · Web App",
    shortDesc: "Sistema web para controle financeiro pessoal, desenvolvido com React, Node.js e Supabase. Permite cadastro e categorização de transações com interface focada em usabilidade cotidiana.",
    longDesc: `O Desafio: Superar a rigidez de planilhas com uma ferramenta personalizada e escalável.

Solução: Build fullstack utilizando React, Node.js e Supabase (PostgreSQL).

Impacto: MVP funcional com Dashboards dinâmicos, autenticação segura e arquitetura de API.`,
    tags: ["React", "Node.js", "Supabase", "PostgreSQL"],
    href: "/projetos/sistema-financeiro",
    accent: "#6C5CE7",
  },
  {
    id: 2,
    title: "Governança e Segurança em Ambientes Microsoft 365",
    tagline: "Segurança · Cloud",
    shortDesc: "Administração do Microsoft 365 em dois ambientes: EQI Investimentos (500+ usuários) e Edna Center (sub-50). MFA, acesso condicional e políticas alinhadas à LGPD implementadas nos dois contextos.",
    longDesc: `O Desafio: Vulnerabilidades de acesso em ambientes críticos do setor financeiro.

Solução: Implementação de MFA, Acesso Condicional e estrutura de permissões RBAC.

Impacto: Redução da superfície de ataque e adequação técnica total à LGPD.`,
    tags: ["Microsoft 365", "Azure AD", "MFA", "LGPD"],
    href: "/projetos/microsoft-365",
    accent: "#00D2FF",
  },
  {
    id: 3,
    title: "Implantação e Automação de ITSM com Jira",
    tagline: "Automação · ITSM",
    shortDesc: "Chamados chegavam por e-mail, WhatsApp e telefone sem rastreabilidade. Estruturei os fluxos do zero: canal único, triagem automática por categoria, escalonamento e fechamento automático de chamados resolvidos.",
    longDesc: `O Desafio: Chamados dispersos (WhatsApp/E-mail) e falta de métricas de suporte.

Solução: Centralização no Jira Service Management com fluxos e SLAs automatizados.

Impacto: Transformação do suporte em uma operação orientada a dados e 100% rastreável.`,
    tags: ["Jira", "ITSM", "Automação", "Centralização"],
    href: "/projetos/jira-itsm",
    accent: "#EC4899",
  },
  {
    id: 4,
    title: "Deploy em Massa para Laboratórios Móveis",
    tagline: "Infraestrutura · Deploy",
    shortDesc: "Montagem e configuração de 2 laboratórios ambulantes (60 notebooks). Instalação de imagem via rede com Ghost Server, configuração de domínio e padronização, entregando máquinas prontas para uso imediato.",
    longDesc: `O Desafio: Configurar 60 notebooks para uso imediato sem intervenção manual unitária.

Solução: Implementação de servidor PXE com Ghost para deploy simultâneo via rede.

Impacto: Entrega de laboratórios móveis plug-and-play em tempo recorde.`,
    tags: ["Infraestrutura", "Ghost Server", "Redes"],
    href: "/projetos/laboratorios-ambulantes",
    accent: "#FBBF24",
  },
  {
    id: 5,
    title: "Reestruturação de Infraestrutura N2 (UNIVALI)",
    tagline: "Cabeamento · Hardware",
    shortDesc: "Reorganização física completa de 18 laboratórios de informática distribuídos em 6 blocos. Realinhamento de cabeamento e uniformização de equipamentos, sem interrupção das atividades acadêmicas.",
    longDesc: `O Desafio: Desorganização técnica em 18 laboratórios (Univali), dificultando a manutenção.

Solução: Reestruturação física (cable management) e padronização de setups acadêmicos.

Impacto: Redução no tempo de resposta do suporte e documentação técnica em nuvem.`,
    tags: ["Cabeamento Estruturado", "Hardware"],
    href: "/projetos/reorganizacao-labs",
    accent: "#10B981",
  },
  {
    id: 6,
    title: "Gestão e Automação de Inventário de TI",
    tagline: "Gestão de Ativos · Excel",
    shortDesc: "Gestão de mais de 1.000 ativos na EQI Investimentos e criação do zero de inventário na Edna Center. Uso de planilhas estruturadas com VBA para rastreabilidade completa e controle patrimonial.",
    longDesc: `O Desafio: Controlar mais de 1.000 ativos de TI com rastreabilidade zero.

Solução: Desenvolvimento de sistema automatizado (Excel/VBA) e higienização de dados corporativos.

Impacto: 100% de controle patrimonial e base sólida para auditorias e decisões de TI.`,
    tags: ["VBA", "Excel", "Auditoria"],
    href: "/projetos/inventario-ti",
    accent: "#8B5CF6",
  }
];

/* ── Ícones SVG ── */
function IconFinanceiro({ color }: { color: string }) {
  return (
    <motion.svg width="44" height="44" viewBox="0 0 44 44" fill="none"
      animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
      <rect x="3" y="30" width="7" height="11" rx="1.5" fill={color} opacity={0.3} />
      <rect x="16" y="20" width="7" height="21" rx="1.5" fill={color} opacity={0.6} />
      <rect x="29" y="9" width="7" height="32" rx="1.5" fill={color} />
      <path d="M6 32 L19 22 L32 11" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M29 10 L32 11 L30 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </motion.svg>
  );
}

function IconSeguranca({ color }: { color: string }) {
  return (
    <motion.svg width="44" height="44" viewBox="0 0 44 44" fill="none"
      animate={{ filter: [`drop-shadow(0 0 0px transparent)`, `drop-shadow(0 0 7px ${color}99)`, `drop-shadow(0 0 0px transparent)`] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M22 3 L38 10 L38 22 C38 32 30 40 22 43 C14 40 6 32 6 22 L6 10 Z" fill={color} opacity={0.12} />
      <path d="M22 3 L38 10 L38 22 C38 32 30 40 22 43 C14 40 6 32 6 22 L6 10 Z" stroke={color} strokeWidth="2" fill="none" />
      <path d="M14 21 L19 27 L30 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </motion.svg>
  );
}

function IconITSM({ color }: { color: string }) {
  return (
    <motion.svg width="44" height="44" viewBox="0 0 44 44" fill="none"
      animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
      <path d="M22 5 A17 17 0 0 1 39 22" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M39 22 A17 17 0 0 1 22 39" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity={0.7} />
      <path d="M22 39 A17 17 0 0 1 5 22" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity={0.45} />
      <path d="M5 22 A17 17 0 0 1 22 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity={0.2} />
      <path d="M19 4 L22 1 L25 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </motion.svg>
  );
}

function IconInfra({ color }: { color: string }) {
  return (
    <motion.svg width="44" height="44" viewBox="0 0 44 44" fill="none"
      animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <rect x="6" y="14" width="32" height="20" rx="2" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M10 34 L34 34" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 24 L22 34" stroke={color} strokeWidth="2.5" />
      <circle cx="22" cy="20" r="2" fill={color} />
    </motion.svg>
  );
}

function IconLabs({ color }: { color: string }) {
  return (
    <motion.svg width="44" height="44" viewBox="0 0 44 44" fill="none"
      animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
      <rect x="8" y="8" width="10" height="10" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <rect x="26" y="8" width="10" height="10" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <rect x="17" y="26" width="10" height="10" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <path d="M13 18 L13 22 L22 22 L22 26" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M31 18 L31 22 L22 22" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" opacity={0.5} />
    </motion.svg>
  );
}

function IconInventory({ color }: { color: string }) {
  return (
    <motion.svg width="44" height="44" viewBox="0 0 44 44" fill="none"
      animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      <rect x="10" y="6" width="24" height="32" rx="3" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M16 14 L28 14M16 22 L28 22M16 30 L22 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </motion.svg>
  );
}

function getIcon(id: number, accent: string) {
  if (id === 1) return <IconFinanceiro color={accent} />;
  if (id === 2) return <IconSeguranca color={accent} />;
  if (id === 3) return <IconITSM color={accent} />;
  if (id === 4) return <IconInfra color={accent} />;
  if (id === 5) return <IconLabs color={accent} />;
  return <IconInventory color={accent} />;
}

type Project = typeof PROJECTS[0];

/* ── Card Expandido ── */
function CardExpanded({ p }: { p: Project }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ marginBottom: 12 }}>{getIcon(p.id, p.accent)}</div>
      <h3 className="font-bebas uppercase"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.4rem)", color: "#ffffff", lineHeight: 1.05, letterSpacing: "0.02em", marginBottom: 8 }}>
        {p.title}
      </h3>
      <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-3"
        style={{ color: p.accent, fontFamily: "var(--font-quicksand), sans-serif" }}>
        {p.tagline}
      </span>
      <p className="whitespace-pre-line mb-4" style={{ color: "#A0A0B0", fontSize: "clamp(0.85rem, 1vw, 1rem)", lineHeight: 1.55, fontFamily: "var(--font-quicksand), sans-serif", flex: 1 }}>
        {p.longDesc}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {p.tags.map(t => (
          <span key={t} className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
            style={{ background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}35`, fontFamily: "var(--font-quicksand), sans-serif" }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Card Colapsado ── */
function CardCollapsed({ p }: { p: Project }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <div>
        <div style={{ marginBottom: 14 }}>{getIcon(p.id, p.accent)}</div>
        <h4 className="font-bebas uppercase"
          style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.7rem)", color: "#ffffff", lineHeight: 1.1, letterSpacing: "0.02em" }}>
          {p.title}
        </h4>
      </div>
      <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${p.accent}60`, display: "flex", alignItems: "center", justifyContent: "center", color: p.accent }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
}

const EASE = [0.25, 1, 0.35, 1] as const;
const DURATION = 0.7;

/* ── COMPONENTE PRINCIPAL ── */
export default function Projects() {
  const [activeId, setActiveId] = useState(1);

  // Calcula a posição absoluta de cada card usando variáveis CSS
  const getDesktopStyles = (id: number) => {
    // Se for o card ativo, ocupa a esquerda inteira
    if (id === activeId) {
      return {
        "--dt-top": "0%",
        "--dt-left": "0%",
        "--dt-width": "50%",
        "--dt-height": "100%"
      } as any;
    }

    // Cards inativos ficam na grade da direita (Bento Grid 2x3)
    const inactiveIds = PROJECTS.map(p => p.id).filter(i => i !== activeId);
    const index = inactiveIds.indexOf(id);

    // Slots para os 5 inativos no lado direito
    const INACTIVE_SLOTS = [
      { top: "0%", left: "52%", width: "23%", height: "31%" },
      { top: "0%", left: "77%", width: "23%", height: "31%" },
      { top: "33.5%", left: "52%", width: "23%", height: "31%" },
      { top: "33.5%", left: "77%", width: "23%", height: "31%" },
      { top: "67%", left: "52%", width: "48%", height: "33%" }, // Spans both cols
    ];

    const slot = INACTIVE_SLOTS[index];

    return {
      "--dt-top": slot.top,
      "--dt-left": slot.left,
      "--dt-width": slot.width,
      "--dt-height": slot.height
    } as any;
  };

  return (
    <section id="projetos" className="relative w-full" style={{ background: "#0D0B1A" }}>
      <style>{`
        .project-card-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .project-card {
          position: relative;
          width: 100%;
          height: auto;
          min-height: 250px;
        }
        @media (min-width: 768px) {
          .project-card-container {
            display: block;
            height: 750px; /* Altura aumentada para comportar 6 itens */
          }
          .project-card {
            position: absolute;
            top: var(--dt-top);
            left: var(--dt-left);
            width: var(--dt-width);
            height: var(--dt-height);
            margin-bottom: 0;
          }
        }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="font-bebas text-6xl md:text-8xl uppercase leading-none text-white" style={{ letterSpacing: "0.02em", textShadow: "1px 1px 0px #000, 2px 2px 0px #000, 3px 3px 0px #000, 4px 4px 0px #00D2FF, 5px 5px 0px #00D2FF, 6px 6px 0px #00D2FF" }}>
            <BlockRevealText delay={0}>Meus</BlockRevealText> <span style={{ color: "#6C5CE7" }}><BlockRevealText delay={0.2}>Projetos</BlockRevealText></span>
          </h2>
        </motion.div>
      </div>

      {/* ── ACCORDION ABSOLUTO (DESKTOP) E FLEX (MOBILE) ── */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="project-card-container">
          {PROJECTS.map(p => {
            const isActive = p.id === activeId;
            return (
              <motion.div
                key={p.id}
                onClick={!isActive ? () => setActiveId(p.id) : undefined}
                className="project-card"
                initial={getDesktopStyles(p.id)}
                animate={getDesktopStyles(p.id)}
                transition={{ duration: DURATION, ease: EASE }}
                style={{
                  background: isActive ? "#1A1A2E" : "#13111C",
                  border: isActive ? `2px solid ${p.accent}` : "1.5px solid #2A2A40",
                  borderRadius: 24,
                  padding: isActive ? "40px" : "24px",
                  cursor: isActive ? "default" : "pointer",
                  boxShadow: isActive ? "0 8px 48px rgba(108,92,231,0.15)" : "none",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                } as any}
                whileHover={!isActive ? { borderColor: "#6C5CE7", boxShadow: "0 4px 20px rgba(108,92,231,0.2)" } : {}}
              >
                <AnimatePresence mode="wait">
                  {isActive
                    ? <CardExpanded key={`exp-${p.id}`} p={p} />
                    : <CardCollapsed key={`col-${p.id}`} p={p} />
                  }
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>


    </section>
  );
}
