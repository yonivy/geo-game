import type { AnswerRecord, Country, GameStatus, Question } from "../types"
import { generateQuestion } from "./questionGenerator"
import { createTimer, formatTime } from "./timer"
import { calculatePoints } from "./scoring"

const GAME_DURATION_MS = 90_000

export interface GameStateCallbacks {
  onTimerTick: (timeDisplay: string, ms: number) => void
  onTimerFinish: () => void
  onNewQuestion: (question: Question) => void
  onAnswerResult: (correct: boolean, streak: number, pointsEarned: number) => void
}

export interface GameStateController {
  startGame: () => void
  submitAnswer: (countryCode: string) => void
  getStatus: () => GameStatus
  getScore: () => number
  getStreak: () => number
  getCurrentQuestion: () => Question | null
  getAnswerHistory: () => AnswerRecord[]
}

export function createGameState(callbacks: GameStateCallbacks): GameStateController {
  let status: GameStatus = "idle"
  let score = 0
  let streak = 0
  let currentQuestion: Question | null = null
  let usedCodes = new Set<string>()
  const answerHistory: AnswerRecord[] = []

  const timer = createTimer(
    GAME_DURATION_MS,
    (ms) => callbacks.onTimerTick(formatTime(ms), ms),
    () => {
      status = "finished"
      callbacks.onTimerFinish()
    },
  )

  function nextQuestion() {
    const q = generateQuestion(usedCodes)
    if (q) {
      currentQuestion = q
      usedCodes.add(q.correct.code)
      callbacks.onNewQuestion(q)
    } else {
      score = 0
      usedCodes.clear()
      nextQuestion()
    }
  }

  function startGame() {
    status = "playing"
    score = 0
    streak = 0
    usedCodes.clear()
    answerHistory.length = 0
    timer.start()
    nextQuestion()
  }

  function submitAnswer(countryCode: string) {
    if (status !== "playing" || !currentQuestion) return

    const isCorrect = currentQuestion.correct.code === countryCode
    const pointsEarned = isCorrect ? calculatePoints(streak) : 0

    answerHistory.push({
      question: currentQuestion,
      selected: currentQuestion.options.find((o) => o.code === countryCode) as Country,
      correct: isCorrect,
    })

    if (isCorrect) {
      streak++
      score += pointsEarned
    } else {
      streak = 0
    }

    callbacks.onAnswerResult(isCorrect, streak, pointsEarned)

    if (status === "playing") {
      nextQuestion()
    }
  }

  function getStatus() { return status }
  function getScore() { return score }
  function getStreak() { return streak }
  function getCurrentQuestion() { return currentQuestion }
  function getAnswerHistory() { return [...answerHistory] }

  return { startGame, submitAnswer, getStatus, getScore, getStreak, getCurrentQuestion, getAnswerHistory }
}
