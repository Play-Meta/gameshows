'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '@/contexts/GameContext';
import Pill from './Pill';

const EliminatedBanner: React.FC = () => {
  const { isEliminated } = useGame();

  return (
    <AnimatePresence>
      {isEliminated && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute top-28 left-0 right-0 z-50 flex justify-center px-3"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif' }}
        >
          <Pill type="default" size="lg">
            You've been eliminated.
          </Pill>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EliminatedBanner;

