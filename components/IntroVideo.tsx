'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import VideoPlayer from '@/components/VideoPlayer';

const IntroVideo: React.FC = () => {
  const { playQuestionVideo, currentQuiz, currentQuestion } = useGame();

  const handleVideoEnd = () => {
    console.log('Intro video ended, moving to first question video');
    playQuestionVideo();
  };

  // Get the first question video to preload
  const nextVideoUrl = currentQuestion?.videoUrl;

  return (
    <div className="w-full h-full bg-black">
      <VideoPlayer 
        src={currentQuiz.videos.intro}
        onEnded={handleVideoEnd}
        preloadNext={nextVideoUrl}
      />
    </div>
  );
};

export default IntroVideo;

