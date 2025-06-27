import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    console.log("📥 Recibiendo imagen...");

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      console.log("⛔ Archivo inválido o no presente");
      return NextResponse.json({ error: 'Archivo inválido' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    console.log("🚀 Subiendo a Cloudinary...");

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'productos',
    });

    console.log("✅ Subida exitosa:", result.secure_url);

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("🔥 Error en el backend al subir imagen:", error);
    return NextResponse.json({ error: 'Error al subir imagen' }, { status: 500 });
  }
}
