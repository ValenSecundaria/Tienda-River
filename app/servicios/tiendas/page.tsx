import type React from "react"

const Tiendas: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Tiendas</h1>
      <p>
        Encontrá nuestras tiendas físicas en todo el país. Visitanos para conocer nuestros productos de cerca y recibir
        asesoramiento personalizado de nuestro equipo.
      </p>
      <div className="row mt-4">
        <div className="col-md-6">
          <h3>Sucursal Centro</h3>
          <p>
            Av. Corrientes 1234, CABA
            <br />
            Lunes a Viernes: 9:00 - 20:00
            <br />
            Sábados: 10:00 - 18:00
          </p>
        </div>
        <div className="col-md-6">
          <h3>Sucursal Palermo</h3>
          <p>
            Av. Santa Fe 5678, CABA
            <br />
            Lunes a Viernes: 10:00 - 21:00
            <br />
            Sábados: 10:00 - 19:00
          </p>
        </div>
      </div>
    </div>
  )
}

export default Tiendas
