// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

type Usuario = Prisma.usuariosGetPayload<{}>;

async function getUser(email: string): Promise<Usuario | null> {
  try {
    return await prisma.usuarios.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.contrase_a);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.nombre,
        };
      },
    }),
  ],
});
