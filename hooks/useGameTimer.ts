'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to track elapsed game time in seconds
 * Starts immediately when component mounts (including waiting room)
 */
export function useGameTimer() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start timer immediately on mount
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
      
      // Start interval to update elapsed time
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          setElapsedSeconds(elapsed);
        }
      }, 100); // Update every 100ms for smooth comment timing
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return elapsedSeconds;
}

