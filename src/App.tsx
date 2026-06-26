import { useState, useEffect, useRef } from "react"
import type { GameStateController } from "./engine/gameState"
import { createGameState } from "./engine/gameState"
import type { Question } from "./types"

function App() {
  const [phase, setPhase] = useState<"menu" | "playing" | "result">("menu")
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeDisplay, setTimeDisplay] = useState("90s")
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [finalScore, setFinalScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)

  const gameRef = useRef<GameStateController | null>(null)

  useEffect(() => {
    gameRef.current = createGameState({
      onTimerTick: (display) => setTimeDisplay(display),
      onTimerFinish: () => {
        setFinalScore(gameRef.current!.getScore())
        setPhase("result")
      },
      onNewQuestion: (q) => {
        setCurrentQuestion(q)
        setFeedback(null)
      },
      onAnswerResult: (correct, s) => {
        setStreak(s)
        setScore(gameRef.current!.getScore())
        setFeedback(correct ? "correct" : "incorrect")
        if (correct) setCorrectCount((c) => c + 1)
        setTotalAnswered((t) => t + 1)
      },
    })
  }, [])

  function handleStart() {
    setScore(0)
    setStreak(0)
    setCorrectCount(0)
    setTotalAnswered(0)
    setTimeDisplay("90s")
    setPhase("playing")
    gameRef.current?.startGame()
  }

  function handleAnswer(code: string) {
    if (feedback) return
    gameRef.current?.submitAnswer(code)
  }

  function handleRestart() {
    setPhase("menu")
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      {phase === "menu" && (
        <div style={{ textAlign: "center", paddingTop: 80 }}>
          <h1 style={{ fontSize: 32, marginBottom: 8 }}>GeoGame</h1>
          <p style={{ color: "#666", marginBottom: 32 }}>Identify the flag. Build your streak. Beat the clock.</p>
          <button
            onClick={handleStart}
            style={{
              padding: "14px 48px",
              fontSize: 18,
              border: "none",
              borderRadius: 12,
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Start Game
          </button>
        </div>
      )}

      {phase === "playing" && currentQuestion && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 24 }}>{score}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{timeDisplay}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, color: streak > 0 ? "#16a34a" : "#888" }}>
                Streak: {streak}
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>
                {correctCount}/{totalAnswered}
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#f4f4f5",
              borderRadius: 12,
              padding: 24,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            <img
              src={`/flags/${currentQuestion.correct.code}.svg`}
              alt="Flag"
              style={{ width: "100%", maxWidth: 240, height: "auto", borderRadius: 4 }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {currentQuestion.options.map((country) => {
              let bg = "#fff"
              let border = "#d4d4d8"
              if (feedback) {
                if (country.code === currentQuestion.correct.code) {
                  bg = "#dcfce7"
                  border = "#16a34a"
                }
              }
              return (
                <button
                  key={country.code}
                  onClick={() => handleAnswer(country.code)}
                  disabled={!!feedback}
                  style={{
                    padding: "14px 20px",
                    fontSize: 16,
                    border: `2px solid ${border}`,
                    borderRadius: 10,
                    background: bg,
                    cursor: feedback ? "default" : "pointer",
                    textAlign: "left",
                    fontWeight: 500,
                    transition: "all 0.15s",
                  }}
                >
                  {country.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {phase === "result" && (
        <div style={{ textAlign: "center", paddingTop: 60 }}>
          <h2 style={{ fontSize: 28, marginBottom: 8 }}>Time's Up!</h2>
          <div style={{ fontSize: 48, fontWeight: 700, color: "#2563eb", marginBottom: 8 }}>
            {finalScore}
          </div>
          <div style={{ color: "#666", marginBottom: 24 }}>
            {correctCount} correct out of {totalAnswered} questions
          </div>
          <button
            onClick={handleRestart}
            style={{
              padding: "14px 48px",
              fontSize: 18,
              border: "none",
              borderRadius: 12,
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default App
