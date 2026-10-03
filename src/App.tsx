import { Hero } from './components/Hero'
import { Revelacion } from './components/Revelacion'
import { Lugar } from './components/Lugar'
import { Rsvp } from './components/Rsvp'
import { Sobres } from './components/Sobres'
import { Globos } from './components/Globos'
import { Musica } from './components/Musica'
import { useScrollProgress } from './hooks/useScrollProgress'

export function App() {
  useScrollProgress()

  return (
    <>
      <Hero />
      <Revelacion />
      <Lugar />
      <Sobres />
      <Rsvp />
      <Globos />
      <Musica />
    </>
  )
}
