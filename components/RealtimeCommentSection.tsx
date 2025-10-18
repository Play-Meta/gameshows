'use client';

import React, { useState, useEffect, useRef } from 'react';
import CommentComposer from './CommentComposer';

interface Comment {
  id: string;
  username: string;
  message: string;
  key: string;
}

const SAMPLE_COMMENTS = [
  { id: '1', username: 'FoodieFan123', message: "Let's gooo! Bourdain for the win! 🔥" },
  { id: '2', username: 'TravelBug_Tia', message: 'Just got back from Vietnam. The food was incredible! 🍜' },
  { id: '3', username: 'ChefWannabe_Chad', message: "I'm definitely trying this at home." },
  { id: '4', username: 'GlobalTrekker', message: 'I hope they travel somewhere amazing in this episode!' },
  { id: '5', username: 'NoodleNinja', message: 'I could go for a giant bowl of ramen.' },
  { id: '6', username: 'Anthro_Andy', message: "Bourdain's commentary is always so sharp. A true legend." },
  { id: '7', username: 'StreetFoodSue', message: 'Anyone else getting hungry already? 🤤' },
  { id: '8', username: 'SpicySi', message: 'That first contestant looks nervous lol' },
  { id: '9', username: 'WorldMusicWalter', message: "What's the background music? It's a banger." },
  { id: '10', username: 'DaringDiner', message: "I'd eat anything Bourdain put in front of me. No questions asked." },
  { id: '11', username: 'GrillMaster_Gary', message: 'I bet I could win this show.' },
  { id: '12', username: 'Hungry_Hank', message: 'I need a snack.' },
  { id: '13', username: 'CynicalCynthia', message: "Let's see if these contestants actually know how to cook." },
  { id: '14', username: 'Enthusiastic_Eva', message: "This is the best thing I've seen all week! 😍" },
  { id: '15', username: 'PartsUnknownPro', message: "This show has big 'Parts Unknown' energy." },
];

// Apple rainbow colors with Gen Z saturation boost
const USERNAME_COLORS = [
  '#FF375F', // Hot Pink/Red
  '#FF9500', // Vivid Orange
  '#FFD60A', // Electric Yellow
  '#30D158', // Neon Green
  '#64D2FF', // Bright Blue
  '#BF5AF2', // Vibrant Purple
];

const getUsernameColor = (username: string): string => {
  // Use simple hash of username to get consistent color per user
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return USERNAME_COLORS[hash % USERNAME_COLORS.length];
};

const RealtimeCommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const commentIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial comment immediately
    const firstComment = SAMPLE_COMMENTS[0];
    setComments([{ ...firstComment, key: `${firstComment.id}-${Date.now()}` }]);
    commentIndexRef.current = 1;

    // Add comments with extreme variable timing for realistic feel
    const scheduleNextComment = () => {
      let randomDelay;
      
      // 25% chance of burst mode (rapid comments)
      if (Math.random() < 0.25) {
        // Burst: very quick succession (200-600ms)
        randomDelay = 200 + Math.random() * 400;
      }
      // 50% chance of normal activity (800-1800ms)
      else if (Math.random() < 0.75) {
        randomDelay = 800 + Math.random() * 1000;
      }
      // 25% chance of slow moment (2000-4000ms)
      else {
        randomDelay = 2000 + Math.random() * 2000;
      }
      
      setTimeout(() => {
        const comment = SAMPLE_COMMENTS[commentIndexRef.current % SAMPLE_COMMENTS.length];
        const uniqueKey = `${comment.id}-${Date.now()}-${Math.random()}`;
        
        setComments(prev => {
          // Keep all comments for full chronological history
          const newComments = [...prev, { ...comment, key: uniqueKey }];
          return newComments;
        });
        
        commentIndexRef.current++;

        // Smoothly scroll to bottom when new comment arrives
        if (containerRef.current) {
          requestAnimationFrame(() => {
            if (containerRef.current) {
              containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
              });
            }
          });
        }

        // Schedule the next comment
        scheduleNextComment();
      }, randomDelay);
    };

    // Start the comment cycle
    scheduleNextComment();

    return () => {
      // Cleanup handled by component unmount
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-end">
      {/* Comments feed - scrollable section */}
      <div 
        ref={containerRef}
        className="comments-scrollbar relative w-full max-h-[33%] overflow-y-auto pointer-events-auto pb-16"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
        }}
      >
        {/* Comment list - padded inside */}
        <div className="px-4 py-4" style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {comments.map((comment) => (
            <div
              key={comment.key}
              className="opacity-0"
              style={{
                animation: 'commentFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              }}
            >
              <div className="text-white px-0 py-0 text-xs break-words inline-block">
                <span 
                  className="font-bold drop-shadow-lg"
                  style={{ color: getUsernameColor(comment.username) }}
                >
                  {comment.username}
                </span>
                <span className="mx-1.5 text-white/60">·</span>
                <span className="text-white drop-shadow-lg">{comment.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment composer at bottom */}
      <CommentComposer />
    </div>
  );
};

export default RealtimeCommentSection;

