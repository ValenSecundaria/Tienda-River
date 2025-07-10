// /app/api/cohere/route.ts (App Router)
import { NextRequest, NextResponse } from 'next/server'
import { CohereClientV2 } from 'cohere-ai'

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY!, // guardá tu key en el .env
})

export async function POST(req: NextRequest) {
  const { nombreProducto } = await req.json()

  const prompt = `Dame una descripcion EN ESPAÑOL para un producto con este nombre "${nombreProducto}".Que sea en español y solamente responde con la descripcion. No digas nada mas que la descripcion .`

  try {
    const response = await cohere.generate({
      model: 'command',
      prompt,
      maxTokens: 100,
      temperature: 0.7,
    })

    const texto = response.generations?.[0]?.text?.trim() || ''

    return NextResponse.json({ descripcion: texto })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error generando descripción' }, { status: 500 })
  }
}
