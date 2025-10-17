'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { GAME_CONFIG } from '@/config/questions';
import VideoPlayer from '@/components/VideoPlayer';

const OpenerVideo: React.FC = () => {
  const { playIntro } = useGame();

  const handleVideoEnd = () => {
    console.log('Opener video ended, moving to intro');
    playIntro();
  };

  return (
    <div className="w-full h-full bg-black">
      <VideoPlayer 
        src={GAME_CONFIG.openerVideoUrl}
        onEnded={handleVideoEnd}
      />
    </div>
  );
};

export default OpenerVideo;

