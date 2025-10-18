'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import SlotCounter from 'react-slot-counter';
import { GrainGradient } from '@paper-design/shaders-react';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';

const WaitingRoom: React.FC = () => {
  const { startGame, playerCount } = useGame();
  const { playSound, stopSound } = useSound();

  // Play background music on mount (with user interaction fallback)
  useEffect(() => {
    // Try to autoplay, but browsers may block this
    const tryPlayMusic = () => {
      console.log('🎵 Attempting to play background music...');
      playSound('bgMusic');
    };

    // Try immediately
    tryPlayMusic();

    // Also try on any user interaction
    const handleInteraction = () => {
      tryPlayMusic();
      // Remove listener after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    return () => {
      stopSound('bgMusic');
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [playSound, stopSound]);

  const handleStart = () => {
    // Ensure music is playing when user clicks Start
    playSound('bgMusic');
    playSound('click');
    startGame();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full p-8 gap-8 overflow-hidden">
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
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Game Logo - Clickable to start game */}
        <Image 
          src="/GameShowsLogo.svg" 
          alt="Gameshows" 
          width={120}
          height={48}
          className="object-contain cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{ width: '120px', height: 'auto' }}
          onClick={handleStart}
        />

        {/* Player Count */}
        <div className="text-center flex flex-col items-center gap-1">
          <div className="text-xs tracking-wider">
            <SlotCounter 
              value={playerCount.toLocaleString()}
              duration={0.5}
              speed={1.2}
              animateUnchanged={false}
              useMonospaceWidth={true}
              charClassName="text-white font-bold"
              separatorClassName="text-white"
            />
          </div>
          <div className="text-xs text-white/70 tracking-wider">
            Players Waiting
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;

