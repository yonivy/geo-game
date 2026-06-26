# Plan: Phase 1 — Data + Core Engine

**Phase:** 1
**Goal:** Set up the project scaffold, country dataset, flag assets, question generator, timer, and scoring engine — the full data layer and game logic without UI.
**Mode:** mvp

## Tasks

### 1.1 Scaffold Project

- `npm create vite@latest` with React + TypeScript template
- Install `flag-icons` npm package for ~195 country flag SVGs
- Clean up default Vite boilerplate
- Set up Vitest for testing

### 1.2 Create Country Dataset

- Create `src/data/countries.ts` with all ~195 UN countries
- Each entry: `{ id, name, flag }` where `id` is ISO 3166-1 alpha-2 code and `flag` references the SVG path from flag-icons
- Export as typed array

### 1.3 Build Question Generator

- Create `src/engine/questionGenerator.ts`
- Function: `generateQuestion(countries, excludeIds?) → Question`
- Picks 1 correct + 3 random distractors, shuffles output
- `Question` type: `{ correct: Country, options: Country[] }`
- Avoid repeats by excluding previously-used country IDs

### 1.4 Build Countdown Timer

- Create `src/engine/timer.ts`
- Class/hook: starts at 90s, counts down to 0
- Exposes: `timeRemaining`, `isRunning`, `isFinished`
- Callback-based or observable tick mechanism
- Cleans up on unmount

### 1.5 Build Scoring Engine

- Create `src/engine/scoring.ts`
- `StreakTracker`: tracks consecutive correct answers
- `ScoreCalculator`: `basePoints × streakMultiplier`
- Formula: streak = consecutive correct; multiplier = `1 + streak × 0.5`
- Reset streak to 0 on incorrect answer
- `calculateFinalScore(answers[]) → number`

### 1.6 Build Game State Orchestrator

- Create `src/engine/gameState.ts`
- Orchestrates: question generation → timer → scoring
- `GameState` manages: current question, score, streak, answers history, timer
- Methods: `startGame()`, `submitAnswer(answerId)`, `getCurrentQuestion()`, `getFinalScore()`
- `submitAnswer` returns correct/incorrect and updates streak

### 1.7 Wire Up Minimal App Shell

- Update `App.tsx` to initialize game state on mount
- Render minimal UI to verify: timer ticking, question cycling, score displayed in console/logs
- This is a dev-verification layer (no polished UI)

### 1.8 Tests

- Unit tests for question generator (no repeats, correct count)
- Unit tests for scoring (streak multiplier math)
- Unit tests for timer (basic countdown behavior)

## Dependencies

- Node.js & npm (assumed available)
- Task 1.1 blocks all others
- Tasks 1.3–1.6 depend on 1.2
- Task 1.6 depends on 1.3, 1.4, 1.5
- Task 1.7 depends on 1.6
- Task 1.8 can run in parallel with 1.7

## Risks

- Flag SVG paths may not match country codes exactly — verify flag-icons `flags/4x3/` naming convention
- Some very small/obscure countries might be missing from flag-icons — have a fallback "unknown" placeholder
- Timer precision: `setInterval` drift is acceptable for a 90s game timer
