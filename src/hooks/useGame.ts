import { useState, useRef, useCallback } from "react"
import type { Question } from "../types"
import { createGameState, type GameStateController } from "../engine/gameState"

export type GamePhase = "menu" | "playing" | "result"

export interface GameUIState {
  phase: GamePhase
  currentQuestion: Question | null
  score: number
  streak: number
  timeDisplay: string
  feedback: "correct" | "incorrect" | null
  selectedCode: string | null
  finalScore: number
  correctCount: number
  totalAnswered: number
}

const initialState: GameUIState = {
  phase: "menu",
  currentQuestion: null,
  score: 0,
  streak: 0,
  timeDisplay: "90s",
  feedback: null,
  selectedCode: null,
  finalScore: 0,
  correctCount: 0,
  totalAnswered: 0,
}

export function useGame() {
  const [state, setState] = useState<GameUIState>(initialState)
  const gameRef = useRef<GameStateController | null>(null)

  function startGame() {
    gameRef.current = createGameState({
      onTimerTick: (display) => {
        setState((s) => ({ ...s, timeDisplay: display }))
      },
      onTimerFinish: () => {
        setState((s) => ({
          ...s,
          phase: "result",
          finalScore: gameRef.current?.getScore() ?? s.score,
        }))
      },
      onNewQuestion: (q) => {
        setState((s) => ({ ...s, currentQuestion: q, feedback: null, selectedCode: null }))
      },
      onAnswerResult: (correct, streak, _pointsEarned) => {
        setState((s) => ({
          ...s,
          streak,
          score: gameRef.current?.getScore() ?? s.score,
          feedback: correct ? "correct" : "incorrect",
          correctCount: correct ? s.correctCount + 1 : s.correctCount,
          totalAnswered: s.totalAnswered + 1,
        }))
      },
    })

    setState((s) => ({
      ...s,
      phase: "playing",
      score: 0,
      streak: 0,
      correctCount: 0,
      totalAnswered: 0,
      timeDisplay: "90s",
      feedback: null,
      selectedCode: null,
    }))

    gameRef.current.startGame()
  }

  const submitAnswer = useCallback((code: string) => {
    setState((s) => ({ ...s, selectedCode: code }))
    gameRef.current?.submitAnswer(code)
  }, [])

  function resetGame() {
    setState(initialState)
  }

  return {
    ...state,
    startGame,
    submitAnswer,
    resetGame,
  }
}
