"use client"

import { useState } from "react"
import { updateOrderStatus, updateTrackingNumber } from "@/app/lib/orders"
import styles from "./OrderList.module.css"

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

interface OrderListProps {
  orders: Order[]
  orderStates: OrderState[]
  onRefresh: () => void
}

export default function OrderList({ orders, orderStates, onRefresh }: OrderListProps) {
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set())
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null)
  const [updatingTracking, setUpdatingTracking] = useState<number | null>(null)
  const [trackingInputs, setTrackingInputs] = useState<{ [key: number]: string }>({})

  const toggleOrder = (orderId: number) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const handleStatusChange = async (orderId: number, newStatusId: number) => {
    setUpdatingStatus(orderId)
    const result = await updateOrderStatus(orderId, newStatusId)
    if (result.success) {
      onRefresh()
    }
    setUpdatingStatus(null)
  }

  const handleTrackingUpdate = async (orderId: number) => {
    const trackingNumber = trackingInputs[orderId]
    if (!trackingNumber) return

    setUpdatingTracking(orderId)
    const result = await updateTrackingNumber(orderId, trackingNumber)
    if (result.success) {
      onRefresh()
      setTrackingInputs((prev) => ({ ...prev, [orderId]: "" }))
    }
    setUpdatingTracking(null)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return styles.statusPending
      case "confirmado":
        return styles.statusConfirmed
      case "enviado":
        return styles.statusShipped
      case "entregado":
        return styles.statusDelivered
      case "cancelado":
        return styles.statusCancelled
      default:
        return styles.statusDefault
    }
  }

  if (orders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="m7 11 2-2-2-2" />
            <path d="M11 13h4" />
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          </svg>
        </div>
        <h3>No se encontraron órdenes</h3>
        <p>Intenta ajustar los filtros o espera a que lleguen nuevas órdenes</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader} onClick={() => toggleOrder(order.id)}>
              <div className={styles.orderInfo}>
                <div className={styles.orderNumber}>
                  <span className={styles.orderLabel}>Orden #</span>
                  <span className={styles.orderValue}>{order.id}</span>
                </div>
                <div className={styles.orderMeta}>
                  <span className={styles.orderDate}>{formatDate(order.fecha)}</span>
                  <span className={`${styles.orderStatus} ${getStatusColor(order.estadoorden.nombre)}`}>
                    {order.estadoorden.nombre}
                  </span>
                </div>
              </div>

              <div className={styles.orderSummary}>
                <div className={styles.customerInfo}>
                  <span className={styles.customerName}>{order.usuarios.nombre}</span>
                  <span className={styles.customerEmail}>{order.usuarios.email}</span>
                </div>
                <div className={styles.orderTotal}>
                  <span className={styles.totalLabel}>Total</span>
                  <span className={styles.totalValue}>{formatPrice(order.total)}</span>
                </div>
              </div>

              <div className={styles.expandIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={expandedOrders.has(order.id) ? styles.expanded : ""}
                >
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </div>
            </div>

            {expandedOrders.has(order.id) && (
              <div className={styles.orderDetails}>
                <div className={styles.detailsGrid}>
                  {/* Información del cliente */}
                  <div className={styles.detailSection}>
                    <h4 className={styles.sectionTitle}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Cliente
                    </h4>
                    <div className={styles.detailContent}>
                      <p>
                        <strong>Nombre:</strong> {order.usuarios.nombre}
                      </p>
                      <p>
                        <strong>Email:</strong> {order.usuarios.email}
                      </p>
                      {order.usuarios.telefono && (
                        <p>
                          <strong>Teléfono:</strong> {order.usuarios.telefono}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Dirección de envío */}
                  <div className={styles.detailSection}>
                    <h4 className={styles.sectionTitle}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Dirección de Envío
                    </h4>
                    <div className={styles.detailContent}>
                      <p>{order.direccion_envio || "No especificada"}</p>
                    </div>
                  </div>

                  {/* Información de transacción */}
                  <div className={styles.detailSection}>
                    <h4 className={styles.sectionTitle}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                      Transacción
                    </h4>
                    <div className={styles.detailContent}>
                      <p>
                        <strong>ID:</strong> {order.transacciones.id}
                      </p>
                      {order.transacciones.codigo_transaccion && (
                        <p>
                          <strong>Código:</strong> {order.transacciones.codigo_transaccion}
                        </p>
                      )}
                      <p>
                        <strong>Estado:</strong> {order.transacciones.estadopago.nombre}
                      </p>
                      {order.transacciones.pagos && (
                        <p>
                          <strong>Método:</strong> {order.transacciones.pagos.nombre}
                        </p>
                      )}
                      <p>
                        <strong>Monto:</strong> {formatPrice(order.transacciones.monto_total)}
                      </p>
                    </div>
                  </div>

                  {/* Tracking */}
                  <div className={styles.detailSection}>
                    <h4 className={styles.sectionTitle}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                        <path d="M15 18H9" />
                        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                        <circle cx="17" cy="18" r="2" />
                        <circle cx="7" cy="18" r="2" />
                      </svg>
                      Seguimiento
                    </h4>
                    <div className={styles.detailContent}>
                      {order.tracking_number ? (
                        <p>
                          <strong>Tracking:</strong> {order.tracking_number}
                        </p>
                      ) : (
                        <div className={styles.trackingInput}>
                          <input
                            type="text"
                            placeholder="Número de seguimiento"
                            value={trackingInputs[order.id] || ""}
                            onChange={(e) => setTrackingInputs((prev) => ({ ...prev, [order.id]: e.target.value }))}
                            className={styles.input}
                          />
                          <button
                            onClick={() => handleTrackingUpdate(order.id)}
                            disabled={updatingTracking === order.id || !trackingInputs[order.id]}
                            className={styles.updateButton}
                          >
                            {updatingTracking === order.id ? "..." : "Actualizar"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Productos */}
                <div className={styles.productsSection}>
                  <h4 className={styles.sectionTitle}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m7.5 4.27 9 5.15" />
                      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    </svg>
                    Productos ({order._count.ordenitems})
                  </h4>
                  <div className={styles.productsList}>
                    {order.ordenitems.map((item) => (
                      <div key={item.id} className={styles.productItem}>
                        <div className={styles.productInfo}>
                          <span className={styles.productName}>{item.productos.nombre}</span>
                          {(item.productos.color_nombre || item.productos.talle) && (
                            <span className={styles.productVariant}>
                              {item.productos.color_nombre && `Color: ${item.productos.color_nombre}`}
                              {item.productos.color_nombre && item.productos.talle && " • "}
                              {item.productos.talle && `Talle: ${item.productos.talle}`}
                            </span>
                          )}
                        </div>
                        <div className={styles.productQuantity}>
                          <span className={styles.quantity}>x{item.cantidad}</span>
                          <span className={styles.price}>{formatPrice(item.precio_unitario)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acciones */}
                <div className={styles.orderActions}>
                  <div className={styles.statusUpdate}>
                    <label className={styles.actionLabel}>Cambiar estado:</label>
                    <select
                      value={order.estado_orden_id}
                      onChange={(e) => handleStatusChange(order.id, Number.parseInt(e.target.value))}
                      disabled={updatingStatus === order.id}
                      className={styles.statusSelect}
                    >
                      {orderStates.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {order.notas && (
                  <div className={styles.notesSection}>
                    <h4 className={styles.sectionTitle}>Notas</h4>
                    <p className={styles.notes}>{order.notas}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
