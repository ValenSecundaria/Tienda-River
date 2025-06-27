import { NextRequest , NextResponse } from 'next/server';
import { prisma } from "../../../lib/prisma";

import ExcelJS from 'exceljs';

export async function GET(request: NextRequest) {
  try {
    const productos = await prisma.productos.findMany({
      include: {
        productovariante: {
          include: {
            talles: true,
          },
        },
        categorias: true,
        subcategorias: true,
      },
    });

    const format = request.nextUrl.searchParams.get('format');

    if (format === 'xlsx') {
      // Excel
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
        { header: 'Variantes', key: 'variantes', width: 10 },
        { header: 'Fecha', key: 'fecha_creacion', width: 25 },
        { header: 'Activo', key: 'activo', width: 10 },
      ];

      productos.forEach((producto) => {
        worksheet.addRow({
          id: producto.id,
          nombre: producto.nombre,
          slug: producto.slug,
          descripcion: producto.descripcion,
          precio_base: producto.precio_base.toString(),
          categoria: producto.categorias?.nombre ?? '',
          subcategoria: producto.subcategorias?.nombre ?? '',
          variantes: producto.productovariante.length,
          fecha_creacion: producto.fecha_creacion.toISOString(),
          activo: producto.activo,
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
    return NextResponse.json({ error: 'Error al exportar productos' }, { status: 500 });
  }
}
