'use client';

import { useMemo, useCallback, useRef } from 'react';
import { Howl } from 'howler';

type SoundName = 'wake' | 'unwake' | 'mute' | 'click' | 'countdown' | 'bgMusic';

export function useSound() {
  // Use ref to store audio cache to avoid recreating on every render
  const audioCacheRef = useRef<Record<string, Howl>>({});
  const bgMusicLoadedRef = useRef(false);

  // Pre-load only small, frequently used audio files
  // Large files like background music are loaded on-demand
  const audioCache = useMemo(() => {
    if (typeof window === 'undefined') return {};
    
    const cache: Record<string, Howl> = {};
    
    // Only preload small sound effects (< 50KB total)
    const soundFiles: Record<string, { src: string; volume: number; preload: boolean }> = {
      'wake': { src: '/sounds/Wake_Mobile.mp3', volume: 0.7, preload: true },
      'unwake': { src: '/sounds/Inactive_Mobile.mp3', volume: 0.7, preload: true },
      'mute': { src: '/sounds/Mute.mp3', volume: 0.7, preload: true },
      'click': { src: '/sounds/Click-Warm.mp3', volume: 0.7, preload: true },
      'countdown': { src: '/sounds/SecondCounter.mp3', volume: 0.175, preload: true },
    };

    Object.entries(soundFiles).forEach(([key, config]) => {
      cache[key] = new Howl({
        src: [config.src],
        volume: config.volume,
        preload: config.preload,
        html5: false, // Use Web Audio API for small sound effects
        onloaderror: (id, error) => {
          console.debug(`🔊 Failed to load ${key}:`, error);
        },
        onplayerror: (id, error) => {
          console.debug(`🔊 Failed to play ${key}:`, error);
        }
      });
    });

    audioCacheRef.current = cache;
    return cache;
  }, []);

  // Lazy load background music on first play attempt
  const loadBackgroundMusic = useCallback(() => {
    if (bgMusicLoadedRef.current || audioCacheRef.current['bgMusic']) {
      return;
    }

    bgMusicLoadedRef.current = true;
    
    // Use the optimized MP3 file (3.2MB - half the size of original)
    // Enable HTML5 Audio for streaming (doesn't need to fully download first)
    audioCacheRef.current['bgMusic'] = new Howl({
      src: ['/sounds/Dance-Music-Thump-by-lalalai.mp3'],
      volume: 0.21,
      loop: true,
      preload: false, // Don't preload - load on demand
      html5: true, // Use HTML5 Audio for streaming large files
      onload: () => {
        console.log('🎵 Background music loaded');
      },
      onloaderror: (id, error) => {
        console.debug('🔊 Failed to load background music:', error);
      },
      onplayerror: (id, error) => {
        console.debug('🔊 Failed to play background music:', error);
      }
    });
  }, []);

  const playSound = useCallback((soundName: SoundName, options?: { fadeIn?: boolean }) => {
    try {
      // Lazy load background music on first play
      if (soundName === 'bgMusic') {
        loadBackgroundMusic();
      }

      const howl = audioCacheRef.current[soundName];
      if (!howl) {
        console.warn(`🔊 Sound ${soundName} not found in cache`);
        return;
      }

      // For background music, just play if not already playing
      if (soundName === 'bgMusic' && howl.playing()) {
        return;
      }

      // Stop any currently playing instance (except for background music)
      if (soundName !== 'bgMusic') {
        howl.stop();
      }
      
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
  }, [loadBackgroundMusic]);

  const stopSound = useCallback((soundName: SoundName) => {
    try {
      const howl = audioCacheRef.current[soundName];
      if (!howl) {
        console.warn(`🔊 Sound ${soundName} not found in cache`);
        return;
      }
      howl.stop();
    } catch (error) {
      console.debug(`🔊 Sound stop error for ${soundName}:`, error);
    }
  }, []);

  return { playSound, stopSound };
}

