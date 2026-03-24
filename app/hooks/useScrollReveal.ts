'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('is-visible');

            // Stagger children if data-stagger is set
            if (el.hasAttribute('data-stagger')) {
              const children = el.querySelectorAll('.reveal');
              children.forEach((child, index) => {
                (child as HTMLElement).style.transitionDelay = `${index * 100}ms`;
                (child as HTMLElement).classList.add('is-visible');
              });
            }

            // Unobserve after revealing to stick to "zero extra loading time" and "fire once"
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      if (currentRef.hasAttribute('data-stagger')) {
        observer.observe(currentRef);
      } else {
        const reveals = currentRef.querySelectorAll('.reveal');
        if (reveals.length > 0) {
          reveals.forEach((el) => observer.observe(el));
        } else if (currentRef.classList.contains('reveal')) {
          observer.observe(currentRef);
        }
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}
