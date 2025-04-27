"use client"

import Link from "next/link"
import { ArrowRight, GamepadIcon, ShieldCheck, Zap } from "lucide-react"
import FeaturedGames from "@/components/featured-games"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent z-10"></div>
        <img
          src="/modern-warfare-2.avif"
          alt="Fireplay Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white max-w-2xl">
            Tu destino para los mejores videojuegos
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
            Descubre, compra y juega a los títulos más populares con precios increíbles
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/games" className="btn-primary flex items-center gap-2">
              Explorar juegos <ArrowRight size={18} />
            </Link>
            {!user && (
              <Link href="/register" className="btn-secondary">
                Crear cuenta
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Juegos destacados</h2>
          <FeaturedGames />
        </div>
      </section>

      {/* What is Fireplay */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">¿Qué es Fireplay?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="mb-4 text-blue-400">
                <GamepadIcon size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Amplio catálogo</h3>
              <p className="text-gray-300">
                Accede a miles de juegos de todas las plataformas y géneros, desde AAA hasta indies.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="mb-4 text-blue-400">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Compras seguras</h3>
              <p className="text-gray-300">
                Todas las transacciones están protegidas y garantizamos la entrega inmediata.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="mb-4 text-blue-400">
                <Zap size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Descarga instantánea</h3>
              <p className="text-gray-300">Recibe tus claves al instante y comienza a jugar sin esperas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Cómo funciona</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Regístrate</h3>
              <p className="text-gray-300">Crea tu cuenta en Fireplay de forma rápida y sencilla</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Explora</h3>
              <p className="text-gray-300">Navega por nuestro catálogo y encuentra tus juegos favoritos</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Compra</h3>
              <p className="text-gray-300">Añade juegos a tu carrito y completa la compra de forma segura</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Juega</h3>
              <p className="text-gray-300">Recibe tu clave al instante y comienza a jugar</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a miles de jugadores que ya disfrutan de los mejores títulos a precios increíbles
          </p>
          <Link href="/games" className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg">
            Ver catálogo <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
