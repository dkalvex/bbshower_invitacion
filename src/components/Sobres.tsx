import { asset } from '../lib/asset'

export function Sobres() {
  return (
    <section className="seccion sobres">
      <img src={asset('nube-ancha.webp')} alt="" className="decoracion parallax sobres__nube" />
      <img src={asset('estrella.webp')} alt="" className="decoracion sobres__estrella" />

      <div className="sobres__contenido">
        <div className="sobres__arco">
          <p className="etiqueta">Un detalle</p>

          <svg className="sobres__icono" viewBox="0 0 32 26" aria-hidden="true">
            <rect x="1" y="1" width="30" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M2 3l14 11L30 3" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M16 22c-3.2-2.3-5-3.9-5-5.6 0-1.3 1-2.2 2.2-2.2.9 0 1.6.5 2.8 1.6 1.2-1.1 1.9-1.6 2.8-1.6 1.2 0 2.2.9 2.2 2.2 0 1.7-1.8 3.3-5 5.6z"
              fill="currentColor"
            />
          </svg>

          <h2 className="sobres__titulo">Lluvia de sobres</h2>
          <span className="sobres__divisor" />

          <p className="texto-cuerpo">
            Tu presencia es lo más importante para nosotros y nos hace muy felices poder compartir
            este momento contigo. 🤍
          </p>
          <p className="texto-cuerpo">
            Si deseas tener un detalle con nuestro bebé, hemos elegido la lluvia de sobres como
            opción de regalo.
          </p>
          <p className="texto-cuerpo">
            Gracias por acompañarnos con tanto cariño en esta etapa tan especial de nuestra familia.
          </p>
        </div>
      </div>
    </section>
  )
}
