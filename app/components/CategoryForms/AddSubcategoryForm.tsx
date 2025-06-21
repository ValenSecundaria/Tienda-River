// AddSubcategoryForm.tsx
"use client";

import { useState } from "react";
import styles from "./../header.module.css";

type AddSubcategoryFormProps = {
  categoriaNombre: string;
  onSubmit: (nombre: string, descripcion?: string) => void;
  onCancel: () => void;
};

export default function AddSubcategoryForm({
  categoriaNombre,
  onSubmit,
  onCancel,
}: AddSubcategoryFormProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onSubmit(nombre.trim(), descripcion.trim());
    setNombre("");
    setDescripcion("");
  };

  return (
    <>
      <div className={styles.modalBackdrop} onClick={onCancel} />
      <div className={styles.modalContent}>
        <h6>Agregar subcategoría a "{categoriaNombre}"</h6>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nombre de la subcategoría"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoFocus
          />
          <textarea
            className="form-control mb-3"
            placeholder="Descripción (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
          />
          <div>
            <button type="submit" className="btn btn-primary me-2">
              Guardar
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
