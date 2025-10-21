'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import VideoPlayer from '@/components/VideoPlayer';

const CloserVideo: React.FC = () => {
  const { restartGame, currentQuiz } = useGame();

  const handleVideoEnd = () => {
    console.log('Closer video ended, showing winner screen');
    // Show winner screen after closer
    setTimeout(() => {
      restartGame(); // Could also transition to a winner screen
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-black">
      <VideoPlayer 
        src={currentQuiz.videos.closer}
        onEnded={handleVideoEnd}
      />
    </div>
  );
};

export default CloserVideo;

