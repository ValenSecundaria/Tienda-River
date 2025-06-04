import type React from "react";

const SeguimientoEnvio: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Seguimiento de Envío</h1>
      <p>
        Ingresá tu número de seguimiento para ver el estado actual de tu
        pedido. Podrás conocer en qué punto del proceso se encuentra y la fecha
        estimada de entrega.
      </p>

      <div className="mt-4">
        <form className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="trackingNumber" className="col-form-label">
              Número de Seguimiento:
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="trackingNumber"
              className="form-control"
              placeholder="Ej: XY123456789AR"
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Consultar
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5">
        <h3>Estado del Envío</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Fecha/Hora</th>
                <th>Ubicación</th>
                <th>Evento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01/06/2025 10:15</td>
                <td>Centro de Distribución - Buenos Aires</td>
                <td>Pedido recibido</td>
              </tr>
              <tr>
                <td>02/06/2025 08:30</td>
                <td>Centro de Clasificación - Rosario</td>
                <td>En tránsito</td>
              </tr>
              <tr>
                <td>03/06/2025 12:00</td>
                <td>Sucursal Local - Córdoba</td>
                <td>En reparto</td>
              </tr>
              <tr>
                <td>03/06/2025 15:45</td>
                <td>Destinatario</td>
                <td>Entregado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="alert alert-info mt-4">
        <strong>Nota:</strong> Estos datos son de ejemplo. Una vez que ingreses
        tu número real de seguimiento, verás la información actualizada por la
        empresa de mensajería.
      </div>
    </div>
  );
};

export default SeguimientoEnvio;
