"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { BlockRevealText } from "./BlockRevealText";

/* ────────────────────────────────────────────────────────────
   FLOAT_SHAPES — Formas geométricas flutuantes do Bloco 6
   Inspiração: slamdunk-five.vercel.app
──────────────────────────────────────────────────────────── */
const FLOAT_SHAPES = [
  { id: 1,  left: 8,  size: 42, color: "rgba(108,92,231,0.55)",  delay: 0,   duration: 8,  drift: 15,  rotation: 45,  type: 0 },
  { id: 2,  left: 22, size: 22, color: "rgba(0,210,255,0.45)",   delay: 1.5, duration: 10, drift: -10, rotation: 120, type: 1 },
  { id: 3,  left: 52, size: 58, color: "rgba(108,92,231,0.22)",  delay: 0.7, duration: 12, drift: 20,  rotation: 0,   type: 2 },
  { id: 4,  left: 72, size: 30, color: "rgba(0,210,255,0.5)",    delay: 2.8, duration: 9,  drift: -15, rotation: 200, type: 0 },
  { id: 5,  left: 38, size: 18, color: "rgba(255,255,255,0.18)", delay: 3.5, duration: 11, drift: 8,   rotation: 90,  type: 1 },
  { id: 6,  left: 86, size: 40, color: "rgba(108,92,231,0.38)",  delay: 0.3, duration: 14, drift: -20, rotation: 300, type: 2 },
  { id: 7,  left: 14, size: 24, color: "rgba(0,210,255,0.3)",    delay: 4.2, duration: 9,  drift: 12,  rotation: 60,  type: 0 },
  { id: 8,  left: 60, size: 48, color: "rgba(108,92,231,0.2)",   delay: 1.8, duration: 13, drift: -8,  rotation: 150, type: 1 },
  { id: 9,  left: 30, size: 16, color: "rgba(255,255,255,0.15)", delay: 2.2, duration: 10, drift: 18,  rotation: 230, type: 2 },
  { id: 10, left: 78, size: 28, color: "rgba(0,210,255,0.35)",   delay: 0.9, duration: 12, drift: -12, rotation: 30,  type: 0 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="bio"
      ref={sectionRef}
      className="relative w-full"
      style={{ fontFamily: "var(--font-quicksand), Quicksand, sans-serif" }}
    >
      {/* ══════════════════════════════════════════════════
          BLOCO 1 — Título "Sobre Mim" (background roxo)
          Inspiração: faixa diagonal grande da referência
      ══════════════════════════════════════════════════ */}
      <div
        className="relative w-full overflow-hidden"
        style={{ background: "#6C5CE7" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex items-center justify-center px-8 py-16 md:py-24"
        >
          <h2
            className="text-[clamp(4rem,15vw,11rem)] font-black uppercase leading-none tracking-tighter text-white"
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              textShadow: "1px 1px 0px #000, 2px 2px 0px #000, 3px 3px 0px #000, 4px 4px 0px #00D2FF, 5px 5px 0px #00D2FF, 6px 6px 0px #00D2FF",
              letterSpacing: "0.04em",
            }}
          >
            <BlockRevealText delay={0}>Sobre Mim</BlockRevealText>
          </h2>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          BLOCO PRINCIPAL — Grid: Lateral + Conteúdo + Foto
      ══════════════════════════════════════════════════ */}
      <div className="relative w-full grid grid-cols-1 md:grid-cols-[120px_1fr_auto] min-h-[600px]">

        {/* ─── BLOCO 3 — Coluna lateral grafite (como o "About us" da ref) ─── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative hidden md:flex items-center justify-center overflow-hidden"
          style={{ background: "#6C5CE7" }}
        >
          {/* Texto vertical girado — mesmo efeito do "About us" da referência */}
          <span
            className="absolute text-white font-black text-5xl lg:text-6xl uppercase tracking-wider"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              textShadow: "1px 1px 0px #000, 2px 2px 0px #000, 3px 3px 0px #000, 4px 4px 0px #00D2FF, 5px 5px 0px #00D2FF, 6px 6px 0px #00D2FF",
              letterSpacing: "0.12em",
            }}
          >
            Quem sou
          </span>
        </motion.div>

        {/* ─── BLOCO 4 — Texto profissional (background branco) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 md:py-20"
          style={{ background: "#ffffff", color: "#1A1A2E" }}
        >
          <p
            className="text-base md:text-lg leading-[1.85] mb-6"
            style={{
              fontFamily: "var(--font-quicksand), Quicksand, sans-serif",
              color: "#2d2d2d",
              maxWidth: "580px",
            }}
          >
            Sou <strong style={{ color: "#6C5CE7", fontWeight: 700 }}>Murilo Freitas</strong>, Analista
            de Suporte Técnico e Infraestrutura, com atuação em ambientes corporativos prestando
            suporte N1 e N2, tanto presencial quanto remoto.
          </p>

          <p
            className="text-sm md:text-base font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#6C5CE7", fontFamily: "var(--font-quicksand), Quicksand, sans-serif" }}
          >
            Tenho conhecimento prático em:
          </p>

          <ul
            className="space-y-2 mb-8"
            style={{
              fontFamily: "var(--font-quicksand), Quicksand, sans-serif",
              color: "#3a3a3a",
            }}
          >
            {[
              "Infraestrutura de TI e gestão de ativos",
              "Administração de usuários no Microsoft 365 e Azure AD",
              "WordPress e Jira Service Management",
              "Automação de tarefas e processos",
              "Helpdesk e Suporte (N1 e N2)",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="flex items-start gap-3 text-sm md:text-base leading-relaxed"
              >
                <span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                  style={{ background: "#6C5CE7" }}
                />
                {item}
              </motion.li>
            ))}
          </ul>

          <p
            className="text-sm md:text-base leading-[1.85]"
            style={{
              fontFamily: "var(--font-quicksand), Quicksand, sans-serif",
              color: "#4a4a4a",
              maxWidth: "560px",
            }}
          >
            Possuo facilidade em entender, organizar e estruturar fluxos de trabalho, contribuindo
            diretamente para a{" "}
            <strong style={{ color: "#1A1A2E", fontWeight: 600 }}>
              otimização de processos técnicos e operacionais
            </strong>
            . Sou movido por desafios que envolvem resolução de problemas, organização de ambientes
            e melhoria contínua.
          </p>
        </motion.div>

        {/*
          ─── BLOCO 6 — Avatar + Background + Formas Flutuantes ───
          📐 Tamanho da foto: mínimo 480×480px | ideal 960×960px (Retina)
          📁 Salvar em: /public/Assets/foto-murilo.jpg e trocar o src abaixo
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block overflow-hidden"
          style={{ width: "480px", minHeight: "480px" }}
        >
          {/* ── Camada 0: Background escuro-roxo profundo (Opção B) ── */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, #0D0B1A 0%, #1A0F2E 55%, #0F1535 100%)",
              zIndex: 0,
            }}
          />

          {/* ── Camada 1: Formas geométricas flutuantes ── */}
          {FLOAT_SHAPES.map((shape) => (
            <motion.div
              key={shape.id}
              className="absolute pointer-events-none"
              style={{
                left: `${shape.left}%`,
                bottom: "-70px",
                width: shape.size,
                height: shape.size,
                zIndex: 10,
              }}
              animate={{
                y: [0, -560],
                x: [0, shape.drift],
                rotate: [
                  shape.rotation,
                  shape.rotation + (shape.id % 2 === 0 ? -360 : 360),
                ],
                opacity: [0, 0.9, 0.85, 0],
              }}
              transition={{
                duration: shape.duration,
                delay: shape.delay,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.12, 0.85, 1],
              }}
            >
              <svg
                width={shape.size}
                height={shape.size}
                viewBox="0 0 100 100"
                fill="none"
              >
                {shape.type === 0 && (
                  <polygon points="50,0 100,100 0,100" fill={shape.color} />
                )}
                {shape.type === 1 && (
                  <polygon points="0,0 100,0 50,100" fill={shape.color} />
                )}
                {shape.type === 2 && (
                  <polygon points="50,0 100,50 50,100 0,50" fill={shape.color} />
                )}
              </svg>
            </motion.div>
          ))}

          {/* ── Camada 2: Avatar (z-20, acima das formas) ── */}
          <div
            className="absolute inset-0"
            style={{ zIndex: 20, minHeight: "480px" }}
          >
            <Image
              src="/Assets/Icone_Murilo.png"
              alt="Foto de Murilo Freitas"
              fill
              className="object-cover object-top"
              style={{ filter: "saturate(1.05) contrast(1.02)" }}
            />
            {/* Overlay gradiente na base */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 55%, rgba(13,11,26,0.6) 100%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          BLOCO 5 — Texto lifestyle (tom fluido, humano)
          Background escuro quente — contraste com o branco acima
      ══════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        style={{ background: "#13111C" }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 py-16 md:py-24 grid md:grid-cols-[1fr_2fr] gap-12 items-center">

          {/* Label lateral */}
          <div className="flex flex-col gap-3">
            <span
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "#6C5CE7" }}
            >
              <BlockRevealText delay={0}>Além da Tela</BlockRevealText>
            </span>
            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white"
              style={{ fontFamily: "var(--font-quicksand), Quicksand, sans-serif" }}
            >
              <BlockRevealText delay={0.2}>Fora dos</BlockRevealText>
              <br />
              <span style={{ color: "#6C5CE7" }}><BlockRevealText delay={0.4}>chamados</BlockRevealText></span>
            </h3>
          </div>

          {/* Texto fluido */}
          <div
            className="text-base md:text-lg leading-[1.9]"
            style={{
              fontFamily: "var(--font-quicksand), Quicksand, sans-serif",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            <p>
              Quando o último ticket fecha, começa outra parte da minha rotina. Você me encontra
              correndo ou pedalando pela cidade, às vezes beira-mar, ou então no mar mesmo, no
              bodyboard. Gosto de me mover, de sentir o espaço, de estar presente.
            </p>
            <p className="mt-5">
              Tenho um lado criativo que não consegue ficar parado: produzo graffiti e arte urbana,
              que pra mim é quase uma meditação em movimento. Me conecto com a natureza quando dá e
              valorizo muito o tempo com a família e os amigos, é a base de tudo.
            </p>
            <p className="mt-5">
              E nos momentos em que estou "quieto", estou estudando. Atualmente me aprofundando em{" "}
              <strong style={{ color: "#A78BFA", fontWeight: 600 }}>
                Inteligência Artificial na Univali
              </strong>
              , porque acredito que quem entende de tecnologia e de pessoas ao mesmo tempo tem muito
              a oferecer, e essa é exatamente a combinação que busco construir.
            </p>
          </div>
        </div>

        {/* Decoração sutil de fundo */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,255,0.07) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />
      </motion.div>
    </section>
  );
}
