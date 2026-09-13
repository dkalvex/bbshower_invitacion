import { asset } from '../lib/asset'

const MAPA_EMBED = 'https://www.google.com/maps?q=Club+Nativos&output=embed'
const MAPA_ENLACE = 'https://www.google.com/maps/search/?api=1&query=Club+Nativos'

export function Lugar() {
  return (
    <section className="seccion lugar">
      <img
        src={asset('nube-ancha.webp')}
        alt=""
        className="decoracion parallax--medio lugar__nube-sup"
      />
      <img src={asset('estrella.webp')} alt="" className="decoracion lugar__estrella" />
      <img src={asset('nube-pequena.webp')} alt="" className="decoracion parallax lugar__nube-inf" />

      <div className="nubes-piso">
        <img src={asset('nube-ancha.webp')} alt="" />
        <img src={asset('nube-pequena.webp')} alt="" />
        <img src={asset('nube-ancha.webp')} alt="" />
      </div>

      <div className="lugar__contenido">
        <div className="lugar__encabezado">
          <p className="etiqueta">Dónde</p>
          <h2 className="titulo-imagen lugar__titulo">
            <img src={asset('club-nativos.webp')} alt="Club Nativos" />
          </h2>
          <p className="lugar__subtitulo">Sábado 7 de noviembre · 4:00 p.m.</p>
        </div>

        <div className="lugar__columnas">
          <div className="lugar__mapa">
            <iframe src={MAPA_EMBED} title="Mapa de Club Nativos" loading="lazy" />
          </div>

          <div className="lugar__ficha">
            <div>
              <p className="lugar__dato-etiqueta">Lugar</p>
              <p className="lugar__dato-nombre">Club Nativos</p>
            </div>
            <div>
              <p className="lugar__dato-etiqueta">Hora de llegada</p>
              <p className="lugar__dato-texto">4:00 p.m.</p>
            </div>
            <div>
              <p className="lugar__dato-etiqueta">Vestimenta</p>
              <p className="lugar__dato-texto">Elegante, en blanco.</p>
            </div>

            <a
              href={MAPA_ENLACE}
              target="_blank"
              rel="noopener"
              className="boton-contorno lugar__boton"
            >
              Abrir en mapas
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
