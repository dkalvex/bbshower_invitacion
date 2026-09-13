import { asset } from '../lib/asset'

type Globo = {
  /** Horizontal position, in % of the viewport width. */
  x: number
  /** Width, in vw. */
  ancho: number
  /** Seconds for one full climb. */
  duracion: number
  /** Negative values start the climb part-way up, so the sky is never empty. */
  retraso: number
  opacidad: number
  /** Sideways drift over the climb, in vw. */
  deriva: number
  /** Size at the top of the climb, relative to the start: below 1 it recedes. */
  escala: number
}

// Big and slow reads as near, small and quick as far, and every balloon
// shrinks on the way up so the climb looks like distance rather than lift.
const GLOBOS: Globo[] = [
  { x: 7, ancho: 9, duracion: 27, retraso: -4, opacidad: 0.5, deriva: 3, escala: 0.5 },
  { x: 26, ancho: 3.5, duracion: 38, retraso: -21, opacidad: 0.32, deriva: -2, escala: 0.82 },
  { x: 48, ancho: 5.5, duracion: 33, retraso: -12, opacidad: 0.38, deriva: 2.5, escala: 0.66 },
  { x: 70, ancho: 8, duracion: 24, retraso: -17, opacidad: 0.46, deriva: -3, escala: 0.55 },
  { x: 88, ancho: 4.5, duracion: 41, retraso: -7, opacidad: 0.3, deriva: 2, escala: 0.78 },
]

/**
 * Hot air balloons drifting up across the whole window.
 *
 * The layer is `position: fixed`, so it stays put while the page scrolls
 * behind it. It must sit outside every section: the hero declares
 * `container-type: size`, which would make it the containing block for any
 * fixed descendant and pin the balloons to the hero instead of the window.
 */
export function Globos() {
  return (
    <div className="globos-fondo" aria-hidden="true">
      {GLOBOS.map((globo, indice) => (
        <img
          key={indice}
          src={asset('globo-aerostatico.webp')}
          alt=""
          className="globos-fondo__globo"
          style={{
            left: `${globo.x}%`,
            // Floor and cap scale WITH each balloon: flat px limits would
            // collapse every balloon to the same size on a narrow window.
            width: `clamp(${(globo.ancho * 4.5).toFixed(0)}px, ${globo.ancho}vw, ${(
              globo.ancho * 16
            ).toFixed(0)}px)`,
            animationDuration: `${globo.duracion}s`,
            animationDelay: `${globo.retraso}s`,
            ['--opacidad' as string]: globo.opacidad,
            ['--deriva' as string]: `${globo.deriva}vw`,
            ['--escala' as string]: globo.escala,
          }}
        />
      ))}
    </div>
  )
}
