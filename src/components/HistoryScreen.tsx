import { useEffect, useState } from "react"
import { loadScores, clearScores, type ScoreEntry } from "../utils/scoreHistory"

interface Props {
  onBack: () => void
}

export function HistoryScreen({ onBack }: Props) {
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setScores(loadScores())
    setVisible(true)
  }, [])

  function handleClear() {
    clearScores()
    setScores([])
  }

  if (scores.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
          padding: 24,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div
          style={{
            fontSize: 36,
            marginBottom: 16,
          }}
        >
          📋
        </div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 8,
            color: "#18181b",
          }}
        >
          No results yet
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#71717a",
            marginBottom: 32,
          }}
        >
          Play a game to start building your history.
        </p>
        <button
          onClick={onBack}
          style={{
            padding: "14px 48px",
            fontSize: 16,
            fontWeight: 600,
            border: "2px solid #e4e4e7",
            borderRadius: 14,
            background: "#fff",
            color: "#18181b",
            cursor: "pointer",
          }}
        >
          Back to Menu
        </button>
      </div>
    )
  }

  const bestScore = Math.max(...scores.map((s) => s.score))
  const avgAccuracy = Math.round(
    scores.reduce((sum, s) => sum + s.accuracy, 0) / scores.length,
  )

  return (
    <div
      style={{
        padding: "24px 0",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{
            padding: "8px 12px",
            fontSize: 20,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "#2563eb",
            fontWeight: 600,
          }}
        >
          ← Back
        </button>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#18181b",
            marginLeft: 8,
          }}
        >
          Past Results
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#f4f4f5",
            borderRadius: 12,
            padding: 16,
            textAlign: "center",
          }}
        >
          <div
            style={{ fontSize: 24, fontWeight: 700, color: "#2563eb" }}
          >
            {scores.length}
          </div>
          <div style={{ fontSize: 12, color: "#a1a1aa", textTransform: "uppercase" }}>
            Games
          </div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#f4f4f5",
            borderRadius: 12,
            padding: 16,
            textAlign: "center",
          }}
        >
          <div
            style={{ fontSize: 24, fontWeight: 700, color: "#16a34a" }}
          >
            {bestScore}
          </div>
          <div style={{ fontSize: 12, color: "#a1a1aa", textTransform: "uppercase" }}>
            Best Score
          </div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#f4f4f5",
            borderRadius: 12,
            padding: 16,
            textAlign: "center",
          }}
        >
          <div
            style={{ fontSize: 24, fontWeight: 700, color: "#f59e0b" }}
          >
            {avgAccuracy}%
          </div>
          <div style={{ fontSize: 12, color: "#a1a1aa", textTransform: "uppercase" }}>
            Avg Accuracy
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 24,
        }}
      >
        {scores.map((entry) => (
          <div
            key={entry.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#fafafa",
              borderRadius: 10,
              border: "1px solid #f4f4f5",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#18181b",
                }}
              >
                {entry.score} pts
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#a1a1aa",
                }}
              >
                {entry.correctCount}/{entry.totalAnswered} · {entry.accuracy}%
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#a1a1aa",
              }}
            >
              {new Date(entry.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleClear}
        style={{
          padding: "12px 24px",
          fontSize: 14,
          fontWeight: 500,
          border: "1px solid #fef2f2",
          borderRadius: 10,
          background: "#fef2f2",
          color: "#991b1b",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Clear History
      </button>
    </div>
  )
}
