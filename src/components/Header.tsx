// src/components/Header.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only trigger after scrolling more than 100px
      if (currentScrollY > 200) {
        setShowHeader(currentScrollY < lastScrollY);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`p-4 flex justify-between fixed top-0 bg-rose-50 w-full z-50 transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <h1 className="font-script text-2xl">James David Saul</h1>
      <div className="flex gap-4">
        <a
          href="https://www.tiktok.com/@djgrandformat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">TikTok</span>
          <Image
            src="/icons/tiktok.svg"
            alt="TikTok icon"
            width={32}
            height={32}
          />
        </a>
      </div>
    </div>
  );
}
