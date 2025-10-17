'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { GAME_CONFIG } from '@/config/questions';
import VideoPlayer from '@/components/VideoPlayer';

const WrapUpVideo: React.FC = () => {
  const { playCloser } = useGame();

  const handleVideoEnd = () => {
    console.log('Wrap-up video ended, moving to closer');
    playCloser();
  };

  return (
    <div className="w-full h-full bg-black">
      <VideoPlayer 
        src={GAME_CONFIG.wrapUpVideoUrl}
        onEnded={handleVideoEnd}
      />
    </div>
  );
};

export default WrapUpVideo;

