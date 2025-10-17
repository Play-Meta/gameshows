'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [playerCount] = useState(1234); // Simulated player count for prototype

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

  const selectAnswer = useCallback((answerIndex: number) => {
    if (gameState !== 'answering') return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion?.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setGameState('result');
    } else {
      setGameState('eliminated');
    }
  }, [gameState, currentQuestion]);

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

  return (
    <GameContext.Provider
      value={{
        gameState,
        currentQuestionIndex,
        currentQuestion,
        selectedAnswer,
        isCorrect,
        playerCount,
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
