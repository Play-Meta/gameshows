'use client';

import React, { useEffect } from 'react';
import { Howler } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import DevButton from '@/components/DevButton';
import { bourdainQuiz, curryQuiz } from '@/config/quizzes';

const DevToolbar: React.FC = () => {
  const { skipToQuestion, skipToQuestionAnswer, restartGame, isMuted, toggleMute, setQuiz, currentQuiz } = useGame();

  // Sync Howler mute state with global mute state
  useEffect(() => {
    Howler.mute(isMuted);
  }, [isMuted]);

  const handleMuteToggle = () => {
    toggleMute();
  };

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {/* Left Toolbar */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[10001] flex flex-col gap-2 bg-black/30 backdrop-blur-md p-2 rounded-2xl border border-white/10">
        {/* Skip to Question buttons */}
        <DevButton 
          onClick={() => skipToQuestion(0)} 
          title="Skip to Question 1"
        >
          Q1
        </DevButton>
        
        <DevButton 
          onClick={() => skipToQuestion(1)} 
          title="Skip to Question 2"
        >
          Q2
        </DevButton>
        
        <DevButton 
          onClick={() => skipToQuestion(2)} 
          title="Skip to Question 3"
        >
          Q3
        </DevButton>
        
        <DevButton 
          onClick={() => skipToQuestion(3)} 
          title="Skip to Question 4"
        >
          Q4
        </DevButton>
        
        <DevButton 
          onClick={() => skipToQuestion(4)} 
          title="Skip to Question 5"
        >
          Q5
        </DevButton>

        {/* Divider */}
        <div className="h-px bg-white/20 my-1" />

        {/* Skip to Answer buttons */}
        <DevButton 
          onClick={() => skipToQuestionAnswer(0)} 
          title="Skip to Answer 1"
          variant="default"
        >
          A1
        </DevButton>
        
        <DevButton 
          onClick={() => skipToQuestionAnswer(1)} 
          title="Skip to Answer 2"
        >
          A2
        </DevButton>
        
        <DevButton 
          onClick={() => skipToQuestionAnswer(2)} 
          title="Skip to Answer 3"
        >
          A3
        </DevButton>
        
        <DevButton 
          onClick={() => skipToQuestionAnswer(3)} 
          title="Skip to Answer 4"
        >
          A4
        </DevButton>
        
        <DevButton 
          onClick={() => skipToQuestionAnswer(4)} 
          title="Skip to Answer 5"
        >
          A5
        </DevButton>

        {/* Divider */}
        <div className="h-px bg-white/20 my-1" />

        {/* Mute button */}
        <DevButton 
          onClick={handleMuteToggle}
          title={isMuted ? "Unmute" : "Mute"}
          variant={isMuted ? 'muted' : 'default'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </DevButton>

        {/* Restart button */}
        <DevButton 
          onClick={restartGame}
          title="Restart Game"
          variant="danger"
        >
          ↻
        </DevButton>
      </div>

      {/* Right Toolbar - Show Selection */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[10001] flex flex-col gap-2 bg-black/30 backdrop-blur-md p-2 rounded-2xl border border-white/10">
        <DevButton 
          onClick={() => {
            setQuiz(bourdainQuiz);
            // Update URL parameter
            const url = new URL(window.location.href);
            url.searchParams.set('quiz', 'bourdain');
            window.history.pushState({}, '', url);
          }}
          title="Switch to CNN Show"
          variant={currentQuiz.slug === 'bourdain' ? 'default' : 'default'}
        >
          <span className="text-[10px] font-bold">CNN</span>
        </DevButton>
        
        <DevButton 
          onClick={() => {
            setQuiz(curryQuiz);
            // Update URL parameter
            const url = new URL(window.location.href);
            url.searchParams.set('quiz', 'curry');
            window.history.pushState({}, '', url);
          }}
          title="Switch to Warriors Show"
          variant={currentQuiz.slug === 'curry' ? 'default' : 'default'}
        >
          <span className="text-[10px] font-bold">WAR</span>
        </DevButton>
      </div>
    </>
  );
};

export default DevToolbar;

