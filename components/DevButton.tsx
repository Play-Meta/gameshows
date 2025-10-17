'use client';

import React, { ReactNode } from 'react';

interface DevButtonProps {
  onClick: () => void;
  children: ReactNode;
  title?: string;
  variant?: 'default' | 'danger' | 'muted';
}

const DevButton: React.FC<DevButtonProps> = ({ 
  onClick, 
  children, 
  title,
  variant = 'default' 
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className="
        bg-white hover:bg-gray-100
        text-black text-xs font-semibold
        w-10 h-10 rounded-full
        flex items-center justify-center
        transition-all duration-200
        hover:scale-110
        shadow-lg
      "
    >
      {children}
    </button>
  );
};

export default DevButton;

