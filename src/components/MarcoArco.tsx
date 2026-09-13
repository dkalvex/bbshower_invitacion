import type { ReactNode } from 'react'
import { asset } from '../lib/asset'

export type DecoracionMarco = 'nubes' | 'estrellas' | 'ninguna'

type Props = {
  children: ReactNode
  /** Sizes the frame; the arch and its decorations scale from it. */
  className?: string
  /** Which set of ornaments interrupts the outline. */
  decoracion?: DecoracionMarco
}

/**
 * Arch-shaped frame: the image is masked into a rounded arch, a thin line
 * traces it just outside, and ornaments interrupt that line so the frame reads
 * as drawn rather than as a box.
 */
export function MarcoArco({ children, className, decoracion = 'nubes' }: Props) {
  return (
    <div className={className ? `marco-arco ${className}` : 'marco-arco'}>
      <div className="marco-arco__ventana">{children}</div>

      {decoracion === 'nubes' && (
        <>
          <img
            src={asset('nube-ancha.webp')}
            alt=""
            className="marco-arco__nube marco-arco__nube--der"
          />
          <img
            src={asset('nube-pequena.webp')}
            alt=""
            className="marco-arco__nube marco-arco__nube--izq"
          />
          <img
            src={asset('nube-pequena.webp')}
            alt=""
            className="marco-arco__nube marco-arco__nube--baja"
          />
          <img src={asset('oso-lazo.webp')} alt="" className="marco-arco__oso" />
        </>
      )}

      {decoracion === 'estrellas' && (
        <>
          <img
            src={asset('estrella.webp')}
            alt=""
            className="marco-arco__estrella marco-arco__estrella--a"
          />
          <img
            src={asset('estrella.webp')}
            alt=""
            className="marco-arco__estrella marco-arco__estrella--b"
          />
          <img
            src={asset('estrella.webp')}
            alt=""
            className="marco-arco__estrella marco-arco__estrella--c"
          />
          <img
            src={asset('estrella.webp')}
            alt=""
            className="marco-arco__estrella marco-arco__estrella--d"
          />
          <img src={asset('coche.webp')} alt="" className="marco-arco__coche" />
        </>
      )}
    </div>
  )
}
