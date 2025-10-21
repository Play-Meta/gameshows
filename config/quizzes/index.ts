import { QuizConfig } from './types';
import { bourdainQuiz } from './bourdain';
import { curryQuiz } from './curry';

export const QUIZZES: QuizConfig[] = [
  bourdainQuiz,
  curryQuiz,
];

export function getQuizBySlug(slug: string): QuizConfig {
  const quiz = QUIZZES.find(q => q.slug === slug);
  if (!quiz) {
    console.warn(`Quiz with slug "${slug}" not found, defaulting to bourdain`);
    return bourdainQuiz;
  }
  return quiz;
}

export function getRandomQuiz(excludeSlug?: string): QuizConfig {
  const availableQuizzes = excludeSlug 
    ? QUIZZES.filter(q => q.slug !== excludeSlug)
    : QUIZZES;
  
  if (availableQuizzes.length === 0) {
    return bourdainQuiz;
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuizzes.length);
  return availableQuizzes[randomIndex];
}

// Re-export for convenience
export { bourdainQuiz, curryQuiz };
export type { QuizConfig, Question } from './types';

