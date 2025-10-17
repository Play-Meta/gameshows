'use client';

import React, { useState } from 'react';
import { Howler } from 'howler';
import { useGame } from '@/contexts/GameContext';
import DevButton from '@/components/DevButton';

const DevToolbar: React.FC = () => {
  const { skipToQuestion, skipToQuestionAnswer, restartGame } = useGame();
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Mute/unmute all Howler sounds (including background music)
    Howler.mute(newMutedState);
    
    // Also get all video and audio elements and mute/unmute them
    const mediaElements = document.querySelectorAll('video, audio');
    mediaElements.forEach((element) => {
      (element as HTMLVideoElement | HTMLAudioElement).muted = newMutedState;
    });
  };

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[10001] flex flex-col gap-2 bg-black/30 backdrop-blur-md p-2 rounded-2xl border border-white/10">
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

      {/* Skip to Answer buttons */}
      <DevButton 
        onClick={() => skipToQuestionAnswer(0)} 
        title="Skip to Answer 1"
        variant="default"
      >
        A1
      </DevButton>
      
      <DevButton 
        onClick={() => skipToQuestionAnswer(1)} 
        title="Skip to Answer 2"
      >
        A2
      </DevButton>
      
      <DevButton 
        onClick={() => skipToQuestionAnswer(2)} 
        title="Skip to Answer 3"
      >
        A3
      </DevButton>
      
      <DevButton 
        onClick={() => skipToQuestionAnswer(3)} 
        title="Skip to Answer 4"
      >
        A4
      </DevButton>
      
      <DevButton 
        onClick={() => skipToQuestionAnswer(4)} 
        title="Skip to Answer 5"
      >
        A5
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

