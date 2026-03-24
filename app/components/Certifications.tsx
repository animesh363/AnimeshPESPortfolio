'use client';

import { useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSectionReveal } from '../hooks/useSectionReveal';

const certifications = [
    {
        id: '01',
        title: 'Cloud Computing',
        issuer: 'NPTEL',
        date: '2026',
        image: '/img/c1.png',
        link: 'https://drive.google.com/file/d/1fm0uDaaC4GDDmaB_PwQrbSwsAddKhT8k/view?usp=sharing',
    },
    {
        id: '02',
        title: 'Responsive Web Design',
        issuer: 'FreeCodeCamp',
        date: '2023',
        image: '/img/c2.png',
        link: 'https://drive.google.com/file/d/1aU5tc7qfsKLqene35tjyEjKhZHG4smKN/view?usp=sharing',
    },
    {
        id: '03',
        title: 'JavaScript (Intermediate)',
        issuer: 'HackerRank',
        date: '2026',
        image: '/img/c3.png',
        link: 'https://www.hackerrank.com/certificates/c6a98fb06469',
    },
    {
        id: '04',
        title: 'Rest API (Intermediate)',
        issuer: 'HackerRank',
        date: '2026',
        image: '/img/c4.png',
        link: 'https://www.hackerrank.com/certificates/aad15d644d8d',
    },
    {
        id: '05',
        title: 'Software Engineer',
        issuer: 'HackerRank',
        date: '2026',
        image: '/img/c5.png',
        link: 'https://www.hackerrank.com/certificates/febc59e40939',
    },
    {
        id: '06',
        title: 'Mastering in C++ with OOPs',
        issuer: 'Centre for Professional Enhancement',
        date: '2025',
        image: '/img/c6.png',
        link: 'https://drive.google.com/file/d/16kZi7lYUtmh9USVyHZupxrgr3ESHh3Sf/view?usp=sharing',
    },
];

const INK = '#f8fafc';
const BODY = '#cbd5e1';
const MUTED = '#94a3b8';
const ACCENT = '#00f0ff';
const WHITE = '#0b0b0f';
const LINE = 'rgba(255,255,255,0.08)';
const MONO = "'Space Mono', monospace";
const DISPLAY = "'Outfit', sans-serif";

export default function Certifications() {
    const revealRef = useScrollReveal();
    const sectionRef = useSectionReveal();

    return (
        <section
            id="certifications"
            ref={sectionRef}
            className="reveal-section"
            style={{ background: WHITE, padding: '120px 0 130px', position: 'relative' }}
        >
            <div className="container-standard">

                {/* Header */}
                <div
                    ref={revealRef}
                    data-stagger="true"
                    style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-end', marginBottom: '3.5rem',
                        flexWrap: 'wrap', gap: '1rem',
                    }}
                >
                    <div>
                        <span className="reveal reveal-text" style={{
                            fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.2em',
                            textTransform: 'uppercase', color: MUTED, display: 'block', marginBottom: '1rem',
                        }}>
                            04 — Certifications
                        </span>
                        <h2 className="reveal reveal-text" style={{
                            fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 800, color: INK, lineHeight: 1.05,
                        }}>
                            Achievements.
                        </h2>
                    </div>
                    <span className="reveal reveal-text" style={{
                        fontFamily: MONO, fontSize: '0.66rem',
                        letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED,
                    }}>
                        <span style={{ color: ACCENT }}>06</span> / Certificates
                    </span>
                </div>

                {/* Grid */}
                <div ref={revealRef} data-stagger="true" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem',
                }}>
                    {certifications.map((c, i) => (
                        <CertCard key={c.id} cert={c} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function CertCard({
    cert,
    index,
}: {
    cert: (typeof certifications)[0];
    index: number;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="reveal reveal-up portfolio-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                border: `1px solid ${LINE}`,
                borderRadius: '12px',
                overflow: 'hidden',
                background: hovered ? 'rgba(255,255,255,0.025)' : 'transparent',
                transition: 'background 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                transform: hovered ? 'translateY(-5px)' : 'none',
                textDecoration: 'none',
                borderColor: hovered ? 'rgba(0, 240, 255, 0.3)' : LINE,
            }}
        >
            {/* Image Placeholder */}
            <div className="bg-image-card" style={{
                height: '240px',
                width: '100%',
                backgroundImage: `url(${cert.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderBottom: `1px solid ${LINE}`,
                opacity: hovered ? 1 : 0.85,
                transition: 'opacity 0.3s ease',
            }} />

            {/* Content */}
            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: MUTED, letterSpacing: '0.05em' }}>
                        {cert.id}
                    </span>
                    <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: ACCENT }}>
                        {cert.date}
                    </span>
                </div>

                <h3 style={{ fontFamily: DISPLAY, fontSize: '1.2rem', fontWeight: 800, color: INK, marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {cert.title}
                </h3>

                <p style={{ fontFamily: MONO, fontSize: '0.8rem', color: BODY, lineHeight: 1.5, marginBottom: '1.5rem', flexGrow: 1 }}>
                    {cert.issuer}
                </p>

                {/* Action Link */}
                <div style={{
                    fontFamily: MONO, fontSize: '0.75rem', color: hovered ? ACCENT : MUTED,
                    display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s ease'
                }}>
                    View Credential <span style={{ transition: 'transform 0.3s ease', transform: hovered ? 'translateX(4px)' : 'none' }}>→</span>
                </div>
            </div>
        </a>
    );
}
