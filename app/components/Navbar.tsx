'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
];

const INK = '#f8fafc';
const MUTED = '#94a3b8';
const ACTIVE = '#00f0ff';
const WHITE = '#ffffff';
// A dark frosted backdrop when scrolled
const SCROLLED_BG = 'rgba(11, 11, 15, 0.85)';
const DISPLAY = "'Outfit', sans-serif";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        setIsLightMode(document.documentElement.classList.contains('light-mode'));
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navLinks.map((l) => l.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // Offset for navbar height
                    if (rect.top <= 150) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        // trigger once to set initial state
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNav = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
                style={{
                    background: scrolled ? SCROLLED_BG : 'transparent',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
                    boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.03)' : 'none'
                }}
            >
                <div
                    className="container-standard flex items-center justify-between transition-all duration-300 relative"
                    style={{
                        paddingTop: scrolled ? '14px' : '28px',
                        paddingBottom: scrolled ? '14px' : '28px',
                    }}
                >
                    {/* ── Logo ── */}
                    <div className="z-10 flex items-center gap-3">
                        <motion.a
                            href="#home"
                            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
                            className="flex items-center gap-3"
                            style={{
                                fontFamily: DISPLAY,
                                fontSize: '1.25rem',
                                fontWeight: 800,
                                color: INK,
                                textDecoration: 'none',
                                letterSpacing: '-0.02em',
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-cyan-400/30 glow-cyan">
                                <img
                                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0"
                                    alt="Developer Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="hidden sm:inline-block drop-shadow-md">Animesh.</span>
                        </motion.a>
                    </div>

                    {/* ── Desktop links ── */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                                    style={{
                                        // Changed font style here to look more friendly and distinct 
                                        fontFamily: DISPLAY,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: isActive ? ACTIVE : MUTED,
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        position: 'relative',
                                        padding: '0.5rem 0'
                                    }}
                                    whileHover={{ color: WHITE }}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navIndicator"
                                            style={{
                                                position: 'absolute',
                                                bottom: '2px',
                                                left: 0,
                                                right: 0,
                                                height: '2px',
                                                background: ACTIVE,
                                                borderRadius: '2px',
                                                boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
                                            }}
                                        />
                                    )}
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* ── Mobile Menu & Theme Toggle ── */}
                    <div className="z-10 flex items-center justify-end gap-3 sm:gap-6 relative">
                        <button
                            onClick={() => {
                                const isLight = document.documentElement.classList.toggle('light-mode');
                                setIsLightMode(isLight);
                                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                            }}
                            className="flex items-center justify-center transition-transform hover:scale-110 bg-image-card"
                            style={{
                                width: '36px', height: '36px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: `1px solid rgba(255,255,255,0.1)`,
                                cursor: 'pointer',
                                color: INK,
                                fontSize: '1.1rem',
                                zIndex: 60,
                            }}
                            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                        >
                            {isLightMode ? '🌙' : '☀️'}
                        </button>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden flex flex-col"
                            style={{
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                padding: '0.25rem',
                                color: INK,
                                gap: '4px',
                                zIndex: 60
                            }}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 5.5 : 0 }}
                                style={{ display: 'block', width: '22px', height: '1.5px', background: INK, transformOrigin: 'center' }}
                            />
                            <motion.span
                                animate={{ opacity: mobileOpen ? 0 : 1 }}
                                style={{ display: 'block', width: '22px', height: '1.5px', background: INK }}
                            />
                            <motion.span
                                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -5.5 : 0 }}
                                style={{ display: 'block', width: '22px', height: '1.5px', background: INK, transformOrigin: 'center' }}
                            />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ── Mobile fullscreen menu ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 40,
                            background: '#0b0b0f',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '2.5rem',
                        }}
                    >
                        {navLinks.map((link, i) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                    style={{
                                        fontFamily: DISPLAY,
                                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                                        fontWeight: 800,
                                        color: isActive ? ACTIVE : MUTED,
                                        textDecoration: 'none',
                                        letterSpacing: '-0.03em',
                                        transition: 'color 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                    }}
                                >
                                    {link.name}
                                </motion.a>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
