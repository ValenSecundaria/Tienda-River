import Image from "next/image";
import Link from "next/link";

export function ProductCard({ producto }) {
  return (
    <Link
      href={`/productos/${producto.slug}`} // <-- Ahora arma la URL
      className="bg-white rounded-xl shadow p-4 flex flex-col h-full hover:shadow-lg transition cursor-pointer"
    >
      <Image
        src={ "https://celadasa.vtexassets.com/arquivos/ids/230631-1200-auto?v=638197635089300000&width=1200&height=auto&aspect=true 1200w"}
        alt={producto.nombre}
        width={300}
        height={300}
        className="rounded-lg object-cover h-48 w-full"
      />
      <div className="mt-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-base">{producto.nombre}</h3>
        <p className="text-gray-500 text-sm">{producto.categorias.nombre}</p>
        <p className="font-bold text-lg mt-1">${producto.precio_base.toString()}</p>
      </div>
    </Link>
  );
}
