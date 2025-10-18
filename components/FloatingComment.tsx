'use client';

import React, { useEffect, useState } from 'react';
import { ProcessedComment } from '@/types/comment';

interface FloatingCommentProps {
  comment: ProcessedComment;
  onComplete: () => void;
}

const FloatingComment: React.FC<FloatingCommentProps> = ({ comment, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);

    // Remove comment after animation completes
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, comment.duration * 1000);

    return () => clearTimeout(timeout);
  }, [comment.duration, onComplete]);

  const animationStyle = {
    animation: `floatUp ${comment.duration}s ease-out forwards`,
    left: comment.position.x !== undefined ? `${comment.position.x}%` : '50%',
    transform: 'translateX(-50%)', // Center the comment horizontally
  };

  return (
    <div
      className="absolute bottom-0 pointer-events-none transition-opacity duration-300"
      style={{
        ...animationStyle,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs shadow-lg backdrop-blur-md whitespace-nowrap max-w-[280px] truncate">
        <span className="font-semibold text-blue-300">{comment.username}</span>
        <span className="mx-1.5 text-white/50">·</span>
        <span>{comment.message}</span>
      </div>
    </div>
  );
};

export default FloatingComment;

