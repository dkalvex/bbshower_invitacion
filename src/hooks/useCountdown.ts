import { useEffect, useState } from 'react'
import { countdownFrom, nextEventDate, type Countdown } from '../lib/countdown'

export function useCountdown(target: Date = nextEventDate()): Countdown {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return countdownFrom(now, target.getTime())
}
