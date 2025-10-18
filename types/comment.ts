export interface Comment {
  id: string;
  username: string;
  message: string;
  timestamp: number; // seconds into game
  animationType: 'float';
}

export interface ProcessedComment extends Comment {
  duration: number; // animation duration in seconds
  position: {
    x: number; // horizontal position (%)
  };
}

