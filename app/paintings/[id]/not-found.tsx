import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-8 dark:bg-zinc-950">
      <div className="text-center">
        <p className="mb-4 text-sm uppercase tracking-widest text-stone-500 dark:text-stone-500">
          Error 404
        </p>
        <h1 className="mb-8 font-serif text-6xl tracking-tight text-stone-900 dark:text-stone-50 md:text-7xl">
          Not Found
        </h1>
        <p className="mb-12 text-lg text-stone-600 dark:text-stone-400">
          This painting does not exist in our collection
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 border-b border-stone-900 pb-1 text-sm uppercase tracking-widest text-stone-900 transition-all hover:gap-4 dark:border-stone-50 dark:text-stone-50"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Return to Index
        </Link>
      </div>
    </div>
  );
}
