// app/api/upload/route.ts (App Router)
import { v2 as cloudinary } from "cloudinary"
import { NextRequest } from "next/server"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("image") as File

  if (!file) {
    return new Response(JSON.stringify({ error: "Archivo no recibido" }), { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "productos" },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )
      stream.end(buffer)
    })

    return new Response(JSON.stringify({ secure_url: (result as any).secure_url }), {
      status: 200,
    })
  } catch (err) {
    console.error("Error subiendo a Cloudinary:", err)
    return new Response(JSON.stringify({ error: "Error al subir la imagen" }), { status: 500 })
  }
}
