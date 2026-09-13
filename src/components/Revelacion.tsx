import { useEffect, useRef } from 'react'
import { asset } from '../lib/asset'
import { MarcoArco } from './MarcoArco'

/** The clip is cut short so the ending never gives the secret away. */
const SEGUNDOS_RESERVADOS = 2

function estaEnElFinal(video: HTMLVideoElement): boolean {
  return Boolean(video.duration) && video.currentTime >= video.duration - SEGUNDOS_RESERVADOS
}

export function Revelacion() {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const elemento = video.current
    if (!elemento) return

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          const reproductor = entrada.target as HTMLVideoElement
          if (entrada.isIntersecting) {
            reproductor.muted = true
            reproductor.volume = 0
            reproductor.currentTime = 0
            void reproductor.play().catch(() => {})
          } else {
            reproductor.pause()
          }
        })
      },
      { threshold: 0.5 },
    )

    elemento.muted = true
    elemento.volume = 0
    observer.observe(elemento)

    return () => observer.disconnect()
  }, [])

  const frenarEnElFinal = (evento: React.SyntheticEvent<HTMLVideoElement>) => {
    const reproductor = evento.currentTarget
    reproductor.muted = true
    reproductor.volume = 0
    if (estaEnElFinal(reproductor)) reproductor.pause()
  }

  const alternarReproduccion = (evento: React.MouseEvent<HTMLVideoElement>) => {
    const reproductor = evento.currentTarget
    reproductor.muted = true
    reproductor.volume = 0

    if (reproductor.paused) {
      if (estaEnElFinal(reproductor)) reproductor.currentTime = 0
      void reproductor.play().catch(() => {})
    } else {
      reproductor.pause()
    }
  }

  return (
    <section className="seccion revelacion">
      <img
        src={asset('nube-pequena.webp')}
        alt=""
        className="decoracion parallax revelacion__nube-sup"
      />
      <img src={asset('estrella.webp')} alt="" className="decoracion revelacion__estrella" />
      <img
        src={asset('nube-ancha.webp')}
        alt=""
        className="decoracion parallax--medio revelacion__nube-inf"
      />

      <div className="revelacion__suelo">
        <img src={asset('nube-pequena.webp')} alt="" className="revelacion__suelo-nube-a" />
        <img src={asset('nube-ancha.webp')} alt="" className="revelacion__suelo-nube-b" />
        <img
          src={asset('oso-nino.webp')}
          alt="Osito con overol azul"
          className="revelacion__oso-nino"
        />
        <img src={asset('globos-crop.webp')} alt="" className="revelacion__globos" />
        <img
          src={asset('oso-nina.webp')}
          alt="Osita con vestido rosa"
          className="revelacion__oso-nina"
        />
        <img src={asset('nube-ancha.webp')} alt="" className="revelacion__suelo-nube-c" />
        <img src={asset('nube-pequena.webp')} alt="" className="revelacion__suelo-nube-d" />
      </div>

      <div className="revelacion__contenido">
        <p className="etiqueta">El secreto</p>

        <h2 className="titulo-imagen revelacion__titulo">
          <img src={asset('nino-o-nina.webp')} alt="¿Niño o niña?" />
        </h2>

        <MarcoArco className="revelacion__marco" decoracion="estrellas">
          <video
            ref={video}
            className="revelacion__video"
            src={asset('revelacion.mp4')}
            muted
            playsInline
            preload="metadata"
            onTimeUpdate={frenarEnElFinal}
            onClick={alternarReproduccion}
          />
        </MarcoArco>

        <p className="texto-cuerpo revelacion__texto">
          Ni nosotros lo sabemos todavía. El sobre permanece cerrado hasta la tarde del 7 de
          noviembre, y lo abriremos contigo, en el Club Nativos.
        </p>

        <div className="revelacion__vestimenta">
          <span className="chip-vestimenta">Dress code blanco</span>
        </div>
      </div>

    </section>
  )
}
