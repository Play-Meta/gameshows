'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';

const AnswerSelector: React.FC = () => {
  const { currentQuestion, selectAnswer, selectedAnswer } = useGame();
  const { playSound } = useSound();
  const [timeLeft, setTimeLeft] = useState(currentQuestion?.timeLimit || 7);
  const lastPlayedSecondRef = useRef<number | null>(null);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(currentQuestion?.timeLimit || 7);
    lastPlayedSecondRef.current = null; // Reset sound tracking
  }, [currentQuestion]);

  useEffect(() => {
    if (selectedAnswer !== null) return; // Stop timer if answer selected

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
    } else {
      // Time's up - auto-select wrong answer to eliminate player
      selectAnswer(-1); // Invalid answer = elimination
    }
  }, [timeLeft, selectedAnswer, selectAnswer, playSound]);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return; // Already selected
    playSound('click');
    selectAnswer(index);
  };

  if (!currentQuestion) return null;

  const progressPercent = (timeLeft / currentQuestion.timeLimit) * 100;

  return (
    <div className="relative flex flex-col h-full">
      {/* Blurred video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src={currentQuestion.videoUrl}
          className="video-blur-background"
          muted
          playsInline
        />
      </div>

      {/* iOS Sheet Container - slides up from bottom */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-sheet-slide-up">
          {/* Sheet Content */}
          <div className="bg-black/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Timer Bar */}
            <div className="w-full h-1 bg-gray-800/50">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 3 ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
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
                <h2 className="text-xl font-bold text-white leading-tight">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      className={`
                        button w-full py-4 px-6 rounded-2xl font-semibold text-base
                        ${isSelected 
                          ? 'bg-blue-500 text-white scale-105 shadow-2xl' 
                          : 'button-secondary bg-white/90 backdrop-blur-md text-black hover:bg-white border-2 border-white/30'
                        }
                        ${selectedAnswer !== null && !isSelected ? 'opacity-50' : ''}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-left flex-1">{option}</span>
                        {isSelected && (
                          <span className="ml-2 text-2xl">✓</span>
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
