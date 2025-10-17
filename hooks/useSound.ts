'use client';

import { useMemo, useCallback } from 'react';
import { Howl } from 'howler';

type SoundName = 'wake' | 'unwake' | 'mute' | 'click' | 'countdown' | 'bgMusic';

export function useSound() {
  // Pre-load audio files using Howler.js for better performance
  const audioCache = useMemo(() => {
    if (typeof window === 'undefined') return {};
    
    const cache: Record<string, Howl> = {};
    const soundFiles: Record<string, { src: string; volume: number; loop?: boolean }> = {
      'wake': { src: '/sounds/Wake_Mobile.mp3', volume: 0.7 },
      'unwake': { src: '/sounds/Inactive_Mobile.mp3', volume: 0.7 },
      'mute': { src: '/sounds/Mute.mp3', volume: 0.7 },
      'click': { src: '/sounds/Click-Warm.mp3', volume: 0.7 },
      'countdown': { src: '/sounds/SecondCounter.mp3', volume: 0.7 },
      'bgMusic': { src: '/sounds/gameshow-background.m4a', volume: 0.21, loop: true }
    };

    Object.entries(soundFiles).forEach(([key, config]) => {
      cache[key] = new Howl({
        src: [config.src],
        volume: config.volume,
        loop: config.loop || false,
        preload: true,
        html5: key === 'bgMusic', // Use HTML5 for background music to save memory
        onloaderror: (id, error) => {
          console.debug(`🔊 Failed to load ${key}:`, error);
        },
        onplayerror: (id, error) => {
          console.debug(`🔊 Failed to play ${key}:`, error);
        }
      });
    });

    return cache;
  }, []);

  const playSound = useCallback((soundName: SoundName, options?: { fadeIn?: boolean }) => {
    try {
      const howl = audioCache[soundName];
      if (!howl) {
        console.warn(`🔊 Sound ${soundName} not found in cache`);
        return;
      }

      // For background music, just play if not already playing
      if (soundName === 'bgMusic' && howl.playing()) {
        return;
      }

      // Stop any currently playing instance
      howl.stop();
      
      // Fade in background music over 3 seconds
      if (soundName === 'bgMusic' && options?.fadeIn) {
        howl.volume(0); // Start at 0
        howl.play();
        howl.fade(0, 0.21, 3000); // Fade from 0 to 0.21 over 3 seconds
      } else {
        howl.play();
      }
    } catch (error) {
      console.debug(`🔊 Sound error for ${soundName}:`, error);
    }
  }, [audioCache]);

  const stopSound = useCallback((soundName: SoundName) => {
    try {
      const howl = audioCache[soundName];
      if (!howl) {
        console.warn(`🔊 Sound ${soundName} not found in cache`);
        return;
      }
      howl.stop();
    } catch (error) {
      console.debug(`🔊 Sound stop error for ${soundName}:`, error);
    }
  }, [audioCache]);

  return { playSound, stopSound };
}

