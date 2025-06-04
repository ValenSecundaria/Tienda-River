// PreguntasFrecuentes.tsx
import type React from "react";

const PreguntasFrecuentes: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Preguntas Frecuentes</h1>
      <p>
        Aquí respondemos las dudas más comunes sobre nuestros productos, procesos de compra, envíos y políticas de la tienda.
      </p>

      <div className="mt-4">
        <h3>¿Cómo realizo un pedido?</h3>
        <p>
          Para hacer un pedido, seleccioná el producto, elegí talle y cantidad, y hacé clic en “Agregar al carrito”. Luego, completá el proceso de pago y confirmá tu compra.
        </p>
      </div>

      <div className="mt-4">
        <h3>¿Qué métodos de pago aceptan?</h3>
        <p>
          Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, pagos en efectivo en puntos autorizados (Rapipago, Pago Fácil) y billeteras electrónicas (MercadoPago, PayPal).
        </p>
      </div>

      <div className="mt-4">
        <h3>¿Cuánto tarda el envío?</h3>
        <p>
          El tiempo de entrega varía según tu ubicación. En ciudades principales suele demorar entre 3 y 7 días hábiles. Para seguimiento, ingresá a la sección “Seguimiento de Envío” con tu número de tracking.
        </p>
      </div>

      <div className="mt-4">
        <h3>¿Puedo cambiar o devolver un producto?</h3>
        <p>
          Sí, tenés un plazo de 10 días hábiles desde la recepción para gestionar un cambio o devolución, siempre que el producto esté en perfecto estado y con su embalaje original. Consultá la sección “Cambios y Devoluciones” para más información.
        </p>
      </div>

      <div className="alert alert-info mt-4">
        <strong>¿Tenés otra pregunta?</strong> Si no encontraste la respuesta aquí, podés contactarnos a través de nuestra sección de <a href="/contactanos" className="fw-bold">Contactanos</a>.
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
