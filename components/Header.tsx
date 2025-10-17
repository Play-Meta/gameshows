'use client';

import React from 'react';
import Image from 'next/image';
import { useGame } from '@/contexts/GameContext';

const Header: React.FC = () => {
  const { skipToFirstQuestion } = useGame();

  return (
    <div className="header">
      <div className="title-container">
        <Image 
          src="/Meta-Symbol-mono-white.svg" 
          alt="Meta" 
          width={24}
          height={24}
          className="logo"
        />
        <h1 className="title">Gameshows</h1>
      </div>
      
      {/* Dev Skip Button */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={skipToFirstQuestion}
          className="ml-auto px-3 py-1 text-xs bg-yellow-500/80 hover:bg-yellow-500 text-black rounded-md font-semibold transition-colors"
          title="Skip to first question (dev only)"
        >
          Skip to Q1
        </button>
      )}
    </div>
  );
};

export default Header;

