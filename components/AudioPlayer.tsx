'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  soundUrl: string;
  title: string;
}

export default function AudioPlayer({ soundUrl, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

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
    };
  }, [soundUrl]);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200/50 bg-stone-50/80 backdrop-blur-md transition-transform duration-300 dark:border-zinc-900/50 dark:bg-zinc-950/80 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Progress bar */}
      <div className="absolute left-0 right-0 top-0 h-0.5 bg-stone-200 dark:bg-zinc-900">
        <div
          className="h-full bg-stone-900 transition-all duration-200 dark:bg-stone-50"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-8 py-4 md:px-16">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="relative flex h-12 w-12 items-center justify-center transition-transform hover:scale-105"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <>
                  <svg className="h-6 w-6 text-stone-900 dark:text-stone-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                  {/* Pulsing indicator */}
                  <span className="absolute -right-1 -top-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-stone-900 opacity-75 dark:bg-stone-50"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-stone-900 dark:bg-stone-50"></span>
                  </span>
                </>
              ) : (
                <svg className="h-6 w-6 text-stone-900 dark:text-stone-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="hidden md:block">
              <p className="text-sm uppercase tracking-widest text-stone-500 dark:text-stone-500">
                {isPlaying ? 'Now Playing' : 'Paused'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {showVolumeSlider && (
              <div className="hidden items-center gap-3 md:flex">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-stone-900 dark:accent-stone-50"
                  aria-label="Volume control"
                />
                <span className="w-8 text-xs text-stone-500 dark:text-stone-500">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            )}

            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="transition-opacity hover:opacity-70"
              aria-label={`Volume: ${Math.round(volume * 100)}%`}
            >
              {volume === 0 ? (
                <svg className="h-5 w-5 text-stone-900 dark:text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-stone-900 dark:text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>
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
