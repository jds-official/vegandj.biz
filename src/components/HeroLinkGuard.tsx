'use client';

import { useEffect } from 'react';

/**
 * While the form panel is covering the pinned hero, its links (the button and
 * the photo credit) are still on screen geometrically but invisible. Mark them
 * `inert` then, so keyboard focus can never land on something you can't see
 * (WCAG 2.4.11 / 2.4.12). Links opt in with a `data-hero-link` attribute.
 * The test is per link: covered once the panel's top edge is above the link's
 * bottom edge. With the hero not pinned (reduced motion) it is never true.
 */
export default function HeroLinkGuard() {
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLElement>('[data-hero-link]')
    );
    const panel = document.getElementById('contact');
    if (!panel || links.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = panel.getBoundingClientRect().top;
      for (const link of links) {
        link.inert = top < link.getBoundingClientRect().bottom;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
