'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import SlotCounter from 'react-slot-counter';
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
        <div className="text-center flex flex-col items-center gap-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif' }}>
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
          <div className="text-xs text-white tracking-wider">
            Players Waiting
          </div>
          
          {/* Start Button */}
          <button
            onClick={handleStart}
            className="px-6 py-2 bg-white text-black text-sm font-semibold rounded-full transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;

