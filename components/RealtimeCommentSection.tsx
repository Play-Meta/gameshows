'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import CommentComposer from './CommentComposer';

interface Comment {
  id: string;
  username: string;
  message: string;
  key: string;
}

interface RawComment {
  username: string;
  message: string;
}

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
  const { gameState, currentQuiz } = useGame();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadedComments, setLoadedComments] = useState<RawComment[]>([]);
  const commentIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load comments from quiz-specific file
  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetch(currentQuiz.commentsFile);
        const data: RawComment[] = await response.json();
        setLoadedComments(data);
      } catch (error) {
        console.error('Failed to load comments:', error);
        setLoadedComments([]);
      }
    };

    loadComments();
  }, [currentQuiz.commentsFile]);

  // Shrink comment section during question/answering states
  const isQuestionActive = gameState === 'question-video' || gameState === 'answering';
  const maxHeight = isQuestionActive ? 'max-h-[25%]' : 'max-h-[33%]';
  const zIndex = isQuestionActive ? 'z-40' : 'z-50';

  useEffect(() => {
    // Reset comments when quiz changes or when comments are loaded
    if (loadedComments.length === 0) return;

    // Clear existing comments and intervals
    setComments([]);
    commentIndexRef.current = 0;
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }

    // Add initial comment immediately
    const firstComment = loadedComments[0];
    setComments([{ 
      id: '0', 
      username: firstComment.username, 
      message: firstComment.message, 
      key: `0-${Date.now()}` 
    }]);
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
      
      const timeout = setTimeout(() => {
        const rawComment = loadedComments[commentIndexRef.current % loadedComments.length];
        const uniqueKey = `${commentIndexRef.current}-${Date.now()}-${Math.random()}`;
        
        setComments(prev => {
          // Keep all comments for full chronological history
          const newComments = [...prev, { 
            id: commentIndexRef.current.toString(),
            username: rawComment.username,
            message: rawComment.message,
            key: uniqueKey 
          }];
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
        intervalRef.current = scheduleNextComment();
      }, randomDelay);

      return timeout;
    };

    // Start the comment cycle
    intervalRef.current = scheduleNextComment();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [loadedComments]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${zIndex} flex flex-col justify-end`} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif' }}>
      {/* Comments feed - scrollable section */}
      <div 
        ref={containerRef}
        className={`comments-scrollbar relative w-full ${maxHeight} overflow-y-auto pointer-events-auto pb-[66px] transition-all duration-500 ease-out`}
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
        }}
      >
        {/* Comment list - padded inside */}
        <div className="px-3 py-4" style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
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

