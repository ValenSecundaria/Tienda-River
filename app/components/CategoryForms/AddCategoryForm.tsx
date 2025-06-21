// AddCategoryForm.tsx
"use client";

import { useState } from "react";
import styles from "./../header.module.css";

type AddCategoryFormProps = {
  onSubmit: (nombre: string, descripcion?: string) => void;
  onCancel: () => void;
};

export default function AddCategoryForm({ onSubmit, onCancel }: AddCategoryFormProps) {
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
        <h5 className="mb-3">Agregar nueva categoría</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nombre de la categoría"
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
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
