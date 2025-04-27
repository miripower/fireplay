import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-9xl font-bold text-blue-500">404</h1>
      <h2 className="text-3xl font-bold mt-4 mb-6">Página no encontrada</h2>
      <p className="text-gray-400 text-center max-w-md mb-8">
        La página que estás buscando no existe o ha sido movida a otra ubicación.
      </p>
      <Link href="/" className="btn-primary">
        Volver al inicio
      </Link>
    </div>
  )
}
