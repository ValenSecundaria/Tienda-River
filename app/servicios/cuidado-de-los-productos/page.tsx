import type React from "react"

const CuidadoDeLosProductos: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Cuidado de los Productos</h1>
      <p>Seguí nuestras recomendaciones para mantener tus productos en perfecto estado y prolongar su vida útil.</p>

      <div className="row mt-4">
        <div className="col-md-6">
          <h3>Cuidado de Ropa</h3>
          <ul className="list-unstyled">
            <li>
              <strong>Lavado:</strong> Seguir instrucciones de la etiqueta
            </li>
            <li>
              <strong>Secado:</strong> Evitar exposición directa al sol
            </li>
            <li>
              <strong>Planchado:</strong> Usar temperatura adecuada
            </li>
            <li>
              <strong>Almacenamiento:</strong> Colgar o doblar correctamente
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Cuidado de Calzado</h3>
          <ul className="list-unstyled">
            <li>
              <strong>Limpieza:</strong> Usar productos específicos
            </li>
            <li>
              <strong>Secado:</strong> Dejar secar naturalmente
            </li>
            <li>
              <strong>Mantenimiento:</strong> Usar hormas para conservar forma
            </li>
            <li>
              <strong>Protección:</strong> Aplicar impermeabilizante
            </li>
          </ul>
        </div>
      </div>

      <div className="alert alert-info mt-4">
        <strong>Tip:</strong> Un buen cuidado de tus productos no solo los mantiene como nuevos, sino que también es una
        forma de cuidar el medio ambiente.
      </div>
    </div>
  )
}

export default CuidadoDeLosProductos
