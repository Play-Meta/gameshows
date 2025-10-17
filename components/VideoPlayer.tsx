'use client';

import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  onEnded: () => void;
  className?: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onEnded, className = '', poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <video
      ref={videoRef}
      src={src}
      onEnded={onEnded}
      className={`video-fullscreen ${className}`}
      playsInline
      muted={false}
      autoPlay
      poster={poster}
    />
  );
};

export default VideoPlayer;

