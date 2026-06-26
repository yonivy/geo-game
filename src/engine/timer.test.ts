import { describe, it, expect } from "vitest"
import { formatTime } from "./timer"

describe("formatTime", () => {
  it("formats 90000ms as 90s", () => {
    expect(formatTime(90_000)).toBe("90s")
  })

  it("formats 1000ms as 1s", () => {
    expect(formatTime(1000)).toBe("1s")
  })

  it("formats 500ms as 1s (ceil)", () => {
    expect(formatTime(500)).toBe("1s")
  })

  it("formats 0ms as 0s", () => {
    expect(formatTime(0)).toBe("0s")
  })
})
