'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Painting } from '@/lib/types';

interface PaintingHeaderProps {
  painting: Painting;
  previousPainting: Painting | null;
  nextPainting: Painting | null;
}

export default function PaintingHeader({ painting, previousPainting, nextPainting }: PaintingHeaderProps) {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show title when scrolled past approximately 300px (rough estimate for title section)
      setShowTitle(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-40 w-full border-b border-stone-200/50 bg-stone-50/80 backdrop-blur-md dark:border-zinc-900/50 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-6 md:px-16">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm uppercase tracking-widest text-stone-900 dark:text-stone-50"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Index
        </Link>

        {/* Title and Artist - Shows on scroll */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-300 ${showTitle ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <h2 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-50">
            {painting.title}
          </h2>
          {painting.artist && (
            <p className="text-xs italic text-stone-500 dark:text-stone-500">
              {painting.artist}
            </p>
          )}
        </div>

        <div className="flex items-center gap-6">
          {previousPainting && (
            <Link
              href={`/paintings/${previousPainting.id}`}
              className="text-sm uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-500 dark:hover:text-stone-50"
              aria-label="Previous painting"
            >
              Prev
            </Link>
          )}
          {nextPainting && (
            <Link
              href={`/paintings/${nextPainting.id}`}
              className="text-sm uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-500 dark:hover:text-stone-50"
              aria-label="Next painting"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
