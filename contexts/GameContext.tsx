'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { QUESTIONS, Question } from '@/config/questions';

export type GameState = 
  | 'waiting'          // Waiting room before game starts
  | 'countdown'        // 3-2-1 countdown
  | 'opener'           // Opener video (Bourdain rules intro)
  | 'intro'            // Intro video (transition to game)
  | 'question-video'   // Playing question video
  | 'answering'        // Showing answer options
  | 'result'           // Showing if player got it right/wrong
  | 'eliminated'       // Player got question wrong
  | 'wrapup'           // Wrap-up video after final question
  | 'closer'           // Closer video
  | 'winner';          // Player answered all questions correctly

interface GameContextType {
  gameState: GameState;
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  playerCount: number;
  isMuted: boolean;
  isEliminated: boolean;
  
  startGame: () => void;
  startCountdown: () => void;
  playOpener: () => void;
  playIntro: () => void;
  playQuestionVideo: () => void;
  showAnswers: () => void;
  selectAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  playWrapUp: () => void;
  playCloser: () => void;
  restartGame: () => void;
  skipToFirstQuestion: () => void;
  skipToQuestion: (questionIndex: number) => void;
  skipToQuestionAnswer: (questionIndex: number) => void;
  toggleMute: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [playerCount, setPlayerCount] = useState(500); // Start at 500 and animate
  const [isMuted, setIsMuted] = useState(false);
  const [isEliminated, setIsEliminated] = useState(false);

  // Animate player count with phased growth
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateCount = () => {
      setPlayerCount(prev => {
        // Phase 1: Rapid growth to 10K
        if (prev < 10000) {
          return prev + Math.floor(Math.random() * 200) + 100; // +100-300 per tick
        }
        // Phase 2: Slow growth around 10K
        else if (prev < 12000) {
          return prev + Math.floor(Math.random() * 20) + 5; // +5-25 per tick
        }
        // Phase 3: Jump to 25K
        else if (prev < 25000) {
          return 25000 + Math.floor(Math.random() * 100);
        }
        // Phase 4: Jump to 40K
        else if (prev < 40000) {
          return 40000 + Math.floor(Math.random() * 100);
        }
        // Phase 5: Settle around 40K
        else {
          return prev + Math.floor(Math.random() * 10) - 5; // Fluctuate ±5
        }
      });
    };

    // Start with faster updates, then slow down
    intervalId = setInterval(updateCount, 800); // Update every 800ms

    return () => clearInterval(intervalId);
  }, []);

  const currentQuestion = QUESTIONS[currentQuestionIndex] || null;

  const startGame = useCallback(() => {
    setGameState('countdown');
  }, []);

  const startCountdown = useCallback(() => {
    setGameState('countdown');
  }, []);

  const playOpener = useCallback(() => {
    setGameState('opener');
  }, []);

  const playIntro = useCallback(() => {
    setGameState('intro');
  }, []);

  const playQuestionVideo = useCallback(() => {
    setGameState('question-video');
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, []);

  const showAnswers = useCallback(() => {
    setGameState('answering');
  }, []);

  const nextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex >= QUESTIONS.length) {
      // All questions completed - play wrap-up video
      setGameState('wrapup');
    } else {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setGameState('question-video');
    }
  }, [currentQuestionIndex]);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (gameState !== 'answering') return;
    
    // If already eliminated, skip to next question (no result screen needed)
    if (isEliminated) {
      nextQuestion();
      return;
    }
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion?.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setGameState('result');
    } else {
      setIsEliminated(true); // Mark player as eliminated
      setGameState('result'); // Show result screen instead of eliminated screen
    }
  }, [gameState, currentQuestion, isEliminated, nextQuestion]);

  const playWrapUp = useCallback(() => {
    setGameState('wrapup');
  }, []);

  const playCloser = useCallback(() => {
    setGameState('closer');
  }, []);

  const restartGame = useCallback(() => {
    setGameState('waiting');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsEliminated(false);
  }, []);

  // Dev helper to skip to first question
  const skipToFirstQuestion = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameState('question-video');
  }, []);

  // Dev helper to skip to any question
  const skipToQuestion = useCallback((questionIndex: number) => {
    if (questionIndex >= 0 && questionIndex < QUESTIONS.length) {
      setCurrentQuestionIndex(questionIndex);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setGameState('question-video');
    }
  }, []);

  // Dev helper to skip to answering state for any question
  const skipToQuestionAnswer = useCallback((questionIndex: number) => {
    if (questionIndex >= 0 && questionIndex < QUESTIONS.length) {
      setCurrentQuestionIndex(questionIndex);
      setSelectedAnswer(null); // Reset answer so user can select
      setIsCorrect(null);
      setGameState('answering'); // Go to answering state, not result
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        currentQuestionIndex,
        currentQuestion,
        selectedAnswer,
        isCorrect,
        playerCount,
        isMuted,
        isEliminated,
        startGame,
        startCountdown,
        playOpener,
        playIntro,
        playQuestionVideo,
        showAnswers,
        selectAnswer,
        nextQuestion,
        playWrapUp,
        playCloser,
        restartGame,
        skipToFirstQuestion,
        skipToQuestion,
        skipToQuestionAnswer,
        toggleMute,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
