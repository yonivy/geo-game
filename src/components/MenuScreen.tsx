import { useEffect, useState } from "react"

interface Props {
  onStart: () => void
}

export function MenuScreen({ onStart }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        padding: 24,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: "linear-gradient(135deg, #2563eb, #7c3aed)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          marginBottom: 24,
          color: "#fff",
        }}
      >
        🌍
      </div>

      <h1
        style={{
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          marginBottom: 8,
          color: "#18181b",
        }}
      >
        GeoGame
      </h1>

      <p
        style={{
          fontSize: 16,
          color: "#71717a",
          lineHeight: 1.5,
          maxWidth: 280,
          marginBottom: 40,
        }}
      >
        Identify the flag. Build your streak. Beat the clock.
      </p>

      <button
        onClick={onStart}
        style={{
          padding: "16px 56px",
          fontSize: 17,
          fontWeight: 600,
          border: "none",
          borderRadius: 14,
          background: "linear-gradient(135deg, #2563eb, #3b82f6)",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)"
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.4)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(37,99,235,0.3)"
        }}
      >
        Start Game
      </button>
    </div>
  )
}
