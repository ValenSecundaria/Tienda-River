import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {

  const categorias = await prisma.categorias.findMany();

  const shuffled = categorias.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  return NextResponse.json(selected);
}
