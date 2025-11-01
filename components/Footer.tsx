export default function Footer() {
  return (
    <footer className="border-t border-stone-200 px-8 py-6 dark:border-zinc-900 md:px-16">
      <div className="flex items-center justify-between">
        <p className="text-xs text-stone-500 dark:text-stone-500">
          {new Date().getFullYear()}
        </p>
        <p className="text-xs text-stone-500 dark:text-stone-500">
          @aiqbalsyah
        </p>
      </div>
    </footer>
  );
}
