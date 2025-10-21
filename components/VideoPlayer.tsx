'use client';

import React, { useRef, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';

interface VideoPlayerProps {
  src: string;
  onEnded: () => void;
  className?: string;
  poster?: string;
  preloadNext?: string; // URL of the next video to preload
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onEnded, className = '', poster, preloadNext }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloadVideoRef = useRef<HTMLVideoElement>(null);
  const { isMuted } = useGame();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to play video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Video autoplay prevented:', error);
        // Could show a play button here if needed
      });
    }
  }, [src]);

  // Preload next video in the background
  useEffect(() => {
    if (!preloadNext || !preloadVideoRef.current) return;
    
    const preloadVideo = preloadVideoRef.current;
    preloadVideo.load(); // Start loading the next video
    
    console.log(`🎬 Preloading next video: ${preloadNext}`);
  }, [preloadNext]);

  // Update video muted state when global mute changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <>
      {/* Current video */}
      <video
        ref={videoRef}
        src={src}
        onEnded={onEnded}
        className={`video-fullscreen ${className}`}
        playsInline
        muted={isMuted}
        autoPlay
        preload="auto"
        poster={poster}
      />
      
      {/* Hidden preload video for next video */}
      {preloadNext && (
        <video
          ref={preloadVideoRef}
          src={preloadNext}
          className="hidden"
          playsInline
          muted
          preload="auto"
        />
      )}
    </>
  );
};

export default VideoPlayer;

