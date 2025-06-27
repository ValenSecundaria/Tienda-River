import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../lib/prisma";
import ExcelJS from 'exceljs';

export async function GET(request: NextRequest) {
  try {
    const pagos = await prisma.pagos.findMany({
      select: {
        id: true,
        nombre: true,
        detalle: true,
        activo: true,
        icono: true,
      },
    });

    const format = request.nextUrl.searchParams.get('format');

    if (format === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Pagos');

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Detalle', key: 'detalle', width: 40 },
        { header: 'Activo', key: 'activo', width: 10 },
        { header: 'Icono', key: 'icono', width: 30 },
      ];

      pagos.forEach(pago => {
        worksheet.addRow({
          id: pago.id,
          nombre: pago.nombre,
          detalle: pago.detalle,
          activo: pago.activo,
          icono: pago.icono,
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=pagos.xlsx',
        },
      });
    }

    return NextResponse.json(pagos);
  } catch (error) {
    console.error('[ERROR_PAGOS_EXPORT]', error);
    return NextResponse.json({ error: 'Error al exportar métodos de pago' }, { status: 500 });
  }
}
