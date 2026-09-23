import { useEffect, useRef, useState } from 'react'
import { asset } from '../lib/asset'

/** Low enough that the song sits under the page, not over it. */
const VOLUMEN = 0.35

/** Gestures a browser accepts as the user unlocking audio playback. */
const GESTOS = ['pointerdown', 'keydown', 'touchstart'] as const

/**
 * Background song with a floating toggle.
 *
 * Browsers block unmuted autoplay, so the first `play()` almost always fails.
 * When it does we wait for the first gesture anywhere on the page and start
 * from there; the button stays as the explicit control either way.
 */
export function Musica() {
  const audio = useRef<HTMLAudioElement>(null)
  const [sonando, setSonando] = useState(false)

  useEffect(() => {
    const elemento = audio.current
    if (!elemento) return

    elemento.volume = VOLUMEN

    const olvidarGestos = () => {
      GESTOS.forEach((gesto) => document.removeEventListener(gesto, arrancarConElGesto))
    }

    // `once` only clears the gesture that fired, so the rest are dropped by hand.
    function arrancarConElGesto() {
      void elemento!.play().catch(() => {})
      olvidarGestos()
    }

    elemento.play().catch(() => {
      GESTOS.forEach((gesto) =>
        document.addEventListener(gesto, arrancarConElGesto, { once: true }),
      )
    })

    return olvidarGestos
  }, [])

  const alternar = () => {
    const elemento = audio.current
    if (!elemento) return

    if (elemento.paused) {
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
        loop
        preload="none"
        onPlay={() => setSonando(true)}
        onPause={() => setSonando(false)}
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
