import { asset } from '../lib/asset'
import { useCountdown } from '../hooks/useCountdown'
import { Contador } from './Contador'
import { MarcoArco } from './MarcoArco'

export function Hero() {
  const cuenta = useCountdown()

  return (
    <section className="hero">
      <img src={asset('estrella.webp')} alt="" className="hero__estrella hero__estrella--1" />
      <img src={asset('estrella.webp')} alt="" className="hero__estrella hero__estrella--2" />
      <img src={asset('estrella.webp')} alt="" className="hero__estrella hero__estrella--3" />
      <img src={asset('estrella.webp')} alt="" className="hero__estrella hero__estrella--4" />

      <div className="hero__cielo">
        <img src={asset('nube-ancha.webp')} alt="" className="hero__nube-ancha-izq" />
        <img src={asset('nube-ancha.webp')} alt="" className="hero__nube-extra-a" />
        <img src={asset('nube-pequena.webp')} alt="" className="hero__nube-a" />
        <img src={asset('nube-pequena.webp')} alt="" className="hero__nube-extra-b" />
        <img src={asset('nube-pequena.webp')} alt="" className="hero__nube-b" />
        <img src={asset('nube-pequena.webp')} alt="" className="hero__nube-extra-c" />
        <img src={asset('luna.webp')} alt="Luna dormida entre nubes" className="hero__luna" />
        <img src={asset('nube-pequena.webp')} alt="" className="hero__nube-extra-d" />
        <img src={asset('nube-pequena.webp')} alt="" className="hero__nube-c" />
        <img src={asset('nube-pequena.webp')} alt="" className="hero__nube-extra-e" />
        <img src={asset('nube-pequena.webp')} alt="" className="hero__nube-d" />
        <img src={asset('nube-ancha.webp')} alt="" className="hero__nube-extra-f" />
        <img src={asset('nube-ancha.webp')} alt="" className="hero__nube-ancha-der" />
      </div>

      <div className="hero__contenido">
        <MarcoArco className="hero__foto">
          <img
            src={asset('foto-pareja.webp')}
            alt="Orlando y Mary con las manos sobre la panza"
          />
        </MarcoArco>

        <h1 className="hero__nombres">
          <img src={asset('nombres.webp')} alt="Orlando &amp; Mary" />
        </h1>

        <p className="hero__intro">
          Acompañanos a celebrar la llegada de nuestro bebé y a descubrir, juntos, el secreto mejor
          guardado.
        </p>

        <div className="hero__fecha">
          <span className="hero__fecha-linea" />
          <span className="hero__fecha-texto">7 de noviembre · 4:00 p.m.</span>
          <span className="hero__fecha-linea" />
        </div>

        <Contador cuenta={cuenta} />

        <a href="#rsvp" className="boton-relleno hero__cta">
          Confirmar asistencia
        </a>
      </div>
    </section>
  )
}
