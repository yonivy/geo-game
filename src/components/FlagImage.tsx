import { useState } from "react"

interface Props {
  countryCode: string
  countryName: string
}

export function FlagImage({ countryCode, countryName }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: 240,
          height: 160,
          background: "#f4f4f5",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#a1a1aa",
          fontSize: 14,
          margin: "0 auto",
        }}
      >
        Flag unavailable
      </div>
    )
  }

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 240, margin: "0 auto" }}>
      {!loaded && (
        <div
          style={{
            width: "100%",
            height: 160,
            background: "#f4f4f5",
            borderRadius: 8,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      )}
      <img
        src={`/flags/${countryCode}.svg`}
        alt={`Flag of ${countryName}`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 8,
          display: loaded ? "block" : "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      />
    </div>
  )
}
