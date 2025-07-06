import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

export async function POST(request: Request) {
  console.log("⇨ Entramos al endpoint /api/auth/register");

  try {
    const payload = await request.json();
    console.log("⇨ Payload recibido en el servidor:", payload);

    const { email, password, captcha, nombre, telefono } = payload;

    // 🔐 1. Validar CAPTCHA
    if (!captcha) {
      return NextResponse.json({ error: "Captcha requerido" }, { status: 400 });
    }

    const verifyRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || "",
        response: captcha,
      }),
    });

    const data = await verifyRes.json();

    if (!data.success) {
      return NextResponse.json({ error: "Captcha inválido" }, { status: 400 });
    }

    // 📩 2. Validar datos del usuario
    if (!email || !password || !nombre || !telefono) {
      return NextResponse.json(
        { error: "Email, contraseña, nombre y teléfono son requeridos" },
        { status: 400 }
      );
    }

    // 📌 3. Verificar si el usuario ya existe
    const existingUser = await database.usuarios.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 409 }
      );
    }

    // 🔑 4. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🛠️ 5. Crear el nuevo usuario
    const newUser = await database.usuarios.create({
      data: {
        email,
        contrase_a: hashedPassword,
        nombre,
        telefono,
        rol: "cliente",
      },
    });

    // ✅ 6. Devolver el resultado
    return NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        nombre: newUser.nombre,
        telefono: newUser.telefono,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en /api/auth/register:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  } finally {
    await database.$disconnect();
  }
}
