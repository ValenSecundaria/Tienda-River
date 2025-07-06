// app/dashboard/exportar/pagos/page.tsx
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../export.module.css';

const API_KEY = process.env.NEXT_PUBLIC_EXPORT_API_KEY;

export default function ExportarPagos() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleExport = async (format: 'json' | 'xlsx') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/export/pagos?format=${format}`, {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        } as HeadersInit
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error en la exportación');
      }

      if (format === 'xlsx') {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pagos_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pagos_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Exportar Datos de Pagos</h1>
      <p>Selecciona el formato de exportación:</p>
      
      <div className={styles.buttons}>
        <button 
          onClick={() => handleExport('json')} 
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading ? 'Exportando...' : 'Exportar JSON'}
        </button>
        
        <button 
          onClick={() => handleExport('xlsx')} 
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading ? 'Exportando...' : 'Exportar Excel'}
        </button>
      </div>
      
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
