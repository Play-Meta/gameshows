'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';
import { GAME_CONFIG } from '@/config/questions';

const Countdown: React.FC = () => {
  const { playOpener } = useGame();
  const { playSound } = useSound();
  const [count, setCount] = useState<number | null>(null); // Start with null
  const [isExiting, setIsExiting] = useState(false);
  const lastPlayedCountRef = useRef<number | null>(null);

  // Initial effect to show first number after 100ms
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setCount(GAME_CONFIG.countdownDuration);
    }, 100);
    
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (count === null) return; // Don't do anything until we have a count
    
    // Reset exit animation
    setIsExiting(false);
    
    // Only play sound if we haven't played it for this count value yet
    if (lastPlayedCountRef.current !== count) {
      console.log(`Playing sound for count: ${count} at ${Date.now()}`);
      playSound('countdown');
      lastPlayedCountRef.current = count;
    }

    if (count > 0) {
      // Start exit animation after 800ms (leaving 200ms for animation)
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 800);
      
      // Wait full 1 second, then move to next number
      const nextTimer = setTimeout(() => {
        console.log(`Moving from ${count} to ${count - 1} at ${Date.now()}`);
        setCount(count - 1);
      }, 1000);
      
      return () => {
        clearTimeout(exitTimer);
        clearTimeout(nextTimer);
      };
    } else {
      // Count is 0, start exit animation, wait full second then start opener video
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 800);
      
      const gameTimer = setTimeout(() => {
        playSound('wake');
        setTimeout(() => {
          playOpener();
        }, 300);
      }, 1000);
      
      return () => {
        clearTimeout(exitTimer);
        clearTimeout(gameTimer);
      };
    }
  }, [count, playOpener, playSound]);

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="text-center">
        {/* Number Image - Half size (160px) */}
        <div className="relative w-40 h-40 mb-8 mx-auto">
          {count !== null && (
            <img
              key={count}
              src={`/Numbers-${count}.png`}
              alt={`${count}`}
              className={`w-full h-full object-contain ${
                isExiting ? 'animate-countdown-out' : 'animate-countdown-in'
              }`}
            />
          )}
        </div>
        
        <div className="text-xl text-purple-300 uppercase tracking-widest">
          Get Ready
        </div>
      </div>
    </div>
  );
};

export default Countdown;
