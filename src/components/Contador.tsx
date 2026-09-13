import type { Countdown } from '../lib/countdown'

const UNIDADES: Array<{ clave: keyof Countdown; etiqueta: string }> = [
  { clave: 'dias', etiqueta: 'Días' },
  { clave: 'horas', etiqueta: 'Horas' },
  { clave: 'minutos', etiqueta: 'Min' },
  { clave: 'segundos', etiqueta: 'Seg' },
]

type Props = {
  cuenta: Countdown
}

export function Contador({ cuenta }: Props) {
  return (
    <div className="contador">
      {UNIDADES.map(({ clave, etiqueta }) => (
        <div className="contador__casilla" key={clave}>
          <div className="contador__numero">{cuenta[clave]}</div>
          <div className="contador__unidad">{etiqueta}</div>
        </div>
      ))}
    </div>
  )
}
