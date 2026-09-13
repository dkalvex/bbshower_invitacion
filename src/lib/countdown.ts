export type Countdown = {
  dias: string
  horas: string
  minutos: string
  segundos: string
}

const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE
const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR

/** The celebration: November 7th, 4:00 p.m. */
export function eventDateFor(year: number): Date {
  return new Date(year, 10, 7, 16, 0, 0)
}

export function nextEventDate(from: Date = new Date()): Date {
  const thisYear = eventDateFor(from.getFullYear())
  return from.getTime() <= thisYear.getTime()
    ? thisYear
    : eventDateFor(from.getFullYear() + 1)
}

export function countdownFrom(now: number, target: number): Countdown {
  const remaining = Math.max(0, target - now)
  const totalSeconds = Math.floor(remaining / 1000)
  const pad = (value: number) => String(value).padStart(2, '0')

  return {
    dias: pad(Math.floor(totalSeconds / SECONDS_PER_DAY)),
    horas: pad(Math.floor((totalSeconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR)),
    minutos: pad(Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)),
    segundos: pad(totalSeconds % SECONDS_PER_MINUTE),
  }
}
