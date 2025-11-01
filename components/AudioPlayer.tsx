'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  soundUrl: string;
  title: string;
}

export default function AudioPlayer({ soundUrl, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0; // Set to 100%
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setIsVisible(true); // Show player when audio ends
    };
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      // Also update duration in case it wasn't set yet
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('durationchange', handleDurationChange);

    // Set initial duration if already loaded
    if (audio.duration && !isNaN(audio.duration)) {
      setDuration(audio.duration);
    }

    // Autoplay with error handling
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay prevented by browser:', error);
      }
    };

    playAudio();

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('durationchange', handleDurationChange);
    };
  }, [soundUrl]);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if near bottom of page (within 100px)
      const isNearBottom = windowHeight + currentScrollY >= documentHeight - 100;

      if (isNearBottom) {
        // Always show player at bottom
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide player
        setIsVisible(false);
      } else {
        // Scrolling up - show player
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200/50 bg-stone-50/80 backdrop-blur-md transition-transform duration-300 dark:border-zinc-900/50 dark:bg-zinc-950/80 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-5xl px-8 py-3 md:px-16">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 shrink-0 items-center justify-center transition-transform hover:scale-105"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="h-5 w-5 text-stone-900 dark:text-stone-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-stone-900 dark:text-stone-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Current Time */}
          <span className="shrink-0 text-xs tabular-nums text-stone-500 dark:text-stone-500">
            {formatTime(currentTime)}
          </span>

          {/* Progress Bar */}
          <div className="relative h-1 flex-1 cursor-pointer bg-stone-200 dark:bg-zinc-900">
            <div
              className="relative h-full bg-stone-900 transition-[width] duration-100 ease-linear dark:bg-stone-50"
              style={{ width: `${progress}%` }}
            >
              {/* Pulsing indicator at the end of progress */}
              {isPlaying && progress > 0 && (
                <span className="absolute -right-0.5 top-1/2 flex h-2 w-2 -translate-y-1/2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-stone-900 opacity-75 dark:bg-stone-50"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-stone-900 dark:bg-stone-50"></span>
                </span>
              )}
            </div>
          </div>

          {/* Remaining Time */}
          <span className="shrink-0 text-xs tabular-nums text-stone-500 dark:text-stone-500">
            {duration > 0 && currentTime > 0 && currentTime < duration
              ? `-${formatTime(duration - currentTime)}`
              : formatTime(currentTime >= duration ? 0 : duration)}
          </span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={soundUrl}
        preload="metadata"
        aria-label={`Audio for ${title}`}
      />
    </div>
  );
}
