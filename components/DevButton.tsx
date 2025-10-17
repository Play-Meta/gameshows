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
  const variantClasses = {
    default: 'bg-blue-500/90 hover:bg-blue-500',
    danger: 'bg-red-500/90 hover:bg-red-500',
    muted: 'bg-gray-600/90 hover:bg-gray-600'
  };

  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        ${variantClasses[variant]}
        text-white text-xs font-semibold
        w-10 h-10 rounded-full
        flex items-center justify-center
        transition-all duration-200
        hover:scale-110
        shadow-lg
      `}
    >
      {children}
    </button>
  );
};

export default DevButton;

