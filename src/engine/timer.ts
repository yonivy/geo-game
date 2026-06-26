export type TimerCallback = (timeRemaining: number) => void

export interface GameTimer {
  start: () => void
  stop: () => void
  getTimeRemaining: () => number
  isRunning: () => boolean
  isFinished: () => boolean
}

export function createTimer(
  durationMs: number,
  onTick: TimerCallback,
  onFinish: () => void,
): GameTimer {
  let timeRemaining = durationMs
  let running = false
  let intervalId: ReturnType<typeof setInterval> | null = null

  function start() {
    if (running) return
    running = true
    intervalId = setInterval(() => {
      timeRemaining = Math.max(0, timeRemaining - 100)
      onTick(timeRemaining)
      if (timeRemaining <= 0) {
        stop()
        onFinish()
      }
    }, 100)
  }

  function stop() {
    running = false
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function getTimeRemaining() {
    return timeRemaining
  }

  function isRunning() {
    return running
  }

  function isFinished() {
    return timeRemaining <= 0
  }

  return { start, stop, getTimeRemaining, isRunning, isFinished }
}

export function formatTime(ms: number): string {
  const seconds = Math.ceil(ms / 1000)
  return `${seconds}s`
}
