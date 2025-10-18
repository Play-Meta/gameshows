import { Comment, ProcessedComment } from '@/types/comment';

const GAME_DURATION = 240; // seconds - extended to spread comments more
const FLOAT_DURATION = 6; // Fixed duration for consistent, readable pacing

// Import comments data - using dynamic import to avoid Turbopack issues
let cachedComments: Array<{ username: string; message: string }> | null = null;

async function loadComments() {
  if (cachedComments) return cachedComments;
  
  try {
    const response = await fetch('/data/ai_studio_code.json');
    cachedComments = await response.json();
    return cachedComments!;
  } catch (error) {
    console.error('Failed to load comments:', error);
    return [];
  }
}

/**
 * Process raw comments JSON into timed, positioned comments
 * All comments use float animation for elegant, uniform appearance
 */
// Generate a unique session ID once on module load
const SESSION_ID = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

export async function processComments(): Promise<ProcessedComment[]> {
  const rawComments = await loadComments();
  
  return rawComments.map((comment, index) => {
    // All comments use float animation (bottom to top)
    const animationType: 'float' = 'float';
    
    // Start comments immediately from 0 seconds
    // Spread evenly across game duration with some randomness
    const baseTimestamp = (index / rawComments.length) * GAME_DURATION;
    const randomOffset = (Math.random() - 0.5) * 8; // ±4 seconds variation
    const timestamp = Math.max(0, baseTimestamp + randomOffset);
    
    // Fixed duration for consistent pacing
    const duration = FLOAT_DURATION;
    
    // Horizontal position - centered range for phone frame
    const position = { x: 15 + Math.random() * 70 }; // 15%-85% horizontal position
    
    return {
      id: `comment-${SESSION_ID}-${index}`,
      username: comment.username,
      message: comment.message,
      timestamp,
      animationType,
      duration,
      position,
    };
  });
}

// Initialize comments on module load
let processedCommentsPromise: Promise<ProcessedComment[]> | null = null;

export function getProcessedComments(): Promise<ProcessedComment[]> {
  if (!processedCommentsPromise) {
    processedCommentsPromise = processComments().then(comments => 
      comments.sort((a, b) => a.timestamp - b.timestamp)
    );
  }
  return processedCommentsPromise;
}

