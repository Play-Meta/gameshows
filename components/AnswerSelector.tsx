'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';

const AnswerSelector: React.FC = () => {
  const { currentQuestion, selectAnswer, playAnswerVideo, isEliminated } = useGame();
  const { playSound } = useSound();
  const [timeLeft, setTimeLeft] = useState(currentQuestion?.timeLimit || 7);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // Local state for locked answer
  const lastPlayedSecondRef = useRef<number | null>(null);

  // Reset timer and selection when question changes
  useEffect(() => {
    setTimeLeft(currentQuestion?.timeLimit || 7);
    setSelectedAnswer(null); // Reset locked answer
    lastPlayedSecondRef.current = null; // Reset sound tracking
  }, [currentQuestion]);

  useEffect(() => {
    // Timer always runs - doesn't stop when answer is selected (realtime sync for all players)
    
    // Play countdown sound for last 3 seconds (3, 2, 1)
    if (timeLeft <= 3 && timeLeft > 0 && lastPlayedSecondRef.current !== timeLeft) {
      playSound('countdown');
      lastPlayedSecondRef.current = timeLeft;
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    // Time's up - store the selected answer and play answer video
    if (selectedAnswer === null && !isEliminated) {
      // No answer selected - auto-eliminate
      selectAnswer(-1);
    } else if (!isEliminated && selectedAnswer !== null) {
      // Answer was selected - submit it
      selectAnswer(selectedAnswer);
    }
    
    // Play answer video for everyone after a brief delay
    const videoTimer = setTimeout(() => {
      playAnswerVideo();
    }, 100);
    
    return () => clearTimeout(videoTimer);
  }, [timeLeft, selectedAnswer, selectAnswer, playAnswerVideo, playSound, isEliminated]);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null || isEliminated) return; // Already selected or eliminated
    playSound('click');
    // Lock in the answer but don't submit yet - wait for timer
    setSelectedAnswer(index);
  };

  if (!currentQuestion) return null;

  return (
    <div className="relative flex flex-col h-full">
      {/* Blurred video background */}
      <div className="absolute inset-0 overflow-hidden z-30">
        <video
          src={currentQuestion.videoUrl}
          className="video-blur-background"
          muted
          playsInline
        />
      </div>

      {/* iOS Sheet Container - slides up from bottom */}
      <div className="absolute inset-0 flex items-center justify-center p-3 z-50 pointer-events-none">
        <div className="w-full max-w-md animate-sheet-slide-up pointer-events-auto">
          {/* Sheet Content */}
          <div className="bg-black/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Timer Bar */}
            <div className="w-full h-1 bg-gray-800/50 overflow-hidden">
              <div
                className={`h-full ${
                  timeLeft <= 3 ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ 
                  animation: `timerCountdown ${currentQuestion.timeLimit}s linear forwards`
                }}
              />
            </div>

            {/* Content */}
            <div className="p-3">
              {/* Timer Display */}
              <div className="text-center mb-4">
                <div className={`text-5xl font-bold ${
                  timeLeft <= 3 ? 'text-red-400' : 'text-white'
                }`}>
                  {timeLeft}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-center mb-6">
                <h2 className="text-base font-bold text-white leading-tight">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="flex flex-col gap-2">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null || isEliminated}
                      className={`
                        button w-full py-4 px-6 rounded-3xl font-semibold text-base
                        ${isSelected 
                          ? 'bg-white text-black shadow-2xl border-2 border-white' 
                          : 'button-secondary bg-white/90 backdrop-blur-md text-black hover:bg-white border-2 border-white/30'
                        }
                        ${(selectedAnswer !== null || isEliminated) && !isSelected ? 'opacity-50' : ''}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-left flex-1">{option}</span>
                        {isSelected && (
                          <span className="ml-2 text-base">✓</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerSelector;
