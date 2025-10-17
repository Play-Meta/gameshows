'use client';

import React, { ReactNode } from 'react';

interface MobilePhoneFrameProps {
  children: ReactNode;
}

const MobilePhoneFrame: React.FC<MobilePhoneFrameProps> = ({ children }) => {
  return (
    <div className="phone-frame-container">
      <div className="phone-frame">
        {/* Dynamic Island (iPhone 14 Pro+) */}
        <div className="dynamic-island">
          <div className="island-camera"></div>
        </div>
        
        {/* Phone screen content */}
        <div className="phone-screen">
          {children}
        </div>
        
        {/* Home indicator (like iPhone bottom bar) */}
        <div className="phone-home-indicator">
          <div className="home-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default MobilePhoneFrame;

