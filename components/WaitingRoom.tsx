'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SlotCounter from 'react-slot-counter';
import { GrainGradient } from '@paper-design/shaders-react';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';

const WaitingRoom: React.FC = () => {
  const { startGame } = useGame();
  const { playSound, stopSound } = useSound();
  const [animatedCount, setAnimatedCount] = useState(500); // Start at 500

  // Play background music on mount (with user interaction fallback)
  useEffect(() => {
    // Try to autoplay, but browsers may block this
    const tryPlayMusic = () => {
      console.log('🎵 Attempting to play background music with fade-in...');
      playSound('bgMusic', { fadeIn: true });
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

  // Simulate players joining with phased growth
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateCount = () => {
      setAnimatedCount(prev => {
        // Phase 1: Rapid growth to 10K
        if (prev < 10000) {
          return prev + Math.floor(Math.random() * 200) + 100; // +100-300 per tick
        }
        // Phase 2: Slow growth around 10K
        else if (prev < 12000) {
          return prev + Math.floor(Math.random() * 20) + 5; // +5-25 per tick
        }
        // Phase 3: Jump to 25K
        else if (prev < 25000) {
          return 25000 + Math.floor(Math.random() * 100);
        }
        // Phase 4: Jump to 40K
        else if (prev < 40000) {
          return 40000 + Math.floor(Math.random() * 100);
        }
        // Phase 5: Settle around 40K
        else {
          return prev + Math.floor(Math.random() * 10) - 5; // Fluctuate ±5
        }
      });
    };

    // Start with faster updates, then slow down
    intervalId = setInterval(updateCount, 800); // Update every 800ms

    return () => clearInterval(intervalId);
  }, []);

  const handleStart = () => {
    // Ensure music is playing when user clicks Start
    playSound('bgMusic', { fadeIn: true });
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
        <div className="text-center flex flex-col items-center gap-1">
          <div className="text-xs tracking-wider">
            <SlotCounter 
              value={animatedCount.toLocaleString()}
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

