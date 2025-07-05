"use server"

import { prisma } from "@/app/lib/prisma"
import bcrypt from "bcrypt";

export async function createUser(formData: FormData) {
  try {
    const nombre = formData.get("nombre") as string
    const email = formData.get("email") as string
    const contrasena = formData.get("contrasena") as string
    const rol = formData.get("rol") as string

    // Validaciones del servidor
    if (!nombre || !email || !contrasena || !rol) {
      return { error: "Todos los campos son requeridos" }
    }

    if (contrasena.length < 8) {
      return { error: "La contraseña debe tener al menos 8 caracteres" }
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.usuarios.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "Ya existe un usuario con este email" }
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10)

    // Crear el usuario
    const newUser = await prisma.usuarios.create({
      data: {
        nombre,
        email,
        contrase_a: hashedPassword,
        rol,
        fecha_creacion: new Date(),
      },
    })

    console.log("Usuario creado:", { id: newUser.id, nombre, email, rol })

    return { success: true, user: { id: newUser.id, nombre, email, rol } }
  } catch (error) {
    console.error("Error al crear usuario:", error)
    return { error: "Error interno del servidor. Intenta nuevamente." }
  }
}
