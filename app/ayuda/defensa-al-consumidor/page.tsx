// DefensaAlConsumidor.tsx
import type React from "react";

const DefensaAlConsumidor: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Defensa al Consumidor</h1>
      <p>
        En MUNDO-RIVER buscamos garantizar tus derechos como consumidor. A continuación te explicamos las garantías, la ley aplicable y cómo proceder si tenés un reclamo.
      </p>

      <div className="mt-4">
        <h3>1. Garantía de Productos</h3>
        <p>
          Todos nuestros productos cuentan con una garantía de 30 días por defecto de fábrica. Si encontrás un problema, podrás gestionar un cambio o reparación sin costo adicional, siempre que presentes el comprobante de compra.
        </p>
      </div>

      <div className="mt-4">
        <h3>2. Ley de Defensa del Consumidor</h3>
        <p>
          Según la Ley Nacional 24.240, tenés derecho a recibir productos en perfecto estado, a la información clara sobre precios y características, y a un trato digno. Cualquier incumplimiento puede ser denunciado ante el organismo correspondiente.
        </p>
      </div>

      <div className="mt-4">
        <h3>3. Procedimiento de Reclamo</h3>
        <ol>
          <li>
            Contactá a nuestro servicio de atención al cliente a través de <a href="/contactanos" className="fw-bold">Contactanos</a>.
          </li>
          <li>
            Proporcioná tu número de pedido y una breve descripción del problema.
          </li>
          <li>
            Nuestro equipo evaluará tu reclamo y te ofrecerá una solución dentro de los 10 días hábiles siguientes.
          </li>
        </ol>
      </div>

      <div className="alert alert-info mt-4">
        Para más información sobre tus derechos, podés consultar la página oficial de la Dirección Nacional de Defensa del Consumidor.
      </div>
    </div>
  );
};

export default DefensaAlConsumidor;
