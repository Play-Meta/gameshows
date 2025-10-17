'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { GAME_CONFIG } from '@/config/questions';
import VideoPlayer from '@/components/VideoPlayer';

const IntroVideo: React.FC = () => {
  const { playQuestionVideo } = useGame();

  const handleVideoEnd = () => {
    console.log('Intro video ended, moving to first question video');
    playQuestionVideo();
  };

  return (
    <div className="w-full h-full bg-black">
      <VideoPlayer 
        src={GAME_CONFIG.introVideoUrl}
        onEnded={handleVideoEnd}
      />
    </div>
  );
};

export default IntroVideo;

