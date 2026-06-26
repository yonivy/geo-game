import { useEffect, useState } from "react"

interface Props {
  score: number
  correctCount: number
  totalAnswered: number
  onPlayAgain: () => void
}

export function ResultScreen({ score, correctCount, totalAnswered, onPlayAgain }: Props) {
  const [visible, setVisible] = useState(false)
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return
    const duration = 800
    const steps = 30
    const increment = score / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= score) {
        setDisplayScore(score)
        clearInterval(interval)
      } else {
        setDisplayScore(Math.round(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [visible, score])

  async function handleShare() {
    const text = `GeoGame: I scored ${score} points (${correctCount}/${totalAnswered} correct)! Can you beat my score? 🌍`
    if (navigator.share) {
      try {
        await navigator.share({ title: "GeoGame", text })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text)
      alert("Score copied to clipboard!")
    }
  }

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
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          marginBottom: 20,
          color: "#fff",
        }}
      >
        ⏰
      </div>

      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 4,
          color: "#18181b",
        }}
      >
        Time's Up!
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#71717a",
          marginBottom: 32,
        }}
      >
        Here's how you did
      </p>

      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: "#2563eb",
          lineHeight: 1,
          marginBottom: 8,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {displayScore}
      </div>
      <p
        style={{
          fontSize: 14,
          color: "#71717a",
          marginBottom: 8,
        }}
      >
        points
      </p>

      <div
        style={{
          display: "flex",
          gap: 32,
          marginBottom: 40,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#22c55e",
            }}
          >
            {correctCount}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#a1a1aa",
            }}
          >
            Correct
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#18181b",
            }}
          >
            {totalAnswered}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#a1a1aa",
            }}
          >
            Total
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color:
                correctCount === 0
                  ? "#a1a1aa"
                  : correctCount / totalAnswered > 0.7
                    ? "#22c55e"
                    : "#f59e0b",
            }}
          >
            {totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0}%
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#a1a1aa",
            }}
          >
            Accuracy
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
          maxWidth: 280,
        }}
      >
        <button
          onClick={onPlayAgain}
          style={{
            padding: "16px 48px",
            fontSize: 17,
            fontWeight: 600,
            border: "none",
            borderRadius: 14,
            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
          }}
        >
          Play Again
        </button>

        <button
          onClick={handleShare}
          style={{
            padding: "14px 48px",
            fontSize: 15,
            fontWeight: 500,
            border: "2px solid #e4e4e7",
            borderRadius: 14,
            background: "#fff",
            color: "#18181b",
            cursor: "pointer",
          }}
        >
          Share Score
        </button>
      </div>
    </div>
  )
}
