'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSectionReveal } from '../hooks/useSectionReveal';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import DeveloperModel from './DeveloperModel';
import Image from 'next/image';

const INK = '#f8fafc';
const BODY = '#cbd5e1';
const MUTED = '#94a3b8';
const WHITE = '#ffffff';
const ACCENT = '#00f0ff';
const MONO = "'Space Mono', monospace";
const DISPLAY = "'Outfit', sans-serif";



function ParticleBackground() {
    const count = 300;
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const mouse = useRef(new THREE.Vector2());
    const targetMouse = useRef(new THREE.Vector2());

    const particles = useRef(
        Array.from({ length: count }, () => ({
            time: Math.random() * 100,
            factor: 20 + Math.random() * 100,
            speed: 0.01 + Math.random() / 200,
            x: Math.random() * 40 - 20,
            y: Math.random() * 40 - 20,
            z: Math.random() * 40 - 20,
        }))
    );

    const dummy = useRef(new THREE.Object3D());

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame(() => {
        // Smoothly interpolate mouse position for a pleasant trailing effect
        mouse.current.lerp(targetMouse.current, 0.05);

        particles.current.forEach((particle, i) => {
            let { time, factor, speed, x, y, z } = particle;
            time = particle.time += speed / 2;

            // Particles drift and react to mouse movement (parallax effect)
            const currentX = x + Math.cos(time) + (mouse.current.x * factor * 0.1);
            const currentY = y + Math.sin(time) + (mouse.current.y * factor * 0.1);
            const currentZ = z + Math.sin(time);

            dummy.current.position.set(currentX, currentY, currentZ);

            // Pulse size
            const scale = Math.max(0.1, Math.sin(time) * 0.15);
            dummy.current.scale.setScalar(scale);

            dummy.current.updateMatrix();
            meshRef.current?.setMatrixAt(i, dummy.current.matrix);
        });
        if (meshRef.current) {
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} toneMapped={false} />
        </instancedMesh>
    );
}

export default function Hero() {
    const revealRef = useScrollReveal();
    const sectionRef = useSectionReveal(0); // 0 threshold so it triggers instantly on load
    const roles = ['Full Stack Developer.', 'Software Engineer.', 'AI, Web & Cutting-Edge Technologies.'];
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    setDisplayText(currentRole.slice(0, displayText.length + 1));
                    if (displayText.length === currentRole.length) {
                        setTimeout(() => setIsDeleting(true), 2000);
                    }
                } else {
                    setDisplayText(currentRole.slice(0, displayText.length - 1));
                    if (displayText.length === 0) {
                        setIsDeleting(false);
                        setRoleIndex((prev) => (prev + 1) % roles.length);
                    }
                }
            },
            isDeleting ? 40 : 80
        );
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    return (
        <section ref={sectionRef} id="home" className="reveal-section relative flex items-center min-h-screen bg-[#0b0b0f] overflow-hidden pt-24 lg:pt-0 z-[1]">
            {/* ── Ambient Animated Gradients & Interactive Particles ── */}
            <div className="absolute inset-0 z-[0] pointer-events-none">
                <Canvas camera={{ position: [0, 0, 10], fov: 60 }} className="absolute inset-0 w-full h-full opacity-60">
                    <Suspense fallback={null}>
                        <ParticleBackground />
                    </Suspense>
                </Canvas>

                <div
                    className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px] animate-float-slow"
                    style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] animate-float"
                    style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, transparent 70%)', animationDelay: '1s' }}
                />
            </div>

            {/* ── Right Side: Profile Image & Model Background ── */}
            <div ref={revealRef} className="absolute inset-0 w-full h-full pointer-events-none z-[10] flex flex-col justify-center">
               <div className="absolute inset-0 lg:left-[45%] lg:w-[55%] pointer-events-auto reveal reveal-right flex flex-col items-center justify-center p-8 mt-24 lg:-ml-8 lg:mt-0 -translate-y-6 lg:-translate-y-8" style={{ transitionDelay: '300ms' }}>
                   
                   {/* Profile Image (Main Subject) */}
                   <div className="relative w-64 md:w-80 lg:w-[400px] aspect-[4/5] rounded-3xl overflow-hidden border border-[#00f0ff]/30 shadow-[0_0_40px_rgba(0,240,255,0.15)] transition-all duration-500 hover:scale-[1.03] hover:-translate-y-4 hover:shadow-[0_0_60px_rgba(0,240,255,0.3)] z-[20]">
                       <Image src="/img/Profile.png" alt="Animesh Anand" fill className="object-cover" priority sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 400px" />
                   </div>

                   {/* 3D Developer Model (Perfectly centered strictly below the profile image) */}
                   <div className="absolute w-[150%] left-1/2 -translate-x-1/2 top-[55%] lg:top-[60%] bottom-[-20%] flex items-center justify-center pointer-events-none z-[1] opacity-[0.06]">
                       <DeveloperModel />
                   </div>

               </div>
            </div>

            <div ref={revealRef} data-stagger="true" className="container-standard relative z-[20] w-full pointer-events-none md:flex md:items-center">
                <div className="max-w-[700px] pointer-events-auto relative">
                    {/* Tag */}
                    <div className="reveal reveal-text inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md shadow-sm border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                        <span style={{ fontFamily: MONO, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: INK }}>
                            Open to Impactful Projects
                        </span>
                    </div>

                    {/* Name */}
                    <h1
                        className="reveal reveal-text"
                        style={{
                            fontFamily: DISPLAY,
                            fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            lineHeight: 1.05,
                            color: INK,
                            marginBottom: '1rem'
                        }}
                    >
                        <span style={{ fontWeight: 300, color: BODY }}>I&apos;m </span>
                        <span>Animesh Anand.</span>
                    </h1>

                    {/* Typewriter role */}
                    <div
                        className="reveal reveal-text"
                        style={{
                            fontFamily: MONO,
                            fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                            color: INK,
                            height: '2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: '0.5rem',
                            marginBottom: '2rem'
                        }}
                    >
                        <span>{displayText}</span>
                        <span className="w-2 h-5 bg-[#4f46e5] opacity-80 animate-pulse" />
                    </div>

                    {/* Description */}
                    <p
                        className="reveal reveal-text"
                        style={{
                            fontFamily: MONO,
                            fontSize: '0.9rem',
                            lineHeight: 1.8,
                            color: BODY,
                            maxWidth: '540px',
                            fontWeight: 300
                        }}
                    >
                        Crafting minimal, high-performance digital experiences through clean code and intentional design. Turning complex ideas into elegant solutions — from pixel-perfect UIs to rock-solid backends.
                    </p>
                </div>
            </div>


        </section>
    );
}
