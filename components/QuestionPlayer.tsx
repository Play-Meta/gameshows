'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import VideoPlayer from '@/components/VideoPlayer';

const QuestionPlayer: React.FC = () => {
  const { currentQuestion, showAnswers, currentQuestionIndex, currentQuiz } = useGame();

  const handleVideoEnd = () => {
    console.log('Question video ended, showing answers');
    showAnswers();
  };

  if (!currentQuestion) return null;

  return (
    <div className="relative w-full h-full bg-black">
      {/* Question Number Badge */}
      <div className="absolute top-36 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30">
          <span className="text-white font-semibold text-sm">
            Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
          </span>
        </div>
      </div>

      {/* Video Player */}
      <VideoPlayer 
        src={currentQuestion.videoUrl}
        onEnded={handleVideoEnd}
      />
    </div>
  );
};

export default QuestionPlayer;
