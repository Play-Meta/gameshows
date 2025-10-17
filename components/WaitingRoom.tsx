'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';

const WaitingRoom: React.FC = () => {
  const { startGame, playerCount } = useGame();
  const { playSound } = useSound();

  const handleStart = () => {
    playSound('click');
    startGame();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-purple-900 via-blue-900 to-black p-8">
      {/* Game Logo/Title */}
      <div className="text-center mb-12 animate-pulse-glow">
        <h1 className="text-6xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
          TRIVIA
        </h1>
        <p className="text-xl text-purple-300 font-semibold">LIVE GAME SHOW</p>
      </div>

      {/* Player Count */}
      <div className="mb-8 text-center">
        <div className="text-5xl font-bold text-white mb-2">
          {playerCount.toLocaleString()}
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-wider">
          Players Online
        </div>
      </div>

      {/* Host Message */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 max-w-sm">
        <p className="text-white text-center text-lg leading-relaxed">
          Welcome! Get ready to test your knowledge across <span className="font-bold">5 questions</span>.
          Answer all correctly to win!
        </p>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="button button-primary text-xl px-12 py-4 rounded-full shadow-2xl"
        style={{ width: 'auto' }}
      >
        START GAME
      </button>

      {/* Game Rules */}
      <div className="mt-8 text-center text-sm text-gray-400 max-w-xs">
        <p>• 5 questions total</p>
        <p>• 10 seconds per question</p>
        <p>• One wrong answer eliminates you</p>
      </div>
    </div>
  );
};

export default WaitingRoom;

