'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '@/contexts/GameContext';
import Pill from './Pill';

const ShowIdentity: React.FC = () => {
  const { playerCount, gameState, currentQuiz } = useGame();

  // Format number with K abbreviation
  const formatViewerCount = (count: number): string => {
    if (count >= 1000) {
      const thousands = count / 1000;
      return `${thousands.toFixed(1)}K`;
    }
    return count.toString();
  };

  // Show viewer count after game starts (not on waiting screen)
  const showViewerCount = gameState !== 'waiting';

  return (
    <div className="absolute top-16 left-0 right-0 z-50 px-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif' }}>
      <div className="flex items-center gap-2">
        {/* Channel Avatar */}
        <Image 
          src={currentQuiz.show.channel.avatar} 
          alt={currentQuiz.show.channel.name} 
          width={32} 
          height={32}
          className="rounded-full flex-shrink-0 ring-1 ring-white/20"
        />

        {/* Show/Host Info */}
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          {/* Channel Name */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold truncate">{currentQuiz.show.channel.name}</span>
            {currentQuiz.show.channel.verified && (
              <Image 
                src="/icon-badge-verified.png" 
                alt="Verified" 
                width={12} 
                height={12}
                className="flex-shrink-0"
              />
            )}
          </div>
          
          {/* Host Info */}
          <div className="flex items-center gap-0.5 text-white">
            <Image 
              src="/icon-microphone.png" 
              alt="Host" 
              width={10} 
              height={10}
              className="opacity-80 flex-shrink-0"
            />
            <div className="flex items-center gap-0.5">
              <span className="text-xs font-medium flex-shrink-0">Host</span>
              <span className="text-xs opacity-60 flex-shrink-0">·</span>
              <span className="text-xs font-medium truncate">{currentQuiz.show.host.name}</span>
            </div>
            <Image 
              src="/icon-chevron-right.png" 
              alt="" 
              width={12} 
              height={12}
              className="opacity-60 flex-shrink-0"
            />
          </div>
        </div>

        {/* Live Indicator */}
        <Pill type="alert" size="sm">
          Live
        </Pill>

        {/* Viewer Count - Animated entrance */}
        <AnimatePresence>
          {showViewerCount && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -10 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.34, 1.56, 0.64, 1] // Nice bounce easing
              }}
            >
              <Pill 
                type="default" 
                size="sm" 
                icon="/icon-eye.png"
                iconAlt="Viewers"
              >
                {formatViewerCount(playerCount)}
              </Pill>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShowIdentity;

