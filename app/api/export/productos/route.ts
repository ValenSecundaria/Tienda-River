import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import ExcelJS from 'exceljs';

import type { Prisma } from '@prisma/client';

type ProductoConVariantes = Prisma.productosGetPayload<{
  include: {
    categorias: true;
    subcategorias: true;
    productos: true; 
  };
}>;

export async function GET(request: NextRequest) {
  try {
    const productos = await prisma.productos.findMany({
      include: {
        categorias: true,
        subcategorias: true,
        productos: true,
      },
    }) as ProductoConVariantes[]; // Aseguramos el tipo correcto

    const format = request.nextUrl.searchParams.get('format');

    if (format === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Productos');

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Slug', key: 'slug', width: 25 },
        { header: 'Descripción', key: 'descripcion', width: 40 },
        { header: 'Precio Base', key: 'precio_base', width: 15 },
        { header: 'Categoría', key: 'categoria', width: 20 },
        { header: 'Subcategoría', key: 'subcategoria', width: 20 },
        { header: 'Color', key: 'color', width: 15 },
        { header: 'Talle', key: 'talle', width: 10 },
        { header: 'Stock', key: 'stock', width: 10 },
        { header: 'Variantes', key: 'variantes', width: 10 },
        { header: 'Fecha', key: 'fecha_creacion', width: 25 },
        { header: 'Activo', key: 'activo', width: 10 },
      ];

      productos.forEach((producto) => {
        worksheet.addRow({
          id: producto.id,
          nombre: producto.nombre,
          slug: producto.slug,
          descripcion: producto.descripcion || '',
          precio_base: producto.precio_base.toString(),
          categoria: producto.categorias?.nombre ?? '',
          subcategoria: producto.subcategorias?.nombre ?? '',
          color: producto.color_nombre || '',
          talle: producto.talle || '',
          stock: producto.stock,
          variantes: Array.isArray(producto.productos) ? producto.productos.length : 0, // Verificación segura
          fecha_creacion: producto.fecha_creacion.toISOString(),
          activo: producto.activo ? 'Sí' : 'No',
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=productos.xlsx',
        },
      });
    }

    return NextResponse.json(productos);
  } catch (error) {
    console.error('[ERROR_PRODUCTOS_EXPORT]', error);
    return NextResponse.json(
      {
        error: 'Error al exportar productos',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}