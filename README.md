# Trivia Live Game Show

An HQ Trivia-style live game show built with Next.js and TypeScript.

## Features

- 5 question trivia game
- Pre-rendered TTS + lip-sync video for questions
- 10 seconds to answer each question
- One wrong answer eliminates player
- Win by answering all questions correctly
- Preserved sound design from original project
- Mobile-first phone frame UI

## Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play the game.

The game will run in a mobile phone frame on desktop. On actual mobile devices, it fills the full screen.

## Game Flow

1. **Waiting Room** - Shows player count and game rules
2. **Countdown** - 3-2-1 countdown before game starts
3. **Question Video** - Host reads question with TTS + lip-sync
4. **Answer Selection** - Multiple choice options with 10-second timer
5. **Result** - Shows if answer was correct/incorrect
6. **Winner/Eliminated** - Final screen based on performance

## Project Structure

```
├── app/
│   ├── page.tsx          # Main game orchestrator
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles & phone frame
├── components/
│   ├── MobilePhoneFrame.tsx
│   ├── WaitingRoom.tsx
│   ├── Countdown.tsx
│   ├── QuestionPlayer.tsx
│   ├── AnswerSelector.tsx
│   ├── ResultScreen.tsx
│   ├── EliminatedScreen.tsx
│   └── WinnerScreen.tsx
├── contexts/
│   └── GameContext.tsx   # Game state management
├── config/
│   └── questions.ts      # Question configuration
├── hooks/
│   └── useSound.ts       # Sound effects system
└── public/
    ├── sounds/           # Audio files
    ├── fonts/            # Optimistic Text fonts
    └── videos/           # Question videos (TTS + lip-sync)
```

## Adding Questions

Edit `config/questions.ts` to add/modify questions:

```typescript
{
  id: 1,
  videoUrl: '/videos/question1.mp4',
  question: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 1, // Index of correct answer
  timeLimit: 10
}
```

## Adding Video Files

Place your pre-rendered TTS + lip-sync video files in `public/videos/` and reference them in the question config.

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Context for state management
- Custom sound system with audio caching

## Sound Design

The game uses the following sounds:
- `Click-Warm.mp3` - Button clicks
- `Wake_Mobile.mp3` - Game start, correct answer
- `Inactive_Mobile.mp3` - Game end
- `Mute.mp3` - Mute toggle

All sounds are pre-cached for instant playback.
