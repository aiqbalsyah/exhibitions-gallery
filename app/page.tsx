import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-stone-50 dark:bg-zinc-950">
        {/* Hero Section */}
        <Hero />

        {/* Footer */}
        <Footer />
      </div>
    </PageTransition>
  );
}
