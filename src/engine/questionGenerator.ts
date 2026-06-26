import type { Question } from "../types"
import { countries } from "../data/countries"

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function generateQuestion(usedCodes: Set<string>): Question | null {
  const available = countries.filter((c) => !usedCodes.has(c.code))

  if (available.length < 4) return null

  const correct = available[Math.floor(Math.random() * available.length)]
  const distractors = shuffle(available.filter((c) => c.code !== correct.code)).slice(0, 3)

  const options = shuffle([correct, ...distractors])

  return { correct, options }
}

export function generateInitialQuestions(count: number): Question[] {
  const usedCodes = new Set<string>()
  const questions: Question[] = []

  for (let i = 0; i < count; i++) {
    const q = generateQuestion(usedCodes)
    if (!q) break
    usedCodes.add(q.correct.code)
    questions.push(q)
  }

  return questions
}
