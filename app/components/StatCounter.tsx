'use client';

import { useEffect, useState, useRef } from 'react';

export default function StatCounter({ finalValue, label }: { finalValue: string, label: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // If it's infinity or some non-numeric, just snap
                if (finalValue === '∞') {
                    observer.disconnect();
                    return;
                }

                const num = parseInt(finalValue) || 100;
                let start = 0;
                const duration = 1500;
                const stepTime = Math.abs(Math.floor(duration / num));

                const timer = setInterval(() => {
                    start += 1;
                    setCount(start);
                    if (start >= num) {
                        clearInterval(timer);
                        setCount(num);
                    }
                }, stepTime);

                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [finalValue]);

    const suffix = finalValue.replace(/[0-9]/g, '');

    return (
        <div ref={ref} className="reveal reveal-up" style={{
            borderLeft: `1px solid rgba(255,255,255,0.1)`,
            paddingLeft: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <div style={{
                fontFamily: "'Outfit', sans-serif", fontSize: '2.5rem', fontWeight: 800,
                color: '#f8fafc', lineHeight: 1, marginBottom: '0.5rem'
            }}>
                {finalValue === '∞' ? '∞' : `${count}${suffix}`}
            </div>
            <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#94a3b8'
            }}>
                {label}
            </div>
        </div>
    );
}
