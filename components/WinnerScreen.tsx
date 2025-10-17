'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';

const WinnerScreen: React.FC = () => {
  const { restartGame } = useGame();
  const { playSound } = useSound();

  const handlePlayAgain = () => {
    playSound('click');
    restartGame();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-yellow-600 via-yellow-500 to-orange-600 p-8 relative overflow-hidden">
      {/* Confetti/Celebration Effect (can be enhanced with animation library) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="text-[20rem] animate-pulse">🎉</div>
      </div>

      {/* Winner Message */}
      <div className="text-center mb-12 relative z-10">
        <div className="text-8xl mb-6 animate-bounce">🏆</div>
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
          YOU WON!
        </h1>
        <p className="text-2xl text-white/90 font-semibold mb-6">
          Perfect Score!
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border-2 border-white/40 max-w-sm w-full relative z-10">
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-3">
            5 / 5
          </div>
          <div className="text-lg text-white uppercase tracking-wider font-semibold">
            All Questions Correct!
          </div>
        </div>
      </div>

      {/* Play Again Button */}
      <button
        onClick={handlePlayAgain}
        className="button button-primary text-xl px-12 py-4 rounded-full shadow-2xl relative z-10"
        style={{ width: 'auto' }}
      >
        PLAY AGAIN
      </button>

      <div className="mt-8 text-white text-lg font-semibold relative z-10">
        Congratulations! 🎊
      </div>
    </div>
  );
};

export default WinnerScreen;

