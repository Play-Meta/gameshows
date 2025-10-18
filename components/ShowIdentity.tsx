'use client';

import React from 'react';
import Image from 'next/image';
import { useGame } from '@/contexts/GameContext';

const ShowIdentity: React.FC = () => {
  const { playerCount } = useGame();

  // Format number with K abbreviation
  const formatViewerCount = (count: number): string => {
    if (count >= 1000) {
      const thousands = count / 1000;
      return `${thousands.toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="absolute top-16 left-0 right-0 z-50 px-4">
      <div className="flex items-center gap-2">
        {/* CNN Avatar */}
        <Image 
          src="/icon-avatar-cnn.png" 
          alt="CNN" 
          width={32} 
          height={32}
          className="rounded-full flex-shrink-0 ring-1 ring-white/20"
        />

        {/* Show/Host Info */}
        <div className="flex items-center gap-1 text-white min-w-0 flex-1">
          <Image 
            src="/icon-microphone.png" 
            alt="Host" 
            width={12} 
            height={12}
            className="opacity-80 flex-shrink-0"
          />
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium flex-shrink-0">Host</span>
            <span className="text-xs opacity-60 flex-shrink-0">·</span>
            <span className="text-xs font-medium truncate">Anthony Bourdain</span>
          </div>
          <Image 
            src="/icon-chevron-right.png" 
            alt="" 
            width={12} 
            height={12}
            className="opacity-60 flex-shrink-0"
          />
        </div>

        {/* Live Indicator */}
        <div className="bg-red-600 px-2 pb-0.5 rounded-full line-height-0">
          <span className="text-white text-xs line-height-0 font-bold tracking-wide">Live</span>
        </div>

        {/* Viewer Count */}
        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
          <Image 
            src="/icon-eye.png" 
            alt="Viewers" 
            width={16} 
            height={16}
            className="opacity-80"
          />
          <span className="text-white text-xs font-semibold">
            {formatViewerCount(playerCount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShowIdentity;

