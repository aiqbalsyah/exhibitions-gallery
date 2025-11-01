'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Painting } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

interface GalleryGridProps {
  paintings: Painting[];
}

export default function GalleryGrid({ paintings }: GalleryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.painting-item');

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={gridRef} className="columns-1 gap-8 space-y-8 md:columns-2 lg:columns-3">
      {paintings.map((painting) => (
        <Link
          key={painting.id}
          href={`/paintings/${painting.id}`}
          className="painting-item group block break-inside-avoid"
        >
          <div className="relative overflow-hidden bg-stone-200 dark:bg-zinc-900">
            <Image
              src={painting.imageUrl}
              alt={painting.title}
              width={800}
              height={1000}
              className="w-full transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
              style={{ height: 'auto' }}
            />
          </div>

          <div className="mt-4 space-y-3 pb-4">
            <div>
              <h2 className="font-serif text-2xl tracking-tight text-stone-900 transition-colors group-hover:text-stone-600 dark:text-stone-50 dark:group-hover:text-stone-300">
                {painting.title}
              </h2>
              {painting.artist && (
                <p className="mt-1 font-serif text-sm italic text-stone-600 dark:text-stone-400">
                  {painting.artist} • {painting.year}
                </p>
              )}
            </div>

            <p className="line-clamp-2 text-sm leading-relaxed text-stone-700 dark:text-stone-400">
              {painting.description}
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-900 transition-all group-hover:gap-3 dark:text-stone-50">
                View
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
