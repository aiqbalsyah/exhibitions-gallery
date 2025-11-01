import Link from 'next/link';
import { paintings } from '@/lib/paintings-data';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col justify-end px-8 py-16 md:px-16">
        <div className="mb-32 md:mb-48">
          <div className="mb-8 overflow-hidden">
            <h1 className="font-serif text-7xl tracking-tight text-stone-900 dark:text-stone-50 md:text-9xl lg:text-[12rem]">
              Exhibition
            </h1>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md font-serif text-lg italic leading-relaxed text-stone-600 dark:text-stone-400 md:text-xl">
              An immersive collection where art meets sound
            </p>
            <Link
              href="#works"
              className="group inline-flex items-baseline gap-2 text-sm uppercase tracking-widest text-stone-900 dark:text-stone-50"
            >
              Scroll to explore
              <span className="inline-block transition-transform group-hover:translate-y-1">↓</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="works" className="relative px-8 py-24 md:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="columns-1 gap-8 space-y-8 md:columns-2 lg:columns-3">
            {paintings.map((painting) => (
              <Link
                key={painting.id}
                href={`/paintings/${painting.id}`}
                className="group block break-inside-avoid"
              >
                <div className="overflow-hidden bg-stone-200 dark:bg-zinc-900">
                  <img
                    src={painting.imageUrl}
                    alt={painting.title}
                    className="w-full transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
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
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t border-stone-200 px-8 py-16 dark:border-zinc-900 md:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm tracking-wide text-stone-500 dark:text-stone-500">
            © {new Date().getFullYear()} — A digital gallery experience
          </p>
        </div>
      </footer>
    </div>
  );
}
