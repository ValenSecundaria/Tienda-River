import type React from "react"

const PoliticaDePrivacidad: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Política de Privacidad</h1>
      <p>
        En nuestra tienda respetamos tu privacidad y protegemos tus datos personales. Conocé cómo recopilamos, usamos y
        protegemos tu información.
      </p>

      <div className="mt-4">
        <h3>Información que Recopilamos</h3>
        <p>Recopilamos información que nos proporcionás directamente, como:</p>
        <ul>
          <li>Datos de contacto (nombre, email, teléfono)</li>
          <li>Información de facturación y envío</li>
          <li>Historial de compras</li>
          <li>Preferencias de comunicación</li>
        </ul>
      </div>

      <div className="mt-4">
        <h3>Cómo Usamos tu Información</h3>
        <p>Utilizamos tu información personal para:</p>
        <ul>
          <li>Procesar y gestionar tus pedidos</li>
          <li>Brindarte atención al cliente</li>
          <li>Enviarte actualizaciones sobre tu compra</li>
          <li>Mejorar nuestros productos y servicios</li>
          <li>Cumplir con obligaciones legales</li>
        </ul>
      </div>

      <div className="mt-4">
        <h3>Protección de Datos</h3>
        <p>
          Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra
          acceso no autorizado, alteración, divulgación o destrucción.
        </p>
      </div>

      <div className="mt-4">
        <h3>Tus Derechos</h3>
        <p>Tenés derecho a:</p>
        <ul>
          <li>Acceder a tu información personal</li>
          <li>Rectificar datos incorrectos</li>
          <li>Solicitar la eliminación de tus datos</li>
          <li>Oponerte al procesamiento de tus datos</li>
          <li>Portabilidad de datos</li>
        </ul>
      </div>

      <div className="alert alert-info mt-4">
        <p>
          <strong>Contacto:</strong> Para ejercer tus derechos o realizar consultas sobre privacidad, escribinos a
          privacidad@tienda.com
        </p>
        <p>
          <small>Última actualización: Enero 2024</small>
        </p>
      </div>
    </div>
  )
}

export default PoliticaDePrivacidad
