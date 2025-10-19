'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number): void;
  mute(): void;
  unMute(): void;
  getDuration(): number;
}

interface YTPlayerConstructor {
  new (
    elementId: string,
    options: {
      height: string;
      width: string;
      videoId: string;
      events: {
        onReady: (event: { target: YTPlayer }) => void;
        onStateChange: (event: { data: number; target: YTPlayer }) => void;
      };
      playerVars: Record<string, number>;
    }
  ): YTPlayer;
}

interface YouTubeAPI {
  Player: YTPlayerConstructor;
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
  };
}

declare global {
  interface Window {
    YT: YouTubeAPI | undefined;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export default function YouTubePlayer({
  videoId,
  title = 'Video Player',
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const loadYouTubeAPI = () => {
      if (window.YT?.Player) {
        initializePlayer();
        return;
      }

      window.onYouTubeIframeAPIReady = initializePlayer;

      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);
    };

    const initializePlayer = () => {
      if (!window.YT?.Player) return;

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
        },
      });
    };

    loadYouTubeAPI();
  }, [videoId]);

  useEffect(() => {
    const updateTime = setInterval(() => {
      if (playerRef.current && isPlaying) {
        setCurrentTime(playerRef.current.getDuration() * 0.5); // Placeholder
      }
    }, 500);

    return () => clearInterval(updateTime);
  }, [isPlaying]);

  const onPlayerReady = (event: { target: YTPlayer }) => {
    setDuration(event.target.getDuration());
  };

  const onPlayerStateChange = (event: { data: number }) => {
    setIsPlaying(event.data === window.YT?.PlayerState.PLAYING);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen().catch(() => {
        // Fullscreen request denied
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-black rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative bg-black aspect-video">
        <div id="youtube-player" className="w-full h-full" />

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-red-600 [&::-moz-range-thumb]:border-0"
          />

          {/* Control Bar */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="text-white hover:text-red-500 transition-colors"
                aria-label="Play/Pause"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button
                onClick={toggleMute}
                className="text-white hover:text-red-500 transition-colors"
                aria-label="Mute"
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>

              <span className="text-white text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={handleFullscreen}
              className="text-white hover:text-red-500 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 size={24} />
            </button>
          </div>
        </div>
      </div>

      {title && (
        <div className="bg-gray-900 p-4">
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
      )}
    </div>
  );
}
