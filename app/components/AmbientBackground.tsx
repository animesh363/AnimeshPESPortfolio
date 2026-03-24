'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AmbientBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Large slow moving glowing orbs */}
            <motion.div
                animate={{
                    x: ['0%', '15%', '-5%', '0%'],
                    y: ['0%', '10%', '20%', '0%'],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
                style={{ background: 'var(--accent-cyan)' }}
            />

            <motion.div
                animate={{
                    x: ['0%', '-15%', '5%', '0%'],
                    y: ['0%', '-15%', '10%', '0%'],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[150px] opacity-20"
                style={{ background: 'var(--accent-purple)' }}
            />

            <motion.div
                animate={{
                    x: ['0%', '20%', '-20%', '0%'],
                    y: ['0%', '-20%', '20%', '0%'],
                    scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                className="absolute top-[40%] left-[40%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.15]"
                style={{ background: 'var(--accent-blue)' }}
            />

            {/* Global grid background overlay to tie it together */}
            <div className="absolute inset-0 grid-bg opacity-30 mix-blend-overlay" />

            {/* Floating dust particles */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white blur-[1px]"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [-20, 20],
                        x: [-20, 20],
                        opacity: [0, 0.5, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    );
}
