'use client';

import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import DevButton from '@/components/DevButton';

const DevToolbar: React.FC = () => {
  const { skipToQuestion, restartGame } = useGame();
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Get all video and audio elements and mute/unmute them
    const mediaElements = document.querySelectorAll('video, audio');
    mediaElements.forEach((element) => {
      (element as HTMLVideoElement | HTMLAudioElement).muted = !isMuted;
    });
  };

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[10001] flex flex-col gap-2 bg-black/30 backdrop-blur-md p-2 rounded-2xl border border-white/10">
      {/* Skip to Question buttons */}
      <DevButton 
        onClick={() => skipToQuestion(0)} 
        title="Skip to Question 1"
      >
        Q1
      </DevButton>
      
      <DevButton 
        onClick={() => skipToQuestion(1)} 
        title="Skip to Question 2"
      >
        Q2
      </DevButton>
      
      <DevButton 
        onClick={() => skipToQuestion(2)} 
        title="Skip to Question 3"
      >
        Q3
      </DevButton>
      
      <DevButton 
        onClick={() => skipToQuestion(3)} 
        title="Skip to Question 4"
      >
        Q4
      </DevButton>
      
      <DevButton 
        onClick={() => skipToQuestion(4)} 
        title="Skip to Question 5"
      >
        Q5
      </DevButton>

      {/* Divider */}
      <div className="h-px bg-white/20 my-1" />

      {/* Mute button */}
      <DevButton 
        onClick={handleMuteToggle}
        title={isMuted ? "Unmute" : "Mute"}
        variant={isMuted ? 'muted' : 'default'}
      >
        {isMuted ? '🔇' : '🔊'}
      </DevButton>

      {/* Restart button */}
      <DevButton 
        onClick={restartGame}
        title="Restart Game"
        variant="danger"
      >
        ↻
      </DevButton>
    </div>
  );
};

export default DevToolbar;

