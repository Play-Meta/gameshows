'use client';

import React from 'react';
import Image from 'next/image';

interface PillProps {
  children: React.ReactNode;
  size?: 'sm' | 'lg';
  type?: 'default' | 'alert';
  icon?: string;
  iconAlt?: string;
}

const Pill: React.FC<PillProps> = ({ 
  children, 
  size = 'sm', 
  type = 'default',
  icon,
  iconAlt = ''
}) => {
  // Size variants
  const sizeClasses = {
    sm: 'px-2 pt-0.5 pb-1',
    lg: 'px-3 py-1.5'
  };

  // Type variants
  const typeClasses = {
    default: 'bg-black/60 backdrop-blur-sm',
    alert: 'bg-red-600'
  };

  // Icon size based on pill size
  const iconSize = size === 'sm' ? 16 : 20;

  return (
    <div className={`flex items-center gap-1 rounded-full ${sizeClasses[size]} ${typeClasses[type]}`}>
      {icon && (
        <Image 
          src={icon}
          alt={iconAlt}
          width={iconSize}
          height={iconSize}
          className="opacity-80"
        />
      )}
      <span className="text-white text-xs font-semibold leading-none">
        {children}
      </span>
    </div>
  );
};

export default Pill;

