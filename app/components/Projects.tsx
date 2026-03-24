'use client';

import { useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSectionReveal } from '../hooks/useSectionReveal';

const projects = [
    {
        id: '01',
        title: 'Chatify',
        desc: 'A real-time chat application that enables users to send and receive messages instantly with a smooth and interactive interface. Built using modern technologies, it supports features like user authentication, live messaging, and scalable communication.',
        image: '/img/p1.png',
        github: '#',
        live: '#',
        techStack: ['ReactJs', 'NodeJs', 'MongoDB', 'Tailwind CSS'],
    },
    {
        id: '02',
        title: 'Student and Admin Management System',
        desc: 'A Student and Admin Management System is a web-based platform that allows admins to manage student records, attendance, and academic details efficiently. It provides students access to their information while enabling admins to control, update, and organize data in one place.',
        image: '/img/p2.png',
        github: '#',
        live: '#',
        techStack: ['ReactJs', 'NodeJs', 'MongoDB'],
    },
    {
        id: '03',
        title: 'AI-Text Summariser',
        desc: 'A Text Summarizer is a smart tool that converts long text into concise, meaningful summaries based on user preferences like general or formal style. It filters and highlights key information to deliver clear and structured content quickly.',
        image: '/img/p3.png',
        github: '#',
        live: '#',
        techStack: ['Html', 'CSS', 'JavaScript'],
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

export default function Projects() {
    const revealRef = useScrollReveal();
    const sectionRef = useSectionReveal();

    return (
        <section
            id="projects"
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
                            03 — Projects
                        </span>
                        <h2 className="reveal reveal-text" style={{
                            fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 800, color: INK, lineHeight: 1.05,
                        }}>
                            Selected work.
                        </h2>
                    </div>
                    <span className="reveal reveal-text" style={{
                        fontFamily: MONO, fontSize: '0.66rem',
                        letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED,
                    }}>
                        <span style={{ color: ACCENT }}>03</span> / Projects
                    </span>
                </div>

                {/* Grid */}
                <div ref={revealRef} data-stagger="true" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem',
                }}>
                    {projects.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function ProjectCard({
    project,
    index,
}: {
    project: (typeof projects)[0];
    index: number;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="reveal reveal-up portfolio-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                border: `1px solid ${LINE}`,
                borderRadius: '12px',
                overflow: 'hidden',
                background: hovered ? 'rgba(255,255,255,0.025)' : 'transparent',
                transition: 'background 0.3s ease, transform 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                transform: hovered ? 'translateY(-5px)' : 'none',
            }}
        >
            {/* Image Placeholder */}
            <div className="bg-image-card" style={{
                height: '220px',
                width: '100%',
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderBottom: `1px solid ${LINE}`,
                opacity: hovered ? 1 : 0.85,
                transition: 'opacity 0.3s ease',
            }} />

            {/* Content */}
            <div style={{ padding: '1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: MUTED, letterSpacing: '0.05em' }}>
                        {project.id}
                    </span>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href={project.github} target="_blank" rel="noreferrer" style={{
                            color: MUTED, textDecoration: 'none', transition: 'color 0.2s', fontFamily: MONO, fontSize: '0.75rem'
                        }} onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)} onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
                            GitHub
                        </a>
                        <a href={project.live} target="_blank" rel="noreferrer" style={{
                            color: MUTED, textDecoration: 'none', transition: 'color 0.2s', fontFamily: MONO, fontSize: '0.75rem'
                        }} onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)} onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
                            Live
                        </a>
                    </div>
                </div>

                <h3 style={{ fontFamily: DISPLAY, fontSize: '1.4rem', fontWeight: 800, color: INK, marginBottom: '0.75rem', lineHeight: 1.2 }}>
                    {project.title}
                </h3>

                <p style={{ fontFamily: MONO, fontSize: '0.8rem', color: BODY, lineHeight: 1.6, marginBottom: '1.75rem', flexGrow: 1 }}>
                    {project.desc}
                </p>

                {/* Tech Stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.techStack.map(tech => (
                        <span key={tech} style={{
                            fontFamily: MONO, fontSize: '0.65rem', color: ACCENT,
                            padding: '0.3rem 0.6rem', border: `1px solid rgba(0, 240, 255, 0.2)`, borderRadius: '4px',
                            background: 'rgba(0, 240, 255, 0.05)', whiteSpace: 'nowrap'
                        }}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
