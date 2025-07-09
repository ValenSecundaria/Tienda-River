"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export interface OrderFilters {
  search?: string
  estado?: string
  fechaDesde?: string
  fechaHasta?: string
  orderBy?: "fecha" | "total" | "id"
  orderDirection?: "asc" | "desc"
}

export async function getOrders(filters: OrderFilters = {}) {
  try {
    const where: any = {}

    // Filtro de búsqueda por tracking number o usuario
    if (filters.search) {
      where.OR = [
        {
          tracking_number: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          usuarios: {
            nombre: {
              contains: filters.search,
              mode: "insensitive",
            },
          },
        },
        {
          usuarios: {
            email: {
              contains: filters.search,
              mode: "insensitive",
            },
          },
        },
      ]
    }

    // Filtro por estado
    if (filters.estado && filters.estado !== "all") {
      where.estado_orden_id = Number.parseInt(filters.estado)
    }

    // Filtro por fecha
    if (filters.fechaDesde || filters.fechaHasta) {
      where.fecha = {}
      if (filters.fechaDesde) {
        where.fecha.gte = new Date(filters.fechaDesde)
      }
      if (filters.fechaHasta) {
        where.fecha.lte = new Date(filters.fechaHasta + "T23:59:59")
      }
    }

    const orders = await prisma.ordenes.findMany({
      where,
      include: {
        usuarios: {
          select: {
            id: true,
            nombre: true,
            email: true,
            telefono: true,
          },
        },
        estadoorden: {
          select: {
            id: true,
            nombre: true,
            es_final: true,
          },
        },
        transacciones: {
          select: {
            id: true,
            codigo_transaccion: true,
            monto_total: true,
            fecha: true,
            estadopago: {
              select: {
                nombre: true,
                es_final: true,
              },
            },
            pagos: {
              select: {
                nombre: true,
                icono: true,
              },
            },
          },
        },
        ordenitems: {
          include: {
            productos: {
              select: {
                id: true,
                nombre: true,
                imagen_principal: true,
                color_nombre: true,
                talle: true,
              },
            },
          },
        },
        _count: {
          select: {
            ordenitems: true,
          },
        },
      },
      orderBy: {
        [filters.orderBy || "fecha"]: filters.orderDirection || "desc",
      },
    })

    // Convertir Decimal a Number para serialización
    const ordersFormatted = orders.map((order) => ({
      ...order,
      total: order.total.toNumber(),
      transacciones: {
        ...order.transacciones,
        monto_total: order.transacciones.monto_total.toNumber(),
      },
      ordenitems: order.ordenitems.map((item) => ({
        ...item,
        precio_unitario: item.precio_unitario.toNumber(),
        descuento: item.descuento?.toNumber() || 0,
      })),
    }))

    return ordersFormatted
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

export async function getOrderStates() {
  try {
    const states = await prisma.estadoorden.findMany({
      orderBy: { nombre: "asc" },
    })
    return states
  } catch (error) {
    console.error("Error fetching order states:", error)
    return []
  }
}

export async function updateOrderStatus(orderId: number, newStatusId: number) {
  try {
    await prisma.ordenes.update({
      where: { id: orderId },
      data: { estado_orden_id: newStatusId },
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating order status:", error)
    return { error: "Error al actualizar el estado de la orden" }
  }
}

export async function updateTrackingNumber(orderId: number, trackingNumber: string) {
  try {
    await prisma.ordenes.update({
      where: { id: orderId },
      data: { tracking_number: trackingNumber },
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating tracking number:", error)
    return { error: "Error al actualizar el número de seguimiento" }
  }
}
