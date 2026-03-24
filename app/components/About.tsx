'use client';

import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSectionReveal } from '../hooks/useSectionReveal';
import StatCounter from './StatCounter';

const stats = [
    { value: '5+', label: 'Projects Built' },
    { value: '9+', label: 'Technologies' },
    { value: '100%', label: 'Passion' },
    { value: '∞', label: 'Always Learning' },
];

const INK = '#f8fafc';
const BODY = '#cbd5e1';
const MUTED = '#94a3b8';
const ACCENT = '#00f0ff';
const WHITE = '#0b0b0f';
const LINE = 'rgba(255,255,255,0.1)';
const MONO = "'Space Mono', monospace";
const DISPLAY = "'Outfit', sans-serif";

export default function About() {
    const revealRef = useScrollReveal();
    const sectionRef = useSectionReveal();

    return (
        <section
            id="about"
            ref={sectionRef}
            className="reveal-section"
            style={{ background: WHITE, padding: '120px 0 130px', borderTop: `1px solid ${LINE}`, position: 'relative', overflow: 'hidden' }}
        >
            {/* ── Ambient Animated Gradients ── */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
                <div
                    className="animate-float-slow"
                    style={{
                        position: 'absolute', top: '10%', left: '-20%', width: '50vw', height: '50vw',
                        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
                        borderRadius: '50%', filter: 'blur(80px)'
                    }}
                />
                <div
                    className="animate-float"
                    style={{
                        position: 'absolute', bottom: '0%', right: '-15%', width: '60vw', height: '60vw',
                        background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)',
                        borderRadius: '50%', filter: 'blur(100px)', animationDelay: '2s'
                    }}
                />
            </div>

            <div className="container-standard" style={{ position: 'relative', zIndex: 10 }}>

                {/* Heading similar to Contact */}
                <div
                    ref={revealRef}
                    data-stagger="true"
                    style={{ marginBottom: '4rem' }}
                >
                    <span className="reveal reveal-text" style={{
                        fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.22em',
                        textTransform: 'uppercase', color: MUTED, display: 'block', marginBottom: '1rem',
                    }}>
                        01 — About
                    </span>
                    <h2 className="reveal reveal-text" style={{
                        fontFamily: DISPLAY,
                        fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                        fontWeight: 800, lineHeight: 1.05, color: INK,
                    }}>
                        <span style={{ fontWeight: 300, color: MUTED }}>Fullstack</span>
                        <br />
                        developer.
                    </h2>
                </div>

                {/* Content grid */}
                <div ref={revealRef} data-stagger="true" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                }}>

                    {/* Left Text */}
                    <div>
                        <p className="reveal reveal-text" style={{
                            fontFamily: MONO, fontSize: '0.85rem', lineHeight: 1.8,
                            color: BODY, marginBottom: '2rem', fontWeight: 300
                        }}>
                            I'm a passionate fresher fullstack developer with a deep craving for building cutting-edge technologies — from interactive frontends to scalable backend systems.
                        </p>
                        <p className="reveal reveal-text" style={{
                            fontFamily: MONO, fontSize: '0.85rem', lineHeight: 1.8,
                            color: BODY, marginBottom: '2rem', fontWeight: 300
                        }}>
                            My journey started with curiosity — how does the web actually work? That curiosity evolved into hands-on skills with html, css, javascript, React, Node.js, Laravel, Docker & GitHub Actions, building real projects from scratch.
                        </p>
                        <p className="reveal reveal-text" style={{
                            fontFamily: MONO, fontSize: '0.85rem', lineHeight: 1.8,
                            color: BODY, fontWeight: 300
                        }}>
                            I don't just write code. I craft clean, intentional, production-ready solutions — and I'm always hungry to learn what's next.
                        </p>

                        <div className="reveal reveal-up" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href="#" target="_blank" rel="noreferrer" style={{ 
                                padding: '0.75rem 1.5rem', background: ACCENT, color: WHITE, 
                                fontFamily: MONO, fontSize: '0.8rem', fontWeight: 600, 
                                textDecoration: 'none', borderRadius: '4px', transition: 'opacity 0.2s',
                            }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                                LinkedIn
                            </a>
                            <a href="/Resume.pdf" download style={{ 
                                padding: '0.75rem 1.5rem', border: `1px solid ${ACCENT}`, color: ACCENT, 
                                fontFamily: MONO, fontSize: '0.8rem', fontWeight: 600, 
                                textDecoration: 'none', borderRadius: '4px', background: 'transparent',
                                transition: 'background 0.2s'
                            }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                                Download CV
                            </a>
                        </div>
                    </div>

                    {/* Right Stats */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '2rem'
                        }}
                    >
                        {stats.map((stat, i) => (
                            <StatCounter key={i} finalValue={stat.value} label={stat.label} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
