// /app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

export async function POST(request: Request) {

  console.log("⇨ Entramos al endpoint /api/auth/register");

  try {

    const payload = await request.json();
    console.log("⇨ Payload recibido en el servidor:", payload);

    const { email, password } = payload;

    //const { email, password } = await request.json();

    // 1) Validaciones básicas
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // 2) Verificar que el email no exista ya
    const existingUser = await database.usuarios.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 409 }
      );
    }

    // 3) Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4) Crear el usuario en la base
    const newUser = await database.usuarios.create({
      data: {
        email,
        contraseña: hashedPassword,
        nombre: "",      // Si quieres, pide nombre también en el formulario
        rol: "cliente",  // Puedes asignar un rol por defecto
        // teléfono y fecha_creacion quedan con valores por defecto en la DB
      },
    });

    // 5) Devolver un JSON con la info mínima (sin la contraseña)
    return NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        nombre: newUser.nombre,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en /api/auth/register:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  } finally {
    await database.$disconnect();
  }
}
