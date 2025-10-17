export interface Question {
  id: number;
  videoUrl: string;
  answerVideoUrl: string; // Video showing the answer
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number; // in seconds
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    videoUrl: '/videos/3-Question1-Q.mp4',
    answerVideoUrl: '/videos/4-Question1-A.mp4',
    question: 'The Japanese aesthetic of finding beauty in imperfection and impermanence is known as what?',
    options: ['Kaizen', 'Wabi-sabi', 'Ikigai', 'Bushido'],
    correctAnswer: 1, // Wabi-sabi
    timeLimit: 7
  },
  {
    id: 2,
    videoUrl: '/videos/5-Question2-Q.mp4',
    answerVideoUrl: '/videos/6-Question2-A.mp4',
    question: 'In Ho Chi Minh City, what is the primary mode of transportation?',
    options: ['Bicycles', 'Tuk-tuks', 'Motorbikes', 'Cars'],
    correctAnswer: 2, // Motorbikes
    timeLimit: 7
  },
  {
    id: 3,
    videoUrl: '/videos/7-Question3-Q.mp4',
    answerVideoUrl: '/videos/8-Question3-A.mp4',
    question: 'Apocalypse Now, set in Vietnam, was primarily filmed in which country?',
    options: ['Thailand', 'The Philippines', 'Cambodia', 'Malaysia'],
    correctAnswer: 1, // The Philippines
    timeLimit: 7
  },
  {
    id: 4,
    videoUrl: '/videos/9-Question4-Q.mp4',
    answerVideoUrl: '/videos/10-Question4-A.mp4',
    question: 'What 24-hour American diner chain did Bourdain call "an irony-free zone where everything is beautiful"?',
    options: ['Denny\'s', 'Waffle House', 'IHOP', 'Shoney\'s'],
    correctAnswer: 1, // Waffle House
    timeLimit: 7
  },
  {
    id: 5,
    videoUrl: '/videos/11-Question5-Q.mp4',
    answerVideoUrl: '/videos/12-Question5-A.mp4',
    question: 'In the French kitchen brigade, the chef responsible for all sauces and sautéed items is called what?',
    options: ['Garde Manger', 'Poissonnier', 'Saucier', 'Tournant'],
    correctAnswer: 2, // Saucier
    timeLimit: 7
  }
];

export const GAME_CONFIG = {
  totalQuestions: QUESTIONS.length,
  countdownDuration: 3, // seconds before game starts
  resultDisplayDuration: 2, // seconds to show result before next question
  openerVideoUrl: '/videos/1-Opener.mp4',
  introVideoUrl: '/videos/2-Intro.mp4',
  wrapUpVideoUrl: '/videos/13-WrapUp.mp4',
  closerVideoUrl: '/videos/GameShowCloser.mp4',
};
