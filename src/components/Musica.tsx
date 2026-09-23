import { useEffect, useRef, useState } from 'react'
import { asset } from '../lib/asset'

/** Low enough that the song sits under the page, not over it. */
const VOLUMEN = 0.35

/**
 * Everything worth retrying on. The first four grant user activation, which is
 * what actually unlocks sound; the rest never do, but retrying on them is free
 * and covers browsers that loosen the rule on their own.
 */
const SENALES = ['pointerdown', 'touchstart', 'touchend', 'keydown', 'wheel', 'scroll'] as const

/**
 * Background song.
 *
 * No browser lets unmuted audio start on its own, but muted audio may autoplay
 * anywhere. So the song really is rolling from the moment the page loads — it
 * just starts silent, and the first sign of life from the reader turns the
 * sound on mid-phrase, with nothing to press and no delay for loading.
 */
export function Musica() {
  const audio = useRef<HTMLAudioElement>(null)
  const [sonando, setSonando] = useState(false)

  useEffect(() => {
    const elemento = audio.current
    if (!elemento) return

    let intentando = false

    const olvidarSenales = () => {
      SENALES.forEach((senal) => document.removeEventListener(senal, alPrimerSigno, true))
    }

    /** Keeps the song rolling silently, so sound can join without a gap. */
    const seguirEnSilencio = () => {
      elemento.muted = true
      void elemento.play().catch(() => {})
    }

    const pedirSonido = () => {
      if (intentando) return
      intentando = true

      elemento.muted = false
      elemento.volume = VOLUMEN

      elemento
        .play()
        .then(() => {
          intentando = false
          // The browser can answer by re-muting or pausing instead of throwing.
          if (elemento.muted || elemento.paused) seguirEnSilencio()
          else olvidarSenales()
        })
        .catch(() => {
          intentando = false
          seguirEnSilencio()
        })
    }

    function alPrimerSigno(evento: Event) {
      // The button owns its own gesture. Without this guard its `pointerdown`
      // would turn the sound on and the `click` right after would read the
      // audio as playing and pause it, so the first tap did nothing at all.
      const enElBoton = evento.target instanceof Element && evento.target.closest('.musica')
      if (!enElBoton) pedirSonido()
    }

    seguirEnSilencio()
    pedirSonido()

    SENALES.forEach((senal) =>
      document.addEventListener(senal, alPrimerSigno, { capture: true, passive: true }),
    )

    return olvidarSenales
  }, [])

  /** Audible means playing *and* unmuted: rolling in silence is not sound. */
  const sincronizar = () => {
    const elemento = audio.current
    if (elemento) setSonando(!elemento.paused && !elemento.muted)
  }

  const alternar = () => {
    const elemento = audio.current
    if (!elemento) return

    if (elemento.paused || elemento.muted) {
      elemento.muted = false
      elemento.volume = VOLUMEN
      void elemento.play().catch(() => {})
    } else {
      elemento.pause()
    }
  }

  return (
    <>
      <audio
        ref={audio}
        src={asset('te-esperaba.mp3')}
        autoPlay
        muted
        loop
        preload="auto"
        onPlay={sincronizar}
        onPause={sincronizar}
        onVolumeChange={sincronizar}
      />

      <button
        type="button"
        className={`musica${sonando ? ' musica--sonando' : ''}`}
        onClick={alternar}
        aria-label={sonando ? 'Pausar la música' : 'Reproducir la música'}
        aria-pressed={sonando}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M9 18V5.5l10-2V16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6.5" cy="18" r="2.5" fill="currentColor" />
          <circle cx="16.5" cy="16" r="2.5" fill="currentColor" />
          {!sonando && (
            <path
              d="M3.5 3.5l17 17"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>
    </>
  )
}
