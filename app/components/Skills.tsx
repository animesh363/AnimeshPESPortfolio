'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSectionReveal } from '../hooks/useSectionReveal';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Text, OrbitControls, useGLTF, Float } from '@react-three/drei';

const ACCENT = '#00f0ff';
const INK = '#f8fafc';
const MUTED = '#94a3b8';
const BODY = '#cbd5e1';
const BG = '#0b0b0f';
const LINE = 'rgba(255,255,255,0.08)';
const MONO = "'Space Mono', monospace";
const DISPLAY = "'Outfit', sans-serif";

// We'll reuse the abstract "Laptop" and minimalist "Developer" geometry
// from the previous 3D model, but re-styled for the light theme to serve
// as the central character inside the skill cloud.

function Laptop() {
    return (
        <group position={[0, -0.8, 1.0]} scale={1.2}>
            {/* Base */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 0.05, 0.8]} />
                <meshStandardMaterial color="#1a202c" roughness={0.7} />
            </mesh>
            {/* Screen part */}
            <group position={[0, 0.025, -0.4]} rotation={[Math.PI / 8, 0, 0]}>
                <mesh position={[0, 0.35, 0]}>
                    <boxGeometry args={[1, 0.7, 0.05]} />
                    <meshStandardMaterial color="#111827" roughness={0.8} />
                </mesh>
                {/* Screen Glow */}
                <mesh position={[0, 0.35, 0.03]}>
                    <planeGeometry args={[0.9, 0.6]} />
                    <meshBasicMaterial color={ACCENT} toneMapped={false} />
                </mesh>
            </group>
        </group>
    );
}

function DeveloperCharacter() {
    const headRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!headRef.current) return;
        // Subtle floating instead of rotation so the face stays locked forward
        headRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 0.5;
    });

    return (
        <group position={[0, -0.2, 0]}>
            <group ref={headRef} position={[0, 0.5, 0]}>
                {/* The Head - minimalist geometric sphere for a "smiley face" base */}
                <mesh castShadow>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshStandardMaterial
                        color="#4f46e5"
                        roughness={0.2}
                        metalness={0.5}
                    />
                </mesh>

                {/* Smiley Face Details */}
                {/* Left Eye */}
                <mesh position={[-0.25, 0.2, 0.75]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshBasicMaterial color={INK} />
                </mesh>
                {/* Right Eye */}
                <mesh position={[0.25, 0.2, 0.75]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshBasicMaterial color={INK} />
                </mesh>
                {/* Smile / Mouth */}
                <mesh position={[0, -0.2, 0.78]} rotation={[0, 0, Math.PI]}>
                    <torusGeometry args={[0.2, 0.05, 16, 32, Math.PI]} />
                    <meshBasicMaterial color={INK} />
                </mesh>
            </group>

            {/* Tiny Floating Hands/Paws typing */}
            <Float speed={4} rotationIntensity={0} floatIntensity={0.2} position={[-0.4, -0.6, 0.4]}>
                <mesh>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color={INK} roughness={0.5} />
                </mesh>
            </Float>
            <Float speed={5} rotationIntensity={0} floatIntensity={0.2} position={[0.4, -0.6, 0.4]}>
                <mesh>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color={INK} roughness={0.5} />
                </mesh>
            </Float>
        </group>
    );
}

function Centerpiece() {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ camera }) => {
        if (!ref.current) return;
        // Keep the centerpiece completely locked to face the camera screen
        ref.current.quaternion.copy(camera.quaternion);
    });

    return (
        <group ref={ref} scale={1.9}> {/* Markedly increased size */}
            <DeveloperCharacter />
            <Laptop />
        </group>
    );
}

function SkillWord({ children, position }: { children: string, position: THREE.Vector3 }) {
    const ref = useRef<any>(null);

    useFrame(({ camera }) => {
        if (!ref.current) return;
        // Keep the text facing the camera 
        ref.current.quaternion.copy(camera.quaternion);
    });

    return (
        <Text
            ref={ref}
            position={position}
            fontSize={0.8}
            letterSpacing={-0.02}
            color={INK}
        >
            {children}
        </Text>
    );
}

const skillList = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Three.js',
    'WebGL', 'Framer', 'Tailwind', 'Node.js', 'Python',
    'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'AWS',
    'Docker', 'Figma', 'UI/UX', 'Rust', 'Wasm'
];

function InteractiveCloud({ radius = 7.5 }: { radius?: number }) {
    const groupRef = useRef<THREE.Group>(null);

    const words = useMemo(() => {
        const temp = [];
        for (let i = 0; i < skillList.length; i++) {
            const phi = Math.acos(-1 + (2 * i) / skillList.length);
            const theta = Math.sqrt(skillList.length * Math.PI) * phi;
            temp.push([
                new THREE.Vector3().setFromSphericalCoords(radius, phi, theta),
                skillList[i]
            ]);
        }
        return temp;
    }, [radius]);

    return (
        <group ref={groupRef}>
            {/* The Central Character */}
            <Centerpiece />

            {/* Orbiting Skill Text */}
            {words.map(([pos, word], index) => (
                <SkillWord key={index} position={pos as THREE.Vector3}>
                    {word as string}
                </SkillWord>
            ))}
        </group>
    );
}

export default function Skills() {
    const revealRef = useScrollReveal();
    const sectionRef = useSectionReveal();

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="reveal-section"
            style={{ background: BG, padding: '120px 0 130px', position: 'relative', overflow: 'hidden' }}
        >
            {/* Watermark */}
            <div
                aria-hidden
                style={{
                    position: 'absolute', top: '50%', left: '4vw',
                    transform: 'translateY(-50%)',
                    fontSize: 'clamp(9rem, 20vw, 16rem)',
                    fontWeight: 800, fontFamily: DISPLAY,
                    color: 'rgba(255,255,255,0.03)',
                    lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                }}
            >
                02
            </div>

            <div className="container-standard" style={{ position: 'relative' }}>

                {/* Header */}
                <div
                    ref={revealRef}
                    data-stagger="true"
                    style={{ marginBottom: '3.5rem' }}
                >
                    <span className="reveal reveal-up" style={{
                        fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: MUTED, display: 'block', marginBottom: '1rem',
                    }}>
                        02 — Skills
                    </span>
                    <h2 className="reveal reveal-up" style={{
                        fontFamily: DISPLAY, fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                        fontWeight: 800, color: INK, lineHeight: 1.05,
                    }}>
                        What I know.
                    </h2>
                </div>

                {/* Split Layout */}
                <div ref={revealRef} data-stagger="true" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center',
                }}>

                    {/* Left: Text Content and Core Categories */}
                    <div>
                        <p className="reveal reveal-text" style={{
                            fontFamily: MONO, fontSize: '0.9rem', lineHeight: 1.8,
                            color: BODY, marginBottom: '2.5rem', fontWeight: 300
                        }}>
                            I specialise in building full-stack applications with modern web technologies.
                            From responsive, pixel-perfect frontends to scalable, secure backend systems,
                            I ensure every layer is optimised for performance and user experience.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { cat: 'Frontend', text: 'React, Next.js, TypeScript, Three.js' },
                                { cat: 'Backend', text: 'Node.js, PostgreSQL, GraphQL, Python' },
                                { cat: 'DevOps', text: 'AWS, Docker, CI/CD, Kubernetes' }
                            ].map((item, i) => (
                                <div key={i} className="reveal reveal-scale" style={{ paddingBottom: '1rem', borderBottom: `1px solid ${LINE}` }}>
                                    <span style={{
                                        fontFamily: MONO, fontSize: '0.65rem',
                                        letterSpacing: '0.15em', textTransform: 'uppercase',
                                        color: ACCENT, fontWeight: 500, display: 'block', marginBottom: '0.4rem'
                                    }}>
                                        {item.cat}
                                    </span>
                                    <span style={{ fontFamily: DISPLAY, fontSize: '1rem', color: INK, fontWeight: 500 }}>
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Interactive 3D Canvas */}
                    <div
                        className="reveal reveal-scale"
                        style={{
                            height: '500px',
                            width: '100%',
                            position: 'relative',
                            cursor: 'grab'
                        }}
                    >
                        <div style={{
                            position: 'absolute', top: 10, right: 10, zIndex: 10,
                            fontFamily: MONO, fontSize: '0.6rem', color: MUTED,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.8rem', borderRadius: '100px',
                            pointerEvents: 'none', border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            Drag to rotate
                        </div>

                        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                            <ambientLight intensity={1} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <pointLight position={[-10, -10, -10]} intensity={0.5} />

                            <InteractiveCloud />

                            <OrbitControls
                                enableZoom={false}
                                enablePan={false}
                                autoRotate
                                autoRotateSpeed={1.5}
                                rotateSpeed={0.8}
                                dampingFactor={0.1}
                            />
                        </Canvas>
                    </div>

                </div>

            </div>
        </section>
    );
}
