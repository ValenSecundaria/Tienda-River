"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./Carrito.module.css"

interface CarritoProps {
  onClose: () => void
  
}

interface Producto {
  id: number;
  nombre: string;
  imagen_principal: string | null;
  precio_base: number;
  cantidad: number; 
}

const inlineStyles = {
  deleteButton: {
    backgroundColor: "#fef2f2", 
    border: "1px solid #fecaca", 
    color: "#b91c1c", 
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.2s ease-in-out",
    marginLeft: "auto",
    marginTop: "4px",
  } as React.CSSProperties,
  deleteButtonHover: {
    backgroundColor: "#fecaca",
    transform: "scale(1.1)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  } as React.CSSProperties,
  deleteIcon: {
    width: "16px",
    height: "16px",
    stroke: "#b91c1c",
    strokeWidth: 2,
  } as React.CSSProperties,
}



export default function   Carrito({ onClose }: CarritoProps) {
  
  const popupRef = useRef<HTMLDivElement>(null)
  const popupFormRef = useRef<HTMLDivElement>(null)
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [estaLogueado, setEstaLogueado] = useState(false) // reemplazar con lógica real
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
  })
  const [mostrarPopup, setMostrarPopup] = useState(false)
  const [errorStock, setErrorStock] = useState<string | null>(null);
  const [volverAlFormulario, setVolverAlFormulario] = useState(false);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        (!popupFormRef.current || !popupFormRef.current.contains(e.target as Node))
      ) {
        onClose()
      }

    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [onClose])

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("/api/carrito/cookies");
        if (!res.ok) throw new Error("Error al cargar el carrito");
        window.dispatchEvent(new Event("carrito-update"));

        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handlePagarConMercadoPago = () => {
    if (!estaLogueado) {
      setMostrarPopup(true)
      return
    }
    iniciarPago()
  }

  const iniciarPago = async () => {
    console.log("Iniciando pago...");
    try {
      const res = await fetch("/api/mercado-pago/crear-preferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productos: productos,
          nombre: datosUsuario.nombre,
          direccion: datosUsuario.direccion,
          email: datosUsuario.email,
          telefono: datosUsuario.telefono,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 🟥 Si el error es por stock, mostrar popup de error y volver al formulario
        if (data.error?.includes("stock")) {
          setErrorStock(data.error);
          setVolverAlFormulario(mostrarPopup); // Recordar si venía del formulario
          return;
        }

        // Otros errores
        alert(data.error || "Error en la API");
        return;
      }

      // ✅ Redirigir a Mercado Pago si todo salió bien
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("No se recibió el link de pago");
      }

    } catch (err) {
      alert("Hubo un error al iniciar el pago con Mercado Pago: " + err);
    }
};



  const handleEliminarProducto = async (productoId: number) => {
    try {
      const res = await fetch(`/api/carrito/cookies/${productoId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar producto");

      setProductos((prev) =>
        prev
          .map((producto) =>
            producto.id === productoId
              ? { ...producto, cantidad: Math.max(producto.cantidad - 1, 0) }
              : producto
          )
          .filter((producto) => producto.cantidad > 0) // Solo mostramos los > 0
      );

      window.dispatchEvent(new Event("carrito-update"));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert("No se pudo eliminar el producto");
    }
  };




  return (
    <div className={styles.overlay}>
      {errorStock && (
          <div className={styles.overlay}>
            <div className={styles.popup}>
              <div className={styles.header}>
                <h3 className={styles.title}>Error de stock</h3>
              </div>
              <div className={styles.content}>
                <p style={{ color: "#b91c1c", fontWeight: 500 }}>
                  {errorStock}
                </p>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <button
                    onClick={() => {
                      setErrorStock(null);
                      if (volverAlFormulario) {
                        setMostrarPopup(true);      
                        setVolverAlFormulario(false); 
                      }
                    }}
                    className={styles.cancelButton}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}

      {mostrarPopup && (
        <div className={styles.overlay}>
          <div className={styles.popup} ref={popupFormRef}>
            <div className={styles.header}>
              <h3 className={styles.title}>Completa tus datos para continuar</h3>
            </div>
            <div className={styles.content}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Formulario enviado");

                  if (
                    !datosUsuario.nombre ||
                    !datosUsuario.direccion ||
                    !datosUsuario.email ||
                    !datosUsuario.telefono
                  ) {
                    alert("Todos los campos son obligatorios");
                    return;
                  }

                  setMostrarPopup(false);
                  iniciarPago();
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              >
                {[
                  { label: "Nombre", type: "text", value: datosUsuario.nombre, key: "nombre" },
                  { label: "Direccion", type: "text", value: datosUsuario.direccion, key: "direccion" },
                  { label: "Email", type: "email", value: datosUsuario.email, key: "email" },
                  { label: "Teléfono", type: "tel", value: datosUsuario.telefono, key: "telefono" },
                ].map(({ label, type, value, key }) => (
                  <div key={key} style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor={key}
                      style={{
                        marginBottom: "6px",
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "#374151",
                        userSelect: "none",
                      }}
                    >
                      {label}
                    </label>
                    <input
                      id={key}
                      type={type}
                      placeholder={label}
                      value={value}
                      onChange={(e) => setDatosUsuario({ ...datosUsuario, [key]: e.target.value })}
                      required
                      style={{
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1.5px solid #d1d5db",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.2s ease-in-out",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
                    />
                  </div>
                ))}

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                  <button
                    type="submit"
                    className={styles.payButton}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                  >
                    Continuar
                  </button>
                  <button
                    type="button"
                    onClick={() => setMostrarPopup(false)}
                    className={styles.cancelButton}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#e5e7eb",
                      color: "#374151",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d1d5db")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
                  >
                    Cancelar
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

      <div className={styles.popup} ref={popupRef}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Carrito de compras</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar carrito">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Cargando productos...</p>
            </div>
          ) : productos.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
              </div>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <div className={styles.productList}>
              <div className={styles.productCount}>
                {productos.reduce((total, p) => total + p.cantidad, 0)}{" "}
                {productos.reduce((total, p) => total + p.cantidad, 0) === 1
                  ? "producto"
                  : "productos"}
              </div>
                {Array.from(new Map(productos.map(p => [p.id, p])).values()).map((producto) => (
                  <div key={producto.id} className={styles.productItem} style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 0",
                    gap: "12px"
                  }}>
                    {/* Imagen del producto */}
                    <div style={{ width: "60px", height: "60px", flexShrink: 0 }}>
                      {producto.imagen_principal ? (
                        <img
                          src={producto.imagen_principal}
                          alt={producto.nombre}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb"
                          }}
                        />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21,15 16,10 5,21"></polyline>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info del producto */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>{producto.nombre}</h4>
                      <p style={{ margin: "0", color: "#4b5563" }}>
                        Precio:{" "}
                        <strong>
                          {new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          }).format(Number(producto.precio_base))}
                        </strong>
                      </p>
                      <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#1f2937" }}>
                        Cantidad: <strong>{producto.cantidad}</strong>
                      </p>
                    </div>

                    {/* Botón de eliminar */}
                    <button
                      style={inlineStyles.deleteButton}
                      onMouseOver={(e) => {
                        Object.assign(e.currentTarget.style, inlineStyles.deleteButtonHover);
                      }}
                      onMouseOut={(e) => {
                        Object.assign(e.currentTarget.style, inlineStyles.deleteButton);
                      }}
                      onClick={() => handleEliminarProducto(producto.id)}
                      aria-label="Eliminar producto"
                    >
                      ✕
                    </button>
                  </div>
                ))}



            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.payButton} onClick={handlePagarConMercadoPago} disabled={productos.length === 0}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            Pagar con Mercado Pago
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Continuar comprando
          </button>
        </div>
      </div>
    </div>
  )
}


