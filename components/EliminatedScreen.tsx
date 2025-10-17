'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';

const EliminatedScreen: React.FC = () => {
  const { restartGame, currentQuestionIndex } = useGame();
  const { playSound } = useSound();

  const handlePlayAgain = () => {
    playSound('click');
    restartGame();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-red-950 via-gray-900 to-black p-8">
      {/* Elimination Message */}
      <div className="text-center mb-12">
        <div className="text-8xl mb-6">😢</div>
        <h1 className="text-5xl font-bold text-white mb-4">
          ELIMINATED
        </h1>
        <p className="text-xl text-gray-400 mb-6">
          You made it through {currentQuestionIndex + 1} question{currentQuestionIndex !== 0 ? 's' : ''}
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 max-w-sm w-full">
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2">
            {currentQuestionIndex + 1} / 5
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">
            Questions Answered
          </div>
        </div>
      </div>

      {/* Play Again Button */}
      <button
        onClick={handlePlayAgain}
        className="button button-primary text-xl px-12 py-4 rounded-full shadow-2xl"
        style={{ width: 'auto' }}
      >
        PLAY AGAIN
      </button>

      <div className="mt-8 text-gray-500 text-sm">
        Better luck next time!
      </div>
    </div>
  );
};

export default EliminatedScreen;

