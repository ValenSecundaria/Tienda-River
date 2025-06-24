"use client";

import { useEffect, useRef } from "react";
import styles from "./CartPopup.module.css";

interface CartPopupProps {
  onClose: () => void;
}

export default function PoputMP({ onClose }: CartPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // 👉 Función que llama a la API para pagar con Mercado Pago
  const handlePagarConMercadoPago = async () => {
    try {
    const res = await fetch("/api/mercado-pago/crear-preferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Puedes mandar body vacío o no mandarlo
      body: JSON.stringify({}),
    });

   if (!res.ok) {
      const errorText = await res.text();
      
      alert("Error en la API: " + errorText);
      return;
    }

    const data = await res.json();
    console.log(data)
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert("No se recibió el link de pago");
    }
  } catch (err) {
    alert("Hubo un error al iniciar el pago con Mercado Pago: " + err);
  }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup} ref={popupRef}>
        <h5 className="mb-3">Carrito de compras</h5>
        {/* Aquí iría el listado de productos del carrito */}
        <div className="mb-3">Tu carrito está vacío por ahora.</div>

        <button
          className="btn btn-primary w-100"
          onClick={handlePagarConMercadoPago}
        >
          <i className="bi bi-cash-coin me-2" />
          Pagar con Mercado Pago
        </button>

        <button
          className="btn btn-outline-secondary btn-sm mt-3 w-100"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
