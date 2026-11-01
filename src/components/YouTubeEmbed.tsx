'use client';

import { useState } from 'react';

interface YouTubeEmbedProps {
  /** YouTube video ID, e.g. "dQw4w9WgXcQ". Empty renders the placeholder. */
  videoId: string;
  /** Accessible title for the play button and iframe. */
  title: string;
  className?: string;
}

/**
 * Click-to-load YouTube embed ("facade" pattern).
 *
 * Renders only a thumbnail until the visitor clicks, so the landing page ships
 * no YouTube iframe, scripts or cookies up front. On click it swaps in an
 * iframe from youtube-nocookie.com with autoplay. `rel=0` limits suggested
 * videos to the same channel. See docs/adr/0001-youtube-for-video-hosting.md.
 */
export default function YouTubeEmbed({
  videoId,
  title,
  className = '',
}: YouTubeEmbedProps) {
  const [activated, setActivated] = useState(false);

  if (!videoId) {
    return (
      <div
        className={`aspect-video w-full rounded-lg bg-neutral-900 text-neutral-300 grid place-items-center ${className}`}
      >
        <p className="font-script text-2xl">Reel coming soon</p>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg ${className}`}
    >
      {activated ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* Plain <img>: a remote thumbnail that is not worth the image optimizer's quota. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/20 transition-colors group-hover:bg-black/30">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-rose-50 text-2xl text-black shadow-lg transition-transform group-hover:scale-110">
              <span aria-hidden="true" className="ml-1">
                ▶
              </span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
