import { Hero } from './components/Hero'
import { Revelacion } from './components/Revelacion'
import { Lugar } from './components/Lugar'
import { Rsvp } from './components/Rsvp'
import { useScrollProgress } from './hooks/useScrollProgress'

export function App() {
  useScrollProgress()

  return (
    <>
      <Hero />
      <Revelacion />
      <Lugar />
      <Rsvp />
    </>
  )
}
