import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../lib/prisma";
import ExcelJS from 'exceljs';

export async function GET(request: NextRequest) {
  try {
    const clientes = await prisma.usuarios.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        fecha_creacion: true,
      },
    });

    const format = request.nextUrl.searchParams.get('format');

    if (format === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Clientes');

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Teléfono', key: 'telefono', width: 20 },
        { header: 'Fecha Creación', key: 'fecha_creacion', width: 25 },
      ];

      clientes.forEach(cliente => {
        worksheet.addRow({
          id: cliente.id,
          nombre: cliente.nombre,
          email: cliente.email,
          telefono: cliente.telefono,
          fecha_creacion: cliente.fecha_creacion.toISOString(),
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=clientes.xlsx',
        },
      });
    }

    return NextResponse.json(clientes);
  } catch (error) {
    console.error('[ERROR_CLIENTES_EXPORT]', error);
    return NextResponse.json({ error: 'Error al exportar clientes' }, { status: 500 });
  }
}
