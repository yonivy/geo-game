import { useEffect, useRef, useState } from "react"

interface Props {
  streak: number
}

export function StreakIndicator({ streak }: Props) {
  const [animating, setAnimating] = useState(false)
  const prevStreak = useRef(streak)

  useEffect(() => {
    if (streak > prevStreak.current) {
      setAnimating(true)
      const t = setTimeout(() => setAnimating(false), 400)
      prevStreak.current = streak
      return () => clearTimeout(t)
    }
    if (streak === 0 && prevStreak.current > 0) {
      prevStreak.current = 0
    }
  }, [streak])

  const hue = streak > 15 ? 25 : streak > 8 ? 40 : streak > 4 ? 55 : streak > 0 ? 120 : 0

  return (
    <div style={{ textAlign: "right" }}>
      <div
        style={{
          fontSize: 12,
          color: "#a1a1aa",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 2,
        }}
      >
        Streak
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: streak > 0 ? `hsl(${hue}, 70%, 40%)` : "#a1a1aa",
          transform: animating ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s",
        }}
      >
        {streak > 0 ? `🔥 ${streak}` : "—"}
      </div>
    </div>
  )
}
