'use client';

import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
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
    </div>
  );
};

export default Header;

