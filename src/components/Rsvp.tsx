import { useState, type FormEvent } from 'react'
import { asset } from '../lib/asset'
import { GOOGLE_FORM, RSVP_STORAGE_KEY } from '../config'

type Apuesta = '' | 'Niño' | 'Niña'

type Confirmacion = {
  nombre: string
  telefono: string
  apuesta: Apuesta
  mensaje: string
  fecha: string
}

const AVISO_SIN_HOJA =
  'Las confirmaciones se guardan en este dispositivo hasta conectar la hoja de cálculo.'

async function enviarAGoogleForm(confirmacion: Confirmacion): Promise<void> {
  if (!GOOGLE_FORM?.action) return

  const datos = new FormData()
  datos.append(GOOGLE_FORM.campos.nombre, confirmacion.nombre)
  datos.append(GOOGLE_FORM.campos.telefono, confirmacion.telefono)
  datos.append(GOOGLE_FORM.campos.apuesta, confirmacion.apuesta)
  datos.append(GOOGLE_FORM.campos.mensaje, confirmacion.mensaje)

  try {
    await fetch(GOOGLE_FORM.action, { method: 'POST', mode: 'no-cors', body: datos })
  } catch {
    // Google Forms answers opaquely; a network hiccup must not block the guest.
  }
}

function guardarLocalmente(confirmacion: Confirmacion): void {
  try {
    const previas = JSON.parse(localStorage.getItem(RSVP_STORAGE_KEY) ?? '[]') as Confirmacion[]
    previas.push(confirmacion)
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(previas))
  } catch {
    // Private browsing or a full quota should not break the confirmation.
  }
}

export function Rsvp() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [apuesta, setApuesta] = useState<Apuesta>('')
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [nombreEnviado, setNombreEnviado] = useState('')
  const [error, setError] = useState('')

  const enviado = nombreEnviado !== ''

  const confirmar = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const nombreLimpio = nombre.trim()
    if (!nombreLimpio) {
      setError('Escribe tu nombre para confirmar.')
      return
    }

    setEnviando(true)
    setError('')

    const confirmacion: Confirmacion = {
      nombre: nombreLimpio,
      telefono,
      apuesta,
      mensaje,
      fecha: new Date().toISOString(),
    }

    await enviarAGoogleForm(confirmacion)
    guardarLocalmente(confirmacion)

    setEnviando(false)
    setNombreEnviado(nombreLimpio.split(' ')[0])
  }

  const aviso = error || (GOOGLE_FORM?.action ? '' : AVISO_SIN_HOJA)

  return (
    <section id="rsvp" className="seccion rsvp">
      <img src={asset('coche.webp')} alt="" className="decoracion rsvp__coche" />
      <img src={asset('chupo.webp')} alt="" className="decoracion rsvp__chupo" />
      <img src={asset('nube-ancha.webp')} alt="" className="decoracion parallax rsvp__nube" />
      <img src={asset('estrella.webp')} alt="" className="decoracion rsvp__estrella" />

      <div className="rsvp__contenido">
        <p className="etiqueta">Confirma</p>
        <h2 className="titulo-imagen rsvp__titulo">
          <img src={asset('te-esperamos.webp')} alt="Te esperamos" />
        </h2>
        <p className="rsvp__plazo">Confirmar antes del 20 de octubre.</p>

        {enviado ? (
          <div className="rsvp__gracias">
            <img src={asset('tetero.webp')} alt="" />
            <p className="rsvp__gracias-titulo">¡Gracias, {nombreEnviado}!</p>
            <p className="rsvp__gracias-texto">
              Tu confirmación quedó registrada. Nos vemos el 7 de noviembre.
            </p>
          </div>
        ) : (
          <form className="rsvp__formulario" onSubmit={confirmar} noValidate>
            <div className="rsvp__fila">
              <label className="campo">
                Nombre y apellido
                <input
                  type="text"
                  value={nombre}
                  onChange={(evento) => setNombre(evento.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="name"
                />
              </label>

              <label className="campo">
                Teléfono
                <input
                  type="tel"
                  value={telefono}
                  onChange={(evento) => setTelefono(evento.target.value)}
                  placeholder="300 000 0000"
                  autoComplete="tel"
                />
              </label>
            </div>

            <div>
              <p className="rsvp__apuesta-titulo">Mi apuesta</p>
              <div className="rsvp__apuesta-opciones">
                <button
                  type="button"
                  className="chip-apuesta chip-apuesta--nino"
                  aria-pressed={apuesta === 'Niño'}
                  onClick={() => setApuesta('Niño')}
                >
                  Niño
                </button>
                <button
                  type="button"
                  className="chip-apuesta chip-apuesta--nina"
                  aria-pressed={apuesta === 'Niña'}
                  onClick={() => setApuesta('Niña')}
                >
                  Niña
                </button>
              </div>
            </div>

            <label className="campo">
              Mensaje para los papás
              <textarea
                rows={2}
                value={mensaje}
                onChange={(evento) => setMensaje(evento.target.value)}
                placeholder="Opcional"
              />
            </label>

            <button type="submit" className="boton-relleno rsvp__enviar" disabled={enviando}>
              {enviando ? 'Enviando…' : 'Enviar confirmación'}
            </button>

            {aviso && (
              <p className={`rsvp__aviso${error ? ' rsvp__aviso--error' : ''}`} role="status">
                {aviso}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
