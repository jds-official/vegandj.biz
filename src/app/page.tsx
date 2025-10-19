'use client';
import Header from '@/components/Header';
import Intro from '@/components/Intro';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="text-black">
      <Header />
      <Intro />
      <Footer />
    </main>
  );
}
