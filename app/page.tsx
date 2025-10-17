'use client';

import React from 'react';
import { GameProvider, useGame } from '@/contexts/GameContext';
import MobilePhoneFrame from '@/components/MobilePhoneFrame';
import Header from '@/components/Header';
import DevToolbar from '@/components/DevToolbar';
import WaitingRoom from '@/components/WaitingRoom';
import Countdown from '@/components/Countdown';
import OpenerVideo from '@/components/OpenerVideo';
import IntroVideo from '@/components/IntroVideo';
import QuestionPlayer from '@/components/QuestionPlayer';
import AnswerSelector from '@/components/AnswerSelector';
import ResultScreen from '@/components/ResultScreen';
import EliminatedScreen from '@/components/EliminatedScreen';
import WrapUpVideo from '@/components/WrapUpVideo';
import CloserVideo from '@/components/CloserVideo';
import WinnerScreen from '@/components/WinnerScreen';

function GameContent() {
  const { gameState } = useGame();

  return (
    <>
      <Header />
      <DevToolbar />
      <MobilePhoneFrame>
        {gameState === 'waiting' && <WaitingRoom />}
        {gameState === 'countdown' && <Countdown />}
        {gameState === 'opener' && <OpenerVideo />}
        {gameState === 'intro' && <IntroVideo />}
        {gameState === 'question-video' && <QuestionPlayer />}
        {gameState === 'answering' && <AnswerSelector />}
        {gameState === 'result' && <ResultScreen />}
        {gameState === 'eliminated' && <EliminatedScreen />}
        {gameState === 'wrapup' && <WrapUpVideo />}
        {gameState === 'closer' && <CloserVideo />}
        {gameState === 'winner' && <WinnerScreen />}
      </MobilePhoneFrame>
    </>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
