import Link from 'next/link';
import { notFound } from 'next/navigation';
import { paintings } from '@/lib/paintings-data';
import AudioPlayer from '@/components/AudioPlayer';
import PaintingHeader from '@/components/PaintingHeader';

interface PaintingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return paintings.map((painting) => ({
    id: painting.id,
  }));
}

export async function generateMetadata({ params }: PaintingPageProps) {
  const { id } = await params;
  const painting = paintings.find((p) => p.id === id);

  if (!painting) {
    return {
      title: 'Painting Not Found',
    };
  }

  return {
    title: `${painting.title} - Painting Exhibition`,
    description: painting.description,
  };
}

export default async function PaintingPage({ params }: PaintingPageProps) {
  const { id } = await params;
  const painting = paintings.find((p) => p.id === id);

  if (!painting) {
    notFound();
  }

  const currentIndex = paintings.findIndex((p) => p.id === id);
  const previousPainting = currentIndex > 0 ? paintings[currentIndex - 1] : null;
  const nextPainting = currentIndex < paintings.length - 1 ? paintings[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-stone-50 pb-32 dark:bg-zinc-950">
      {/* Header */}
      <PaintingHeader
        painting={painting}
        previousPainting={previousPainting}
        nextPainting={nextPainting}
      />

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-8 pt-32 md:px-16">
        <div className="mb-16">
          <p className="mb-4 text-sm uppercase tracking-widest text-stone-500 dark:text-stone-500">
            {painting.year}
          </p>
          <h1 className="mb-6 font-serif text-6xl tracking-tight text-stone-900 dark:text-stone-50 md:text-7xl lg:text-8xl">
            {painting.title}
          </h1>
          {painting.artist && (
            <p className="font-serif text-2xl italic text-stone-600 dark:text-stone-400 md:text-3xl">
              {painting.artist}
            </p>
          )}
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.2fr,1fr]">
          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden bg-stone-200 dark:bg-zinc-900">
              <img
                src={painting.imageUrl}
                alt={painting.title}
                className="w-full"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8 lg:py-8">
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300">
                {painting.description}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Audio Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <AudioPlayer soundUrl={painting.soundUrl} title={painting.title} />
      </div>
    </div>
  );
}
