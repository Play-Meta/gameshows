'use client';

import React from 'react';
import Image from 'next/image';
import { GrainGradient } from '@paper-design/shaders-react';
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
    <div className="relative flex flex-col items-center justify-center h-full p-8 gap-4 overflow-hidden">
      {/* Grain Gradient Background */}
      <div className="absolute inset-0 z-0">
        <GrainGradient
          width={390}
          height={844}
          colors={["#fe1b35", "#d100c3", "#7538fa"]}
          colorBack="#000a0f"
          softness={0.70}
          intensity={0.15}
          noise={0.07}
          shape="wave"
          speed={1.2}
          scale={0.65}
          rotation={0}
          offsetX={0.00}
          offsetY={0.15}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
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
          <span className="text-xs tracking-wider">
            {playerCount.toLocaleString()}
          </span>
          <span className="text-xs tracking-wider">
          {' '} Players Waiting
          </span>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;

