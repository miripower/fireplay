import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuthProvider } from "@/context/auth-context"
import { CartProvider } from "@/context/cart-context"
import { FavoritesProvider } from "@/context/favorites-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fireplay - Tienda de Videojuegos",
  description: "Descubre y compra los mejores videojuegos en Fireplay",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen flex flex-col`}>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
