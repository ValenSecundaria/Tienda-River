"use client"

import { CategoryPageClient } from "./CategoryPageClient"

interface Props {
  categoria: string
  categoryInfo?: {
    id: number
    nombre: string
    descripcion: string | null
    imagen_url: string | null
  } | null
}

export default function CategoryPageClientWrapper(props: Props) {
  return <CategoryPageClient {...props} />
}
