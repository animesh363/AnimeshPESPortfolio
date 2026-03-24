'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-[var(--glass-border)]">
            {/* Top gradient line */}
            <div className="h-px w-full" style={{
                background: 'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-purple), transparent)',
                opacity: 0.3,
            }} />

            <div className="container-standard py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="group"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-lg font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            <span className="text-[var(--accent-cyan)]">&lt;</span>
                            <span className="text-[var(--text-primary)]">Dev</span>
                            <span className="text-[var(--accent-purple)]">/&gt;</span>
                        </span>
                    </motion.a>

                    {/* Copyright */}
                    <p className="text-sm text-[var(--text-muted)] text-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        © {currentYear} Animesh Anand. Built with{' '}
                        <span className="text-[var(--accent-cyan)]">Next.js</span>,{' '}
                        <span className="text-[var(--accent-purple)]">Framer Motion</span> &{' '}
                        <span className="text-[var(--accent-green)]">♥</span>
                    </p>

                    {/* Back to top */}
                    <motion.button
                        onClick={() => document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' })}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                        }}
                        aria-label="Back to top"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
