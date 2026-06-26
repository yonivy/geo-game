export interface Country {
  code: string
  name: string
  continent: string
}

export interface Question {
  correct: Country
  options: Country[]
}

export interface AnswerRecord {
  question: Question
  selected: Country
  correct: boolean
}

export type GameStatus = "idle" | "playing" | "finished"
