'use client';

import React, { useState } from 'react';
import { Reaction } from './Reaction';

const CommentComposer: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Send message:', message);
      setMessage('');
    }
  };

  const handleHeart = () => {
    console.log('Send heart reaction');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-auto px-3 pb-6 pt-3">
      <div className="flex items-center gap-0">
        {/* Text Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Send message..."
          className="flex-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
        />

        <div className="flex items-center gap-0">
          {/* Heart Button with Reaction Animation */}
          <Reaction
            onClick={handleHeart}
            className="flex-shrink-0 w-10 h-12 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
            aria-label="Send heart"
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Reaction>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex-shrink-0 w-10 h-12 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
            aria-label="Send message"
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentComposer;

