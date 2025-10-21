export interface Question {
  id: number;
  videoUrl: string;
  answerVideoUrl: string; // Video showing the answer
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number; // in seconds
}

export interface QuizConfig {
  id: string;
  slug: string; // URL-friendly identifier
  commentsFile: string; // Path to quiz-specific comments JSON
  show: {
    title: string;
    channel: {
      name: string;
      avatar: string;
      verified: boolean;
    };
    host: {
      name: string;
    };
  };
  videos: {
    intro: string;
    closer: string;
  };
  questions: Question[];
  timing: {
    countdownDuration: number;
    resultDisplayDuration: number;
  };
}

