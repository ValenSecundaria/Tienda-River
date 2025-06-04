// MetodosDePago.tsx
import type React from "react";

const MetodosDePago: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Métodos de Pago</h1>
      <p>
        Ofrecemos distintas formas de pago para que tu experiencia de compra sea cómoda y segura. A continuación, las opciones disponibles:
      </p>

      <div className="mt-4">
        <h3>1. Tarjetas de Crédito y Débito</h3>
        <p>
          Aceptamos Visa, Mastercard, American Express y otras tarjetas nacionales e internacionales. El pago se procesa mediante una pasarela segura que cifra tus datos bancarios.
        </p>
      </div>

      <div className="mt-4">
        <h3>2. Transferencia Bancaria</h3>
        <p>
          Podés transferir el monto total a nuestra cuenta bancaria. Una vez confirmado el pago, procesaremos tu pedido. Tené en cuenta que la acreditación puede demorar hasta 48 horas hábiles.
        </p>
      </div>

      <div className="mt-4">
        <h3>3. Pago en Efectivo</h3>
        <p>
          Si preferís pagar en efectivo, podés hacerlo en puntos de pago autorizados (Rapipago, Pago Fácil). Seleccioná la opción “Pago en efectivo” al finalizar tu compra y seguí las instrucciones para generar tu cupón de pago.
        </p>
      </div>

      <div className="mt-4">
        <h3>4. Billeteras Electrónicas</h3>
        <p>
          También aceptamos pagos a través de billeteras electrónicas como MercadoPago y PayPal. Seleccioná la opción correspondiente al finalizar tu compra y completá los pasos indicados en la plataforma.
        </p>
      </div>

      <div className="alert alert-warning mt-4">
        <strong>Importante:</strong> Verificá que los datos ingresados sean correctos para evitar demoras en la aprobación de tu compra. Ante cualquier inconveniente, podés contactarnos por <a href="/contactanos" className="fw-bold">Contactanos</a>.
      </div>
    </div>
  );
};

export default MetodosDePago;
