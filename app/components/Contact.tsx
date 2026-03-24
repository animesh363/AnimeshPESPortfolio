'use client';

import { useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSectionReveal } from '../hooks/useSectionReveal';
import emailjs from '@emailjs/browser';

// ── EmailJS credentials read from .env.local ──
const EJ_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
const EJ_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
const EJ_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';

type Status = 'idle' | 'sending' | 'success' | 'error';

const socials = [
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Twitter / X', href: 'https://twitter.com' },
];

const INK = '#f8fafc';
const MUTED = '#94a3b8';
const WHITE = '#0b0b0f';
const LINE = 'rgba(255,255,255,0.1)';
const MONO = "'Space Mono', monospace";
const DISPLAY = "'Outfit', sans-serif";

export default function Contact() {
    const sectionRef = useSectionReveal();
    const revealRef1 = useScrollReveal();
    const revealRef2 = useScrollReveal();
    const revealRef3 = useScrollReveal();
    const formRef = useRef<HTMLFormElement>(null);

    const [status, setStatus] = useState<Status>('idle');
    const [errText, setErrText] = useState('Something went wrong — please try again.');

    // Temporary console log to check `.env.local` bindings
    console.log('EJ keys:', EJ_SERVICE_ID, EJ_TEMPLATE_ID, EJ_PUBLIC_KEY);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        const fd = new FormData(formRef.current);
        const name = (fd.get('name') as string)?.trim();
        const email = (fd.get('email') as string)?.trim();
        const message = (fd.get('message') as string)?.trim();

        if (!name || !email || !/\S+@\S+\.\S+/.test(email) || !message) {
            setErrText('Please fill in all fields correctly.');
            setStatus('error');
            return;
        }

        if (!EJ_SERVICE_ID || !EJ_TEMPLATE_ID || !EJ_PUBLIC_KEY) {
            setErrText('Server config missing: Please restart your Next.js development server so it can load the new .env.local keys.');
            setStatus('error');
            return;
        }

        setStatus('sending');
        try {
            await emailjs.sendForm(EJ_SERVICE_ID, EJ_TEMPLATE_ID, formRef.current, {
                publicKey: EJ_PUBLIC_KEY,
            });
            setStatus('success');
            formRef.current.reset();
        } catch (err: any) {
            console.error('EmailJS Error:', err);
            const errorMessage = err?.text || err?.message || 'Empty response from EmailJS (Check your Service/Template IDs).';
            setErrText(`Error: ${errorMessage}`);
            setStatus('error');
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="reveal-section"
            style={{ background: WHITE, padding: '120px 0 130px', borderTop: `1px solid ${LINE}` }}
        >
            <div className="container-standard">

                {/* Heading */}
                <div
                    ref={revealRef1}
                    data-stagger="true"
                    style={{ marginBottom: '4rem' }}
                >
                    <span className="reveal reveal-text" style={{
                        fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.22em',
                        textTransform: 'uppercase', color: MUTED, display: 'block', marginBottom: '1rem',
                    }}>
                        04 — Contact
                    </span>
                    <h2 className="reveal reveal-text" style={{
                        fontFamily: DISPLAY,
                        fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                        fontWeight: 800, lineHeight: 1.05, color: INK,
                    }}>
                        <span style={{ fontWeight: 300, color: MUTED }}>Let&apos;s build</span>
                        <br />
                        something real.
                    </h2>
                </div>

                {/* Form */}
                <div ref={revealRef2} data-stagger="true" style={{ maxWidth: '600px' }}>
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="reveal reveal-up"><Field id="cf-name" label="Name" name="name" type="input" placeholder="Your name" /></div>
                        <div className="reveal reveal-up"><Field id="cf-email" label="Email" name="email" type="input" placeholder="your@email.com" inputType="email" /></div>
                        <div className="reveal reveal-up"><Field id="cf-message" label="Message" name="message" type="textarea" placeholder="Tell me what you're working on…" /></div>

                        <div className="reveal reveal-up">
                            <SubmitBtn status={status} />
                        </div>

                        {status === 'success' && (
                            <p className="reveal reveal-up" style={{ marginTop: '1rem', fontFamily: MONO, fontSize: '0.72rem', color: '#16a34a', letterSpacing: '0.04em' }}>
                                Sent. I&apos;ll be in touch soon.
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="reveal reveal-up" style={{ marginTop: '1rem', fontFamily: MONO, fontSize: '0.72rem', color: '#dc2626', letterSpacing: '0.04em' }}>
                                {errText}
                            </p>
                        )}
                    </form>
                </div>

                {/* Socials */}
                <div
                    ref={revealRef3}
                    data-stagger="true"
                    style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '3.5rem' }}
                >
                    {socials.map(s => (
                        <div key={s.name} className="reveal reveal-up">
                            <SocialBtn {...s} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

/* ── Field ── */
function Field({
    id, label, name, type, placeholder, inputType = 'text',
}: {
    id: string; label: string; name: string;
    type: 'input' | 'textarea'; placeholder: string; inputType?: string;
}) {
    const [focused, setFocused] = useState(false);

    const base: React.CSSProperties = {
        width: '100%', background: 'transparent',
        border: 'none', borderBottom: `1px solid ${focused ? '#00f0ff' : LINE}`,
        outline: 'none', fontFamily: MONO, fontSize: '0.95rem',
        color: INK, padding: '0.5rem 0 0.7rem',
        borderRadius: 0, WebkitAppearance: 'none' as const,
        transition: 'border-color 0.2s',
    };

    return (
        <div style={{ marginBottom: '2.2rem' }}>
            <label htmlFor={id} style={{
                fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: MUTED, display: 'block', marginBottom: '0.5rem',
            }}>
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={id} name={name} rows={5} placeholder={placeholder} required
                    style={{ ...base, resize: 'none', lineHeight: 1.7 }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            ) : (
                <input
                    id={id} type={inputType} name={name} placeholder={placeholder}
                    autoComplete={name} required
                    style={base}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            )}
        </div>
    );
}

/* ── Submit button ── */
function SubmitBtn({ status }: { status: Status }) {
    const [hovered, setHovered] = useState(false);
    const sending = status === 'sending';

    return (
        <button
            type="submit"
            disabled={sending}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: '100%', padding: '1rem 2rem',
                background: hovered && !sending ? WHITE : INK,
                color: hovered && !sending ? INK : WHITE,
                border: `1px solid ${INK}`,
                fontFamily: MONO, fontSize: '0.78rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                cursor: sending ? 'not-allowed' : 'pointer',
                fontWeight: 400, borderRadius: 0,
                opacity: sending ? 0.55 : 1,
                transition: 'background 0.22s, color 0.22s',
                display: 'block',
            }}
        >
            {sending ? 'Sending…' : 'Send message'}
        </button>
    );
}

/* ── Social link ── */
function SocialBtn({ name, href }: { name: string; href: string }) {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={href} target="_blank" rel="noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                fontFamily: MONO, fontSize: '0.72rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', padding: '0.65rem 1.4rem',
                border: `1px solid ${hovered ? '#cbd5e1' : LINE}`,
                color: hovered ? INK : MUTED,
                textDecoration: 'none', borderRadius: 0,
                transition: 'border-color 0.2s, color 0.2s',
                display: 'inline-flex', alignItems: 'center',
            }}
        >
            {name}
        </a>
    );
}
