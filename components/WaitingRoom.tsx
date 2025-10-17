'use client';

import React from 'react';
import Image from 'next/image';
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
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-purple-900 via-blue-900 to-black p-8 gap-4">
      {/* Game Logo */}
      <Image 
        src="/Shows.svg" 
        alt="Gameshows" 
        width={120}
        height={48}
        className="object-contain"
        style={{ height: '48px', width: 'auto' }}
      />

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="button button-primary text-xl px-12 py-4 rounded-full shadow-2xl"
        style={{ width: 'auto' }}
      >
        Start Game
      </button>

      {/* Player Count */}
      <div className="text-center">
        <span className="text-xs text-gray-400 tracking-wider">
          {playerCount.toLocaleString()}
        </span>
        <span className="text-xs text-gray-400 tracking-wider">
        {' '} Players Waiting
        </span>
      </div>
    </div>
  );
};

export default WaitingRoom;

