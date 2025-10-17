'use client';

import { useRef, useMemo, useCallback } from 'react';

type SoundName = 'wake' | 'unwake' | 'mute' | 'click' | 'countdown';

export function useSound() {
  // Pre-load audio files for instant playback
  const audioCache = useMemo(() => {
    if (typeof window === 'undefined') return {};
    
    const cache: Record<string, HTMLAudioElement> = {};
    const soundFiles = {
      'wake': '/sounds/Wake_Mobile.mp3',
      'unwake': '/sounds/Inactive_Mobile.mp3',
      'mute': '/sounds/Mute.mp3',
      'click': '/sounds/Click-Warm.mp3',
      'countdown': '/sounds/SecondCounter.mp3'
    };

    Object.entries(soundFiles).forEach(([key, file]) => {
      const audio = new Audio(file);
      audio.volume = 0.7;
      audio.preload = 'auto';
      cache[key] = audio;
    });

    return cache;
  }, []);

  const audioRetryAttemptsRef = useRef<Record<string, number>>({});

  const playSound = useCallback((soundName: SoundName) => {
    try {
      let audio = audioCache[soundName];
      if (!audio) {
        console.warn(`🔊 Sound ${soundName} not found in cache`);
        return;
      }

      // Reset audio to beginning for instant replay
      if (!audio.paused) {
        audio.pause();
      }
      audio.currentTime = 0;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audioRetryAttemptsRef.current[soundName] = 0;
          })
          .catch((error) => {
            // Suppress common audio errors silently
            if (error.message?.toLowerCase().includes('pause') ||
                error.message?.toLowerCase().includes('abort') ||
                error.message?.toLowerCase().includes('interrupted')) {
              console.debug(`🔊 Audio conflict suppressed for ${soundName}:`, error.message);
            } else {
              console.debug(`🔊 Audio play failed for ${soundName}:`, error.message);
            }
          });
      }
    } catch (error) {
      console.debug(`🔊 Sound error for ${soundName}:`, error);
    }
  }, [audioCache]);

  return { playSound };
}

