'use client';

import React from 'react';
import Image from 'next/image';
import { useGame } from '@/contexts/GameContext';

const Header: React.FC = () => {
  const { restartGame } = useGame();

  const handleLogoClick = () => {
    restartGame();
  };

  return (
    <div className="header">
      <div className="title-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <Image 
          src="/Meta-Symbol-mono-white.svg" 
          alt="Meta" 
          width={24}
          height={24}
          className="logo"
        />
        <h1 className="title">Gameshows</h1>
      </div>
    </div>
  );
};

export default Header;

