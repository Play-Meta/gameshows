'use client';

import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

// Rainbow colors from the comment section username colors
const RAINBOW_COLORS = [
  '#FF375F', // Hot Pink/Red
  '#FF9500', // Vivid Orange
  '#FFD60A', // Electric Yellow
  '#30D158', // Neon Green
  '#64D2FF', // Bright Blue
  '#BF5AF2', // Vibrant Purple
];

// Gradient combinations - varied pairings from the rainbow colors
const GRADIENT_COMBOS = [
  ['#FF375F', '#FF9500'], // Hot Pink to Orange
  ['#FF9500', '#FFD60A'], // Orange to Yellow
  ['#FFD60A', '#30D158'], // Yellow to Green
  ['#30D158', '#64D2FF'], // Green to Blue
  ['#64D2FF', '#BF5AF2'], // Blue to Purple
  ['#BF5AF2', '#FF375F'], // Purple to Pink
  ['#FF375F', '#FFD60A'], // Pink to Yellow
  ['#FF9500', '#30D158'], // Orange to Green
  ['#FFD60A', '#64D2FF'], // Yellow to Blue
  ['#30D158', '#BF5AF2'], // Green to Purple
  ['#64D2FF', '#FF375F'], // Blue to Pink
  ['#BF5AF2', '#FF9500'], // Purple to Orange
] as const;

type Props = React.ComponentPropsWithoutRef<"button"> & {
  symbol?: string;
  scale?: number;
  y?: string;
  x?: string | number | (() => string | number);
  rotate?: string | number | (() => string | number);
  children?: React.ReactNode;
};

interface FlyingSymbol {
  id: number;
  gradient: [string, string];
  position: { left: number; top: number };
}

export const Reaction: React.FC<Props> = ({
  symbol,
  onClick: callback,
  children,
  ...props
}) => {
  const [flyingSymbols, setFlyingSymbols] = useState<FlyingSymbol[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      callback?.(e);

      const id = Date.now() + Math.random(); // Ensure unique ID
      const gradient = GRADIENT_COMBOS[Math.floor(Math.random() * GRADIENT_COMBOS.length)] as [string, string];
      
      // Get button position for positioning hearts
      const rect = buttonRef.current?.getBoundingClientRect();
      const position = rect ? {
        left: rect.left + rect.width / 2,
        top: rect.top + rect.height / 2,
      } : { left: 0, top: 0 };
      
      setFlyingSymbols((flyingSymbols) => [...flyingSymbols, { id, gradient, position }]);
      setTimeout(() => {
        setFlyingSymbols((flyingSymbols) =>
          flyingSymbols.filter((e) => e.id !== id)
        );
      }, 2500); // Increased from 1000ms to 2500ms to match new animation duration
    },
    [callback]
  );

  return (
    <>
      <button ref={buttonRef} {...{ onClick, ...props }}>
        {children || symbol}
      </button>
      
      {/* Portal flying hearts to document body to escape z-index stacking contexts */}
      {mounted && createPortal(
        <AnimatePresence>
          {flyingSymbols.map(({ id, gradient, position }) => (
            <FlyingSymbol key={id} id={id} gradient={gradient} position={position} />
          ))}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

interface FlyingSymbolProps {
  id: number;
  gradient: [string, string];
  position: { left: number; top: number };
  rotate?: number | (() => number);
  x?: string | number | (() => string | number);
  y?: string;
  scale?: number;
}

const FlyingSymbol: React.FC<FlyingSymbolProps> = ({
  id,
  gradient,
  position,
  rotate = () => Math.random() * 90 - 45,
  x = () => `${Math.random() * 1200 - 600}%`, // Increased range: -600% to +600% for more slithering
  y = "-2000%", // Increased to -2000% (2x higher on screen)
  scale = 1.5,
}) => {
  const animate = useMemo(
    () => ({
      rotate: typeof rotate === "function" ? rotate() : rotate,
      x: typeof x === "function" ? x() : x,
    }),
    [rotate, x]
  );

  const gradientId = `heart-gradient-${id}`;

  return (
    <motion.div
      initial={{ y: 0, opacity: 1, scale: 1, rotate: 0, x: 0 }}
      animate={{ y, opacity: 0, scale, ...animate }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="fixed pointer-events-none z-[9999]"
      style={{ 
        width: '24px', 
        height: '24px',
        left: position.left - 12, // Center horizontally (half of 24px)
        top: position.top - 12, // Center vertically (half of 24px)
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={`url(#${gradientId})`}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={gradient[0]} />
            <stop offset="100%" stopColor={gradient[1]} />
          </linearGradient>
        </defs>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </motion.div>
  );
};

