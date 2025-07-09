export interface Product {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  precio_base: number;
  categoria_id: number | null;
  subcategoria_id: number | null;
  activo: boolean;
  fecha_creacion: string; // fecha como string para evitar conflictos
  imagen_principal: string | null;
  categorias: {
    id: number;
    nombre: string;
  } | null;
  subcategorias: {
    id: number;
    nombre: string;
  } | null;
}
