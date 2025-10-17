'use client';

import React, { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';
import { GAME_CONFIG } from '@/config/questions';

const ResultScreen: React.FC = () => {
  const { isCorrect, nextQuestion, currentQuestionIndex } = useGame();
  const { playSound } = useSound();

  useEffect(() => {
    if (isCorrect) {
      playSound('wake');
      // Show result for configured duration, then move to next question
      const timer = setTimeout(() => {
        nextQuestion();
      }, GAME_CONFIG.resultDisplayDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isCorrect, nextQuestion, playSound]);

  if (isCorrect === null) return null;

  return (
    <div className={`flex flex-col items-center justify-center h-full p-8 ${
      isCorrect 
        ? 'bg-gradient-to-b from-green-900 via-green-700 to-black' 
        : 'bg-gradient-to-b from-red-900 via-red-700 to-black'
    }`}>
      {/* Result Icon */}
      <div className={`text-9xl mb-8 animate-bounce`}>
        {isCorrect ? '✓' : '✗'}
      </div>

      {/* Result Message */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-4">
          {isCorrect ? 'CORRECT!' : 'WRONG!'}
        </h1>
        <p className="text-xl text-white/80">
          {isCorrect 
            ? 'Moving on to the next question...' 
            : 'You have been eliminated'}
        </p>
      </div>

      {/* Progress Indicator for correct answers */}
      {isCorrect && (
        <div className="mt-4 text-white/60 text-lg">
          Question {currentQuestionIndex + 1} of 5 complete
        </div>
      )}
    </div>
  );
};

export default ResultScreen;

