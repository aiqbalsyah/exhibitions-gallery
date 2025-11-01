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
    audio.addEventListener('ended', handleEnded);

    // Autoplay with error handling
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay prevented by browser:', error);
        // User interaction will be required to start playback
      }
    };

    playAudio();

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [soundUrl]);

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

  return (
    <div className="border-t border-stone-200 bg-stone-50/95 backdrop-blur-md dark:border-zinc-900 dark:bg-zinc-950/95">
      <div className="mx-auto max-w-5xl px-8 py-4 md:px-16">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="flex h-12 w-12 items-center justify-center transition-transform hover:scale-105"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="h-6 w-6 text-stone-900 dark:text-stone-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
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
