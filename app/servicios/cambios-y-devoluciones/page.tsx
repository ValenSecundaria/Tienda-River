    import type React from "react"

const CambiosYDevoluciones: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Cambios y Devoluciones</h1>
      <p>
        Tenés hasta 30 días para cambiar o devolver tu compra. Conocé todos los detalles de nuestra política de cambios
        y devoluciones.
      </p>

      <div className="mt-4">
        <h3>Condiciones para cambios:</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">El producto debe estar en perfectas condiciones</li>
          <li className="list-group-item">Conservar etiquetas originales</li>
          <li className="list-group-item">Presentar comprobante de compra</li>
          <li className="list-group-item">Plazo máximo: 30 días desde la compra</li>
        </ul>
      </div>

      <div className="mt-4">
        <h3>¿Cómo realizar un cambio?</h3>
        <p>
          Podés acercarte a cualquiera de nuestras sucursales o contactarnos por email a cambios@tienda.com para
          coordinar el envío.
        </p>
      </div>
    </div>
  )
}

export default CambiosYDevoluciones
