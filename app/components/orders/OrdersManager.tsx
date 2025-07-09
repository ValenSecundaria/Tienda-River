"use client"

import { useState, useEffect } from "react"
import OrderList from "./OrderList"
import OrderFilters from "./OrderFilters"
import { getOrders, getOrderStates } from "@/app/lib/orders"
import styles from "./OrdersManager.module.css"

interface Order {
  id: number
  usuario_id: number
  estado_orden_id: number
  transaccion_id: number
  fecha: Date
  total: number
  direccion_envio: string | null
  tracking_number: string | null
  notas: string | null
  usuarios: {
    id: number
    nombre: string
    email: string
    telefono: string | null
  }
  estadoorden: {
    id: number
    nombre: string
    es_final: boolean
  }
  transacciones: {
    id: number
    codigo_transaccion: string | null
    monto_total: number
    fecha: Date
    estadopago: {
      nombre: string
      es_final: boolean
    }
    pagos: {
      nombre: string
      icono: string | null
    } | null
  }
  ordenitems: Array<{
    id: number
    orden_id: number
    producto_id: number
    cantidad: number
    precio_unitario: number
    descuento: number
    productos: {
      id: number
      nombre: string
      imagen_principal: string | null
      color_nombre: string | null
      talle: string | null
    }
  }>
  _count: {
    ordenitems: number
  }
}

interface OrderState {
  id: number
  nombre: string
  descripcion: string | null
  es_final: boolean
}

interface Filters {
  search: string
  estado: string
  fechaDesde: string
  fechaHasta: string
  orderBy: "fecha" | "total" | "id"
  orderDirection: "asc" | "desc"
}

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([])
  const [orderStates, setOrderStates] = useState<OrderState[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    search: "",
    estado: "all",
    fechaDesde: "",
    fechaHasta: "",
    orderBy: "fecha",
    orderDirection: "desc",
  })

  const loadOrders = async () => {
    setLoading(true)
    const data = await getOrders({
      search: filters.search || undefined,
      estado: filters.estado !== "all" ? filters.estado : undefined,
      fechaDesde: filters.fechaDesde || undefined,
      fechaHasta: filters.fechaHasta || undefined,
      orderBy: filters.orderBy,
      orderDirection: filters.orderDirection,
    })
    setOrders(data)
    setLoading(false)
  }

  const loadOrderStates = async () => {
    const states = await getOrderStates()
    setOrderStates(states)
  }

  useEffect(() => {
    loadOrderStates()
  }, [])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadOrders()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [filters])

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleRefresh = () => {
    loadOrders()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Órdenes</h1>
          <p className={styles.subtitle}>Administra las órdenes de tu tienda ({orders.length} órdenes)</p>
        </div>
      </div>

      <OrderFilters filters={filters} orderStates={orderStates} onFilterChange={handleFilterChange} loading={loading} />

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando órdenes...</p>
        </div>
      ) : (
        <OrderList orders={orders} orderStates={orderStates} onRefresh={handleRefresh} />
      )}
    </div>
  )
}
