'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import VideoPlayer from '@/components/VideoPlayer';

const AnswerVideo: React.FC = () => {
  const { currentQuestion, nextQuestion, currentQuestionIndex, currentQuiz } = useGame();

  const handleVideoEnd = () => {
    console.log('Answer video ended, showing result screen');
    // After answer video, show result screen briefly
    nextQuestion();
  };

  if (!currentQuestion) return null;

  // Determine what to preload next
  const nextIndex = currentQuestionIndex + 1;
  const nextVideoUrl = nextIndex < currentQuiz.questions.length
    ? currentQuiz.questions[nextIndex].videoUrl // Next question video
    : currentQuiz.videos.closer; // Closer video if this was the last question

  return (
    <div className="w-full h-full bg-black">
      <VideoPlayer 
        src={currentQuestion.answerVideoUrl}
        onEnded={handleVideoEnd}
        preloadNext={nextVideoUrl}
      />
    </div>
  );
};

export default AnswerVideo;

