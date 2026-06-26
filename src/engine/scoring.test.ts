import { describe, it, expect } from "vitest"
import { calculateMultiplier, calculatePoints } from "./scoring"

describe("calculateMultiplier", () => {
  it("returns 1x for streak of 0", () => {
    expect(calculateMultiplier(0)).toBe(1)
  })

  it("returns 1.5x for streak of 1", () => {
    expect(calculateMultiplier(1)).toBe(1.5)
  })

  it("returns 6x for streak of 10", () => {
    expect(calculateMultiplier(10)).toBe(6)
  })
})

describe("calculatePoints", () => {
  it("awards 100 points for first correct answer", () => {
    expect(calculatePoints(0)).toBe(100)
  })

  it("awards 150 points for streak of 1", () => {
    expect(calculatePoints(1)).toBe(150)
  })

  it("awards 600 points for streak of 10", () => {
    expect(calculatePoints(10)).toBe(600)
  })
})
