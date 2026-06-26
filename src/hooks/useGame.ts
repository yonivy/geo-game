import { useState, useRef, useCallback } from "react"
import type { Question } from "../types"
import { createGameState, type GameStateController } from "../engine/gameState"
import { saveScore } from "../utils/scoreHistory"

export type GamePhase = "menu" | "playing" | "result" | "history"

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
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function startGame() {
    gameRef.current = createGameState({
      onTimerTick: (display) => {
        setState((s) => ({ ...s, timeDisplay: display }))
      },
      onTimerFinish: () => {
        const finalScore = gameRef.current?.getScore() ?? 0
        const history = gameRef.current?.getAnswerHistory() ?? []
        const correct = history.filter((a) => a.correct).length
        saveScore({
          date: new Date().toISOString(),
          score: finalScore,
          correctCount: correct,
          totalAnswered: history.length,
          accuracy: history.length > 0 ? Math.round((correct / history.length) * 100) : 0,
        })
        setState((s) => ({
          ...s,
          phase: "result",
          finalScore,
        }))
      },
      onNewQuestion: (q) => {
        feedbackTimerRef.current = setTimeout(() => {
          setState((s) => ({ ...s, currentQuestion: q, feedback: null, selectedCode: null }))
        }, 700)
      },
      onAnswerResult: (correct, streak, _pointsEarned) => {
        if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
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

  function quitGame() {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
    gameRef.current?.quit()
    setState(initialState)
  }

  function finishGame() {
    const fScore = gameRef.current?.getScore() ?? 0
    setState((s) => ({
      ...s,
      phase: "result",
      finalScore: fScore,
    }))
  }

  function showHistory() {
    setState((s) => ({ ...s, phase: "history" }))
  }

  function goToMenu() {
    setState(initialState)
  }

  return {
    ...state,
    startGame,
    submitAnswer,
    quitGame,
    finishGame,
    showHistory,
    goToMenu,
  }
}
