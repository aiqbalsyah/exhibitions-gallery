'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
      })
        .from(
          '.hero-subtitle',
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.hero-link',
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-end px-8 py-16 md:px-16"
    >
      <div className="mb-32 md:mb-48">
        <div className="mb-8 overflow-hidden">
          <h1 className="hero-title font-serif text-7xl tracking-tight text-stone-900 dark:text-stone-50 md:text-9xl lg:text-[12rem]">
            Exhibition
          </h1>
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="hero-subtitle max-w-md font-serif text-lg italic leading-relaxed text-stone-600 dark:text-stone-400 md:text-xl">
            An immersive collection where art meets sound
          </p>
          <Link
            href="/gallery"
            className="hero-link group inline-flex items-baseline gap-2 text-sm uppercase tracking-widest text-stone-900 dark:text-stone-50"
          >
            Enter Gallery
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
