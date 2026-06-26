const STORAGE_KEY = "geogame_scores"
const MAX_SCORES = 100

export interface ScoreEntry {
  id: number
  date: string
  score: number
  correctCount: number
  totalAnswered: number
  accuracy: number
}

export function loadScores(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveScore(entry: Omit<ScoreEntry, "id">): void {
  const scores = loadScores()
  const id = scores.length > 0 ? Math.max(...scores.map((s) => s.id)) + 1 : 1
  scores.push({ id, ...entry })
  scores.sort((a, b) => b.date.localeCompare(a.date))
  if (scores.length > MAX_SCORES) scores.length = MAX_SCORES
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
}

export function clearScores(): void {
  localStorage.removeItem(STORAGE_KEY)
}
