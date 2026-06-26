const BASE_POINTS = 100
const STREAK_MULTIPLIER_BASE = 1
const STREAK_MULTIPLIER_PER_STEP = 0.5

export function calculateMultiplier(streak: number): number {
  return STREAK_MULTIPLIER_BASE + streak * STREAK_MULTIPLIER_PER_STEP
}

export function calculatePoints(streak: number): number {
  return Math.round(BASE_POINTS * calculateMultiplier(streak))
}
