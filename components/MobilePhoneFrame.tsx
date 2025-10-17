'use client';

import React, { ReactNode } from 'react';

interface MobilePhoneFrameProps {
  children: ReactNode;
}

const MobilePhoneFrame: React.FC<MobilePhoneFrameProps> = ({ children }) => {
  return (
    <div className="phone-frame-container">
      <div className="phone-frame">
        {/* Phone screen canvas - 100px gap from SVG frame edges */}
        <div className="phone-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobilePhoneFrame;

