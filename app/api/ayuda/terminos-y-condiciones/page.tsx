// TerminosYCondiciones.tsx
import type React from "react";

const TerminosYCondiciones: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Términos y Condiciones</h1>
      <p>
        Bienvenido a nuestra sección de Términos y Condiciones. Aquí encontrarás los lineamientos legales que regulan el uso de nuestro sitio web y los servicios que ofrecemos.
      </p>

      <div className="mt-4">
        <h3>1. Aceptación de los Términos</h3>
        <p>
          Al navegar y utilizar este sitio, aceptas cumplir con todos los términos y condiciones descritos a continuación. Si no estás de acuerdo con alguno de ellos, te pedimos que no continúes utilizando nuestros servicios.
        </p>
      </div>

      <div className="mt-4">
        <h3>2. Registro y Cuenta de Usuario</h3>
        <p>
          Para realizar compras, deberás registrarte proporcionando datos verídicos. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que se realicen bajo tu cuenta.
        </p>
      </div>

      <div className="mt-4">
        <h3>3. Política de Pagos</h3>
        <p>
          Aceptamos múltiples métodos de pago (tarjetas, transferencias, efectivo). El pago se procesará a través de pasarelas seguras. Hasta la confirmación del cobro, tu pedido no quedará confirmado.
        </p>
      </div>

      <div className="mt-4">
        <h3>4. Envíos y Entregas</h3>
        <p>
          Trabajamos con distintas empresas de mensajería. Los tiempos de entrega varían según la región. Consulta la sección de "Seguimiento de Envío" para conocer el estado de tu pedido en tiempo real.
        </p>
      </div>

      <div className="mt-4">
        <h3>5. Devoluciones y Cambios</h3>
        <p>
          Tenés 10 días hábiles desde la recepción del producto para solicitar un cambio o devolución, siempre que el artículo esté en perfectas condiciones y con su embalaje original. Revisa la sección “Cambios y Devoluciones” para más detalles.
        </p>
      </div>

      <div className="alert alert-warning mt-4">
        <strong>Importante:</strong> Nos reservamos el derecho de modificar estos términos en cualquier momento. Te recomendamos revisarlos periódicamente para estar al tanto de las posibles actualizaciones.
      </div>
    </div>
  );
};

export default TerminosYCondiciones;
