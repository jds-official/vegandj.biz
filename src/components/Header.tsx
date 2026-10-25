'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Hide on scroll down, reveal on scroll up (after the first 200px).
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowHeader(current <= 200 || current < lastScrollY.current);
      lastScrollY.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 flex w-full items-center justify-between bg-rose-50 p-4 transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <a href="#top" className="font-script text-2xl">
        {site.name}
      </a>
      <nav className="flex items-center gap-4 text-sm">
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer">
          TikTok
        </a>
        <a
          href="#contact"
          className="rounded-full bg-black px-4 py-2 text-rose-50"
        >
          Book a date
        </a>
      </nav>
    </header>
  );
}
