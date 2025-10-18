'use client';

import React from 'react';
import { GrainGradient } from '@paper-design/shaders-react';
import { GameProvider, useGame } from '@/contexts/GameContext';
import MobilePhoneFrame from '@/components/MobilePhoneFrame';
import Header from '@/components/Header';
import ShowIdentity from '@/components/ShowIdentity';
import EliminatedBanner from '@/components/EliminatedBanner';
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
import RealtimeCommentSection from '@/components/RealtimeCommentSection';

function GameContent() {
  const { gameState } = useGame();
  
  // Show persistent gradient background for waiting and countdown states
  const showGradientBackground = gameState === 'waiting' || gameState === 'countdown';

  return (
    <>
      <Header />
      <DevToolbar />
      <MobilePhoneFrame>
        {/* Persistent Grain Gradient Background for waiting/countdown */}
        {showGradientBackground && (
          <div className="absolute inset-0 z-0">
            <GrainGradient
              width={390}
              height={844}
              colors={["#fe1b35", "#d100c3", "#7538fa"]}
              colorBack="#000a0f"
              softness={0.70}
              intensity={0.15}
              noise={0.07}
              shape="wave"
              speed={1.2}
              scale={0.65}
              rotation={0}
              offsetX={0.00}
              offsetY={0.15}
            />
          </div>
        )}
        
        {/* Show Identity - persists across all views */}
        <ShowIdentity />
        
        {/* Eliminated Banner - shows when player is eliminated */}
        <EliminatedBanner />
        
        {/* Game screens */}
        {gameState === 'waiting' && <WaitingRoom />}
        {gameState === 'countdown' && <Countdown />}
        {gameState === 'opener' && <OpenerVideo />}
        {gameState === 'intro' && <IntroVideo />}
        {gameState === 'question-video' && <QuestionPlayer />}
        {gameState === 'answering' && <AnswerSelector />}
        {gameState === 'result' && <ResultScreen />}
        {gameState === 'wrapup' && <WrapUpVideo />}
        {gameState === 'closer' && <CloserVideo />}
        {gameState === 'winner' && <WinnerScreen />}
        
        {/* Realtime comment section with feed and composer */}
        <RealtimeCommentSection />
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
