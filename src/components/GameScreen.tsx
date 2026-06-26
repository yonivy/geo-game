import { useEffect, useState } from "react"
import type { Question } from "../types"
import { StreakIndicator } from "./StreakIndicator"
import { FlagImage } from "./FlagImage"

interface Props {
  question: Question
  score: number
  streak: number
  timeDisplay: string
  correctCount: number
  totalAnswered: number
  feedback: "correct" | "incorrect" | null
  selectedCode: string | null
  onSubmit: (code: string) => void
}

export function GameScreen({
  question,
  score,
  streak,
  timeDisplay,
  correctCount,
  totalAnswered,
  feedback,
  selectedCode,
  onSubmit,
}: Props) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    setEntered(false)
    const t = setTimeout(() => setEntered(true), 30)
    return () => clearTimeout(t)
  }, [question.correct.code])

  function getButtonStyle(code: string): React.CSSProperties {
    const base: React.CSSProperties = {
      padding: "14px 20px",
      fontSize: 16,
      fontWeight: 500,
      border: "2px solid #e4e4e7",
      borderRadius: 12,
      background: "#fff",
      cursor: feedback ? "default" : "pointer",
      textAlign: "left",
      transition: "all 0.2s ease",
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0)" : "translateY(8px)",
      color: "#18181b",
    }

    if (feedback && code === question.correct.code) {
      return { ...base, background: "#dcfce7", borderColor: "#22c55e", color: "#166534" }
    }

    if (feedback && code === selectedCode && code !== question.correct.code) {
      return { ...base, background: "#fef2f2", borderColor: "#ef4444", color: "#991b1b" }
    }

    if (!feedback) {
      return { ...base, cursor: "pointer" }
    }

    return { ...base, opacity: 0.5 }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 2,
            }}
          >
            Timer
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: parseInt(timeDisplay) <= 10 ? "#ef4444" : "#18181b",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {timeDisplay}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 2,
            }}
          >
            Score
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#2563eb",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {score}
          </div>
        </div>

        <StreakIndicator streak={streak} />
      </div>

      <div
        style={{
          background: "#fafafa",
          borderRadius: 16,
          padding: 28,
          marginBottom: 16,
          border: "1px solid #f4f4f5",
        }}
      >
        <FlagImage countryCode={question.correct.code} countryName={question.correct.name} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 12,
        }}
      >
        {question.options.map((country, i) => (
          <button
            key={country.code}
            onClick={() => !feedback && onSubmit(country.code)}
            disabled={!!feedback}
            style={{
              ...getButtonStyle(country.code),
              animationDelay: `${i * 0.06}s`,
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              if (!feedback) {
                e.currentTarget.style.borderColor = "#2563eb"
                e.currentTarget.style.background = "#f8faff"
              }
            }}
            onMouseLeave={(e) => {
              if (!feedback) {
                e.currentTarget.style.borderColor = "#e4e4e7"
                e.currentTarget.style.background = "#fff"
              }
            }}
          >
            {country.name}
          </button>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#a1a1aa",
        }}
      >
        {correctCount}/{totalAnswered} correct
      </div>
    </div>
  )
}
