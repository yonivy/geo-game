import { describe, it, expect } from "vitest"
import { countries } from "../data/countries"
import { generateQuestion, generateInitialQuestions } from "./questionGenerator"

describe("generateQuestion", () => {
  it("returns a question with 4 unique options", () => {
    const q = generateQuestion(new Set())
    expect(q).not.toBeNull()
    expect(q!.options).toHaveLength(4)

    const codes = q!.options.map((c) => c.code)
    expect(new Set(codes).size).toBe(4)
  })

  it("includes the correct answer in the options", () => {
    const q = generateQuestion(new Set())
    expect(q!.options).toContainEqual(q!.correct)
  })

  it("returns null when fewer than 4 countries remain", () => {
    const allCodes = countries.map((c) => c.code)
    const used = new Set(allCodes.slice(0, allCodes.length - 2))
    const result = generateQuestion(used)
    expect(result).toBeNull()
  })
})

describe("generateInitialQuestions", () => {
  it("generates the requested number of questions", () => {
    const questions = generateInitialQuestions(10)
    expect(questions).toHaveLength(10)
  })

  it("generates unique questions (no repeat correct answers)", () => {
    const questions = generateInitialQuestions(50)
    const codes = questions.map((q) => q.correct.code)
    expect(new Set(codes).size).toBe(50)
  })
})
