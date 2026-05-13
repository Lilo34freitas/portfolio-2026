"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─────────────────────────────────────────────
   1. STAR FIELD — 3 000 partículas galácticas
   ───────────────────────────────────────────── */
function StarField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 3000;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
      siz[i] = Math.random() * 2;
    }
    return [pos, siz];
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = t * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0x8899cc}
        size={0.15}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

/* ─────────────────────────────────────────────
   2. GEOMETRIAS FLUTUANTES — Wireframe emissivo
   ───────────────────────────────────────────── */
interface FloatingGeoProps {
  geometry: THREE.BufferGeometry;
  color: number;
  emissiveIntensity: number;
  opacity: number;
  position: [number, number, number];
  rotSpeed: { x: number; y: number };
  floatSpeed: number;
  floatAmp: number;
  groupRef: React.RefObject<THREE.Group>;
}

function FloatingGeometry({
  geometry,
  color,
  emissiveIntensity,
  opacity,
  position,
  rotSpeed,
  floatSpeed,
  floatAmp,
  groupRef,
}: FloatingGeoProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x += rotSpeed.x;
    meshRef.current.rotation.y += rotSpeed.y;
    // Flutuação acontece localmente na malha, permitindo ao GSAP transladar o grupo no mundo global
    meshRef.current.position.y = Math.sin(t * floatSpeed) * floatAmp * 0.35;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   3. RING SÓLIDO — Torus sem wireframe
   ───────────────────────────────────────────── */
function FloatingRing({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.008;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.5 * 0.35;
  });

  return (
    <group ref={groupRef} position={[8, 8, -20]}>
      <mesh ref={meshRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[4, 0.1, 16, 100]} />
        <meshStandardMaterial
          color={0x5B7CFF}
          transparent
          opacity={0.2}
          emissive={0x5B7CFF}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   4. PARALLAX CAMERA — Reage ao mouse (DINÂMICA)
   ───────────────────────────────────────────── */
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { camera } = useThree();

  const handlePointer = useCallback((e: PointerEvent) => {
    mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Register global mouse listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("pointermove", handlePointer);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("pointermove", handlePointer);
      }
    };
  }, [handlePointer]);

  useFrame(() => {
    const m = mouse.current;
    // Lerp suave — intensidade ALTA para efeito dinâmico
    m.x += (m.targetX - m.x) * 0.06;
    m.y += (m.targetY - m.y) * 0.06;

    // Deslocamento forte da câmera (imersivo)
    camera.position.x = m.x * 5;
    camera.position.y = m.y * 4;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─────────────────────────────────────────────
   5. LUZES ANIMADAS — Cor alinhada ao brand
   ───────────────────────────────────────────── */
function AnimatedLights() {
  const p1 = useRef<THREE.PointLight>(null!);
  const p2 = useRef<THREE.PointLight>(null!);
  const p3 = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    p1.current.position.x = Math.sin(t * 0.3) * 15;
    p2.current.position.y = Math.cos(t * 0.4) * 12;
    p3.current.position.z = 20 + Math.sin(t * 0.5) * 8;
  });

  return (
    <>
      <ambientLight color={0x5B7CFF} intensity={0.3} />
      <pointLight ref={p1} color={0x5B7CFF} intensity={2} distance={100} position={[10, 15, 15]} />
      <pointLight ref={p2} color={0x8B5CF6} intensity={1.5} distance={80} position={[-15, -10, 10]} />
      <pointLight ref={p3} color={0xEC4899} intensity={1} distance={60} position={[5, -5, 20]} />
    </>
  );
}

/* ─────────────────────────────────────────────
   6. CENA PRINCIPAL — Combina todos os sub-componentes
   ───────────────────────────────────────────── */
function NexusScene() {
  // Memorizamos as geometrias para evitar recriação
  const geos = useMemo(
    () => ({
      ico: new THREE.IcosahedronGeometry(3, 1),
      torusKnot: new THREE.TorusKnotGeometry(2, 0.6, 100, 16),
      oct: new THREE.OctahedronGeometry(2.5, 0),
      dod: new THREE.DodecahedronGeometry(2, 0),
    }),
    []
  );

  const { camera } = useThree();
  
  // Refs para os grupos dos objetos que serão animados pelo GSAP
  const icoRef = useRef<THREE.Group>(null!);
  const knotRef = useRef<THREE.Group>(null!);
  const octRef = useRef<THREE.Group>(null!);
  const dodRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Primeira Dobra: Apenas a câmera mergulha no espaço
      gsap.to(camera.position, {
        z: 15,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: () => `+=${window.innerHeight * 1}`,
          scrub: 1.5,
        },
      });

      // 2. Segunda Dobra (HeroMain #features): Chama todas as geometrias do fundo para colarem na Tela Direita!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#features",
          start: "top 70%", // Começa quando a HeroMain começar a apontar na tela
          end: "top 10%",   // Termina quando a tela trancar no centro
          scrub: 2,         // Animação muito física e suave (smooth)
        }
      });

      // Puxando do fundo espacial em direção exata ao buraco vazio na direita (X=6 até X=11)
      // Agrupando-as num cluster estelar distribuído lindamente em torno de X=8, garantindo que não sobreponham o texto esquerdo.
      tl.to(icoRef.current.position, { x: 4.0, y: -3.0, z: 8, ease: "power2.inOut" }, 0)   // Fundo Esquerda do Cluster
        .to(knotRef.current.position, { x: 10.0, y: -3.5, z: 12, ease: "power2.inOut" }, 0) // Fundo Direita do Cluster (Torus)
        .to(octRef.current.position, { x: 10.5, y: 3.0, z: 10, ease: "power2.inOut" }, 0)   // Topo Direita do Cluster
        .to(dodRef.current.position, { x: 6.0, y: 4.0, z: 9, ease: "power2.inOut" }, 0)     // Topo Esquerda do Cluster
        .to(ringRef.current.position, { x: 7.5, y: -0.5, z: 6, ease: "power2.inOut" }, 0);  // Frente e Centro do Cluster (Anel)
    });

    return () => ctx.revert();
  }, [camera]);

  return (
    <>
      <CameraRig />
      <AnimatedLights />
      <StarField />

      {/* Icosaedro */}
      <FloatingGeometry
        groupRef={icoRef}
        geometry={geos.ico}
        color={0x5B7CFF}
        emissiveIntensity={0.2}
        opacity={0.4}
        position={[-12, 5, -10]}
        rotSpeed={{ x: 0.003, y: 0.005 }}
        floatSpeed={0.8}
        floatAmp={1.5}
      />

      {/* Torus Knot */}
      <FloatingGeometry
        groupRef={knotRef}
        geometry={geos.torusKnot}
        color={0x8B5CF6}
        emissiveIntensity={0.15}
        opacity={0.35}
        position={[14, -4, -8]}
        rotSpeed={{ x: 0.004, y: 0.003 }}
        floatSpeed={1.2}
        floatAmp={1}
      />

      {/* Octaedro */}
      <FloatingGeometry
        groupRef={octRef}
        geometry={geos.oct}
        color={0xEC4899}
        emissiveIntensity={0.15}
        opacity={0.3}
        position={[0, 10, -15]}
        rotSpeed={{ x: 0.006, y: 0.004 }}
        floatSpeed={0.6}
        floatAmp={2}
      />

      {/* Dodecaedro */}
      <FloatingGeometry
        groupRef={dodRef}
        geometry={geos.dod}
        color={0x22D3EE}
        emissiveIntensity={0.1}
        opacity={0.25}
        position={[-8, -8, -5]}
        rotSpeed={{ x: 0.002, y: 0.007 }}
        floatSpeed={1.0}
        floatAmp={1.2}
      />

      {/* Ring — Cyan sólido */}
      <FloatingRing groupRef={ringRef} />
    </>
  );
}

/* ─────────────────────────────────────────────
   7. EXPORT — Canvas wrapper com configurações de render
   ───────────────────────────────────────────── */
export default function NexusCanvas() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "auto",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <NexusScene />
      </Canvas>
    </div>
  );
}
