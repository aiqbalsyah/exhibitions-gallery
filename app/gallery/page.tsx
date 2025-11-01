import Link from 'next/link';
import { paintings } from '@/lib/paintings-data';
import GalleryGrid from '@/components/GalleryGrid';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  title: 'Gallery - Painting Exhibition',
  description: 'Browse our collection of masterpieces with immersive soundscapes',
};

export default function GalleryPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="fixed top-0 z-40 w-full border-b border-stone-200/50 bg-stone-50/80 backdrop-blur-md dark:border-zinc-900/50 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-6 md:px-16">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm uppercase tracking-widest text-stone-900 dark:text-stone-50"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Home
          </Link>

          <h1 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-50">
            Gallery
          </h1>

          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Gallery Section */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-8 pt-32 pb-24 md:px-16">
        <GalleryGrid paintings={paintings} />
      </main>

      {/* Footer */}
      <Footer />
      </div>
    </PageTransition>
  );
}
