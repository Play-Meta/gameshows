import { QuizConfig } from './types';

export const curryQuiz: QuizConfig = {
  id: 'curry-basketball',
  slug: 'curry',
  commentsFile: '/data/curry-comments.json',
  show: {
    title: 'Basketball Trivia',
    channel: {
      name: 'Warriors',
      avatar: '/icon-avatar-warriors.jpg',
      verified: true,
    },
    host: {
      name: 'Stephen Curry',
    },
  },
  videos: {
    intro: '/videos/curry/intro.mp4',
    closer: '/videos/curry/closer.mp4',
  },
  questions: [
    {
      id: 1,
      videoUrl: '/videos/curry/q1-question.mp4',
      answerVideoUrl: '/videos/curry/q1-answer.mp4',
      question: 'During our 2022 championship run, I debuted a new celebration that took over the world after big shots. What was it?',
      options: ['The Shimmy', 'Night Night', 'The Splash', 'The Three Goggles'],
      correctAnswer: 1, // Night Night
      timeLimit: 7
    },
    {
      id: 2,
      videoUrl: '/videos/curry/q2-question.mp4',
      answerVideoUrl: '/videos/curry/q2-answer.mp4',
      question: 'Before I was a Warrior, I made a name for myself in college, leading my team on an unforgettable NCAA tournament run. Which school did I play for?',
      options: ['Duke', 'North Carolina', 'Davidson', 'Virginia Tech'],
      correctAnswer: 2, // Davidson
      timeLimit: 7
    },
    {
      id: 3,
      videoUrl: '/videos/curry/q3-question.mp4',
      answerVideoUrl: '/videos/curry/q3-answer.mp4',
      question: 'In the 2015-16 season, I set the all-time NBA record for most three-pointers made in a single season. What was that record-breaking number?',
      options: ['386', '402', '415', '324'],
      correctAnswer: 1, // 402
      timeLimit: 7
    }
  ],
  timing: {
    countdownDuration: 3,
    resultDisplayDuration: 2,
  },
};

